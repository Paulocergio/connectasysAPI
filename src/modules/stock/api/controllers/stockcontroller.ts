import { Request, Response } from "express";
import { CreateProductUseCase } from "../../application/Stock_cases/CreateProduct";
import { ProductRepository } from "../../infrastructure/repositories/ProductRepository";
import { UpdateProductUseCase } from "../../application/Stock_cases/UpdateProduct";
import { DeleteProductUseCase } from "../../application/Stock_cases/DeleteProduct";



const productRepository = new ProductRepository();
const updateUseCase = new UpdateProductUseCase(productRepository);
const deleteUseCase = new DeleteProductUseCase(productRepository);


const createProduct = new CreateProductUseCase(productRepository);


export class StockController {
  async createProduct(req: Request, res: Response): Promise<void> {
    try {
      const product = await createProduct.execute(req.body);
      res.status(201).json(product);
    } catch (error: any) {
      console.error("[StockController.createProduct]", error);
      res.status(500).json({ error: "Erro ao cadastrar produto" });
    }
  }

  async getAllProducts(req: Request, res: Response): Promise<void> {
    try {
      const result = await productRepository.findAll();
      res.status(200).json(result);
    } catch (error) {
      console.error("[StockController.getAllProducts]", error);
      res.status(500).json({ error: "Erro ao buscar produtos" });
    }
  }
async updateProduct(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const data = req.body;

    try {
      await updateUseCase.execute(id, data);
      res.status(200).json({ message: `Produto ${id} atualizado com sucesso.` });
    } catch (error) {
      console.error("[StockController.updateProduct]", error);
      res.status(500).json({ error: "Erro ao atualizar produto" });
    }
  }

   async deleteProduct(req: Request, res: Response) {
    const id = parseInt(req.params.id);

    try {
      await deleteUseCase.execute(id);
      res.status(200).json({ message: `Produto ${id} excluído logicamente.` });
    } catch (error) {
      console.error("[StockController.deleteProduct]", error);
      res.status(500).json({ error: "Erro ao deletar produto" });
    }
  }
 
}
