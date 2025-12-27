'use client';

import { Card } from '@components/ui/card';
import { Button } from '@components/ui/button';
import { Separator } from '@components/ui/separator';
import { Switch } from '@components/ui/switch';
import { Label } from '@components/ui/label';
import { Save } from 'lucide-react';
import { useLanguage } from '@contexts/LanguageContext';

interface OrderingPreferencesCardProps {
  values: {
    autoReorder: boolean;
    savedPaymentMethod: boolean;
    requireApproval: boolean;
    defaultDeliveryTime: 'morning' | 'afternoon' | 'evening';
  };
  onToggle: (
    key: keyof OrderingPreferencesCardProps['values'],
    value: boolean | 'morning' | 'afternoon' | 'evening'
  ) => void;
  onSave: () => void;
}

export function OrderingPreferencesCard({
  values,
  onToggle,
  onSave,
}: OrderingPreferencesCardProps) {
  const { t } = useLanguage();
  return (
    <Card className='rounded-3xl border-0 p-8 shadow-[0_2px_8px_rgba(0,0,0,0.08)]'>
      <div className='mb-6'>
        <h2 className='mb-2'>{t('orderingPreferences')}</h2>
        <p className='text-sm text-muted-foreground'>
          {t('customizeYourOrderingExperience')}
        </p>
      </div>

      <div className='space-y-6'>
        <div className='space-y-4'>
          <div className='flex items-center justify-between rounded-xl bg-muted/30 p-4'>
            <div>
              <p className='font-medium'>{t('autoReorderFavorites')}</p>
              <p className='text-sm text-muted-foreground'>
                {t('autoReorderFavoritesDescription')}
              </p>
            </div>
            <Switch
              checked={values.autoReorder}
              onCheckedChange={checked => onToggle('autoReorder', checked)}
            />
          </div>

          <div className='flex items-center justify-between rounded-xl bg-muted/30 p-4'>
            <div>
              <p className='font-medium'>{t('savePaymentMethod')}</p>
              <p className='text-sm text-muted-foreground'>
                {t('savePaymentMethodDescription')}
              </p>
            </div>
            <Switch
              checked={values.savedPaymentMethod}
              onCheckedChange={checked =>
                onToggle('savedPaymentMethod', checked)
              }
            />
          </div>

          <div className='flex items-center justify-between rounded-xl bg-muted/30 p-4'>
            <div>
              <p className='font-medium'>{t('requireOrderApproval')}</p>
              <p className='text-sm text-muted-foreground'>
                {t('requireOrderApprovalDescription')}
              </p>
            </div>
            <Switch
              checked={values.requireApproval}
              onCheckedChange={checked => onToggle('requireApproval', checked)}
            />
          </div>
        </div>

        <Separator />

        <div>
          <h3 className='mb-4'>{t('defaultDeliveryPreferences')}</h3>
          <div className='space-y-2'>
            <Label>{t('preferredDeliveryTime')}</Label>
            <div className='grid gap-3 md:grid-cols-3'>
              <button
                onClick={() => onToggle('defaultDeliveryTime', 'morning')}
                className={`rounded-xl border-2 p-4 text-center transition-all ${values.defaultDeliveryTime === 'morning' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}
              >
                <p className='font-medium'>{t('morning')}</p>
                <p className='text-sm text-muted-foreground'>{t('morningHours')}</p>
              </button>
              <button
                onClick={() => onToggle('defaultDeliveryTime', 'afternoon')}
                className={`rounded-xl border-2 p-4 text-center transition-all ${values.defaultDeliveryTime === 'afternoon' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}
              >
                <p className='font-medium'>{t('afternoon')}</p>
                <p className='text-sm text-muted-foreground'>{t('afternoonHours')}</p>
              </button>
              <button
                onClick={() => onToggle('defaultDeliveryTime', 'evening')}
                className={`rounded-xl border-2 p-4 text-center transition-all ${values.defaultDeliveryTime === 'evening' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}
              >
                <p className='font-medium'>{t('evening')}</p>
                <p className='text-sm text-muted-foreground'>{t('eveningHours')}</p>
              </button>
            </div>
          </div>
        </div>

        <div className='flex justify-end pt-4'>
          <Button
            onClick={onSave}
            className='rounded-xl bg-primary hover:bg-primary/90'
          >
            <Save className='mr-2 h-4 w-4' />
            {t('savePreferences')}
          </Button>
        </div>
      </div>
    </Card>
  );
}
