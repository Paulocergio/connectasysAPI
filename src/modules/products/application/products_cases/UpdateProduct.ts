
import { IProductRepository } from "../../domain/repositories/IProductRepository";
import { Product } from "../../domain/entities/ productentity";
export class UpdateProductUseCase {
  constructor(private repository: IProductRepository) {}

  async execute(id: number, data: Partial<Product>): Promise<void> {
    await this.repository.update(id, data);
  }
}