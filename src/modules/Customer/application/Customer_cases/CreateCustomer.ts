import { ICustomerRepository } from '../../domain/repositories/ICustomerRepository';
import { Customer } from '../../domain/entities/Customer';

export class CreateCustomer {
  constructor(private repo: ICustomerRepository) {}

  async execute(
    firstName: string,
    lastName: string,
    email: string,
    phone?: string,
    documentNumber?: string,
    address?: string,
    isActive: boolean = true
  ) {
    const customer = new Customer(0, firstName, lastName, email, phone, documentNumber, address, isActive);
    await this.repo.create(customer);
  }
}
