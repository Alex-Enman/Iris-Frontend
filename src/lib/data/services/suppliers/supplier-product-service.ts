import type { Product } from '@/types/suppliers/supplier-dashboard/types';

export async function createSupplierProduct(_product: Product): Promise<void> {
  return;
}

export async function updateSupplierProduct(
  _id: string,
  _product: Partial<Product>
): Promise<void> {
  return;
}

export async function deleteSupplierProduct(_id: string): Promise<void> {
  return;
}
