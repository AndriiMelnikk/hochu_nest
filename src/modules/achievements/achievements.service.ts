import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Achievement, AchievementDocument } from '../../database/schemas/achievement.schema';
import {
  UserAchievement,
  UserAchievementDocument,
} from '../../database/schemas/user-achievement.schema';
import { User, UserDocument } from '../../database/schemas/user.schema';

@Injectable()
export class AchievementsService {
  constructor(
    @InjectModel(Achievement.name)
    private achievementModel: Model<AchievementDocument>,
    @InjectModel(UserAchievement.name)
    private userAchievementModel: Model<UserAchievementDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async findAll() {
    return this.achievementModel.find().exec();
  }

  async findOne(id: string) {
    return this.achievementModel.findOne({ id }).exec();
  }

  async getUserAchievements(userId: string) {
    const userAchievements = await this.userAchievementModel
      .find({ userId: new Types.ObjectId(userId) })
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

  async checkAndUnlockAchievements(userId: string) {
    const user = await this.userModel.findById(userId).lean().exec();
    if (!user) return;

    const achievements = await this.achievementModel
      .find({
        role: { $in: [user.role, 'both'] },
      })
      .lean()
      .exec();

    for (const achievement of achievements) {
      // Check if already unlocked
      const existing = await this.userAchievementModel
        .findOne({
          userId: new Types.ObjectId(userId),
          achievementId: achievement.id,
        })
        .exec();

      if (existing) continue;

      // Check condition
      if (this.checkCondition(achievement, user)) {
        await this.unlockAchievement(userId, achievement.id as string);
      }
    }
  }

  private async unlockAchievement(userId: string, achievementId: string) {
    const userAchievement = new this.userAchievementModel({
      userId: new Types.ObjectId(userId),
      achievementId,
      unlockedAt: new Date(),
    });
    await userAchievement.save();
  }

  private checkCondition(achievement: Achievement, user: User): boolean {
    const condition = achievement.condition;

    switch (achievement.id) {
      case 'first_request':
        return condition.type === 'first_request' && user.xp >= 10;
      case 'first_sale':
        return condition.type === 'first_sale' && user.completedDeals >= 1;
      case 'deal_maker':
        return condition.type === 'deal_maker' && user.completedDeals >= condition.count;
      case 'reviewer':
        return condition.type === 'reviewer' && user.reviewsCount >= condition.count;
      case 'loyal_customer':
        return condition.type === 'loyal_customer' && user.completedDeals >= condition.count;
      case 'trusted_seller':
        return condition.type === 'trusted_seller' && user.completedDeals >= condition.count;
      case 'perfect_rating':
        return (
          condition.type === 'perfect_rating' &&
          user.rating >= 4.9 &&
          user.reviewsCount >= condition.count
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
