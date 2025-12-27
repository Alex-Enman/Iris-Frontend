'use client';

import { Package } from 'lucide-react';
import { Button } from '@components/ui/button';
import { cn } from '../utils';
import { useLanguage } from '@contexts/LanguageContext';

interface EmptyProductsStateProps {
  onAddProduct?: () => void;
  onBrowseProducts?: () => void;
  className?: string;
}

export function EmptyProductsState({
  onAddProduct,
  onBrowseProducts,
  className,
}: EmptyProductsStateProps) {
  const { t } = useLanguage();
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center p-12 text-center',
        className
      )}
    >
      <Package className='mb-4 h-12 w-12 text-muted-foreground' />
      <h3 className='mb-2 text-xl font-semibold text-foreground'>
        {t('noProductsFound')}
      </h3>
      <p className='mb-6 max-w-md text-muted-foreground'>
        {t('noProductsAvailableDescription')}
      </p>
      <div className='flex gap-3'>
        {onBrowseProducts && (
          <Button onClick={onBrowseProducts}>{t('browseProducts')}</Button>
        )}
        {onAddProduct && (
          <Button variant='outline' onClick={onAddProduct}>
            {t('addProduct')}
          </Button>
        )}
      </div>
    </div>
  );
}
