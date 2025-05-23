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
    const { firstName, lastName, email } = req.body;
    await createUser.execute(firstName, lastName, email);
    res.status(201).send({ message: 'Usuário criado' });
  }
}
