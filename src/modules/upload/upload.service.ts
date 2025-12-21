import {
  Injectable,
  BadRequestException,
  UnsupportedMediaTypeException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { promises as fs } from 'fs';
import * as path from 'path';

@Injectable()
export class UploadService {
  private readonly uploadPath: string;
  private readonly maxFileSize: number;
  private readonly allowedTypes: string[];

  constructor(private configService: ConfigService) {
    this.uploadPath = this.configService.get<string>('upload.dest') || './uploads';
    this.maxFileSize =
      this.configService.get<number>('upload.maxFileSize') || 10485760;
    this.allowedTypes =
      this.configService.get<string[]>('upload.allowedFileTypes') || [
        'jpg',
        'jpeg',
        'png',
        'webp',
      ];

    // Create upload directory if it doesn't exist
    this.ensureUploadDirectory();
  }

  private async ensureUploadDirectory() {
    try {
      await fs.access(this.uploadPath);
    } catch {
      await fs.mkdir(this.uploadPath, { recursive: true });
    }
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
    const filepath = path.join(this.uploadPath, filename);

    // Save file
    await fs.writeFile(filepath, file.buffer);

    // Return URL (in production, this would be a CDN URL)
    const url = `/uploads/${filename}`;
    return { url };
  }
}
