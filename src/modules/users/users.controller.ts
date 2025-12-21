import {
  Controller,
  Get,
  Patch,
  Param,
  Body,
  UseGuards,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUsersDto } from './dto/get-users.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({ status: 200, description: 'User profile' })
  async getMe(@CurrentUser() user: any) {
    return this.usersService.findMe(user.id);
  }

  @Patch('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update current user profile' })
  @ApiResponse({ status: 200, description: 'User profile updated' })
  async updateMe(
    @CurrentUser() user: any,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateMe(user.id, updateUserDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User found' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);
    const userObj = user.toObject();
    delete userObj.password;
    return userObj;
  }

  @Get(':id/stats')
  @ApiOperation({ summary: 'Get user statistics' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User statistics' })
  async getStats(@Param('id') id: string) {
    return this.usersService.getUserStats(id);
  }

  @Get(':id/achievements')
  @ApiOperation({ summary: 'Get user achievements' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User achievements' })
  async getAchievements(@Param('id') id: string) {
    return this.usersService.getUserAchievements(id);
  }

  @Get(':id/requests')
  @ApiOperation({ summary: 'Get user requests' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User requests' })
  async getRequests(
    @Param('id') id: string,
    @Query('status') status?: string,
  ) {
    return this.usersService.getUserRequests(id, status);
  }

  @Get(':id/proposals')
  @ApiOperation({ summary: 'Get user proposals' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User proposals' })
  async getProposals(
    @Param('id') id: string,
    @Query('status') status?: string,
  ) {
    return this.usersService.getUserProposals(id, status);
  }

  @Get(':id/reviews')
  @ApiOperation({ summary: 'Get reviews about user' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User reviews' })
  async getReviews(@Param('id') id: string) {
    return this.usersService.getUserReviews(id);
  }
}

