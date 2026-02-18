import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Achievement, AchievementDocument } from '../../database/schemas/achievement.schema';
import {
  UserAchievement,
  UserAchievementDocument,
} from '../../database/schemas/user-achievement.schema';
import { Profile, ProfileDocument } from '../../database/schemas/profile.schema';

@Injectable()
export class AchievementsService {
  constructor(
    @InjectModel(Achievement.name)
    private achievementModel: Model<AchievementDocument>,
    @InjectModel(UserAchievement.name)
    private userAchievementModel: Model<UserAchievementDocument>,
    @InjectModel(Profile.name) private profileModel: Model<ProfileDocument>,
  ) {}

  async findAll() {
    return this.achievementModel.find().exec();
  }

  async findOne(id: string) {
    return this.achievementModel.findOne({ id }).exec();
  }

  async getUserAchievements(profileId: string) {
    const userAchievements = await this.userAchievementModel
      .find({ profileId: new Types.ObjectId(profileId) })
      .lean()
      .exec();

    const achievementIds: string[] = userAchievements.map((ua) => ua.achievementId);
    const achievements = await this.achievementModel
      .find({ id: { $in: achievementIds } })
      .lean()
      .exec();

    return userAchievements.map((ua) => {
      const achievement = achievements.find((a) => a.id === ua.achievementId);
      return {
        achievement,
        unlockedAt: ua.unlockedAt,
      };
    });
  }

  async checkAndUnlockAchievements(profileId: string) {
    const profile = await this.profileModel.findById(profileId).lean().exec();
    if (!profile) return;

    const achievements = await this.achievementModel
      .find({
        role: { $in: [(profile as { type: string }).type, 'both'] },
      })
      .lean()
      .exec();

    for (const achievement of achievements) {
      const existing = await this.userAchievementModel
        .findOne({
          profileId: new Types.ObjectId(profileId),
          achievementId: achievement.id,
        })
        .exec();

      if (existing) continue;

      if (this.checkCondition(achievement, profile as Profile & { _id: Types.ObjectId })) {
        await this.unlockAchievement(profileId, achievement.id as string);
      }
    }
  }

  private async unlockAchievement(profileId: string, achievementId: string) {
    const userAchievement = new this.userAchievementModel({
      profileId: new Types.ObjectId(profileId),
      achievementId,
      unlockedAt: new Date(),
    });
    await userAchievement.save();
  }

  private checkCondition(
    achievement: Achievement,
    profile: Profile & { _id: Types.ObjectId },
  ): boolean {
    const condition = achievement.condition;

    switch (achievement.id) {
      case 'first_request':
        return condition.type === 'first_request' && profile.xp >= 10;
      case 'first_sale':
        return condition.type === 'first_sale' && profile.completedDeals >= 1;
      case 'deal_maker':
        return condition.type === 'deal_maker' && profile.completedDeals >= condition.count;
      case 'reviewer':
        return condition.type === 'reviewer' && profile.reviewsCount >= condition.count;
      case 'loyal_customer':
        return condition.type === 'loyal_customer' && profile.completedDeals >= condition.count;
      case 'trusted_seller':
        return condition.type === 'trusted_seller' && profile.completedDeals >= condition.count;
      case 'perfect_rating':
        return (
          condition.type === 'perfect_rating' &&
          profile.rating >= 4.9 &&
          profile.reviewsCount >= condition.count
        );
      default:
        return false;
    }
  }

  async seedAchievements() {
    const achievements = [
      {
        id: 'first_request',
        name: 'Перший запит',
        description: 'Створіть перший запит',
        icon: '🎯',
        rarity: 'common',
        role: 'buyer',
        condition: { type: 'first_request' },
      },
      {
        id: 'first_sale',
        name: 'Перша продажа',
        description: 'Завершіть першу угоду',
        icon: '💰',
        rarity: 'common',
        role: 'seller',
        condition: { type: 'first_sale' },
      },
      {
        id: 'deal_maker',
        name: 'Угододавець',
        description: 'Завершіть 10 угод',
        icon: '🤝',
        rarity: 'rare',
        role: 'buyer',
        condition: { type: 'deal_maker', count: 10 },
      },
      {
        id: 'reviewer',
        name: 'Рецензент',
        description: 'Залиште 20 відгуків',
        icon: '⭐',
        rarity: 'rare',
        role: 'buyer',
        condition: { type: 'reviewer', count: 20 },
      },
      {
        id: 'loyal_customer',
        name: 'Постійний клієнт',
        description: '50 завершених угод',
        icon: '👑',
        rarity: 'epic',
        role: 'buyer',
        condition: { type: 'loyal_customer', count: 50 },
      },
      {
        id: 'trusted_seller',
        name: 'Надійний продавець',
        description: '100 завершених угод',
        icon: '🏆',
        rarity: 'epic',
        role: 'seller',
        condition: { type: 'trusted_seller', count: 100 },
      },
      {
        id: 'perfect_rating',
        name: 'Ідеальний рейтинг',
        description: '10 відгуків 5★ підряд',
        icon: '💎',
        rarity: 'legendary',
        role: 'seller',
        condition: { type: 'perfect_rating', count: 10 },
      },
    ];

    for (const achievement of achievements) {
      await this.achievementModel.findOneAndUpdate({ id: achievement.id }, achievement, {
        upsert: true,
        new: true,
      });
    }
  }
}
