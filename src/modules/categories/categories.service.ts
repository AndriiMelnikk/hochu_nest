import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { I18nContext } from 'nestjs-i18n';
import { Category, CategoryDocument } from '../../database/schemas/category.schema';
import { GetCategoriesDto } from './dto/get-categories.dto';

type CategoryLean = Category & {
  _id: Types.ObjectId;
  parentId?: Types.ObjectId | null;
};

type LocalizedCategory = Omit<CategoryLean, 'translations'> & {
  title: string;
  description: string;
};

type CategoryTreeNode = LocalizedCategory & {
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
      .sort({ order: 1, 'translations.uk.title': 1 })
      .lean<CategoryLean[]>()
      .exec();

    const lang = I18nContext.current()?.lang || 'uk';

    const localizedCategories: LocalizedCategory[] = categories.map((cat) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { translations, ...rest } = cat;
      const catsTranslations = cat.translations as unknown as Record<
        string,
        { title: string; description: string }
      >;
      const translation = catsTranslations[lang] || catsTranslations['uk'];

      return {
        ...rest,
        title: translation?.title || '',
        description: translation?.description || '',
      };
    });

    if (query.flat) {
      return localizedCategories;
    }

    return this.buildTree(localizedCategories);
  }

  private buildTree(categories: LocalizedCategory[]) {
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
