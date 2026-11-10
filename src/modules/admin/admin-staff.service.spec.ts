import { BadRequestException, ConflictException } from '@nestjs/common';
import { AdminStaffService } from './admin-staff.service';

type U = {
  _id: { toString(): string };
  login: string;
  role: string;
  isActive: boolean;
  name: string;
  failedAttempts: number;
  lockedUntil: Date | null;
  save: () => Promise<void>;
};

function build(users: U[]) {
  const exec = <T>(v: T) => ({ exec: () => Promise.resolve(v) });
  const model = {
    findById: jest.fn((id: string) => exec(users.find((u) => u._id.toString() === id) ?? null)),
    countDocuments: jest.fn((q: { _id: { $ne: { toString(): string } } }) =>
      Promise.resolve(
        users.filter(
          (u) => u._id.toString() !== q._id.$ne.toString() && u.role === 'admin' && u.isActive,
        ).length,
      ),
    ),
    create: jest.fn((doc: Record<string, unknown>) => {
      if (users.some((u) => u.login === doc.login))
        return Promise.reject(Object.assign(new Error('dup'), { code: 11000 }));
      const u = {
        _id: { toString: () => `n${users.length}` },
        name: '',
        failedAttempts: 0,
        lockedUntil: null,
        isActive: true,
        save: () => Promise.resolve(),
        ...doc,
      } as U;
      users.push(u);
      return Promise.resolve(u);
    }),
  };
  return new AdminStaffService(model as never);
}
const user = (id: string, role = 'admin', isActive = true): U => ({
  _id: { toString: () => id },
  login: id,
  role,
  isActive,
  name: id,
  failedAttempts: 0,
  lockedUntil: null,
  save: () => Promise.resolve(),
});

describe('AdminStaffService', () => {
  it('creates staff with a hashed password and rejects duplicate logins', async () => {
    const users: U[] = [];
    const svc = build(users);
    const created = await svc.create(
      { login: 'mod1', password: 'password-1', role: 'moderator' },
      'admin',
    );
    expect(created).toMatchObject({ login: 'mod1', role: 'moderator', createdBy: 'admin' });
    expect((users[0] as unknown as { passwordHash: string }).passwordHash).not.toContain(
      'password-1',
    );
    await expect(
      svc.create({ login: 'mod1', password: 'password-2', role: 'editor' }, 'admin'),
    ).rejects.toThrow(ConflictException);
  });

  it('forbids demoting or deactivating yourself', async () => {
    const svc = build([user('a1'), user('a2')]);
    await expect(svc.update('a1', { role: 'moderator' }, 'a1')).rejects.toThrow(
      BadRequestException,
    );
    await expect(svc.update('a1', { isActive: false }, 'a1')).rejects.toThrow(BadRequestException);
  });

  it('forbids removing the last active admin', async () => {
    const svc = build([user('a1'), user('m1', 'moderator'), user('a2', 'admin', false)]);
    await expect(svc.update('a1', { isActive: false }, 'm1')).rejects.toThrow(BadRequestException);
    await expect(svc.update('a1', { role: 'editor' }, 'm1')).rejects.toThrow(BadRequestException);
  });

  it('lets an admin change another admin or a moderator when another admin remains', async () => {
    const svc = build([user('a1'), user('a2'), user('m1', 'moderator')]);
    await expect(svc.update('a2', { role: 'analyst' }, 'a1')).resolves.toMatchObject({
      role: 'analyst',
    });
    await expect(svc.update('m1', { isActive: false }, 'a1')).resolves.toMatchObject({
      isActive: false,
    });
  });
});
