import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { User } from '../../domain/entities/User';

export class UpdateUser {
  constructor(private repo: IUserRepository) {}

  async execute(id: number, data: Partial<User>) {
    await this.repo.update(id, data);
  }
}
