import { Injectable, BadRequestException, UnsupportedMediaTypeException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as path from 'path';
import { R2StorageService } from './storage/r2-storage.service';

@Injectable()
export class UploadService {
  private readonly maxFileSize: number;
  private readonly allowedTypes: string[];

  constructor(
    private configService: ConfigService,
    private r2StorageService: R2StorageService,
  ) {
    this.maxFileSize = this.configService.get<number>('upload.maxFileSize') || 10485760;
    this.allowedTypes = this.configService.get<string[]>('upload.allowedFileTypes') || [
      'jpg',
      'jpeg',
      'png',
      'webp',
    ];
  }

  async uploadFile(file: Express.Multer.File): Promise<{ url: string }> {
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
    return this.r2StorageService.upload(file, filename);
  }

  // async checkR2Health(): Promise<{ status: 'ok' }> {
  //   if (this.storageProvider !== 'r2') {
  //     throw new InternalServerErrorException('Cloudflare R2 is not configured');
  //   }

  //   await this.r2StorageService.checkConnection();
  //   return { status: 'ok' };
  // }
}
