import { IsString, MinLength, IsOptional } from 'class-validator';

export class CreateRestaurantRequest {
  @IsString()
  @MinLength(2)
  name!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  restaurantCategoryId!: string;
}