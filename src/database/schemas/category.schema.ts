import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema({ _id: false })
export class CategoryLanguage {
  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ required: true, trim: true })
  description: string;
}
export const CategoryLanguageSchema = SchemaFactory.createForClass(CategoryLanguage);

@Schema({ _id: false })
export class CategoryTranslations {
  @Prop({ type: CategoryLanguageSchema, required: true })
  uk: CategoryLanguage;

  @Prop({ type: CategoryLanguageSchema, required: true })
  en: CategoryLanguage;
}
export const CategoryTranslationsSchema = SchemaFactory.createForClass(CategoryTranslations);

@Schema({ timestamps: true })
export class Category {
  _id: Types.ObjectId;

  @Prop({ type: CategoryTranslationsSchema, required: true })
  translations: CategoryTranslations;

  @Prop({ required: true, trim: true, lowercase: true })
  slug: string;

  @Prop({ type: Types.ObjectId, ref: 'Category', default: null })
  parentId?: Types.ObjectId | null;

  @Prop({ type: [Types.ObjectId], ref: 'Category', default: [] })
  path: Types.ObjectId[];

  @Prop({ type: Number, default: 0, min: 0 })
  level: number;

  @Prop({ type: String, default: null })
  icon: string | null;

  @Prop({ type: Number, default: 0 })
  order: number;

  @Prop({ type: Boolean, default: true })
  isActive: boolean;

  createdAt: Date;
  updatedAt: Date;
}

export const CategorySchema = SchemaFactory.createForClass(Category);

// Indexes
CategorySchema.index({ slug: 1 }, { unique: true });
CategorySchema.index({ parentId: 1, order: 1 });
CategorySchema.index({ path: 1 });
CategorySchema.index({ level: 1 });
CategorySchema.index({ isActive: 1 });
CategorySchema.index({
  'translations.uk.title': 'text',
  'translations.en.title': 'text',
  'translations.uk.description': 'text',
  'translations.en.description': 'text',
  slug: 'text',
});
