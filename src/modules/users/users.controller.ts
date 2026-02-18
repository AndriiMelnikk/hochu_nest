import { Controller, Get, Patch, Param, Body, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { ParseObjectIdPipe } from '../../common/pipes/parse-objectid.pipe';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current account and active profile' })
  @ApiResponse({ status: 200, description: 'Account and profile' })
  async getMe(@CurrentUser() user: { id: string; profileId: string }) {
    return this.usersService.findMe(user.id, user.profileId);
  }
  @Patch('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update current account (name, avatar, location)' })
  @ApiResponse({ status: 200, description: 'Account updated' })
  async updateMe(
    @CurrentUser() user: { id: string; profileId: string },
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateMe(user.id, user.profileId, updateUserDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User found' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.usersService.findOnePublic(id);
  }

  @Get(':id/stats')
  @ApiOperation({ summary: 'Get profile statistics' })
  @ApiParam({ name: 'id', description: 'Profile ID' })
  @ApiResponse({ status: 200, description: 'Profile statistics' })
  async getStats(@Param('id', ParseObjectIdPipe) id: string) {
    return this.usersService.getProfileStats(id);
  }

  @Get(':id/achievements')
  @ApiOperation({ summary: 'Get profile achievements' })
  @ApiParam({ name: 'id', description: 'Profile ID' })
  @ApiResponse({ status: 200, description: 'Profile achievements' })
  async getAchievements(@Param('id', ParseObjectIdPipe) id: string) {
    return this.usersService.getProfileAchievements(id);
  }

  @Get(':id/requests')
  @ApiOperation({ summary: 'Get profile requests (buyer)' })
  @ApiParam({ name: 'id', description: 'Profile ID' })
  @ApiResponse({ status: 200, description: 'Profile requests' })
  async getRequests(@Param('id', ParseObjectIdPipe) id: string, @Query('status') status?: string) {
    return this.usersService.getProfileRequests(id, status);
  }

  @Get(':id/proposals')
  @ApiOperation({ summary: 'Get profile proposals (seller)' })
  @ApiParam({ name: 'id', description: 'Profile ID' })
  @ApiResponse({ status: 200, description: 'Profile proposals' })
  async getProposals(@Param('id', ParseObjectIdPipe) id: string, @Query('status') status?: string) {
    return this.usersService.getProfileProposals(id, status);
  }

  @Get(':id/reviews')
  @ApiOperation({ summary: 'Get reviews about profile' })
  @ApiParam({ name: 'id', description: 'Profile ID' })
  @ApiResponse({ status: 200, description: 'Profile reviews' })
  async getReviews(@Param('id', ParseObjectIdPipe) id: string) {
    return this.usersService.getProfileReviews(id);
  }
}
