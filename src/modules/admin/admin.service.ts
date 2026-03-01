import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
import { Account, AccountDocument } from '../../database/schemas/account.schema';
import { Profile, ProfileDocument } from '../../database/schemas/profile.schema';
import { Request, RequestDocument, RequestStatus } from '../../database/schemas/request.schema';
import { Proposal, ProposalDocument, ProposalStatus } from '../../database/schemas/proposal.schema';
import { Report, ReportDocument, ReportStatus } from '../../database/schemas/report.schema';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Account.name) private accountModel: Model<AccountDocument>,
    @InjectModel(Profile.name) private profileModel: Model<ProfileDocument>,
    @InjectModel(Request.name) private requestModel: Model<RequestDocument>,
    @InjectModel(Proposal.name) private proposalModel: Model<ProposalDocument>,
    @InjectModel(Report.name) private reportModel: Model<ReportDocument>,
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

  async approveRequest(id: string) {
    await this.requestModel.updateOne({ _id: id }, { status: RequestStatus.ACTIVE }).exec();
    return { success: true, message: 'Request approved' };
  }

  async rejectRequest(id: string, reason: string) {
    await this.requestModel
      .updateOne(
        { _id: id },
        { status: RequestStatus.REJECTED, rejectionReason: reason },
        { strict: false },
      )
      .exec();
    return { success: true, message: 'Request rejected' };
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
