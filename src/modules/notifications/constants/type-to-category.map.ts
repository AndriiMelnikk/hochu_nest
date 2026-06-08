import { NotificationCategory } from '../../../database/enums/notification-category.enum';
import { NotificationType } from '../../../database/schemas/notification.schema';

export const NOTIFICATION_TYPE_TO_CATEGORY: Record<NotificationType, NotificationCategory> = {
  [NotificationType.NEW_PROPOSAL]: NotificationCategory.MY_REQUEST_ACTIVITY,
  [NotificationType.PROPOSAL_ACCEPTED]: NotificationCategory.MY_PROPOSAL_STATUS,
  [NotificationType.PROPOSAL_REJECTED]: NotificationCategory.MY_PROPOSAL_STATUS,
  [NotificationType.PROPOSAL_CANCELLED]: NotificationCategory.MY_PROPOSAL_STATUS,
  [NotificationType.NEW_MESSAGE]: NotificationCategory.MESSAGES,
  [NotificationType.REVIEW_RECEIVED]: NotificationCategory.REVIEWS,
  [NotificationType.ACHIEVEMENT_UNLOCKED]: NotificationCategory.ACHIEVEMENTS,
  [NotificationType.REQUEST_APPROVED]: NotificationCategory.REQUEST_UPDATES,
  [NotificationType.REQUEST_REJECTED]: NotificationCategory.REQUEST_UPDATES,
  [NotificationType.NEW_REQUEST_IN_CATEGORY]: NotificationCategory.NEW_REQUESTS,
};
