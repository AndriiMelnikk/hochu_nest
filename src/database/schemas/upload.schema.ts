import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { UploadType } from '../../modules/upload/dto/upload.dto';

export type UploadDocument = Upload & Document;

export enum UploadStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
}

@Schema({ timestamps: true })
export class Upload {
  @Prop({ required: true, unique: true })
  url: string;

  @Prop({ required: true })
  key: string;

  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;

  @Prop({ required: true, enum: UploadType })
  type: UploadType;

  @Prop({ required: true })
  mimeType: string;

  @Prop({ required: true })
  size: number;

  @Prop({
    required: true,
    enum: UploadStatus,
    default: UploadStatus.PENDING,
  })
  status: UploadStatus;

  @Prop({ type: Types.ObjectId, required: false })
  linkedEntityId?: Types.ObjectId;
}

export const UploadSchema = SchemaFactory.createForClass(Upload);

// Index for finding pending files that are old (e.g. created > 24h ago)
UploadSchema.index({ status: 1, createdAt: 1 });
