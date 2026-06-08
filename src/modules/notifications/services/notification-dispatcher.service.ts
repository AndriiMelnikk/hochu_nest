import { Injectable, Logger, Optional } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Profile, ProfileDocument } from '../../../database/schemas/profile.schema';
import { Account, AccountDocument } from '../../../database/schemas/account.schema';
import {
  Notification,
  NotificationDocument,
  NotificationMetadata,
} from '../../../database/schemas/notification.schema';
import {
  NotificationCategory,
  NotificationChannel,
} from '../../../database/enums/notification-category.enum';
import { NotificationType } from '../../../database/schemas/notification.schema';
import { NOTIFICATION_TYPE_TO_CATEGORY } from '../constants/type-to-category.map';
import { NotificationPreferencesService } from './notification-preferences.service';
import { NotificationTemplatesService } from './notification-templates.service';
import { DispatchNotificationDto } from '../dto/dispatch-notification.dto';
import { NotificationsGateway } from '../gateways/notifications.gateway';
import { MailService } from '../../mail/mail.service';

@Injectable()
export class NotificationDispatcher {
  private readonly logger = new Logger(NotificationDispatcher.name);
  private readonly emailThrottle = new Map<string, number>();
  private readonly EMAIL_THROTTLE_MS = 60_000;
  private readonly EMAIL_THROTTLE_MAX = 10;

  constructor(
    @InjectModel(Profile.name) private profileModel: Model<ProfileDocument>,
    @InjectModel(Account.name) private accountModel: Model<AccountDocument>,
    @InjectModel(Notification.name) private notificationModel: Model<NotificationDocument>,
    private readonly preferencesService: NotificationPreferencesService,
    private readonly templatesService: NotificationTemplatesService,
    @Optional() private readonly gateway?: NotificationsGateway,
    @Optional() private readonly mailService?: MailService,
  ) {}

  async dispatch(dto: DispatchNotificationDto): Promise<NotificationDocument | null> {
    const category = NOTIFICATION_TYPE_TO_CATEGORY[dto.type];
    const profile = dto.profileId ? await this.profileModel.findById(dto.profileId).exec() : null;

    const preferences = profile?.notificationPreferences;
    const categoryPreference = this.preferencesService.getCategoryPreference(preferences, category);

    if (!categoryPreference.enabled) {
      return null;
    }

    const { title, message, link } = this.templatesService.build(
      dto.type,
      dto.metadata,
      dto.link,
      dto.lang,
    );

    const channels = categoryPreference.channels ?? [NotificationChannel.IN_APP];
    let notification: NotificationDocument | null = null;

    if (channels.includes(NotificationChannel.IN_APP) && !dto.skipInApp) {
      notification = await this.createInAppNotification({
        accountId: dto.accountId,
        profileId: dto.profileId,
        type: dto.type,
        category,
        title,
        message,
        link,
        metadata: dto.metadata,
      });

      if (notification && this.gateway) {
        const unreadCount = await this.notificationModel
          .countDocuments({
            accountId: new Types.ObjectId(dto.accountId),
            read: false,
          })
          .exec();

        this.gateway.emitToAccount(dto.accountId, 'notification:new', notification);
        this.gateway.emitToAccount(dto.accountId, 'notification:unread_count', { unreadCount });
      }
    }

    if (channels.includes(NotificationChannel.EMAIL) && this.mailService) {
      await this.sendEmailIfAllowed(dto.accountId, dto.type, {
        title,
        message,
        link,
        lang: dto.lang,
      });
    }

    return notification;
  }

  isAccountOnline(accountId: string): boolean {
    return this.gateway?.isAccountOnline(accountId) ?? false;
  }

  private async createInAppNotification(data: {
    accountId: string;
    profileId?: string;
    type: NotificationType;
    category: NotificationCategory;
    title: string;
    message: string;
    link: string;
    metadata?: DispatchNotificationDto['metadata'];
  }): Promise<NotificationDocument> {
    const metadata: NotificationMetadata | undefined = data.metadata
      ? {
          requestId: data.metadata.requestId
            ? new Types.ObjectId(data.metadata.requestId)
            : undefined,
          proposalId: data.metadata.proposalId
            ? new Types.ObjectId(data.metadata.proposalId)
            : undefined,
          senderAccountId: data.metadata.senderAccountId
            ? new Types.ObjectId(data.metadata.senderAccountId)
            : undefined,
          achievementId: data.metadata.achievementId,
        }
      : undefined;

    const notification = new this.notificationModel({
      accountId: new Types.ObjectId(data.accountId),
      profileId: data.profileId ? new Types.ObjectId(data.profileId) : null,
      type: data.type,
      category: data.category,
      title: data.title,
      message: data.message,
      link: data.link,
      metadata,
    });

    await notification.save();
    return notification as unknown as NotificationDocument;
  }

  private async sendEmailIfAllowed(
    accountId: string,
    type: DispatchNotificationDto['type'],
    payload: { title: string; message: string; link: string; lang?: string },
  ): Promise<void> {
    if (!this.canSendEmail(type)) {
      return;
    }

    const account = await this.accountModel.findById(accountId).exec();
    if (!account?.email) {
      return;
    }

    try {
      await this.mailService!.sendNotificationEmail(account.email, payload);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`Failed to send notification email to ${account.email}: ${message}`);
    }
  }

  private canSendEmail(type: DispatchNotificationDto['type']): boolean {
    const key = `email:${type}`;
    const now = Date.now();
    const windowStart = this.emailThrottle.get(key) ?? now;
    const countKey = `${key}:count`;

    if (now - windowStart > this.EMAIL_THROTTLE_MS) {
      this.emailThrottle.set(key, now);
      this.emailThrottle.set(countKey, 1);
      return true;
    }

    const count = this.emailThrottle.get(countKey) ?? 0;
    if (count >= this.EMAIL_THROTTLE_MAX) {
      return false;
    }

    this.emailThrottle.set(countKey, count + 1);
    return true;
  }
}
