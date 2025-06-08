import { StockEntry } from "../entities/stockEntryEntity";
import { StockExit } from "../entities/stockExitEntity";

export interface IStockRepository {
  createEntry(entry: StockEntry): Promise<void>;
  createExit(exit: StockExit): Promise<void>;
  getBalance(): Promise<{ productId: number; balance: number }[]>;
}