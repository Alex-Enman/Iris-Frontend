import { Card } from '@components/ui/card';
import { Label } from '@components/ui/label';
import { Switch } from '@components/ui/switch';
import { useLanguage } from '@contexts/LanguageContext';

export function LanguageSettingsCard() {
  const { language, setLanguage, t } = useLanguage();

  const isSwedish = language === 'sv';

  return (
    <Card className='rounded-3xl border-0 p-8 shadow-[0_2px_8px_rgba(0,0,0,0.08)]'>
      <div className='mb-6'>
        <h2 className='mb-2'>{t('language')}</h2>
        <p className='text-sm text-muted-foreground'>{t('languageDescription')}</p>
      </div>

      <div className='flex items-center justify-between rounded-xl bg-muted/30 p-4'>
        <div className='space-y-1'>
          <Label className='text-base'>
            {isSwedish ? t('swedish') : t('english')}
          </Label>
          <p className='text-sm text-muted-foreground'>
            {isSwedish ? 'SV' : 'EN'}
          </p>
        </div>
        <Switch
          checked={isSwedish}
          onCheckedChange={checked => setLanguage(checked ? 'sv' : 'en')}
        />
      </div>
    </Card>
  );
}
