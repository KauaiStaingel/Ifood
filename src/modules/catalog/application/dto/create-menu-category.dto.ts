export interface CreateMenuCategoryDto {
  restaurantId: string;
  name: string;
  displayOrder?: number;
  requesterId: string;
  requesterRole: string;
}