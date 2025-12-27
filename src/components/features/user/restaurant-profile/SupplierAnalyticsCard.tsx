'use client';

import { Badge } from '@components/ui/badge';
import { Card } from '@components/ui/card';
import { TrendingUp } from 'lucide-react';
import { useLanguage } from '@contexts/LanguageContext';

export interface SupplierAnalytics {
  totalRevenue: string;
  totalOrders: number;
  avgOrderValue: string;
  lastOrderDate: string;
  orderFrequency: string;
  topProducts: string[];
}

export interface SupplierAnalyticsCardProps {
  analytics: SupplierAnalytics;
}

export function SupplierAnalyticsCard({
  analytics,
}: SupplierAnalyticsCardProps) {
  const { t } = useLanguage();
  return (
    <Card className='rounded-3xl border-0 p-6 shadow-[0_2px_8px_rgba(0,0,0,0.08)]'>
      <div className='mb-4 flex items-center gap-2'>
        <TrendingUp className='h-5 w-5 text-primary' />
        <h3>{t('yourAnalytics')}</h3>
      </div>
      <p className='mb-4 text-sm text-muted-foreground'>
        {t('performanceWithThisRestaurant')}
      </p>
      <div className='space-y-4'>
        <div className='rounded-xl bg-primary/5 p-4'>
          <div className='mb-1 text-sm text-muted-foreground'>
            {t('totalRevenue')}
          </div>
          <div className='text-2xl text-primary'>{analytics.totalRevenue}</div>
        </div>
        <div className='grid grid-cols-2 gap-3'>
          <div className='rounded-xl bg-muted/30 p-3'>
            <div className='mb-1 text-xs text-muted-foreground'>
              {t('orders')}
            </div>
            <div className='font-medium'>{analytics.totalOrders}</div>
          </div>
          <div className='rounded-xl bg-muted/30 p-3'>
            <div className='mb-1 text-xs text-muted-foreground'>
              {t('avgOrderLabel')}
            </div>
            <div className='font-medium'>{analytics.avgOrderValue}</div>
          </div>
        </div>
        <div className='space-y-2 text-sm'>
          <div className='flex items-center justify-between'>
            <span className='text-muted-foreground'>{t('lastOrderLabel')}:</span>
            <span>{analytics.lastOrderDate}</span>
          </div>
          <div className='flex items-center justify-between'>
            <span className='text-muted-foreground'>{t('frequency')}:</span>
            <span>{analytics.orderFrequency}</span>
          </div>
        </div>
        <div>
          <div className='mb-2 text-sm text-muted-foreground'>
            {t('topProducts')}
          </div>
          <div className='flex flex-wrap gap-1'>
            {analytics.topProducts.map((product, idx) => (
              <Badge key={idx} variant='outline' className='text-xs'>
                {product}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
