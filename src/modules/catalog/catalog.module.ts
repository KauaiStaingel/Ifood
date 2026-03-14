import { Module } from '@nestjs/common';
import { CatalogController } from './http/controllers/catalog.controller';
import { CategoryController } from './http/controllers/category.controller';
import { ProductController } from './http/controllers/product.controller';
import { RestaurantCategoryController } from './http/controllers/restaurant-category.controller';

import { CreateRestaurantUseCase } from './application/use-cases/create-restaurant.use-case';
import { ListRestaurantsUseCase } from './application/use-cases/list-restaurant.use-case';
import { CreateMenuCategoryUseCase } from './application/use-cases/create-menu-category.use-case';
import { ListRestaurantMenuCategoriesUseCase } from './application/use-cases/list-restaurant-menu-categories.use-case';
import { CreateProductUseCase } from './application/use-cases/create-product.use-case';
import { ListRestaurantProductsUseCase } from './application/use-cases/list-restaurant-products.use-case';
import { ListMenuCategoryProductsUseCase } from './application/use-cases/list-menu-category-products.use-case';
import { ListRestaurantCategoriesUseCase } from './application/use-cases/list-restaurant-categories.use-case';

import { PrismaRestaurantRepository } from './infrastructure/persistence/prisma/prisma-restaurant.repository';
import { PrismaMenuCategoryRepository } from './infrastructure/persistence/prisma/prisma-menu-category.repository';
import { PrismaProductRepository } from './infrastructure/persistence/prisma/prisma-product.repository';
import { PrismaRestaurantCategoryRepository } from './infrastructure/persistence/prisma/prisma-restaurant-category.repository';

import { PrismaService } from '../../shared/infrastructure/prisma/prisma.service';

@Module({
  controllers: [
    CatalogController,
    CategoryController,
    ProductController,
    RestaurantCategoryController,
  ],
  providers: [
    PrismaService,

    CreateRestaurantUseCase,
    ListRestaurantsUseCase,
    CreateMenuCategoryUseCase,
    ListRestaurantMenuCategoriesUseCase,
    CreateProductUseCase,
    ListRestaurantProductsUseCase,
    ListMenuCategoryProductsUseCase,
    ListRestaurantCategoriesUseCase,

    PrismaRestaurantRepository,
    PrismaMenuCategoryRepository,
    PrismaProductRepository,
    PrismaRestaurantCategoryRepository,

    {
      provide: 'RestaurantRepository',
      useExisting: PrismaRestaurantRepository,
    },
    {
      provide: 'MenuCategoryRepository',
      useExisting: PrismaMenuCategoryRepository,
    },
    {
      provide: 'ProductRepository',
      useExisting: PrismaProductRepository,
    },
    {
      provide: 'RestaurantCategoryRepository',
      useExisting: PrismaRestaurantCategoryRepository,
    },
  ],
})
export class CatalogModule {}