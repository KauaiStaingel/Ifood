import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateProductUseCase } from '../../application/use-cases/create-product.use-case';
import { ListCategoryProductsUseCase } from '../../application/use-cases/list-restaurant-products.use-case';
import { ListRestaurantProductsUseCase } from '../../application/use-cases/list-category-products.use-case';
import { CreateProductRequest } from '../requests/create-product.request';
import { JwtAuthGuard } from '../../../identity/infrastructure/security/jwt-auth.guard';
import { CurrentUser } from '../../../identity/infrastructure/security/current-user.decorator';
import { AuthenticatedUser } from '../../../identity/infrastructure/security/authenticated-user';

@Controller('api/v1/catalog')
export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly listRestaurantProductsUseCase: ListRestaurantProductsUseCase,
    private readonly listCategoryProductsUseCase: ListCategoryProductsUseCase,
  ) {}

  @Post('restaurants/:restaurantId/categories/:categoryId/products')
  @UseGuards(JwtAuthGuard)
  async create(
    @Param('restaurantId') restaurantId: string,
    @Param('categoryId') categoryId: string,
    @Body() body: CreateProductRequest,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.createProductUseCase.execute({
      restaurantId,
      categoryId,
      name: body.name,
      description: body.description,
      price: body.price,
      imageUrl: body.imageUrl,
      requesterId: user.sub,
    });
  }

  @Get('restaurants/:restaurantId/products')
  async listByRestaurant(@Param('restaurantId') restaurantId: string) {
    return this.listRestaurantProductsUseCase.execute(restaurantId);
  }

  @Get('categories/:categoryId/products')
  async listByCategory(@Param('categoryId') categoryId: string) {
    return this.listCategoryProductsUseCase.execute(categoryId);
  }
}