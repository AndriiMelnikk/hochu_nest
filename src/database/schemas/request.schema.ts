import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type RequestDocument = Request & Document;

export enum RequestStatus {
  PENDING = 'pending',
  ACTIVE = 'active',
  CLOSED = 'closed',
  REJECTED = 'rejected',
}

@Schema({ timestamps: true })
export class Request {
  _id: Types.ObjectId;

  @Prop({ required: true, trim: true, index: 'text' })
  title: string;

  @Prop({ required: true, index: 'text' })
  description: string;

  @Prop({ required: true })
  category: string;

  @Prop({ type: Number, required: true, min: 0 })
  budgetMin: number;

  @Prop({ type: Number, required: true, min: 0 })
  budgetMax: number;

  @Prop({ required: true })
  location: string;

  @Prop({ required: true })
  urgency: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  buyerId: Types.ObjectId;

  @Prop({ type: [String], default: [] })
  images: string[];

  @Prop({ type: Number, default: 0 })
  views: number;

  @Prop({ type: Number, default: 0 })
  proposalsCount: number;

  @Prop({
    type: String,
    enum: Object.values(RequestStatus),
    default: RequestStatus.PENDING,
  })
  status: RequestStatus;

  @Prop({
    type: [
      {
        text: String,
        timestamp: Date,
      },
    ],
    default: [],
  })
  edits: Array<{ text: string; timestamp: Date }>;

  createdAt: Date;
  updatedAt: Date;
}

export const RequestSchema = SchemaFactory.createForClass(Request);

// Indexes
RequestSchema.index({ buyerId: 1 });
RequestSchema.index({ category: 1 });
RequestSchema.index({ status: 1 });
RequestSchema.index({ createdAt: -1 });
RequestSchema.index({ title: 'text', description: 'text' });
