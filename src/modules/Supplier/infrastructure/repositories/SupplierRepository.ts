import { db } from '../../../../infrastructure/database/database';
import { Supplier } from '../../domain/entities/Supplier';
import { ISupplierRepository } from '../../domain/repositories/ISupplierRepository';

export class SupplierRepository implements ISupplierRepository {
  async findAll(): Promise<Supplier[]> {
    const result = await db.query('SELECT * FROM suppliers WHERE deleted_at IS NULL');
    return result.rows.map((r: any) =>
      new Supplier(
        r.id,
        r.company_name,
        r.contact_name,
        r.email,
        r.phone,
        r.address,
        r.city,
        r.state,
        r.zip_code,
        r.country,
        r.tax_id,
        r.is_active,
        r.created_at,
        r.updated_at
      )
    );
  }


  async findById(id: number): Promise<Supplier | null> {
    const result = await db.query('SELECT * FROM suppliers WHERE id = $1', [id]);
    if (result.rows.length === 0) return null;
    const r = result.rows[0];
    return new Supplier(
      r.id, r.company_name, r.contact_name, r.email, r.phone, r.address,
      r.city, r.state, r.zip_code, r.country, r.tax_id,
      r.is_active, r.created_at, r.updated_at
    );
  }

  async create(s: Supplier): Promise<void> {
    await db.query(
      `INSERT INTO suppliers (
        company_name, contact_name, email, phone, address, city, state,
        zip_code, country, tax_id, is_active
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)`,
      [
        s.companyName, s.contactName, s.email, s.phone, s.address, s.city,
        s.state, s.zipCode, s.country, s.taxId, s.isActive
      ]
    );
  }

  async update(id: number, data: Partial<Supplier>): Promise<void> {
    const fields = [];
    const values = [];
    let index = 1;

    for (const key in data) {
      const value = (data as any)[key];
      if (value !== undefined && value !== null) {
        fields.push(`${this.toSnakeCase(key)} = $${index}`);
        values.push(value);
        index++;
      }
    }

    if (fields.length === 0) return;

    values.push(id);

    const query = `
    UPDATE suppliers
    SET ${fields.join(', ')}, updated_at = NOW()
    WHERE id = $${index}
  `;

    await db.query(query, values);
  }

 async delete(id: number): Promise<string> {
  const result = await db.query('SELECT deleted_at FROM suppliers WHERE id = $1', [id]);

  if (result.rows.length === 0) {
    return 'NOT_FOUND';
  }

  if (result.rows[0].deleted_at !== null) {
    return 'ALREADY_DELETED';
  }

  await db.query('UPDATE suppliers SET deleted_at = NOW() WHERE id = $1', [id]);
  return 'SUCCESS';
}



  private toSnakeCase(str: string): string {
    return str.replace(/[A-Z]/g, l => `_${l.toLowerCase()}`);
  }
}
