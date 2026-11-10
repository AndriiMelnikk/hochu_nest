import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdminAuthService } from './admin-auth.service';
import { AdminLoginDto } from './dto/admin-login.dto';
import { ChangeOwnPasswordDto } from './dto/staff.dto';
import { AdminGuard, type AdminRequest } from './guards/admin.guard';
import { AnyStaff } from './decorators/require-permission.decorator';

@ApiTags('Admin')
@Controller('admin/auth')
export class AdminAuthController {
  constructor(private readonly auth: AdminAuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Staff login' })
  async login(@Body() dto: AdminLoginDto) {
    return this.auth.login(dto.login, dto.password);
  }

  @Get('me')
  @UseGuards(AdminGuard)
  @AnyStaff()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Current staff member with role and permissions' })
  me(@Req() req: AdminRequest) {
    return req.admin;
  }

  @Post('change-password')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AdminGuard)
  @AnyStaff()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Change own password' })
  changePassword(@Body() dto: ChangeOwnPasswordDto, @Req() req: AdminRequest) {
    return this.auth.changeOwnPassword(req.admin!.id, dto.currentPassword, dto.newPassword);
  }
}
