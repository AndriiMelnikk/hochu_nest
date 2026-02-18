import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Account, AccountSchema } from '../../database/schemas/account.schema';
import { Profile, ProfileSchema } from '../../database/schemas/profile.schema';
import { Request, RequestSchema } from '../../database/schemas/request.schema';
import { Proposal, ProposalSchema } from '../../database/schemas/proposal.schema';
import { Review, ReviewSchema } from '../../database/schemas/review.schema';
import { AchievementsModule } from '../achievements/achievements.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Account.name, schema: AccountSchema },
      { name: Profile.name, schema: ProfileSchema },
      { name: Request.name, schema: RequestSchema },
      { name: Proposal.name, schema: ProposalSchema },
      { name: Review.name, schema: ReviewSchema },
    ]),
    AchievementsModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
