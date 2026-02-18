import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProposalsController } from './proposals.controller';
import { ProposalsService } from './proposals.service';
import { Proposal, ProposalSchema } from '../../database/schemas/proposal.schema';
import { Request, RequestSchema } from '../../database/schemas/request.schema';
import { Profile, ProfileSchema } from '../../database/schemas/profile.schema';
import { XpModule } from '../xp/xp.module';
import { AchievementsModule } from '../achievements/achievements.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { RequestsModule } from '../requests/requests.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Proposal.name, schema: ProposalSchema },
      { name: Request.name, schema: RequestSchema },
      { name: Profile.name, schema: ProfileSchema },
    ]),
    XpModule,
    AchievementsModule,
    RequestsModule,
    NotificationsModule,
  ],
  controllers: [ProposalsController],
  providers: [ProposalsService],
  exports: [ProposalsService],
})
export class ProposalsModule {}
