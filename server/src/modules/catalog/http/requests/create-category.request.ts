import { IsInt, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateCategoryRequest {
  @IsString()
  @MinLength(2)
  name!: string;

  @IsOptional()
  @IsInt()
  displayOrder?: number;
}