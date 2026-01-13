import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type MessageDocument = Message & Document;

@Schema({ timestamps: { createdAt: true, updatedAt: false } })
export class Message {
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  senderId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  receiverId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Request', default: null })
  requestId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Proposal', default: null })
  proposalId: Types.ObjectId;

  @Prop({ required: true })
  content: string;

  @Prop({ type: Boolean, default: false })
  read: boolean;

  createdAt: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);

// Indexes
MessageSchema.index({ senderId: 1 });
MessageSchema.index({ receiverId: 1 });
MessageSchema.index({ requestId: 1 });
MessageSchema.index({ proposalId: 1 });
MessageSchema.index({ createdAt: -1 });
