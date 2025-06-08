import { StockRepository } from "../../infrastructure/repositories/StockRepository";
import { ProductRepository } from "../../../products/infrastructure/repositories/ProductRepository";
import { StockEntry } from "../../domain/entities/stockEntryEntity";

interface EntryDTO {
  productId: number;
  quantity: number;
}

export class CreateStockEntryUseCase {
  constructor(
    private readonly stockRepository: StockRepository,
    private readonly productRepository: ProductRepository
  ) {}

  async execute({ productId, quantity }: EntryDTO): Promise<void> {
    const entry = new StockEntry(productId, quantity);
    await this.stockRepository.createEntry(entry);
    await this.productRepository.incrementQuantity(productId, quantity);
  }
}
