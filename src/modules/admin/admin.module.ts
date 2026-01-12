import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { User, UserSchema } from '../../database/schemas/user.schema';
import { Request, RequestSchema } from '../../database/schemas/request.schema';
import { Proposal, ProposalSchema } from '../../database/schemas/proposal.schema';
import { Report, ReportSchema } from '../../database/schemas/report.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
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
