import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../../shared/infrastructure/prisma/prisma.service';
import { Restaurant } from '../../../domain/entities/restaurant.entity';
import { RestaurantRepository } from '../../../domain/repositories/restaurant.repository';

@Injectable()
export class PrismaRestaurantRepository implements RestaurantRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(restaurant: Restaurant): Promise<Restaurant> {
    const created = await this.prisma.restaurant.create({
      data: {
        id: restaurant.id,
        name: restaurant.name,
        slug: restaurant.slug,
        description: restaurant.description,
        isActive: restaurant.isActive,
        ownerId: restaurant.ownerId,
        createdAt: restaurant.createdAt,
        updatedAt: restaurant.updatedAt,
      },
    });

    return new Restaurant(
      created.id,
      created.name,
      created.slug,
      created.description,
      created.isActive,
      created.ownerId,
      created.createdAt,
      created.updatedAt,
    );
  }

  async findBySlug(slug: string): Promise<Restaurant | null> {
    const restaurant = await this.prisma.restaurant.findUnique({
      where: { slug },
    });

    if (!restaurant) return null;

    return new Restaurant(
      restaurant.id,
      restaurant.name,
      restaurant.slug,
      restaurant.description,
      restaurant.isActive,
      restaurant.ownerId,
      restaurant.createdAt,
      restaurant.updatedAt,
    );
  }

  async findMany(): Promise<Restaurant[]> {
    const restaurants = await this.prisma.restaurant.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return restaurants.map(
      (restaurant) =>
        new Restaurant(
          restaurant.id,
          restaurant.name,
          restaurant.slug,
          restaurant.description,
          restaurant.isActive,
          restaurant.ownerId,
          restaurant.createdAt,
          restaurant.updatedAt,
        ),
    );
  }
}