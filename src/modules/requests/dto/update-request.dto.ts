import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { ItemCondition } from '../../../database/schemas/request.schema';

export class UpdateRequestDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @MinLength(1)
  @MaxLength(255)
  title?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @MinLength(10)
  @MaxLength(5000)
  description?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  budgetMin?: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  @Min(0)
  budgetMax?: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  location?: string;

  @ApiProperty({ required: false, example: 1, description: 'Urgency level' })
  @IsNumber()
  @IsOptional()
  urgency?: number;

  @ApiProperty({
    example: 'new',
    description: 'Item condition',
    enum: ItemCondition,
    required: false,
  })
  @IsEnum(ItemCondition)
  @IsOptional()
  itemCondition?: ItemCondition;

  @ApiProperty({ required: false })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  @ArrayMaxSize(5)
  images?: string[];
}
