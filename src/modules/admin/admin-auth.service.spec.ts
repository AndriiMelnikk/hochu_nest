import {
  BadRequestException,
  ExecutionContext,
  ForbiddenException,
  HttpException,
  ServiceUnavailableException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AdminAuthService } from './admin-auth.service';
import { AdminGuard } from './guards/admin.guard';
import { AnyStaff, RequirePermission } from './decorators/require-permission.decorator';

interface FakeUser {
  _id: { toString(): string };
  login: string;
  name: string;
  passwordHash: string;
  role: 'admin' | 'moderator' | 'editor' | 'analyst';
  isActive: boolean;
  failedAttempts: number;
  lockedUntil: Date | null;
  lastLoginAt: Date | null;
}

/** Мінімальна in-memory імітація mongoose-моделі для тестів сервісу. */
function fakeModel(users: FakeUser[]) {
  const exec = <T>(value: T) => ({
    exec: () => Promise.resolve(value),
    select: () => ({ exec: () => Promise.resolve(value) }),
  });
  return {
    findOne: jest.fn((q: { login: string }) =>
      exec(users.find((u) => u.login === q.login) ?? null),
    ),
    findById: jest.fn((id: string) => exec(users.find((u) => u._id.toString() === id) ?? null)),
    updateOne: jest.fn((q: { _id: { toString(): string } }, patch: Partial<FakeUser>) => {
      const u = users.find((x) => x._id.toString() === q._id.toString());
      if (u) Object.assign(u, patch);
      return exec({ matchedCount: u ? 1 : 0 });
    }),
    findOneAndUpdate: jest.fn((q: { _id: { toString(): string } }) => {
      const u = users.find((x) => x._id.toString() === q._id.toString());
      if (u) u.failedAttempts += 1;
      return exec(u ?? null);
    }),
  };
}

const SETTINGS: Record<string, unknown> = {
  'admin.jwtSecret': 'admin-secret',
  'admin.expiresInSeconds': 3600,
};
const mkUser = (over: Partial<FakeUser> = {}): FakeUser => ({
  _id: { toString: () => 'u1' },
  login: 'admin',
  name: 'Admin',
  passwordHash: bcrypt.hashSync('s3cret-pass', 4),
  role: 'admin',
  isActive: true,
  failedAttempts: 0,
  lockedUntil: null,
  lastLoginAt: null,
  ...over,
});

function build(users: FakeUser[], settings = SETTINGS) {
  const config = { get: (k: string) => settings[k] } as unknown as ConfigService;
  return new AdminAuthService(config, new JwtService({}), fakeModel(users) as never);
}

describe('AdminAuthService', () => {
  it('logs in with valid credentials and the token authenticates the same staff member', async () => {
    const users = [mkUser()];
    const svc = build(users);
    const { accessToken, admin } = await svc.login('Admin', 's3cret-pass');
    expect(admin).toMatchObject({ login: 'admin', role: 'admin' });
    await expect(svc.authenticate(accessToken)).resolves.toMatchObject({ id: 'u1', role: 'admin' });
    expect(users[0].lastLoginAt).toBeInstanceOf(Date);
  });

  it('gives the same 401 for wrong password, unknown login and deactivated account', async () => {
    const svc = build([
      mkUser(),
      mkUser({ _id: { toString: () => 'u2' }, login: 'off', isActive: false }),
    ]);
    await expect(svc.login('admin', 'nope')).rejects.toThrow(UnauthorizedException);
    await expect(svc.login('ghost', 's3cret-pass')).rejects.toThrow(UnauthorizedException);
    await expect(svc.login('off', 's3cret-pass')).rejects.toThrow(UnauthorizedException);
  });

  it('503 when the JWT secret is not configured', async () => {
    await expect(build([mkUser()], {}).login('admin', 'x')).rejects.toThrow(
      ServiceUnavailableException,
    );
  });

  it('locks the account after 5 failures (stored in DB), even for the right password', async () => {
    const users = [mkUser()];
    const svc = build(users);
    const now = new Date('2026-01-01T10:00:00Z');
    for (let i = 0; i < 5; i++) {
      await expect(svc.login('admin', 'bad', now)).rejects.toThrow(UnauthorizedException);
    }
    expect(users[0].lockedUntil).not.toBeNull();
    const attempt = svc.login('admin', 's3cret-pass', new Date(now.getTime() + 60_000));
    await expect(attempt).rejects.toBeInstanceOf(HttpException);
    await expect(attempt).rejects.toMatchObject({ status: 429 });
    await expect(
      svc.login('admin', 's3cret-pass', new Date(now.getTime() + 11 * 60_000)),
    ).resolves.toBeDefined();
    expect(users[0].failedAttempts).toBe(0);
  });

  it('rejects foreign/forged tokens and tokens of deactivated or deleted staff', async () => {
    const users = [mkUser()];
    const svc = build(users);
    const jwt = new JwtService({});
    const foreign = await jwt.signAsync({ sub: 'u1', typ: 'admin' }, { secret: 'other' });
    const userToken = await jwt.signAsync({ sub: 'u1' }, { secret: 'admin-secret' });
    await expect(svc.authenticate(foreign)).rejects.toThrow(UnauthorizedException);
    await expect(svc.authenticate(userToken)).rejects.toThrow(UnauthorizedException);
    await expect(svc.authenticate('garbage')).rejects.toThrow(UnauthorizedException);

    const { accessToken } = await svc.login('admin', 's3cret-pass');
    users[0].isActive = false; // деактивація діє одразу, без очікування завершення токена
    await expect(svc.authenticate(accessToken)).rejects.toThrow(UnauthorizedException);
    users.length = 0;
    await expect(svc.authenticate(accessToken)).rejects.toThrow(UnauthorizedException);
  });

  it('changeOwnPassword requires the current password', async () => {
    const users = [mkUser()];
    const svc = build(users);
    await expect(svc.changeOwnPassword('u1', 'wrong', 'new-password-1')).rejects.toThrow(
      BadRequestException,
    );
    await svc.changeOwnPassword('u1', 's3cret-pass', 'new-password-1');
    await expect(svc.login('admin', 'new-password-1')).resolves.toBeDefined();
    await expect(svc.login('admin', 's3cret-pass')).rejects.toThrow(UnauthorizedException);
  });
});

describe('AdminGuard', () => {
  class Handlers {
    @RequirePermission('moderation.requests') moderate() {}
    @RequirePermission('staff.manage') staff() {}
    @AnyStaff() me() {}
    unannotated() {}
  }
  const ctx = (method: keyof Handlers, authorization?: string) => {
    const req: { headers: Record<string, string | undefined>; admin?: unknown } = {
      headers: { authorization },
    };
    const context = {
      switchToHttp: () => ({ getRequest: () => req }),
      getHandler: () => Handlers.prototype[method],
      getClass: () => Handlers,
    } as unknown as ExecutionContext;
    return { req, context };
  };
  const setup = async (role: FakeUser['role']) => {
    const svc = build([mkUser({ role })]);
    const { accessToken } = await svc.login('admin', 's3cret-pass');
    return { guard: new AdminGuard(svc, new Reflector()), token: accessToken };
  };

  it('401 without bearer token', async () => {
    const { guard } = await setup('admin');
    await expect(guard.canActivate(ctx('moderate').context)).rejects.toThrow(UnauthorizedException);
    await expect(guard.canActivate(ctx('moderate', 'Basic x').context)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('allows a role that has the permission and exposes the identity', async () => {
    const { guard, token } = await setup('moderator');
    const { req, context } = ctx('moderate', `Bearer ${token}`);
    await expect(guard.canActivate(context)).resolves.toBe(true);
    expect(req.admin).toMatchObject({ role: 'moderator' });
  });

  it('403 when the role lacks the permission', async () => {
    const { guard, token } = await setup('moderator');
    await expect(guard.canActivate(ctx('staff', `Bearer ${token}`).context)).rejects.toThrow(
      ForbiddenException,
    );
    const analyst = await setup('analyst');
    await expect(
      analyst.guard.canActivate(ctx('moderate', `Bearer ${analyst.token}`).context),
    ).rejects.toThrow(ForbiddenException);
  });

  it('denies by default on handlers without a permission annotation, allows AnyStaff', async () => {
    const { guard, token } = await setup('admin');
    await expect(guard.canActivate(ctx('unannotated', `Bearer ${token}`).context)).rejects.toThrow(
      ForbiddenException,
    );
    const analyst = await setup('analyst');
    await expect(
      analyst.guard.canActivate(ctx('me', `Bearer ${analyst.token}`).context),
    ).resolves.toBe(true);
  });
});
