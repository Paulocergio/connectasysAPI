import { IProductRepository } from "../../domain/repositories/IProductRepository";
import { Product } from "../../domain/entities/ productentity";
import { db } from "../../../../infrastructure/database/database";

export class ProductRepository implements IProductRepository {


  async create(product: Product): Promise<Product> {
    const result = await db.query(
      `INSERT INTO products (product_name, barcode, description, cost_price, sale_price, profit_margin)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [
        product.product_name,
        product.barcode,
        product.description,
        product.cost_price,
        product.sale_price,
        product.profit_margin
      ]
    );
    return result.rows[0];
  }

  async findAll(): Promise<Product[]> {
    const result = await db.query(`SELECT * FROM products WHERE deleted_at IS NULL`);
    return result.rows;
  }


  async findByBarcode(barcode: string): Promise<Product | null> {
    const result = await db.query("SELECT * FROM products WHERE barcode = $1", [barcode]);
    return result.rows[0] || null;
  }

  async update(id: number, data: Partial<Product>): Promise<void> {
    const fields = [];
    const values = [];
    let index = 1;
    // Verifica se deve recalcular a margem
    if (
      data.cost_price !== undefined &&
      data.sale_price !== undefined &&
      data.cost_price > 0
    ) {
      const profitMargin = ((data.sale_price - data.cost_price) / data.cost_price) * 100;
      fields.push(`profit_margin = $${index}`);
      values.push(profitMargin);
      index++;
    } else if (
      data.cost_price !== undefined ||
      data.sale_price !== undefined
    ) {
      // Se apenas um dos dois foi alterado, zera a margem
      fields.push(`profit_margin = $${index}`);
      values.push(null);
      index++;
    }

    for (const key in data) {
      fields.push(`${this.toSnakeCase(key)} = $${index}`);
      values.push((data as any)[key]);
      index++;
    }

    values.push(id);
    const query = `
    UPDATE products 
    SET ${fields.join(', ')}, updated_at = NOW()
    WHERE product_id  = $${index} AND deleted_at IS NULL
  `;

    await db.query(query, values);
  }

  private toSnakeCase(str: string): string {
    return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
  }


  async delete(id: number): Promise<void> {
    await db.query(
      `UPDATE products SET deleted_at = NOW() WHERE product_id = $1 AND deleted_at IS NULL`,
      [id]
    );
  }


  async incrementQuantity(productId: number, quantity: number): Promise<void> {
    await db.query(
      `UPDATE products SET quantity = quantity + $1 WHERE product_id = $2`,
      [quantity, productId]
    );
  }

  async decrementQuantity(productId: number, quantity: number): Promise<void> {
    await db.query(
      `UPDATE products SET quantity = quantity - $1 WHERE product_id = $2`,
      [quantity, productId]
    );
  }

  async getQuantity(productId: number): Promise<number> {
    const result = await db.query(
      `SELECT quantity FROM products WHERE product_id = $1`,
      [productId]
    );
    return result.rows[0]?.quantity ?? 0;
  }





}



