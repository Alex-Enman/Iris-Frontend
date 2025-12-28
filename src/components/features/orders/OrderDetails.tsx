'use client';

// Order details component for orders page

import { Button } from '@components/ui/button';
import { Badge } from '@components/ui/badge';
import { Progress } from '@components/ui/progress';
import { Card } from '@components/ui/card';
import {
  Package,
  Calendar,
  DollarSign,
  Download,
  MessageCircle,
  Heart,
  Phone,
  Mail,
  Truck,
  Clock,
  CheckCircle,
  AlertCircle,
  Store,
  MapPin,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { Order } from '@/types/orders/types';
import { useLanguage } from '@contexts/LanguageContext';
import { normalizeOrderStatusId } from '@hooks/data/orders/use-order-status';

interface OrderDetailsProps {
  order: Order;
  isExpanded: boolean;
  isFavorite: boolean;
  onToggleExpanded: () => void;
  onToggleFavorite: () => void;
  onViewSupplier?: (supplierId: string) => void;
}

export function OrderDetails({
  order,
  isExpanded,
  isFavorite,
  onToggleExpanded,
  onToggleFavorite,
  onViewSupplier,
}: OrderDetailsProps) {
  const { t } = useLanguage();

  const normalizedStatus = normalizeOrderStatusId(order.status);

  const getStatusIcon = (status: string) => {
    switch (normalizeOrderStatusId(status)) {
      case 'processing':
        return <Clock className='h-4 w-4' />;
      case 'confirmed':
        return <CheckCircle className='h-4 w-4' />;
      case 'inTransit':
        return <Truck className='h-4 w-4' />;
      case 'delivered':
        return <CheckCircle className='h-4 w-4' />;
      case 'draft':
        return <AlertCircle className='h-4 w-4' />;
      case 'reorder':
        return <Package className='h-4 w-4' />;
      default:
        return <Package className='h-4 w-4' />;
    }
  };

  const getStatusLabelKey = (status: string) => {
    switch (normalizeOrderStatusId(status)) {
      case 'processing':
        return 'processing';
      case 'confirmed':
        return 'confirmed';
      case 'inTransit':
        return 'inTransit';
      case 'delivered':
        return 'delivered';
      case 'draft':
        return 'draft';
      default:
        return null;
    }
  };

  const statusKey = getStatusLabelKey(order.status);
  const statusLabel = statusKey ? t(statusKey) : order.status;

  const paymentStatusLabel =
    order.paymentStatus?.toLowerCase() === 'paid'
      ? t('paid')
      : order.paymentStatus;

  return (
    <Card className='overflow-hidden'>
      <div className='p-6'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-4'>
            <div className='flex items-center space-x-2'>
              {getStatusIcon(normalizedStatus)}
              <div>
                <h3 className='text-lg font-semibold'>{order.orderNumber}</h3>
                <p className='text-sm text-muted-foreground'>
                  {order.supplier}
                </p>
              </div>
            </div>
            <Badge className={order.statusColor}>{statusLabel}</Badge>
            {order.progress > 0 && (
              <div className='flex items-center space-x-2'>
                <Progress value={order.progress} className='w-20' />
                <span className='text-sm text-muted-foreground'>
                  {order.progress}%
                </span>
              </div>
            )}
          </div>

          <div className='flex items-center space-x-2'>
            <div className='text-right'>
              <p className='text-lg font-semibold'>kr{order.total.toFixed(2)}</p>
              <p className='text-sm text-muted-foreground'>{order.date}</p>
            </div>
            <div className='flex items-center space-x-1'>
              <Button
                variant='ghost'
                size='sm'
                onClick={onToggleFavorite}
                className={
                  isFavorite ? 'text-red-500' : 'text-muted-foreground'
                }
              >
                <Heart
                  className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`}
                />
              </Button>
              <Button variant='ghost' size='sm' onClick={onToggleExpanded}>
                {isExpanded ? (
                  <ChevronUp className='h-4 w-4' />
                ) : (
                  <ChevronDown className='h-4 w-4' />
                )}
              </Button>
            </div>
          </div>
        </div>

        {isExpanded && (
          <div className='mt-6 space-y-6 border-t pt-6'>
            {/* Order Items */}
            <div>
              <h4 className='mb-3 font-medium'>{t('orderItems')}</h4>
              <div className='space-y-2'>
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className='flex items-center justify-between border-b border-gray-100 py-2 last:border-b-0'
                  >
                    <div>
                      <p className='font-medium'>{item.name}</p>
                      <p className='text-sm text-muted-foreground'>
                        {item.quantity}
                      </p>
                    </div>
                    <p className='font-medium'>kr{item.price.toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Information */}
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              <div>
                <h4 className='mb-3 font-medium'>{t('deliveryInformation')}</h4>
                <div className='space-y-2'>
                  <div className='flex items-center space-x-2'>
                    <MapPin className='h-4 w-4 text-muted-foreground' />
                    <span className='text-sm'>{order.deliveryAddress}</span>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <Calendar className='h-4 w-4 text-muted-foreground' />
                    <span className='text-sm'>{order.estimatedDelivery}</span>
                  </div>
                  {order.trackingNumber && (
                    <div className='flex items-center space-x-2'>
                      <Truck className='h-4 w-4 text-muted-foreground' />
                      <span className='text-sm'>
                        {t('tracking')}: {order.trackingNumber}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h4 className='mb-3 font-medium'>{t('paymentAndStatus')}</h4>
                <div className='space-y-2'>
                  <div className='flex items-center space-x-2'>
                    <DollarSign className='h-4 w-4 text-muted-foreground' />
                    <span className='text-sm'>
                      {t('paymentStatus')}: {paymentStatusLabel}
                    </span>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <Package className='h-4 w-4 text-muted-foreground' />
                    <span className='text-sm'>
                      {t('itemsLabel')}: {order.items.length}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Supplier Contact */}
            <div>
              <h4 className='mb-3 font-medium'>{t('supplierContact')}</h4>
              <div className='flex items-center space-x-4'>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => onViewSupplier?.(order.supplierId.toString())}
                >
                  <Store className='mr-2 h-4 w-4' />
                  {t('viewSupplier')}
                </Button>
                <Button variant='outline' size='sm'>
                  <Phone className='mr-2 h-4 w-4' />
                  {t('callAction')}
                </Button>
                <Button variant='outline' size='sm'>
                  <Mail className='mr-2 h-4 w-4' />
                  {t('emailAction')}
                </Button>
                <Button variant='outline' size='sm'>
                  <MessageCircle className='mr-2 h-4 w-4' />
                  {t('message')}
                </Button>
              </div>
            </div>

            {/* Notes */}
            {order.notes && (
              <div>
                <h4 className='mb-2 font-medium'>{t('notes')}</h4>
                <p className='rounded bg-gray-50 p-3 text-sm text-muted-foreground'>
                  {order.notes}
                </p>
              </div>
            )}

            {/* Actions */}
            <div className='flex items-center justify-between border-t pt-4'>
              <div className='flex items-center space-x-2'>
                <Button variant='outline' size='sm'>
                  <Download className='mr-2 h-4 w-4' />
                  {t('downloadInvoice')}
                </Button>
                {statusKey === 'delivered' && (
                  <Button variant='outline' size='sm'>
                    {t('reorder')}
                  </Button>
                )}
              </div>
              <div className='text-sm text-muted-foreground'>
                {t('orderIdLabel')}: {order.id}
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
