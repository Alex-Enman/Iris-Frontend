'use client';

// Basic info form component for edit store dialog

import { Input } from '@components/ui/input';
import { Textarea } from '@components/ui/textarea';
import { Label } from '@components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select';
import { StoreFormData } from '@/types/suppliers/edit-store/types';
import { useLanguage } from '@contexts/LanguageContext';

interface StoreBasicInfoFormProps {
  formData: StoreFormData;
  onUpdate: (updates: Partial<StoreFormData>) => void;
}

export function StoreBasicInfoForm({
  formData,
  onUpdate,
}: StoreBasicInfoFormProps) {
  const { t } = useLanguage();
  return (
    <div className='space-y-4'>
      <div>
        <Label htmlFor='storeName'>{t('storeName')}</Label>
        <Input
          id='storeName'
          value={formData.storeName}
          onChange={e => onUpdate({ storeName: e.target.value })}
          placeholder={t('enterStoreName')}
        />
      </div>

      <div>
        <Label htmlFor='storeCategory'>{t('category')}</Label>
        <Select
          value={formData.storeCategory}
          onValueChange={value => onUpdate({ storeCategory: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder={t('selectCategory')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='organicVegetables'>
              {t('storeCategoryOrganicVegetables')}
            </SelectItem>
            <SelectItem value='freshProduce'>
              {t('storeCategoryFreshProduce')}
            </SelectItem>
            <SelectItem value='dairyProducts'>
              {t('storeCategoryDairyProducts')}
            </SelectItem>
            <SelectItem value='meatAndPoultry'>
              {t('storeCategoryMeatAndPoultry')}
            </SelectItem>
            <SelectItem value='bakeryItems'>
              {t('storeCategoryBakeryItems')}
            </SelectItem>
            <SelectItem value='beverages'>{t('beverages')}</SelectItem>
            <SelectItem value='pantryStaples'>
              {t('storeCategoryPantryStaples')}
            </SelectItem>
            <SelectItem value='frozenFoods'>
              {t('storeCategoryFrozenFoods')}
            </SelectItem>
            <SelectItem value='specialtyFoods'>
              {t('storeCategorySpecialtyFoods')}
            </SelectItem>
            <SelectItem value='other'>{t('other')}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor='location'>{t('locationLabel')}</Label>
        <Input
          id='location'
          value={formData.location}
          onChange={e => onUpdate({ location: e.target.value })}
          placeholder={t('enterStoreLocation')}
        />
      </div>

      <div>
        <Label htmlFor='description'>{t('storeDescription')}</Label>
        <Textarea
          id='description'
          value={formData.description}
          onChange={e => onUpdate({ description: e.target.value })}
          placeholder={t('describeYourStorePlaceholder')}
          rows={4}
        />
      </div>
    </div>
  );
}
