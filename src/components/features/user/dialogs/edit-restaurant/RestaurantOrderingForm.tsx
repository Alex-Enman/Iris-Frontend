'use client';

// Ordering preferences form component for edit restaurant profile dialog

import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import { RestaurantProfile } from '@/types/user/edit-restaurant/types';
import { useLanguage } from '@contexts/LanguageContext';

interface RestaurantOrderingFormProps {
  profile: RestaurantProfile;
  onUpdate: (updates: Partial<RestaurantProfile>) => void;
}

export function RestaurantOrderingForm({
  profile,
  onUpdate,
}: RestaurantOrderingFormProps) {
  const { t } = useLanguage();
  return (
    <div className='space-y-4'>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        <div>
          <Label htmlFor='leadTime'>{t('leadTime')}</Label>
          <Input
            id='leadTime'
            value={profile.leadTime}
            onChange={e => onUpdate({ leadTime: e.target.value })}
            placeholder={t('leadTimePlaceholder')}
          />
        </div>
        <div>
          <Label htmlFor='deliveryWindow'>{t('deliveryWindow')}</Label>
          <Input
            id='deliveryWindow'
            value={profile.deliveryWindow}
            onChange={e => onUpdate({ deliveryWindow: e.target.value })}
            placeholder={t('deliveryWindowPlaceholder')}
          />
        </div>
      </div>

      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        <div>
          <Label htmlFor='paymentTerms'>{t('paymentTerms')}</Label>
          <Input
            id='paymentTerms'
            value={profile.paymentTerms}
            onChange={e => onUpdate({ paymentTerms: e.target.value })}
            placeholder={t('paymentTermsPlaceholder')}
          />
        </div>
        <div>
          <Label htmlFor='minimumOrder'>{t('minimumOrder')}</Label>
          <Input
            id='minimumOrder'
            value={profile.minimumOrder}
            onChange={e => onUpdate({ minimumOrder: e.target.value })}
            placeholder={t('minimumOrderPlaceholder')}
          />
        </div>
      </div>

      <div className='text-sm text-muted-foreground'>
        <p>
          {t('orderingPreferencesHelpIntro')}
        </p>
        <ul className='mt-2 list-inside list-disc space-y-1'>
          <li>
            <strong>{t('leadTime')}:</strong> {t('leadTimeHelpDescription')}
          </li>
          <li>
            <strong>{t('deliveryWindow')}:</strong>{' '}
            {t('deliveryWindowHelpDescription')}
          </li>
          <li>
            <strong>{t('paymentTerms')}:</strong>{' '}
            {t('paymentTermsHelpDescription')}
          </li>
          <li>
            <strong>{t('minimumOrder')}:</strong> {t('minimumOrderHelpDescription')}
          </li>
        </ul>
      </div>
    </div>
  );
}
