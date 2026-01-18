'use client';

import { useRouter } from 'next/navigation';
import { ProductPage } from '@components/features/products';

export default function ProductDetailsRoutePage({
  params,
}: {
  params: { productId: string };
}) {
  const router = useRouter();

  return (
    <ProductPage
      productId={params.productId}
      onAddToCart={() => {
        router.push('/cart');
      }}
    />
  );
}
