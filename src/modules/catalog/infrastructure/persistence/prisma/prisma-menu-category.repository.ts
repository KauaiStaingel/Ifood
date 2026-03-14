import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../../shared/infrastructure/prisma/prisma.service';
import { MenuCategory } from '../../../domain/entities/menu-category.entity';
import { MenuCategoryRepository } from '../../../domain/repositories/menu-category.repository';

@Injectable()
export class PrismaMenuCategoryRepository implements MenuCategoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(category: MenuCategory): Promise<MenuCategory> {
    const created = await this.prisma.menuCategory.create({
      data: {
        id: category.id,
        restaurantId: category.restaurantId,
        name: category.name,
        displayOrder: category.displayOrder,
        createdAt: category.createdAt,
        updatedAt: category.updatedAt,
      },
    });

    return new MenuCategory(
      created.id,
      created.restaurantId,
      created.name,
      created.displayOrder,
      created.createdAt,
      created.updatedAt,
    );
  }

  async findManyByRestaurantId(restaurantId: string): Promise<MenuCategory[]> {
    const categories = await this.prisma.menuCategory.findMany({
      where: { restaurantId },
      orderBy: [{ displayOrder: 'asc' }, { createdAt: 'asc' }],
    });

    return categories.map(
      (category) =>
        new MenuCategory(
          category.id,
          category.restaurantId,
          category.name,
          category.displayOrder,
          category.createdAt,
          category.updatedAt,
        ),
    );
  }

  async findById(id: string): Promise<MenuCategory | null> {
    const category = await this.prisma.menuCategory.findUnique({
      where: { id },
    });

    if (!category) return null;

    return new MenuCategory(
      category.id,
      category.restaurantId,
      category.name,
      category.displayOrder,
      category.createdAt,
      category.updatedAt,
    );
  }
}