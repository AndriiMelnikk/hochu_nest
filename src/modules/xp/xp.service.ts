import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument, UserRole } from '../../database/schemas/user.schema';

export interface LevelInfo {
  level: number;
  name: string;
  xpRequired: number;
  xpNext: number;
}

@Injectable()
export class XpService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async awardXp(userId: string, amount: number): Promise<UserDocument> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }

    const oldLevel = this.calculateLevel(user.xp, user.role);
    user.xp += amount;
    const newLevel = this.calculateLevel(user.xp, user.role);

    await user.save();

    // Return level info if level increased
    if (newLevel.level > oldLevel.level) {
      return user;
    }

    return user;
  }

  calculateLevel(xp: number, role: UserRole): LevelInfo {
    if (role === UserRole.BUYER) {
      return this.calculateBuyerLevel(xp);
    } else if (role === UserRole.SELLER) {
      return this.calculateSellerLevel(xp);
    }
    return { level: 1, name: 'Beginner', xpRequired: 0, xpNext: 50 };
  }

  private calculateBuyerLevel(xp: number): LevelInfo {
    if (xp < 50) {
      return { level: 1, name: 'Початківець', xpRequired: 0, xpNext: 50 };
    } else if (xp < 200) {
      return { level: 2, name: 'Активний', xpRequired: 50, xpNext: 200 };
    } else if (xp < 1000) {
      return { level: 3, name: 'Досвідчений', xpRequired: 200, xpNext: 1000 };
    } else if (xp < 3000) {
      return { level: 4, name: 'Знавець', xpRequired: 1000, xpNext: 3000 };
    } else {
      return { level: 5, name: 'VIP', xpRequired: 3000, xpNext: Infinity };
    }
  }

  private calculateSellerLevel(xp: number): LevelInfo {
    if (xp < 100) {
      return { level: 1, name: 'Новачок', xpRequired: 0, xpNext: 100 };
    } else if (xp < 500) {
      return { level: 2, name: 'Майстер', xpRequired: 100, xpNext: 500 };
    } else if (xp < 1500) {
      return { level: 3, name: 'Експерт', xpRequired: 500, xpNext: 1500 };
    } else if (xp < 5000) {
      return { level: 4, name: 'Професіонал', xpRequired: 1500, xpNext: 5000 };
    } else {
      return { level: 5, name: 'Легенда', xpRequired: 5000, xpNext: Infinity };
    }
  }

  getLevelInfo(xp: number, role: UserRole): LevelInfo {
    return this.calculateLevel(xp, role);
  }
}
