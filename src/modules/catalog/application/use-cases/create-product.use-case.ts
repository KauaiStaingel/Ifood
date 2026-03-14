import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Product } from '../../domain/entities/product.entity';
import { MenuCategoryRepository } from '../../domain/repositories/menu-category.repository';
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

    @Inject('MenuCategoryRepository')
    private readonly menuCategoryRepository: MenuCategoryRepository,
  ) {}

  async execute(input: CreateProductDto) {
    if (input.requesterRole !== 'owner') {
      throw new ForbiddenException('Only owners can create products');
    }

    const restaurant = await this.restaurantRepository.findById(input.restaurantId);

    if (!restaurant) {
      throw new NotFoundException('Restaurant not found');
    }

    if (restaurant.ownerId !== input.requesterId) {
      throw new ForbiddenException('You cannot manage this restaurant');
    }

    const menuCategory = await this.menuCategoryRepository.findById(
      input.menuCategoryId,
    );

    if (!menuCategory) {
      throw new NotFoundException('Menu category not found');
    }

    if (menuCategory.restaurantId !== input.restaurantId) {
      throw new ForbiddenException(
        'Menu category does not belong to this restaurant',
      );
    }

    const now = new Date();

    const product = new Product(
      randomUUID(),
      input.restaurantId,
      input.menuCategoryId,
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