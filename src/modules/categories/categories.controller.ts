import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { GetCategoriesDto } from './dto/get-categories.dto';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @ApiOperation({ summary: 'Get categories' })
  @ApiResponse({ status: 200, description: 'List of categories' })
  async findAll(@Query() query: GetCategoriesDto) {
    return this.categoriesService.findAll(query);
  }
}
