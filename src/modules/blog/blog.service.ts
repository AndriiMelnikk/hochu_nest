import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  BlogPost,
  BlogPostDocument,
} from '../../database/schemas/blog-post.schema';
import { CreateBlogPostDto } from './dto/create-blog-post.dto';
import { PaginationUtil } from '../../common/utils/pagination.util';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(BlogPost.name) private blogPostModel: Model<BlogPostDocument>,
  ) {}

  async create(createBlogPostDto: CreateBlogPostDto) {
    const readTime = this.calculateReadTime(createBlogPostDto.content);
    
    const blogPost = new this.blogPostModel({
      ...createBlogPostDto,
      readTime,
      published: createBlogPostDto.published || false,
    });

    await blogPost.save();
    return blogPost;
  }

  async findAll(category?: string, page?: number, pageSize?: number) {
    const normalizedPage = PaginationUtil.normalizePage(page);
    const normalizedPageSize = PaginationUtil.normalizePageSize(pageSize);
    const skip = PaginationUtil.getSkip(normalizedPage, normalizedPageSize);

    const query: any = { published: true };
    if (category) {
      query.category = category;
    }

    const [results, count] = await Promise.all([
      this.blogPostModel
        .find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(normalizedPageSize)
        .exec(),
      this.blogPostModel.countDocuments(query).exec(),
    ]);

    return PaginationUtil.createPaginationResult(
      results,
      count,
      normalizedPage,
      normalizedPageSize,
      '/api/blog/posts',
      { category },
    );
  }

  async findOne(id: string) {
    const blogPost = await this.blogPostModel.findById(id).exec();
    if (!blogPost) {
      throw new NotFoundException(`Blog post with ID ${id} not found`);
    }
    return blogPost;
  }

  async update(id: string, updateDto: Partial<CreateBlogPostDto>) {
    const blogPost = await this.findOne(id);
    
    if (updateDto.content) {
      const readTime = this.calculateReadTime(updateDto.content);
      Object.assign(blogPost, { ...updateDto, readTime });
    } else {
      Object.assign(blogPost, updateDto);
    }

    await blogPost.save();
    return blogPost;
  }

  async remove(id: string) {
    await this.blogPostModel.deleteOne({ _id: id }).exec();
    return { success: true };
  }

  private calculateReadTime(content: string): number {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  }
}

