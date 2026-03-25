export class Restaurant {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly slug: string,
    public readonly description: string | null,
    public readonly isActive: boolean,
    public readonly ownerId: string,
    public readonly restaurantCategoryId: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}