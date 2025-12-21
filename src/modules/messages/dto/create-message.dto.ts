import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsMongoId,
} from 'class-validator';

export class CreateMessageDto {
  @ApiProperty({ example: '507f1f77bcf86cd799439011', description: 'Receiver ID' })
  @IsMongoId()
  @IsNotEmpty()
  receiverId: string;

  @ApiProperty({ example: 'Hello!', description: 'Message content' })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({ required: false })
  @IsMongoId()
  @IsOptional()
  requestId?: string;

  @ApiProperty({ required: false })
  @IsMongoId()
  @IsOptional()
  proposalId?: string;
}

