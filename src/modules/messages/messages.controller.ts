import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  UseGuards,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

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
    @CurrentUser() user: any,
  ) {
    return this.messagesService.create(createMessageDto, user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Get messages' })
  @ApiResponse({ status: 200, description: 'List of messages' })
  async findAll(
    @CurrentUser() user: any,
    @Query('requestId') requestId?: string,
    @Query('proposalId') proposalId?: string,
    @Query('userId') otherUserId?: string,
    @Query('page') page?: number,
    @Query('pageSize') pageSize?: number,
  ) {
    return this.messagesService.findAll(
      user.id,
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
  async getConversations(@CurrentUser() user: any) {
    return this.messagesService.getConversations(user.id);
  }

  @Patch(':id/read')
  @ApiOperation({ summary: 'Mark message as read' })
  @ApiResponse({ status: 200, description: 'Message marked as read' })
  async markAsRead(@Param('id') id: string, @CurrentUser() user: any) {
    return this.messagesService.markAsRead(id, user.id);
  }
}

