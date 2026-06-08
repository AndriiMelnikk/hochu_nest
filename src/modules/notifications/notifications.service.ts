import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Notification, NotificationDocument } from '../../database/schemas/notification.schema';
import { RequestDocument } from '../../database/schemas/request.schema';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { DispatchNotificationDto } from './dto/dispatch-notification.dto';
import { CreateRequestSubscriptionDto } from './dto/create-request-subscription.dto';
import { UpdateRequestSubscriptionDto } from './dto/update-request-subscription.dto';
import { UpdateNotificationPreferencesDto } from './dto/update-notification-preferences.dto';
import { PaginationResult, PaginationUtil } from '../../common/utils/pagination.util';
import { GetNotificationsDto } from './dto/get-notifications.dto';
import { GetRequestSubscriptionsDto } from './dto/get-request-subscriptions.dto';
import { NOTIFICATION_TYPE_TO_CATEGORY } from './constants/type-to-category.map';
import { NotificationDispatcher } from './services/notification-dispatcher.service';
import { NotificationPreferencesService } from './services/notification-preferences.service';
import { RequestSubscriptionService } from './services/request-subscription.service';
import {
  MatchedSellerProfile,
  RequestSubscriptionMatcherService,
} from './services/request-subscription-matcher.service';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel(Notification.name)
    private notificationModel: Model<NotificationDocument>,
    private readonly dispatcher: NotificationDispatcher,
    private readonly preferencesService: NotificationPreferencesService,
    private readonly requestSubscriptionService: RequestSubscriptionService,
    private readonly requestSubscriptionMatcher: RequestSubscriptionMatcherService,
  ) {}

  async create(dto: CreateNotificationDto) {
    const category = dto.category ?? NOTIFICATION_TYPE_TO_CATEGORY[dto.type];

    const notification = new this.notificationModel({
      accountId: new Types.ObjectId(dto.accountId),
      profileId: dto.profileId ? new Types.ObjectId(dto.profileId) : null,
      type: dto.type,
      category,
      title: dto.title,
      message: dto.message,
      link: dto.link,
      metadata: dto.metadata,
    });

    await notification.save();
    return notification;
  }

  async findAll(userId: string, dto: GetNotificationsDto): Promise<PaginationResult<Notification>> {
    const page = PaginationUtil.normalizePage(dto.page);
    const pageSize = PaginationUtil.normalizePageSize(dto.pageSize);
    const skip = PaginationUtil.getSkip(page, pageSize);

    const query: Record<string, unknown> = {
      accountId: new Types.ObjectId(userId),
    };
    if (dto.unread !== undefined) {
      query.read = !dto.unread;
    }
    if (dto.category) {
      query.category = dto.category;
    }
    if (dto.profileId) {
      query.profileId = new Types.ObjectId(dto.profileId);
    }

    const results = await this.notificationModel
      .find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(pageSize)
      .lean()
      .exec();

    const count = await this.notificationModel.countDocuments(query).exec();

    const queryParams: Record<string, string | number | boolean> = { page, pageSize };
    if (dto.unread !== undefined) queryParams.unread = dto.unread;
    if (dto.category) queryParams.category = dto.category;
    if (dto.profileId) queryParams.profileId = dto.profileId;

    return PaginationUtil.createPaginationResult(
      results,
      count,
      page,
      pageSize,
      '/api/notifications',
      queryParams,
    );
  }

  async markAsRead(id: string, accountId: string) {
    await this.notificationModel
      .updateOne({ _id: id, accountId: new Types.ObjectId(accountId) }, { read: true })
      .exec();
    return { success: true };
  }

  async markAllAsRead(accountId: string) {
    await this.notificationModel
      .updateMany({ accountId: new Types.ObjectId(accountId), read: false }, { read: true })
      .exec();
    return { success: true };
  }

  async getUnreadCount(accountId: string) {
    return this.notificationModel
      .countDocuments({
        accountId: new Types.ObjectId(accountId),
        read: false,
      })
      .exec();
  }

  dispatch(dto: DispatchNotificationDto) {
    return this.dispatcher.dispatch(dto);
  }

  isAccountOnline(accountId: string): boolean {
    return this.dispatcher.isAccountOnline(accountId);
  }

  getNotificationPreferences(profileId: string, accountId: string) {
    return this.preferencesService.getByProfileId(profileId, accountId);
  }

  updateNotificationPreferences(
    profileId: string,
    accountId: string,
    dto: UpdateNotificationPreferencesDto,
  ) {
    return this.preferencesService.update(profileId, accountId, dto);
  }

  findRequestSubscriptions(profileId: string, accountId: string, dto: GetRequestSubscriptionsDto) {
    return this.requestSubscriptionService.findAllByProfileId(profileId, accountId, dto);
  }

  createRequestSubscription(
    profileId: string,
    accountId: string,
    dto: CreateRequestSubscriptionDto,
  ) {
    return this.requestSubscriptionService.create(profileId, accountId, dto);
  }

  updateRequestSubscription(
    profileId: string,
    subscriptionId: string,
    accountId: string,
    dto: UpdateRequestSubscriptionDto,
  ) {
    return this.requestSubscriptionService.update(profileId, subscriptionId, accountId, dto);
  }

  removeRequestSubscription(profileId: string, subscriptionId: string, accountId: string) {
    return this.requestSubscriptionService.remove(profileId, subscriptionId, accountId);
  }

  findMatchingSellerProfiles(request: RequestDocument): Promise<MatchedSellerProfile[]> {
    return this.requestSubscriptionMatcher.findMatchingSellerProfiles(request);
  }
}
