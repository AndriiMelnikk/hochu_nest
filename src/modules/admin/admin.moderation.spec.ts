import { BadRequestException, ConflictException, NotFoundException } from '@nestjs/common';
import { AdminService } from './admin.service';
import { RequestStatus } from '../../database/schemas/request.schema';

type Doc = { _id: { toString(): string }; title: string; buyerId: string };

function build(opts: { updated?: Doc | null; exists?: boolean } = {}) {
  const calls: { filter: any; update: any }[] = [];
  const requestModel = {
    findOneAndUpdate: jest.fn((filter, update) => {
      calls.push({ filter, update });
      return { exec: () => Promise.resolve(opts.updated ?? null) };
    }),
    exists: jest.fn(() => ({ exec: () => Promise.resolve(opts.exists ? { _id: 1 } : null) })),
  };
  const profileModel = {
    findById: jest.fn(() => ({
      exec: () =>
        Promise.resolve({ _id: { toString: () => 'p1' }, accountId: { toString: () => 'a1' } }),
    })),
  };
  const notifications = { dispatch: jest.fn().mockResolvedValue(undefined) };
  const requestsService = { notifySellersAboutNewRequest: jest.fn().mockResolvedValue(undefined) };
  const svc = new AdminService(
    {} as never,
    profileModel as never,
    requestModel as never,
    {} as never,
    {} as never,
    notifications as never,
    requestsService as never,
  );
  return { svc, calls, notifications, requestsService, requestModel };
}

const doc: Doc = { _id: { toString: () => 'r1' }, title: 'Купити ноутбук', buyerId: 'p1' };

describe('AdminService moderation', () => {
  it('approve: only pending/rejected move to active, logs the moderator, notifies buyer and sellers', async () => {
    const { svc, calls, notifications, requestsService } = build({ updated: doc });
    await svc.approveRequest('r1', 'admin');

    expect(calls[0].filter.status.$in).toEqual([RequestStatus.PENDING, RequestStatus.REJECTED]);
    expect(calls[0].update.$set).toMatchObject({
      status: RequestStatus.ACTIVE,
      moderatedBy: 'admin',
    });
    expect(calls[0].update.$unset).toHaveProperty('rejectionReason');
    expect(calls[0].update.$push.moderationLog).toMatchObject({ action: 'approved', by: 'admin' });
    expect(notifications.dispatch).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'request_approved' }),
    );
    expect(requestsService.notifySellersAboutNewRequest).toHaveBeenCalledWith(doc);
  });

  it('approve: 404 when missing, 409 when already in a final status', async () => {
    await expect(build({ exists: false }).svc.approveRequest('r1')).rejects.toThrow(
      NotFoundException,
    );
    await expect(build({ exists: true }).svc.approveRequest('r1')).rejects.toThrow(
      ConflictException,
    );
  });

  it('reject: requires a reason and stores it, notifying the author with it', async () => {
    const { svc, calls, notifications } = build({ updated: doc });
    await expect(svc.rejectRequest('r1', '   ')).rejects.toThrow(BadRequestException);
    await expect(svc.rejectRequest('r1', 'abc')).rejects.toThrow(BadRequestException);

    await svc.rejectRequest('r1', '  Заборонений товар  ', 'admin');
    expect(calls[0].filter.status.$in).toEqual([RequestStatus.PENDING, RequestStatus.ACTIVE]);
    expect(calls[0].update.$set).toMatchObject({
      status: RequestStatus.REJECTED,
      rejectionReason: 'Заборонений товар',
    });
    expect(notifications.dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'request_rejected',
        metadata: expect.objectContaining({ reason: 'Заборонений товар' }),
      }),
    );
  });

  it('a failing notification does not undo moderation', async () => {
    const { svc, notifications } = build({ updated: doc });
    notifications.dispatch.mockRejectedValueOnce(new Error('smtp down'));
    await expect(svc.approveRequest('r1')).resolves.toMatchObject({ success: true });
  });

  it('bulk: processes each id separately and reports failures', async () => {
    const { svc, requestModel } = build({ updated: doc });
    requestModel.findOneAndUpdate
      .mockImplementationOnce(() => ({ exec: () => Promise.resolve(doc) }))
      .mockImplementationOnce(() => ({ exec: () => Promise.resolve(null) }));
    const result = await svc.bulkModerate({ ids: ['a', 'b', 'a'], action: 'approve' });
    expect(result.succeeded).toEqual(['a']);
    expect(result.failed).toEqual([expect.objectContaining({ id: 'b' })]);
  });
});
