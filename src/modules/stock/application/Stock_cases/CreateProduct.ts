


import { Product } from "../../domain/entities/ productentity";




import { IProductRepository } from "../../domain/repositories/IProductRepository";

export class CreateProductUseCase {
  constructor(private repository: IProductRepository) {}

  async execute(data: Product): Promise<Product> {
    return await this.repository.create(data);
  }
}
