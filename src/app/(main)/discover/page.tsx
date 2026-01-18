'use client';

import { useRouter } from 'next/navigation';
import { DiscoverPage } from '@components/features/discover/DiscoverPage';

export default function DiscoverRoutePage() {
  const router = useRouter();

  const handleNavigateToMarketplace = (queryString?: string) => {
    const next = `/marketplace${queryString ? `?${queryString}` : ''}`;
    router.push(next);
  };

  const handleViewSupplier = (supplierId: string) => {
    const sp = new URLSearchParams();
    sp.set('supplierId', supplierId);
    router.push(`/suppliers?${sp.toString()}`);
  };

  return (
    <DiscoverPage
      onNavigateToMarketplace={handleNavigateToMarketplace}
      onViewSupplier={handleViewSupplier}
    />
  );
}
