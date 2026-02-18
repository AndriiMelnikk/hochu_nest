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
    return this.accountModel.findById(id).exec();
  }

  async findProfileById(id: string): Promise<ProfileDocument | null> {
    return this.profileModel.findById(id).exec();
  }

  async findOne(id: string) {
    const account = await this.accountModel.findById(id).exec();
    if (account) {
      const profiles = await this.profileModel.find({ accountId: account._id }).lean().exec();
      return { account: this.sanitizeAccount(account), profiles };
    }
    const profile = await this.profileModel.findById(id).populate('accountId').exec();
    if (profile) {
      const account =
        typeof profile.accountId === 'object' && profile.accountId !== null
          ? (profile.accountId as unknown as AccountDocument)
          : await this.accountModel.findById(profile.accountId).exec();
      if (account) {
        return { account: this.sanitizeAccount(account), profile: profile.toObject() };
      }
    }
    throw new NotFoundException(`Account or profile with ID ${id} not found`);
  }

  async findOnePublic(id: string) {
    const result = await this.findOne(id);
    return result;
  }

  async findByEmail(email: string): Promise<AccountDocument | null> {
    return this.accountModel.findOne({ email }).exec();
  }

  async findMe(accountId: string, profileId: string) {
    const account = await this.accountModel.findById(accountId).exec();
    if (!account) {
      throw new NotFoundException('Account not found');
    }
    const profile = await this.profileModel
      .findOne({ _id: profileId, accountId: account._id })
      .exec();
    if (!profile) {
      throw new NotFoundException('Profile not found');
    }
    return {
      account: this.sanitizeAccount(account),
      profile: profile.toObject(),
    };
  }

  async updateMe(accountId: string, updateUserDto: UpdateUserDto) {
    const account = await this.accountModel.findById(accountId).exec();
    if (!account) {
      throw new NotFoundException('Account not found');
    }
    if (updateUserDto.name !== undefined) account.name = updateUserDto.name;
    if (updateUserDto.avatar !== undefined) account.avatar = updateUserDto.avatar;
    if (updateUserDto.location !== undefined) {
      const profiles = await this.profileModel.find({ accountId: account._id }).exec();
      for (const p of profiles) {
        p.location = updateUserDto.location;
        await p.save();
      }
    }
    await account.save();
    return this.sanitizeAccount(account);
  }

  async getProfileStats(profileId: string) {
    const profile = await this.profileModel.findById(profileId).exec();
    if (!profile) {
      throw new NotFoundException(`Profile with ID ${profileId} not found`);
    }

    const isBuyer = profile.type === ProfileType.BUYER;
    const [totalRequests, totalProposals, acceptedProposals] = await Promise.all([
      isBuyer
        ? this.requestModel.countDocuments({ buyerId: new Types.ObjectId(profileId) }).exec()
        : Promise.resolve(0),
      !isBuyer
        ? this.proposalModel.countDocuments({ sellerId: new Types.ObjectId(profileId) }).exec()
        : Promise.resolve(0),
      !isBuyer
        ? this.proposalModel
            .countDocuments({
              sellerId: new Types.ObjectId(profileId),
              status: 'accepted',
            })
            .exec()
        : Promise.resolve(0),
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
    const results = await this.profileModel
      .find(profileQuery)
      .populate('accountId', 'name email avatar')
      .skip(skip)
      .limit(pageSize)
      .lean()
      .exec();

    const count = await this.profileModel.countDocuments(profileQuery).exec();

    return PaginationUtil.createPaginationResult(
      results.map((p) => ({
        id: (p as { _id: Types.ObjectId })._id.toString(),
        type: (p as { type: string }).type,
        rating: (p as { rating: number }).rating,
        xp: (p as { xp: number }).xp,
        completedDeals: (p as { completedDeals: number }).completedDeals,
        accountId: (p as { accountId: Types.ObjectId }).accountId,
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
      .populate({ path: 'authorAccountId', select: 'name avatar' })
      .sort({ createdAt: -1 })
      .exec();
    const count = await this.reviewModel
      .countDocuments({ targetProfileId: new Types.ObjectId(profileId) })
      .exec();
    return { count, results };
  }

  private sanitizeAccount(account: AccountDocument | (Account & { _id: Types.ObjectId })) {
    const obj = 'toObject' in account ? account.toObject() : { ...account };
    delete (obj as { password?: string }).password;
    return obj as Omit<Account, 'password'>;
  }
}
