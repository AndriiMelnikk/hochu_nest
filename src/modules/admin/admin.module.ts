import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import adminConfig from '../../config/admin.config';
import { AdminController } from './admin.controller';
import { AdminAuthController } from './admin-auth.controller';
import { AdminAuthService } from './admin-auth.service';
import { AdminStaffController } from './admin-staff.controller';
import { AdminStaffService } from './admin-staff.service';
import { AdminBootstrapService } from './admin-bootstrap.service';
import { AdminUser, AdminUserSchema } from '../../database/schemas/admin-user.schema';
import { AdminGuard } from './guards/admin.guard';
import { AdminService } from './admin.service';
import { Account, AccountSchema } from '../../database/schemas/account.schema';
import { Profile, ProfileSchema } from '../../database/schemas/profile.schema';
import { Request, RequestSchema } from '../../database/schemas/request.schema';
import { Proposal, ProposalSchema } from '../../database/schemas/proposal.schema';
import { Report, ReportSchema } from '../../database/schemas/report.schema';
import { NotificationsModule } from '../notifications/notifications.module';
import { RequestsModule } from '../requests/requests.module';

@Module({
  imports: [
    ConfigModule.forFeature(adminConfig),
    JwtModule.register({}),
    MongooseModule.forFeature([
      { name: AdminUser.name, schema: AdminUserSchema },
      { name: Account.name, schema: AccountSchema },
      { name: Profile.name, schema: ProfileSchema },
      { name: Request.name, schema: RequestSchema },
      { name: Proposal.name, schema: ProposalSchema },
      { name: Report.name, schema: ReportSchema },
    ]),
    NotificationsModule,
    RequestsModule,
  ],
  controllers: [AdminController, AdminAuthController, AdminStaffController],
  providers: [AdminService, AdminAuthService, AdminStaffService, AdminBootstrapService, AdminGuard],
  exports: [AdminService],
})
export class AdminModule {}
