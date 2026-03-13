import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateCategoryUseCase } from '../../application/use-cases/create-category.use-case';
import { ListRestaurantCategoriesUseCase } from '../../application/use-cases/list-restaurant-categories.use-case';
import { CreateCategoryRequest } from '../requests/create-category.request';
import { JwtAuthGuard } from '../../../identity/infrastructure/security/jwt-auth.guard';
import { CurrentUser } from '../../../identity/infrastructure/security/current-user.decorator';
import { AuthenticatedUser } from '../../../identity/infrastructure/security/authenticated-user';

@Controller('/catalog/restaurants/:restaurantId/categories')
export class CategoryController {
  constructor(
    private readonly createCategoryUseCase: CreateCategoryUseCase,
    private readonly listRestaurantCategoriesUseCase: ListRestaurantCategoriesUseCase,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Param('restaurantId') restaurantId: string,
    @Body() body: CreateCategoryRequest,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.createCategoryUseCase.execute({
      restaurantId,
      name: body.name,
      displayOrder: body.displayOrder,
      requesterId: user.sub,
    });
  }

  @Get()
  async list(@Param('restaurantId') restaurantId: string) {
    return this.listRestaurantCategoriesUseCase.execute(restaurantId);
  }
}