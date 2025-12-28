'use client';

// Hook to wrap supplier product service from lib
// This allows components to use this functionality through hooks instead of directly from lib
import { updateSupplierProduct as libUpdateSupplierProduct } from '@/lib/data/services/suppliers/supplier-product-service';
import type { Product } from '@/types/suppliers/supplier-dashboard/types';

export function useSupplierProduct() {
  return {
    updateSupplierProduct: libUpdateSupplierProduct,
  };
}

// Direct export for convenience
export { updateSupplierProduct } from '@/lib/data/services/suppliers/supplier-product-service';

