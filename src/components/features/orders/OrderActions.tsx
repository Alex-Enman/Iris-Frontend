// Order actions component
// Provides action buttons for orders

import React from 'react';
import { Button } from '@components/ui/button';
import { OrderStatus as OrderStatusType } from '@/types';
import { useLanguage } from '@contexts/LanguageContext';

interface OrderActionsProps {
  orderId: string;
  status: OrderStatusType;
  onViewDetails?: (orderId: string) => void;
  onCancel?: (orderId: string) => void;
  onTrack?: (orderId: string) => void;
  onReorder?: (orderId: string) => void;
}

export function OrderActions({
  orderId,
  status,
  onViewDetails,
  onCancel,
  onTrack,
  onReorder,
}: OrderActionsProps) {
  const { t } = useLanguage();
  const canCancel = status === 'pending' || status === 'confirmed';
  const canTrack = status === 'shipped' || status === 'delivered';
  const canReorder = status === 'delivered';

  return (
    <div className='flex gap-2'>
      {onViewDetails && (
        <Button
          variant='outline'
          size='sm'
          onClick={() => onViewDetails(orderId)}
        >
          {t('viewDetails')}
        </Button>
      )}

      {canCancel && onCancel && (
        <Button
          variant='destructive'
          size='sm'
          onClick={() => onCancel(orderId)}
        >
          {t('cancelOrder')}
        </Button>
      )}

      {canTrack && onTrack && (
        <Button variant='outline' size='sm' onClick={() => onTrack(orderId)}>
          {t('trackOrder')}
        </Button>
      )}

      {canReorder && onReorder && (
        <Button variant='default' size='sm' onClick={() => onReorder(orderId)}>
          {t('reorder')}
        </Button>
      )}
    </div>
  );
}
