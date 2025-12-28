'use client';

// Hook to wrap order status normalization from lib
// This allows components to use this functionality through hooks instead of directly from lib
import { normalizeOrderStatusId as libNormalizeOrderStatusId } from '@/lib/data/repositories/orders/normalize-order-status';

export function useOrderStatus() {
  return {
    normalizeOrderStatusId: libNormalizeOrderStatusId,
  };
}

// Direct export for convenience
export { normalizeOrderStatusId } from '@/lib/data/repositories/orders/normalize-order-status';

