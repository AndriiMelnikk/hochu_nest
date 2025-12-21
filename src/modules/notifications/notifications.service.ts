import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  Notification,
  NotificationDocument,
  NotificationType,
} from '../../database/schemas/notification.schema';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { PaginationUtil } from '../../common/utils/pagination.util';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel(Notification.name)
    private notificationModel: Model<NotificationDocument>,
  ) {}

  async create(dto: CreateNotificationDto) {
    const notification = new this.notificationModel({
      userId: new Types.ObjectId(dto.userId),
      type: dto.type,
      title: dto.title,
      message: dto.message,
      link: dto.link,
    });

    await notification.save();
    return notification;
  }

  async findAll(userId: string, unread?: boolean, page?: number, pageSize?: number) {
    const normalizedPage = PaginationUtil.normalizePage(page);
    const normalizedPageSize = PaginationUtil.normalizePageSize(pageSize);
    const skip = PaginationUtil.getSkip(normalizedPage, normalizedPageSize);

    const query: any = { userId: new Types.ObjectId(userId) };
    if (unread !== undefined) {
      query.read = !unread;
    }

    const [results, count] = await Promise.all([
      this.notificationModel
        .find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(normalizedPageSize)
        .exec(),
      this.notificationModel.countDocuments(query).exec(),
    ]);

    return PaginationUtil.createPaginationResult(
      results,
      count,
      normalizedPage,
      normalizedPageSize,
      '/api/notifications',
      { unread },
    );
  }

  async markAsRead(id: string, userId: string) {
    await this.notificationModel.updateOne(
      { _id: id, userId: new Types.ObjectId(userId) },
      { read: true },
    ).exec();
    return { success: true };
  }

  async markAllAsRead(userId: string) {
    await this.notificationModel.updateMany(
      { userId: new Types.ObjectId(userId), read: false },
      { read: true },
    ).exec();
    return { success: true };
  }

  async getUnreadCount(userId: string) {
    return this.notificationModel.countDocuments({
      userId: new Types.ObjectId(userId),
      read: false,
    }).exec();
  }
}

