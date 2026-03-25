import { Injectable, NotFoundException } from '@nestjs/common';
import { RestaurantRepository } from '../../domain/repositories/restaurant.repository';
import { MenuCategoryRepository } from '../../domain/repositories/menu-category.repository';
import { ProductRepository } from '../../domain/repositories/product.repository';

@Injectable()
export class GetRestaurantMenuUseCase {
  constructor(
    private readonly restaurantRepository: RestaurantRepository,
    private readonly menuCategoryRepository: MenuCategoryRepository,
    private readonly productRepository: ProductRepository,
  ) {}

  async execute(slug: string) {
    const restaurant = await this.restaurantRepository.findBySlug(slug);

    if (!restaurant) {
      throw new NotFoundException('Restaurant not found');
    }

    const menuCategories =
      await this.menuCategoryRepository.findByRestaurantId(restaurant.id);

    const products =
      await this.productRepository.findAvailableByRestaurantId(restaurant.id);

    const groupedMenu = menuCategories.map((category) => ({
      id: category.id,
      name: category.name,
      displayOrder: category.displayOrder,
      products: products.filter(
        (product) => product.menuCategoryId === category.id,
      ),
    }));

    return {
      id: restaurant.id,
      name: restaurant.name,
      slug: restaurant.slug,
      description: restaurant.description,
      category: restaurant.category
        ? {
            id: restaurant.category.id,
            name: restaurant.category.name,
            slug: restaurant.category.slug,
          }
        : null,
      menuCategories: groupedMenu,
    };
  }
}