'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { SuppliersPage as SuppliersDirectory } from '@components/features/suppliers/SuppliersPage';
import { SupplierProfileView } from '@components/features/suppliers/SupplierProfileView';

export default function SuppliersRoutePage() {
  const searchParams = useSearchParams();
  const [selectedSupplierId, setSelectedSupplierId] = useState<string | null>(
    null
  );

  useEffect(() => {
    const supplierId = searchParams.get('supplierId');
    if (supplierId) setSelectedSupplierId(supplierId);
  }, [searchParams]);

  if (selectedSupplierId) {
    return (
      <SupplierProfileView
        supplierId={selectedSupplierId}
        onBack={() => setSelectedSupplierId(null)}
      />
    );
  }

  return (
    <SuppliersDirectory onViewSupplier={id => setSelectedSupplierId(id)} />
  );
}
