import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { ParseObjectIdPipe } from '../../common/pipes/parse-objectid.pipe';

@ApiTags('Admin')
@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
@ApiBearerAuth()
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('analytics')
  @ApiOperation({ summary: 'Get platform analytics' })
  @ApiResponse({ status: 200, description: 'Analytics data' })
  async getAnalytics() {
    return this.adminService.getAnalytics();
  }

  @Get('requests/pending')
  @ApiOperation({ summary: 'Get pending requests for moderation' })
  async getPendingRequests(
    @Query('page') page?: number,
    @Query('pageSize') pageSize?: number,
  ) {
    return this.adminService.getPendingRequests(page, pageSize);
  }

  @Post('requests/:id/approve')
  @ApiOperation({ summary: 'Approve request' })
  async approveRequest(@Param('id', ParseObjectIdPipe) id: string) {
    return this.adminService.approveRequest(id);
  }

  @Post('requests/:id/reject')
  @ApiOperation({ summary: 'Reject request' })
  async rejectRequest(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() body: { reason: string },
  ) {
    return this.adminService.rejectRequest(id, body.reason);
  }

  @Get('proposals/pending')
  @ApiOperation({ summary: 'Get pending proposals for moderation' })
  async getPendingProposals(
    @Query('page') page?: number,
    @Query('pageSize') pageSize?: number,
  ) {
    return this.adminService.getPendingProposals(page, pageSize);
  }

  @Post('proposals/:id/approve')
  @ApiOperation({ summary: 'Approve proposal' })
  async approveProposal(@Param('id', ParseObjectIdPipe) id: string) {
    return this.adminService.approveProposal(id);
  }

  @Post('proposals/:id/reject')
  @ApiOperation({ summary: 'Reject proposal' })
  async rejectProposal(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() body: { reason: string },
  ) {
    return this.adminService.rejectProposal(id, body.reason);
  }

  @Get('users/reported')
  @ApiOperation({ summary: 'Get reported users' })
  async getReportedUsers(
    @Query('page') page?: number,
    @Query('pageSize') pageSize?: number,
  ) {
    return this.adminService.getReportedUsers(page, pageSize);
  }

  @Get('reports')
  @ApiOperation({ summary: 'Get all reports' })
  async getReports(
    @Query('status') status?: string,
    @Query('page') page?: number,
    @Query('pageSize') pageSize?: number,
  ) {
    return this.adminService.getReports(status as any, page, pageSize);
  }

  @Post('reports/:id/update-status')
  @ApiOperation({ summary: 'Update report status' })
  async updateReportStatus(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() body: { status: string },
  ) {
    return this.adminService.updateReportStatus(id, body.status as any);
  }

  @Post('users/:id/block')
  @ApiOperation({ summary: 'Block user' })
  async blockUser(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() body: { reason: string; duration: string },
  ) {
    return this.adminService.blockUser(id, body.reason, body.duration);
  }

  @Post('users/:id/unblock')
  @ApiOperation({ summary: 'Unblock user' })
  async unblockUser(@Param('id', ParseObjectIdPipe) id: string) {
    return this.adminService.unblockUser(id);
  }
}
