import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

export enum UserRole {
  BUYER = 'buyer',
  SELLER = 'seller',
  ADMIN = 'admin',
}

@Schema({ timestamps: true })
export class User {
  _id: Types.ObjectId;

  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: null })
  avatar: string;

  @Prop({
    type: String,
    enum: Object.values(UserRole),
    default: UserRole.BUYER,
    index: true,
  })
  role: UserRole;

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

  @Prop({ type: Boolean, default: false })
  isBlocked: boolean;

  @Prop({ default: null })
  blockedUntil: Date;

  createdAt: Date;
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

// Indexes
UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ role: 1 });
UserSchema.index({ rating: -1 });
UserSchema.index({ xp: -1 });

