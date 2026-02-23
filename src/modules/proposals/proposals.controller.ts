import { Controller, Get, Post, Body, Param, Query, UseGuards, Patch } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { ProposalsService } from './proposals.service';
import { CreateProposalDto } from './dto/create-proposal.dto';
import { UpdateProposalDto } from './dto/update-proposal.dto';

import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { ParseObjectIdPipe } from '../../common/pipes/parse-objectid.pipe';
import { Proposal } from '@database/schemas/proposal.schema';
import { ProposalRejectionReason } from './proposals.constants';
import { GetProposalsByRequestDto } from './dto/get-proposals-by-request.dto';
import { PaginationResult } from 'src/common/utils/pagination.util';

@ApiTags('Proposals')
@Controller('proposals')
export class ProposalsController {
  constructor(private readonly proposalsService: ProposalsService) {}

  @Post('requests/:requestId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('seller', 'admin', 'buyer')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create proposal for request' })
  @ApiParam({ name: 'requestId', description: 'Request ID' })
  @ApiResponse({ status: 201, description: 'Proposal created' })
  async create(
    @Param('requestId', ParseObjectIdPipe) requestId: string,
    @Body() createProposalDto: CreateProposalDto,
    @CurrentUser() user: { id: string; profileId: string },
  ) {
    return this.proposalsService.create(requestId, createProposalDto, user.profileId);
  }

  @Get('requests/:requestId')
  @ApiOperation({ summary: 'Get proposals for request' })
  @ApiParam({ name: 'requestId', description: 'Request ID' })
  @ApiResponse({ status: 200, description: 'List of proposals' })
  async findAllByRequest(
    @Param('requestId', ParseObjectIdPipe) requestId: string,
    @Query() query: GetProposalsByRequestDto,
  ): Promise<PaginationResult<Proposal>> {
    return this.proposalsService.findAllByRequest(requestId, query);
  }

  @Get('can-propose/:requestId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Check if user can propose to request' })
  @ApiParam({ name: 'requestId', description: 'Request ID' })
  @ApiResponse({ status: 200, description: 'Eligibility status' })
  async canPropose(
    @Param('requestId', ParseObjectIdPipe) requestId: string,
    @CurrentUser() user: { id: string; profileId: string },
  ): Promise<{ canPropose: boolean; reason?: ProposalRejectionReason }> {
    return await this.proposalsService.canPropose(requestId, user.id, user.profileId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get proposal by ID' })
  @ApiParam({ name: 'id', description: 'Proposal ID' })
  @ApiResponse({ status: 200, description: 'Proposal found' })
  @ApiResponse({ status: 404, description: 'Proposal not found' })
  async findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.proposalsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update proposal' })
  @ApiParam({ name: 'id', description: 'Proposal ID' })
  @ApiResponse({ status: 200, description: 'Proposal updated' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() updateProposalDto: UpdateProposalDto,
    @CurrentUser() user: { id: string; profileId: string },
  ) {
    return await this.proposalsService.update(id, updateProposalDto, user.profileId);
  }

  @Post(':id/accept')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('buyer', 'admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Accept proposal' })
  @ApiParam({ name: 'id', description: 'Proposal ID' })
  @ApiResponse({ status: 200, description: 'Proposal accepted' })
  async accept(
    @Param('id', ParseObjectIdPipe) id: string,
    @CurrentUser() user: { id: string; profileId: string },
  ) {
    return this.proposalsService.accept(id, user.profileId);
  }

  @Post(':id/reject')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('buyer', 'admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Reject proposal' })
  @ApiParam({ name: 'id', description: 'Proposal ID' })
  @ApiResponse({ status: 200, description: 'Proposal rejected' })
  async reject(
    @Param('id', ParseObjectIdPipe) id: string,
    @CurrentUser() user: { id: string; profileId: string },
  ) {
    return this.proposalsService.reject(id, user.profileId);
  }

  @Post(':id/complete')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('buyer', 'admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Complete deal' })
  @ApiParam({ name: 'id', description: 'Proposal ID' })
  @ApiResponse({ status: 200, description: 'Deal completed' })
  async complete(
    @Param('id', ParseObjectIdPipe) id: string,
    @CurrentUser() user: { id: string; profileId: string },
  ) {
    return this.proposalsService.complete(id, user.profileId);
  }
}
