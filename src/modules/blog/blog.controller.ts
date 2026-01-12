import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { BlogService } from './blog.service';
import { CreateBlogPostDto } from './dto/create-blog-post.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { ParseObjectIdPipe } from '../../common/pipes/parse-objectid.pipe';

@ApiTags('Blog')
@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get('posts')
  @ApiOperation({ summary: 'Get all published blog posts' })
  @ApiResponse({ status: 200, description: 'List of blog posts' })
  async findAll(
    @Query('category') category?: string,
    @Query('page') page?: number,
    @Query('pageSize') pageSize?: number,
  ) {
    return this.blogService.findAll(category, page, pageSize);
  }

  @Get('posts/:id')
  @ApiOperation({ summary: 'Get blog post by ID' })
  @ApiResponse({ status: 200, description: 'Blog post found' })
  @ApiResponse({ status: 404, description: 'Blog post not found' })
  async findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.blogService.findOne(id);
  }

  @Post('posts')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create blog post (admin only)' })
  @ApiResponse({ status: 201, description: 'Blog post created' })
  async create(@Body() createBlogPostDto: CreateBlogPostDto) {
    return this.blogService.create(createBlogPostDto);
  }

  @Patch('posts/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update blog post (admin only)' })
  @ApiResponse({ status: 200, description: 'Blog post updated' })
  async update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() updateDto: Partial<CreateBlogPostDto>,
  ) {
    return this.blogService.update(id, updateDto);
  }

  @Delete('posts/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete blog post (admin only)' })
  @ApiResponse({ status: 200, description: 'Blog post deleted' })
  async remove(@Param('id', ParseObjectIdPipe) id: string) {
    return this.blogService.remove(id);
  }
}
