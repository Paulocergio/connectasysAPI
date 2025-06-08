import { Request, Response } from "express";
import { StockRepository } from "../../infrastructure/repositories/StockRepository";
import { CreateStockEntryUseCase } from "../../application/stock_cases/CreateStockEntry";
import { CreateStockExitUseCase } from "../../application/stock_cases/CreateStockExit";
import { GetStockBalanceUseCase } from "../../application/stock_cases/GetStockBalance";
import { ProductRepository } from "../../../products/infrastructure/repositories/ProductRepository";

const stockRepository = new StockRepository();
const productRepository = new ProductRepository();

const createEntry = new CreateStockEntryUseCase(stockRepository, productRepository);
const createExit = new CreateStockExitUseCase(stockRepository, productRepository);
const getBalance = new GetStockBalanceUseCase(stockRepository);

export class StockController {
  async createEntry(req: Request, res: Response) {
    try {
      const { productId, quantity } = req.body;

      if (!productId || !quantity) {
        return res.status(400).json({ error: "Parâmetros 'productId' e 'quantity' são obrigatórios." });
      }

      await createEntry.execute({ productId, quantity });
      res.status(201).json({ message: "Entrada registrada com sucesso." });

    } catch (err: any) {
      console.error("[StockController.createEntry] Erro:", err.message, err.stack);
      res.status(500).json({ error: `Erro ao registrar entrada: ${err.message}` });
    }
  }

  async createExit(req: Request, res: Response) {
    try {
      const { productId, quantity } = req.body;

      if (!productId || !quantity) {
        return res.status(400).json({ error: "Parâmetros 'productId' e 'quantity' são obrigatórios." });
      }

      await createExit.execute({ productId, quantity });
      res.status(201).json({ message: "Saída registrada com sucesso." });

    } catch (err: any) {
      console.error("[StockController.createExit] Erro:", err.message, err.stack);
      res.status(500).json({ error: `Erro ao registrar saída: ${err.message}` });
    }
  }

  async getBalance(req: Request, res: Response) {
    try {
      const result = await getBalance.execute();
      res.status(200).json(result);
    } catch (err: any) {
      console.error("[StockController.getBalance] Erro:", err.message, err.stack);
      res.status(500).json({ error: `Erro ao consultar saldo: ${err.message}` });
    }
  }
}
