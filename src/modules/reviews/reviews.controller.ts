import { Controller, Get, Post, Body, Param, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { ParseObjectIdPipe } from '../../common/pipes/parse-objectid.pipe';

@ApiTags('Reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create review' })
  @ApiResponse({ status: 201, description: 'Review created' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async create(@Body() createReviewDto: CreateReviewDto, @CurrentUser() user: { id: string }) {
    return this.reviewsService.create(createReviewDto, user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all reviews' })
  @ApiResponse({ status: 200, description: 'List of reviews' })
  async findAll(
    @Query('targetProfileId') targetProfileId?: string,
    @Query('requestId') requestId?: string,
    @Query('proposalId') proposalId?: string,
    @Query('page') page?: number,
    @Query('pageSize') pageSize?: number,
  ) {
    return this.reviewsService.findAll(targetProfileId, requestId, proposalId, page, pageSize);
  }

  @Get('stats/:targetProfileId')
  @ApiOperation({ summary: 'Get review stats for a profile' })
  @ApiResponse({ status: 200, description: 'Review stats' })
  async getStats(@Param('targetProfileId', ParseObjectIdPipe) targetProfileId: string) {
    return this.reviewsService.getStats(targetProfileId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get review by ID' })
  @ApiResponse({ status: 200, description: 'Review found' })
  @ApiResponse({ status: 404, description: 'Review not found' })
  async findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.reviewsService.findOne(id);
  }
}
