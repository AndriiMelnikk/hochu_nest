import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { NotificationCategory } from '../enums/notification-category.enum';

export type NotificationDocument = Notification & Document;

export enum NotificationType {
  NEW_PROPOSAL = 'new_proposal',
  PROPOSAL_ACCEPTED = 'proposal_accepted',
  PROPOSAL_REJECTED = 'proposal_rejected',
  PROPOSAL_CANCELLED = 'proposal_cancelled',
  NEW_MESSAGE = 'new_message',
  REVIEW_RECEIVED = 'review_received',
  ACHIEVEMENT_UNLOCKED = 'achievement_unlocked',
  REQUEST_APPROVED = 'request_approved',
  REQUEST_REJECTED = 'request_rejected',
  NEW_REQUEST_IN_CATEGORY = 'new_request_in_category',
}

@Schema({ _id: false })
export class NotificationMetadata {
  @Prop({ type: Types.ObjectId, default: null })
  requestId?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, default: null })
  proposalId?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, default: null })
  senderAccountId?: Types.ObjectId;

  @Prop({ type: String, default: null })
  achievementId?: string;
}

export const NotificationMetadataSchema = SchemaFactory.createForClass(NotificationMetadata);

@Schema({ timestamps: { createdAt: true, updatedAt: false } })
export class Notification {
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Account', required: true })
  accountId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Profile', default: null })
  profileId?: Types.ObjectId;

  @Prop({
    type: String,
    enum: Object.values(NotificationType),
    required: true,
  })
  type: NotificationType;

  @Prop({
    type: String,
    enum: Object.values(NotificationCategory),
    required: true,
  })
  category: NotificationCategory;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  message: string;

  @Prop({ default: null })
  link: string;

  @Prop({ type: NotificationMetadataSchema, default: null })
  metadata?: NotificationMetadata;

  @Prop({ type: Boolean, default: false })
  read: boolean;

  createdAt: Date;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);

NotificationSchema.index({ accountId: 1 });
NotificationSchema.index({ read: 1 });
NotificationSchema.index({ createdAt: -1 });
NotificationSchema.index({ accountId: 1, read: 1, createdAt: -1 });
NotificationSchema.index({ accountId: 1, category: 1 });
NotificationSchema.index({ accountId: 1, profileId: 1 });
