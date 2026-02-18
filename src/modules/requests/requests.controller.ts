import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { RequestsService, FormattedRequest } from './requests.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { GetRequestsDto } from './dto/get-requests.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { ParseObjectIdPipe } from '../../common/pipes/parse-objectid.pipe';
import { Request } from 'src/database/schemas/request.schema';
import { PaginationResult } from 'src/common/utils/pagination.util';

@ApiTags('Requests')
@Controller('requests')
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('buyer', 'admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new request' })
  @ApiResponse({ status: 201, description: 'Request created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async create(
    @Body() createRequestDto: CreateRequestDto,
    @CurrentUser() user: { id: string; profileId: string; profileType: string },
  ): Promise<Request> {
    return this.requestsService.create(createRequestDto, user.profileId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all requests' })
  @ApiResponse({ status: 200, description: 'List of requests' })
  async findAll(@Query() query: GetRequestsDto): Promise<PaginationResult<FormattedRequest>> {
    return this.requestsService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get request by ID' })
  @ApiParam({ name: 'id', description: 'Request ID' })
  @ApiResponse({ status: 200, description: 'Request found' })
  @ApiResponse({ status: 404, description: 'Request not found' })
  async findOne(@Param('id', ParseObjectIdPipe) id: string): Promise<FormattedRequest> {
    return await this.requestsService.getById(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update request' })
  @ApiParam({ name: 'id', description: 'Request ID' })
  @ApiResponse({ status: 200, description: 'Request updated' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() updateRequestDto: UpdateRequestDto,
    @CurrentUser() user: { id: string; profileId: string },
  ): Promise<Request> {
    return this.requestsService.update(id, updateRequestDto, user.profileId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete request' })
  @ApiParam({ name: 'id', description: 'Request ID' })
  @ApiResponse({ status: 200, description: 'Request deleted' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async remove(
    @Param('id', ParseObjectIdPipe) id: string,
    @CurrentUser() user: { id: string; profileId: string },
  ): Promise<{ success: boolean }> {
    return this.requestsService.remove(id, user.profileId);
  }
}
