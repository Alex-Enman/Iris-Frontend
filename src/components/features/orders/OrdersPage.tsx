import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs';
import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import { Card } from '@components/ui/card';
import { Progress } from '@components/ui/progress';
import { useLanguage } from '@contexts/LanguageContext';
import { formatCurrency } from '@/utils/formatters';
import {
  Package,
  Calendar,
  DollarSign,
  RefreshCw,
  Truck,
  Clock,
  CheckCircle,
  Store,
  Heart,
} from 'lucide-react';

interface OrdersPageProps {
  onViewSupplier?: (supplierId: string) => void;
}

export function OrdersPage({ onViewSupplier }: OrdersPageProps) {
  const { t } = useLanguage();
  const activeOrders = [
    {
      id: 'ORD-1001',
      supplier: t('supplierNameGreenValleyFarm'),
      supplierId: 1,
      date: t('orderDateOct22_2025'),
      total: 127.5,
      statusKey: 'inTransit',
      statusClass: 'bg-accent text-accent-foreground',
      progress: 75,
      eta: t('etaThursdayOct24_8am'),
    },
    {
      id: 'ORD-1002',
      supplier: t('supplierNameMountainDairyCo'),
      supplierId: 2,
      date: t('orderDateOct23_2025'),
      total: 89.2,
      statusKey: 'processing',
      statusClass: 'bg-primary/20 text-primary',
      progress: 25,
      eta: t('etaFridayOct25_10am'),
    },
    {
      id: 'ORD-1003',
      supplier: t('supplierNameHeritageBakery'),
      supplierId: 3,
      date: t('orderDateOct24_2025'),
      total: 68.0,
      statusKey: 'confirmed',
      statusClass: 'bg-primary/10 text-primary',
      progress: 10,
      eta: t('etaSaturdayOct26_7am'),
    },
  ];
  const completedOrders: any[] = [];
  const reorderOrders: any[] = [];
  const draftOrders: any[] = [{ id: 'DRAFT-001' }];

  const renderOrderCard = (o: any) => (
    <Card
      key={o.id}
      className='duration-250 overflow-hidden rounded-2xl bg-white shadow-[0_1px_4px_rgba(0,0,0,0.08)] transition-all hover:shadow-[0_2px_8px_rgba(0,0,0,0.12)]'
    >
      <div className='cursor-pointer p-6'>
        <div className='flex items-start justify-between'>
          <div className='flex-1'>
            <div className='mb-2 flex items-center gap-3'>
              <h3 className='text-lg'>{o.id}</h3>
              <Badge className={o.statusClass}>{t(o.statusKey)}</Badge>
            </div>
            <div className='mb-2 flex items-center gap-2'>
              <span className='text-muted-foreground'>{o.supplier}</span>
              {o.supplierId && (
                <Button
                  variant='ghost'
                  size='sm'
                  className='h-6 rounded-lg px-2 text-xs'
                  onClick={() => onViewSupplier?.(String(o.supplierId))}
                >
                  <Store className='mr-1 h-3 w-3' />
                  {t('viewStore')}
                </Button>
              )}
            </div>
            <div className='flex items-center gap-4 text-sm text-muted-foreground'>
              <div className='flex items-center gap-1'>
                <Calendar className='h-4 w-4' />
                <span>{o.date}</span>
              </div>
              <div className='flex items-center gap-1'>
                <DollarSign className='h-4 w-4' />
                <span>{formatCurrency(o.total, 'EUR')}</span>
              </div>
            </div>
          </div>
          <Clock className='h-5 w-5 text-muted-foreground' />
        </div>
        <div className='mt-4'>
          <div className='mb-2 flex items-center justify-between text-sm'>
            <span className='text-muted-foreground'>{t('orderProgress')}</span>
            <span className='text-primary'>{o.progress}%</span>
          </div>
          <Progress value={o.progress} className='h-2' />
        </div>
        <div className='mt-4 rounded-xl bg-accent/10 p-3'>
          <div className='flex items-center gap-2 text-sm'>
            <Truck className='h-4 w-4 text-accent' />
            <span className='text-muted-foreground'>
              {t('estimatedDelivery')}: 
            </span>
            <span className='text-accent'>{o.eta}</span>
          </div>
        </div>
      </div>
    </Card>
  );

  return (
    <div className='min-h-screen py-12'>
      <div className='mx-auto max-w-[1440px] px-8'>
        <div className='mb-8'>
          <h1 className='mb-2 text-4xl text-primary'>{t('orders')}</h1>
          <p className='text-muted-foreground'>
            {t('ordersDescription')}
          </p>
        </div>

        <Tabs defaultValue='active' className='w-full'>
          <TabsList className='mb-8 grid w-full max-w-2xl grid-cols-4 rounded-xl bg-white p-1 shadow-[0_1px_4px_rgba(0,0,0,0.08)]'>
            <TabsTrigger value='active' className='rounded-lg'>
              <Clock className='mr-2 h-4 w-4' /> {t('active')} ({activeOrders.length})
            </TabsTrigger>
            <TabsTrigger value='completed' className='rounded-lg'>
              <CheckCircle className='mr-2 h-4 w-4' /> {t('completed')} (
              {completedOrders.length})
            </TabsTrigger>
            <TabsTrigger value='reorder' className='rounded-lg'>
              <RefreshCw className='mr-2 h-4 w-4' /> {t('reorder')} (
              {reorderOrders.length})
            </TabsTrigger>
            <TabsTrigger value='drafts' className='rounded-lg'>
              <Package className='mr-2 h-4 w-4' /> {t('drafts')} ({draftOrders.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value='active' className='space-y-4'>
            {activeOrders.map(renderOrderCard)}
          </TabsContent>
          <TabsContent value='completed' className='space-y-4' />
          <TabsContent value='reorder' className='space-y-4' />
          <TabsContent value='drafts' className='space-y-4' />
        </Tabs>

        {/* Summary Stats */}
        <div className='mt-12 grid gap-6 md:grid-cols-4'>
          <div className='rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 p-6'>
            <div className='mb-2 flex items-center gap-2'>
              <Package className='h-5 w-5 text-primary' />
              <div className='text-sm text-muted-foreground'>{t('totalOrders')}</div>
            </div>
            <div className='text-3xl text-primary'>
              {activeOrders.length + completedOrders.length}
            </div>
          </div>
          <div className='rounded-2xl bg-gradient-to-br from-accent/5 to-accent/10 p-6'>
            <div className='mb-2 flex items-center gap-2'>
              <DollarSign className='h-5 w-5 text-accent' />
              <div className='text-sm text-muted-foreground'>{t('thisMonth')}</div>
            </div>
            <div className='text-3xl text-accent'>{formatCurrency(599, 'EUR')}</div>
          </div>
          <div className='rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 p-6'>
            <div className='mb-2 flex items-center gap-2'>
              <Store className='h-5 w-5 text-primary' />
              <div className='text-sm text-muted-foreground'>
                {t('activeSuppliers')}
              </div>
            </div>
            <div className='text-3xl text-primary'>6</div>
          </div>
          <div className='rounded-2xl bg-gradient-to-br from-accent/5 to-primary/5 p-6'>
            <div className='mb-2 flex items-center gap-2'>
              <Heart className='h-5 w-5 text-accent' />
              <div className='text-sm text-muted-foreground'>
                {t('favoriteOrders')}
              </div>
            </div>
            <div className='text-3xl text-accent'>2</div>
          </div>
        </div>
      </div>
    </div>
  );
}
