import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Review, ReviewDocument } from '../../database/schemas/review.schema';
import {
  Proposal,
  ProposalDocument,
  ProposalStatus,
} from '../../database/schemas/proposal.schema';
import { User, UserDocument } from '../../database/schemas/user.schema';
import { CreateReviewDto } from './dto/create-review.dto';
import { XpService } from '../xp/xp.service';
import { AchievementsService } from '../achievements/achievements.service';
import { NotificationsService } from '../notifications/notifications.service';
import { PaginationUtil } from '../../common/utils/pagination.util';
import { NotificationType } from '../../database/schemas/notification.schema';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
    @InjectModel(Proposal.name) private proposalModel: Model<ProposalDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private xpService: XpService,
    private achievementsService: AchievementsService,
    private notificationsService: NotificationsService,
  ) {}

  async create(createReviewDto: CreateReviewDto, userId: string) {
    const { targetUserId, proposalId, rating, comment } = createReviewDto;

    // Check if proposal exists and is completed
    if (proposalId) {
      const proposal = await this.proposalModel.findById(proposalId).exec();
      if (!proposal) {
        throw new NotFoundException(`Proposal with ID ${proposalId} not found`);
      }

      if (proposal.status !== ProposalStatus.COMPLETED) {
        throw new BadRequestException('Can only review completed proposals');
      }

      // Check if user is the buyer of the request
      // This will be checked when we have request populated
    }

    // Check if review already exists for this proposal
    if (proposalId) {
      const existingReview = await this.reviewModel
        .findOne({
          userId: new Types.ObjectId(userId),
          proposalId: new Types.ObjectId(proposalId),
        })
        .exec();

      if (existingReview) {
        throw new BadRequestException(
          'Review already exists for this proposal',
        );
      }
    }

    // Create review
    const review = new this.reviewModel({
      userId: new Types.ObjectId(userId),
      targetUserId: new Types.ObjectId(targetUserId),
      proposalId: proposalId ? new Types.ObjectId(proposalId) : null,
      rating,
      comment: comment || null,
    });

    await review.save();

    // Update target user's rating
    await this.updateUserRating(targetUserId);

    // Award XP
    await this.xpService.awardXp(userId, 5);

    // Award bonus XP to seller if 5★
    if (rating === 5) {
      await this.xpService.awardXp(targetUserId, 15);
    }

    // Check achievements
    await this.achievementsService.checkAndUnlockAchievements(
      userId,
      'review_created',
    );

    // Notify target user
    const targetUser = await this.userModel.findById(targetUserId).exec();
    if (targetUser) {
      await this.notificationsService.create({
        userId: targetUserId,
        type: NotificationType.REVIEW_RECEIVED,
        title: 'Новий відгук',
        message: `Ви отримали новий відгук з рейтингом ${rating}★`,
        link: `/users/${targetUserId}/reviews`,
      });
    }

    return review;
  }

  async findAll(targetUserId?: string, page?: number, pageSize?: number) {
    const normalizedPage = PaginationUtil.normalizePage(page);
    const normalizedPageSize = PaginationUtil.normalizePageSize(pageSize);
    const skip = PaginationUtil.getSkip(normalizedPage, normalizedPageSize);

    const query: Record<string, any> = {};
    if (targetUserId) {
      query.targetUserId = new Types.ObjectId(targetUserId);
    }

    const results = await this.reviewModel
      .find(query)
      .populate('userId', 'name avatar')
      .populate('targetUserId', 'name avatar')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(normalizedPageSize)
      .lean()
      .exec();

    const count = await this.reviewModel.countDocuments(query).exec();

    return PaginationUtil.createPaginationResult(
      results,
      count,
      normalizedPage,
      normalizedPageSize,
      '/api/reviews',
      { targetUserId },
    );
  }

  async findOne(id: string) {
    const review = await this.reviewModel
      .findById(id)
      .populate('userId', 'name avatar')
      .populate('targetUserId', 'name avatar')
      .exec();

    if (!review) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }

    return review;
  }

  private async updateUserRating(userId: string) {
    const reviews = await this.reviewModel
      .find({ targetUserId: new Types.ObjectId(userId) })
      .exec();

    if (reviews.length === 0) {
      return;
    }

    let totalRating = 0;
    for (const review of reviews) {
      totalRating += review.rating;
    }
    const averageRating =
      Math.round((totalRating / reviews.length) * 100) / 100;

    await this.userModel
      .updateOne(
        { _id: userId },
        {
          rating: averageRating,
          reviewsCount: reviews.length,
        },
      )
      .exec();
  }
}
