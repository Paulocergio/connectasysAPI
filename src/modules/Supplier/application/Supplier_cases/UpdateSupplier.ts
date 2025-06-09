import { Supplier } from '../../domain/entities/Supplier';
import { ISupplierRepository } from '../../domain/repositories/ISupplierRepository';

export class UpdateSupplier {
  constructor(private repo: ISupplierRepository) {}

  async execute(id: number, data: Partial<Supplier>) {
    await this.repo.update(id, data);
  }
}
