import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  ServiceUnavailableException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { AdminUser, AdminUserDocument } from '../../database/schemas/admin-user.schema';
import { AdminRole, AdminPermission, ROLE_PERMISSIONS } from './admin-permissions';

export interface AdminTokenPayload {
  sub: string;
  typ: 'admin';
}

export interface AdminIdentity {
  id: string;
  login: string;
  name: string;
  role: AdminRole;
  permissions: readonly AdminPermission[];
}

export const MAX_FAILED_ATTEMPTS = 5;
export const LOCK_MS = 10 * 60 * 1000;
export const BCRYPT_ROUNDS = 12;

/** Хеш для вирівнювання часу відповіді, коли логіну не існує. */
const DUMMY_HASH = bcrypt.hashSync('timing-equalizer', 4);

@Injectable()
export class AdminAuthService {
  constructor(
    private readonly config: ConfigService,
    private readonly jwt: JwtService,
    @InjectModel(AdminUser.name) private readonly users: Model<AdminUserDocument>,
  ) {}

  private get secret(): string {
    return this.config.get<string>('admin.jwtSecret') ?? '';
  }

  private get expiresIn(): number {
    return this.config.get<number>('admin.expiresInSeconds') ?? 8 * 60 * 60;
  }

  toIdentity(
    user: AdminUserDocument | (AdminUser & { _id: { toString(): string } }),
  ): AdminIdentity {
    return {
      id: user._id.toString(),
      login: user.login,
      name: user.name,
      role: user.role,
      permissions: ROLE_PERMISSIONS[user.role],
    };
  }

  async login(login: string, password: string, now = new Date()) {
    if (!this.secret) throw new ServiceUnavailableException('not_configured');

    const user = await this.users
      .findOne({ login: login.trim().toLowerCase() })
      .select('+passwordHash')
      .exec();

    // bcrypt виконується завжди: час відповіді не розкриває, чи існує логін
    const passwordOk = await bcrypt.compare(password, user?.passwordHash ?? DUMMY_HASH);

    if (user?.lockedUntil && user.lockedUntil > now) {
      throw new HttpException('too_many_attempts', HttpStatus.TOO_MANY_REQUESTS);
    }

    if (!user || !user.isActive || !passwordOk) {
      if (user) await this.registerFailure(user, now);
      throw new UnauthorizedException('invalid_credentials');
    }

    await this.users
      .updateOne({ _id: user._id }, { failedAttempts: 0, lockedUntil: null, lastLoginAt: now })
      .exec();

    const payload: AdminTokenPayload = { sub: user._id.toString(), typ: 'admin' };
    const accessToken = await this.jwt.signAsync(payload, {
      secret: this.secret,
      expiresIn: this.expiresIn,
    });
    return { accessToken, expiresIn: this.expiresIn, admin: this.toIdentity(user) };
  }

  private async registerFailure(user: AdminUserDocument, now: Date) {
    // Атомарний інкремент; при досягненні ліміту — блокуємо і обнуляємо лічильник
    const updated = await this.users
      .findOneAndUpdate({ _id: user._id }, { $inc: { failedAttempts: 1 } }, { new: true })
      .exec();
    if (updated && updated.failedAttempts >= MAX_FAILED_ATTEMPTS) {
      await this.users
        .updateOne(
          { _id: user._id },
          { failedAttempts: 0, lockedUntil: new Date(now.getTime() + LOCK_MS) },
        )
        .exec();
    }
  }

  /** Перевіряє токен і наявність активного співробітника в базі. */
  async authenticate(token: string): Promise<AdminIdentity> {
    if (!this.secret) throw new UnauthorizedException();
    let payload: AdminTokenPayload;
    try {
      payload = await this.jwt.verifyAsync<AdminTokenPayload>(token, { secret: this.secret });
    } catch {
      throw new UnauthorizedException();
    }
    if (payload.typ !== 'admin' || !payload.sub) throw new UnauthorizedException();

    const user = await this.users.findById(payload.sub).exec();
    if (!user || !user.isActive) throw new UnauthorizedException();
    return this.toIdentity(user);
  }

  async changeOwnPassword(adminId: string, currentPassword: string, newPassword: string) {
    const user = await this.users.findById(adminId).select('+passwordHash').exec();
    if (!user) throw new UnauthorizedException();
    if (!(await bcrypt.compare(currentPassword, user.passwordHash))) {
      // 400, а не 401: фронт розлогінює на 401, а тут сесія валідна
      throw new BadRequestException('wrong_password');
    }
    const passwordHash = await bcrypt.hash(newPassword, BCRYPT_ROUNDS);
    await this.users.updateOne({ _id: user._id }, { passwordHash }).exec();
    return { success: true };
  }
}
