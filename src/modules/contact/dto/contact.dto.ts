import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class ContactDto {
  @ApiProperty({ example: 'Іван Петренко' })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(255)
  name: string;

  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'Питання щодо платформи' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(255)
  subject: string;

  @ApiProperty({ example: 'Добрий день! Хотів би дізнатися...' })
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(5000)
  message: string;
}
