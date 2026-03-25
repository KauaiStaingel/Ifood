import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../../shared/infrastructure/prisma/prisma.service';
import { RestaurantCategory } from '../../../domain/entities/restaurant-category.entity';
import { RestaurantCategoryRepository } from '../../../domain/repositories/restaurant-category.repository';

@Injectable()
export class PrismaRestaurantCategoryRepository
  implements RestaurantCategoryRepository
{
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<RestaurantCategory | null> {
    const category = await this.prisma.restaurantCategory.findUnique({
      where: { id },
    });

    if (!category) return null;

    return new RestaurantCategory(
      category.id,
      category.name,
      category.slug,
      category.createdAt,
      category.updatedAt,
    );
  }

  async findBySlug(slug: string): Promise<RestaurantCategory | null> {
    const category = await this.prisma.restaurantCategory.findUnique({
      where: { slug },
    });

    if (!category) return null;

    return new RestaurantCategory(
      category.id,
      category.name,
      category.slug,
      category.createdAt,
      category.updatedAt,
    );
  }

  async findMany(): Promise<RestaurantCategory[]> {
    const categories = await this.prisma.restaurantCategory.findMany({
      orderBy: { name: 'asc' },
    });

    return categories.map(
      (category) =>
        new RestaurantCategory(
          category.id,
          category.name,
          category.slug,
          category.createdAt,
          category.updatedAt,
        ),
    );
  }

  async create(category: RestaurantCategory): Promise<RestaurantCategory> {
    const created = await this.prisma.restaurantCategory.create({
      data: {
        id: category.id,
        name: category.name,
        slug: category.slug,
        createdAt: category.createdAt,
        updatedAt: category.updatedAt,
      },
    });

    return new RestaurantCategory(
      created.id,
      created.name,
      created.slug,
      created.createdAt,
      created.updatedAt,
    );
  }
}