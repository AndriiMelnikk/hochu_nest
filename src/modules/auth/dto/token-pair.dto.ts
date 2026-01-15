import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class TokenPairDto {
  @ApiProperty({ description: 'JWT access token' })
  @IsString()
  accessToken: string;

  @ApiProperty({ description: 'JWT refresh token' })
  @IsString()
  refreshToken: string;
}
