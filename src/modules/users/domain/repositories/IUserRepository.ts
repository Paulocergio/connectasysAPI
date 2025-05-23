import { User } from '../entities/User';

export interface IUserRepository {
  findAll(): Promise<User[]>;
  create(user: User): Promise<void>;
  softDelete(id: number): Promise<void>;  
  update(id: number, data: Partial<User>): Promise<void>;

}
