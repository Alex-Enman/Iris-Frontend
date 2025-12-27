'use client';

import { Search } from 'lucide-react';
import { Button } from '@components/ui/button';
import { cn } from '../utils';
import { useLanguage } from '@contexts/LanguageContext';

interface EmptySearchStateProps {
  searchQuery?: string;
  onClearSearch?: () => void;
  className?: string;
}

export function EmptySearchState({
  searchQuery,
  onClearSearch,
  className,
}: EmptySearchStateProps) {
  const { t } = useLanguage();
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center p-12 text-center',
        className
      )}
    >
      <Search className='mb-4 h-12 w-12 text-muted-foreground' />
      <h3 className='mb-2 text-xl font-semibold text-foreground'>
        {t('noResultsFound')}
      </h3>
      <p className='mb-6 max-w-md text-muted-foreground'>
        {searchQuery
          ? `${t('noResultsFoundForPrefix')} "${searchQuery}". ${t('tryAdjustingSearchTerms')}`
          : `${t('noResultsFound')}. ${t('tryAdjustingSearchTerms')}`}
      </p>
      {onClearSearch && (
        <Button onClick={onClearSearch}>{t('clearSearch')}</Button>
      )}
    </div>
  );
}
