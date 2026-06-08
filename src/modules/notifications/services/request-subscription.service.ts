import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { Profile, ProfileDocument, ProfileType } from '../../../database/schemas/profile.schema';
import {
  RequestSubscription,
  RequestSubscriptionDocument,
} from '../../../database/schemas/request-subscription.schema';
import { NotificationChannel } from '../../../database/enums/notification-category.enum';
import { CreateRequestSubscriptionDto } from '../dto/create-request-subscription.dto';
import { UpdateRequestSubscriptionDto } from '../dto/update-request-subscription.dto';
import { GetRequestSubscriptionsDto } from '../dto/get-request-subscriptions.dto';
import { PaginationResult, PaginationUtil } from '../../../common/utils/pagination.util';

@Injectable()
export class RequestSubscriptionService {
  constructor(
    @InjectModel(RequestSubscription.name)
    private requestSubscriptionModel: Model<RequestSubscriptionDocument>,
    @InjectModel(Profile.name) private profileModel: Model<ProfileDocument>,
    private readonly i18n: I18nService,
  ) {}

  async findAllByProfileId(
    profileId: string,
    accountId: string,
    dto: GetRequestSubscriptionsDto = {},
  ): Promise<PaginationResult<RequestSubscription>> {
    await this.assertSellerProfile(profileId, accountId);

    const page = PaginationUtil.normalizePage(dto.page);
    const pageSize = PaginationUtil.normalizePageSize(dto.pageSize);
    const skip = PaginationUtil.getSkip(page, pageSize);
    const query: Record<string, unknown> = {
      sellerProfileId: new Types.ObjectId(profileId),
    };

    const results = await this.requestSubscriptionModel
      .find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(pageSize)
      .lean()
      .exec();

    const count = await this.requestSubscriptionModel.countDocuments(query).exec();

    return PaginationUtil.createPaginationResult(
      results,
      count,
      page,
      pageSize,
      `/api/users/${profileId}/request-subscriptions`,
      { page, pageSize },
    );
  }

  async create(profileId: string, accountId: string, dto: CreateRequestSubscriptionDto) {
    await this.assertSellerProfile(profileId, accountId);

    const subscription = new this.requestSubscriptionModel({
      sellerProfileId: new Types.ObjectId(profileId),
      categories: (dto.categories ?? []).map((id) => new Types.ObjectId(id)),
      location: dto.location ?? null,
      budgetMin: dto.budgetMin ?? null,
      budgetMax: dto.budgetMax ?? null,
      enabled: dto.enabled ?? true,
      channels: dto.channels ?? [NotificationChannel.IN_APP],
    });

    await subscription.save();
    return subscription;
  }

  async update(
    profileId: string,
    subscriptionId: string,
    accountId: string,
    dto: UpdateRequestSubscriptionDto,
  ) {
    await this.assertSellerProfile(profileId, accountId);

    const subscription = await this.requestSubscriptionModel
      .findOne({
        _id: new Types.ObjectId(subscriptionId),
        sellerProfileId: new Types.ObjectId(profileId),
      })
      .exec();

    if (!subscription) {
      throw new NotFoundException('Request subscription not found');
    }

    if (dto.categories !== undefined) {
      subscription.categories = dto.categories.map((id) => new Types.ObjectId(id));
    }
    if (dto.location !== undefined) subscription.location = dto.location;
    if (dto.budgetMin !== undefined) subscription.budgetMin = dto.budgetMin;
    if (dto.budgetMax !== undefined) subscription.budgetMax = dto.budgetMax;
    if (dto.enabled !== undefined) subscription.enabled = dto.enabled;
    if (dto.channels !== undefined) subscription.channels = dto.channels;

    await subscription.save();
    return subscription;
  }

  async remove(profileId: string, subscriptionId: string, accountId: string) {
    await this.assertSellerProfile(profileId, accountId);

    const result = await this.requestSubscriptionModel
      .deleteOne({
        _id: new Types.ObjectId(subscriptionId),
        sellerProfileId: new Types.ObjectId(profileId),
      })
      .exec();

    if (result.deletedCount === 0) {
      throw new NotFoundException('Request subscription not found');
    }

    return { success: true };
  }

  private async assertSellerProfile(
    profileId: string,
    accountId: string,
  ): Promise<ProfileDocument> {
    const profile = await this.profileModel
      .findOne({
        _id: new Types.ObjectId(profileId),
        accountId: new Types.ObjectId(accountId),
        type: ProfileType.SELLER,
      })
      .exec();

    if (!profile) {
      throw new ForbiddenException(
        this.i18n.t('common.auth.profile_not_found', { lang: I18nContext.current()?.lang }),
      );
    }

    return profile;
  }
}
