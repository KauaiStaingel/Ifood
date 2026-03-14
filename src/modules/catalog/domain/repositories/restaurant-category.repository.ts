import { RestaurantCategory } from '../entities/restaurant-category.entity';

export abstract class RestaurantCategoryRepository {
  abstract findById(id: string): Promise<RestaurantCategory | null>;
  abstract findBySlug(slug: string): Promise<RestaurantCategory | null>;
  abstract findMany(): Promise<RestaurantCategory[]>;
  abstract create(category: RestaurantCategory): Promise<RestaurantCategory>;
}