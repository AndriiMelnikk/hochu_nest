import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type AccountDocument = HydratedDocument<Account>;

@Schema({ timestamps: true })
export class Account {
  _id: Types.ObjectId;

  @Prop({ required: true, lowercase: true, trim: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: Boolean, default: false })
  isAdmin: boolean;

  createdAt: Date;
  updatedAt: Date;
}

export const AccountSchema = SchemaFactory.createForClass(Account);

AccountSchema.index({ email: 1 }, { unique: true });
