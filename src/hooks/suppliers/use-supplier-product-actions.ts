'use client';

import { useMutation } from '@tanstack/react-query';
import type { Product } from '@/types/suppliers/supplier-dashboard/types';
import {
  createSupplierProduct,
  deleteSupplierProduct,
  updateSupplierProduct,
} from '@/lib/data/services/suppliers/supplier-product-service';

export function useSupplierProductActions() {
  const createProductMutation = useMutation({
    mutationFn: async (input: { product: Product }) => {
      await createSupplierProduct(input.product);
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: async (input: { id: string; product: Partial<Product> }) => {
      await updateSupplierProduct(input.id, input.product);
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: async (input: { id: string }) => {
      await deleteSupplierProduct(input.id);
    },
  });

  return {
    createProduct: createProductMutation.mutateAsync,
    updateProduct: updateProductMutation.mutateAsync,
    deleteProduct: deleteProductMutation.mutateAsync,
    createProductMutation,
    updateProductMutation,
    deleteProductMutation,
  };
}
