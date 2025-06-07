
import { Product } from "../../domain/entities/ productentity";

export interface IProductRepository {
  create(product: Product): Promise<Product>;
  findAll(): Promise<Product[]>;
  findByBarcode(barcode: string): Promise<Product | null>;
  update(id: number, data: Partial<Product>): Promise<void>; 
  delete(id: number): Promise<void>;

}
