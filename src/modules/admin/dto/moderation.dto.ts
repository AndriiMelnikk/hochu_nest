import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsIn,
  IsMongoId,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { Type } from 'class-transformer';

export const MODERATION_STATUS_FILTERS = ['pending', 'active', 'rejected', 'all'] as const;
export type ModerationStatusFilter = (typeof MODERATION_STATUS_FILTERS)[number];

export const REJECTION_REASON_MIN = 5;
export const REJECTION_REASON_MAX = 500;
export const BULK_MAX_IDS = 50;

export class ListModerationRequestsDto {
  @IsOptional()
  @IsIn(MODERATION_STATUS_FILTERS)
  status?: ModerationStatusFilter;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  q?: string;

  @IsOptional()
  @Type(() => Number)
  page?: number;

  @IsOptional()
  @Type(() => Number)
  pageSize?: number;
}

export class RejectRequestDto {
  @IsString()
  @MinLength(REJECTION_REASON_MIN)
  @MaxLength(REJECTION_REASON_MAX)
  reason: string;
}

export class BulkModerationDto {
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(BULK_MAX_IDS)
  @IsMongoId({ each: true })
  ids: string[];

  @IsIn(['approve', 'reject'])
  action: 'approve' | 'reject';

  @ValidateIf((o: BulkModerationDto) => o.action === 'reject')
  @IsString()
  @MinLength(REJECTION_REASON_MIN)
  @MaxLength(REJECTION_REASON_MAX)
  reason?: string;
}
