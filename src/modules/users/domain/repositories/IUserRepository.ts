import { User } from '../entities/User';

export interface IUserRepository {
  findAll(): Promise<User[]>;
  create(user: User): Promise<void>;
}
