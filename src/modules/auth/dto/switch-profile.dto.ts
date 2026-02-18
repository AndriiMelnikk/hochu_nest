import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class SwitchProfileDto {
  @ApiProperty({ description: 'Profile ID to switch to (must belong to current account)' })
  @IsMongoId()
  @IsNotEmpty()
  profileId: string;
}
