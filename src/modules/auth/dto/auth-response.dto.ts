import { ApiProperty } from '@nestjs/swagger';
import { Account } from '../../../database/schemas/account.schema';

export class ProfileSummaryDto {
  @ApiProperty()
  id: string;

  @ApiProperty({ enum: ['buyer', 'seller'] })
  type: string;

  @ApiProperty()
  rating: number;

  @ApiProperty()
  xp: number;

  @ApiProperty()
  completedDeals: number;
}

export class AuthResponseDto {
  @ApiProperty({ description: 'JWT access token' })
  access_token: string;

  @ApiProperty({ description: 'JWT refresh token' })
  refresh_token: string;

  @ApiProperty({ description: 'Account information' })
  account: Omit<Account, 'password'>;

  @ApiProperty({ type: [ProfileSummaryDto], description: 'List of profiles (buyer, seller)' })
  profiles: ProfileSummaryDto[];

  @ApiProperty({ description: 'Currently active profile ID' })
  currentProfileId: string;
}
