import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { ProposalsService } from './proposals.service';
import { CreateProposalDto } from './dto/create-proposal.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { ParseObjectIdPipe } from '../../common/pipes/parse-objectid.pipe';

@ApiTags('Proposals')
@Controller('proposals')
export class ProposalsController {
  constructor(private readonly proposalsService: ProposalsService) {}

  @Post('requests/:requestId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('seller', 'admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create proposal for request' })
  @ApiParam({ name: 'requestId', description: 'Request ID' })
  @ApiResponse({ status: 201, description: 'Proposal created' })
  async create(
    @Param('requestId', ParseObjectIdPipe) requestId: string,
    @Body() createProposalDto: CreateProposalDto,
    @CurrentUser() user: { id: string },
  ) {
    return this.proposalsService.create(requestId, createProposalDto, user.id);
  }

  @Get('requests/:requestId')
  @ApiOperation({ summary: 'Get proposals for request' })
  @ApiParam({ name: 'requestId', description: 'Request ID' })
  @ApiResponse({ status: 200, description: 'List of proposals' })
  async findAllByRequest(@Param('requestId', ParseObjectIdPipe) requestId: string) {
    return this.proposalsService.findAllByRequest(requestId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get proposal by ID' })
  @ApiParam({ name: 'id', description: 'Proposal ID' })
  @ApiResponse({ status: 200, description: 'Proposal found' })
  @ApiResponse({ status: 404, description: 'Proposal not found' })
  async findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.proposalsService.findOne(id);
  }

  @Post(':id/accept')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('buyer', 'admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Accept proposal' })
  @ApiParam({ name: 'id', description: 'Proposal ID' })
  @ApiResponse({ status: 200, description: 'Proposal accepted' })
  async accept(@Param('id', ParseObjectIdPipe) id: string, @CurrentUser() user: { id: string }) {
    return this.proposalsService.accept(id, user.id);
  }

  @Post(':id/reject')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('buyer', 'admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Reject proposal' })
  @ApiParam({ name: 'id', description: 'Proposal ID' })
  @ApiResponse({ status: 200, description: 'Proposal rejected' })
  async reject(@Param('id', ParseObjectIdPipe) id: string, @CurrentUser() user: { id: string }) {
    return this.proposalsService.reject(id, user.id);
  }

  @Post(':id/complete')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('buyer', 'admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Complete deal' })
  @ApiParam({ name: 'id', description: 'Proposal ID' })
  @ApiResponse({ status: 200, description: 'Deal completed' })
  async complete(@Param('id', ParseObjectIdPipe) id: string, @CurrentUser() user: { id: string }) {
    return this.proposalsService.complete(id, user.id);
  }
}
