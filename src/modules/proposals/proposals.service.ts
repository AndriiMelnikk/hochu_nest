import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types, FilterQuery } from 'mongoose';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { Proposal, ProposalDocument, ProposalStatus } from '../../database/schemas/proposal.schema';
import { Request, RequestDocument, RequestStatus } from '../../database/schemas/request.schema';
import { Profile, ProfileDocument, ProfileType } from '../../database/schemas/profile.schema';
import { CreateProposalDto } from './dto/create-proposal.dto';
import { UpdateProposalDto } from './dto/update-proposal.dto';

import { XpService } from '../xp/xp.service';
import { AchievementsService } from '../achievements/achievements.service';
import { NotificationsService } from '../notifications/notifications.service';
import { UploadService } from '../upload/upload.service';
import { NotificationType } from '../../database/schemas/notification.schema';
import { ProposalRejectionReason } from './proposals.constants';
import { GetProposalsByRequestDto } from './dto/get-proposals-by-request.dto';
import { PaginationResult, PaginationUtil } from '../../common/utils/pagination.util';

@Injectable()
export class ProposalsService {
  constructor(
    @InjectModel(Proposal.name) private proposalModel: Model<ProposalDocument>,
    @InjectModel(Request.name) private requestModel: Model<RequestDocument>,
    @InjectModel(Profile.name) private profileModel: Model<ProfileDocument>,
    private xpService: XpService,
    private achievementsService: AchievementsService,
    private notificationsService: NotificationsService,
    private readonly i18n: I18nService,
    private uploadService: UploadService,
  ) {}

  async create(requestId: string, createProposalDto: CreateProposalDto, sellerProfileId: string) {
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

    const sellerProfile = await this.profileModel.findById(sellerProfileId).exec();
    if (!sellerProfile || sellerProfile.type !== ProfileType.SELLER) {
      throw new ForbiddenException(
        this.i18n.t('common.auth.unauthorized', { lang: I18nContext.current()?.lang }),
      );
    }

    const buyerProfile = await this.profileModel.findById(request.buyerId).exec();
    if (buyerProfile && buyerProfile.accountId.equals(sellerProfile.accountId)) {
      throw new ForbiddenException(
        this.i18n.t('common.proposals.cannot_propose_own_request', {
          lang: I18nContext.current()?.lang,
        }),
      );
    }

    const existingProposal = await this.proposalModel
      .findOne({
        requestId: new Types.ObjectId(requestId),
        sellerId: new Types.ObjectId(sellerProfileId),
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
      sellerId: new Types.ObjectId(sellerProfileId),
      status: ProposalStatus.PENDING,
    });

    await proposal.save();

    if (createProposalDto.images && createProposalDto.images.length > 0) {
      await this.uploadService.confirmUploads(createProposalDto.images, proposal._id.toString());
    }

    await this.requestModel
      .updateOne({ _id: requestId }, { $inc: { proposalsCount: 1, pendingProposalsCount: 1 } })
      .exec();

    await this.xpService.awardXp(sellerProfileId, 5);
    await this.achievementsService.checkAndUnlockAchievements(sellerProfileId);

    const buyerProfileDoc = await this.profileModel.findById(request.buyerId).exec();
    if (buyerProfileDoc) {
      await this.notificationsService.create({
        accountId: buyerProfileDoc.accountId.toString(),
        type: NotificationType.NEW_PROPOSAL,
        title: 'Нова пропозиція',
        message: `На ваш запит "${request.title}" надійшла нова пропозиція`,
        link: `/request/${requestId}`,
      });
    }

    return proposal.populate([
      {
        path: 'sellerId',
        select: 'name avatar rating location memberSince completedDeals xp',
      },
      {
        path: 'requestId',
      },
    ]);
  }

  async findAllByRequest(
    requestId: string,
    dto: GetProposalsByRequestDto,
  ): Promise<PaginationResult<ProposalDocument>> {
    const page = PaginationUtil.normalizePage(dto.page);
    const pageSize = PaginationUtil.normalizePageSize(dto.pageSize);
    const skip = PaginationUtil.getSkip(page, pageSize);

    const query: FilterQuery<ProposalDocument> = { requestId: new Types.ObjectId(requestId) };

    if (dto.status) {
      query.status = { $in: dto.status };
    } else {
      query.status = { $ne: ProposalStatus.WITHDRAWN };
    }

    const results = await this.proposalModel
      .find(query)
      .populate({
        path: 'sellerId',
        select: 'name avatar rating location memberSince completedDeals xp',
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(pageSize)
      .exec();
    const count = await this.proposalModel.countDocuments(query).exec();

    const baseUrl = `/api/proposals/requests/${requestId}`;
    const resultsArray = results as unknown as ProposalDocument[];
    const paginationResult = PaginationUtil.createPaginationResult(
      resultsArray,
      count,
      page,
      pageSize,
      baseUrl,
      {
        page,
        pageSize,
      },
    );

    return paginationResult;
  }

  async canPropose(
    requestId: string,
    accountId: string,
    sellerProfileId: string,
  ): Promise<{ canPropose: boolean; reason?: ProposalRejectionReason }> {
    const request = await this.requestModel.findById(requestId).exec();
    if (!request) {
      return { canPropose: false, reason: ProposalRejectionReason.REQUEST_NOT_FOUND };
    }

    if (request.status !== RequestStatus.ACTIVE) {
      return { canPropose: false, reason: ProposalRejectionReason.REQUEST_NOT_ACTIVE };
    }

    const buyerProfile = await this.profileModel.findById(request.buyerId).exec();
    if (buyerProfile && buyerProfile.accountId.toString() === accountId) {
      return { canPropose: false, reason: ProposalRejectionReason.OWN_REQUEST };
    }

    const sellerProfile = await this.profileModel
      .findOne({ _id: sellerProfileId, accountId: new Types.ObjectId(accountId) })
      .exec();
    if (!sellerProfile || sellerProfile.type !== ProfileType.SELLER || sellerProfile.isBlocked) {
      return { canPropose: false, reason: ProposalRejectionReason.USER_BLOCKED };
    }

    const existingProposal = await this.proposalModel
      .findOne({
        requestId: new Types.ObjectId(requestId),
        sellerId: new Types.ObjectId(sellerProfileId),
      })
      .exec();

    if (existingProposal) {
      if (existingProposal.status === ProposalStatus.WITHDRAWN) {
        // The user already proposed and withdrew, so they cannot propose again.
        return { canPropose: false, reason: ProposalRejectionReason.ALREADY_PROPOSED };
      }
      return { canPropose: false, reason: ProposalRejectionReason.ALREADY_PROPOSED };
    }

    return { canPropose: true };
  }

  async findOne(id: string) {
    const proposal = await this.proposalModel
      .findById(id)
      .populate({
        path: 'sellerId',
        select: 'name avatar rating location memberSince completedDeals xp',
      })
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

  async update(id: string, updateProposalDto: UpdateProposalDto, sellerProfileId: string) {
    const proposal = await this.findOne(id);
    const sellerIdStr =
      typeof proposal.sellerId === 'object' && proposal.sellerId && '_id' in proposal.sellerId
        ? (proposal.sellerId as { _id: Types.ObjectId })._id.toString()
        : (proposal.sellerId as Types.ObjectId).toString();

    if (sellerIdStr !== sellerProfileId) {
      throw new ForbiddenException(
        this.i18n.t('common.proposals.forbidden_update_proposal', {
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

    // Calculate changes
    const changes: Array<{ field: string; oldValue: any; newValue: any }> = [];

    if (updateProposalDto.price !== undefined && updateProposalDto.price !== proposal.price) {
      changes.push({
        field: 'price',
        oldValue: proposal.price,
        newValue: updateProposalDto.price,
      });
    }
    if (updateProposalDto.title !== undefined && updateProposalDto.title !== proposal.title) {
      changes.push({
        field: 'title',
        oldValue: proposal.title,
        newValue: updateProposalDto.title,
      });
    }
    if (
      updateProposalDto.description !== undefined &&
      updateProposalDto.description !== proposal.description
    ) {
      changes.push({
        field: 'description',
        oldValue: proposal.description,
        newValue: updateProposalDto.description,
      });
    }
    if (
      updateProposalDto.estimatedTime !== undefined &&
      updateProposalDto.estimatedTime !== proposal.estimatedTime
    ) {
      changes.push({
        field: 'estimatedTime',
        oldValue: proposal.estimatedTime,
        newValue: updateProposalDto.estimatedTime,
      });
    }
    if (
      updateProposalDto.warranty !== undefined &&
      updateProposalDto.warranty !== proposal.warranty
    ) {
      changes.push({
        field: 'warranty',
        oldValue: proposal.warranty,
        newValue: updateProposalDto.warranty,
      });
    }
    if (
      updateProposalDto.itemCondition !== undefined &&
      updateProposalDto.itemCondition !== proposal.itemCondition
    ) {
      changes.push({
        field: 'itemCondition',
        oldValue: proposal.itemCondition,
        newValue: updateProposalDto.itemCondition,
      });
    }

    if (updateProposalDto.images !== undefined) {
      const oldImages = proposal.images || [];
      const newImages = updateProposalDto.images || [];
      if (JSON.stringify(oldImages) !== JSON.stringify(newImages)) {
        changes.push({ field: 'images', oldValue: oldImages, newValue: newImages });
      }
    }

    // Track edit history
    const editEntry = {
      timestamp: new Date(),
      changes: changes.length > 0 ? changes : undefined,
    };

    if (!proposal.edits) {
      proposal.edits = [];
    }
    proposal.edits.push(editEntry);

    Object.assign(proposal, updateProposalDto);
    await proposal.save();

    if (updateProposalDto.images && updateProposalDto.images.length > 0) {
      await this.uploadService.confirmUploads(updateProposalDto.images, proposal._id.toString());
    }

    return proposal;
  }

  async withdraw(id: string, sellerProfileId: string) {
    const proposal = await this.findOne(id);
    const request = await this.requestModel.findById(proposal.requestId).exec();

    if (!request) {
      throw new NotFoundException(
        this.i18n.t('common.proposals.request_not_found_short', {
          lang: I18nContext.current()?.lang,
        }),
      );
    }

    const sellerIdStr =
      typeof proposal.sellerId === 'object' && proposal.sellerId && '_id' in proposal.sellerId
        ? (proposal.sellerId as { _id: Types.ObjectId })._id.toString()
        : (proposal.sellerId as Types.ObjectId).toString();

    if (sellerIdStr !== sellerProfileId) {
      throw new ForbiddenException(
        this.i18n.t('common.proposals.only_owner_withdraw', {
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

    await this.proposalModel.updateOne({ _id: id }, { status: ProposalStatus.WITHDRAWN });
    await this.requestModel
      .updateOne({ _id: request._id }, { $inc: { proposalsCount: -1, pendingProposalsCount: -1 } })
      .exec();

    return {
      success: true,
      message: this.i18n.t('common.proposals.withdrawn_success', {
        lang: I18nContext.current()?.lang,
      }),
    };
  }

  async accept(id: string, buyerProfileId: string) {
    const proposal = await this.findOne(id);
    const request = await this.requestModel.findById(proposal.requestId).exec();

    if (!request) {
      throw new NotFoundException(
        this.i18n.t('common.proposals.request_not_found_short', {
          lang: I18nContext.current()?.lang,
        }),
      );
    }

    if (request.buyerId.toString() !== buyerProfileId) {
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

    const otherPendingProposalsCount = await this.proposalModel.countDocuments({
      requestId: proposal.requestId,
      _id: { $ne: id },
      status: ProposalStatus.PENDING,
    });

    await Promise.all([
      this.proposalModel.updateOne({ _id: id }, { status: ProposalStatus.ACCEPTED }),
      this.proposalModel.updateMany(
        {
          requestId: proposal.requestId,
          _id: { $ne: id },
          status: ProposalStatus.PENDING,
        },
        { status: ProposalStatus.REJECTED },
      ),
      this.requestModel.updateOne(
        { _id: request._id },
        {
          status: RequestStatus.CLOSED,
          executorId:
            typeof proposal.sellerId === 'object' && proposal.sellerId && '_id' in proposal.sellerId
              ? (proposal.sellerId as { _id: Types.ObjectId })._id
              : (proposal.sellerId as Types.ObjectId),
          $inc: {
            pendingProposalsCount: -(otherPendingProposalsCount + 1),
            rejectedProposalsCount: otherPendingProposalsCount,
          },
        },
      ),
    ]);

    const sellerProfileIdStr =
      typeof proposal.sellerId === 'object' && proposal.sellerId && '_id' in proposal.sellerId
        ? (proposal.sellerId as { _id: Types.ObjectId })._id.toString()
        : (proposal.sellerId as Types.ObjectId).toString();

    await Promise.all([
      this.xpService.awardXp(buyerProfileId, 20),
      this.xpService.awardXp(sellerProfileIdStr, 25),
    ]);

    await Promise.all([
      this.achievementsService.checkAndUnlockAchievements(buyerProfileId),
      this.achievementsService.checkAndUnlockAchievements(sellerProfileIdStr),
    ]);

    const sellerProfile = await this.profileModel.findById(sellerProfileIdStr).exec();
    if (sellerProfile) {
      await this.notificationsService.create({
        accountId: sellerProfile.accountId.toString(),
        type: NotificationType.PROPOSAL_ACCEPTED,
        title: 'Пропозицію прийнято',
        message: `Вашу пропозицію на запит "${request.title}" прийнято`,
        link: `/proposal/${id}`,
      });
    }

    return {
      success: true,
      message: this.i18n.t('common.proposals.accepted_success', {
        lang: I18nContext.current()?.lang,
      }),
    };
  }

  async reject(id: string, buyerProfileId: string) {
    const proposal = await this.findOne(id);
    const request = await this.requestModel.findById(proposal.requestId).exec();

    if (!request) {
      throw new NotFoundException(
        this.i18n.t('common.proposals.request_not_found_short', {
          lang: I18nContext.current()?.lang,
        }),
      );
    }

    if (request.buyerId.toString() !== buyerProfileId) {
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
    await this.requestModel
      .updateOne(
        { _id: request._id },
        { $inc: { pendingProposalsCount: -1, rejectedProposalsCount: 1 } },
      )
      .exec();

    const sellerProfileIdStr =
      typeof proposal.sellerId === 'object' && proposal.sellerId && '_id' in proposal.sellerId
        ? (proposal.sellerId as { _id: Types.ObjectId })._id.toString()
        : (proposal.sellerId as Types.ObjectId).toString();
    const sellerProfile = await this.profileModel.findById(sellerProfileIdStr).exec();
    if (sellerProfile) {
      await this.notificationsService.create({
        accountId: sellerProfile.accountId.toString(),
        type: NotificationType.PROPOSAL_REJECTED,
        title: 'Пропозицію відхилено',
        message: `Вашу пропозицію на запит "${request.title}" відхилено`,
        link: `/request/${request._id.toString()}`,
      });
    }

    return {
      success: true,
      message: this.i18n.t('common.proposals.rejected_success', {
        lang: I18nContext.current()?.lang,
      }),
    };
  }

  async complete(id: string, buyerProfileId: string) {
    const proposal = await this.findOne(id);
    const request = await this.requestModel.findById(proposal.requestId).exec();

    if (!request) {
      throw new NotFoundException(
        this.i18n.t('common.proposals.request_not_found_short', {
          lang: I18nContext.current()?.lang,
        }),
      );
    }

    if (request.buyerId.toString() !== buyerProfileId) {
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

    await Promise.all([
      this.proposalModel.updateOne({ _id: id }, { status: ProposalStatus.COMPLETED }),
      this.requestModel.updateOne(
        { _id: request._id },
        {
          status: RequestStatus.COMPLETED,
        },
      ),
    ]);

    const sellerProfileIdStr =
      typeof proposal.sellerId === 'object' && proposal.sellerId && '_id' in proposal.sellerId
        ? (proposal.sellerId as { _id: Types.ObjectId })._id.toString()
        : (proposal.sellerId as Types.ObjectId).toString();

    const ProfileModel = this.profileModel;
    await Promise.all([
      ProfileModel.updateOne({ _id: buyerProfileId }, { $inc: { completedDeals: 1 } }),
      ProfileModel.updateOne({ _id: sellerProfileIdStr }, { $inc: { completedDeals: 1 } }),
    ]);

    await Promise.all([
      this.xpService.awardXp(buyerProfileId, 30),
      this.xpService.awardXp(sellerProfileIdStr, 50),
    ]);

    await Promise.all([
      this.achievementsService.checkAndUnlockAchievements(buyerProfileId),
      this.achievementsService.checkAndUnlockAchievements(sellerProfileIdStr),
    ]);

    return {
      success: true,
      message: this.i18n.t('common.proposals.completed_success', {
        lang: I18nContext.current()?.lang,
      }),
    };
  }

  async cancel(id: string, buyerProfileId: string) {
    const proposal = await this.findOne(id);
    const request = await this.requestModel.findById(proposal.requestId).exec();

    if (!request) {
      throw new NotFoundException(
        this.i18n.t('common.proposals.request_not_found_short', {
          lang: I18nContext.current()?.lang,
        }),
      );
    }

    if (request.buyerId.toString() !== buyerProfileId) {
      throw new ForbiddenException(
        this.i18n.t('common.proposals.only_owner_reject', {
          lang: I18nContext.current()?.lang,
        }),
      );
    }

    if (proposal.status !== ProposalStatus.ACCEPTED) {
      throw new BadRequestException(
        this.i18n.t('common.proposals.must_be_accepted_to_cancel', {
          lang: I18nContext.current()?.lang,
        }),
      );
    }

    await Promise.all([
      this.proposalModel.updateOne({ _id: id }, { status: ProposalStatus.REJECTED }),
      this.requestModel.updateOne(
        { _id: request._id },
        {
          status: RequestStatus.ACTIVE,
          $inc: { rejectedProposalsCount: 1 },
          $unset: { executorId: '' },
        },
      ),
    ]);

    const sellerProfileIdStr =
      typeof proposal.sellerId === 'object' && proposal.sellerId && '_id' in proposal.sellerId
        ? (proposal.sellerId as { _id: Types.ObjectId })._id.toString()
        : (proposal.sellerId as Types.ObjectId).toString();
    const sellerProfile = await this.profileModel.findById(sellerProfileIdStr).exec();
    if (sellerProfile) {
      await this.notificationsService.create({
        accountId: sellerProfile.accountId.toString(),
        type: NotificationType.PROPOSAL_REJECTED,
        title: 'Пропозицію скасовано',
        message: `Покупець скасував раніше прийняту пропозицію на запит "${request.title}"`,
        link: `/request/${request._id.toString()}`,
      });
    }

    return {
      success: true,
      message: this.i18n.t('common.proposals.cancelled_success', {
        lang: I18nContext.current()?.lang,
      }),
    };
  }
}
