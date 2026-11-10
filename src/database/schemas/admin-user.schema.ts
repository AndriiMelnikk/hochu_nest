import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ADMIN_ROLES, type AdminRole } from '../../modules/admin/admin-permissions';

export type AdminUserDocument = AdminUser & Document;

/** Співробітник адмін-панелі. Окремо від акаунтів користувачів сайту. */
@Schema({ timestamps: true, collection: 'admin_users' })
export class AdminUser {
  _id: Types.ObjectId;

  @Prop({ required: true, unique: true, trim: true, lowercase: true })
  login: string;

  @Prop({ type: String, trim: true, default: '' })
  name: string;

  @Prop({ required: true, select: false })
  passwordHash: string;

  @Prop({ type: String, enum: ADMIN_ROLES, required: true })
  role: AdminRole;

  @Prop({ type: Boolean, default: true })
  isActive: boolean;

  /** Лічильник невдалих входів і блокування зберігаються в базі, бо serverless-інстанси не ділять пам'ять. */
  @Prop({ type: Number, default: 0 })
  failedAttempts: number;

  @Prop({ type: Date, default: null })
  lockedUntil: Date | null;

  @Prop({ type: Date, default: null })
  lastLoginAt: Date | null;

  @Prop({ type: String, default: null })
  createdBy: string | null;

  createdAt: Date;
  updatedAt: Date;
}

export const AdminUserSchema = SchemaFactory.createForClass(AdminUser);
