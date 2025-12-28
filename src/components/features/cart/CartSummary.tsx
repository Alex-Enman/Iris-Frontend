// Cart summary component
// Displays cart totals and summary

import React from 'react';
import { Button } from '@components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { Separator } from '@components/ui/separator';
import { Cart } from '@/types';
import { useLanguage } from '@contexts/LanguageContext';
import { formatCurrency } from '@/utils/formatters';

interface CartSummaryProps {
  cart: Cart;
  onCheckout?: () => void;
  onClearCart?: () => void;
}

export function CartSummary({
  cart,
  onCheckout,
  onClearCart,
}: CartSummaryProps) {
  const { t } = useLanguage();
  const subtotal = cart.items.reduce((total, item) => total + item.totalPrice, 0);
  const tax = subtotal * 0.08; // 8% tax
  const shipping = subtotal > 1000 ? 0 : 100; // Free shipping over kr1000
  const total = subtotal + tax + shipping;

  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle>{t('orderSummary')}</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='space-y-2'>
          <div className='flex justify-between text-sm'>
            <span>
              {t('subtotal')} ({cart.items.length}{' '}
              {cart.items.length === 1 ? t('item') : t('items')})
            </span>
            <span>{formatCurrency(subtotal, 'SEK')}</span>
          </div>

          <div className='flex justify-between text-sm'>
            <span>{t('tax')}</span>
            <span>{formatCurrency(tax, 'SEK')}</span>
          </div>

          <div className='flex justify-between text-sm'>
            <span>{t('shipping')}</span>
            <span>
              {shipping === 0 ? t('free') : formatCurrency(shipping, 'SEK')}
            </span>
          </div>

          {shipping > 0 && (
            <p className='text-xs text-muted-foreground'>
              {t('addMoreForFreeShippingPrefix')}{' '}
              {formatCurrency(1000 - subtotal, 'SEK')}{' '}
              {t('addMoreForFreeShippingSuffix')}
            </p>
          )}
        </div>

        <Separator />

        <div className='flex justify-between font-medium'>
          <span>{t('total')}</span>
          <span>{formatCurrency(total, 'SEK')}</span>
        </div>

        <div className='space-y-2 pt-4'>
          {onCheckout && (
            <Button
              onClick={onCheckout}
              className='w-full'
              disabled={cart.items.length === 0}
            >
              {t('proceedToCheckout')}
            </Button>
          )}

          {onClearCart && cart.items.length > 0 && (
            <Button variant='outline' onClick={onClearCart} className='w-full'>
              {t('clearCart')}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
