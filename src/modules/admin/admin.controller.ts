import { Controller, Get, Post, Body, Param, UseGuards, Query, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { AdminGuard, type AdminRequest } from './guards/admin.guard';
import {
  BulkModerationDto,
  ListModerationRequestsDto,
  RejectRequestDto,
} from './dto/moderation.dto';
import { RequirePermission } from './decorators/require-permission.decorator';
import { ParseObjectIdPipe } from '../../common/pipes/parse-objectid.pipe';

@ApiTags('Admin')
@Controller('admin')
@UseGuards(AdminGuard)
@ApiBearerAuth()
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('analytics')
  @RequirePermission('analytics.view')
  @ApiOperation({ summary: 'Get platform analytics' })
  @ApiResponse({ status: 200, description: 'Analytics data' })
  async getAnalytics() {
    return this.adminService.getAnalytics();
  }

  @Get('requests')
  @RequirePermission('moderation.requests')
  @ApiOperation({ summary: 'List requests for moderation (queue / history)' })
  async listRequests(@Query() dto: ListModerationRequestsDto) {
    return this.adminService.listModerationRequests(dto);
  }

  @Post('requests/bulk')
  @RequirePermission('moderation.requests')
  @ApiOperation({ summary: 'Bulk approve/reject requests' })
  async bulkModerate(@Body() dto: BulkModerationDto, @Req() req: AdminRequest) {
    return this.adminService.bulkModerate(dto, req.admin?.login);
  }

  @Get('requests/:id')
  @RequirePermission('moderation.requests')
  @ApiOperation({ summary: 'Get request with moderation log' })
  async getRequest(@Param('id', ParseObjectIdPipe) id: string) {
    return this.adminService.getModerationRequest(id);
  }

  @Post('requests/:id/approve')
  @RequirePermission('moderation.requests')
  @ApiOperation({ summary: 'Approve request' })
  async approveRequest(@Param('id', ParseObjectIdPipe) id: string, @Req() req: AdminRequest) {
    return this.adminService.approveRequest(id, req.admin?.login);
  }

  @Post('requests/:id/reject')
  @RequirePermission('moderation.requests')
  @ApiOperation({ summary: 'Reject request with a reason' })
  async rejectRequest(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() body: RejectRequestDto,
    @Req() req: AdminRequest,
  ) {
    return this.adminService.rejectRequest(id, body.reason, req.admin?.login);
  }

  @Get('proposals/pending')
  @RequirePermission('moderation.proposals')
  @ApiOperation({ summary: 'Get pending proposals for moderation' })
  async getPendingProposals(@Query('page') page?: number, @Query('pageSize') pageSize?: number) {
    return this.adminService.getPendingProposals(page, pageSize);
  }

  @Post('proposals/:id/approve')
  @RequirePermission('moderation.proposals')
  @ApiOperation({ summary: 'Approve proposal' })
  async approveProposal(@Param('id', ParseObjectIdPipe) id: string) {
    return this.adminService.approveProposal(id);
  }

  @Post('proposals/:id/reject')
  @RequirePermission('moderation.proposals')
  @ApiOperation({ summary: 'Reject proposal' })
  async rejectProposal(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() body: { reason: string },
  ) {
    return this.adminService.rejectProposal(id, body.reason);
  }

  @Get('users/reported')
  @RequirePermission('users.block')
  @ApiOperation({ summary: 'Get reported users' })
  async getReportedUsers(@Query('page') page?: number, @Query('pageSize') pageSize?: number) {
    return this.adminService.getReportedUsers(page, pageSize);
  }

  @Get('reports')
  @RequirePermission('moderation.reports')
  @ApiOperation({ summary: 'Get all reports' })
  async getReports(
    @Query('status') status?: string,
    @Query('page') page?: number,
    @Query('pageSize') pageSize?: number,
  ) {
    return this.adminService.getReports(status as any, page, pageSize);
  }

  @Post('reports/:id/update-status')
  @RequirePermission('moderation.reports')
  @ApiOperation({ summary: 'Update report status' })
  async updateReportStatus(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() body: { status: string },
  ) {
    return this.adminService.updateReportStatus(id, body.status as any);
  }

  @Post('users/:id/block')
  @RequirePermission('users.block')
  @ApiOperation({ summary: 'Block user' })
  async blockUser(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() body: { reason: string; duration: string },
  ) {
    return this.adminService.blockUser(id, body.reason, body.duration);
  }

  @Post('users/:id/unblock')
  @RequirePermission('users.block')
  @ApiOperation({ summary: 'Unblock user' })
  async unblockUser(@Param('id', ParseObjectIdPipe) id: string) {
    return this.adminService.unblockUser(id);
  }
}
