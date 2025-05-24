import { ICustomerRepository } from '../../domain/repositories/ICustomerRepository';
import { Customer } from '../../domain/entities/Customer';

export class UpdateCustomer {
  constructor(private repo: ICustomerRepository) {}

  async execute(id: number, data: Partial<Customer>) {
    await this.repo.update(id, data);
  }
}
