import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from '../../database/schemas/user.schema';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUsersDto } from './dto/get-users.dto';
import { PaginationUtil } from '../../common/utils/pagination.util';
import { AchievementsService } from '../achievements/achievements.service';
import {
  Request,
  RequestDocument,
} from '../../database/schemas/request.schema';
import {
  Proposal,
  ProposalDocument,
} from '../../database/schemas/proposal.schema';
import { Review, ReviewDocument } from '../../database/schemas/review.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Request.name) private requestModel: Model<RequestDocument>,
    @InjectModel(Proposal.name) private proposalModel: Model<ProposalDocument>,
    @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
    private achievementsService: AchievementsService,
  ) {}

  async findOne(id: string): Promise<UserDocument> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findMe(userId: string): Promise<UserDocument> {
    return this.findOne(userId);
  }

  async updateMe(userId: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(userId);
    Object.assign(user, updateUserDto);
    await user.save();
    return this.sanitizeUser(user);
  }

  async getUserStats(userId: string) {
    const user = await this.findOne(userId);

    const [totalRequests, totalProposals, acceptedProposals] =
      await Promise.all([
        this.requestModel
          .countDocuments({ buyerId: new Types.ObjectId(userId) })
          .exec(),
        this.proposalModel
          .countDocuments({ sellerId: new Types.ObjectId(userId) })
          .exec(),
        this.proposalModel
          .countDocuments({
            sellerId: new Types.ObjectId(userId),
            status: 'accepted',
          })
          .exec(),
      ]);

    const totalEarned = await this.proposalModel
      .aggregate([
        {
          $match: {
            sellerId: new Types.ObjectId(userId),
            status: 'completed',
          },
        },
        {
          $group: {
            _id: null,
            total: { $sum: '$price' },
          },
        },
      ])
      .exec();

    const totalSpent = await this.proposalModel
      .aggregate([
        {
          $lookup: {
            from: 'requests',
            localField: 'requestId',
            foreignField: '_id',
            as: 'request',
          },
        },
        {
          $unwind: '$request',
        },
        {
          $match: {
            'request.buyerId': new Types.ObjectId(userId),
            status: 'completed',
          },
        },
        {
          $group: {
            _id: null,
            total: { $sum: '$price' },
          },
        },
      ])
      .exec();

    return {
      totalRequests,
      totalProposals,
      acceptedProposals,
      completedDeals: user.completedDeals,
      averageRating: user.rating,
      totalEarned: totalEarned[0]?.total || 0,
      totalSpent: totalSpent[0]?.total || 0,
    };
  }

  async getUserAchievements(userId: string) {
    return this.achievementsService.getUserAchievements(userId);
  }

  async findAll(dto: GetUsersDto) {
    const page = PaginationUtil.normalizePage(dto.page);
    const pageSize = PaginationUtil.normalizePageSize(dto.pageSize);
    const skip = PaginationUtil.getSkip(page, pageSize);

    const query: any = {};

    if (dto.role) {
      query.role = dto.role;
    }

    if (dto.search) {
      query.$or = [
        { name: { $regex: dto.search, $options: 'i' } },
        { email: { $regex: dto.search, $options: 'i' } },
      ];
    }

    const [results, count] = await Promise.all([
      this.userModel
        .find(query)
        .skip(skip)
        .limit(pageSize)
        .select('-password')
        .exec(),
      this.userModel.countDocuments(query).exec(),
    ]);

    return PaginationUtil.createPaginationResult(
      results.map((user) => this.sanitizeUser(user)),
      count,
      page,
      pageSize,
      '/api/users',
      dto,
    );
  }

  async getUserRequests(userId: string, status?: string) {
    const query: any = { buyerId: new Types.ObjectId(userId) };
    if (status) {
      query.status = status;
    }

    const [results, count] = await Promise.all([
      this.requestModel.find(query).sort({ createdAt: -1 }).exec(),
      this.requestModel.countDocuments(query).exec(),
    ]);

    return { count, results };
  }

  async getUserProposals(userId: string, status?: string) {
    const query: any = { sellerId: new Types.ObjectId(userId) };
    if (status) {
      query.status = status;
    }

    const [results, count] = await Promise.all([
      this.proposalModel
        .find(query)
        .populate('requestId', 'title')
        .sort({ createdAt: -1 })
        .exec(),
      this.proposalModel.countDocuments(query).exec(),
    ]);

    return { count, results };
  }

  async getUserReviews(userId: string) {
    const [results, count] = await Promise.all([
      this.reviewModel
        .find({ targetUserId: new Types.ObjectId(userId) })
        .populate('userId', 'name avatar')
        .sort({ createdAt: -1 })
        .exec(),
      this.reviewModel
        .countDocuments({ targetUserId: new Types.ObjectId(userId) })
        .exec(),
    ]);

    return { count, results };
  }

  async updateUserXp(userId: string, amount: number) {
    const user = await this.findOne(userId);
    user.xp += amount;
    await user.save();
    return user;
  }

  async updateUserRating(userId: string) {
    // This will be implemented when reviews module is ready
    // For now, just return the current rating
    const user = await this.findOne(userId);
    return user.rating;
  }

  private sanitizeUser(user: UserDocument) {
    const userObj = user.toObject();
    delete userObj.password;
    return userObj;
  }
}
