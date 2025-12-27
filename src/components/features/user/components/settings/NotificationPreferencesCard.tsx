'use client';

import { Card } from '@components/ui/card';
import { Button } from '@components/ui/button';
import { Separator } from '@components/ui/separator';
import { Switch } from '@components/ui/switch';
import { Save } from 'lucide-react';
import { useLanguage } from '@contexts/LanguageContext';

interface NotificationPreferencesCardProps {
  values: {
    orderUpdates: boolean;
    newProducts: boolean;
    promotions: boolean;
    weeklyDigest: boolean;
    emailNotifications: boolean;
    smsNotifications: boolean;
    pushNotifications: boolean;
  };
  onToggle: (
    key: keyof NotificationPreferencesCardProps['values'],
    value: boolean
  ) => void;
  onSave: () => void;
}

export function NotificationPreferencesCard({
  values,
  onToggle,
  onSave,
}: NotificationPreferencesCardProps) {
  const { t } = useLanguage();
  return (
    <Card className='rounded-3xl border-0 p-8 shadow-[0_2px_8px_rgba(0,0,0,0.08)]'>
      <div className='mb-6'>
        <h2 className='mb-2'>{t('notificationPreferences')}</h2>
        <p className='text-sm text-muted-foreground'>
          {t('chooseHowYouWantToBeNotifiedAboutUpdates')}
        </p>
      </div>

      <div className='space-y-6'>
        <div>
          <h3 className='mb-4'>{t('emailNotifications')}</h3>
          <div className='space-y-4'>
            <div className='flex items-center justify-between rounded-xl bg-muted/30 p-4'>
              <div>
                <p className='font-medium'>{t('orderUpdates')}</p>
                <p className='text-sm text-muted-foreground'>
                  {t('orderUpdatesDescription')}
                </p>
              </div>
              <Switch
                checked={values.orderUpdates}
                onCheckedChange={checked => onToggle('orderUpdates', checked)}
              />
            </div>

            <div className='flex items-center justify-between rounded-xl bg-muted/30 p-4'>
              <div>
                <p className='font-medium'>{t('newProducts')}</p>
                <p className='text-sm text-muted-foreground'>
                  {t('newProductsDescription')}
                </p>
              </div>
              <Switch
                checked={values.newProducts}
                onCheckedChange={checked => onToggle('newProducts', checked)}
              />
            </div>

            <div className='flex items-center justify-between rounded-xl bg-muted/30 p-4'>
              <div>
                <p className='font-medium'>{t('promotionsAndDeals')}</p>
                <p className='text-sm text-muted-foreground'>
                  {t('promotionsAndDealsDescription')}
                </p>
              </div>
              <Switch
                checked={values.promotions}
                onCheckedChange={checked => onToggle('promotions', checked)}
              />
            </div>

            <div className='flex items-center justify-between rounded-xl bg-muted/30 p-4'>
              <div>
                <p className='font-medium'>{t('weeklyDigest')}</p>
                <p className='text-sm text-muted-foreground'>
                  {t('weeklyDigestDescription')}
                </p>
              </div>
              <Switch
                checked={values.weeklyDigest}
                onCheckedChange={checked => onToggle('weeklyDigest', checked)}
              />
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className='mb-4'>{t('deliveryChannels')}</h3>
          <div className='space-y-4'>
            <div className='flex items-center justify-between rounded-xl bg-muted/30 p-4'>
              <div>
                <p className='font-medium'>{t('emailNotifications')}</p>
                <p className='text-sm text-muted-foreground'>
                  {t('receiveNotificationsViaEmail')}
                </p>
              </div>
              <Switch
                checked={values.emailNotifications}
                onCheckedChange={checked =>
                  onToggle('emailNotifications', checked)
                }
              />
            </div>

            <div className='flex items-center justify-between rounded-xl bg-muted/30 p-4'>
              <div>
                <p className='font-medium'>{t('smsNotifications')}</p>
                <p className='text-sm text-muted-foreground'>
                  {t('getImportantUpdatesViaTextMessage')}
                </p>
              </div>
              <Switch
                checked={values.smsNotifications}
                onCheckedChange={checked =>
                  onToggle('smsNotifications', checked)
                }
              />
            </div>

            <div className='flex items-center justify-between rounded-xl bg-muted/30 p-4'>
              <div>
                <p className='font-medium'>{t('pushNotifications')}</p>
                <p className='text-sm text-muted-foreground'>
                  {t('browserNotificationsForInstantUpdates')}
                </p>
              </div>
              <Switch
                checked={values.pushNotifications}
                onCheckedChange={checked =>
                  onToggle('pushNotifications', checked)
                }
              />
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
