import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ReviewDocument = Review & Document;

@Schema({ timestamps: true })
export class Review {
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Account', required: true })
  authorAccountId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Profile', required: true })
  authorProfileId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Profile', required: true })
  targetProfileId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Request', default: null })
  requestId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Proposal', default: null })
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
ReviewSchema.index({ authorAccountId: 1 });
ReviewSchema.index({ authorProfileId: 1 });
ReviewSchema.index({ targetProfileId: 1 });
ReviewSchema.index({ requestId: 1 });
ReviewSchema.index({ proposalId: 1 });
