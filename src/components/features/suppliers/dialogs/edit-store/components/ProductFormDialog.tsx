'use client';

import { useMemo } from 'react';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select';
import { ProductFormData } from '@/types/suppliers/edit-store/types';
import { useLanguage } from '@contexts/LanguageContext';
import { Switch } from '@components/ui/switch';
import { formatCurrency } from '@/utils/formatters';

export interface ProductFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: ProductFormData;
  onProductChange: (product: ProductFormData) => void;
  isEditing: boolean;
  onSave: () => void;
  onCancel: () => void;
}

export function ProductFormDialog({
  open,
  onOpenChange,
  product,
  onProductChange,
  isEditing,
  onSave,
  onCancel,
}: ProductFormDialogProps) {
  const { t } = useLanguage();

  const pricingMode = product.pricingMode ?? 'perKg';
  const batchWeightValue = Number(product.batchWeightKg);
  const batchPriceValue = Number(product.batchPriceSek);
  const derivedPricePerKg = useMemo(() => {
    if (pricingMode !== 'batch') return null;
    if (!Number.isFinite(batchWeightValue) || batchWeightValue <= 0) return null;
    if (!Number.isFinite(batchPriceValue) || batchPriceValue <= 0) return null;
    return batchPriceValue / batchWeightValue;
  }, [batchPriceValue, batchWeightValue, pricingMode]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>
            {isEditing ? t('editProduct') : t('addNewProduct')}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? t('updateProductInformationBelow')
              : t('addNewProductToStoreCatalog')}
          </DialogDescription>
        </DialogHeader>
        <div className='space-y-4'>
          <div>
            <Label htmlFor='name'>{t('productName')}</Label>
            <Input
              id='name'
              value={product.name}
              onChange={e =>
                onProductChange({ ...product, name: e.target.value })
              }
              placeholder={t('enterProductName')}
            />
          </div>
          <div>
            <Label htmlFor='category'>{t('category')}</Label>
            <Select
              value={product.category}
              onValueChange={value =>
                onProductChange({ ...product, category: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='vegetables'>{t('vegetables')}</SelectItem>
                <SelectItem value='fruits'>{t('fruits')}</SelectItem>
                <SelectItem value='dairy'>{t('dairy')}</SelectItem>
                <SelectItem value='meat'>{t('meat')}</SelectItem>
                <SelectItem value='bakery'>{t('bakery')}</SelectItem>
                <SelectItem value='beverages'>{t('beverages')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className='flex items-center justify-between gap-4 rounded-lg border border-border p-3'>
            <div className='space-y-1'>
              <div className='text-sm font-medium'>{t('soldInBatchesLabel')}</div>
              <div className='text-xs text-muted-foreground'>
                {t('soldInBatchesDescription')}
              </div>
            </div>
            <Switch
              checked={pricingMode === 'batch'}
              onCheckedChange={checked =>
                onProductChange({
                  ...product,
                  pricingMode: checked ? 'batch' : 'perKg',
                  unit: checked ? 'kg' : product.unit,
                  batchWeightKg: checked ? product.batchWeightKg ?? '' : '',
                  batchPriceSek: checked ? product.batchPriceSek ?? '' : '',
                })
              }
            />
          </div>

          {pricingMode === 'batch' ? (
            <div className='space-y-4'>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <Label htmlFor='batch-weight'>{t('batchWeightKgLabel')}</Label>
                  <Input
                    id='batch-weight'
                    type='number'
                    step='0.01'
                    value={product.batchWeightKg ?? ''}
                    onChange={e =>
                      onProductChange({
                        ...product,
                        batchWeightKg: e.target.value,
                        unit: 'kg',
                      })
                    }
                    placeholder={t('zeroPlaceholder')}
                  />
                </div>
                <div>
                  <Label htmlFor='batch-price'>{t('batchPriceSekLabel')}</Label>
                  <Input
                    id='batch-price'
                    type='number'
                    step='0.01'
                    value={product.batchPriceSek ?? ''}
                    onChange={e =>
                      onProductChange({
                        ...product,
                        batchPriceSek: e.target.value,
                        unit: 'kg',
                      })
                    }
                    placeholder={t('pricePlaceholder')}
                  />
                </div>
              </div>
              {derivedPricePerKg !== null ? (
                <div className='text-xs text-muted-foreground'>
                  {t('pricePerKgLabel')}: {formatCurrency(derivedPricePerKg, 'SEK')}/{t('kgShort')}
                </div>
              ) : null}
            </div>
          ) : (
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <Label htmlFor='price'>{t('price')}</Label>
                <Input
                  id='price'
                  type='number'
                  step='0.01'
                  value={product.price}
                  onChange={e =>
                    onProductChange({ ...product, price: e.target.value })
                  }
                  placeholder={t('pricePlaceholder')}
                />
              </div>
              <div>
                <Label htmlFor='unit'>{t('unit')}</Label>
                <Select
                  value={product.unit}
                  onValueChange={value =>
                    onProductChange({ ...product, unit: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='kg'>kg</SelectItem>
                    <SelectItem value='lb'>lb</SelectItem>
                    <SelectItem value='piece'>piece</SelectItem>
                    <SelectItem value='bunch'>bunch</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <div>
            <Label htmlFor='stock'>
              {pricingMode === 'batch' ? t('stockBatches') : t('stockQuantity')}
            </Label>
            <Input
              id='stock'
              type='number'
              value={product.stock}
              onChange={e =>
                onProductChange({ ...product, stock: e.target.value })
              }
              placeholder={t('zeroPlaceholder')}
            />
          </div>
          <div>
            <Label htmlFor='description'>{t('descriptionOptional')}</Label>
            <Input
              id='description'
              value={product.description}
              onChange={e =>
                onProductChange({ ...product, description: e.target.value })
              }
              placeholder={t('enterProductDescription')}
            />
          </div>
          <div>
            <Label htmlFor='imageUrl'>{t('imageUrlOptional')}</Label>
            <Input
              id='imageUrl'
              value={product.imageUrl}
              onChange={e =>
                onProductChange({ ...product, imageUrl: e.target.value })
              }
              placeholder={t('imageUrlPlaceholder')}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant='outline' onClick={onCancel}>
            {t('cancel')}
          </Button>
          <Button onClick={onSave}>
            {isEditing ? t('updateProduct') : t('addProductButton')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
