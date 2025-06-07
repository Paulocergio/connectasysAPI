import { IProductRepository } from "../../domain/repositories/IProductRepository";

export class DeleteProductUseCase {
  constructor(private repository: IProductRepository) {}

  async execute(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
