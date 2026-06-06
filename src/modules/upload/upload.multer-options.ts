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

const GENERIC_MIME_TYPES = new Set(['application/octet-stream', 'binary/octet-stream']);

export function detectImageExtensionFromBuffer(buffer: Buffer | undefined): string | null {
  if (!buffer || buffer.length < 12) {
    return null;
  }

  if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47) {
    return 'png';
  }

  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return 'jpeg';
  }

  if (buffer.toString('ascii', 0, 4) === 'RIFF' && buffer.toString('ascii', 8, 12) === 'WEBP') {
    return 'webp';
  }

  if (buffer.toString('ascii', 4, 8) === 'ftyp') {
    const brand = buffer.toString('ascii', 8, 12).toLowerCase();
    if (['heic', 'heix', 'hevc', 'hevx'].some((value) => brand.startsWith(value))) {
      return 'heic';
    }
    if (['mif1', 'msf1', 'heif'].some((value) => brand.startsWith(value))) {
      return 'heif';
    }
  }

  return null;
}

export function resolveFileExtension(
  originalname: string,
  mimetype: string,
  buffer?: Buffer,
): string | null {
  const fromName = originalname.includes('.') ? originalname.split('.').pop()?.toLowerCase() : null;

  if (fromName) {
    return fromName;
  }

  if (!GENERIC_MIME_TYPES.has(mimetype)) {
    const fromMime = MIME_TO_EXT[mimetype];
    if (fromMime) {
      return fromMime;
    }
  }

  return detectImageExtensionFromBuffer(buffer);
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
      // Type validation with magic bytes happens in UploadService after the buffer is available.
      // iOS often sends files like "IMG_5020" without extension and with application/octet-stream.
      if (file.mimetype === 'application/octet-stream') {
        return callback(null, true);
      }

      const extension = resolveFileExtension(file.originalname, file.mimetype);

      if (!extension) {
        return callback(null, true);
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
