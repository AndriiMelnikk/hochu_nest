import {
  IsBoolean,
  IsIn,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ADMIN_ROLES, type AdminRole } from '../admin-permissions';

export const PASSWORD_MIN = 8;
export const PASSWORD_MAX = 128;

export class CreateStaffDto {
  @IsString()
  @Matches(/^[a-zA-Z0-9._-]{3,32}$/, {
    message: 'login must be 3-32 chars: letters, digits, . _ -',
  })
  login: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string;

  @IsString()
  @MinLength(PASSWORD_MIN)
  @MaxLength(PASSWORD_MAX)
  password: string;

  @IsIn(ADMIN_ROLES)
  role: AdminRole;
}

export class UpdateStaffDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string;

  @IsOptional()
  @IsIn(ADMIN_ROLES)
  role?: AdminRole;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class ResetStaffPasswordDto {
  @IsString()
  @MinLength(PASSWORD_MIN)
  @MaxLength(PASSWORD_MAX)
  password: string;
}

export class ChangeOwnPasswordDto {
  @IsString()
  @MaxLength(PASSWORD_MAX)
  currentPassword: string;

  @IsString()
  @MinLength(PASSWORD_MIN)
  @MaxLength(PASSWORD_MAX)
  newPassword: string;
}
