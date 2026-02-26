import {
  Injectable,
  BadRequestException,
  UnsupportedMediaTypeException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as path from 'path';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import { R2StorageService } from './storage/r2-storage.service';
import { UploadType } from './dto/upload.dto';
import { Upload, UploadDocument, UploadStatus } from '../../database/schemas/upload.schema';

@Injectable()
export class UploadService {
  private readonly logger = new Logger(UploadService.name);
  private readonly maxFileSize: number;
  private readonly allowedTypes: string[];

  constructor(
    private configService: ConfigService,
    private r2StorageService: R2StorageService,
    @InjectModel(Upload.name) private uploadModel: Model<UploadDocument>,
  ) {
    this.maxFileSize = this.configService.get<number>('upload.maxFileSize') || 10485760;
    this.allowedTypes = this.configService.get<string[]>('upload.allowedFileTypes') || [
      'jpg',
      'jpeg',
      'png',
      'webp',
    ];
  }

  async uploadFile(
    file: Express.Multer.File,
    userId: string,
    type: UploadType,
  ): Promise<{ url: string; id: string }> {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    // Validate file size
    if (file.size > this.maxFileSize) {
      throw new BadRequestException(
        `File size exceeds maximum allowed size of ${this.maxFileSize / 1024 / 1024}MB`,
      );
    }

    // Validate file type
    const fileExtension = path.extname(file.originalname).toLowerCase().slice(1);
    if (!this.allowedTypes.includes(fileExtension)) {
      throw new UnsupportedMediaTypeException(
        `File type ${fileExtension} is not allowed. Allowed types: ${this.allowedTypes.join(', ')}`,
      );
    }

    // Generate unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const filename = `${uniqueSuffix}.${fileExtension}`;

    // Determine folder structure based on type and userId
    const folder = `${type}s/${userId}`;

    const { url, key } = await this.r2StorageService.upload(file, filename, folder);

    // Save to database
    const upload = new this.uploadModel({
      url,
      key,
      userId: new Types.ObjectId(userId),
      type,
      mimeType: file.mimetype,
      size: file.size,
      status: UploadStatus.PENDING,
    });
    await upload.save();

    return { url, id: upload._id.toString() };
  }

  async confirmUploads(urls: string[], linkedEntityId: string): Promise<void> {
    if (!urls || urls.length === 0) return;

    await this.uploadModel.updateMany(
      { url: { $in: urls } },
      {
        $set: {
          status: UploadStatus.CONFIRMED,
          linkedEntityId: new Types.ObjectId(linkedEntityId),
        },
      },
    );
  }

  async deleteFile(url: string, userId: string): Promise<void> {
    const upload = await this.uploadModel.findOne({ url, userId: new Types.ObjectId(userId) });
    if (!upload) {
      throw new NotFoundException('File not found or access denied');
    }

    await this.r2StorageService.delete(upload.key);
    await this.uploadModel.deleteOne({ _id: upload._id });
  }

  async deleteByUrl(url: string): Promise<void> {
    const upload = await this.uploadModel.findOne({ url });
    if (upload) {
      await this.r2StorageService.delete(upload.key);
      await this.uploadModel.deleteOne({ _id: upload._id });
    }
  }

  // Cron job to cleanup pending uploads older than 24 hours
  @Cron(CronExpression.EVERY_HOUR)
  async cleanupPendingUploads() {
    this.logger.log('Starting cleanup of pending uploads...');
    const expirationTime = new Date(Date.now() - 24 * 60 * 60 * 1000); // 24 hours ago

    const pendingUploads = await this.uploadModel.find({
      status: UploadStatus.PENDING,
      createdAt: { $lt: expirationTime },
    });

    if (pendingUploads.length === 0) {
      this.logger.log('No pending uploads to cleanup.');
      return;
    }

    this.logger.log(`Found ${pendingUploads.length} pending uploads to cleanup.`);

    for (const upload of pendingUploads) {
      try {
        await this.r2StorageService.delete(upload.key);
        await this.uploadModel.deleteOne({ _id: upload._id });
        this.logger.log(`Deleted pending upload: ${upload._id.toString()}`);
      } catch (error) {
        this.logger.error(`Failed to delete pending upload ${upload._id.toString()}`, error);
      }
    }

    this.logger.log('Cleanup of pending uploads completed.');
  }
}
