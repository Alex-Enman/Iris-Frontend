'use client';

import { Button } from '@components/ui/button';
import { Card } from '@components/ui/card';
import { Label } from '@components/ui/label';
import { Textarea } from '@components/ui/textarea';
import { FileText } from 'lucide-react';
import { useLanguage } from '@contexts/LanguageContext';

export interface PrivateNotesCardProps {
  notes: string;
  onNotesChange: (notes: string) => void;
  onSave: () => void;
}

export function PrivateNotesCard({
  notes,
  onNotesChange,
  onSave,
}: PrivateNotesCardProps) {
  const { t } = useLanguage();
  return (
    <Card className='rounded-3xl border-0 p-6 shadow-[0_2px_8px_rgba(0,0,0,0.08)]'>
      <div className='mb-4 flex items-center gap-2'>
        <FileText className='h-5 w-5 text-primary' />
        <h3>{t('privateNotes')}</h3>
      </div>
      <p className='mb-4 text-sm text-muted-foreground'>
        {t('privateNotesDescription')}
      </p>
      <div className='space-y-4'>
        <div>
          <Label htmlFor='notes'>{t('yourNotes')}</Label>
          <Textarea
            id='notes'
            value={notes}
            onChange={e => onNotesChange(e.target.value)}
            placeholder={t('privateNotesPlaceholder')}
            className='mt-2 min-h-[120px] rounded-xl'
          />
        </div>
        <Button
          onClick={onSave}
          className='rounded-xl bg-primary hover:bg-primary/90'
        >
          {t('saveNotes')}
        </Button>
      </div>
    </Card>
  );
}
