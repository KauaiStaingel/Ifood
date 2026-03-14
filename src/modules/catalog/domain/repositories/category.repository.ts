import { Category } from '../entities/category.entity';

export abstract class CategoryRepository {
  abstract create(category: Category): Promise<Category>;
  abstract findManyByRestaurantId(restaurantId: string): Promise<Category[]>;
  abstract findById(id: string): Promise<Category | null>;
}