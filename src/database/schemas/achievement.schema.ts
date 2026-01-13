import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AchievementDocument = Achievement & Document;

export enum AchievementRarity {
  COMMON = 'common',
  RARE = 'rare',
  EPIC = 'epic',
  LEGENDARY = 'legendary',
}

export enum AchievementRole {
  BUYER = 'buyer',
  SELLER = 'seller',
  BOTH = 'both',
}

@Schema()
export class Achievement {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  icon: string;

  @Prop({
    type: String,
    enum: Object.values(AchievementRarity),
    required: true,
  })
  rarity: AchievementRarity;

  @Prop({
    type: String,
    enum: Object.values(AchievementRole),
    required: true,
  })
  role: AchievementRole;

  @Prop({ type: Object, required: true })
  condition: Record<string, any>;
}

export const AchievementSchema = SchemaFactory.createForClass(Achievement);

AchievementSchema.index({ id: 1 }, { unique: true });
