import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserAchievementDocument = UserAchievement & Document;

@Schema({ timestamps: { createdAt: false, updatedAt: false } })
export class UserAchievement {
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Profile', required: true })
  profileId: Types.ObjectId;

  @Prop({ type: String, required: true })
  achievementId: string;

  @Prop({ type: Date, required: true, default: Date.now })
  unlockedAt: Date;
}

export const UserAchievementSchema = SchemaFactory.createForClass(UserAchievement);

// Indexes
UserAchievementSchema.index({ profileId: 1 });
UserAchievementSchema.index({ achievementId: 1 });
UserAchievementSchema.index({ profileId: 1, achievementId: 1 }, { unique: true });
