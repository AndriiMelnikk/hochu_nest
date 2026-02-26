import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';

export enum UploadType {
  AVATAR = 'avatar',
  POST = 'post',
  PHOTO = 'photo',
}

export class UploadDto {
  @ApiProperty({
    enum: UploadType,
    description: 'Type of the uploaded file (avatar, post, photo)',
    example: UploadType.PHOTO,
  })
  @IsEnum(UploadType)
  @IsNotEmpty()
  type: UploadType;
}
