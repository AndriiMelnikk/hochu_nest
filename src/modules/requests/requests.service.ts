import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { Request, RequestDocument, RequestStatus } from '../../database/schemas/request.schema';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { GetRequestsDto } from './dto/get-requests.dto';
import { PaginationResult, PaginationUtil } from '../../common/utils/pagination.util';
import { SortUtil } from '../../common/utils/sort.util';
import { XpService } from '../xp/xp.service';
import { AchievementsService } from '../achievements/achievements.service';

@Injectable()
export class RequestsService {
  constructor(
    @InjectModel(Request.name) private requestModel: Model<RequestDocument>,
    private xpService: XpService,
    private achievementsService: AchievementsService,
    private readonly i18n: I18nService,
  ) {}

  async create(createRequestDto: CreateRequestDto, buyerId: string) {
    if (createRequestDto.budgetMax < createRequestDto.budgetMin) {
      throw new BadRequestException(
        this.i18n.t('common.requests.budget_min_max_error', { lang: I18nContext.current()?.lang }),
      );
    }

    const request = new this.requestModel({
      ...createRequestDto,
      buyerId: new Types.ObjectId(buyerId),
      status: RequestStatus.ACTIVE,
    });

    await request.save();

    // Award XP to buyer
    await this.xpService.awardXp(buyerId, 10);
    await this.achievementsService.checkAndUnlockAchievements(buyerId);

    return request;
  }

  async findAll(dto: GetRequestsDto): Promise<PaginationResult<Request>> {
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
    let results: Request[];
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

  async findOne(id: string): Promise<Request> {
    const request = await this.requestModel
      .findById(id)
      .populate('buyerId', 'name avatar rating location memberSince completedDeals xp')
      .exec();

    if (!request) {
      throw new NotFoundException(
        this.i18n.t('common.requests.request_not_found', {
          lang: I18nContext.current()?.lang,
          args: { id },
        }),
      );
    }

    // Increment views
    request.views += 1;
    await request.save();

    return request;
  }

  async update(id: string, updateRequestDto: UpdateRequestDto, userId: string): Promise<Request> {
    const request = await this.findOne(id);

    if (request.buyerId.toString() !== userId) {
      throw new ForbiddenException(
        this.i18n.t('common.requests.forbidden_update_request', {
          lang: I18nContext.current()?.lang,
        }),
      );
    }

    if (request.status === RequestStatus.CLOSED) {
      throw new BadRequestException(
        this.i18n.t('common.requests.cannot_update_closed_request', {
          lang: I18nContext.current()?.lang,
        }),
      );
    }

    // Track edit history
    const editEntry = {
      text: this.i18n.t('common.requests.request_updated_at', {
        lang: I18nContext.current()?.lang,
        args: { timestamp: new Date().toISOString() },
      }),
      timestamp: new Date(),
    };
    request.edits.push(editEntry);

    Object.assign(request, updateRequestDto);
    await (request as RequestDocument).save();

    return request;
  }

  async remove(id: string, userId: string): Promise<{ success: boolean }> {
    const request = await this.findOne(id);

    if (request.buyerId.toString() !== userId) {
      throw new ForbiddenException(
        this.i18n.t('common.requests.forbidden_delete_request', {
          lang: I18nContext.current()?.lang,
        }),
      );
    }

    await this.requestModel.deleteOne({ _id: id }).exec();
    return { success: true };
  }

  async incrementProposalsCount(requestId: string) {
    await this.requestModel.updateOne({ _id: requestId }, { $inc: { proposalsCount: 1 } }).exec();
  }
}
