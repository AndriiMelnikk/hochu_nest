import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { ProfileType } from '../../../database/schemas/profile.schema';

export class CreateProfileDto {
  @ApiProperty({ example: 'John', description: 'User name' })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(255)
  name: string;

  @ApiPropertyOptional({ example: 'Doe', description: 'User lastName' })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  lastName?: string;

  @ApiProperty({
    enum: ProfileType,
    description: 'Profile type to create',
    example: ProfileType.SELLER,
  })
  @IsNotEmpty()
  @IsEnum(ProfileType)
  type: ProfileType;
}
