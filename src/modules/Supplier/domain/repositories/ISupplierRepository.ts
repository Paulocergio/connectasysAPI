import { Supplier } from '../entities/Supplier';

export interface ISupplierRepository {
  findAll(): Promise<Supplier[]>;
  findById(id: number): Promise<Supplier | null>;
  create(supplier: Supplier): Promise<void>;
  update(id: number, data: Partial<Supplier>): Promise<void>;
 delete(id: number): Promise<string>;

}
