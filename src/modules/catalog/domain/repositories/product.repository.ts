import { Product } from '../entities/product.entity';

export abstract class ProductRepository {
  abstract create(product: Product): Promise<Product>;
  abstract findManyByRestaurantId(restaurantId: string): Promise<Product[]>;
  abstract findManyByMenuCategoryId(menuCategoryId: string): Promise<Product[]>;
  abstract findAvailableByRestaurantId(restaurantId: string): Promise<Product[]>;
}