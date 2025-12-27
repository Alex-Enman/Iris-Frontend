'use client';

import { Button } from '@components/ui/button';
import { Badge } from '@components/ui/badge';
import { Card } from '@components/ui/card';
import { ImageWithFallback } from '@components/ui/image-with-fallback';
import { Avatar, AvatarFallback } from '@components/ui/avatar';
import { Mail, Phone, Globe, MapPin, Star, Award, Edit } from 'lucide-react';
import type { SupplierInfo } from '@/types/suppliers/supplier-dashboard/types';
import { useLanguage } from '@contexts/LanguageContext';

interface SupplierProfileTabProps {
  supplierInfo: SupplierInfo;
  onEdit?: () => void;
}

export function SupplierProfileTab({
  supplierInfo,
  onEdit,
}: SupplierProfileTabProps) {
  const { t } = useLanguage();

  const getCategoryLabel = (value: string) => {
    switch (value) {
      case 'organicVegetables':
        return t('storeCategoryOrganicVegetables');
      case 'freshProduce':
        return t('storeCategoryFreshProduce');
      case 'dairyProducts':
        return t('storeCategoryDairyProducts');
      case 'meatAndPoultry':
        return t('storeCategoryMeatAndPoultry');
      case 'bakeryItems':
        return t('storeCategoryBakeryItems');
      case 'pantryStaples':
        return t('storeCategoryPantryStaples');
      case 'frozenFoods':
        return t('storeCategoryFrozenFoods');
      case 'specialtyFoods':
        return t('storeCategorySpecialtyFoods');
      case 'beverages':
        return t('beverages');
      case 'other':
        return t('other');
      default:
        return value;
    }
  };

  return (
    <Card className='overflow-hidden rounded-3xl border-0 shadow-[0_2px_8px_rgba(0,0,0,0.08)]'>
      <div className='bg-gradient-to-br from-primary/10 to-accent/5 p-6'>
        <div className='flex items-start justify-between'>
          <div>
            <div className='mb-2 flex items-center gap-2'>
              <h2 className='text-2xl text-primary'>{supplierInfo.name}</h2>
              {supplierInfo.verified && (
                <Badge className='bg-primary'>
                  <Award className='mr-1 h-3 w-3' />
                  {t('verified')}
                </Badge>
              )}
            </div>
            <p className='mb-1 text-muted-foreground'>
              {getCategoryLabel(supplierInfo.category)}
            </p>
            <p className='text-sm text-muted-foreground'>
              {supplierInfo.location}
            </p>
          </div>
          <Button onClick={onEdit} className='rounded-xl'>
            <Edit className='mr-2 h-4 w-4' />
            {t('editStoreProfile')}
          </Button>
        </div>
      </div>

      <div className='p-6'>
        <p className='mb-4 leading-relaxed text-foreground'>
          {supplierInfo.description}
        </p>
        <div className='flex flex-wrap gap-2'>
          {supplierInfo.certifications.map((cert, i) => (
            <Badge key={i} variant='outline'>
              {cert}
            </Badge>
          ))}
        </div>

        <div className='mt-6 space-y-4 border-t border-border pt-6'>
          <h3 className='text-lg'>{t('contactInformation')}</h3>
          <div className='grid gap-4 md:grid-cols-2'>
            <div className='flex items-center gap-3 rounded-xl bg-muted/30 p-4'>
              <Mail className='h-5 w-5 text-primary' />
              <div>
                <p className='text-xs text-muted-foreground'>{t('email')}</p>
                <p className='text-sm'>{supplierInfo.email}</p>
              </div>
            </div>
            <div className='flex items-center gap-3 rounded-xl bg-muted/30 p-4'>
              <Phone className='h-5 w-5 text-primary' />
              <div>
                <p className='text-xs text-muted-foreground'>{t('phone')}</p>
                <p className='text-sm'>{supplierInfo.phone}</p>
              </div>
            </div>
            <div className='flex items-center gap-3 rounded-xl bg-muted/30 p-4'>
              <Globe className='h-5 w-5 text-primary' />
              <div>
                <p className='text-xs text-muted-foreground'>{t('website')}</p>
                <p className='text-sm'>{supplierInfo.website}</p>
              </div>
            </div>
            <div className='flex items-center gap-3 rounded-xl bg-muted/30 p-4'>
              <MapPin className='h-5 w-5 text-primary' />
              <div>
                <p className='text-xs text-muted-foreground'>{t('locationLabel')}</p>
                <p className='text-sm'>{supplierInfo.location}</p>
              </div>
            </div>
          </div>
        </div>

        <div className='mt-6 space-y-4 border-t border-border pt-6'>
          <h3 className='text-lg'>{t('storeStatistics')}</h3>
          <div className='grid gap-4 md:grid-cols-3'>
            <div className='rounded-xl bg-muted/30 p-4'>
              <p className='mb-1 text-xs text-muted-foreground'>{t('rating')}</p>
              <div className='flex items-center gap-2'>
                <Star className='h-4 w-4 fill-accent text-accent' />
                <span className='text-lg'>{supplierInfo.rating}</span>
                <span className='text-xs text-muted-foreground'>
                  ({supplierInfo.totalReviews} {t('reviews')})
                </span>
              </div>
            </div>
            <div className='rounded-xl bg-muted/30 p-4'>
              <p className='mb-1 text-xs text-muted-foreground'>{t('memberSinceLabel')}</p>
              <p className='text-lg'>{supplierInfo.memberSince}</p>
            </div>
            <div className='rounded-xl bg-muted/30 p-4'>
              <p className='mb-1 text-xs text-muted-foreground'>{t('status')}</p>
              <p className='text-lg'>
                {supplierInfo.verified ? t('verified') : t('unverified')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
