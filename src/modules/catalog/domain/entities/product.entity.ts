export class Product {
  constructor(
    public readonly id: string,
    public readonly restaurantId: string,
    public readonly categoryId: string,
    public readonly name: string,
    public readonly description: string | null,
    public readonly price: number,
    public readonly isAvailable: boolean,
    public readonly imageUrl: string | null,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}