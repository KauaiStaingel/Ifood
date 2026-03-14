import { Controller, Get } from '@nestjs/common';
import { ListRestaurantCategoriesUseCase } from '../../application/use-cases/list-restaurant-categories.use-case';

@Controller('/catalog/restaurant-categories')
export class RestaurantCategoryController {
  constructor(
    private readonly listRestaurantCategoriesUseCase: ListRestaurantCategoriesUseCase,
  ) {}

  @Get()
  async list() {
    return this.listRestaurantCategoriesUseCase.execute();
  }
}