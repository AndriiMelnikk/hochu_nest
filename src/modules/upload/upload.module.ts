import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { R2StorageService } from './storage/r2-storage.service';
import { Upload, UploadSchema } from '../../database/schemas/upload.schema';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Upload.name, schema: UploadSchema }]), UsersModule],
  controllers: [UploadController],
  providers: [UploadService, R2StorageService],
  exports: [UploadService],
})
export class UploadModule {}
