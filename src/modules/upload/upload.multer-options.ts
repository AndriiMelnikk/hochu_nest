import { BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

const MIME_TO_EXT: Record<string, string> = {
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/heic': 'heic',
  'image/heif': 'heif',
};

export function resolveFileExtension(originalname: string, mimetype: string): string | null {
  const fromName = originalname.includes('.') ? originalname.split('.').pop()?.toLowerCase() : null;

  if (fromName) {
    return fromName;
  }

  return MIME_TO_EXT[mimetype] ?? null;
}

export function createUploadMulterOptions(configService: ConfigService): MulterOptions {
  const maxFileSize = configService.get<number>('upload.maxFileSize') || 10485760;
  const allowedTypes = configService.get<string[]>('upload.allowedFileTypes') || [
    'jpg',
    'jpeg',
    'png',
    'webp',
    'heic',
    'heif',
  ];

  return {
    limits: { fileSize: maxFileSize },
    fileFilter: (_req, file, callback) => {
      const extension = resolveFileExtension(file.originalname, file.mimetype);

      if (!extension) {
        return callback(
          new BadRequestException(
            `Could not determine file type (name: "${file.originalname}", mime: "${file.mimetype}")`,
          ),
          false,
        );
      }

      if (!allowedTypes.includes(extension)) {
        return callback(
          new BadRequestException(
            `File type "${extension}" is not allowed. Allowed types: ${allowedTypes.join(', ')}`,
          ),
          false,
        );
      }

      callback(null, true);
    },
  };
}
