'use client';

// Delivery settings form component for edit store dialog

import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import { Card } from '@components/ui/card';
import { Truck } from 'lucide-react';
import { StoreFormData } from '@/types/suppliers/edit-store/types';
import { useLanguage } from '@contexts/LanguageContext';

interface StoreDeliveryFormProps {
  formData: StoreFormData;
  onUpdate: (updates: Partial<StoreFormData>) => void;
}

export function StoreDeliveryForm({
  formData,
  onUpdate,
}: StoreDeliveryFormProps) {
  const { t } = useLanguage();
  return (
    <div className='space-y-4'>
      <div className='mb-4 flex items-center space-x-2'>
        <Truck className='h-5 w-5 text-primary' />
        <h3 className='text-lg font-semibold'>{t('deliverySettings')}</h3>
      </div>

      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        <Card className='p-4'>
          <div className='space-y-4'>
            <div>
              <Label htmlFor='deliveryRadius'>{t('deliveryRadiusKm')}</Label>
              <Input
                id='deliveryRadius'
                type='number'
                value={formData.deliveryRadius}
                onChange={e => onUpdate({ deliveryRadius: e.target.value })}
                placeholder={t('deliveryRadiusPlaceholder')}
                min='0'
                step='1'
              />
            </div>

            <div>
              <Label htmlFor='deliveryFee'>{t('deliveryFeeSek')}</Label>
              <Input
                id='deliveryFee'
                type='number'
                step='0.01'
                value={formData.deliveryFee}
                onChange={e => onUpdate({ deliveryFee: e.target.value })}
                placeholder={t('deliveryFeePlaceholder')}
                min='0'
              />
            </div>

            <div>
              <Label htmlFor='freeDeliveryThreshold'>
                {t('freeDeliveryThresholdSek')}
              </Label>
              <Input
                id='freeDeliveryThreshold'
                type='number'
                step='0.01'
                value={formData.freeDeliveryThreshold}
                onChange={e =>
                  onUpdate({ freeDeliveryThreshold: e.target.value })
                }
                placeholder={t('freeDeliveryThresholdPlaceholder')}
                min='0'
              />
            </div>
          </div>
        </Card>

        <Card className='p-4'>
          <div className='space-y-4'>
            <div>
              <Label htmlFor='minOrderAmount'>{t('minimumOrderAmountSek')}</Label>
              <Input
                id='minOrderAmount'
                type='number'
                step='0.01'
                value={formData.minOrderAmount}
                onChange={e => onUpdate({ minOrderAmount: e.target.value })}
                placeholder={t('minimumOrderAmountPlaceholder')}
                min='0'
              />
            </div>

            <div>
              <Label htmlFor='deliveryTime'>{t('deliveryTimeMinutes')}</Label>
              <Input
                id='deliveryTime'
                value={formData.deliveryTime}
                onChange={e => onUpdate({ deliveryTime: e.target.value })}
                placeholder={t('deliveryTimePlaceholder')}
              />
            </div>
          </div>
        </Card>
      </div>

      <div className='text-sm text-muted-foreground'>
        <p>
          {t('configureDeliverySettingsHelpText')}
        </p>
        <ul className='mt-2 list-inside list-disc space-y-1'>
          <li>
            <strong>{t('deliveryRadiusHelpTitle')}</strong> {t('deliveryRadiusHelpText')}
          </li>
          <li>
            <strong>{t('deliveryFeeHelpTitle')}</strong> {t('deliveryFeeHelpText')}
          </li>
          <li>
            <strong>{t('freeDeliveryThresholdHelpTitle')}</strong> {t('freeDeliveryThresholdHelpText')}
          </li>
          <li>
            <strong>{t('minimumOrderHelpTitle')}</strong> {t('minimumOrderHelpText')}
          </li>
          <li>
            <strong>{t('deliveryTimeHelpTitle')}</strong> {t('deliveryTimeHelpText')}
          </li>
        </ul>
      </div>
    </div>
  );
}
