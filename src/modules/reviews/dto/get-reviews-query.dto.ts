import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsMongoId, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class GetReviewsQueryDto {
  @ApiPropertyOptional({
    description: 'Filter by the profile that received the reviews',
    type: String,
  })
  @IsOptional()
  @IsMongoId()
  targetProfileId?: string;

  @ApiPropertyOptional({
    description: 'Filter by the profile that authored the reviews',
    type: String,
  })
  @IsOptional()
  @IsMongoId()
  authorProfileId?: string;

  @ApiPropertyOptional({ description: 'Filter by request ID', type: String })
  @IsOptional()
  @IsMongoId()
  requestId?: string;

  @ApiPropertyOptional({ description: 'Filter by proposal ID', type: String })
  @IsOptional()
  @IsMongoId()
  proposalId?: string;

  @ApiPropertyOptional({ description: 'Page number for pagination', minimum: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number;

  @ApiPropertyOptional({ description: 'Number of items per page', minimum: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  pageSize?: number;
}
