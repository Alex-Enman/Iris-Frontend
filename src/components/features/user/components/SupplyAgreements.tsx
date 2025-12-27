'use client';

import { Button } from '@components/ui/button';
import { Badge } from '@components/ui/badge';
import { Percent, Repeat, Calendar } from 'lucide-react';
import { useLanguage } from '@contexts/LanguageContext';

export interface SupplyAgreementItem {
  id: number;
  supplier: string;
  type: string;
  frequency: string;
  status: string;
  nextDelivery: string;
  items: string;
  discount: string;
  startDate: string;
  endDate: string;
}

interface SupplyAgreementsProps {
  agreements: SupplyAgreementItem[];
}

export function SupplyAgreements({ agreements }: SupplyAgreementsProps) {
  const { t } = useLanguage();
  return (
    <div className='rounded-2xl bg-white p-6 shadow-[0_1px_4px_rgba(0,0,0,0.08)]'>
      <h3 className='mb-4'>{t('activeSupplyAgreements')}</h3>
      <div className='space-y-4'>
        {agreements.map(agreement => (
          <div
            key={agreement.id}
            className='rounded-xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent p-5'
          >
            <div className='mb-4 flex items-start justify-between'>
              <div>
                <div className='mb-1 flex items-center gap-2'>
                  <h4>{agreement.supplier}</h4>
                  <Badge variant='default' className='bg-primary'>
                    {agreement.status}
                  </Badge>
                </div>
                <p className='text-sm text-muted-foreground'>
                  {agreement.type}
                </p>
              </div>
              <Badge variant='outline' className='text-primary'>
                <Percent className='mr-1 h-3 w-3' />
                {agreement.discount} {t('discountLabel')}
              </Badge>
            </div>
            <div className='mb-4 grid gap-3 sm:grid-cols-2'>
              <div className='rounded-lg bg-background/50 p-3'>
                <div className='mb-1 flex items-center gap-2 text-xs text-muted-foreground'>
                  <Repeat className='h-3 w-3' />
                  {t('frequency')}
                </div>
                <div className='text-sm'>{agreement.frequency}</div>
              </div>
              <div className='rounded-lg bg-background/50 p-3'>
                <div className='mb-1 flex items-center gap-2 text-xs text-muted-foreground'>
                  <Calendar className='h-3 w-3' />
                  {t('nextDeliveryLabel')}
                </div>
                <div className='text-sm'>{agreement.nextDelivery}</div>
              </div>
            </div>
            <div className='mb-3 text-sm'>
              <span className='text-muted-foreground'>{t('itemsLabel')}: </span>
              <span>{agreement.items}</span>
            </div>
            <div className='flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground'>
              <span>
                {t('contract')}: {agreement.startDate} - {agreement.endDate}
              </span>
              <Button size='sm' variant='outline' className='rounded-xl'>
                {t('viewDetails')}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
