'use client';

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@contexts/LanguageContext';
import { useParentOrder } from '@/hooks/data/use-parent-orders';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@components/ui/accordion';
import { EmptyState } from '@components/ui/empty-state';
import { LoadingSkeleton } from '@components/ui/loading-skeleton';
import { formatCurrency, formatDate, formatRelativeTime } from '@/utils/formatters';
import type { FulfillmentStatus, ParentOrder, ParentOrderItem } from '@/types/orders/parent-orders';
import { Package, Store, Calendar, ArrowLeft, Truck } from 'lucide-react';

function getParentStatusLabel(t: (key: any) => string, status: ParentOrder['status']) {
  switch (status) {
    case 'draft':
      return t('draft');
    case 'inProgress':
      return t('inProgress');
    case 'partiallyDelivered':
      return t('partiallyDelivered');
    case 'completed':
      return t('completed');
    case 'cancelled':
      return t('cancelled');
    default:
      return t('unknown');
  }
}

function getParentStatusClass(status: ParentOrder['status']) {
  switch (status) {
    case 'completed':
      return 'bg-primary/10 text-primary';
    case 'partiallyDelivered':
      return 'bg-accent text-accent-foreground';
    case 'inProgress':
      return 'bg-primary/10 text-primary';
    case 'draft':
      return 'bg-muted text-foreground';
    case 'cancelled':
      return 'bg-destructive/15 text-destructive';
    default:
      return 'bg-muted text-foreground';
  }
}

function getFulfillmentStatusClass(status: FulfillmentStatus) {
  switch (status) {
    case 'delivered':
      return 'bg-primary/10 text-primary';
    case 'inTransit':
      return 'bg-accent text-accent-foreground';
    case 'processing':
    case 'preparing':
    case 'confirmed':
      return 'bg-primary/10 text-primary';
    case 'cancelled':
      return 'bg-destructive/15 text-destructive';
    default:
      return 'bg-muted text-foreground';
  }
}

function getFulfillmentStatusLabel(t: (key: any) => string, status: FulfillmentStatus) {
  return t(status as any);
}

function formatQuantity(t: (key: any) => string, item: ParentOrderItem) {
  if (item.pricing.pricingMode === 'batch') {
    const w = item.pricing.batchWeightKg;
    if (typeof w === 'number' && Number.isFinite(w) && w > 0) {
      return `${item.quantity} ${t('batchUnitShort')} (${w} kg)`;
    }
    return `${item.quantity} ${t('batchUnitShort')}`;
  }

  return `${item.quantity} ${item.pricing.quantityUnit}`;
}

function formatUnitPrice(t: (key: any) => string, item: ParentOrderItem) {
  const suffix =
    item.pricing.pricingMode === 'batch'
      ? `/${t('batchUnitShort')}`
      : `/${item.pricing.quantityUnit}`;

  const base = formatCurrency(item.pricing.unitPrice, 'SEK');

  if (item.pricing.purchaseMode === 'offer') {
    const statusKey =
      item.pricing.offerStatus === 'accepted'
        ? 'offerAccepted'
        : item.pricing.offerStatus === 'rejected'
          ? 'offerRejected'
          : item.pricing.offerStatus === 'pending'
            ? 'offerPending'
            : 'purchaseModeOffer';
    return `${base}${suffix} · ${t(statusKey as any)}`;
  }

  return `${base}${suffix}`;
}

export interface OrderDetailsPageProps {
  orderId: string;
}

export function OrderDetailsPage({ orderId }: OrderDetailsPageProps) {
  const router = useRouter();
  const { t } = useLanguage();
  const orderQuery = useParentOrder(orderId);

  const order = orderQuery.data;

  const supplierCount = order?.fulfillments.length ?? 0;

  const paymentSummary = useMemo(() => {
    if (!order) return null;
    return {
      subtotal: order.subtotal,
      tax: order.tax,
      deliveryFee: order.deliveryFee,
      total: order.total,
      paymentStatus: order.payment.status,
      paymentMethod: order.payment.method,
      invoiceNumber: order.payment.invoiceNumber,
    };
  }, [order]);

  if (orderQuery.isLoading) {
    return (
      <div className='space-y-6'>
        <LoadingSkeleton variant='text' count={4} />
        <LoadingSkeleton variant='card' count={2} />
      </div>
    );
  }

  if (orderQuery.isError || !order) {
    return (
      <EmptyState
        variant='default'
        icon={Package}
        title={t('orderNotFoundTitle')}
        description={t('orderNotFoundDescription')}
        action={{
          label: t('backToOrders'),
          onClick: () => router.push('/orders'),
        }}
      />
    );
  }

  return (
    <div className='space-y-6'>
      <div className='flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between'>
        <div>
          <Button
            variant='ghost'
            className='mb-3 -ml-2 rounded-xl'
            onClick={() => router.push('/orders')}
          >
            <ArrowLeft className='mr-2 h-4 w-4' />
            {t('backToOrders')}
          </Button>

          <div className='flex flex-wrap items-center gap-3'>
            <h1 className='text-3xl font-bold tracking-tight'>{order.id}</h1>
            <Badge className={getParentStatusClass(order.status)}>
              {getParentStatusLabel(t, order.status)}
            </Badge>
          </div>

          <div className='mt-2 flex flex-wrap items-center gap-4 text-sm text-muted-foreground'>
            <div className='flex items-center gap-2'>
              <Calendar className='h-4 w-4' />
              {formatDate(order.placedAt)}
            </div>
            <div className='flex items-center gap-2'>
              <Store className='h-4 w-4' />
              {supplierCount} {supplierCount === 1 ? t('supplier') : t('suppliers')}
            </div>
          </div>
        </div>

        <Card className='w-full sm:w-[340px]'>
          <CardHeader>
            <CardTitle className='text-base'>{t('orderSummary')}</CardTitle>
          </CardHeader>
          <CardContent className='space-y-2 text-sm'>
            <div className='flex items-center justify-between'>
              <span className='text-muted-foreground'>{t('subtotal')}</span>
              <span>{formatCurrency(paymentSummary!.subtotal, 'SEK')}</span>
            </div>
            <div className='flex items-center justify-between'>
              <span className='text-muted-foreground'>{t('tax')}</span>
              <span>{formatCurrency(paymentSummary!.tax, 'SEK')}</span>
            </div>
            <div className='flex items-center justify-between'>
              <span className='text-muted-foreground'>{t('delivery')}</span>
              <span>{formatCurrency(paymentSummary!.deliveryFee, 'SEK')}</span>
            </div>
            <div className='border-t pt-2'>
              <div className='flex items-center justify-between font-medium'>
                <span>{t('totalLabel')}</span>
                <span>{formatCurrency(paymentSummary!.total, 'SEK')}</span>
              </div>
            </div>

            <div className='mt-3 rounded-xl bg-muted/40 p-3'>
              <div className='text-xs text-muted-foreground'>{t('paymentStatus')}</div>
              <div className='mt-1 font-medium'>{t(paymentSummary!.paymentStatus as any)}</div>
              {paymentSummary!.paymentMethod && (
                <div className='mt-1 text-xs text-muted-foreground'>
                  {paymentSummary!.paymentMethod}
                </div>
              )}
              {paymentSummary!.invoiceNumber && (
                <div className='mt-1 text-xs text-muted-foreground'>
                  {paymentSummary!.invoiceNumber}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className='text-base'>{t('supplierFulfillments')}</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type='multiple' className='w-full'>
            {order.fulfillments.map(f => (
              <AccordionItem key={f.id} value={f.id}>
                <AccordionTrigger>
                  <div className='flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
                    <div className='min-w-0'>
                      <div className='flex flex-wrap items-center gap-2'>
                        <button
                          className='line-clamp-1 text-left hover:underline'
                          onClick={e => {
                            e.preventDefault();
                            router.push(`/suppliers?supplierId=${encodeURIComponent(f.supplierId)}`);
                          }}
                        >
                          {f.supplierName}
                        </button>
                        <Badge className={getFulfillmentStatusClass(f.status)}>
                          {getFulfillmentStatusLabel(t, f.status)}
                        </Badge>
                      </div>
                      <div className='mt-1 flex flex-wrap items-center gap-3 text-xs text-muted-foreground'>
                        {f.eta && (
                          <span className='flex items-center gap-1'>
                            <Truck className='h-3.5 w-3.5' />
                            {t('estimatedDelivery')}: {formatRelativeTime(f.eta)}
                          </span>
                        )}
                        {f.deliveryWindow && <span>{f.deliveryWindow}</span>}
                      </div>
                    </div>
                    <div className='text-sm font-medium'>
                      {formatCurrency(f.total, 'SEK')}
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className='pt-3'>
                  <div className='space-y-4'>
                    <div className='rounded-xl border'>
                      <div className='grid grid-cols-12 gap-2 border-b bg-muted/30 px-4 py-2 text-xs font-medium text-muted-foreground'>
                        <div className='col-span-6'>{t('product')}</div>
                        <div className='col-span-3 text-right'>{t('quantity')}</div>
                        <div className='col-span-3 text-right'>{t('totalLabel')}</div>
                      </div>
                      <div className='divide-y'>
                        {f.items.map(item => (
                          <div
                            key={item.id}
                            className='grid grid-cols-12 gap-2 px-4 py-3 text-sm'
                          >
                            <div className='col-span-6 min-w-0'>
                              <div className='line-clamp-1 font-medium'>
                                {item.productName}
                              </div>
                              <div className='mt-1 text-xs text-muted-foreground'>
                                {formatUnitPrice(t, item)}
                              </div>
                            </div>
                            <div className='col-span-3 text-right text-muted-foreground'>
                              {formatQuantity(t, item)}
                            </div>
                            <div className='col-span-3 text-right font-medium'>
                              {formatCurrency(item.lineTotal, 'SEK')}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className='grid gap-3 rounded-xl border bg-muted/20 p-4 text-sm sm:grid-cols-2'>
                      <div className='flex items-center justify-between'>
                        <span className='text-muted-foreground'>{t('subtotal')}</span>
                        <span>{formatCurrency(f.subtotal, 'SEK')}</span>
                      </div>
                      <div className='flex items-center justify-between'>
                        <span className='text-muted-foreground'>{t('tax')}</span>
                        <span>{formatCurrency(f.tax, 'SEK')}</span>
                      </div>
                      <div className='flex items-center justify-between'>
                        <span className='text-muted-foreground'>{t('delivery')}</span>
                        <span>{formatCurrency(f.deliveryFee, 'SEK')}</span>
                      </div>
                      <div className='flex items-center justify-between font-medium'>
                        <span>{t('totalLabel')}</span>
                        <span>{formatCurrency(f.total, 'SEK')}</span>
                      </div>
                    </div>

                    {f.timeline && f.timeline.length > 0 && (
                      <div className='rounded-xl border p-4'>
                        <div className='mb-3 text-sm font-medium'>{t('timeline')}</div>
                        <div className='space-y-3'>
                          {f.timeline.map(e => (
                            <div key={e.id} className='flex items-start gap-3'>
                              <div className='mt-1 h-2 w-2 rounded-full bg-primary' />
                              <div className='min-w-0'>
                                <div className='text-sm'>
                                  {t(e.status as any)}
                                </div>
                                <div className='text-xs text-muted-foreground'>
                                  {formatDate(e.at)}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
