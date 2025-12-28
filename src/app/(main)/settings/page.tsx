'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '@contexts/LanguageContext';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@components/ui/card';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import { Switch } from '@components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select';
import { Separator } from '@components/ui/separator';
import {
  Bell,
  Shield,
  Palette,
  Globe,
  Save,
  AlertTriangle,
  CheckCircle,
  Moon,
  Sun,
  Volume2,
  Mail,
  Smartphone,
} from 'lucide-react';

export default function SettingsPage() {
  const { language, setLanguage, t } = useLanguage();
  const [settings, setSettings] = useState({
    // Notifications
    emailNotifications: true,
    pushNotifications: false,
    smsNotifications: false,
    orderUpdates: true,
    supplierUpdates: true,
    marketingEmails: false,

    // Privacy & Security
    twoFactorAuth: false,
    dataSharing: true,
    analyticsTracking: true,

    // Appearance
    theme: 'light',
    language,
    timezone: 'America/Los_Angeles',

    // Preferences
    currency: 'SEK',
    units: 'imperial',
    autoSave: true,
    compactView: false,
  });

  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setSettings(prev => {
      if (prev.language === language) return prev;
      return { ...prev, language };
    });
  }, [language]);

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);

    if (key === 'language') {
      setLanguage(value === 'sv' ? 'sv' : 'en');
    }
  };

  const handleSave = () => {
    // Simulate saving settings
    console.log('Saving settings:', settings);
    setHasChanges(false);
    // Show success message
  };

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>{t('settings')}</h1>
          <p className='text-muted-foreground'>
            {t('manageAccountPreferencesDescription')}
          </p>
        </div>
        {hasChanges && (
          <Button onClick={handleSave}>
            <Save className='mr-2 h-4 w-4' />
            {t('saveChanges')}
          </Button>
        )}
      </div>

      <div className='grid gap-6 md:grid-cols-2'>
        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Bell className='h-5 w-5' />
              {t('notificationsTitle')}
            </CardTitle>
            <CardDescription>
              {t('notificationsDescription')}
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-6'>
            <div className='space-y-4'>
              <div className='flex items-center justify-between'>
                <div className='space-y-0.5'>
                  <Label className='text-base'>{t('emailNotifications')}</Label>
                  <p className='text-sm text-muted-foreground'>
                    {t('emailNotificationsDescription')}
                  </p>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={checked =>
                    handleSettingChange('emailNotifications', checked)
                  }
                />
              </div>

              <div className='flex items-center justify-between'>
                <div className='space-y-0.5'>
                  <Label className='text-base'>{t('pushNotifications')}</Label>
                  <p className='text-sm text-muted-foreground'>
                    {t('pushNotificationsDescription')}
                  </p>
                </div>
                <Switch
                  checked={settings.pushNotifications}
                  onCheckedChange={checked =>
                    handleSettingChange('pushNotifications', checked)
                  }
                />
              </div>

              <div className='flex items-center justify-between'>
                <div className='space-y-0.5'>
                  <Label className='text-base'>{t('smsNotifications')}</Label>
                  <p className='text-sm text-muted-foreground'>
                    {t('smsNotificationsDescription')}
                  </p>
                </div>
                <Switch
                  checked={settings.smsNotifications}
                  onCheckedChange={checked =>
                    handleSettingChange('smsNotifications', checked)
                  }
                />
              </div>
            </div>

            <Separator />

            <div className='space-y-4'>
              <h4 className='text-sm font-medium'>{t('notificationTypes')}</h4>
              <div className='space-y-3'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <Mail className='h-4 w-4 text-muted-foreground' />
                    <span className='text-sm'>{t('orderUpdates')}</span>
                  </div>
                  <Switch
                    checked={settings.orderUpdates}
                    onCheckedChange={checked =>
                      handleSettingChange('orderUpdates', checked)
                    }
                  />
                </div>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <Smartphone className='h-4 w-4 text-muted-foreground' />
                    <span className='text-sm'>{t('supplierUpdates')}</span>
                  </div>
                  <Switch
                    checked={settings.supplierUpdates}
                    onCheckedChange={checked =>
                      handleSettingChange('supplierUpdates', checked)
                    }
                  />
                </div>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <Volume2 className='h-4 w-4 text-muted-foreground' />
                    <span className='text-sm'>{t('marketingEmails')}</span>
                  </div>
                  <Switch
                    checked={settings.marketingEmails}
                    onCheckedChange={checked =>
                      handleSettingChange('marketingEmails', checked)
                    }
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Privacy & Security */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Shield className='h-5 w-5' />
              {t('privacyAndSecurity')}
            </CardTitle>
            <CardDescription>
              {t('privacyAndSecurityDescription')}
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-6'>
            <div className='space-y-4'>
              <div className='flex items-center justify-between'>
                <div className='space-y-0.5'>
                  <Label className='text-base'>
                    {t('twoFactorAuthentication')}
                  </Label>
                  <p className='text-sm text-muted-foreground'>
                    {t('twoFactorAuthenticationDescription')}
                  </p>
                </div>
                <Switch
                  checked={settings.twoFactorAuth}
                  onCheckedChange={checked =>
                    handleSettingChange('twoFactorAuth', checked)
                  }
                />
              </div>

              <div className='flex items-center justify-between'>
                <div className='space-y-0.5'>
                  <Label className='text-base'>{t('dataSharing')}</Label>
                  <p className='text-sm text-muted-foreground'>
                    {t('dataSharingDescription')}
                  </p>
                </div>
                <Switch
                  checked={settings.dataSharing}
                  onCheckedChange={checked =>
                    handleSettingChange('dataSharing', checked)
                  }
                />
              </div>

              <div className='flex items-center justify-between'>
                <div className='space-y-0.5'>
                  <Label className='text-base'>{t('analyticsTracking')}</Label>
                  <p className='text-sm text-muted-foreground'>
                    {t('analyticsTrackingDescription')}
                  </p>
                </div>
                <Switch
                  checked={settings.analyticsTracking}
                  onCheckedChange={checked =>
                    handleSettingChange('analyticsTracking', checked)
                  }
                />
              </div>
            </div>

            <Separator />

            <div className='space-y-4'>
              <h4 className='text-sm font-medium'>{t('securityStatus')}</h4>
              <div className='space-y-2'>
                <div className='flex items-center gap-2 text-sm'>
                  <CheckCircle className='h-4 w-4 text-green-500' />
                  <span>{t('strongPasswordEnabled')}</span>
                </div>
                <div className='flex items-center gap-2 text-sm'>
                  {settings.twoFactorAuth ? (
                    <CheckCircle className='h-4 w-4 text-green-500' />
                  ) : (
                    <AlertTriangle className='h-4 w-4 text-yellow-500' />
                  )}
                  <span>
                    {settings.twoFactorAuth
                      ? t('twoFactorAuthenticationEnabled')
                      : t('twoFactorAuthenticationDisabled')}
                  </span>
                </div>
                <div className='flex items-center gap-2 text-sm'>
                  <CheckCircle className='h-4 w-4 text-green-500' />
                  <span>{t('accountVerified')}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Appearance */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Palette className='h-5 w-5' />
              {t('appearance')}
            </CardTitle>
            <CardDescription>
              {t('appearanceDescription')}
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-6'>
            <div className='space-y-4'>
              <div className='space-y-2'>
                <Label>{t('theme')}</Label>
                <Select
                  value={settings.theme}
                  onValueChange={value => handleSettingChange('theme', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='light'>
                      <div className='flex items-center gap-2'>
                        <Sun className='h-4 w-4' />
                        {t('light')}
                      </div>
                    </SelectItem>
                    <SelectItem value='dark'>
                      <div className='flex items-center gap-2'>
                        <Moon className='h-4 w-4' />
                        {t('dark')}
                      </div>
                    </SelectItem>
                    <SelectItem value='system'>{t('system')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className='space-y-2'>
                <Label>{t('language')}</Label>
                <Select
                  value={settings.language}
                  onValueChange={value =>
                    handleSettingChange('language', value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='en'>{t('english')}</SelectItem>
                    <SelectItem value='sv'>{t('swedish')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className='space-y-2'>
                <Label>{t('timezone')}</Label>
                <Select
                  value={settings.timezone}
                  onValueChange={value =>
                    handleSettingChange('timezone', value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='America/Los_Angeles'>
                      {t('pacificTime')}
                    </SelectItem>
                    <SelectItem value='America/Denver'>
                      {t('mountainTime')}
                    </SelectItem>
                    <SelectItem value='America/Chicago'>
                      {t('centralTime')}
                    </SelectItem>
                    <SelectItem value='America/New_York'>
                      {t('easternTime')}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Globe className='h-5 w-5' />
              {t('preferencesSection')}
            </CardTitle>
            <CardDescription>
              {t('preferencesSectionDescription')}
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-6'>
            <div className='space-y-4'>
              <div className='space-y-2'>
                <Label>{t('currency')}</Label>
                <Select
                  value={settings.currency}
                  onValueChange={value =>
                    handleSettingChange('currency', value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='USD'>USD ($)</SelectItem>
                    <SelectItem value='SEK'>SEK (kr)</SelectItem>
                    <SelectItem value='GBP'>GBP (£)</SelectItem>
                    <SelectItem value='CAD'>CAD (C$)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className='space-y-2'>
                <Label>{t('unitsLabel')}</Label>
                <Select
                  value={settings.units}
                  onValueChange={value => handleSettingChange('units', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='imperial'>{t('imperialUnits')}</SelectItem>
                    <SelectItem value='metric'>{t('metricUnits')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className='flex items-center justify-between'>
                <div className='space-y-0.5'>
                  <Label className='text-base'>{t('autoSave')}</Label>
                  <p className='text-sm text-muted-foreground'>
                    {t('autoSaveDescription')}
                  </p>
                </div>
                <Switch
                  checked={settings.autoSave}
                  onCheckedChange={checked =>
                    handleSettingChange('autoSave', checked)
                  }
                />
              </div>

              <div className='flex items-center justify-between'>
                <div className='space-y-0.5'>
                  <Label className='text-base'>{t('compactView')}</Label>
                  <p className='text-sm text-muted-foreground'>
                    {t('compactViewDescription')}
                  </p>
                </div>
                <Switch
                  checked={settings.compactView}
                  onCheckedChange={checked =>
                    handleSettingChange('compactView', checked)
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
