import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  Min,
  IsArray,
  IsOptional,
  ArrayMaxSize,
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

  @ApiProperty({ example: '1-2 тижні', description: 'Estimated time' })
  @IsString()
  @IsNotEmpty()
  estimatedTime: string;

  @ApiProperty({ example: '3 місяці', description: 'Warranty', required: false })
  @IsString()
  @IsOptional()
  warranty?: string;

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
