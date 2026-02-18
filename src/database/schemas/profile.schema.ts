import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ProfileDocument = Profile & Document;

export enum ProfileType {
  BUYER = 'buyer',
  SELLER = 'seller',
}

@Schema({ timestamps: true })
export class Profile {
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Account', required: true })
  accountId: Types.ObjectId;

  @Prop({
    type: String,
    enum: Object.values(ProfileType),
    required: true,
  })
  type: ProfileType;

  @Prop({ type: Number, default: 0, min: 0, max: 5 })
  rating: number;

  @Prop({ type: Number, default: 0 })
  reviewsCount: number;

  @Prop({ type: Boolean, default: false })
  isVerified: boolean;

  @Prop({ type: Date, default: Date.now })
  memberSince: Date;

  @Prop({ type: Number, default: 0 })
  completedDeals: number;

  @Prop({ default: null })
  location: string;

  @Prop({ type: Number, default: 0, index: true })
  xp: number;

  createdAt: Date;
  updatedAt: Date;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);

ProfileSchema.index({ accountId: 1, type: 1 }, { unique: true });
ProfileSchema.index({ type: 1 });
ProfileSchema.index({ rating: -1 });
ProfileSchema.index({ xp: -1 });
