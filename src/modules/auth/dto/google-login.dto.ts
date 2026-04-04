import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class GoogleTokenDto {
  @ApiProperty({ description: 'Google ID token from client-side authentication' })
  @IsString()
  @IsNotEmpty()
  token: string;
}

export class GoogleUserInfoDto {
  @ApiProperty()
  googleId: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;

  @ApiPropertyOptional()
  lastName?: string;

  @ApiPropertyOptional()
  avatar?: string;
}
