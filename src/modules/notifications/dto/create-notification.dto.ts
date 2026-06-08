import { NotificationCategory } from '../../../database/enums/notification-category.enum';
import {
  NotificationMetadata,
  NotificationType,
} from '../../../database/schemas/notification.schema';

export class CreateNotificationDto {
  accountId: string;
  profileId?: string;
  type: NotificationType;
  category?: NotificationCategory;
  title: string;
  message: string;
  link?: string;
  metadata?: NotificationMetadata;
}
