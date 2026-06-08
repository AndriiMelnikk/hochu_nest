import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsMongoId,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { NotificationChannel } from '../../../database/enums/notification-category.enum';

export class CategoryPreferenceDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  enabled?: boolean;

  @ApiPropertyOptional({ enum: NotificationChannel, isArray: true })
  @IsOptional()
  @IsArray()
  @IsEnum(NotificationChannel, { each: true })
  channels?: NotificationChannel[];
}

export class NewRequestsPreferenceDto extends CategoryPreferenceDto {
  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  categories?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  location?: string | null;
}

export class UpdateNotificationPreferencesDto {
  @ApiPropertyOptional({ type: NewRequestsPreferenceDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => NewRequestsPreferenceDto)
  new_requests?: NewRequestsPreferenceDto;

  @ApiPropertyOptional({ type: CategoryPreferenceDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => CategoryPreferenceDto)
  request_updates?: CategoryPreferenceDto;

  @ApiPropertyOptional({ type: CategoryPreferenceDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => CategoryPreferenceDto)
  my_request_activity?: CategoryPreferenceDto;

  @ApiPropertyOptional({ type: CategoryPreferenceDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => CategoryPreferenceDto)
  my_proposal_status?: CategoryPreferenceDto;

  @ApiPropertyOptional({ type: CategoryPreferenceDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => CategoryPreferenceDto)
  messages?: CategoryPreferenceDto;

  @ApiPropertyOptional({ type: CategoryPreferenceDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => CategoryPreferenceDto)
  reviews?: CategoryPreferenceDto;

  @ApiPropertyOptional({ type: CategoryPreferenceDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => CategoryPreferenceDto)
  achievements?: CategoryPreferenceDto;
}
