import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Request, RequestDocument, RequestStatus } from '../../database/schemas/request.schema';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { GetRequestsDto } from './dto/get-requests.dto';
import { PaginationUtil } from '../../common/utils/pagination.util';
import { SortUtil } from '../../common/utils/sort.util';
import { XpService } from '../xp/xp.service';
import { AchievementsService } from '../achievements/achievements.service';

@Injectable()
export class RequestsService {
  constructor(
    @InjectModel(Request.name) private requestModel: Model<RequestDocument>,
    private xpService: XpService,
    private achievementsService: AchievementsService,
  ) {}

  async create(createRequestDto: CreateRequestDto, buyerId: string) {
    if (createRequestDto.budgetMax < createRequestDto.budgetMin) {
      throw new BadRequestException(
        'Maximum budget must be greater than or equal to minimum budget',
      );
    }

    const request = new this.requestModel({
      ...createRequestDto,
      buyerId: new Types.ObjectId(buyerId),
      status: RequestStatus.PENDING,
    });

    await request.save();

    // Award XP to buyer
    await this.xpService.awardXp(buyerId, 10);
    await this.achievementsService.checkAndUnlockAchievements(buyerId);

    return request;
  }

  async findAll(dto: GetRequestsDto) {
    const page = PaginationUtil.normalizePage(dto.page);
    const pageSize = PaginationUtil.normalizePageSize(dto.pageSize);
    const skip = PaginationUtil.getSkip(page, pageSize);

    const query: Record<string, any> = {};

    // Default to active requests if no status specified
    if (!dto.status) {
      query.status = RequestStatus.ACTIVE;
    } else {
      query.status = dto.status;
    }

    if (dto.category) {
      query.category = dto.category;
    }

    if (dto.location) {
      query.location = { $regex: dto.location, $options: 'i' };
    }

    if (dto.budgetMin !== undefined) {
      query.budgetMax = { $gte: dto.budgetMin };
    }

    if (dto.budgetMax !== undefined) {
      query.budgetMin = { $lte: dto.budgetMax };
    }

    if (dto.search) {
      query.$text = { $search: dto.search };
    }

    const sortObj = SortUtil.buildSortObject(dto.sort);
    const sort: Record<string, 1 | -1> =
      sortObj && typeof sortObj === 'object' ? sortObj : { createdAt: -1 };
    let results: any[];
    let count: number = 0;

    try {
      results = await this.requestModel
        .find(query)
        .populate('buyerId', 'name avatar rating')
        .sort(sort)
        .skip(skip)
        .limit(pageSize)
        .exec();
    } catch {
      // fallback: ignore sort if it causes a complex union type error
      results = await this.requestModel
        .find(query)
        .populate('buyerId', 'name avatar rating')
        .skip(skip)
        .limit(pageSize)
        .exec();
    }

    count = await this.requestModel.countDocuments(query).exec();

    return PaginationUtil.createPaginationResult(
      results,
      count,
      page,
      pageSize,
      '/api/requests',
      dto,
    );
  }

  async findOne(id: string) {
    const request = await this.requestModel
      .findById(id)
      .populate('buyerId', 'name avatar rating location memberSince completedDeals xp')
      .exec();

    if (!request) {
      throw new NotFoundException(`Request with ID ${id} not found`);
    }

    // Increment views
    request.views += 1;
    await request.save();

    return request;
  }

  async update(id: string, updateRequestDto: UpdateRequestDto, userId: string) {
    const request = await this.findOne(id);

    if (request.buyerId.toString() !== userId) {
      throw new ForbiddenException('You can only update your own requests');
    }

    if (request.status === RequestStatus.CLOSED) {
      throw new BadRequestException('Cannot update closed request');
    }

    // Track edit history
    const editEntry = {
      text: `Request updated at ${new Date().toISOString()}`,
      timestamp: new Date(),
    };
    request.edits.push(editEntry);

    Object.assign(request, updateRequestDto);
    await request.save();

    return request;
  }

  async remove(id: string, userId: string) {
    const request = await this.findOne(id);

    if (request.buyerId.toString() !== userId) {
      throw new ForbiddenException('You can only delete your own requests');
    }

    await this.requestModel.deleteOne({ _id: id }).exec();
    return { success: true };
  }

  async incrementProposalsCount(requestId: string) {
    await this.requestModel.updateOne({ _id: requestId }, { $inc: { proposalsCount: 1 } }).exec();
  }
}
