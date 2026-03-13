export interface CreateCategoryDto {
  restaurantId: string;
  name: string;
  displayOrder?: number;
  requesterId: string;
}