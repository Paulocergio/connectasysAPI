import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { User } from '../../domain/entities/User';

export class CreateUser {
  constructor(private userRepository: IUserRepository) { }

  async execute(firstName: string, lastName: string, email: string, phone?: string, password?: string, isActive?: boolean) {
    const user = new User(0, firstName, lastName, email, new Date(), phone, password, isActive);
    await this.userRepository.create(user);
  }

}
