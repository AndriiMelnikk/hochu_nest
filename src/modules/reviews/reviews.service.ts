import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Review, ReviewDocument } from '../../database/schemas/review.schema';
import { Proposal, ProposalDocument, ProposalStatus } from '../../database/schemas/proposal.schema';
import { Request, RequestDocument } from '../../database/schemas/request.schema';
import { Profile, ProfileDocument } from '../../database/schemas/profile.schema';
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
    @InjectModel(Request.name) private requestModel: Model<RequestDocument>,
    @InjectModel(Profile.name) private profileModel: Model<ProfileDocument>,
    private xpService: XpService,
    private achievementsService: AchievementsService,
    private notificationsService: NotificationsService,
  ) {}

  async create(createReviewDto: CreateReviewDto, authorAccountId: string) {
    const { targetProfileId, proposalId, rating, comment } = createReviewDto;

    if (!proposalId) {
      throw new BadRequestException('Proposal ID is required for review');
    }

    const proposal = await this.proposalModel.findById(proposalId).exec();
    if (!proposal) {
      throw new NotFoundException(`Proposal with ID ${proposalId} not found`);
    }

    if (proposal.status !== ProposalStatus.COMPLETED) {
      throw new BadRequestException('Can only review completed proposals');
    }

    const request = await this.requestModel.findById(proposal.requestId).exec();
    if (!request) {
      throw new NotFoundException('Request not found');
    }

    const buyerProfileId = request.buyerId.toString();
    const sellerProfileId = proposal.sellerId.toString();

    const targetProfile = await this.profileModel.findById(targetProfileId).exec();
    if (!targetProfile) {
      throw new NotFoundException('Target profile not found');
    }

    if (targetProfileId !== buyerProfileId && targetProfileId !== sellerProfileId) {
      throw new BadRequestException('Target profile must be buyer or seller of this proposal');
    }

    const authorProfileId = targetProfileId === sellerProfileId ? buyerProfileId : sellerProfileId;
    const authorProfile = await this.profileModel
      .findOne({ _id: authorProfileId, accountId: new Types.ObjectId(authorAccountId) })
      .exec();
    if (!authorProfile) {
      throw new ForbiddenException('You can only review as the buyer or seller of this deal');
    }

    const existingReview = await this.reviewModel
      .findOne({
        authorAccountId: new Types.ObjectId(authorAccountId),
        proposalId: new Types.ObjectId(proposalId),
      })
      .exec();
    if (existingReview) {
      throw new BadRequestException('Review already exists for this proposal');
    }

    const review = new this.reviewModel({
      authorAccountId: new Types.ObjectId(authorAccountId),
      authorProfileId: new Types.ObjectId(authorProfileId),
      targetProfileId: new Types.ObjectId(targetProfileId),
      proposalId: new Types.ObjectId(proposalId),
      requestId: request._id,
      rating,
      comment: comment || null,
    });

    await review.save();

    await this.updateProfileRating(targetProfileId);

    await this.xpService.awardXp(authorProfileId, 5);

    if (rating === 5) {
      await this.xpService.awardXp(targetProfileId, 15);
    }

    await this.achievementsService.checkAndUnlockAchievements(authorProfileId);

    await this.notificationsService.create({
      accountId: targetProfile.accountId.toString(),
      type: NotificationType.REVIEW_RECEIVED,
      title: 'Новий відгук',
      message: `Ви отримали новий відгук з рейтингом ${rating}★`,
      link: `/profiles/${targetProfileId}/reviews`,
    });

    return review;
  }

  async findAll(
    targetProfileId?: string,
    requestId?: string,
    proposalId?: string,
    page?: number,
    pageSize?: number,
  ) {
    const normalizedPage = PaginationUtil.normalizePage(page);
    const normalizedPageSize = PaginationUtil.normalizePageSize(pageSize);
    const skip = PaginationUtil.getSkip(normalizedPage, normalizedPageSize);

    const query: Record<string, unknown> = {};
    if (targetProfileId) {
      query.targetProfileId = new Types.ObjectId(targetProfileId);
    }
    if (requestId) {
      query.requestId = new Types.ObjectId(requestId);
    }
    if (proposalId) {
      query.proposalId = new Types.ObjectId(proposalId);
    }

    const results = await this.reviewModel
      .find(query)
      .populate({ path: 'authorProfileId', select: 'avatar name' })
      .populate({
        path: 'targetProfileId',
        select: 'rating type avatar name',
      })
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
      { targetProfileId, requestId, proposalId },
    );
  }

  async findOne(id: string) {
    const review = await this.reviewModel
      .findById(id)
      .populate({ path: 'authorProfileId', select: 'avatar name' })
      .populate({
        path: 'targetProfileId',
        select: 'rating type avatar name',
      })
      .exec();

    if (!review) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }

    return review;
  }

  private async updateProfileRating(profileId: string) {
    const reviews = await this.reviewModel
      .find({ targetProfileId: new Types.ObjectId(profileId) })
      .exec();

    if (reviews.length === 0) {
      return;
    }

    let totalRating = 0;
    for (const r of reviews) {
      totalRating += r.rating;
    }
    const averageRating = Math.round((totalRating / reviews.length) * 100) / 100;

    await this.profileModel
      .updateOne({ _id: profileId }, { rating: averageRating, reviewsCount: reviews.length })
      .exec();
  }
}
