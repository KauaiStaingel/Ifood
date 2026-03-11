import { Module } from '@nestjs/common';
import { CatalogController } from './http/controllers/catalog.controller';
import { CreateRestaurantUseCase } from './application/use-cases/create-restaurant.use-case';
import { ListRestaurantsUseCase } from './application/use-cases/list-restaurant.use-case';
import { PrismaRestaurantRepository } from './infrastructure/persistence/prisma/prisma-restaurant.repository';
import { PrismaService } from '../../shared/infrastructure/prisma/prisma.service';

@Module({
  controllers: [CatalogController],
  providers: [
    PrismaService,
    CreateRestaurantUseCase,
    ListRestaurantsUseCase,
    PrismaRestaurantRepository,
    {
      provide: 'RestaurantRepository',
      useExisting: PrismaRestaurantRepository,
    },
  ],
})
export class CatalogModule {}