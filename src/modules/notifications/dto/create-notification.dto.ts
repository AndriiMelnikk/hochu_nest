import { NotificationType } from '../../../database/schemas/notification.schema';

export class CreateNotificationDto {
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  link?: string;
}
