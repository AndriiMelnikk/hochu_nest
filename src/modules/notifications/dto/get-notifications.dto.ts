import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsEnum, IsMongoId, IsNumber, IsOptional, Max, Min } from 'class-validator';
import { NotificationCategory } from '../../../database/enums/notification-category.enum';

const toBoolean = (value: unknown) => {
  if (value === undefined || value === null) {
    return undefined;
  }
  if (typeof value === 'boolean') {
    return value;
  }
  if (typeof value === 'number') {
    return value === 1;
  }
  if (typeof value === 'string') {
    return ['true', '1', 'yes'].includes(value.toLowerCase());
  }
  return undefined;
};

export class GetNotificationsDto {
  @ApiProperty({ required: false, description: 'Filter unread notifications only' })
  @IsOptional()
  @Transform(({ value }) => toBoolean(value))
  @IsBoolean()
  unread?: boolean;

  @ApiProperty({ required: false, enum: NotificationCategory })
  @IsOptional()
  @IsEnum(NotificationCategory)
  category?: NotificationCategory;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsMongoId()
  profileId?: string;

  @ApiProperty({ required: false, default: 1, minimum: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @ApiProperty({ required: false, default: 20, minimum: 1, maximum: 100 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(100)
  pageSize?: number = 20;
}
