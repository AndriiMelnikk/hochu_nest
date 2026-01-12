import { registerAs } from '@nestjs/config';

export default registerAs('upload', () => ({
  dest: process.env.UPLOAD_DEST || './uploads',
  maxFileSize: parseInt(process.env.MAX_FILE_SIZE || '10485760', 10), // 10MB
  allowedFileTypes: (process.env.ALLOWED_FILE_TYPES || 'jpg,jpeg,png,webp').split(','),
  storageProvider: process.env.STORAGE_PROVIDER || 'local',
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || '',
    apiKey: process.env.CLOUDINARY_API_KEY || '',
    apiSecret: process.env.CLOUDINARY_API_SECRET || '',
  },
  s3: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
    region: process.env.AWS_REGION || '',
    bucket: process.env.AWS_S3_BUCKET || '',
  },
}));
