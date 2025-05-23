import { Request, Response } from 'express';
import { UserRepository } from '../../infrastructure/repositories/UserRepository';
import { CreateUser } from '../../application/use_cases/CreateUser';
import { DeleteUser } from '../../application/use_cases/DeleteUser';
import { UpdateUser } from '../../application/use_cases/UpdateUser';


const userRepository = new UserRepository();
const createUser = new CreateUser(userRepository);
const deleteUser = new DeleteUser(userRepository);
const updateUser = new UpdateUser(userRepository);



export class UserController {
  static async getAll(req: Request, res: Response) {
    const users = await userRepository.findAll();
    res.json(users);
  }

  static async create(req: Request, res: Response) {
    const { firstName, lastName, email, phone, password, isActive } = req.body;

    try {
      await createUser.execute(firstName, lastName, email, phone, password, isActive);
      res.status(201).json({ message: 'Usuário criado com sucesso' });

    } catch (error: any) {
      if (error.code === '23505') {
        res.status(409).json({ error: 'Email já está em uso' });
      } else {
        console.error('[UserController.create]', error);
        res.status(500).json({ error: 'Erro ao criar usuário' });
      }
    }
  }

  static async delete(req: Request, res: Response) {
    const id = parseInt(req.params.id);

    try {
      await deleteUser.execute(id);
      res.status(200).json({ message: `Usuário ${id} deletado (lógico)` });
    } catch (error) {
      console.error('[UserController.delete]', error);
      res.status(500).json({ error: 'Erro ao deletar usuário' });
    }
  }
  static async update(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  const data = req.body;

  try {
    await updateUser.execute(id, data);
    res.status(200).json({ message: `Usuário ${id} atualizado com sucesso` });
  } catch (error: any) {
    if (error.code === '23505') {
      res.status(409).json({ error: 'E-mail já está em uso por outro usuário' });
    } else {
      console.error('[UserController.update]', error);
      res.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
  }
}

 
}



