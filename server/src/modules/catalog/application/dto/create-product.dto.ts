export interface CreateProductDto {
  restaurantId: string;
  menuCategoryId: string;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  requesterId: string;
  requesterRole: string;
}