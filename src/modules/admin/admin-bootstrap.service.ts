import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { AdminUser, AdminUserDocument } from '../../database/schemas/admin-user.schema';
import { BCRYPT_ROUNDS } from './admin-auth.service';

/**
 * Перший запуск: якщо в `admin_users` порожньо, створює адміна з ADMIN_LOGIN / ADMIN_PASSWORD.
 * Після цього ці змінні можна видалити — вони більше не використовуються.
 * Пароль із env не проходить політику довжини: це свідомий вибір власника сервера.
 */
@Injectable()
export class AdminBootstrapService implements OnApplicationBootstrap {
  private readonly logger = new Logger(AdminBootstrapService.name);

  constructor(
    private readonly config: ConfigService,
    @InjectModel(AdminUser.name) private readonly users: Model<AdminUserDocument>,
  ) {}

  async onApplicationBootstrap() {
    const login = this.config.get<string>('admin.login');
    const password = this.config.get<string>('admin.password');
    if (!login || !password) return;
    try {
      if ((await this.users.estimatedDocumentCount()) > 0) return;
      await this.users.create({
        login,
        name: login,
        passwordHash: await bcrypt.hash(password, BCRYPT_ROUNDS),
        role: 'admin',
        createdBy: 'bootstrap',
      });
      this.logger.log(`Created initial admin "${login}" from environment`);
    } catch (error) {
      // 11000: інший інстанс (serverless cold start) створив адміна одночасно — це нормально
      if ((error as { code?: number }).code !== 11000) {
        this.logger.error('Failed to bootstrap admin', error as Error);
      }
    }
  }
}
