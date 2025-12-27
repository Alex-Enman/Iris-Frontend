// Cart actions component
// Provides action buttons for cart operations

import React from 'react';
import { Button } from '@components/ui/button';
import { Cart } from '@/types';
import { useLanguage } from '@contexts/LanguageContext';

interface CartActionsProps {
  cart: Cart;
  onCheckout?: () => void;
  onClearCart?: () => void;
  onContinueShopping?: () => void;
  onSaveForLater?: (itemId: string) => void;
  loading?: boolean;
}

export function CartActions({
  cart,
  onCheckout,
  onClearCart,
  onContinueShopping,
  onSaveForLater,
  loading = false,
}: CartActionsProps) {
  const { t } = useLanguage();
  const hasItems = cart.items.length > 0;

  return (
    <div className='flex w-full flex-col gap-2 sm:flex-row'>
      {onContinueShopping && (
        <Button
          variant='outline'
          onClick={onContinueShopping}
          className='flex-1'
        >
          {t('continueShopping')}
        </Button>
      )}

      {onClearCart && hasItems && (
        <Button
          variant='outline'
          onClick={onClearCart}
          className='flex-1'
          disabled={loading}
        >
          {t('clearCart')}
        </Button>
      )}

      {onCheckout && (
        <Button
          onClick={onCheckout}
          className='flex-1'
          disabled={!hasItems || loading}
        >
          {loading ? t('processingEllipsis') : t('checkout')}
        </Button>
      )}
    </div>
  );
}
