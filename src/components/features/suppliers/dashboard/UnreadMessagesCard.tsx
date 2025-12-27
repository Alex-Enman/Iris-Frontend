'use client';

import { ArrowRight, MessageCircle } from 'lucide-react';
import { Button } from '@components/ui/button';
import { Badge } from '@components/ui/badge';
import { Card } from '@components/ui/card';
import { useSupplierDashboardTab } from '@/hooks/suppliers/use-supplier-dashboard-tab';
import { useLanguage } from '@contexts/LanguageContext';

export interface UnreadMessagesCardProps {
  onContactRestaurant?: (restaurantName: string) => void;
}

export function UnreadMessagesCard({
  onContactRestaurant,
}: UnreadMessagesCardProps) {
  const { t } = useLanguage();
  const { handleContactRestaurant } = useSupplierDashboardTab({
    onContactRestaurant,
  });

  return (
    <Card className='rounded-3xl border-0 shadow-[0_2px_8px_rgba(0,0,0,0.08)]'>
      <div className='border-b border-border p-6'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <div className='rounded-xl bg-primary/10 p-2'>
              <MessageCircle className='h-5 w-5 text-primary' />
            </div>
            <h3 className='text-lg'>{t('unreadMessages')}</h3>
          </div>
          <Badge className='bg-primary'>5</Badge>
        </div>
      </div>
      <div className='p-6'>
        <div className='space-y-3'>
          <button
            onClick={() => handleContactRestaurant(t('laCucina'))}
            className='w-full rounded-2xl border-2 border-primary/10 bg-primary/5 p-4 text-left transition-all hover:border-primary/20'
          >
            <div className='mb-2 flex items-start justify-between'>
              <div className='flex items-start gap-3'>
                <div className='flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm text-primary-foreground'>
                  LC
                </div>
                <div>
                  <h4 className='mb-1 font-medium'>{t('laCucina')}</h4>
                  <p className='text-sm text-muted-foreground'>
                    "{t('messageScheduleWeeklyDelivery')}"
                  </p>
                </div>
              </div>
              <Badge variant='secondary' className='text-xs'>
                2 {t('hoursAgo')}
              </Badge>
            </div>
          </button>

          <button
            onClick={() => handleContactRestaurant(t('greenTable'))}
            className='w-full rounded-2xl border-2 border-primary/10 bg-primary/5 p-4 text-left transition-all hover:border-primary/20'
          >
            <div className='mb-2 flex items-start justify-between'>
              <div className='flex items-start gap-3'>
                <div className='flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm text-primary-foreground'>
                  GT
                </div>
                <div>
                  <h4 className='mb-1 font-medium'>{t('greenTable')}</h4>
                  <p className='text-sm text-muted-foreground'>
                    "{t('messageInquiryAboutOrganicCertification')}"
                  </p>
                </div>
              </div>
              <Badge variant='secondary' className='text-xs'>
                5 {t('hoursAgo')}
              </Badge>
            </div>
          </button>

          <button
            onClick={() => handleContactRestaurant(t('theGarden'))}
            className='w-full rounded-2xl border-2 border-primary/10 bg-primary/5 p-4 text-left transition-all hover:border-primary/20'
          >
            <div className='mb-2 flex items-start justify-between'>
              <div className='flex items-start gap-3'>
                <div className='flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm text-primary-foreground'>
                  TG
                </div>
                <div>
                  <h4 className='mb-1 font-medium'>{t('theGarden')}</h4>
                  <p className='text-sm text-muted-foreground'>
                    "{t('messageThanksForFreshProduce')}"
                  </p>
                </div>
              </div>
              <Badge variant='secondary' className='text-xs'>
                1 {t('dayAgo')}
              </Badge>
            </div>
          </button>
        </div>
        <Button
          variant='outline'
          className='mt-4 w-full rounded-xl'
          onClick={() => handleContactRestaurant(t('inbox'))}
        >
          {t('viewAllMessages')}
          <ArrowRight className='ml-2 h-4 w-4' />
        </Button>
      </div>
    </Card>
  );
}
