import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Category, CategoryDocument } from '../../database/schemas/category.schema';
import { GetCategoriesDto } from './dto/get-categories.dto';

type CategoryLean = Category & {
  _id: Types.ObjectId;
  parentId?: Types.ObjectId | null;
};

type CategoryTreeNode = CategoryLean & {
  children: CategoryTreeNode[];
};

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Category.name) private categoryModel: Model<CategoryDocument>) {}

  async findAll(query: GetCategoriesDto) {
    const filter: Record<string, unknown> = {};

    if (!query.includeInactive) {
      filter.isActive = true;
    }

    const categories = await this.categoryModel
      .find(filter)
      .sort({ order: 1, name: 1 })
      .lean<CategoryLean[]>()
      .exec();

    if (query.flat) {
      return categories;
    }

    return this.buildTree(categories);
  }

  private buildTree(categories: CategoryLean[]) {
    const nodes: CategoryTreeNode[] = categories.map((category) => ({
      ...category,
      children: [],
    }));

    const nodesById = new Map<string, CategoryTreeNode>();
    nodes.forEach((node) => nodesById.set(node._id.toString(), node));

    const roots: CategoryTreeNode[] = [];

    nodes.forEach((node) => {
      if (node.parentId) {
        const parent = nodesById.get(node.parentId.toString());
        if (parent) {
          parent.children.push(node);
          return;
        }
      }
      roots.push(node);
    });

    return roots;
  }
}
