export interface Product {
  product_id?: number;
  product_name: string;
  
  barcode: string;
  description?: string;
  quantity?: number;
  cost_price?: number;
  sale_price?: number;
 profit_margin?: number | null;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}
