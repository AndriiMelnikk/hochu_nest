import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type BlogPostDocument = BlogPost & Document;

@Schema({ timestamps: true })
export class BlogPost {
  _id: Types.ObjectId;

  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, type: String })
  content: string;

  @Prop({ default: null })
  category: string;

  @Prop({ required: true })
  author: string;

  @Prop({ default: null })
  image: string;

  @Prop({ type: Number, default: null })
  readTime: number;

  @Prop({ type: Boolean, default: false })
  published: boolean;

  createdAt: Date;
  updatedAt: Date;
}

export const BlogPostSchema = SchemaFactory.createForClass(BlogPost);

// Indexes
BlogPostSchema.index({ category: 1 });
BlogPostSchema.index({ published: 1 });
BlogPostSchema.index({ createdAt: -1 });
