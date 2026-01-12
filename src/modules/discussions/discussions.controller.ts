import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { DiscussionsService } from './discussions.service';
import { CreateDiscussionDto } from './dto/create-discussion.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import * as userSchema from 'src/database/schemas/user.schema';

@ApiTags('Discussions')
@Controller()
export class DiscussionsController {
  constructor(private readonly discussionsService: DiscussionsService) {}

  @Post('requests/:requestId/discussions')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add comment to request' })
  async createForRequest(
    @Param('requestId') requestId: string,
    @Body() createDiscussionDto: CreateDiscussionDto,
    @CurrentUser() user: userSchema.UserDocument,
  ) {
    return this.discussionsService.createForRequest(
      requestId,
      createDiscussionDto,
      user._id.toString(),
    );
  }

  @Get('requests/:requestId/discussions')
  @ApiOperation({ summary: 'Get discussions for request' })
  async findAllForRequest(@Param('requestId') requestId: string) {
    return this.discussionsService.findAllForRequest(requestId);
  }

  @Post('proposals/:proposalId/comments')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add comment to proposal' })
  async createForProposal(
    @Param('proposalId') proposalId: string,
    @Body() createDiscussionDto: CreateDiscussionDto,
    @CurrentUser() user: userSchema.UserDocument,
  ) {
    return this.discussionsService.createForProposal(
      proposalId,
      createDiscussionDto,
      user._id.toString(),
    );
  }

  @Get('proposals/:proposalId/comments')
  @ApiOperation({ summary: 'Get comments for proposal' })
  async findAllForProposal(@Param('proposalId') proposalId: string) {
    return this.discussionsService.findAllForProposal(proposalId);
  }
}
