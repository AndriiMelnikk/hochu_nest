import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types, FilterQuery } from 'mongoose';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { Request, RequestDocument, RequestStatus } from '../../database/schemas/request.schema';
import { Proposal, ProposalDocument, ProposalStatus } from '../../database/schemas/proposal.schema';
import {
  Category,
  CategoryDocument,
  CategoryTranslations,
} from '../../database/schemas/category.schema';
import { Profile, ProfileDocument, ProfileType } from '../../database/schemas/profile.schema';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { GetRequestsDto } from './dto/get-requests.dto';
import { PaginationResult, PaginationUtil } from '../../common/utils/pagination.util';
import { SortUtil } from '../../common/utils/sort.util';
import { XpService } from '../xp/xp.service';
import { AchievementsService } from '../achievements/achievements.service';
import { UploadService } from '../upload/upload.service';

type PopulatedBuyer = {
  _id: Types.ObjectId;
  rating?: number;
  location?: string;
  memberSince?: Date;
  completedDeals?: number;
  xp?: number;
  name: string;
  lastName?: string;
  avatar?: string;
};

type LeanRequest = Omit<Request, 'buyerId' | 'category'> & {
  buyerId?: PopulatedBuyer;
  category?: Category & { _id: Types.ObjectId };
};

export type FormattedRequest = Omit<LeanRequest, 'category'> & {
  category?: { id: string; name: string };
};

export type PopulatedRequestDocument = Omit<RequestDocument, 'buyerId' | 'category'> & {
  buyerId: PopulatedBuyer;
  category: Category;
};

const URGENCY_MAP: Record<number, string> = {
  1: 'Гнучко',
  2: 'Протягом тижня',
  3: '2-3 дні',
  4: 'Терміново',
};

@Injectable()
export class RequestsService {
  constructor(
    @InjectModel(Request.name) private requestModel: Model<RequestDocument>,
    @InjectModel(Proposal.name) private proposalModel: Model<ProposalDocument>,
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
    @InjectModel(Profile.name) private profileModel: Model<ProfileDocument>,
    private xpService: XpService,
    private achievementsService: AchievementsService,
    private readonly i18n: I18nService,
    private readonly uploadService: UploadService,
  ) {}

  async create(createRequestDto: CreateRequestDto, buyerProfileId: string) {
    const profile = await this.profileModel.findById(buyerProfileId).exec();
    if (!profile || profile.type !== ProfileType.BUYER) {
      throw new ForbiddenException(
        this.i18n.t('common.auth.unauthorized', { lang: I18nContext.current()?.lang }),
      );
    }
    if (createRequestDto.budgetMax < (createRequestDto.budgetMin || 0)) {
      throw new BadRequestException(
        this.i18n.t('common.requests.budget_min_max_error', { lang: I18nContext.current()?.lang }),
      );
    }

    const request = new this.requestModel({
      ...createRequestDto,
      buyerId: new Types.ObjectId(buyerProfileId),
      status: RequestStatus.ACTIVE,
    });

    await request.save();

    if (createRequestDto.images && createRequestDto.images.length > 0) {
      await this.uploadService.confirmUploads(createRequestDto.images, request._id.toString());
    }

    await this.xpService.awardXp(buyerProfileId, 10);
    await this.achievementsService.checkAndUnlockAchievements(buyerProfileId);

    return request;
  }

  // async findFeed(
  //   dto: GetRequestsDto,
  //   userProfileId: string,
  // ): Promise<PaginationResult<FormattedRequest>> {
  //   const profile = await this.profileModel.findById(userProfileId).exec();
  //   if (!profile) {
  //     throw new NotFoundException(
  //       this.i18n.t('common.profile.not_found', { lang: I18nContext.current()?.lang }),
  //     );
  //   }

  //   const feedDto = { ...dto };
  //   if (!feedDto.location && profile.location) {
  //     feedDto.location = profile.location;
  //   }

  //   return this.findAll(feedDto, userProfileId);
  // }

  async findAllByProfileId(
    dto: GetRequestsDto,
    profileId: string,
  ): Promise<PaginationResult<FormattedRequest>> {
    const page = PaginationUtil.normalizePage(dto.page);
    const pageSize = PaginationUtil.normalizePageSize(dto.pageSize);
    const skip = PaginationUtil.getSkip(page, pageSize);

    const query: FilterQuery<RequestDocument> = {
      buyerId: new Types.ObjectId(profileId),
    };

    if (dto.status) {
      query.status = dto.status;
    }

    if (dto.search) {
      query.$or = [
        { title: { $regex: dto.search, $options: 'i' } },
        { description: { $regex: dto.search, $options: 'i' } },
      ];
    }

    const sortObj = SortUtil.buildSortObject(dto.sort);
    const sort = (sortObj && typeof sortObj === 'object'
      ? sortObj
      : { createdAt: -1 }) as unknown as Record<string, 1 | -1>;

    const results = (await this.requestModel
      .find(query)
      .populate([
        {
          path: 'buyerId',
          select: 'rating location memberSince completedDeals xp name lastName avatar',
        },
        { path: 'category' },
      ])
      .sort(sort)
      .skip(skip)
      .limit(pageSize)
      .lean()
      .exec()) as unknown as LeanRequest[];

    const count = await this.requestModel.countDocuments(query).exec();

    const formattedResults = results.map((request) => this.formatLeanRequest(request));

    return PaginationUtil.createPaginationResult(
      formattedResults,
      count,
      page,
      pageSize,
      `/api/requests/by-profile/${profileId}`,
      dto,
    );
  }

  async findAll(dto: GetRequestsDto): Promise<PaginationResult<FormattedRequest>> {
    const page = PaginationUtil.normalizePage(dto.page);
    const pageSize = PaginationUtil.normalizePageSize(dto.pageSize);
    const skip = PaginationUtil.getSkip(page, pageSize);

    const query: FilterQuery<RequestDocument> = {};

    // Default to active requests if no status specified
    if (!dto.status) {
      query.status = RequestStatus.ACTIVE;
    } else {
      query.status = dto.status;
    }

    if (dto.category) {
      // 1. Validate if category is a valid ObjectId
      if (!Types.ObjectId.isValid(dto.category)) {
        return PaginationUtil.createPaginationResult([], 0, page, pageSize, '/api/requests', dto);
      }

      // 2. Find root category by ID
      const rootCategory = await this.categoryModel
        .findById(dto.category)
        .select('_id')
        .lean()
        .exec();

      // 3. If category not found - return empty result
      if (!rootCategory) {
        return PaginationUtil.createPaginationResult([], 0, page, pageSize, '/api/requests', dto);
      }

      // 4. Get all subcategories + the category itself
      const categoriesAndDescendants = await this.categoryModel
        .find({
          $or: [
            { _id: rootCategory._id },
            { path: { $in: [rootCategory._id] } }, // path is array of ObjectIds
          ],
        })
        .select('_id')
        .lean()
        .exec();

      // 5. Extract IDs
      const categoryIds = categoriesAndDescendants.map((cat) => cat._id.toString());

      // 6. Filter for Request
      query.category = { $in: categoryIds };
    }

    if (dto.location) {
      query.location = { $regex: dto.location, $options: 'i' };
    }

    if (dto.budgetMin !== undefined) {
      query.budgetMax = { $gte: dto.budgetMin };
    }

    if (dto.budgetMax !== undefined) {
      query.budgetMin = { $lte: dto.budgetMax };
    }

    if (dto.search) {
      query.$or = [
        { title: { $regex: dto.search, $options: 'i' } },
        { description: { $regex: dto.search, $options: 'i' } },
      ];
    }

    const sortObj = SortUtil.buildSortObject(dto.sort);
    const sort = (sortObj && typeof sortObj === 'object'
      ? sortObj
      : { createdAt: -1 }) as unknown as Record<string, 1 | -1>;

    const results = (await this.requestModel
      .find(query)
      .populate([
        {
          path: 'buyerId',
          select: 'rating location memberSince completedDeals xp name lastName avatar',
        },
        { path: 'category' },
      ])
      .sort(sort)
      .skip(skip)
      .limit(pageSize)
      .lean()
      .exec()) as unknown as LeanRequest[];

    const count = await this.requestModel.countDocuments(query).exec();

    const formattedResults = results.map((request) => this.formatLeanRequest(request));

    return PaginationUtil.createPaginationResult(
      formattedResults,
      count,
      page,
      pageSize,
      '/api/requests',
      dto,
    );
  }

  async findOne(id: string): Promise<PopulatedRequestDocument> {
    const request = await this.requestModel
      .findByIdAndUpdate(id, { $inc: { views: 1 } }, { new: true })
      .populate([
        {
          path: 'buyerId',
          select: 'rating location memberSince completedDeals xp name lastName avatar',
        },
        { path: 'category' },
      ])
      .exec();

    if (!request) {
      throw new NotFoundException(
        this.i18n.t('common.requests.request_not_found', {
          lang: I18nContext.current()?.lang,
          args: { id },
        }),
      );
    }

    return request as unknown as PopulatedRequestDocument;
  }

  async getById(id: string): Promise<FormattedRequest> {
    const request = await this.findOne(id);

    const [pendingCount, rejectedCount] = await Promise.all([
      this.proposalModel.countDocuments({
        requestId: new Types.ObjectId(id),
        status: ProposalStatus.PENDING,
      }),
      this.proposalModel.countDocuments({
        requestId: new Types.ObjectId(id),
        status: ProposalStatus.REJECTED,
      }),
    ]);

    const requestObj = request.toObject() as unknown as LeanRequest;

    if (
      request.pendingProposalsCount !== pendingCount ||
      request.rejectedProposalsCount !== rejectedCount
    ) {
      await this.requestModel
        .updateOne(
          { _id: id },
          {
            pendingProposalsCount: pendingCount,
            rejectedProposalsCount: rejectedCount,
          },
        )
        .exec();
    }

    requestObj.pendingProposalsCount = pendingCount;
    requestObj.rejectedProposalsCount = rejectedCount;

    return this.formatLeanRequest(requestObj);
  }

  private formatLeanRequest(request: LeanRequest): FormattedRequest {
    const lang = (I18nContext.current()?.lang || 'uk') as keyof CategoryTranslations;

    const formatted: FormattedRequest = {
      ...request,
      category: undefined,
    };

    if (request.buyerId && '_id' in request.buyerId) {
      formatted.buyerId = request.buyerId;
    }

    if (request.category && request.category.translations) {
      const category = request.category;
      const translations = category.translations;
      formatted.category = {
        id: category._id.toString(),
        name: translations[lang]?.title || translations['uk']?.title || '',
      };
    }

    return formatted;
  }

  async update(
    id: string,
    updateRequestDto: UpdateRequestDto,
    buyerProfileId: string,
  ): Promise<Request> {
    const request = await this.findOne(id);
    const buyerIdStr =
      typeof request.buyerId === 'object' && request.buyerId && '_id' in request.buyerId
        ? (request.buyerId as { _id: Types.ObjectId })._id.toString()
        : String(request.buyerId);
    if (buyerIdStr !== buyerProfileId) {
      throw new ForbiddenException(
        this.i18n.t('common.requests.forbidden_update_request', {
          lang: I18nContext.current()?.lang,
        }),
      );
    }

    if (request.status === RequestStatus.CLOSED) {
      throw new BadRequestException(
        this.i18n.t('common.requests.cannot_update_closed_request', {
          lang: I18nContext.current()?.lang,
        }),
      );
    }

    // Calculate changes
    const changes: Array<{ field: string; oldValue: any; newValue: any }> = [];

    if (updateRequestDto.title !== undefined && updateRequestDto.title !== request.title) {
      changes.push({
        field: 'title',
        oldValue: request.title,
        newValue: updateRequestDto.title,
      });
    }
    if (
      updateRequestDto.description !== undefined &&
      updateRequestDto.description !== request.description
    ) {
      changes.push({
        field: 'description',
        oldValue: request.description,
        newValue: updateRequestDto.description,
      });
    }
    if (
      updateRequestDto.budgetMin !== undefined &&
      updateRequestDto.budgetMin !== request.budgetMin
    ) {
      changes.push({
        field: 'budgetMin',
        oldValue: request.budgetMin,
        newValue: updateRequestDto.budgetMin,
      });
    }
    if (
      updateRequestDto.budgetMax !== undefined &&
      updateRequestDto.budgetMax !== request.budgetMax
    ) {
      changes.push({
        field: 'budgetMax',
        oldValue: request.budgetMax,
        newValue: updateRequestDto.budgetMax,
      });
    }
    if (updateRequestDto.location !== undefined && updateRequestDto.location !== request.location) {
      changes.push({
        field: 'location',
        oldValue: request.location,
        newValue: updateRequestDto.location,
      });
    }
    if (updateRequestDto.urgency !== undefined && updateRequestDto.urgency !== request.urgency) {
      changes.push({
        field: 'urgency',
        oldValue: {
          value: request.urgency,
          label: URGENCY_MAP[request.urgency] || String(request.urgency),
        },
        newValue: {
          value: updateRequestDto.urgency,
          label: URGENCY_MAP[updateRequestDto.urgency] || String(updateRequestDto.urgency),
        },
      });
    }
    if (
      updateRequestDto.itemCondition !== undefined &&
      updateRequestDto.itemCondition !== request.itemCondition
    ) {
      changes.push({
        field: 'itemCondition',
        oldValue: request.itemCondition,
        newValue: updateRequestDto.itemCondition,
      });
    }

    if (updateRequestDto.category !== undefined) {
      let currentCategoryId: string | undefined;

      if (request.category && typeof request.category === 'object' && '_id' in request.category) {
        currentCategoryId = (request.category as any)._id.toString();
      } else if (request.category) {
        currentCategoryId = String(request.category);
      }

      if (currentCategoryId !== updateRequestDto.category) {
        const lang = (I18nContext.current()?.lang || 'uk') as keyof CategoryTranslations;
        const newCategory = await this.categoryModel
          .findById(updateRequestDto.category)
          .lean()
          .exec();

        const getCategoryName = (cat: any): string => {
          if (!cat) return 'Unknown';
          if (typeof cat === 'object' && 'translations' in cat) {
            const translations = (cat as Category).translations;
            return translations[lang]?.title || translations['uk']?.title || 'Unknown';
          }
          return 'Unknown';
        };

        changes.push({
          field: 'category',
          oldValue: {
            id: currentCategoryId,
            name: getCategoryName(request.category),
          },
          newValue: {
            id: updateRequestDto.category,
            name: getCategoryName(newCategory),
          },
        });
      }
    }

    if (updateRequestDto.images !== undefined) {
      const oldImages = request.images || [];
      const newImages = updateRequestDto.images || [];
      if (JSON.stringify(oldImages) !== JSON.stringify(newImages)) {
        changes.push({ field: 'images', oldValue: oldImages, newValue: newImages });
      }
    }

    // Track edit history
    const editEntry = {
      timestamp: new Date(),
      changes: changes.length > 0 ? changes : undefined,
    };
    request.edits.push(editEntry);

    Object.assign(request, updateRequestDto);
    await request.save();

    if (updateRequestDto.images && updateRequestDto.images.length > 0) {
      await this.uploadService.confirmUploads(updateRequestDto.images, request._id.toString());
    }

    return request as unknown as Request;
  }

  async cancel(id: string, buyerProfileId: string): Promise<Request> {
    const request = await this.findOne(id);
    const buyerIdStr =
      typeof request.buyerId === 'object' && request.buyerId && '_id' in request.buyerId
        ? (request.buyerId as { _id: Types.ObjectId })._id.toString()
        : String(request.buyerId);

    if (buyerIdStr !== buyerProfileId) {
      throw new ForbiddenException(
        this.i18n.t('common.requests.forbidden_update_request', {
          lang: I18nContext.current()?.lang,
        }),
      );
    }

    if (
      request.status === RequestStatus.CLOSED ||
      request.status === RequestStatus.COMPLETED ||
      request.status === RequestStatus.CANCELLED
    ) {
      throw new BadRequestException(
        this.i18n.t('common.requests.cannot_cancel_request', {
          lang: I18nContext.current()?.lang,
        }),
      );
    }

    request.status = RequestStatus.CANCELLED;
    await request.save();

    return request as unknown as Request;
  }

  async remove(id: string, buyerProfileId: string): Promise<{ success: boolean }> {
    const request = await this.findOne(id);
    const buyerIdStr =
      typeof request.buyerId === 'object' && request.buyerId && '_id' in request.buyerId
        ? (request.buyerId as { _id: Types.ObjectId })._id.toString()
        : String(request.buyerId);
    if (buyerIdStr !== buyerProfileId) {
      throw new ForbiddenException(
        this.i18n.t('common.requests.forbidden_delete_request', {
          lang: I18nContext.current()?.lang,
        }),
      );
    }

    await this.requestModel.deleteOne({ _id: id }).exec();
    return { success: true };
  }

  async incrementProposalsCount(requestId: string) {
    await this.requestModel.updateOne({ _id: requestId }, { $inc: { proposalsCount: 1 } }).exec();
  }

  async findAllWithProposalsByProfileId(
    dto: GetRequestsDto,
    profileId: string,
  ): Promise<PaginationResult<FormattedRequest>> {
    const page = PaginationUtil.normalizePage(dto.page);
    const pageSize = PaginationUtil.normalizePageSize(dto.pageSize);
    const skip = PaginationUtil.getSkip(page, pageSize);

    // 1. Find all proposals by the given profileId
    const proposals = await this.proposalModel
      .find({ sellerId: new Types.ObjectId(profileId) })
      .select('requestId')
      .lean()
      .exec();

    // 2. Extract unique request IDs
    const requestIds = [...new Set(proposals.map((p) => p.requestId.toString()))].map(
      (id) => new Types.ObjectId(id),
    );

    // 3. Build the query for requests
    const query: FilterQuery<RequestDocument> = {
      _id: { $in: requestIds },
    };

    if (dto.status) {
      query.status = dto.status;
    }

    if (dto.search) {
      query.$or = [
        { title: { $regex: dto.search, $options: 'i' } },
        { description: { $regex: dto.search, $options: 'i' } },
      ];
    }

    // 4. Sort and paginate
    const sortObj = SortUtil.buildSortObject(dto.sort);
    const sort = (sortObj && typeof sortObj === 'object'
      ? sortObj
      : { createdAt: -1 }) as unknown as Record<string, 1 | -1>;

    const results = (await this.requestModel
      .find(query)
      .populate([
        {
          path: 'buyerId',
          select: 'rating location memberSince completedDeals xp name lastName avatar',
        },
        { path: 'category' },
      ])
      .sort(sort)
      .skip(skip)
      .limit(pageSize)
      .lean()
      .exec()) as unknown as LeanRequest[];

    const count = await this.requestModel.countDocuments(query).exec();

    const formattedResults = results.map((request) => this.formatLeanRequest(request));

    return PaginationUtil.createPaginationResult(
      formattedResults,
      count,
      page,
      pageSize,
      `/api/requests/proposals/${profileId}`,
      dto,
    );
  }
}
