'use client';

// Certifications form component for edit store dialog

import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import { Badge } from '@components/ui/badge';
import { Card } from '@components/ui/card';
import { X, Plus, Award } from 'lucide-react';
import { StoreFormData } from '@/types/suppliers/edit-store/types';
import { useLanguage } from '@contexts/LanguageContext';

interface StoreCertificationsFormProps {
  formData: StoreFormData;
  onUpdate: (updates: Partial<StoreFormData>) => void;
  onAddCertification: () => void;
  onRemoveCertification: (index: number) => void;
}

export function StoreCertificationsForm({
  formData,
  onUpdate,
  onAddCertification,
  onRemoveCertification,
}: StoreCertificationsFormProps) {
  const { t } = useLanguage();
  const handleAddCertification = () => {
    if (formData.newCertification.trim()) {
      onAddCertification();
    }
  };

  return (
    <div className='space-y-4'>
      <div>
        <Label htmlFor='newCertification'>{t('addCertification')}</Label>
        <div className='flex space-x-2'>
          <Input
            id='newCertification'
            value={formData.newCertification}
            onChange={e => onUpdate({ newCertification: e.target.value })}
            placeholder={t('enterCertificationName')}
            onKeyPress={e => e.key === 'Enter' && handleAddCertification()}
          />
          <Button onClick={handleAddCertification}>
            <Plus className='mr-2 h-4 w-4' />
            {t('add')}
          </Button>
        </div>
      </div>

      {formData.certifications.length === 0 ? (
        <Card className='p-8 text-center'>
          <Award className='mx-auto mb-4 h-12 w-12 text-muted-foreground' />
          <h3 className='mb-2 text-lg font-semibold'>{t('noCertificationsYet')}</h3>
          <p className='text-muted-foreground'>
            {t('addCertificationsToBuildTrustWithYourCustomers')}
          </p>
        </Card>
      ) : (
        <div className='space-y-2'>
          <h4 className='font-medium'>{t('currentCertifications')}</h4>
          <div className='flex flex-wrap gap-2'>
            {formData.certifications.map((certification, index) => (
              <Badge
                key={index}
                variant='secondary'
                className='flex items-center space-x-1'
              >
                <span>{certification}</span>
                <Button
                  variant='ghost'
                  size='sm'
                  className='h-4 w-4 p-0 hover:bg-destructive hover:text-destructive-foreground'
                  onClick={() => onRemoveCertification(index)}
                >
                  <X className='h-3 w-3' />
                </Button>
              </Badge>
            ))}
          </div>
        </div>
      )}

      <div className='text-sm text-muted-foreground'>
        <p>
          {t('certificationsHelpIntro')}
        </p>
        <ul className='mt-2 list-inside list-disc space-y-1'>
          <li>{t('organicCertified')}</li>
          <li>{t('localProducer')}</li>
          <li>{t('traceable')}</li>
          <li>{t('fairTrade')}</li>
          <li>{t('nonGmo')}</li>
          <li>{t('halalCertified')}</li>
          <li>{t('kosherCertified')}</li>
        </ul>
      </div>
    </div>
  );
}
