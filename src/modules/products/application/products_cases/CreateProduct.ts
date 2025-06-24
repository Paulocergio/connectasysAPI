import { Product } from "../../domain/entities/ productentity";
import { IProductRepository } from "../../domain/repositories/IProductRepository";
import {CreateProductDTO } from "../products_cases/dto/CreateProductDTO"
export class CreateProductUseCase {
  constructor(private repository: IProductRepository) {}

  async execute(data: CreateProductDTO): Promise<Product> {
    const {
      product_name,
      barcode,
      description,
      quantity,
      cost_price,
      sale_price
    } = data;

    let profit_margin: number | null = null;

    if (cost_price && sale_price && cost_price > 0) {
      profit_margin = ((sale_price - cost_price) / cost_price) * 100;
    }

    const newProduct: Product = {
      product_name,
      barcode,
      description,
      quantity: quantity ?? 0,
      cost_price,
      sale_price,
      profit_margin
    };

    return await this.repository.create(newProduct);
  }
}