import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { MenuCategoryRepository } from '../../domain/repositories/menu-category.repository';
import { ProductRepository } from '../../domain/repositories/product.repository';

@Injectable()
export class ListMenuCategoryProductsUseCase {
  constructor(
    @Inject('ProductRepository')
    private readonly productRepository: ProductRepository,

    @Inject('MenuCategoryRepository')
    private readonly menuCategoryRepository: MenuCategoryRepository,
  ) {}

  async execute(menuCategoryId: string) {
    const menuCategory = await this.menuCategoryRepository.findById(menuCategoryId);

    if (!menuCategory) {
      throw new NotFoundException('Menu category not found');
    }

    return this.productRepository.findManyByMenuCategoryId(menuCategoryId);
  }
}