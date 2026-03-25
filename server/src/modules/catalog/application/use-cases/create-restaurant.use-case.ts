import {
  ConflictException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Restaurant } from '../../domain/entities/restaurant.entity';
import { RestaurantCategoryRepository } from '../../domain/repositories/restaurant-category.repository';
import { RestaurantRepository } from '../../domain/repositories/restaurant.repository';
import { CreateRestaurantDto } from '../dto/create-restaurant.dto';

@Injectable()
export class CreateRestaurantUseCase {
  constructor(
    @Inject('RestaurantRepository')
    private readonly restaurantRepository: RestaurantRepository,

    @Inject('RestaurantCategoryRepository')
    private readonly restaurantCategoryRepository: RestaurantCategoryRepository,
  ) {}

  async execute(input: CreateRestaurantDto) {
    if (input.requesterRole !== 'owner') {
      throw new ForbiddenException('Only owners can create restaurants');
    }

    const restaurantCategory =
      await this.restaurantCategoryRepository.findById(
        input.restaurantCategoryId,
      );

    if (!restaurantCategory) {
      throw new NotFoundException('Restaurant category not found');
    }

    const slug = this.generateSlug(input.name);

    const existing = await this.restaurantRepository.findBySlug(slug);

    if (existing) {
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
      input.restaurantCategoryId,
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