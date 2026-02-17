import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { Proposal, ProposalDocument, ProposalStatus } from '../../database/schemas/proposal.schema';
import { Request, RequestDocument, RequestStatus } from '../../database/schemas/request.schema';
import { User, UserDocument } from '../../database/schemas/user.schema';
import { CreateProposalDto } from './dto/create-proposal.dto';
import { XpService } from '../xp/xp.service';
import { AchievementsService } from '../achievements/achievements.service';
import { NotificationsService } from '../notifications/notifications.service';
import { NotificationType } from '../../database/schemas/notification.schema';

@Injectable()
export class ProposalsService {
  constructor(
    @InjectModel(Proposal.name) private proposalModel: Model<ProposalDocument>,
    @InjectModel(Request.name) private requestModel: Model<RequestDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private xpService: XpService,
    private achievementsService: AchievementsService,
    private notificationsService: NotificationsService,
    private readonly i18n: I18nService,
  ) {}

  async create(requestId: string, createProposalDto: CreateProposalDto, sellerId: string) {
    const request = await this.requestModel.findById(requestId).exec();
    if (!request) {
      throw new NotFoundException(
        this.i18n.t('common.proposals.request_not_found', {
          lang: I18nContext.current()?.lang,
          args: { id: requestId },
        }),
      );
    }

    if (request.status !== RequestStatus.ACTIVE) {
      throw new BadRequestException(
        this.i18n.t('common.proposals.request_not_active', {
          lang: I18nContext.current()?.lang,
        }),
      );
    }

    if (request.buyerId.toString() === sellerId) {
      throw new ForbiddenException(
        this.i18n.t('common.proposals.cannot_propose_own_request', {
          lang: I18nContext.current()?.lang,
        }),
      );
    }

    // Check if seller already has a proposal for this request
    const existingProposal = await this.proposalModel
      .findOne({
        requestId: new Types.ObjectId(requestId),
        sellerId: new Types.ObjectId(sellerId),
      })
      .exec();

    if (existingProposal) {
      throw new BadRequestException(
        this.i18n.t('common.proposals.already_proposed', {
          lang: I18nContext.current()?.lang,
        }),
      );
    }

    const proposal = new this.proposalModel({
      ...createProposalDto,
      requestId: new Types.ObjectId(requestId),
      sellerId: new Types.ObjectId(sellerId),
      status: ProposalStatus.PENDING,
    });

    await proposal.save();

    // Increment proposals count
    await this.requestModel.updateOne({ _id: requestId }, { $inc: { proposalsCount: 1 } }).exec();

    // Award XP to seller
    await this.xpService.awardXp(sellerId, 5);
    await this.achievementsService.checkAndUnlockAchievements(sellerId);

    // Notify buyer
    const buyer = await this.userModel.findById(request.buyerId).exec();
    if (buyer) {
      await this.notificationsService.create({
        userId: buyer._id.toString(),
        type: NotificationType.NEW_PROPOSAL,
        title: 'Нова пропозиція',
        message: `На ваш запит "${request.title}" надійшла нова пропозиція`,
        link: `/request/${requestId}`,
      });
    }

    return proposal.populate('sellerId', 'name avatar rating');
  }

  async findAllByRequest(requestId: string) {
    const proposals = await this.proposalModel
      .find({ requestId: new Types.ObjectId(requestId) })
      .populate('sellerId', 'name avatar rating location completedDeals xp')
      .sort({ createdAt: -1 })
      .exec();

    return proposals;
  }

  async canPropose(
    requestId: string,
    userId: string,
  ): Promise<{ canPropose: boolean; reason?: string }> {
    const user = await this.userModel.findById(userId).exec();
    if (!user || user.isBlocked) {
      return {
        canPropose: false,
        reason: 'USER_BLOCKED',
      };
    }

    const request = await this.requestModel.findById(requestId).exec();
    if (!request) {
      return {
        canPropose: false,
        reason: 'REQUEST_NOT_FOUND',
      };
    }

    if (request.status !== RequestStatus.ACTIVE) {
      return {
        canPropose: false,
        reason: 'REQUEST_NOT_ACTIVE',
      };
    }

    if (request.buyerId.toString() === userId) {
      return {
        canPropose: false,
        reason: 'OWN_REQUEST',
      };
    }

    const existingProposal = await this.proposalModel
      .findOne({
        requestId: new Types.ObjectId(requestId),
        sellerId: new Types.ObjectId(userId),
      })
      .exec();

    if (existingProposal) {
      return {
        canPropose: false,
        reason: 'ALREADY_PROPOSED',
      };
    }

    return { canPropose: true };
  }

  async findOne(id: string) {
    const proposal = await this.proposalModel
      .findById(id)
      .populate('sellerId', 'name avatar rating location memberSince completedDeals xp')
      .populate('requestId')
      .exec();

    if (!proposal) {
      throw new NotFoundException(
        this.i18n.t('common.proposals.proposal_not_found', {
          lang: I18nContext.current()?.lang,
          args: { id },
        }),
      );
    }

    return proposal;
  }

  async accept(id: string, buyerId: string) {
    const proposal = await this.findOne(id);
    const request = await this.requestModel.findById(proposal.requestId).exec();

    if (!request) {
      throw new NotFoundException(
        this.i18n.t('common.proposals.request_not_found_short', {
          lang: I18nContext.current()?.lang,
        }),
      );
    }

    if (request.buyerId.toString() !== buyerId) {
      throw new ForbiddenException(
        this.i18n.t('common.proposals.only_owner_accept', {
          lang: I18nContext.current()?.lang,
        }),
      );
    }

    if (request.status === RequestStatus.CLOSED) {
      throw new BadRequestException(
        this.i18n.t('common.proposals.request_already_closed', {
          lang: I18nContext.current()?.lang,
        }),
      );
    }

    if (proposal.status !== ProposalStatus.PENDING) {
      throw new BadRequestException(
        this.i18n.t('common.proposals.proposal_not_pending', {
          lang: I18nContext.current()?.lang,
        }),
      );
    }

    // Transaction-like operation: accept proposal and reject others
    await Promise.all([
      // Accept this proposal
      this.proposalModel.updateOne({ _id: id }, { status: ProposalStatus.ACCEPTED }),
      // Reject all other proposals
      this.proposalModel.updateMany(
        {
          requestId: proposal.requestId,
          _id: { $ne: id },
          status: ProposalStatus.PENDING,
        },
        { status: ProposalStatus.REJECTED },
      ),
      // Close request
      this.requestModel.updateOne({ _id: request._id }, { status: RequestStatus.CLOSED }),
    ]);

    // Award XP
    await Promise.all([
      this.xpService.awardXp(buyerId, 20),
      this.xpService.awardXp(proposal.sellerId.toString(), 25),
    ]);

    // Check achievements
    await Promise.all([
      this.achievementsService.checkAndUnlockAchievements(buyerId),
      this.achievementsService.checkAndUnlockAchievements(proposal.sellerId.toString()),
    ]);

    // Notify seller
    await this.notificationsService.create({
      userId: proposal.sellerId.toString(),
      type: NotificationType.PROPOSAL_ACCEPTED,
      title: 'Пропозицію прийнято',
      message: `Вашу пропозицію на запит "${request.title}" прийнято`,
      link: `/proposal/${id}`,
    });

    return {
      success: true,
      message: this.i18n.t('common.proposals.accepted_success', {
        lang: I18nContext.current()?.lang,
      }),
    };
  }

  async reject(id: string, buyerId: string) {
    const proposal = await this.findOne(id);
    const request = await this.requestModel.findById(proposal.requestId).exec();

    if (!request) {
      throw new NotFoundException(
        this.i18n.t('common.proposals.request_not_found_short', {
          lang: I18nContext.current()?.lang,
        }),
      );
    }

    if (request.buyerId.toString() !== buyerId) {
      throw new ForbiddenException(
        this.i18n.t('common.proposals.only_owner_reject', {
          lang: I18nContext.current()?.lang,
        }),
      );
    }

    if (proposal.status !== ProposalStatus.PENDING) {
      throw new BadRequestException(
        this.i18n.t('common.proposals.proposal_not_pending', {
          lang: I18nContext.current()?.lang,
        }),
      );
    }

    await this.proposalModel.updateOne({ _id: id }, { status: ProposalStatus.REJECTED });

    // Notify seller
    await this.notificationsService.create({
      userId: proposal.sellerId.toString(),
      type: NotificationType.PROPOSAL_REJECTED,
      title: 'Пропозицію відхилено',
      message: `Вашу пропозицію на запит "${request.title}" відхилено`,
      link: `/request/${request._id.toString()}`,
    });

    return {
      success: true,
      message: this.i18n.t('common.proposals.rejected_success', {
        lang: I18nContext.current()?.lang,
      }),
    };
  }

  async complete(id: string, buyerId: string) {
    const proposal = await this.findOne(id);
    const request = await this.requestModel.findById(proposal.requestId).exec();

    if (!request) {
      throw new NotFoundException(
        this.i18n.t('common.proposals.request_not_found_short', {
          lang: I18nContext.current()?.lang,
        }),
      );
    }

    if (request.buyerId.toString() !== buyerId) {
      throw new ForbiddenException(
        this.i18n.t('common.proposals.only_owner_complete', {
          lang: I18nContext.current()?.lang,
        }),
      );
    }

    if (proposal.status !== ProposalStatus.ACCEPTED) {
      throw new BadRequestException(
        this.i18n.t('common.proposals.must_be_accepted_to_complete', {
          lang: I18nContext.current()?.lang,
        }),
      );
    }

    await this.proposalModel.updateOne({ _id: id }, { status: ProposalStatus.COMPLETED });

    // Update completed deals for both users
    await Promise.all([
      this.userModel.updateOne({ _id: buyerId }, { $inc: { completedDeals: 1 } }),
      this.userModel.updateOne({ _id: proposal.sellerId }, { $inc: { completedDeals: 1 } }),
    ]);

    // Award XP
    await Promise.all([
      this.xpService.awardXp(buyerId, 30),
      this.xpService.awardXp(proposal.sellerId.toString(), 50),
    ]);

    // Check achievements
    await Promise.all([
      this.achievementsService.checkAndUnlockAchievements(buyerId),
      this.achievementsService.checkAndUnlockAchievements(proposal.sellerId.toString()),
    ]);

    return {
      success: true,
      message: this.i18n.t('common.proposals.completed_success', {
        lang: I18nContext.current()?.lang,
      }),
    };
  }
}
