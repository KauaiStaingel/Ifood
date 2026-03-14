import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateRestaurantUseCase } from '../../application/use-cases/create-restaurant.use-case';
import { ListRestaurantsUseCase } from '../../application/use-cases/list-restaurant.use-case';
import { CreateRestaurantRequest } from '../requests/create-restaurant.request';
import { JwtAuthGuard } from '../../../identity/infrastructure/security/jwt-auth.guard';
import { CurrentUser } from '../../../identity/infrastructure/security/current-user.decorator';
import { AuthenticatedUser } from '../../../identity/infrastructure/security/authenticated-user';

@Controller('/catalog')
export class CatalogController {
  constructor(
    private readonly createRestaurantUseCase: CreateRestaurantUseCase,
    private readonly listRestaurantsUseCase: ListRestaurantsUseCase,
  ) {}

  @Post('/create_restaurants')
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() body: CreateRestaurantRequest,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.createRestaurantUseCase.execute({
      name: body.name,
      description: body.description,
      restaurantCategoryId: body.restaurantCategoryId,
      ownerId: user.sub,
      requesterRole: user.role,
    });
  }

  @Get('/list_restaurants')
  async list() {
    return this.listRestaurantsUseCase.execute();
  }
}