import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CategoryRepository } from '../../domain/repositories/category.repository';
import { RestaurantRepository } from '../../domain/repositories/restaurant.repository';

@Injectable()
export class ListRestaurantCategoriesUseCase {
  constructor(
    @Inject('CategoryRepository')
    private readonly categoryRepository: CategoryRepository,

    @Inject('RestaurantRepository')
    private readonly restaurantRepository: RestaurantRepository,
  ) {}

  async execute(restaurantId: string) {
    const restaurant = await this.restaurantRepository.findById(restaurantId);

    if (!restaurant) {
      throw new NotFoundException('Restaurant not found');
    }

    return this.categoryRepository.findManyByRestaurantId(restaurantId);
  }
}