'use client';

// Contact info form component for edit restaurant profile dialog

import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import { RestaurantProfile } from '@/types/user/edit-restaurant/types';
import { useLanguage } from '@contexts/LanguageContext';

interface RestaurantContactFormProps {
  profile: RestaurantProfile;
  onUpdate: (updates: Partial<RestaurantProfile>) => void;
}

export function RestaurantContactForm({
  profile,
  onUpdate,
}: RestaurantContactFormProps) {
  const { t } = useLanguage();
  return (
    <div className='space-y-4'>
      <div>
        <Label htmlFor='email'>{t('emailAddress')}</Label>
        <Input
          id='email'
          type='email'
          value={profile.email}
          onChange={e => onUpdate({ email: e.target.value })}
          placeholder={t('enterEmailAddress')}
        />
      </div>

      <div>
        <Label htmlFor='phone'>{t('phoneNumber')}</Label>
        <Input
          id='phone'
          type='tel'
          value={profile.phone}
          onChange={e => onUpdate({ phone: e.target.value })}
          placeholder={t('enterPhoneNumber')}
        />
      </div>

      <div>
        <Label htmlFor='website'>{t('website')}</Label>
        <Input
          id='website'
          type='url'
          value={profile.website}
          onChange={e => onUpdate({ website: e.target.value })}
          placeholder={t('enterWebsiteUrl')}
        />
      </div>
    </div>
  );
}
