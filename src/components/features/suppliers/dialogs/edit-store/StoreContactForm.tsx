'use client';

// Contact info form component for edit store dialog

import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import { StoreFormData } from '@/types/suppliers/edit-store/types';
import { useLanguage } from '@contexts/LanguageContext';

interface StoreContactFormProps {
  formData: StoreFormData;
  onUpdate: (updates: Partial<StoreFormData>) => void;
}

export function StoreContactForm({
  formData,
  onUpdate,
}: StoreContactFormProps) {
  const { t } = useLanguage();
  return (
    <div className='space-y-4'>
      <div>
        <Label htmlFor='email'>{t('emailAddress')}</Label>
        <Input
          id='email'
          type='email'
          value={formData.email}
          onChange={e => onUpdate({ email: e.target.value })}
          placeholder={t('enterEmailAddress')}
        />
      </div>

      <div>
        <Label htmlFor='phone'>{t('phoneNumber')}</Label>
        <Input
          id='phone'
          type='tel'
          value={formData.phone}
          onChange={e => onUpdate({ phone: e.target.value })}
          placeholder={t('enterPhoneNumber')}
        />
      </div>

      <div>
        <Label htmlFor='website'>{t('website')}</Label>
        <Input
          id='website'
          type='url'
          value={formData.website}
          onChange={e => onUpdate({ website: e.target.value })}
          placeholder={t('enterWebsiteUrl')}
        />
      </div>
    </div>
  );
}
