import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../shared/infrastructure/database/prisma/prisma.service';
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
        categoryId: product.categoryId,
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
      created.categoryId,
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
          product.categoryId,
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

  async findManyByCategoryId(categoryId: string): Promise<Product[]> {
    const products = await this.prisma.product.findMany({
      where: { categoryId },
      orderBy: { createdAt: 'asc' },
    });

    return products.map(
      (product) =>
        new Product(
          product.id,
          product.restaurantId,
          product.categoryId,
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
}