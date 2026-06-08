import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Profile, ProfileDocument, ProfileType } from '../../../database/schemas/profile.schema';
import { RequestDocument } from '../../../database/schemas/request.schema';
import { Category } from '../../../database/schemas/category.schema';
import { RequestSubscription } from '../../../database/schemas/request-subscription.schema';
import { NotificationCategory } from '../../../database/enums/notification-category.enum';
import { NewRequestsPreference } from '../../../database/schemas/notification-preferences.schema';

export interface MatchedSellerProfile {
  profile: ProfileDocument;
  accountId: string;
}

@Injectable()
export class RequestSubscriptionMatcherService {
  constructor(
    @InjectModel(Profile.name) private profileModel: Model<Profile>,
    @InjectModel(Category.name) private categoryModel: Model<Category>,
    @InjectModel(RequestSubscription.name)
    private requestSubscriptionModel: Model<RequestSubscription>,
  ) {}

  async findMatchingSellerProfiles(request: RequestDocument): Promise<MatchedSellerProfile[]> {
    const buyerProfile = await this.profileModel.findById(request.buyerId).exec();
    const buyerAccountId = buyerProfile?.accountId?.toString();

    const [subscriptionMatches, preferenceMatches] = await Promise.all([
      this.findFromSubscriptions(request, buyerAccountId),
      this.findFromEmbeddedPreferences(request, buyerAccountId),
    ]);

    const seen = new Set<string>();
    const results: MatchedSellerProfile[] = [];

    for (const match of [...subscriptionMatches, ...preferenceMatches]) {
      const key = match.profile._id.toString();
      if (seen.has(key)) continue;
      seen.add(key);
      results.push(match);
    }

    return results;
  }

  private async findFromSubscriptions(
    request: RequestDocument,
    buyerAccountId?: string,
  ): Promise<MatchedSellerProfile[]> {
    const subscriptions = await this.requestSubscriptionModel.find({ enabled: true }).lean().exec();
    if (subscriptions.length === 0) {
      return [];
    }

    const sellerProfileIds = subscriptions.map((s) => s.sellerProfileId);
    const profiles = await this.profileModel
      .find({
        _id: { $in: sellerProfileIds },
        type: ProfileType.SELLER,
        isBlocked: false,
      })
      .exec();
    const profileById = new Map(profiles.map((p) => [p._id.toString(), p]));

    const results: MatchedSellerProfile[] = [];

    for (const subscriptionDoc of subscriptions) {
      const profile = profileById.get(subscriptionDoc.sellerProfileId.toString());
      if (!profile) continue;
      if (buyerAccountId && profile.accountId.toString() === buyerAccountId) continue;

      if (!(await this.matchesSubscriptionFilters(request, subscriptionDoc))) continue;

      results.push({
        profile,
        accountId: profile.accountId.toString(),
      });
    }

    return results;
  }

  private async findFromEmbeddedPreferences(
    request: RequestDocument,
    buyerAccountId?: string,
  ): Promise<MatchedSellerProfile[]> {
    const sellers = await this.profileModel
      .find({
        type: ProfileType.SELLER,
        isBlocked: false,
        [`notificationPreferences.${NotificationCategory.NEW_REQUESTS}.enabled`]: true,
      })
      .exec();

    const results: MatchedSellerProfile[] = [];

    for (const profile of sellers) {
      if (buyerAccountId && profile.accountId.toString() === buyerAccountId) continue;

      const pref = profile.notificationPreferences?.[NotificationCategory.NEW_REQUESTS] as
        | NewRequestsPreference
        | undefined;

      if (!pref?.enabled) continue;

      const hasDedicatedSubscription = await this.requestSubscriptionModel
        .exists({ sellerProfileId: profile._id })
        .exec();

      if (hasDedicatedSubscription) continue;

      if (!(await this.matchesPreferenceFilters(request, pref))) continue;

      results.push({
        profile,
        accountId: profile.accountId.toString(),
      });
    }

    return results;
  }

  private async matchesSubscriptionFilters(
    request: RequestDocument,
    subscription: Pick<RequestSubscription, 'categories' | 'location' | 'budgetMin' | 'budgetMax'>,
  ): Promise<boolean> {
    if (subscription.location && request.location !== subscription.location) {
      return false;
    }

    if (subscription.budgetMin != null && request.budgetMax < subscription.budgetMin) {
      return false;
    }

    if (subscription.budgetMax != null && request.budgetMin != null) {
      if (request.budgetMin > subscription.budgetMax) {
        return false;
      }
    } else if (subscription.budgetMax != null && request.budgetMax > subscription.budgetMax) {
      return false;
    }

    if (subscription.categories.length > 0) {
      return this.categoryMatches(request.category, subscription.categories);
    }

    return true;
  }

  private async matchesPreferenceFilters(
    request: RequestDocument,
    pref: NewRequestsPreference,
  ): Promise<boolean> {
    if (pref.location && request.location !== pref.location) {
      return false;
    }

    if (pref.categories && pref.categories.length > 0) {
      return this.categoryMatches(request.category, pref.categories);
    }

    return true;
  }

  private async categoryMatches(
    requestCategoryId: Types.ObjectId | undefined,
    filterCategoryIds: Types.ObjectId[],
  ): Promise<boolean> {
    if (!requestCategoryId) {
      return false;
    }

    const requestCategory = await this.categoryModel.findById(requestCategoryId).exec();
    if (!requestCategory) {
      return false;
    }

    const requestCategoryIds = [requestCategory._id, ...(requestCategory.path ?? [])].map((id) =>
      id.toString(),
    );

    return filterCategoryIds.some((filterId) => requestCategoryIds.includes(filterId.toString()));
  }
}
