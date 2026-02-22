import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RequestsController } from './requests.controller';
import { RequestsService } from './requests.service';
import { Request, RequestSchema } from '../../database/schemas/request.schema';
import { Category, CategorySchema } from '../../database/schemas/category.schema';
import { Profile, ProfileSchema } from '../../database/schemas/profile.schema';
import { Proposal, ProposalSchema } from '../../database/schemas/proposal.schema';
import { XpModule } from '../xp/xp.module';
import { AchievementsModule } from '../achievements/achievements.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Request.name, schema: RequestSchema },
      { name: Category.name, schema: CategorySchema },
      { name: Profile.name, schema: ProfileSchema },
      { name: Proposal.name, schema: ProposalSchema },
    ]),
    XpModule,
    AchievementsModule,
  ],
  controllers: [RequestsController],
  providers: [RequestsService],
  exports: [RequestsService],
})
export class RequestsModule {}
