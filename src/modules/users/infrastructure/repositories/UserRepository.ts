import { db } from '../../../../infrastructure/database/database';
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { User } from '../../domain/entities/User';

export class UserRepository implements IUserRepository {

  async softDelete(id: number): Promise<void> {
    await db.query(
      `UPDATE users SET deleted_at = NOW() WHERE id = $1 AND deleted_at IS NULL`,
      [id]
    );
  }

 async findAll(): Promise<User[]> {
  const result = await db.query(
    'SELECT * FROM users WHERE deleted_at IS NULL'
  );

  return result.rows.map((r: any) =>
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


  async update(id: number, data: Partial<User>): Promise<void> {
    const fields = [];
    const values = [];
    let paramIndex = 1;

    for (const key in data) {
      fields.push(`${this.toSnakeCase(key)} = $${paramIndex}`);
      values.push((data as any)[key]);
      paramIndex++;
    }

    values.push(id);

    const query = `
    UPDATE users 
    SET ${fields.join(', ')}, updated_at = NOW()
    WHERE id = $${paramIndex} AND deleted_at IS NULL
  `;

    await db.query(query, values);
  }

  private toSnakeCase(str: string): string {
    return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
  }

}
