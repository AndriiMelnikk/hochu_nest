import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Report, ReportDocument, ReportStatus } from '../../database/schemas/report.schema';
import { CreateReportDto } from './dto/create-report.dto';
import { PaginationUtil } from '../../common/utils/pagination.util';

@Injectable()
export class ReportsService {
  constructor(@InjectModel(Report.name) private reportModel: Model<ReportDocument>) {}

  async create(createReportDto: CreateReportDto, reporterId: string) {
    const report = new this.reportModel({
      reporterId: new Types.ObjectId(reporterId),
      targetType: createReportDto.targetType,
      targetId: new Types.ObjectId(createReportDto.targetId),
      reason: createReportDto.reason,
      details: createReportDto.details || null,
      status: ReportStatus.PENDING,
    });

    await report.save();
    return report;
  }

  async findAll(status?: ReportStatus, page?: number, pageSize?: number) {
    const normalizedPage = PaginationUtil.normalizePage(page);
    const normalizedPageSize = PaginationUtil.normalizePageSize(pageSize);
    const skip = PaginationUtil.getSkip(normalizedPage, normalizedPageSize);

    const query: Record<string, any> = {};
    if (status) {
      query.status = status;
    }

    // Manually await both promises to help TypeScript's type resolution
    const resultsPromise = this.reportModel
      .find(query)
      .populate('reporterId', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(normalizedPageSize)
      .exec();
    const countPromise = this.reportModel.countDocuments(query).exec();

    const results = await resultsPromise;
    const count = await countPromise;

    return PaginationUtil.createPaginationResult(
      results,
      count,
      normalizedPage,
      normalizedPageSize,
      '/api/admin/reports',
      { status },
    );
  }

  async updateStatus(id: string, status: ReportStatus) {
    await this.reportModel.updateOne({ _id: id }, { status }).exec();
    return { success: true };
  }
}
