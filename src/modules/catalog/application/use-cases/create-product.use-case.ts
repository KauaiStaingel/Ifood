import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Product } from '../../domain/entities/product.entity';
import { CategoryRepository } from '../../domain/repositories/category.repository';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { RestaurantRepository } from '../../domain/repositories/restaurant.repository';
import { CreateProductDto } from '../dto/create-product.dto';

@Injectable()
export class CreateProductUseCase {
  constructor(
    @Inject('ProductRepository')
    private readonly productRepository: ProductRepository,

    @Inject('RestaurantRepository')
    private readonly restaurantRepository: RestaurantRepository,

    @Inject('CategoryRepository')
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async execute(input: CreateProductDto) {
    const restaurant = await this.restaurantRepository.findById(input.restaurantId);

    if (!restaurant) {
      throw new NotFoundException('Restaurant not found');
    }

    if (restaurant.ownerId !== input.requesterId) {
      throw new ForbiddenException('You cannot manage this restaurant');
    }

    const category = await this.categoryRepository.findById(input.categoryId);

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    if (category.restaurantId !== input.restaurantId) {
      throw new ForbiddenException('Category does not belong to this restaurant');
    }

    const now = new Date();

    const product = new Product(
      randomUUID(),
      input.restaurantId,
      input.categoryId,
      input.name.trim(),
      input.description?.trim() || null,
      input.price,
      true,
      input.imageUrl?.trim() || null,
      now,
      now,
    );

    return this.productRepository.create(product);
  }
}