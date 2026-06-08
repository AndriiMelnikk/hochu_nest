import { Types } from 'mongoose';
import { RequestSubscriptionMatcherService } from './request-subscription-matcher.service';
import { ProfileType } from '../../../database/enums/profile-type.enum';
import { defaultNotificationPreferences } from '../../../database/schemas/notification-preferences.schema';

describe('RequestSubscriptionMatcherService', () => {
  const categoryId = new Types.ObjectId();
  const sellerProfileId = new Types.ObjectId();
  const buyerAccountId = new Types.ObjectId().toString();

  const profileModel = { find: jest.fn(), findById: jest.fn() };
  const categoryModel = { findById: jest.fn() };
  const requestSubscriptionModel = { find: jest.fn(), exists: jest.fn() };

  const service = new RequestSubscriptionMatcherService(
    profileModel as never,
    categoryModel as never,
    requestSubscriptionModel as never,
  );

  beforeEach(() => {
    jest.clearAllMocks();
    requestSubscriptionModel.find.mockReturnValue({
      lean: jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue([]) }),
    });
    requestSubscriptionModel.exists.mockReturnValue({ exec: jest.fn().mockResolvedValue(null) });
    profileModel.findById.mockReturnValue({
      exec: jest.fn().mockResolvedValue({ accountId: new Types.ObjectId(buyerAccountId) }),
    });
    categoryModel.findById.mockReturnValue({
      exec: jest.fn().mockResolvedValue({
        _id: categoryId,
        path: [],
      }),
    });
  });

  it('matches seller with category filter in embedded preferences', async () => {
    const seller = {
      _id: sellerProfileId,
      type: ProfileType.SELLER,
      isBlocked: false,
      accountId: new Types.ObjectId(),
      notificationPreferences: {
        ...defaultNotificationPreferences(),
        new_requests: {
          enabled: true,
          channels: ['in_app'],
          categories: [categoryId],
          location: null,
        },
      },
    };

    profileModel.find.mockReturnValue({ exec: jest.fn().mockResolvedValue([seller]) });

    const request = {
      _id: new Types.ObjectId(),
      buyerId: new Types.ObjectId(),
      category: categoryId,
      location: 'Kyiv',
      title: 'Need design',
      budgetMin: 100,
      budgetMax: 500,
    };

    const matches = await service.findMatchingSellerProfiles(request as never);
    expect(matches).toHaveLength(1);
    expect(matches[0].profile._id).toEqual(sellerProfileId);
  });

  it('skips seller when location does not match', async () => {
    const seller = {
      _id: sellerProfileId,
      type: ProfileType.SELLER,
      isBlocked: false,
      accountId: new Types.ObjectId(),
      notificationPreferences: {
        ...defaultNotificationPreferences(),
        new_requests: {
          enabled: true,
          channels: ['in_app'],
          categories: [],
          location: 'Lviv',
        },
      },
    };

    profileModel.find.mockReturnValue({ exec: jest.fn().mockResolvedValue([seller]) });

    const request = {
      _id: new Types.ObjectId(),
      buyerId: new Types.ObjectId(),
      category: categoryId,
      location: 'Kyiv',
      title: 'Need design',
      budgetMin: 100,
      budgetMax: 500,
    };

    const matches = await service.findMatchingSellerProfiles(request as never);
    expect(matches).toHaveLength(0);
  });
});
