import { Request, Response } from 'express';
import { CustomerRepository } from '../../infrastructure/repositories/CustomerRepository';
import { CreateCustomer } from '../../application/Customer_cases/CreateCustomer';
import { UpdateCustomer } from '../../application/Customer_cases/UpdateCustomer';
import { DeleteCustomer } from '../../application/Customer_cases/DeleteCustomer';

const repo = new CustomerRepository();
const createCustomer = new CreateCustomer(repo);
const updateCustomer = new UpdateCustomer(repo);
const deleteCustomer = new DeleteCustomer(repo);

export class CustomerController {
  static async getAll(req: Request, res: Response) {
    const customers = await repo.findAll();
    res.json(customers);
  }

  static async create(req: Request, res: Response) {
    const { firstName, lastName, email, phone, documentNumber, address, isActive } = req.body;
    try {
      await createCustomer.execute(firstName, lastName, email, phone, documentNumber, address, isActive);
      res.status(201).json({ message: 'Cliente criado com sucesso' });
    } catch (error: any) {
      if (error.code === '23505') {
        res.status(409).json({ error: 'Email já está em uso' });
      } else {
        console.error('[CustomerController.create]', error);
        res.status(500).json({ error: 'Erro ao criar cliente' });
      }
    }
  }

  static async update(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const data = req.body;

    try {
      await updateCustomer.execute(id, data);
      res.status(200).json({ message: `Cliente ${id} atualizado com sucesso` });
    } catch (error) {
      console.error('[CustomerController.update]', error);
      res.status(500).json({ error: 'Erro ao atualizar cliente' });
    }
  }

  static async delete(req: Request, res: Response) {
    const id = parseInt(req.params.id);

    try {
      await deleteCustomer.execute(id);
      res.status(200).json({ message: `Cliente ${id} deletado (lógico)` });
    } catch (error) {
      console.error('[CustomerController.delete]', error);
      res.status(500).json({ error: 'Erro ao deletar cliente' });
    }
  }
}
