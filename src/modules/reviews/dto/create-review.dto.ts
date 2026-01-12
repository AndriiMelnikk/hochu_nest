import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, Min, Max, IsOptional, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateReviewDto {
  @ApiProperty({ example: '507f1f77bcf86cd799439011', description: 'Target user ID' })
  @IsString()
  targetUserId: string;

  @ApiProperty({ example: '507f1f77bcf86cd799439012', description: 'Request ID', required: false })
  @IsString()
  @IsOptional()
  requestId?: string;

  @ApiProperty({ example: '507f1f77bcf86cd799439013', description: 'Proposal ID', required: false })
  @IsString()
  @IsOptional()
  proposalId?: string;

  @ApiProperty({ example: 5, description: 'Rating (1-5)' })
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiProperty({ example: 'Great work!', description: 'Review comment', required: false })
  @IsString()
  @IsOptional()
  @MaxLength(1000)
  comment?: string;
}
