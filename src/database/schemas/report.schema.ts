import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ReportDocument = Report & Document;

export enum ReportTargetType {
  REQUEST = 'request',
  PROPOSAL = 'proposal',
  USER = 'user',
  DISCUSSION = 'discussion',
}

export enum ReportReason {
  LOW_PRICE = 'low-price',
  SCAM = 'scam',
  INAPPROPRIATE = 'inappropriate',
  SPAM = 'spam',
  DUPLICATE = 'duplicate',
  OTHER = 'other',
}

export enum ReportStatus {
  PENDING = 'pending',
  REVIEWED = 'reviewed',
  RESOLVED = 'resolved',
  REJECTED = 'rejected',
}

@Schema({ timestamps: true })
export class Report {
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  reporterId: Types.ObjectId;

  @Prop({
    type: String,
    enum: Object.values(ReportTargetType),
    required: true,
    index: true,
  })
  targetType: ReportTargetType;

  @Prop({ required: true, index: true })
  targetId: Types.ObjectId;

  @Prop({
    type: String,
    enum: Object.values(ReportReason),
    required: true,
  })
  reason: ReportReason;

  @Prop({ default: null })
  details: string;

  @Prop({
    type: String,
    enum: Object.values(ReportStatus),
    default: ReportStatus.PENDING,
    index: true,
  })
  status: ReportStatus;

  createdAt: Date;
  updatedAt: Date;
}

export const ReportSchema = SchemaFactory.createForClass(Report);

// Indexes
ReportSchema.index({ reporterId: 1 });
ReportSchema.index({ targetType: 1, targetId: 1 });
ReportSchema.index({ status: 1 });
