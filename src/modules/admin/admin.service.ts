import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery, Types } from 'mongoose';
import { Account, AccountDocument } from '../../database/schemas/account.schema';
import { Profile, ProfileDocument } from '../../database/schemas/profile.schema';
import { Request, RequestDocument, RequestStatus } from '../../database/schemas/request.schema';
import { Proposal, ProposalDocument, ProposalStatus } from '../../database/schemas/proposal.schema';
import { Report, ReportDocument, ReportStatus } from '../../database/schemas/report.schema';
import { NotificationsService } from '../notifications/notifications.service';
import { RequestsService } from '../requests/requests.service';
import { NotificationType } from '../../database/schemas/notification.schema';
import {
  BulkModerationDto,
  ListModerationRequestsDto,
  REJECTION_REASON_MIN,
} from './dto/moderation.dto';

type ModerationRequestLean = Omit<Request, 'buyerId' | 'category'> & {
  buyerId?: unknown;
  category?: unknown;
};

@Injectable()
export class AdminService {
  private readonly logger = new Logger(AdminService.name);

  constructor(
    @InjectModel(Account.name) private accountModel: Model<AccountDocument>,
    @InjectModel(Profile.name) private profileModel: Model<ProfileDocument>,
    @InjectModel(Request.name) private requestModel: Model<RequestDocument>,
    @InjectModel(Proposal.name) private proposalModel: Model<ProposalDocument>,
    @InjectModel(Report.name) private reportModel: Model<ReportDocument>,
    private readonly notificationsService: NotificationsService,
    private readonly requestsService: RequestsService,
  ) {}

  async getAnalytics() {
    const [totalAccounts, activeRequests, totalProposals, profilesByType, requestsByCategory] =
      await Promise.all([
        this.accountModel.countDocuments().exec(),
        this.requestModel.countDocuments({ status: RequestStatus.ACTIVE }).exec(),
        this.proposalModel.countDocuments().exec(),
        this.profileModel
          .aggregate([{ $group: { _id: '$type', count: { $sum: 1 } } }])
          .exec() as Promise<{ _id: string; count: number }[]>,
        this.requestModel
          .aggregate([{ $group: { _id: '$category', count: { $sum: 1 } } }])
          .exec() as Promise<{ _id: string; count: number }[]>,
      ]);

    const buyers = profilesByType.find((p) => p._id === 'buyer')?.count ?? 0;
    const sellers = profilesByType.find((p) => p._id === 'seller')?.count ?? 0;

    return {
      totalUsers: totalAccounts,
      activeRequests,
      totalProposals,
      revenue: 0,
      growth: '0%',
      usersByRole: { buyers, sellers },
      requestsByCategory: requestsByCategory.reduce(
        (acc, item) => {
          acc[item._id] = item.count;
          return acc;
        },
        {} as Record<string, number>,
      ),
      activityChart: [],
    };
  }

  // ───────────── Модерація запитів ─────────────

  private static readonly APPROVABLE_FROM = [RequestStatus.PENDING, RequestStatus.REJECTED];
  private static readonly REJECTABLE_FROM = [RequestStatus.PENDING, RequestStatus.ACTIVE];

  private formatModerationItem(request: ModerationRequestLean, withLog = false) {
    const buyer = request.buyerId as
      | { _id: Types.ObjectId; name?: string; lastName?: string; accountId?: { email?: string } }
      | undefined;
    const category = request.category as
      | { _id: Types.ObjectId; translations?: Record<string, { title?: string }> }
      | undefined;
    return {
      id: request._id.toString(),
      title: request.title,
      description: request.description,
      budgetMin: request.budgetMin,
      budgetMax: request.budgetMax,
      urgency: request.urgency,
      location: request.location,
      images: request.images ?? [],
      status: request.status,
      createdAt: request.createdAt,
      moderatedAt: request.moderatedAt ?? null,
      moderatedBy: request.moderatedBy ?? null,
      rejectionReason: request.rejectionReason ?? null,
      buyer: buyer
        ? {
            id: buyer._id.toString(),
            name: [buyer.name, buyer.lastName].filter(Boolean).join(' '),
            email: buyer.accountId?.email ?? null,
          }
        : null,
      category: category
        ? {
            id: category._id.toString(),
            title: category.translations?.uk?.title ?? category.translations?.en?.title ?? '',
          }
        : null,
      ...(withLog ? { moderationLog: request.moderationLog ?? [] } : {}),
    };
  }

  private moderationPopulate = [
    {
      path: 'buyerId',
      select: 'name lastName',
      populate: { path: 'accountId', select: 'email' },
    },
    { path: 'category', select: 'translations' },
  ];

  async listModerationRequests(dto: ListModerationRequestsDto) {
    const page = Math.max(1, Math.floor(dto.page || 1));
    const pageSize = Math.min(100, Math.max(1, Math.floor(dto.pageSize || 20)));
    const status = dto.status ?? 'pending';

    const query: FilterQuery<RequestDocument> = {};
    if (status !== 'all') query.status = status as RequestStatus;
    else
      query.status = { $in: [RequestStatus.PENDING, RequestStatus.ACTIVE, RequestStatus.REJECTED] };
    const q = dto.q?.trim();
    if (q) query.title = { $regex: q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), $options: 'i' };

    // Черга: найстаріші першими; історія: щойно промодеровані зверху
    const sort: Record<string, 1 | -1> =
      status === 'pending' ? { createdAt: 1 } : { moderatedAt: -1, createdAt: -1 };

    const [results, count, grouped] = await Promise.all([
      this.requestModel
        .find(query)
        .populate(this.moderationPopulate)
        .sort(sort)
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .lean()
        .exec() as unknown as Promise<ModerationRequestLean[]>,
      this.requestModel.countDocuments(query).exec(),
      this.requestModel
        .aggregate([
          {
            $match: {
              status: {
                $in: [RequestStatus.PENDING, RequestStatus.ACTIVE, RequestStatus.REJECTED],
              },
            },
          },
          { $group: { _id: '$status', count: { $sum: 1 } } },
        ])
        .exec() as Promise<{ _id: string; count: number }[]>,
    ]);

    const counts = { pending: 0, active: 0, rejected: 0 };
    for (const g of grouped) {
      if (g._id in counts) counts[g._id as keyof typeof counts] = g.count;
    }

    return {
      count,
      page,
      pageSize,
      counts,
      results: results.map((r) => this.formatModerationItem(r)),
    };
  }

  async getModerationRequest(id: string) {
    const request = (await this.requestModel
      .findById(id)
      .populate(this.moderationPopulate)
      .lean()
      .exec()) as unknown as ModerationRequestLean | null;
    if (!request) throw new NotFoundException('Request not found');
    return this.formatModerationItem(request, true);
  }

  /** Схвалення: pending/rejected → active. Атомарно, щоб два модератори не обробили запит двічі. */
  async approveRequest(id: string, adminLogin = 'admin') {
    const now = new Date();
    const request = await this.requestModel
      .findOneAndUpdate(
        { _id: id, status: { $in: AdminService.APPROVABLE_FROM } },
        {
          $set: { status: RequestStatus.ACTIVE, moderatedAt: now, moderatedBy: adminLogin },
          $unset: { rejectionReason: '' },
          $push: { moderationLog: { action: 'approved', by: adminLogin, at: now } },
        },
        { new: true },
      )
      .exec();

    if (!request) await this.throwModerationError(id, 'approve');

    await this.notifyBuyer(request!, NotificationType.REQUEST_APPROVED);
    try {
      await this.requestsService.notifySellersAboutNewRequest(request!);
    } catch (error) {
      this.logger.error(`Failed to notify sellers about request ${id}`, error as Error);
    }
    return { success: true, message: 'Request approved' };
  }

  /** Відхилення: pending/active → rejected з обов'язковою причиною. */
  async rejectRequest(id: string, reason: string, adminLogin = 'admin') {
    const trimmed = reason?.trim();
    if (!trimmed || trimmed.length < REJECTION_REASON_MIN) {
      throw new BadRequestException('Rejection reason is required');
    }
    const now = new Date();
    const request = await this.requestModel
      .findOneAndUpdate(
        { _id: id, status: { $in: AdminService.REJECTABLE_FROM } },
        {
          $set: {
            status: RequestStatus.REJECTED,
            rejectionReason: trimmed,
            moderatedAt: now,
            moderatedBy: adminLogin,
          },
          $push: {
            moderationLog: { action: 'rejected', reason: trimmed, by: adminLogin, at: now },
          },
        },
        { new: true },
      )
      .exec();

    if (!request) await this.throwModerationError(id, 'reject');

    await this.notifyBuyer(request!, NotificationType.REQUEST_REJECTED, trimmed);
    return { success: true, message: 'Request rejected' };
  }

  /** Масова дія: кожен запит обробляється окремо, помилка одного не зупиняє решту. */
  async bulkModerate(dto: BulkModerationDto, adminLogin = 'admin') {
    const ids = Array.from(new Set(dto.ids));
    const succeeded: string[] = [];
    const failed: { id: string; error: string }[] = [];
    for (const id of ids) {
      try {
        if (dto.action === 'approve') await this.approveRequest(id, adminLogin);
        else await this.rejectRequest(id, dto.reason ?? '', adminLogin);
        succeeded.push(id);
      } catch (error) {
        failed.push({ id, error: error instanceof Error ? error.message : 'Unknown error' });
      }
    }
    return { succeeded, failed };
  }

  private async throwModerationError(id: string, action: 'approve' | 'reject'): Promise<never> {
    const exists = await this.requestModel.exists({ _id: id }).exec();
    if (!exists) throw new NotFoundException('Request not found');
    throw new ConflictException(
      `Request cannot be ${action === 'approve' ? 'approved' : 'rejected'} in its current status`,
    );
  }

  private async notifyBuyer(request: RequestDocument, type: NotificationType, reason?: string) {
    try {
      const buyerProfile = await this.profileModel.findById(request.buyerId).exec();
      if (!buyerProfile) return;
      await this.notificationsService.dispatch({
        type,
        accountId: buyerProfile.accountId.toString(),
        profileId: buyerProfile._id.toString(),
        metadata: {
          requestId: request._id.toString(),
          requestTitle: request.title,
          ...(reason ? { reason } : {}),
        },
        link: `/request/${request._id.toString()}`,
      });
    } catch (error) {
      // Збій сповіщення не повинен скасовувати вже виконану модерацію
      this.logger.error(
        `Failed to notify buyer about request ${request._id.toString()}`,
        error as Error,
      );
    }
  }

  async getPendingProposals(page?: number, pageSize?: number) {
    const skip = ((page || 1) - 1) * (pageSize || 20);
    const results = await this.proposalModel
      .find({ status: ProposalStatus.PENDING })
      .populate({
        path: 'sellerId',
        select: 'name lastName avatar',
        populate: { path: 'accountId', select: 'email' },
      })
      .populate('requestId', 'title')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(pageSize || 20)
      .exec();

    const count = await this.proposalModel
      .countDocuments({ status: ProposalStatus.PENDING })
      .exec();

    return { count, results };
  }

  async approveProposal(id: string) {
    await Promise.resolve();
    return { success: true, message: `Proposal ${id} approved` };
  }

  async rejectProposal(id: string, reason: string) {
    await this.proposalModel
      .updateOne(
        { _id: id },
        { status: ProposalStatus.REJECTED, rejectionReason: reason },
        { strict: false },
      )
      .exec();
    return { success: true, message: 'Proposal rejected' };
  }

  async getReportedUsers(page?: number, pageSize?: number) {
    const skip = ((page || 1) - 1) * (pageSize || 20);
    const reports = await this.reportModel
      .find({ targetType: 'user', status: ReportStatus.PENDING })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(pageSize || 20)
      .exec();

    const accountIds = Array.from(
      new Set(
        (reports as unknown[])
          .map((r) => (r as { targetId?: { toString(): string } }).targetId?.toString())
          .filter(Boolean),
      ),
    ) as string[];
    const accounts = await this.accountModel
      .find({ _id: { $in: accountIds } })
      .select('-password')
      .exec();

    return { count: accounts.length, results: accounts };
  }

  async getReports(status?: ReportStatus, page?: number, pageSize?: number) {
    const skip = ((page || 1) - 1) * (pageSize || 20);
    const query: FilterQuery<ReportDocument> = {};
    if (status) query.status = status;

    const results = await this.reportModel
      .find(query)
      .populate('reporterId', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(pageSize || 20)
      .exec();

    const count = await this.reportModel.countDocuments(query).exec();
    return { count, results };
  }

  async updateReportStatus(id: string, status: ReportStatus) {
    await this.reportModel.updateOne({ _id: id }, { status }).exec();
    return { success: true };
  }

  async blockUser(id: string, reason: string, duration: string) {
    const blockedUntil = this.calculateBlockedUntil(duration);
    await this.accountModel.updateOne({ _id: id }, { isBlocked: true, blockedUntil }).exec();
    return { success: true, message: 'User blocked' };
  }

  async unblockUser(id: string) {
    await this.accountModel.updateOne({ _id: id }, { isBlocked: false, blockedUntil: null }).exec();
    return { success: true, message: 'User unblocked' };
  }

  private calculateBlockedUntil(duration: string): Date {
    const now = new Date();
    switch (duration) {
      case '24h':
        return new Date(now.getTime() + 24 * 60 * 60 * 1000);
      case '7d':
        return new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
      case '30d':
        return new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
      case 'permanent':
        return new Date('2099-12-31');
      default:
        return new Date(now.getTime() + 24 * 60 * 60 * 1000);
    }
  }
}
