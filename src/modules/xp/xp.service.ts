import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Profile, ProfileDocument, ProfileType } from '../../database/schemas/profile.schema';

export interface LevelInfo {
  level: number;
  name: string;
  xpRequired: number;
  xpNext: number;
}

@Injectable()
export class XpService {
  constructor(@InjectModel(Profile.name) private profileModel: Model<ProfileDocument>) {}

  async awardXp(profileId: string, amount: number): Promise<ProfileDocument> {
    const profile = await this.profileModel.findById(profileId).exec();
    if (!profile) {
      throw new Error(`Profile with ID ${profileId} not found`);
    }

    profile.xp += amount;

    await profile.save();

    return profile;
  }

  calculateLevel(xp: number, profileType: ProfileType): LevelInfo {
    if (profileType === ProfileType.BUYER) {
      return this.calculateBuyerLevel(xp);
    }
    if (profileType === ProfileType.SELLER) {
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

  getLevelInfo(xp: number, profileType: ProfileType): LevelInfo {
    return this.calculateLevel(xp, profileType);
  }
}
