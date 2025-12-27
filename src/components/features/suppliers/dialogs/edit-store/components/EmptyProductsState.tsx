'use client';

import { Button } from '@components/ui/button';
import { Card } from '@components/ui/card';
import { Package, Plus } from 'lucide-react';
import { useLanguage } from '@contexts/LanguageContext';

export interface EmptyProductsStateProps {
  onAddProduct: () => void;
}

export function EmptyProductsState({ onAddProduct }: EmptyProductsStateProps) {
  const { t } = useLanguage();
  return (
    <Card className='p-8 text-center'>
      <Package className='mx-auto mb-4 h-12 w-12 text-muted-foreground' />
      <h3 className='mb-2 text-lg font-semibold'>{t('noProductsYet')}</h3>
      <p className='mb-4 text-muted-foreground'>
        {t('addYourFirstProductToGetStarted')}
      </p>
      <Button onClick={onAddProduct}>
        <Plus className='mr-2 h-4 w-4' />
        {t('addProduct')}
      </Button>
    </Card>
  );
}
