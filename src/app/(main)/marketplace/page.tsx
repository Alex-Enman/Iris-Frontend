'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { MarketplacePage } from '@components/features/marketplace/MarketplacePage';

export default function MarketplaceRoutePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleNavigateToProduct = (productId: string) => {
    router.push(`/products/${encodeURIComponent(productId)}`);
  };

  const handleViewSupplier = (supplierId: string) => {
    const next = new URLSearchParams(searchParams.toString());
    next.set('supplierId', supplierId);
    router.push(`/suppliers?${next.toString()}`);
  };

  return (
    <MarketplacePage
      onNavigateToProduct={handleNavigateToProduct}
      onViewSupplier={handleViewSupplier}
    />
  );
}
