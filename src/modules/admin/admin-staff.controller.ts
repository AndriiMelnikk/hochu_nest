import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdminStaffService } from './admin-staff.service';
import { CreateStaffDto, ResetStaffPasswordDto, UpdateStaffDto } from './dto/staff.dto';
import { AdminGuard, type AdminRequest } from './guards/admin.guard';
import { RequirePermission } from './decorators/require-permission.decorator';
import { ParseObjectIdPipe } from '../../common/pipes/parse-objectid.pipe';

@ApiTags('Admin')
@Controller('admin/staff')
@UseGuards(AdminGuard)
@RequirePermission('staff.manage')
@ApiBearerAuth()
export class AdminStaffController {
  constructor(private readonly staff: AdminStaffService) {}

  @Get()
  @ApiOperation({ summary: 'List staff' })
  list() {
    return this.staff.list();
  }

  @Post()
  @ApiOperation({ summary: 'Create staff member' })
  create(@Body() dto: CreateStaffDto, @Req() req: AdminRequest) {
    return this.staff.create(dto, req.admin!.login);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update role / name / active flag' })
  update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() dto: UpdateStaffDto,
    @Req() req: AdminRequest,
  ) {
    return this.staff.update(id, dto, req.admin!.id);
  }

  @Post(':id/password')
  @ApiOperation({ summary: 'Reset staff password' })
  resetPassword(@Param('id', ParseObjectIdPipe) id: string, @Body() dto: ResetStaffPasswordDto) {
    return this.staff.resetPassword(id, dto.password);
  }
}
