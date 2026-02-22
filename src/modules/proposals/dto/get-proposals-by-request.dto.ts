import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumber, Min, Max, IsEnum } from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { ProposalStatus } from '../../../database/schemas/proposal.schema';

export class GetProposalsByRequestDto {
  @ApiProperty({ required: false, enum: ProposalStatus, isArray: true })
  @IsOptional()
  @IsEnum(ProposalStatus, { each: true })
  @Transform(({ value }) => {
    if (Array.isArray(value)) return value;
    return [value];
  })
  status?: ProposalStatus[];

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
