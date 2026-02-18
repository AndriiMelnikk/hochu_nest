import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { Account, AccountSchema } from '../../database/schemas/account.schema';
import { Profile, ProfileSchema } from '../../database/schemas/profile.schema';
import { Request, RequestSchema } from '../../database/schemas/request.schema';
import { Proposal, ProposalSchema } from '../../database/schemas/proposal.schema';
import { Report, ReportSchema } from '../../database/schemas/report.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Account.name, schema: AccountSchema },
      { name: Profile.name, schema: ProfileSchema },
      { name: Request.name, schema: RequestSchema },
      { name: Proposal.name, schema: ProposalSchema },
      { name: Report.name, schema: ReportSchema },
    ]),
  ],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}
