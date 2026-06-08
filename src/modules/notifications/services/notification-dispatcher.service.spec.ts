import { Types } from 'mongoose';
import { NotificationDispatcher } from './notification-dispatcher.service';
import { NotificationType } from '../../../database/schemas/notification.schema';
import { NotificationChannel } from '../../../database/enums/notification-category.enum';
import { defaultNotificationPreferences } from '../../../database/schemas/notification-preferences.schema';

describe('NotificationDispatcher', () => {
  const profileId = new Types.ObjectId().toString();
  const accountId = new Types.ObjectId().toString();

  const profileModel = {
    findById: jest.fn(),
  };
  const accountModel = { findById: jest.fn() };
  const notificationModel = jest.fn().mockImplementation((data) => ({
    ...data,
    save: jest.fn().mockResolvedValue(data),
  }));
  (notificationModel as unknown as { countDocuments: jest.Mock }).countDocuments = jest
    .fn()
    .mockReturnValue({ exec: jest.fn().mockResolvedValue(1) });

  const preferencesService = {
    getCategoryPreference: jest.fn(),
  };
  const templatesService = {
    build: jest.fn().mockReturnValue({
      title: 'Title',
      message: 'Message',
      link: '/link',
    }),
  };

  const gateway = {
    emitToAccount: jest.fn(),
    isAccountOnline: jest.fn(),
  };

  const dispatcher = new NotificationDispatcher(
    profileModel as never,
    accountModel as never,
    notificationModel as never,
    preferencesService as never,
    templatesService as never,
    gateway as never,
    undefined,
  );

  beforeEach(() => {
    jest.clearAllMocks();
    profileModel.findById.mockReturnValue({
      exec: jest.fn().mockResolvedValue({
        _id: profileId,
        notificationPreferences: defaultNotificationPreferences(),
      }),
    });
  });

  it('skips dispatch when category is disabled', async () => {
    preferencesService.getCategoryPreference.mockReturnValue({
      enabled: false,
      channels: [NotificationChannel.IN_APP],
    });

    const result = await dispatcher.dispatch({
      type: NotificationType.NEW_PROPOSAL,
      accountId,
      profileId,
    });

    expect(result).toBeNull();
    expect(notificationModel).not.toHaveBeenCalled();
  });

  it('creates in-app notification when enabled', async () => {
    preferencesService.getCategoryPreference.mockReturnValue({
      enabled: true,
      channels: [NotificationChannel.IN_APP],
    });

    const result = await dispatcher.dispatch({
      type: NotificationType.NEW_PROPOSAL,
      accountId,
      profileId,
      metadata: { requestTitle: 'Test request' },
    });

    expect(result).not.toBeNull();
    expect(templatesService.build).toHaveBeenCalled();
    expect(gateway.emitToAccount).toHaveBeenCalledWith(
      accountId,
      'notification:new',
      expect.any(Object),
    );
  });
});
