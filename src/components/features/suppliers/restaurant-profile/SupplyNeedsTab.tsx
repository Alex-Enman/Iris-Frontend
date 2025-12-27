'use client';

import { Badge } from '@components/ui/badge';
import { Card } from '@components/ui/card';
import { useLanguage } from '@contexts/LanguageContext';

export interface SupplyNeed {
  category: string;
  frequency: string;
  averageOrder: string;
  preferences: string;
}

export interface SupplyNeedsTabProps {
  supplierNeeds: SupplyNeed[];
}

export function SupplyNeedsTab({ supplierNeeds }: SupplyNeedsTabProps) {
  const { t } = useLanguage();
  return (
    <Card className='rounded-2xl border-0 p-6 shadow-[0_1px_4px_rgba(0,0,0,0.08)]'>
      <h3 className='mb-4'>{t('currentSupplyRequirements')}</h3>
      <p className='mb-6 text-sm text-muted-foreground'>
        {t('supplyRequirementsDescription')}
      </p>
      <div className='grid gap-4 md:grid-cols-2'>
        {supplierNeeds.map((need, index) => (
          <div
            key={index}
            className='rounded-xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent p-5'
          >
            <div className='mb-3 flex items-start justify-between'>
              <h4>{need.category}</h4>
              <Badge variant='outline' className='text-primary'>
                {need.averageOrder}
              </Badge>
            </div>
            <div className='space-y-2 text-sm'>
              <div className='flex items-center justify-between'>
                <span className='text-muted-foreground'>{t('frequency')}:</span>
                <span>{need.frequency}</span>
              </div>
              <div className='flex items-start justify-between'>
                <span className='text-muted-foreground'>{t('preferences')}:</span>
                <span className='text-right'>{need.preferences}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
