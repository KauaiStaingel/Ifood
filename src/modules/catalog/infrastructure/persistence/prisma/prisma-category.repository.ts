import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../../shared/infrastructure/prisma/prisma.service';
import { Category } from '../../../domain/entities/category.entity';
import { CategoryRepository } from '../../../domain/repositories/category.repository';

@Injectable()
export class PrismaCategoryRepository implements CategoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(category: Category): Promise<Category> {
    const created = await this.prisma.category.create({
      data: {
        id: category.id,
        restaurantId: category.restaurantId,
        name: category.name,
        displayOrder: category.displayOrder,
        createdAt: category.createdAt,
        updatedAt: category.updatedAt,
      },
    });

    return new Category(
      created.id,
      created.restaurantId,
      created.name,
      created.displayOrder,
      created.createdAt,
      created.updatedAt,
    );
  }

  async findManyByRestaurantId(restaurantId: string): Promise<Category[]> {
    const categories = await this.prisma.category.findMany({
      where: { restaurantId },
      orderBy: [{ displayOrder: 'asc' }, { createdAt: 'asc' }],
    });

    return categories.map(
      (category) =>
        new Category(
          category.id,
          category.restaurantId,
          category.name,
          category.displayOrder,
          category.createdAt,
          category.updatedAt,
        ),
    );
  }

  async findById(id: string): Promise<Category | null> {
  const category = await this.prisma.category.findUnique({
    where: { id },
  });

  if (!category) return null;

  return new Category(
    category.id,
    category.restaurantId,
    category.name,
    category.displayOrder,
    category.createdAt,
    category.updatedAt,
  );
}
}