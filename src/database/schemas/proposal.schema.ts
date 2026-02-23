import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';
import { ItemCondition } from './request.schema';

export type ProposalDocument = Proposal & Document;

export enum ProposalStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  COMPLETED = 'completed',
  WITHDRAWN = 'withdrawn',
}

@Schema({ timestamps: true })
export class Proposal {
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Request', required: true })
  requestId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Profile', required: true })
  sellerId: Types.ObjectId;

  @Prop({ type: Number, required: true, min: 0 })
  price: number;

  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: Number, required: true })
  estimatedTime: number;

  @Prop({ type: Number, default: null })
  warranty: number;

  @Prop({
    type: String,
    enum: Object.values(ItemCondition),
    required: false,
  })
  itemCondition?: ItemCondition;

  @Prop({ type: [String], default: [] })
  images: string[];

  @Prop({
    type: String,
    enum: Object.values(ProposalStatus),
    default: ProposalStatus.PENDING,
  })
  status: ProposalStatus;

  @Prop({
    type: [
      {
        timestamp: Date,
        changes: [
          {
            field: String,
            oldValue: MongooseSchema.Types.Mixed,
            newValue: MongooseSchema.Types.Mixed,
          },
        ],
      },
    ],
    default: [],
  })
  edits: Array<{
    timestamp: Date;
    changes?: Array<{ field: string; oldValue: any; newValue: any }>;
  }>;

  createdAt: Date;
  updatedAt: Date;
}

export const ProposalSchema = SchemaFactory.createForClass(Proposal);

// Indexes
ProposalSchema.index({ requestId: 1 });
ProposalSchema.index({ sellerId: 1 });
ProposalSchema.index({ status: 1 });
ProposalSchema.index({ createdAt: -1 });
