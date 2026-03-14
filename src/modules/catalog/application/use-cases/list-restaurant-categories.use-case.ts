import { Inject, Injectable } from '@nestjs/common';
import { RestaurantCategoryRepository } from '../../domain/repositories/restaurant-category.repository';

@Injectable()
export class ListRestaurantCategoriesUseCase {
  constructor(
    @Inject('RestaurantCategoryRepository')
    private readonly restaurantCategoryRepository: RestaurantCategoryRepository,
  ) {}

  async execute() {
    return this.restaurantCategoryRepository.findMany();
  }
}