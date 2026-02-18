import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type DiscussionDocument = Discussion & Document;

@Schema({ timestamps: true })
export class Discussion {
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Request', default: null })
  requestId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Proposal', default: null })
  proposalId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Account', required: true })
  accountId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Discussion', default: null })
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
DiscussionSchema.index({ accountId: 1 });
DiscussionSchema.index({ replyToId: 1 });
