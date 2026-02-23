import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Account, AccountDocument } from '../../database/schemas/account.schema';
import { Profile, ProfileDocument, ProfileType } from '../../database/schemas/profile.schema';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUsersDto } from './dto/get-users.dto';
import { PaginationUtil } from '../../common/utils/pagination.util';
import { AchievementsService } from '../achievements/achievements.service';
import { Request, RequestDocument, RequestStatus } from '../../database/schemas/request.schema';
import { Proposal, ProposalDocument, ProposalStatus } from '../../database/schemas/proposal.schema';
import { Review, ReviewDocument } from '../../database/schemas/review.schema';
import { ContactChannel } from '../../database/enums/contact-channel.enum';
import { ALLOWED_CONTACTS } from '../../database/constants/profile-contacts.constant';
import { UpdateContactsDto } from './dto/update-contacts.dto';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Account.name) private accountModel: Model<AccountDocument>,
    @InjectModel(Profile.name) private profileModel: Model<ProfileDocument>,
    @InjectModel(Request.name) private requestModel: Model<RequestDocument>,
    @InjectModel(Proposal.name) private proposalModel: Model<ProposalDocument>,
    @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
    private achievementsService: AchievementsService,
  ) {}

  async findAccountById(id: string): Promise<AccountDocument | null> {
    return this.accountModel.findById(id).exec() as Promise<AccountDocument | null>;
  }

  async findProfileById(id: string): Promise<ProfileDocument | null> {
    return this.profileModel.findById(id).exec() as Promise<ProfileDocument | null>;
  }

  async findOne(id: string) {
    const account = await this.accountModel.findById(id).exec();
    if (account) {
      const profilesDocs = await this.profileModel.find({ accountId: account._id }).exec();
      return {
        // eslint-disable-next-line
        account: this.sanitizeAccount(account as any),
        // eslint-disable-next-line
        profiles: (profilesDocs as any).map((p: any) => p.toObject() as unknown as Profile),
      } as any;
    }
    const profile = await this.profileModel.findById(id).populate('accountId').exec();
    if (profile) {
      let account: any = null;
      if (
        profile.accountId &&
        typeof profile.accountId === 'object' &&
        'email' in (profile.accountId as unknown as { email: unknown })
      ) {
        account = profile.accountId;
      } else {
        account = await this.accountModel.findById(profile.accountId).exec();
      }

      if (account) {
        return {
          // eslint-disable-next-line
          account: this.sanitizeAccount(account as any),
          // eslint-disable-next-line
          profile: (profile as any).toObject() as unknown as Profile,
        } as any;
      }
    }
    throw new NotFoundException(`Account or profile with ID ${id} not found`);
  }

  async findOnePublic(id: string) {
    const result = await this.findOne(id);
    return result;
  }

  async findByEmail(email: string): Promise<AccountDocument | null> {
    // eslint-disable-next-line
    return (await this.accountModel.findOne({ email }).exec()) as any;
  }

  async findMe(accountId: string, profileId: string) {
    const account = await this.accountModel.findById(accountId).lean<Account>().exec();
    if (!account) {
      throw new NotFoundException('Account not found');
    }
    const profile = await this.profileModel
      .findOne({ _id: profileId, accountId: account._id })
      .lean<Profile>()
      .exec();
    if (!profile) {
      throw new NotFoundException('Profile not found');
    }
    return {
      account: this.sanitizeAccount(account as Account & { _id: Types.ObjectId }),
      profile,
    };
  }

  async findProfile(profileId: string) {
    const profile = await this.profileModel.findById(profileId).lean<Profile>().exec();
    if (!profile) {
      throw new NotFoundException('Profile not found');
    }
    return profile;
  }

  async updateMe(accountId: string, profileId: string, updateUserDto: UpdateUserDto) {
    const account = await this.accountModel.findById(accountId).exec();
    if (!account) {
      throw new NotFoundException('Account not found');
    }

    // Find the specific profile being updated
    const currentProfile = await this.profileModel
      .findOne({ _id: profileId, accountId: account._id })
      .exec();
    if (!currentProfile) {
      throw new NotFoundException('Profile not found');
    }

    if (updateUserDto.name !== undefined) currentProfile.name = updateUserDto.name;

    // Update avatar on the specific profile
    if (updateUserDto.avatar !== undefined) currentProfile.avatar = updateUserDto.avatar;

    if (updateUserDto.location !== undefined) {
      const profiles = await this.profileModel.find({ accountId: account._id }).exec();
      for (const p of profiles) {
        p.location = updateUserDto.location;
        if (updateUserDto.name !== undefined) p.name = updateUserDto.name; // Update name on all profiles? Or just one?
        // Usually name is per profile if it's "Profile Name" but usually "User Name" is shared.
        // If we moved it to profile, maybe it should be synced or maybe specific.
        // User asked "field name also needs to be moved from account to profile".
        // Assuming it acts like location/avatar which are per profile (or synced if desired).
        // Let's assume we update the current profile's name.
        // But if the user expects "name" to be their "identity" across profiles, we might want to sync.
        // The original code for location synced it across all profiles:
        /*
        if (updateUserDto.location !== undefined) {
            const profiles = await this.profileModel.find({ accountId: account._id }).exec();
            for (const p of profiles) {
                p.location = updateUserDto.location;
                await p.save();
            }
        }
        */
        // Let's stick to updating the current profile first, and maybe sync if logic dictates.
        // If I look at the previous `updateMe` logic for location, it iterates all profiles.
        // I will do the same for name if it's updated.
        await p.save();
      }
    } else {
      // If location wasn't updated, we still need to save the profile if avatar or name changed
      if (updateUserDto.avatar !== undefined || updateUserDto.name !== undefined) {
        await currentProfile.save();
      }
    }

    await account.save();

    return {
      account: this.sanitizeAccount(account),
      profile: currentProfile,
    };
  }

  async getProfileStats(profileId: string) {
    const profile = await this.profileModel.findById(profileId).exec();
    if (!profile) {
      throw new NotFoundException(`Profile with ID ${profileId} not found`);
    }

    const isBuyer = profile.type === ProfileType.BUYER;
    const totalRequestsPromise = isBuyer
      ? this.requestModel.countDocuments({ buyerId: new Types.ObjectId(profileId) }).exec()
      : Promise.resolve(0);
    const totalProposalsPromise = !isBuyer
      ? this.proposalModel.countDocuments({ sellerId: new Types.ObjectId(profileId) }).exec()
      : Promise.resolve(0);
    const acceptedProposalsPromise = !isBuyer
      ? this.proposalModel
          .countDocuments({
            sellerId: new Types.ObjectId(profileId),
            status: 'accepted',
          })
          .exec()
      : Promise.resolve(0);

    const [totalRequests, totalProposals, acceptedProposals] = await Promise.all([
      totalRequestsPromise,
      totalProposalsPromise,
      acceptedProposalsPromise,
    ]);

    let totalEarned = 0;
    let totalSpent = 0;
    if (profile.type === ProfileType.SELLER) {
      const earned = await this.proposalModel
        .aggregate([
          { $match: { sellerId: new Types.ObjectId(profileId), status: 'completed' } },
          { $group: { _id: null, total: { $sum: '$price' } } },
        ])
        .exec();
      totalEarned = (earned[0] as { total: number })?.total ?? 0;
    }
    if (profile.type === ProfileType.BUYER) {
      const spent = await this.proposalModel
        .aggregate([
          {
            $lookup: {
              from: 'requests',
              localField: 'requestId',
              foreignField: '_id',
              as: 'request',
            },
          },
          { $unwind: '$request' },
          { $match: { 'request.buyerId': new Types.ObjectId(profileId), status: 'completed' } },
          { $group: { _id: null, total: { $sum: '$price' } } },
        ])
        .exec();
      totalSpent = (spent[0] as { total: number })?.total ?? 0;
    }

    return {
      totalRequests: isBuyer ? totalRequests : 0,
      totalProposals: isBuyer ? 0 : totalProposals,
      acceptedProposals: isBuyer ? 0 : acceptedProposals,
      completedDeals: profile.completedDeals,
      averageRating: profile.rating,
      totalEarned,
      totalSpent,
    };
  }

  async getProfileAchievements(profileId: string) {
    return this.achievementsService.getUserAchievements(profileId);
  }

  async findAll(dto: GetUsersDto) {
    const page = PaginationUtil.normalizePage(dto.page);
    const pageSize = PaginationUtil.normalizePageSize(dto.pageSize);
    const skip = PaginationUtil.getSkip(page, pageSize);

    const query: Record<string, unknown> = {};
    if (dto.role) {
      query.type = dto.role;
    }

    const profileQuery = query as { type?: string };
    // eslint-disable-next-line
    const results = (await (this.profileModel.find(profileQuery) as any)
      .populate('accountId', 'email')
      .skip(skip)
      .limit(pageSize)
      .lean()
      .exec()) as unknown as (Profile & {
      accountId: { _id: Types.ObjectId; email: string };
    })[];

    const count = await this.profileModel.countDocuments(profileQuery).exec();

    return PaginationUtil.createPaginationResult(
      results.map((p) => ({
        id: p._id.toString(),
        type: p.type,
        rating: p.rating,
        xp: p.xp,
        completedDeals: p.completedDeals,
        accountId: p.accountId,
        name: p.name,
        avatar: p.avatar,
      })),
      count,
      page,
      pageSize,
      '/api/users',
      dto,
    );
  }

  async getProfileRequests(profileId: string, status?: string) {
    const query: Record<string, unknown> = { buyerId: new Types.ObjectId(profileId) };
    if (status) {
      query.status = status as RequestStatus;
    }
    const results = await this.requestModel.find(query).sort({ createdAt: -1 }).exec();
    const count = await this.requestModel.countDocuments(query).exec();
    return { count, results };
  }

  async getProfileProposals(profileId: string, status?: string) {
    const query: Record<string, unknown> = { sellerId: new Types.ObjectId(profileId) };
    if (status) {
      query.status = status as ProposalStatus;
    }
    const results = await this.proposalModel
      .find(query)
      .populate('requestId', 'title')
      .sort({ createdAt: -1 })
      .exec();
    const count = await this.proposalModel.countDocuments(query).exec();
    return { count, results };
  }

  async getProfileReviews(profileId: string) {
    const results = await this.reviewModel
      .find({ targetProfileId: new Types.ObjectId(profileId) })
      .populate({ path: 'authorProfileId', select: 'avatar name' })
      .sort({ createdAt: -1 })
      .exec();
    const count = await this.reviewModel
      .countDocuments({ targetProfileId: new Types.ObjectId(profileId) })
      .exec();
    return { count, results };
  }

  async getProfileContacts(profileId: string) {
    const profile = await this.profileModel.findById(profileId).exec();
    if (!profile) {
      throw new NotFoundException(`Profile with ID ${profileId} not found`);
    }
    return profile.contacts || {};
  }

  async updateProfileContacts(
    profileId: string,
    updateContactsDto: UpdateContactsDto,
    userId: string,
  ) {
    const profile = await this.profileModel.findOne({ _id: profileId, accountId: userId }).exec();
    if (!profile) {
      throw new NotFoundException('Profile not found or does not belong to your account');
    }

    const allowedChannels = ALLOWED_CONTACTS[profile.type] || [];
    const newContacts = { ...(profile.contacts || {}) };

    for (const [key, value] of Object.entries(updateContactsDto)) {
      if (value !== undefined) {
        if (!allowedChannels.includes(key as ContactChannel)) {
          throw new BadRequestException(
            `Contact channel '${key}' is not allowed for profile type '${profile.type}'`,
          );
        }
        if (value === null || value === '') {
          delete newContacts[key as ContactChannel];
        } else {
          newContacts[key as ContactChannel] = value;
        }
      }
    }

    profile.contacts = newContacts;
    return profile.save();
  }

  private sanitizeAccount(account: any) {
    const obj = 'toObject' in account ? account.toObject() : { ...account };
    delete (obj as { password?: string }).password;
    return obj;
  }
}
