import { ISupplierRepository } from '../../domain/repositories/ISupplierRepository';

export class DeleteSupplier {
  constructor(private readonly supplierRepository: ISupplierRepository) {}

  async execute(id: number): Promise<string> {
    return await this.supplierRepository.delete(id);
  }
}
