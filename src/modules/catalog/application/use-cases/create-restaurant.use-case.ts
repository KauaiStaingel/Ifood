import { Inject, Injectable, ConflictException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Restaurant } from '../../domain/entities/restaurant.entity';
import { RestaurantRepository } from '../../domain/repositories/restaurant.repository';
import { CreateRestaurantDto } from '../dto/create-restaurant.dto';

@Injectable()
export class CreateRestaurantUseCase {
  constructor(
    @Inject('RestaurantRepository')
    private readonly restaurantRepository: RestaurantRepository,
  ) {}

  async execute(input: CreateRestaurantDto) {
    const slug = this.generateSlug(input.name);

    const restaurantWithSameSlug =
      await this.restaurantRepository.findBySlug(slug);

    if (restaurantWithSameSlug) {
      throw new ConflictException('Restaurant slug already exists');
    }

    const now = new Date();

    const restaurant = new Restaurant(
      randomUUID(),
      input.name.trim(),
      slug,
      input.description?.trim() || null,
      true,
      input.ownerId,
      now,
      now,
    );

    return this.restaurantRepository.create(restaurant);
  }

  private generateSlug(name: string): string {
    return name
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }
}