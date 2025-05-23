import { db } from '../../../../infrastructure/database/database';
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { User } from '../../domain/entities/User';

export class UserRepository implements IUserRepository {
  async findAll(): Promise<User[]> {
    const result = await db.query('SELECT * FROM users');
    return result.rows.map(
      (r: any) =>
        new User(
          r.id,
          r.first_name,
          r.last_name,
          r.email,
          r.created_at,
          r.phone,
          r.password,
          r.is_active,
          r.deleted_at
        )
    );

  }


  async create(user: User): Promise<void> {
    await db.query(
      `INSERT INTO users (first_name, last_name, email, phone, password, is_active) 
   VALUES ($1, $2, $3, $4, $5, $6)`,
      [user.firstName, user.lastName, user.email, user.phone, user.password, user.isActive]
    );

  }
}
