import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { R2StorageService } from './storage/r2-storage.service';

@Module({
  controllers: [UploadController],
  providers: [UploadService, R2StorageService],
  exports: [UploadService],
})
export class UploadModule {}
