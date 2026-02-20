import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  Min,
  IsArray,
  IsOptional,
  MinLength,
  MaxLength,
  ArrayMaxSize,
  IsEnum,
} from 'class-validator';
import { ItemCondition } from 'src/database/schemas/request.schema';

export class CreateRequestDto {
  @ApiProperty({ example: 'Need website design', description: 'Request title' })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(255)
  title: string;

  @ApiProperty({
    example: 'I need a modern website design for my business',
    description: 'Request description',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  description: string;

  @ApiProperty({ example: 'Design', description: 'Category' })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({ example: 1000, description: 'Minimum budget' })
  @IsNumber()
  @Min(0)
  budgetMin: number;

  @ApiProperty({ example: 5000, description: 'Maximum budget' })
  @IsNumber()
  @Min(0)
  budgetMax: number;

  @ApiProperty({ example: 'Kyiv', description: 'Location' })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({
    example: 1,
    description: 'Urgency level (1-4)',
  })
  @IsNumber()
  @Min(1)
  @IsNotEmpty()
  urgency: number;

  @ApiProperty({
    example: 'new',
    description: 'Item condition',
    enum: ItemCondition,
  })
  @IsEnum(ItemCondition)
  @IsNotEmpty()
  itemCondition: ItemCondition;

  @ApiProperty({
    example: ['https://example.com/image1.jpg'],
    description: 'Image URLs',
    required: false,
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  @ArrayMaxSize(5)
  images?: string[];
}
