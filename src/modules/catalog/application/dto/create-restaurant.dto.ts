export interface CreateRestaurantDto {
  name: string;
  description?: string;
  restaurantCategoryId: string;
  ownerId: string;
  requesterRole: string;
}