import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';
import { Review, ReviewSchema } from '../../database/schemas/review.schema';
import { Proposal, ProposalSchema } from '../../database/schemas/proposal.schema';
import { User, UserSchema } from '../../database/schemas/user.schema';
import { XpModule } from '../xp/xp.module';
import { AchievementsModule } from '../achievements/achievements.module';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Review.name, schema: ReviewSchema },
      { name: Proposal.name, schema: ProposalSchema },
      { name: User.name, schema: UserSchema },
    ]),
    XpModule,
    AchievementsModule,
    NotificationsModule,
  ],
  controllers: [ReviewsController],
  providers: [ReviewsService],
  exports: [ReviewsService],
})
export class ReviewsModule {}

