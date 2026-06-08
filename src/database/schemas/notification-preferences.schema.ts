import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { NotificationCategory, NotificationChannel } from '../enums/notification-category.enum';

@Schema({ _id: false })
export class CategoryPreference {
  @Prop({ type: Boolean, default: true })
  enabled: boolean;

  @Prop({
    type: [String],
    enum: Object.values(NotificationChannel),
    default: [NotificationChannel.IN_APP],
  })
  channels: NotificationChannel[];
}

export const CategoryPreferenceSchema = SchemaFactory.createForClass(CategoryPreference);

@Schema({ _id: false })
export class NewRequestsPreference extends CategoryPreference {
  @Prop({ type: [Types.ObjectId], default: [] })
  categories: Types.ObjectId[];

  @Prop({ type: String, default: null })
  location: string | null;
}

export const NewRequestsPreferenceSchema = SchemaFactory.createForClass(NewRequestsPreference);

@Schema({ _id: false })
export class NotificationPreferences {
  @Prop({
    type: NewRequestsPreferenceSchema,
    default: () => defaultCategoryPreference(),
  })
  [NotificationCategory.NEW_REQUESTS]: NewRequestsPreference;

  @Prop({
    type: CategoryPreferenceSchema,
    default: () => defaultCategoryPreference(),
  })
  [NotificationCategory.REQUEST_UPDATES]: CategoryPreference;

  @Prop({
    type: CategoryPreferenceSchema,
    default: () => defaultCategoryPreference(),
  })
  [NotificationCategory.MY_REQUEST_ACTIVITY]: CategoryPreference;

  @Prop({
    type: CategoryPreferenceSchema,
    default: () => defaultCategoryPreference(),
  })
  [NotificationCategory.MY_PROPOSAL_STATUS]: CategoryPreference;

  @Prop({
    type: CategoryPreferenceSchema,
    default: () => defaultCategoryPreference(),
  })
  [NotificationCategory.MESSAGES]: CategoryPreference;

  @Prop({
    type: CategoryPreferenceSchema,
    default: () => defaultCategoryPreference(),
  })
  [NotificationCategory.REVIEWS]: CategoryPreference;

  @Prop({
    type: CategoryPreferenceSchema,
    default: () => defaultCategoryPreference(),
  })
  [NotificationCategory.ACHIEVEMENTS]: CategoryPreference;
}

export const NotificationPreferencesSchema = SchemaFactory.createForClass(NotificationPreferences);

export function defaultCategoryPreference(): CategoryPreference {
  return {
    enabled: true,
    channels: [NotificationChannel.IN_APP],
  };
}

export function defaultNewRequestsPreference(): NewRequestsPreference {
  return {
    enabled: true,
    channels: [NotificationChannel.IN_APP],
    categories: [],
    location: null,
  };
}

export function defaultNotificationPreferences(): NotificationPreferences {
  return {
    [NotificationCategory.NEW_REQUESTS]: defaultNewRequestsPreference(),
    [NotificationCategory.REQUEST_UPDATES]: defaultCategoryPreference(),
    [NotificationCategory.MY_REQUEST_ACTIVITY]: defaultCategoryPreference(),
    [NotificationCategory.MY_PROPOSAL_STATUS]: defaultCategoryPreference(),
    [NotificationCategory.MESSAGES]: defaultCategoryPreference(),
    [NotificationCategory.REVIEWS]: defaultCategoryPreference(),
    [NotificationCategory.ACHIEVEMENTS]: defaultCategoryPreference(),
  };
}
