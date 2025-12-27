// Order card component
// Displays order information in a card format

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { Badge } from '@components/ui/badge';
import { Order } from '@/types';
import { useLanguage } from '@contexts/LanguageContext';

interface OrderCardProps {
  order: Order;
  onViewDetails?: (orderId: string) => void;
  onCancel?: (orderId: string) => void;
}

export function OrderCard({ order, onViewDetails, onCancel }: OrderCardProps) {
  const { t, locale } = useLanguage();
  const statusLabel = (t(order.status as any) as string) ?? order.status;

  return (
    <Card className='w-full'>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <CardTitle className='text-lg'>
            {t('orderNumberPrefix')} #{order.id}
          </CardTitle>
          <Badge
            variant={order.status === 'delivered' ? 'default' : 'secondary'}
          >
            {statusLabel}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className='space-y-2'>
          <p className='text-sm text-muted-foreground'>
            {t('createdLabel')}: {new Date(order.createdAt).toLocaleDateString(locale)}
          </p>
          <p className='text-sm'>
            {t('totalLabel')}: ${order.total.toFixed(2)}
          </p>
          <p className='text-sm'>
            {t('itemsLabel')}: {order.items.length}
          </p>
        </div>
        <div className='mt-4 flex gap-2'>
          {onViewDetails && (
            <button
              onClick={() => onViewDetails(order.id)}
              className='text-sm text-blue-600 hover:underline'
            >
              {t('viewDetails')}
            </button>
          )}
          {onCancel && order.status === 'pending' && (
            <button
              onClick={() => onCancel(order.id)}
              className='text-sm text-red-600 hover:underline'
            >
              {t('cancel')}
            </button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
