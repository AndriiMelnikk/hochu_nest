import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AchievementsService } from './achievements.service';
import { Achievement, AchievementSchema } from '../../database/schemas/achievement.schema';
import {
  UserAchievement,
  UserAchievementSchema,
} from '../../database/schemas/user-achievement.schema';
import { User, UserSchema } from '../../database/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Achievement.name, schema: AchievementSchema },
      { name: UserAchievement.name, schema: UserAchievementSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [AchievementsService],
  exports: [AchievementsService],
})
export class AchievementsModule {}

