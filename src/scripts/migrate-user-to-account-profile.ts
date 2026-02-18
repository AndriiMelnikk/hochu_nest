/**
 * Migration: User -> Account + Profile
 *
 * Run: npx ts-node -r tsconfig-paths/register src/scripts/migrate-user-to-account-profile.ts
 *
 * Prerequisites: Backup your database. Ensure MONGODB_URI is set.
 * This script reads from the existing users collection, creates accounts and profiles,
 * then updates requests, proposals, reviews, user_achievements, refresh_tokens,
 * messages, notifications, discussions, reports.
 */
import mongoose, { Types } from 'mongoose';
import { User, UserSchema } from '../database/schemas/user.schema';
import { Account, AccountSchema } from '../database/schemas/account.schema';
import { Profile, ProfileSchema } from '../database/schemas/profile.schema';
import { Request, RequestSchema } from '../database/schemas/request.schema';
import { Proposal, ProposalSchema } from '../database/schemas/proposal.schema';
import { Review, ReviewSchema } from '../database/schemas/review.schema';
import {
  UserAchievement,
  UserAchievementSchema,
} from '../database/schemas/user-achievement.schema';
import { RefreshToken, RefreshTokenSchema } from '../database/schemas/refresh-token.schema';
import { Message, MessageSchema } from '../database/schemas/message.schema';
import { Notification, NotificationSchema } from '../database/schemas/notification.schema';
import { Discussion, DiscussionSchema } from '../database/schemas/discussion.schema';
import { Report, ReportSchema } from '../database/schemas/report.schema';
import { UserRole } from '../database/schemas/user.schema';
import { Achievement, AchievementSchema } from '../database/schemas/achievement.schema';

// type UserDoc = mongoose.Document<unknown, object, User> & User & { _id: Types.ObjectId };

interface UserMapping {
  accountId: Types.ObjectId;
  buyerProfileId?: Types.ObjectId;
  sellerProfileId?: Types.ObjectId;
}

async function migrate() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI is required');
  }

  console.log('Connecting to MongoDB...');
  await mongoose.connect(uri);

  const UserModel = mongoose.models.User ?? mongoose.model<User>('User', UserSchema);
  const AccountModel = mongoose.models.Account ?? mongoose.model<Account>('Account', AccountSchema);
  const ProfileModel = mongoose.models.Profile ?? mongoose.model<Profile>('Profile', ProfileSchema);
  const RequestModel = mongoose.models.Request ?? mongoose.model<Request>('Request', RequestSchema);
  const ProposalModel =
    mongoose.models.Proposal ?? mongoose.model<Proposal>('Proposal', ProposalSchema);
  const ReviewModel = mongoose.models.Review ?? mongoose.model<Review>('Review', ReviewSchema);
  const UserAchievementModel =
    mongoose.models.UserAchievement ??
    mongoose.model<UserAchievement>('UserAchievement', UserAchievementSchema);
  const RefreshTokenModel =
    mongoose.models.RefreshToken ??
    mongoose.model<RefreshToken>('RefreshToken', RefreshTokenSchema);
  const MessageModel = mongoose.models.Message ?? mongoose.model<Message>('Message', MessageSchema);
  const NotificationModel =
    mongoose.models.Notification ??
    mongoose.model<Notification>('Notification', NotificationSchema);
  const DiscussionModel =
    mongoose.models.Discussion ?? mongoose.model<Discussion>('Discussion', DiscussionSchema);
  const ReportModel = mongoose.models.Report ?? mongoose.model<Report>('Report', ReportSchema);

  const users = await UserModel.find().lean().exec();
  console.log(`Found ${users.length} users to migrate.`);

  const mapping = new Map<string, UserMapping>();

  for (const user of users as unknown as (User & { _id: Types.ObjectId })[]) {
    const accountDoc = await AccountModel.create({
      name: user.name,
      email: user.email,
      password: user.password,
      avatar: user.avatar ?? null,
      isAdmin: user.role === UserRole.ADMIN,
      isBlocked: user.isBlocked ?? false,
      blockedUntil: user.blockedUntil ?? null,
    });
    const accountId = accountDoc._id;

    const now = new Date();
    const stats = {
      rating: user.rating ?? 0,
      reviewsCount: user.reviewsCount ?? 0,
      completedDeals: user.completedDeals ?? 0,
      xp: user.xp ?? 0,
      memberSince: user.memberSince ?? now,
      location: user.location ?? null,
      isVerified: user.isVerified ?? false,
    };

    let buyerProfileId: Types.ObjectId | undefined;
    let sellerProfileId: Types.ObjectId | undefined;

    if (user.role === UserRole.BUYER || user.role === UserRole.ADMIN) {
      const buyerProfile = await ProfileModel.create({
        accountId,
        type: 'buyer',
        ...stats,
      });
      buyerProfileId = buyerProfile._id;
    }
    if (user.role === UserRole.SELLER || user.role === UserRole.ADMIN) {
      const sellerProfile = await ProfileModel.create({
        accountId,
        type: 'seller',
        ...stats,
      });
      sellerProfileId = sellerProfile._id;
    }

    if (user.role === UserRole.ADMIN && !buyerProfileId && !sellerProfileId) {
      const bp = await ProfileModel.create({
        accountId,
        type: 'buyer',
        rating: 0,
        reviewsCount: 0,
        completedDeals: 0,
        xp: 0,
        memberSince: now,
        isVerified: false,
      });
      const sp = await ProfileModel.create({
        accountId,
        type: 'seller',
        rating: 0,
        reviewsCount: 0,
        completedDeals: 0,
        xp: 0,
        memberSince: now,
        isVerified: false,
      });
      buyerProfileId = bp._id;
      sellerProfileId = sp._id;
    }

    mapping.set(user._id.toString(), {
      accountId,
      buyerProfileId,
      sellerProfileId,
    });
  }

  console.log('Updating requests...');
  const requests = await RequestModel.find().lean().exec();
  for (const req of requests as unknown as (Request & {
    _id: Types.ObjectId;
    buyerId: Types.ObjectId;
  })[]) {
    const m = mapping.get(req.buyerId.toString());
    if (m?.buyerProfileId) {
      await RequestModel.updateOne(
        { _id: req._id },
        { $set: { buyerId: m.buyerProfileId } },
      ).exec();
    }
  }

  console.log('Updating proposals...');
  const proposals = await ProposalModel.find().lean().exec();
  for (const prop of proposals as unknown as (Proposal & {
    _id: Types.ObjectId;
    sellerId: Types.ObjectId;
  })[]) {
    const m = mapping.get(prop.sellerId.toString());
    if (m?.sellerProfileId) {
      await ProposalModel.updateOne(
        { _id: prop._id },
        { $set: { sellerId: m.sellerProfileId } },
      ).exec();
    }
  }

  console.log('Updating reviews...');
  const reviews = await ReviewModel.find().lean().exec();
  for (const rev of reviews as unknown as {
    _id: Types.ObjectId;
    userId: Types.ObjectId;
    targetUserId: Types.ObjectId;
    proposalId?: Types.ObjectId;
  }[]) {
    const authorMap = mapping.get(rev.userId.toString());
    const targetMap = mapping.get(rev.targetUserId.toString());
    if (!authorMap || !targetMap) continue;

    let targetProfileId: Types.ObjectId | undefined;
    if (rev.proposalId) {
      const proposalDoc = await ProposalModel.findById(rev.proposalId).lean().exec();
      const proposal = proposalDoc as {
        requestId: Types.ObjectId;
        sellerId: Types.ObjectId;
      } | null;
      if (proposal) {
        const requestDoc = await RequestModel.findById(proposal.requestId).lean().exec();
        const request = requestDoc as { buyerId: Types.ObjectId } | null;
        const buyerId = request?.buyerId?.toString() ?? null;
        // const sellerId = proposal.sellerId?.toString();
        const authorIsBuyer =
          buyerId && mapping.get(buyerId)?.accountId.equals(authorMap.accountId);
        if (authorIsBuyer && targetMap.sellerProfileId) {
          targetProfileId = targetMap.sellerProfileId;
        } else if (!authorIsBuyer && targetMap.buyerProfileId) {
          targetProfileId = targetMap.buyerProfileId;
        }
      }
    }
    if (!targetProfileId) {
      targetProfileId = targetMap.sellerProfileId ?? targetMap.buyerProfileId;
    }
    if (authorMap.accountId && targetProfileId) {
      await ReviewModel.updateOne(
        { _id: rev._id },
        {
          $set: {
            authorAccountId: authorMap.accountId,
            targetProfileId,
          },
          $unset: { userId: 1, targetUserId: 1 },
        },
      ).exec();
    }
  }

  console.log('Updating user_achievements...');
  const userAchievementsList = await UserAchievementModel.find().lean().exec();
  const AchievementModel =
    mongoose.models.Achievement ?? mongoose.model<Achievement>('Achievement', AchievementSchema);
  for (const ua of userAchievementsList as unknown as (UserAchievement & {
    _id: Types.ObjectId;
    userId: Types.ObjectId;
    achievementId: string;
    unlockedAt: Date;
  })[]) {
    const m = mapping.get(ua.userId.toString());
    if (!m) continue;
    const ach = await AchievementModel.findOne({ id: ua.achievementId }).lean().exec();
    const role = (ach as { role?: string })?.role ?? 'both';
    if (role === 'buyer' && m.buyerProfileId) {
      await UserAchievementModel.updateOne(
        { _id: ua._id },
        { $set: { profileId: m.buyerProfileId }, $unset: { userId: 1 } },
      ).exec();
    } else if (role === 'seller' && m.sellerProfileId) {
      await UserAchievementModel.updateOne(
        { _id: ua._id },
        { $set: { profileId: m.sellerProfileId }, $unset: { userId: 1 } },
      ).exec();
    } else {
      const firstProfileId = m.buyerProfileId ?? m.sellerProfileId;
      if (firstProfileId) {
        await UserAchievementModel.updateOne(
          { _id: ua._id },
          { $set: { profileId: firstProfileId }, $unset: { userId: 1 } },
        ).exec();
        if (
          role === 'both' &&
          m.buyerProfileId &&
          m.sellerProfileId &&
          firstProfileId.equals(m.buyerProfileId)
        ) {
          await UserAchievementModel.create({
            profileId: m.sellerProfileId,
            achievementId: ua.achievementId,
            unlockedAt: ua.unlockedAt,
          });
        }
      }
    }
  }

  console.log('Updating refresh_tokens...');
  const refreshTokens = await RefreshTokenModel.find().lean().exec();
  for (const rt of refreshTokens as unknown as { _id: Types.ObjectId; userId: Types.ObjectId }[]) {
    const m = mapping.get(rt.userId?.toString());
    if (m) {
      await RefreshTokenModel.updateOne(
        { _id: rt._id },
        { $set: { accountId: m.accountId }, $unset: { userId: 1 } },
      ).exec();
    }
  }

  console.log('Updating notifications...');
  const notifs = await NotificationModel.find().lean().exec();
  for (const n of notifs as unknown as { _id: Types.ObjectId; userId: Types.ObjectId }[]) {
    const m = mapping.get(n.userId?.toString());
    if (m) {
      await NotificationModel.updateOne(
        { _id: n._id },
        { $set: { accountId: m.accountId }, $unset: { userId: 1 } },
      ).exec();
    }
  }

  console.log('Updating messages...');
  const messages = await MessageModel.find().lean().exec();
  for (const msg of messages as unknown as {
    _id: Types.ObjectId;
    senderId: Types.ObjectId;
    receiverId: Types.ObjectId;
  }[]) {
    const senderMap = mapping.get(msg.senderId?.toString());
    const receiverMap = mapping.get(msg.receiverId?.toString());
    if (senderMap && receiverMap) {
      await MessageModel.updateOne(
        { _id: msg._id },
        { $set: { senderId: senderMap.accountId, receiverId: receiverMap.accountId } },
      ).exec();
    }
  }

  console.log('Updating discussions...');
  const discussions = await DiscussionModel.find().lean().exec();
  for (const d of discussions as unknown as { _id: Types.ObjectId; userId: Types.ObjectId }[]) {
    const m = mapping.get(d.userId?.toString());
    if (m) {
      await DiscussionModel.updateOne(
        { _id: d._id },
        { $set: { accountId: m.accountId }, $unset: { userId: 1 } },
      ).exec();
    }
  }

  console.log('Updating reports...');
  const reports = await ReportModel.find().lean().exec();
  for (const r of reports as unknown as { _id: Types.ObjectId; reporterId: Types.ObjectId }[]) {
    const m = mapping.get(r.reporterId?.toString());
    if (m) {
      await ReportModel.updateOne({ _id: r._id }, { $set: { reporterId: m.accountId } }).exec();
    }
  }

  console.log('Migration completed. Do NOT drop users collection until you have verified data.');
  console.log('Rename users collection to users_backup if you want to keep a backup.');
}

migrate()
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.error('Migration failed:', err);
    process.exit(1);
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
