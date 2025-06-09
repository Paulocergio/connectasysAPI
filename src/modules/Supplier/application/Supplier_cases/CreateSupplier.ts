import { Supplier } from '../../domain/entities/Supplier';
import { ISupplierRepository } from '../../domain/repositories/ISupplierRepository';

export class CreateSupplier {
  constructor(private repo: ISupplierRepository) {}

  async execute(data: Omit<Supplier, 'id' | 'createdAt' | 'updatedAt'>) {
    const supplier = new Supplier(0, data.companyName, data.contactName, data.email, data.phone, data.address,
      data.city, data.state, data.zipCode, data.country, data.taxId, data.isActive);
    await this.repo.create(supplier);
  }
}
