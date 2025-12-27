'use client';

import { useState } from 'react';
import { useLanguage } from '@contexts/LanguageContext';
import { toast } from 'sonner';
import {
  FormLayout,
  FormSection,
  FormActions,
  FormField,
  FormInput,
  FormTextarea,
  FormSelect,
  FormSelectItem,
  FormButton,
  validateForm,
  commonRules,
} from '../index';

interface ProductFormData {
  name: string;
  description: string;
  category: string;
  price: string;
  quantity: string;
  supplier: string;
  isAvailable: boolean;
}

const initialData: ProductFormData = {
  name: '',
  description: '',
  category: '',
  price: '',
  quantity: '',
  supplier: '',
  isAvailable: true,
};

const validationRules = {
  name: commonRules.name,
  description: commonRules.description,
  category: commonRules.required,
  price: commonRules.price,
  quantity: commonRules.quantity,
  supplier: commonRules.required,
};

export function ProductForm() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<ProductFormData>(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange =
    (field: keyof ProductFormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value =
        e.target.type === 'checkbox'
          ? (e.target as HTMLInputElement).checked
          : e.target.value;

      setFormData(prev => ({ ...prev, [field]: value }));

      // Clear error when user starts typing
      if (errors[field]) {
        setErrors(prev => ({ ...prev, [field]: '' }));
      }
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateForm(formData, validationRules);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success(t('productCreatedSuccessfully'));
      // Reset form
      setFormData(initialData);
      setErrors({});
    } catch (error) {
      toast.error(t('productCreateFailed'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormLayout
      title={t('addNewProduct')}
      description={t('createNewProductForYourCatalog')}
    >
      <form onSubmit={handleSubmit} className='space-y-6'>
        <FormSection title={t('basicInformation')}>
          <FormField label={t('productName')} error={errors.name} required>
            <FormInput
              value={formData.name}
              onChange={handleInputChange('name')}
              placeholder={t('enterProductName')}
              error={!!errors.name}
            />
          </FormField>

          <FormField label={t('storeDescription')} error={errors.description}>
            <FormTextarea
              value={formData.description}
              onChange={handleInputChange('description')}
              placeholder={t('enterProductDescription')}
              rows={3}
              error={!!errors.description}
            />
          </FormField>

          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            <FormField label={t('category')} error={errors.category} required>
              <FormSelect
                value={formData.category}
                onValueChange={value =>
                  setFormData(prev => ({ ...prev, category: value }))
                }
                placeholder={t('selectCategory')}
                error={!!errors.category}
              >
                <FormSelectItem value='produce'>{t('produce')}</FormSelectItem>
                <FormSelectItem value='meat'>{t('meat')}</FormSelectItem>
                <FormSelectItem value='dairy'>{t('dairy')}</FormSelectItem>
                <FormSelectItem value='beverages'>{t('beverages')}</FormSelectItem>
                <FormSelectItem value='pantry'>{t('pantry')}</FormSelectItem>
              </FormSelect>
            </FormField>

            <FormField label={t('supplier')} error={errors.supplier} required>
              <FormSelect
                value={formData.supplier}
                onValueChange={value =>
                  setFormData(prev => ({ ...prev, supplier: value }))
                }
                placeholder={t('selectSupplier')}
                error={!!errors.supplier}
              >
                <FormSelectItem value='fresh-farms'>
                  {t('freshFarmsCo')}
                </FormSelectItem>
                <FormSelectItem value='organic-valley'>
                  {t('organicValley')}
                </FormSelectItem>
                <FormSelectItem value='local-harvest'>
                  {t('localHarvest')}
                </FormSelectItem>
                <FormSelectItem value='green-fields'>
                  {t('greenFields')}
                </FormSelectItem>
              </FormSelect>
            </FormField>
          </div>
        </FormSection>

        <FormSection title={t('pricingAndInventory')}>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            <FormField label={`${t('price')} ($)`} error={errors.price} required>
              <FormInput
                type='number'
                step='0.01'
                min='0'
                value={formData.price}
                onChange={handleInputChange('price')}
                placeholder={t('pricePlaceholder')}
                error={!!errors.price}
              />
            </FormField>

            <FormField label={t('quantity')} error={errors.quantity} required>
              <FormInput
                type='number'
                min='1'
                value={formData.quantity}
                onChange={handleInputChange('quantity')}
                placeholder={t('zeroPlaceholder')}
                error={!!errors.quantity}
              />
            </FormField>
          </div>

          <FormField label={t('availability')}>
            <div className='flex items-center space-x-2'>
              <input
                type='checkbox'
                checked={formData.isAvailable}
                onChange={handleInputChange('isAvailable')}
                className='rounded border-gray-300'
              />
              <label className='text-sm font-medium'>
                {t('productIsAvailableForPurchase')}
              </label>
            </div>
          </FormField>
        </FormSection>

        <FormActions>
          <FormButton type='button' variant='outline'>
            {t('cancel')}
          </FormButton>
          <FormButton type='submit' loading={isSubmitting}>
            {t('createProduct')}
          </FormButton>
        </FormActions>
      </form>
    </FormLayout>
  );
}
