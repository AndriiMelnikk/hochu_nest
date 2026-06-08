import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { NotificationChannel } from '../enums/notification-category.enum';

export type RequestSubscriptionDocument = HydratedDocument<RequestSubscription>;

@Schema({ timestamps: true })
export class RequestSubscription {
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Profile', required: true })
  sellerProfileId: Types.ObjectId;

  @Prop({ type: [Types.ObjectId], ref: 'Category', default: [] })
  categories: Types.ObjectId[];

  @Prop({ type: String, default: null })
  location: string | null;

  @Prop({ type: Number, default: null })
  budgetMin: number | null;

  @Prop({ type: Number, default: null })
  budgetMax: number | null;

  @Prop({ type: Boolean, default: true })
  enabled: boolean;

  @Prop({
    type: [String],
    enum: Object.values(NotificationChannel),
    default: [NotificationChannel.IN_APP],
  })
  channels: NotificationChannel[];

  createdAt: Date;
  updatedAt: Date;
}

export const RequestSubscriptionSchema = SchemaFactory.createForClass(RequestSubscription);

RequestSubscriptionSchema.index({ sellerProfileId: 1 });
RequestSubscriptionSchema.index({ enabled: 1 });
RequestSubscriptionSchema.index({ categories: 1 });
