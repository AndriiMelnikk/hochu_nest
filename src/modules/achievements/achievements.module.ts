import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AchievementsService } from './achievements.service';
import { Achievement, AchievementSchema } from '../../database/schemas/achievement.schema';
import {
  UserAchievement,
  UserAchievementSchema,
} from '../../database/schemas/user-achievement.schema';
import { Profile, ProfileSchema } from '../../database/schemas/profile.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Achievement.name, schema: AchievementSchema },
      { name: UserAchievement.name, schema: UserAchievementSchema },
      { name: Profile.name, schema: ProfileSchema },
    ]),
  ],
  providers: [AchievementsService],
  exports: [AchievementsService],
})
export class AchievementsModule {}
