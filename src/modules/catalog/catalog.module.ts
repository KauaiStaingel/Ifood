import { Module } from '@nestjs/common';
import { CatalogController } from './http/controllers/catalog.controller';
import { CategoryController } from './http/controllers/category.controller';
import { ProductController } from './http/controllers/product.controller';
import { CreateRestaurantUseCase } from './application/use-cases/create-restaurant.use-case';
import { ListRestaurantsUseCase } from './application/use-cases/list-restaurant.use-case';
import { CreateCategoryUseCase } from './application/use-cases/create-category.use-case';
import { ListRestaurantCategoriesUseCase } from './application/use-cases/list-restaurant-categories.use-case';
import { CreateProductUseCase } from './application/use-cases/create-product.use-case';
import { ListRestaurantProductsUseCase } from './application/use-cases/list-category-products.use-case';
import { ListCategoryProductsUseCase } from './application/use-cases/list-restaurant-products.use-case';
import { PrismaRestaurantRepository } from './infrastructure/persistence/prisma/prisma-restaurant.repository';
import { PrismaCategoryRepository } from './infrastructure/persistence/prisma/prisma-category.repository';
import { PrismaProductRepository } from './infrastructure/persistence/prisma/prisma-product.repository';
import { PrismaService } from '../../shared/infrastructure/prisma/prisma.service';

@Module({
  controllers: [CatalogController, CategoryController, ProductController],
  providers: [
    PrismaService,
    CreateRestaurantUseCase,
    ListRestaurantsUseCase,
    CreateCategoryUseCase,
    ListRestaurantCategoriesUseCase,
    CreateProductUseCase,
    ListRestaurantProductsUseCase,
    ListCategoryProductsUseCase,
    PrismaRestaurantRepository,
    PrismaCategoryRepository,
    PrismaProductRepository,
    {
      provide: 'RestaurantRepository',
      useExisting: PrismaRestaurantRepository,
    },
    {
      provide: 'CategoryRepository',
      useExisting: PrismaCategoryRepository,
    },
    {
      provide: 'ProductRepository',
      useExisting: PrismaProductRepository,
    },
  ],
})
export class CatalogModule {}