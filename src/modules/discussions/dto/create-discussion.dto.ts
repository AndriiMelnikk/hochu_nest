import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, MaxLength, IsMongoId } from 'class-validator';

export class CreateDiscussionDto {
  @ApiProperty({ example: 'Great request!', description: 'Comment content' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(2000)
  content: string;

  @ApiProperty({ required: false })
  @IsMongoId()
  @IsOptional()
  replyToId?: string;
}
