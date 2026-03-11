import { Restaurant } from '../entities/restaurant.entity';

export abstract class RestaurantRepository {
  abstract create(restaurant: Restaurant): Promise<Restaurant>;
  abstract findBySlug(slug: string): Promise<Restaurant | null>;
  abstract findMany(): Promise<Restaurant[]>;
}