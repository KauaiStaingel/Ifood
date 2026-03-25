import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateMenuCategoryUseCase } from '../../application/use-cases/create-menu-category.use-case';
import { ListRestaurantMenuCategoriesUseCase } from '../../application/use-cases/list-restaurant-menu-categories.use-case';
import { CreateCategoryRequest } from '../requests/create-category.request';
import { JwtAuthGuard } from '../../../identity/infrastructure/security/jwt-auth.guard';
import { CurrentUser } from '../../../identity/infrastructure/security/current-user.decorator';
import { AuthenticatedUser } from '../../../identity/infrastructure/security/authenticated-user';

@Controller('/catalog/restaurants/:restaurantId/menu-categories')
export class CategoryController {
  constructor(
    private readonly createMenuCategoryUseCase: CreateMenuCategoryUseCase,
    private readonly listRestaurantMenuCategoriesUseCase: ListRestaurantMenuCategoriesUseCase,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Param('restaurantId') restaurantId: string,
    @Body() body: CreateCategoryRequest,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.createMenuCategoryUseCase.execute({
      restaurantId,
      name: body.name,
      displayOrder: body.displayOrder,
      requesterId: user.sub,
      requesterRole: user.role,
    });
  }

  @Get()
  async list(@Param('restaurantId') restaurantId: string) {
    return this.listRestaurantMenuCategoriesUseCase.execute(restaurantId);
  }
}