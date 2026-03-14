import { MenuCategory } from '../entities/menu-category.entity';

export abstract class MenuCategoryRepository {
  abstract create(category: MenuCategory): Promise<MenuCategory>;
  abstract findById(id: string): Promise<MenuCategory | null>;
  abstract findManyByRestaurantId(restaurantId: string): Promise<MenuCategory[]>;
}