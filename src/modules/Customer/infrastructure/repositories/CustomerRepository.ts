import { db } from '../../../../infrastructure/database/database';
import { Customer } from '../../domain/entities/Customer';
import { ICustomerRepository } from '../../domain/repositories/ICustomerRepository';

export class CustomerRepository implements ICustomerRepository {
  async findAll(): Promise<Customer[]> {
    const result = await db.query('SELECT * FROM customers WHERE deleted_at IS NULL');
    return result.rows.map((r: any) =>
      new Customer(
        r.id, r.first_name, r.last_name, r.email, r.phone,
        r.document_number, r.address, r.is_active, r.deleted_at,
        r.created_at, r.updated_at
      )
    );
  }

  async findById(id: number): Promise<Customer | null> {
    const result = await db.query('SELECT * FROM customers WHERE id = $1 AND deleted_at IS NULL', [id]);
    if (result.rows.length === 0) return null;
    const r = result.rows[0];
    return new Customer(
      r.id, r.first_name, r.last_name, r.email, r.phone,
      r.document_number, r.address, r.is_active, r.deleted_at,
      r.created_at, r.updated_at
    );
  }

  async create(customer: Customer): Promise<void> {
    await db.query(
      `INSERT INTO customers (first_name, last_name, email, phone, document_number, address, is_active) 
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [customer.firstName, customer.lastName, customer.email, customer.phone, customer.documentNumber, customer.address, customer.isActive]
    );
  }

  async update(id: number, data: Partial<Customer>): Promise<void> {
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
      UPDATE customers 
      SET ${fields.join(', ')}, updated_at = NOW()
      WHERE id = $${paramIndex} AND deleted_at IS NULL
    `;

    await db.query(query, values);
  }

  async softDelete(id: number): Promise<void> {
    await db.query(
      `UPDATE customers SET deleted_at = NOW() WHERE id = $1 AND deleted_at IS NULL`,
      [id]
    );
  }

  private toSnakeCase(str: string): string {
    return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
  }
}
