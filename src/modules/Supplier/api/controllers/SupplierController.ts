import { Request, Response } from 'express';
import { SupplierRepository } from '../../infrastructure/repositories/SupplierRepository';
import { CreateSupplier } from '../../application/Supplier_cases/CreateSupplier';
import { UpdateSupplier } from '../../application/Supplier_cases/UpdateSupplier';
import { DeleteSupplier } from '../../application/Supplier_cases/DeleteSupplier';

const repo = new SupplierRepository();
const create = new CreateSupplier(repo);
const update = new UpdateSupplier(repo);
const del = new DeleteSupplier(repo);

export class SupplierController {
  async getAll(req: Request, res: Response) {
    const data = await repo.findAll();
    res.json(data);
  }

  async create(req: Request, res: Response) {
    try {
      await create.execute(req.body);
      res.status(201).json({ message: 'Fornecedor criado com sucesso' });
    } catch (error: any) {
      if (error.code === '23505') {
        res.status(409).json({ error: 'Email já existe' });
      } else {
        console.error(error);
        res.status(500).json({ error: 'Erro ao criar fornecedor' });
      }
    }
  }

  async update(req: Request, res: Response) {
    try {
      await update.execute(Number(req.params.id), req.body);
      res.status(200).json({ message: 'Fornecedor atualizado' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao atualizar fornecedor' });
    }
  }

 async delete(req: Request, res: Response) {
  const id = Number(req.params.id);

  try {
    const result = await del.execute(id);

    if (result === 'NOT_FOUND') {
      return res.status(404).json({ error: 'Fornecedor não encontrado' });
    }

    if (result === 'ALREADY_DELETED') {
      return res.status(400).json({ error: 'Fornecedor já foi deletado anteriormente' });
    }

    return res.status(200).json({ message: 'Fornecedor deletado com sucesso' });

  } catch (error) {
    console.error('[SupplierController.delete]', error);
    res.status(500).json({ error: 'Erro ao deletar fornecedor' });
  }
}

}
