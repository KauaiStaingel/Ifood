import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { MenuCategoryRepository } from '../../domain/repositories/menu-category.repository';
import { RestaurantRepository } from '../../domain/repositories/restaurant.repository';

@Injectable()
export class ListRestaurantMenuCategoriesUseCase {
  constructor(
    @Inject('MenuCategoryRepository')
    private readonly menuCategoryRepository: MenuCategoryRepository,

    @Inject('RestaurantRepository')
    private readonly restaurantRepository: RestaurantRepository,
  ) {}

  async execute(restaurantId: string) {
    const restaurant = await this.restaurantRepository.findById(restaurantId);

    if (!restaurant) {
      throw new NotFoundException('Restaurant not found');
    }

    return this.menuCategoryRepository.findManyByRestaurantId(restaurantId);
  }
}