import mongoose from 'mongoose';
import { Profile, ProfileSchema } from '../database/schemas/profile.schema';
import { defaultNotificationPreferences } from '../database/schemas/notification-preferences.schema';

async function migrateNotificationPreferences() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI is required');
  }

  console.log('Connecting to MongoDB...');
  await mongoose.connect(uri);

  const ProfileModel = mongoose.model(Profile.name, ProfileSchema);
  const defaults = defaultNotificationPreferences();

  const result = await ProfileModel.updateMany(
    {
      $or: [{ notificationPreferences: { $exists: false } }, { notificationPreferences: null }],
    },
    { $set: { notificationPreferences: defaults } },
  ).exec();

  console.log(`Updated ${result.modifiedCount} profiles with default notification preferences.`);
  await mongoose.disconnect();
}

migrateNotificationPreferences()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
