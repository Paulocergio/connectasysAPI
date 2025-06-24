export interface CreateProductDTO {
  product_name: string;
  barcode: string;
  description?: string;
  quantity?: number;
  cost_price?: number;
  sale_price?: number;
}
