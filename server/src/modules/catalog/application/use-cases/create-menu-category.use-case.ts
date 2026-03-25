import {
  ConflictException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { MenuCategory } from '../../domain/entities/menu-category.entity';
import { MenuCategoryRepository } from '../../domain/repositories/menu-category.repository';
import { RestaurantRepository } from '../../domain/repositories/restaurant.repository';
import { CreateMenuCategoryDto } from '../dto/create-menu-category.dto';

@Injectable()
export class CreateMenuCategoryUseCase {
  constructor(
    @Inject('MenuCategoryRepository')
    private readonly menuCategoryRepository: MenuCategoryRepository,

    @Inject('RestaurantRepository')
    private readonly restaurantRepository: RestaurantRepository,
  ) {}

  async execute(input: CreateMenuCategoryDto) {
    if (input.requesterRole !== 'owner') {
      throw new ForbiddenException('Only owners can create menu categories');
    }

    const restaurant = await this.restaurantRepository.findById(input.restaurantId);

    if (!restaurant) {
      throw new NotFoundException('Restaurant not found');
    }

    if (restaurant.ownerId !== input.requesterId) {
      throw new ForbiddenException('You cannot manage this restaurant');
    }

    const existingCategories =
      await this.menuCategoryRepository.findManyByRestaurantId(input.restaurantId);

    const duplicated = existingCategories.some(
      (category) => category.name.trim().toLowerCase() === input.name.trim().toLowerCase(),
    );

    if (duplicated) {
      throw new ConflictException('Menu category already exists in this restaurant');
    }

    const now = new Date();

    const category = new MenuCategory(
      randomUUID(),
      input.restaurantId,
      input.name.trim(),
      input.displayOrder ?? 0,
      now,
      now,
    );

    return this.menuCategoryRepository.create(category);
  }
}