import mongoose from 'mongoose';
import { Profile, ProfileSchema } from '../database/schemas/profile.schema';
import {
  RequestSubscription,
  RequestSubscriptionSchema,
} from '../database/schemas/request-subscription.schema';
import { NotificationCategory } from '../database/enums/notification-category.enum';
import { NotificationChannel } from '../database/enums/notification-category.enum';
import { NewRequestsPreference } from '../database/schemas/notification-preferences.schema';
import { ProfileType } from '../database/enums/profile-type.enum';

async function migrateRequestSubscriptions() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI is required');
  }

  console.log('Connecting to MongoDB...');
  await mongoose.connect(uri);

  const ProfileModel = mongoose.model(Profile.name, ProfileSchema);
  const RequestSubscriptionModel = mongoose.model(
    RequestSubscription.name,
    RequestSubscriptionSchema,
  );

  const sellers = await ProfileModel.find({ type: ProfileType.SELLER }).exec();
  let migrated = 0;

  for (const profile of sellers) {
    const pref = profile.notificationPreferences?.[NotificationCategory.NEW_REQUESTS] as
      | NewRequestsPreference
      | undefined;

    if (!pref) continue;

    const hasCategories = pref.categories && pref.categories.length > 0;
    const hasLocation = !!pref.location;

    if (!hasCategories && !hasLocation) continue;

    const existing = await RequestSubscriptionModel.exists({
      sellerProfileId: profile._id,
    }).exec();

    if (existing) continue;

    await RequestSubscriptionModel.create({
      sellerProfileId: profile._id,
      categories: pref.categories ?? [],
      location: pref.location ?? null,
      enabled: pref.enabled ?? true,
      channels: pref.channels ?? [NotificationChannel.IN_APP],
    });

    migrated += 1;
  }

  console.log(`Migrated ${migrated} request subscriptions from embedded preferences.`);
  await mongoose.disconnect();
}

migrateRequestSubscriptions()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
