import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ReviewDocument = Review & Document;

@Schema({ timestamps: true })
export class Review {
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  targetUserId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Request', default: null, index: true })
  requestId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Proposal', default: null, index: true })
  proposalId: Types.ObjectId;

  @Prop({ type: Number, required: true, min: 1, max: 5 })
  rating: number;

  @Prop({ default: null })
  comment: string;

  createdAt: Date;
  updatedAt: Date;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);

// Indexes
ReviewSchema.index({ userId: 1 });
ReviewSchema.index({ targetUserId: 1 });
ReviewSchema.index({ requestId: 1 });
ReviewSchema.index({ proposalId: 1 });
