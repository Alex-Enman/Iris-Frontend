'use client';

import { AlertCircle, Clock, TrendingDown } from 'lucide-react';
import { Button } from '@components/ui/button';
import { Badge } from '@components/ui/badge';
import { Card } from '@components/ui/card';
import { toast } from 'sonner';
import { useLanguage } from '@contexts/LanguageContext';

export function UrgentActionsCard() {
  const { t } = useLanguage();
  return (
    <Card className='rounded-3xl border-0 shadow-[0_2px_8px_rgba(0,0,0,0.08)]'>
      <div className='border-b border-border p-6'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <div className='rounded-xl bg-destructive/10 p-2'>
              <AlertCircle className='h-5 w-5 text-destructive' />
            </div>
            <h3 className='text-lg'>{t('urgentActions')}</h3>
          </div>
          <Badge variant='destructive'>3</Badge>
        </div>
      </div>
      <div className='p-6'>
        <div className='space-y-3'>
          <div className='rounded-2xl border-2 border-destructive/20 bg-destructive/5 p-4'>
            <div className='mb-2 flex items-start justify-between'>
              <div className='flex items-start gap-3'>
                <TrendingDown className='h-5 w-5 text-destructive' />
                <div>
                  <h4 className='mb-1 font-medium'>{t('lowStockAlert')}</h4>
                  <p className='text-sm text-muted-foreground'>
                    Seasonal Greens Mix: {t('onlyRemaining')} 12 kg
                  </p>
                </div>
              </div>
            </div>
            <Button
              size='sm'
              variant='outline'
              className='mt-3 w-full rounded-xl border-destructive/30 hover:bg-destructive/10'
              onClick={() => toast.success(t('openingStockManagement'))}
            >
              {t('updateStock')}
            </Button>
          </div>

          <div className='rounded-2xl border-2 border-destructive/20 bg-destructive/5 p-4'>
            <div className='mb-2 flex items-start justify-between'>
              <div className='flex items-start gap-3'>
                <AlertCircle className='h-5 w-5 text-destructive' />
                <div>
                  <h4 className='mb-1 font-medium'>{t('outOfStock')}</h4>
                  <p className='text-sm text-muted-foreground'>
                    Baby Potatoes: Unavailable
                  </p>
                </div>
              </div>
            </div>
            <Button
              size='sm'
              variant='outline'
              className='mt-3 w-full rounded-xl border-destructive/30 hover:bg-destructive/10'
              onClick={() => toast.success(t('openingRestockForm'))}
            >
              {t('restockNow')}
            </Button>
          </div>

          <div className='rounded-2xl border-2 border-accent/20 bg-accent/5 p-4'>
            <div className='mb-2 flex items-start justify-between'>
              <div className='flex items-start gap-3'>
                <Clock className='h-5 w-5 text-accent' />
                <div>
                  <h4 className='mb-1 font-medium'>{t('pendingOrder')}</h4>
                  <p className='text-sm text-muted-foreground'>
                    {t('order')} #ORD-1234 {t('from')} La Cucina {t('awaitingConfirmation')}
                  </p>
                </div>
              </div>
            </div>
            <Button
              size='sm'
              variant='outline'
              className='mt-3 w-full rounded-xl border-accent/30 hover:bg-accent/10'
              onClick={() => toast.success(t('openingOrderDetails'))}
            >
              {t('reviewOrder')}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
