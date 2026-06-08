import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { Profile, ProfileDocument } from '../../../database/schemas/profile.schema';
import {
  CategoryPreference,
  defaultNotificationPreferences,
  NotificationPreferences,
  NewRequestsPreference,
} from '../../../database/schemas/notification-preferences.schema';
import { NotificationCategory } from '../../../database/enums/notification-category.enum';
import {
  NewRequestsPreferenceDto,
  UpdateNotificationPreferencesDto,
} from '../dto/update-notification-preferences.dto';

@Injectable()
export class NotificationPreferencesService {
  constructor(
    @InjectModel(Profile.name) private profileModel: Model<ProfileDocument>,
    private readonly i18n: I18nService,
  ) {}

  getDefaults(): NotificationPreferences {
    return defaultNotificationPreferences();
  }

  async getByProfileId(profileId: string, accountId: string): Promise<NotificationPreferences> {
    const profile = await this.getOwnedProfile(profileId, accountId);
    return profile.notificationPreferences ?? this.getDefaults();
  }

  async update(
    profileId: string,
    accountId: string,
    dto: UpdateNotificationPreferencesDto,
  ): Promise<NotificationPreferences> {
    const profile = await this.getOwnedProfile(profileId, accountId);
    const current = profile.notificationPreferences ?? this.getDefaults();
    const updated = this.mergePreferences(current, dto);

    profile.notificationPreferences = updated;
    await profile.save();

    return updated;
  }

  getCategoryPreference(
    preferences: NotificationPreferences | undefined,
    category: NotificationCategory,
  ): CategoryPreference | NewRequestsPreference {
    const resolved = preferences ?? this.getDefaults();
    return resolved[category];
  }

  private async getOwnedProfile(profileId: string, accountId: string): Promise<ProfileDocument> {
    const profile = await this.profileModel
      .findOne({
        _id: new Types.ObjectId(profileId),
        accountId: new Types.ObjectId(accountId),
      })
      .exec();

    if (!profile) {
      throw new NotFoundException(
        this.i18n.t('common.auth.profile_not_found', { lang: I18nContext.current()?.lang }),
      );
    }

    return profile as unknown as ProfileDocument;
  }

  private mergePreferences(
    current: NotificationPreferences,
    dto: UpdateNotificationPreferencesDto,
  ): NotificationPreferences {
    const updated = { ...current };

    const categoryMap: Array<{
      key: NotificationCategory;
      dtoKey: keyof UpdateNotificationPreferencesDto;
    }> = [
      { key: NotificationCategory.NEW_REQUESTS, dtoKey: 'new_requests' },
      { key: NotificationCategory.REQUEST_UPDATES, dtoKey: 'request_updates' },
      { key: NotificationCategory.MY_REQUEST_ACTIVITY, dtoKey: 'my_request_activity' },
      { key: NotificationCategory.MY_PROPOSAL_STATUS, dtoKey: 'my_proposal_status' },
      { key: NotificationCategory.MESSAGES, dtoKey: 'messages' },
      { key: NotificationCategory.REVIEWS, dtoKey: 'reviews' },
      { key: NotificationCategory.ACHIEVEMENTS, dtoKey: 'achievements' },
    ];

    for (const { key, dtoKey } of categoryMap) {
      const patch = dto[dtoKey];
      if (!patch) continue;

      if (key === NotificationCategory.NEW_REQUESTS) {
        const existing = updated[key];
        const newRequestsPatch = patch as NewRequestsPreferenceDto;
        updated[key] = {
          ...existing,
          ...newRequestsPatch,
          categories: newRequestsPatch.categories
            ? newRequestsPatch.categories.map((id) => new Types.ObjectId(id))
            : existing.categories,
        } as NewRequestsPreference;
      } else {
        updated[key] = {
          ...updated[key],
          ...patch,
        } as CategoryPreference;
      }
    }

    return updated;
  }

  async assertProfileOwnership(profileId: string, accountId: string): Promise<void> {
    const profile = await this.profileModel
      .findOne({
        _id: new Types.ObjectId(profileId),
        accountId: new Types.ObjectId(accountId),
      })
      .exec();

    if (!profile) {
      throw new ForbiddenException(
        this.i18n.t('common.auth.profile_not_found', { lang: I18nContext.current()?.lang }),
      );
    }
  }
}
