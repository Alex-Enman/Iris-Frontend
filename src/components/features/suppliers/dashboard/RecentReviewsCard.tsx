'use client';

import { Star } from 'lucide-react';
import { Badge } from '@components/ui/badge';
import { Card } from '@components/ui/card';
import { useLanguage } from '@contexts/LanguageContext';

export function RecentReviewsCard() {
  const { t } = useLanguage();
  return (
    <Card className='rounded-3xl border-0 shadow-[0_2px_8px_rgba(0,0,0,0.08)]'>
      <div className='border-b border-border p-6'>
        <div className='flex items-center gap-2'>
          <div className='rounded-xl bg-accent/10 p-2'>
            <Star className='h-5 w-5 text-accent' />
          </div>
          <h3 className='text-lg'>{t('recentReviews')}</h3>
        </div>
      </div>
      <div className='p-6'>
        <div className='space-y-4'>
          <div className='rounded-2xl border-2 border-accent/10 bg-accent/5 p-4'>
            <div className='mb-2 flex items-start justify-between'>
              <div className='flex items-center gap-2'>
                <div className='flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground'>
                  GT
                </div>
                <div>
                  <h4 className='text-sm font-medium'>{t('greenTable')}</h4>
                  <div className='flex gap-0.5'>
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className='h-3 w-3 fill-accent text-accent'
                      />
                    ))}
                  </div>
                </div>
              </div>
              <Badge variant='secondary' className='text-xs'>
                1 {t('dayAgo')}
              </Badge>
            </div>
            <p className='text-sm text-muted-foreground'>
              "{t('reviewExceptionalQualityTomatoes')}"
            </p>
          </div>

          <div className='rounded-2xl border-2 border-accent/10 bg-accent/5 p-4'>
            <div className='mb-2 flex items-start justify-between'>
              <div className='flex items-center gap-2'>
                <div className='flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground'>
                  FF
                </div>
                <div>
                  <h4 className='text-sm font-medium'>{t('farmToFork')}</h4>
                  <div className='flex gap-0.5'>
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className='h-3 w-3 fill-accent text-accent'
                      />
                    ))}
                  </div>
                </div>
              </div>
              <Badge variant='secondary' className='text-xs'>
                2 {t('daysAgo')}
              </Badge>
            </div>
            <p className='text-sm text-muted-foreground'>
              "{t('reviewReliableDeliveriesGreatCommunication')}"
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
