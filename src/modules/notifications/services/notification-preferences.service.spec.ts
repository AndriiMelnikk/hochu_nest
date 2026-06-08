import { Types } from 'mongoose';
import { NotificationPreferencesService } from './notification-preferences.service';
import { defaultNotificationPreferences } from '../../../database/schemas/notification-preferences.schema';
import { NotificationChannel } from '../../../database/enums/notification-category.enum';

describe('NotificationPreferencesService', () => {
  const profileId = new Types.ObjectId().toString();
  const accountId = new Types.ObjectId().toString();

  const profileModel = {
    findOne: jest.fn(),
  };
  const i18n = { t: jest.fn((key: string) => key) };

  const service = new NotificationPreferencesService(profileModel as never, i18n as never);

  it('returns default preferences', () => {
    const defaults = service.getDefaults();
    expect(defaults.new_requests.enabled).toBe(true);
    expect(defaults.messages.channels).toEqual([NotificationChannel.IN_APP]);
  });

  it('merges partial preference updates', async () => {
    const current = defaultNotificationPreferences();
    const profile = {
      notificationPreferences: current,
      save: jest.fn().mockResolvedValue(undefined),
    };

    profileModel.findOne.mockReturnValue({ exec: jest.fn().mockResolvedValue(profile) });

    const updated = await service.update(profileId, accountId, {
      messages: { enabled: false },
    });

    expect(updated.messages.enabled).toBe(false);
    expect(updated.reviews.enabled).toBe(true);
    expect(profile.save).toHaveBeenCalled();
  });
});
