import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../../database/schemas/user.schema';

export class AuthResponseDto {
  @ApiProperty({ description: 'JWT access token' })
  access_token: string;

  @ApiProperty({ description: 'JWT refresh token' })
  refresh_token: string;

  @ApiProperty({ type: User, description: 'User information' })
  user: Omit<User, 'password'>;
}
