'use client';

// Basic info form component for edit restaurant profile dialog

import { Input } from '@components/ui/input';
import { Textarea } from '@components/ui/textarea';
import { Label } from '@components/ui/label';
import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import { X, Plus } from 'lucide-react';
import { RestaurantProfile } from '@/types/user/edit-restaurant/types';
import { useLanguage } from '@contexts/LanguageContext';

interface RestaurantBasicInfoFormProps {
  profile: RestaurantProfile;
  newCuisine: string;
  onUpdate: (updates: Partial<RestaurantProfile>) => void;
  onAddCuisine: () => void;
  onRemoveCuisine: (index: number) => void;
  onNewCuisineChange: (value: string) => void;
}

export function RestaurantBasicInfoForm({
  profile,
  newCuisine,
  onUpdate,
  onAddCuisine,
  onRemoveCuisine,
  onNewCuisineChange,
}: RestaurantBasicInfoFormProps) {
  const { t } = useLanguage();
  const handleAddCuisine = () => {
    if (newCuisine.trim()) {
      onAddCuisine();
    }
  };

  return (
    <div className='space-y-4'>
      <div>
        <Label htmlFor='name'>{t('restaurantNameLabel')}</Label>
        <Input
          id='name'
          value={profile.name}
          onChange={e => onUpdate({ name: e.target.value })}
          placeholder={t('enterRestaurantName')}
        />
      </div>

      <div>
        <Label htmlFor='type'>{t('restaurantTypeLabel')}</Label>
        <Input
          id='type'
          value={profile.type}
          onChange={e => onUpdate({ type: e.target.value })}
          placeholder={t('restaurantTypePlaceholder')}
        />
      </div>

      <div>
        <Label htmlFor='cuisine'>{t('cuisineTypesLabel')}</Label>
        <div className='flex space-x-2'>
          <Input
            id='cuisine'
            value={newCuisine}
            onChange={e => onNewCuisineChange(e.target.value)}
            placeholder={t('addCuisineTypePlaceholder')}
            onKeyPress={e => e.key === 'Enter' && handleAddCuisine()}
          />
          <Button onClick={handleAddCuisine}>
            <Plus className='mr-2 h-4 w-4' />
            {t('add')}
          </Button>
        </div>
        <div className='mt-2 flex flex-wrap gap-2'>
          {profile.cuisine.map((cuisine, index) => (
            <Badge
              key={index}
              variant='secondary'
              className='flex items-center space-x-1'
            >
              <span>{cuisine}</span>
              <Button
                variant='ghost'
                size='sm'
                className='h-4 w-4 p-0 hover:bg-destructive hover:text-destructive-foreground'
                onClick={() => onRemoveCuisine(index)}
              >
                <X className='h-3 w-3' />
              </Button>
            </Badge>
          ))}
        </div>
      </div>

      <div>
        <Label htmlFor='location'>{t('locationLabel')}</Label>
        <Input
          id='location'
          value={profile.location}
          onChange={e => onUpdate({ location: e.target.value })}
          placeholder={t('restaurantLocationPlaceholder')}
        />
      </div>

      <div>
        <Label htmlFor='description'>{t('storeDescription')}</Label>
        <Textarea
          id='description'
          value={profile.description}
          onChange={e => onUpdate({ description: e.target.value })}
          placeholder={t('restaurantDescriptionPlaceholder')}
          rows={4}
        />
      </div>

      <div>
        <Label htmlFor='coverImage'>{t('coverImageUrl')}</Label>
        <Input
          id='coverImage'
          value={profile.coverImage}
          onChange={e => onUpdate({ coverImage: e.target.value })}
          placeholder={t('imageUrlPlaceholder')}
        />
      </div>

      <div className='grid grid-cols-2 gap-4'>
        <div>
          <Label htmlFor='seatingCapacity'>{t('seatingCapacity')}</Label>
          <Input
            id='seatingCapacity'
            value={profile.seatingCapacity}
            onChange={e => onUpdate({ seatingCapacity: e.target.value })}
            placeholder={t('seatingCapacityPlaceholder')}
          />
        </div>
        <div>
          <Label htmlFor='established'>{t('establishedYear')}</Label>
          <Input
            id='established'
            value={profile.established}
            onChange={e => onUpdate({ established: e.target.value })}
            placeholder={t('establishedYearPlaceholder')}
          />
        </div>
      </div>

      <div>
        <Label htmlFor='orderVolume'>{t('monthlyOrderVolume')}</Label>
        <Input
          id='orderVolume'
          value={profile.orderVolume}
          onChange={e => onUpdate({ orderVolume: e.target.value })}
          placeholder={t('monthlyOrderVolumePlaceholder')}
        />
      </div>
    </div>
  );
}
