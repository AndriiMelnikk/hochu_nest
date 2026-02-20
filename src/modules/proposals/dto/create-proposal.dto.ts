import { ItemCondition } from '@database/schemas/request.schema';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  Min,
  IsArray,
  IsOptional,
  ArrayMaxSize,
  IsEnum,
} from 'class-validator';

export class CreateProposalDto {
  @ApiProperty({ example: 8080, description: 'Proposed price' })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ example: 'Professional website design', description: 'Proposal title' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'I will create a modern, responsive website design',
    description: 'Proposal description',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 1, description: 'Estimated time level' })
  @IsNumber()
  @IsNotEmpty()
  estimatedTime: number;

  @ApiProperty({ example: 1, description: 'Warranty level', required: false })
  @IsNumber()
  @IsOptional()
  warranty?: number;

  @ApiProperty({ example: 'new', description: 'Item condition', enum: ItemCondition })
  @IsEnum(ItemCondition)
  @IsNotEmpty()
  itemCondition: ItemCondition;

  @ApiProperty({
    example: ['https://example.com/portfolio1.jpg'],
    description: 'Portfolio images',
    required: false,
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  @ArrayMaxSize(5)
  images?: string[];
}
