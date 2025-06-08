import { StockRepository } from "../../infrastructure/repositories/StockRepository";
import { ProductRepository } from "../../../products/infrastructure/repositories/ProductRepository";

interface ExitDTO {
  productId: number;
  quantity: number;
}

export class CreateStockExitUseCase {
  constructor(
    private readonly stockRepository: StockRepository,
    private readonly productRepository: ProductRepository
  ) {}

  async execute({ productId, quantity }: ExitDTO): Promise<void> {
    const balance = await this.stockRepository.getProductBalance(productId);

    if (balance < quantity) {
      throw new Error("Quantidade insuficiente em estoque para saída.");
    }

    await this.stockRepository.createExit({ productId, quantity });
    await this.productRepository.decrementQuantity(productId, quantity);
  }
}
