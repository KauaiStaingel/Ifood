import { Inject, Injectable } from '@nestjs/common';
import { RestaurantRepository } from '../../domain/repositories/restaurant.repository';

@Injectable()
export class ListRestaurantsUseCase {
  constructor(
    @Inject('RestaurantRepository')
    private readonly restaurantRepository: RestaurantRepository,
  ) {}

  async execute() {
    return this.restaurantRepository.findMany();
  }
}