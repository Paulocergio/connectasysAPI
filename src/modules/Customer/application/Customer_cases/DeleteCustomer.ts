import { ICustomerRepository } from '../../domain/repositories/ICustomerRepository';

export class DeleteCustomer {
  constructor(private repo: ICustomerRepository) {}

  async execute(id: number) {
    await this.repo.softDelete(id);
  }
}
