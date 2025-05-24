import { Customer } from '../entities/Customer';

export interface ICustomerRepository {
  findAll(): Promise<Customer[]>;
  findById(id: number): Promise<Customer | null>;
  create(customer: Customer): Promise<void>;
  update(id: number, data: Partial<Customer>): Promise<void>;
  softDelete(id: number): Promise<void>;
}
