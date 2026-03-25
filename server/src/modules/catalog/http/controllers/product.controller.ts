import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateProductUseCase } from '../../application/use-cases/create-product.use-case';
import { ListRestaurantProductsUseCase } from '../../application/use-cases/list-restaurant-products.use-case';
import { ListMenuCategoryProductsUseCase } from '../../application/use-cases/list-menu-category-products.use-case';
import { CreateProductRequest } from '../requests/create-product.request';
import { JwtAuthGuard } from '../../../identity/infrastructure/security/jwt-auth.guard';
import { CurrentUser } from '../../../identity/infrastructure/security/current-user.decorator';
import { AuthenticatedUser } from '../../../identity/infrastructure/security/authenticated-user';

@Controller('/catalog')
export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly listRestaurantProductsUseCase: ListRestaurantProductsUseCase,
    private readonly listMenuCategoryProductsUseCase: ListMenuCategoryProductsUseCase,
  ) {}

  @Post('restaurants/:restaurantId/menu-categories/:menuCategoryId/products')
  @UseGuards(JwtAuthGuard)
  async create(
    @Param('restaurantId') restaurantId: string,
    @Param('menuCategoryId') menuCategoryId: string,
    @Body() body: CreateProductRequest,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.createProductUseCase.execute({
      restaurantId,
      menuCategoryId,
      name: body.name,
      description: body.description,
      price: body.price,
      imageUrl: body.imageUrl,
      requesterId: user.sub,
      requesterRole: user.role,
    });
  }

  @Get('restaurants/:restaurantId/products')
  async listByRestaurant(@Param('restaurantId') restaurantId: string) {
    return this.listRestaurantProductsUseCase.execute(restaurantId);
  }

  @Get('menu-categories/:menuCategoryId/products')
  async listByMenuCategory(@Param('menuCategoryId') menuCategoryId: string) {
    return this.listMenuCategoryProductsUseCase.execute(menuCategoryId);
  }
}