import { IUserRepository } from '../../domain/repositories/IUserRepository';

export class DeleteUser {
  constructor(private userRepository: IUserRepository) {}

  async execute(id: number) {
    await this.userRepository.softDelete(id);
  }
}
