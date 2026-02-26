import { Injectable, InternalServerErrorException, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ListObjectsV2Command, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

@Injectable()
export class R2StorageService implements OnModuleInit {
  private readonly logger = new Logger(R2StorageService.name);
  private readonly client: S3Client;
  private readonly accessKeyId: string;
  private readonly secretAccessKey: string;
  private readonly endpoint: string;
  private readonly bucket: string;
  private readonly publicBaseUrl: string;
  private readonly keyPrefix: string;
  private readonly storageProvider: string;

  constructor(private configService: ConfigService) {
    this.storageProvider = this.configService.get<string>('upload.storageProvider') || 'local';
    this.accessKeyId = this.configService.get<string>('upload.r2.accessKeyId') || '';
    this.secretAccessKey = this.configService.get<string>('upload.r2.secretAccessKey') || '';
    this.bucket = this.configService.get<string>('upload.r2.bucket') || '';
    this.publicBaseUrl = this.configService.get<string>('upload.r2.publicBaseUrl') || '';

    const accountId = this.configService.get<string>('upload.r2.accountId') || '';
    const configuredEndpoint = this.configService.get<string>('upload.r2.endpoint') || '';
    this.endpoint =
      configuredEndpoint || (accountId ? `https://${accountId}.r2.cloudflarestorage.com` : '');

    const region = this.configService.get<string>('upload.r2.region') || 'auto';
    const rawPrefix = this.configService.get<string>('upload.r2.prefix') || '';
    this.keyPrefix = rawPrefix ? `${rawPrefix.replace(/^\/+|\/+$/g, '')}/` : '';

    console.log('this.endpoint', this.endpoint);
    console.log('this.accessKeyId', this.accessKeyId);
    console.log('this.secretAccessKey', this.secretAccessKey);
    console.log('this.bucket', this.bucket);
    console.log('this.publicBaseUrl', this.publicBaseUrl);
    console.log('this.keyPrefix', this.keyPrefix);
    console.log('this.storageProvider', this.storageProvider);

    this.client = new S3Client({
      region,
      endpoint: this.endpoint || undefined,
      forcePathStyle: true,
      credentials: {
        accessKeyId: this.accessKeyId,
        secretAccessKey: this.secretAccessKey,
      },
    });
  }

  async onModuleInit() {
    if (this.storageProvider !== 'r2') {
      return;
    }

    try {
      await this.checkConnection();
      this.logger.log('Cloudflare R2 connection established');
    } catch (error) {
      this.logger.error('Cloudflare R2 connection failed', error);
      throw new InternalServerErrorException(`Cloudflare R2 connection failed: ${error.message}`);
    }
  }

  async checkConnection(): Promise<void> {
    if (!this.accessKeyId || !this.secretAccessKey || !this.endpoint || !this.bucket) {
      throw new InternalServerErrorException('Cloudflare R2 is not configured');
    }

    // await this.client.send(new HeadBucketCommand({ Bucket: this.bucket }));
    await this.client.send(
      new ListObjectsV2Command({
        Bucket: this.bucket,
        MaxKeys: 1,
      }),
    );
  }

  async upload(file: Express.Multer.File, filename: string): Promise<{ url: string }> {
    if (!this.accessKeyId || !this.secretAccessKey || !this.endpoint || !this.bucket) {
      throw new InternalServerErrorException('Cloudflare R2 is not configured');
    }

    const key = `${this.keyPrefix}${filename}`;
    try {
      await this.client.send(
        new PutObjectCommand({
          Bucket: this.bucket,
          Key: key,
          Body: file.buffer,
          ContentType: file.mimetype,
          ContentLength: file.size,
        }),
      );
    } catch (_error) {
      throw new InternalServerErrorException('Failed to upload file to Cloudflare R2');
    }

    const baseUrl = this.publicBaseUrl || `${this.endpoint}/${this.bucket}`;
    return { url: `${baseUrl.replace(/\/$/, '')}/${key}` };
  }
}
