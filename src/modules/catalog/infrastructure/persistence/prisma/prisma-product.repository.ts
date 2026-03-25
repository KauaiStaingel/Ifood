import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../../shared/infrastructure/prisma/prisma.service';
import { Product } from '../../../domain/entities/product.entity';
import { ProductRepository } from '../../../domain/repositories/product.repository';

@Injectable()
export class PrismaProductRepository implements ProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(product: Product): Promise<Product> {
    const created = await this.prisma.product.create({
      data: {
        id: product.id,
        restaurantId: product.restaurantId,
        menuCategoryId: product.menuCategoryId,
        name: product.name,
        description: product.description,
        price: product.price,
        isAvailable: product.isAvailable,
        imageUrl: product.imageUrl,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      },
    });

    return new Product(
      created.id,
      created.restaurantId,
      created.menuCategoryId,
      created.name,
      created.description,
      Number(created.price),
      created.isAvailable,
      created.imageUrl,
      created.createdAt,
      created.updatedAt,
    );
  }

  async findManyByRestaurantId(restaurantId: string): Promise<Product[]> {
    const products = await this.prisma.product.findMany({
      where: { restaurantId },
      orderBy: { createdAt: 'asc' },
    });

    return products.map(
      (product) =>
        new Product(
          product.id,
          product.restaurantId,
          product.menuCategoryId,
          product.name,
          product.description,
          Number(product.price),
          product.isAvailable,
          product.imageUrl,
          product.createdAt,
          product.updatedAt,
        ),
    );
  }

  async findManyByMenuCategoryId(menuCategoryId: string): Promise<Product[]> {
    const products = await this.prisma.product.findMany({
      where: { menuCategoryId },
      orderBy: { createdAt: 'asc' },
    });

    return products.map(
      (product) =>
        new Product(
          product.id,
          product.restaurantId,
          product.menuCategoryId,
          product.name,
          product.description,
          Number(product.price),
          product.isAvailable,
          product.imageUrl,
          product.createdAt,
          product.updatedAt,
        ),
    );
  }

  async findAvailableByRestaurantId(restaurantId: string) {
  return this.prisma.product.findMany({
    where: {
      restaurantId,
      isAvailable: true,
    },
  });
}
}