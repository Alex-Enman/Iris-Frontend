// Order status component
// Displays order status with appropriate styling

import React from 'react';
import { Badge } from '@components/ui/badge';
import { OrderStatus as OrderStatusType } from '@/types';
import { useLanguage } from '@contexts/LanguageContext';

interface OrderStatusProps {
  status: OrderStatusType;
  className?: string;
}

const VARIANT_MAP: Record<
  OrderStatusType,
  'default' | 'secondary' | 'destructive'
> = {
  pending: 'secondary',
  confirmed: 'default',
  preparing: 'default',
  shipped: 'default',
  delivered: 'default',
  cancelled: 'destructive',
  returned: 'secondary',
};

export function OrderStatus(props: OrderStatusProps) {
  const { t } = useLanguage();
  const { status, className } = props;
  const variant = VARIANT_MAP[status] ?? 'secondary';
  const label = t(status) ?? status;
  return (
    <Badge variant={variant} className={className}>
      {label}
    </Badge>
  );
}
