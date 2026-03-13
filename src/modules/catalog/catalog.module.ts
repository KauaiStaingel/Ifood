import { Module } from '@nestjs/common';
import { CatalogController } from './http/controllers/catalog.controller';
import { CategoryController } from './http/controllers/category.controller';
import { CreateCategoryUseCase } from './application/use-cases/create-category.use-case';
import { ListRestaurantCategoriesUseCase } from './application/use-cases/list-restaurant-categories.use-case';
import { PrismaCategoryRepository } from './infrastructure/persistence/prisma/prisma-category.repository';
import { CreateRestaurantUseCase } from './application/use-cases/create-restaurant.use-case';
import { ListRestaurantsUseCase } from './application/use-cases/list-restaurant.use-case';
import { PrismaRestaurantRepository } from './infrastructure/persistence/prisma/prisma-restaurant.repository';
import { PrismaService } from '../../shared/infrastructure/prisma/prisma.service';

@Module({
  controllers: [CatalogController, CategoryController],
  providers: [
    PrismaService,
    CreateRestaurantUseCase,
    ListRestaurantsUseCase,
    CreateCategoryUseCase,
    ListRestaurantCategoriesUseCase,
    PrismaRestaurantRepository,
    PrismaCategoryRepository,
    {
      provide: 'RestaurantRepository',
      useExisting: PrismaRestaurantRepository,
    },
    {
      provide: 'CategoryRepository',
      useExisting: PrismaCategoryRepository,
    },
  ],
})
export class CatalogModule {}