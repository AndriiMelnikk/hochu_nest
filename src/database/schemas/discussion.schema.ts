import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type DiscussionDocument = Discussion & Document;

@Schema({ timestamps: true })
export class Discussion {
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Request', default: null, index: true })
  requestId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Proposal', default: null, index: true })
  proposalId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Discussion', default: null, index: true })
  replyToId: Types.ObjectId;

  @Prop({ required: true, maxlength: 2000 })
  content: string;

  createdAt: Date;
  updatedAt: Date;
}

export const DiscussionSchema = SchemaFactory.createForClass(Discussion);

// Indexes
DiscussionSchema.index({ requestId: 1 });
DiscussionSchema.index({ proposalId: 1 });
DiscussionSchema.index({ userId: 1 });
DiscussionSchema.index({ replyToId: 1 });
