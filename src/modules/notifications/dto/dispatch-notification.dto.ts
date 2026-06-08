import { NotificationType } from '../../../database/schemas/notification.schema';

export interface NotificationMetadataPayload {
  requestId?: string;
  proposalId?: string;
  senderAccountId?: string;
  achievementId?: string;
  requestTitle?: string;
  rating?: number;
}

export interface DispatchNotificationDto {
  type: NotificationType;
  accountId: string;
  profileId?: string;
  metadata?: NotificationMetadataPayload;
  link?: string;
  lang?: string;
  skipInApp?: boolean;
}
