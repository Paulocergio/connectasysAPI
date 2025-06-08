import { IStockRepository } from "../../domain/repositories/IStockRepository";

export class GetStockBalanceUseCase {
  constructor(private repository: IStockRepository) {}
  async execute() {
    return this.repository.getBalance();
  }
}
