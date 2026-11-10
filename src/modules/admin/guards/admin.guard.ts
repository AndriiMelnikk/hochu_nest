import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { Request } from 'express';
import { AdminAuthService, AdminIdentity } from '../admin-auth.service';
import { roleHasPermission, AdminPermission } from '../admin-permissions';
import {
  ADMIN_ANY_STAFF_KEY,
  ADMIN_PERMISSION_KEY,
} from '../decorators/require-permission.decorator';

export type AdminRequest = Request & { admin?: AdminIdentity };

/**
 * 1) токен має бути виданий `POST /admin/auth/login`; 2) співробітник існує й активний (перевірка в базі
 * при кожному запиті — деактивація діє миттєво); 3) роль має потрібне право.
 */
@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private readonly auth: AdminAuthService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<AdminRequest>();
    const [scheme, token] = req.headers.authorization?.split(' ') ?? [];
    if (scheme !== 'Bearer' || !token) throw new UnauthorizedException();

    const identity = await this.auth.authenticate(token);
    req.admin = identity;

    const targets = [context.getHandler(), context.getClass()];
    const anyStaff = this.reflector.getAllAndOverride<boolean>(ADMIN_ANY_STAFF_KEY, targets);
    if (anyStaff) return true;

    const permission = this.reflector.getAllAndOverride<AdminPermission | undefined>(
      ADMIN_PERMISSION_KEY,
      targets,
    );
    if (!permission || !roleHasPermission(identity.role, permission)) {
      throw new ForbiddenException('forbidden');
    }
    return true;
  }
}
