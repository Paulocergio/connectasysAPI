import { Request, Response } from 'express';
import { UserRepository } from '../../infrastructure/repositories/UserRepository';
import { CreateUser } from '../../application/use_cases/CreateUser';

const userRepository = new UserRepository();
const createUser = new CreateUser(userRepository);

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


}
