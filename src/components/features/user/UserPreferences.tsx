'use client';

// User preferences component
// Displays user preferences settings

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { Button } from '@components/ui/button';
import { Switch } from '@components/ui/switch';
import { Label } from '@components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select';
import { useLanguage } from '@contexts/LanguageContext';

type Preferences = {
  notifications: boolean;
  emailUpdates: boolean;
  smsUpdates: boolean;
  theme: 'light' | 'dark' | 'system';
  language: string;
};

interface UserPreferencesProps {
  preferences: Preferences;
  onUpdate?: (preferences: Partial<Preferences>) => void;
}

export function UserPreferences({
  preferences,
  onUpdate,
}: UserPreferencesProps) {
  const { t } = useLanguage();
  const [localPreferences, setLocalPreferences] = React.useState(preferences);

  const handleToggle = (key: keyof Preferences) => {
    const newValue = !localPreferences[key];
    setLocalPreferences(prev => ({ ...prev, [key]: newValue }));
    onUpdate?.({ [key]: newValue });
  };

  const handleSelect = (key: keyof Preferences, value: string) => {
    setLocalPreferences(prev => ({ ...prev, [key]: value }));
    onUpdate?.({ [key]: value });
  };

  return (
    <Card className='w-full max-w-md'>
      <CardHeader>
        <CardTitle>{t('preferences')}</CardTitle>
      </CardHeader>
      <CardContent className='space-y-6'>
        {/* Notifications */}
        <div className='space-y-4'>
          <h4 className='text-sm font-medium'>{t('notificationsTitle')}</h4>

          <div className='flex items-center justify-between'>
            <Label htmlFor='notifications'>{t('pushNotifications')}</Label>
            <Switch
              id='notifications'
              checked={localPreferences.notifications}
              onCheckedChange={() => handleToggle('notifications')}
            />
          </div>

          <div className='flex items-center justify-between'>
            <Label htmlFor='email-updates'>{t('emailNotifications')}</Label>
            <Switch
              id='email-updates'
              checked={localPreferences.emailUpdates}
              onCheckedChange={() => handleToggle('emailUpdates')}
            />
          </div>

          <div className='flex items-center justify-between'>
            <Label htmlFor='sms-updates'>{t('smsNotifications')}</Label>
            <Switch
              id='sms-updates'
              checked={localPreferences.smsUpdates}
              onCheckedChange={() => handleToggle('smsUpdates')}
            />
          </div>
        </div>

        {/* Appearance */}
        <div className='space-y-4'>
          <h4 className='text-sm font-medium'>{t('appearance')}</h4>

          <div className='space-y-2'>
            <Label htmlFor='theme'>{t('theme')}</Label>
            <Select
              value={localPreferences.theme}
              onValueChange={value => handleSelect('theme', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='light'>{t('light')}</SelectItem>
                <SelectItem value='dark'>{t('dark')}</SelectItem>
                <SelectItem value='system'>{t('system')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='language'>{t('language')}</Label>
            <Select
              value={localPreferences.language}
              onValueChange={value => handleSelect('language', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='en'>{t('english')}</SelectItem>
                <SelectItem value='es'>{t('spanishLanguage')}</SelectItem>
                <SelectItem value='fr'>{t('frenchLanguage')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
