import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { ProfileType } from '../enums/profile-type.enum';
import { ContactChannel } from '../enums/contact-channel.enum';

export type ProfileDocument = HydratedDocument<Profile>;

// Re-export for backward compatibility
export { ProfileType };

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

  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ default: null, trim: true })
  lastName: string;

  @Prop({ default: null })
  avatar: string;

  @Prop({ type: Boolean, default: false })
  isBlocked: boolean;

  @Prop({ default: null })
  blockedUntil: Date;

  @Prop({ type: Number, default: 0, index: true })
  xp: number;

  @Prop({ type: Object, default: {} })
  contacts: Partial<Record<ContactChannel, string>>;

  createdAt: Date;
  updatedAt: Date;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);

ProfileSchema.index({ accountId: 1, type: 1 }, { unique: true });
ProfileSchema.index({ type: 1 });
ProfileSchema.index({ isBlocked: 1 });
ProfileSchema.index({ rating: -1 });
ProfileSchema.index({ xp: -1 });
