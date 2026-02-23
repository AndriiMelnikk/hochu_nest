import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsEmail, IsUrl } from 'class-validator';

export class UpdateContactsDto {
  @ApiProperty({ required: false, example: '+380123456789' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ required: false, example: 'user@example.com' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ required: false, example: '@username' })
  @IsOptional()
  @IsString()
  telegram?: string;

  @ApiProperty({ required: false, example: '+380123456789' })
  @IsOptional()
  @IsString()
  viber?: string;

  @ApiProperty({ required: false, example: '+380123456789' })
  @IsOptional()
  @IsString()
  whatsapp?: string;

  @ApiProperty({ required: false, example: 'username' })
  @IsOptional()
  @IsString()
  instagram?: string;

  @ApiProperty({ required: false, example: 'https://facebook.com/username' })
  @IsOptional()
  @IsUrl()
  facebook?: string;

  @ApiProperty({ required: false, example: 'https://example.com' })
  @IsOptional()
  @IsUrl()
  website?: string;
}
