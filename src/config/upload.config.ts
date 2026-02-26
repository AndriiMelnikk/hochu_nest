import { registerAs } from '@nestjs/config';

export default registerAs('upload', () => ({
  dest: process.env.UPLOAD_DEST || './uploads',
  maxFileSize: parseInt(process.env.MAX_FILE_SIZE || '10485760', 10), // 10MB
  allowedFileTypes: (process.env.ALLOWED_FILE_TYPES || 'jpg,jpeg,png,webp').split(','),
  storageProvider: process.env.STORAGE_PROVIDER || 'r2',
  r2: {
    accountId: process.env.R2_ACCOUNT_ID || '',
    accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
    bucket: process.env.R2_BUCKET || '',
    endpoint: process.env.R2_ENDPOINT || '',
    publicBaseUrl: process.env.R2_PUBLIC_BASE_URL || '',
    prefix: process.env.R2_PREFIX || '',
    region: process.env.R2_REGION || 'auto',
  },
}));
