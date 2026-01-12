import { Controller, Get, Post, Body, Param, Patch, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { ParseObjectIdPipe } from '../../common/pipes/parse-objectid.pipe';
import * as userSchema from 'src/database/schemas/user.schema';

@ApiTags('Messages')
@Controller('messages')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  @ApiOperation({ summary: 'Send message' })
  @ApiResponse({ status: 201, description: 'Message sent' })
  async create(
    @Body() createMessageDto: CreateMessageDto,
    @CurrentUser() user: userSchema.UserDocument,
  ) {
    return this.messagesService.create(createMessageDto, user._id.toString());
  }

  @Get()
  @ApiOperation({ summary: 'Get messages' })
  @ApiResponse({ status: 200, description: 'List of messages' })
  async findAll(
    @CurrentUser() user: userSchema.UserDocument,
    @Query('requestId') requestId?: string,
    @Query('proposalId') proposalId?: string,
    @Query('userId') otherUserId?: string,
    @Query('page') page?: number,
    @Query('pageSize') pageSize?: number,
  ) {
    return this.messagesService.findAll(
      user._id.toString(),
      requestId,
      proposalId,
      otherUserId,
      page,
      pageSize,
    );
  }

  @Get('conversations')
  @ApiOperation({ summary: 'Get conversations list' })
  @ApiResponse({ status: 200, description: 'List of conversations' })
  async getConversations(@CurrentUser() user: userSchema.UserDocument) {
    return this.messagesService.getConversations(user._id.toString());
  }

  @Patch(':id/read')
  @ApiOperation({ summary: 'Mark message as read' })
  @ApiResponse({ status: 200, description: 'Message marked as read' })
  async markAsRead(
    @Param('id', ParseObjectIdPipe) id: string,
    @CurrentUser() user: userSchema.UserDocument,
  ) {
    return this.messagesService.markAsRead(id, user._id.toString());
  }
}
