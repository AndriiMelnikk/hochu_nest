import {
  Controller,
  Get,
  Patch,
  Post,
  Delete,
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
  ApiBody,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateContactsDto } from './dto/update-contacts.dto';
import { NotificationsService } from '../notifications/notifications.service';
import { UpdateNotificationPreferencesDto } from '../notifications/dto/update-notification-preferences.dto';
import { CreateRequestSubscriptionDto } from '../notifications/dto/create-request-subscription.dto';
import { UpdateRequestSubscriptionDto } from '../notifications/dto/update-request-subscription.dto';
import { GetRequestSubscriptionsDto } from '../notifications/dto/get-request-subscriptions.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { ParseObjectIdPipe } from '../../common/pipes/parse-objectid.pipe';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly notificationsService: NotificationsService,
  ) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current account and active profile' })
  @ApiResponse({ status: 200, description: 'Account and profile' })
  async getMe(@CurrentUser() user: { id: string; profileId: string }) {
    return this.usersService.findMe(user.id, user.profileId);
  }

  @Get('me/profiles')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all profiles associated with the current account' })
  @ApiResponse({ status: 200, description: 'List of profiles' })
  async getMeProfiles(@CurrentUser() user: { id: string }) {
    return await this.usersService.findProfilesByAccountId(user.id);
  }

  @Post('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new profile for the current account' })
  @ApiBody({ type: CreateProfileDto })
  @ApiResponse({ status: 201, description: 'Profile created' })
  @ApiResponse({ status: 409, description: 'Profile of this type already exists' })
  async createProfile(
    @CurrentUser() user: { id: string },
    @Body() createProfileDto: CreateProfileDto,
  ) {
    return await this.usersService.createProfile(user.id, createProfileDto);
  }

  @Get('profile/:id')
  @ApiOperation({ summary: 'Get profile details by ID' })
  @ApiParam({ name: 'id', description: 'Profile ID' })
  @ApiResponse({ status: 200, description: 'Profile found' })
  async getProfile(@Param('id', ParseObjectIdPipe) id: string) {
    return await this.usersService.findProfile(id);
  }

  @Patch('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update current active profile (name, avatar, location)' })
  @ApiResponse({ status: 200, description: 'Profile updated' })
  async updateMe(
    @CurrentUser() user: { id: string; profileId: string },
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateMe(user.id, user.profileId, updateUserDto);
  }

  @Patch('profile/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update specific profile by ID (name, avatar, location)' })
  @ApiParam({ name: 'id', description: 'Profile ID to update' })
  @ApiResponse({ status: 200, description: 'Profile updated' })
  async updateProfile(
    @CurrentUser() user: { id: string },
    @Param('id', ParseObjectIdPipe) profileId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateMe(user.id, profileId, updateUserDto);
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

  @Get(':id/contacts')
  @ApiOperation({ summary: 'Get profile contacts' })
  @ApiParam({ name: 'id', description: 'Profile ID' })
  @ApiResponse({ status: 200, description: 'Profile contacts' })
  async getContacts(@Param('id', ParseObjectIdPipe) id: string) {
    return this.usersService.getProfileContacts(id);
  }

  @Patch(':id/contacts')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update profile contacts' })
  @ApiParam({ name: 'id', description: 'Profile ID' })
  @ApiResponse({ status: 200, description: 'Profile contacts updated' })
  async updateContacts(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() updateContactsDto: UpdateContactsDto,
    @CurrentUser() user: { id: string },
  ) {
    return this.usersService.updateProfileContacts(id, updateContactsDto, user.id);
  }

  @Get(':id/notification-preferences')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get profile notification preferences' })
  @ApiParam({ name: 'id', description: 'Profile ID' })
  @ApiResponse({ status: 200, description: 'Notification preferences' })
  async getNotificationPreferences(
    @Param('id', ParseObjectIdPipe) id: string,
    @CurrentUser() user: { id: string },
  ) {
    return this.notificationsService.getNotificationPreferences(id, user.id);
  }

  @Patch(':id/notification-preferences')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update profile notification preferences' })
  @ApiParam({ name: 'id', description: 'Profile ID' })
  @ApiResponse({ status: 200, description: 'Updated notification preferences' })
  async updateNotificationPreferences(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() dto: UpdateNotificationPreferencesDto,
    @CurrentUser() user: { id: string },
  ) {
    return this.notificationsService.updateNotificationPreferences(id, user.id, dto);
  }

  @Get(':id/request-subscriptions')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get seller request subscriptions' })
  @ApiParam({ name: 'id', description: 'Seller profile ID' })
  @ApiResponse({ status: 200, description: 'Paginated list of request subscriptions' })
  async getRequestSubscriptions(
    @Param('id', ParseObjectIdPipe) id: string,
    @Query() query: GetRequestSubscriptionsDto,
    @CurrentUser() user: { id: string },
  ) {
    return this.notificationsService.findRequestSubscriptions(id, user.id, query);
  }

  @Post(':id/request-subscriptions')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create seller request subscription' })
  @ApiParam({ name: 'id', description: 'Seller profile ID' })
  @ApiResponse({ status: 201, description: 'Request subscription created' })
  async createRequestSubscription(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() dto: CreateRequestSubscriptionDto,
    @CurrentUser() user: { id: string },
  ) {
    return this.notificationsService.createRequestSubscription(id, user.id, dto);
  }

  @Patch(':id/request-subscriptions/:subscriptionId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update seller request subscription' })
  @ApiParam({ name: 'id', description: 'Seller profile ID' })
  @ApiParam({ name: 'subscriptionId', description: 'Subscription ID' })
  @ApiResponse({ status: 200, description: 'Request subscription updated' })
  async updateRequestSubscription(
    @Param('id', ParseObjectIdPipe) id: string,
    @Param('subscriptionId', ParseObjectIdPipe) subscriptionId: string,
    @Body() dto: UpdateRequestSubscriptionDto,
    @CurrentUser() user: { id: string },
  ) {
    return this.notificationsService.updateRequestSubscription(id, subscriptionId, user.id, dto);
  }

  @Delete(':id/request-subscriptions/:subscriptionId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete seller request subscription' })
  @ApiParam({ name: 'id', description: 'Seller profile ID' })
  @ApiParam({ name: 'subscriptionId', description: 'Subscription ID' })
  @ApiResponse({ status: 200, description: 'Request subscription deleted' })
  async deleteRequestSubscription(
    @Param('id', ParseObjectIdPipe) id: string,
    @Param('subscriptionId', ParseObjectIdPipe) subscriptionId: string,
    @CurrentUser() user: { id: string },
  ) {
    return this.notificationsService.removeRequestSubscription(id, subscriptionId, user.id);
  }
}
