import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Category } from '../../domain/entities/category.entity';
import { CategoryRepository } from '../../domain/repositories/category.repository';
import { RestaurantRepository } from '../../domain/repositories/restaurant.repository';
import { CreateCategoryDto } from '../dto/create-category.dto';

@Injectable()
export class CreateCategoryUseCase {
  constructor(
    @Inject('CategoryRepository')
    private readonly categoryRepository: CategoryRepository,

    @Inject('RestaurantRepository')
    private readonly restaurantRepository: RestaurantRepository,
  ) {}

  async execute(input: CreateCategoryDto) {
    const restaurant = await this.restaurantRepository.findById(input.restaurantId);

    if (!restaurant) {
      throw new NotFoundException('Restaurant not found');
    }

    if (restaurant.ownerId !== input.requesterId) {
      throw new ForbiddenException('You cannot manage this restaurant');
    }

    const now = new Date();

    const category = new Category(
      randomUUID(),
      input.restaurantId,
      input.name.trim(),
      input.displayOrder ?? 0,
      now,
      now,
    );

    return this.categoryRepository.create(category);
  }
}