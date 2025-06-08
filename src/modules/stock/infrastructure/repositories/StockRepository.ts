import { db } from "../../../../infrastructure/database/database";
import { IStockRepository } from "../../domain/repositories/IStockRepository";
import { StockEntry } from "../../domain/entities/stockEntryEntity";
import { StockExit } from "../../domain/entities/stockExitEntity";

export class StockRepository implements IStockRepository {
  async createEntry(entry: StockEntry): Promise<void> {
    await db.query(
      `INSERT INTO stock_entries (product_id, quantity, entry_date)
       VALUES ($1, $2, NOW())`,
      [entry.productId, entry.quantity]
    );
  }

  async createExit(exit: StockExit): Promise<void> {
    await db.query(
      `INSERT INTO stock_exits (product_id, quantity, exit_date)
       VALUES ($1, $2, NOW())`,
      [exit.productId, exit.quantity]
    );
  }

  async getBalance(): Promise<{ productId: number; balance: number }[]> {
    const result = await db.query(
      `SELECT p.product_id,
              COALESCE(SUM(se.quantity), 0) - COALESCE(SUM(sex.quantity), 0) AS balance
       FROM products p
       LEFT JOIN stock_entries se ON se.product_id = p.product_id
       LEFT JOIN stock_exits sex ON sex.product_id = p.product_id
       WHERE p.deleted_at IS NULL
       GROUP BY p.product_id`
    );
    return result.rows;
  }

  async getProductBalance(productId: number): Promise<number> {
    const result = await db.query(
      `SELECT 
        COALESCE(SUM(se.quantity), 0) - COALESCE(SUM(sex.quantity), 0) AS balance
     FROM products p
     LEFT JOIN stock_entries se ON se.product_id = p.product_id
     LEFT JOIN stock_exits sex ON sex.product_id = p.product_id
     WHERE p.product_id = $1`,
      [productId]
    );
    return result.rows[0]?.balance ?? 0;
  }

}
