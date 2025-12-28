'use client';

// Products tab component for supplier dashboard

import { useState } from 'react';
import { useSupplierProductsTab } from '@hooks/suppliers/use-supplier-products-tab';
import { Card } from '@components/ui/card';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
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
import { Label } from '@components/ui/label';
import { RadioGroup, RadioGroupItem } from '@components/ui/radio-group';
import { ProductCard } from './components/ProductCard';
import { ProductsHeader } from './components/ProductsHeader';
import type {
  Product,
  NewProductForm,
} from '@/types/suppliers/supplier-dashboard/types';
import { useLanguage } from '@contexts/LanguageContext';
import { toast } from 'sonner';
import { updateSupplierProduct } from '@/lib/data/services/suppliers/supplier-product-service';

type EditStockMode = 'set' | 'add';

interface EditProductForm {
  name: string;
  category: string;
  price: string;
  unit: string;
  stock: string;
  imageUrl: string;
}

interface EditProductErrors {
  name?: string;
  price?: string;
  stock?: string;
  addStock?: string;
}

interface SupplierProductsTabProps {
  products: Product[];
  onAddProduct: (product: NewProductForm) => void;
  onEditProduct: (productId: number) => void;
  onDeleteProduct: (productId: number) => void;
  onUpdateProduct: (
    productId: number,
    updatedProduct: Partial<Product>
  ) => void;
}

export function SupplierProductsTab({
  products,
  onAddProduct,
  onEditProduct,
  onDeleteProduct,
  onUpdateProduct,
}: SupplierProductsTabProps) {
  const { t } = useLanguage();
  const {
    isAddProductOpen,
    setIsAddProductOpen,
    searchTerm,
    setSearchTerm,
    categoryFilter,
    setCategoryFilter,
    filteredProducts,
    newProduct,
    setNewProduct,
    resetNewProduct,
  } = useSupplierProductsTab(products);

  const [isEditProductOpen, setIsEditProductOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<number | null>(null);
  const [editProduct, setEditProduct] = useState<EditProductForm>({
    name: '',
    category: 'vegetables',
    price: '',
    unit: 'kg',
    stock: '',
    imageUrl: '',
  });
  const [editErrors, setEditErrors] = useState<EditProductErrors>({});
  const [stockMode, setStockMode] = useState<EditStockMode>('set');
  const [addStock, setAddStock] = useState('');

  const editingProductItem =
    editingProductId === null
      ? null
      : products.find(p => p.id === editingProductId) ?? null;

  const currentStock = editingProductItem?.stock ?? 0;

  const parsedAddStock = addStock === '' ? 0 : Number(addStock);
  const computedNewStock =
    stockMode === 'add'
      ? currentStock + (Number.isFinite(parsedAddStock) ? parsedAddStock : 0)
      : Number(editProduct.stock);

  const handleAddProduct = () => {
    onAddProduct(newProduct);
    resetNewProduct();
    setIsAddProductOpen(false);
  };

  const openEditDialog = (productId: number) => {
    onEditProduct(productId);
    const product = products.find(p => p.id === productId);
    if (!product) return;

    setEditingProductId(productId);
    setEditProduct({
      name: product.name,
      category: product.category,
      price: String(product.price),
      unit: product.unit,
      stock: String(product.stock),
      imageUrl: product.image,
    });
    setStockMode('set');
    setAddStock('');
    setEditErrors({});
    setIsEditProductOpen(true);
  };

  const closeEditDialog = () => {
    setIsEditProductOpen(false);
    setEditingProductId(null);
    setAddStock('');
    setEditErrors({});
  };

  const validateEditForm = (): {
    valid: boolean;
    nextStock: number | null;
    nextPrice: number | null;
  } => {
    const errors: EditProductErrors = {};

    if (!editProduct.name.trim()) {
      errors.name = t('requiredFieldError');
    }

    const priceNumber = Number(editProduct.price);
    if (!Number.isFinite(priceNumber) || priceNumber <= 0) {
      errors.price = t('priceMustBePositiveNumber');
    }

    const isNonNegativeInteger = (value: number) =>
      Number.isFinite(value) && value >= 0 && Number.isInteger(value);

    let nextStock: number | null = null;

    if (stockMode === 'set') {
      const stockNumber = Number(editProduct.stock);
      if (!isNonNegativeInteger(stockNumber)) {
        errors.stock = t('stockMustBeNonNegativeInteger');
      } else {
        nextStock = stockNumber;
      }
    } else {
      const addStockNumber = Number(addStock);
      if (addStock === '') {
        errors.addStock = t('requiredFieldError');
      } else if (!isNonNegativeInteger(addStockNumber)) {
        errors.addStock = t('stockMustBeNonNegativeInteger');
      } else {
        nextStock = currentStock + addStockNumber;
      }
    }

    setEditErrors(errors);
    return {
      valid: Object.keys(errors).length === 0,
      nextStock,
      nextPrice: Number.isFinite(priceNumber) ? priceNumber : null,
    };
  };

  const handleSaveEdit = async () => {
    if (editingProductId === null) return;

    const { valid, nextStock, nextPrice } = validateEditForm();
    if (!valid || nextStock === null || nextPrice === null) {
      toast.error(t('invalidInputTitle'), {
        description: t('invalidInputDescription'),
      });
      return;
    }

    try {
      await updateSupplierProduct(String(editingProductId), {
        name: editProduct.name.trim(),
        category: editProduct.category,
        price: nextPrice,
        unit: editProduct.unit,
        stock: nextStock,
        image: editProduct.imageUrl,
      });

      onUpdateProduct(editingProductId, {
        name: editProduct.name.trim(),
        category: editProduct.category,
        price: nextPrice,
        unit: editProduct.unit,
        stock: nextStock,
        image: editProduct.imageUrl,
        status: nextStock > 0 ? 'inStock' : 'outOfStock',
      });

      toast.success(t('productUpdatedSuccessfully'));
      closeEditDialog();
    } catch (e) {
      toast.error(t('productUpdateFailed'));
    }
  };

  return (
    <div className='space-y-6'>
      <ProductsHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        onOpenAdd={() => setIsAddProductOpen(true)}
      />

      <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {filteredProducts.map(p => (
          <ProductCard
            key={p.id}
            id={p.id}
            name={p.name}
            image={p.image}
            status={p.status}
            category={p.category}
            price={String(p.price)}
            unit={p.unit}
            stock={p.stock}
            sales={p.sales}
            revenue={p.revenue}
            onEdit={openEditDialog}
            onDelete={onDeleteProduct}
          />
        ))}
      </div>

      <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
        <DialogContent className='sm:max-w-md'>
          <DialogHeader>
            <DialogTitle>{t('addNewProduct')}</DialogTitle>
            <DialogDescription>
              {t('addNewProductDescription')}
            </DialogDescription>
          </DialogHeader>
          <div className='space-y-4'>
            <div>
              <Label htmlFor='name'>{t('productName')}</Label>
              <Input
                id='name'
                value={newProduct.name}
                onChange={e =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
                placeholder={t('enterProductName')}
              />
            </div>
            <div>
              <Label htmlFor='category'>{t('category')}</Label>
              <Select
                value={newProduct.category}
                onValueChange={value =>
                  setNewProduct({ ...newProduct, category: value })
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
                </SelectContent>
              </Select>
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <Label htmlFor='price'>{t('price')}</Label>
                <Input
                  id='price'
                  type='number'
                  step='0.01'
                  value={newProduct.price}
                  onChange={e =>
                    setNewProduct({ ...newProduct, price: e.target.value })
                  }
                  placeholder={t('pricePlaceholder')}
                />
              </div>
              <div>
                <Label htmlFor='unit'>{t('unit')}</Label>
                <Select
                  value={newProduct.unit}
                  onValueChange={value =>
                    setNewProduct({ ...newProduct, unit: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='kg'>kg</SelectItem>
                    <SelectItem value='lb'>lb</SelectItem>
                    <SelectItem value='piece'>{t('pieceUnit')}</SelectItem>
                    <SelectItem value='bunch'>{t('bunchUnit')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor='stock'>{t('initialStock')}</Label>
              <Input
                id='stock'
                type='number'
                value={newProduct.stock}
                onChange={e =>
                  setNewProduct({ ...newProduct, stock: e.target.value })
                }
                placeholder={t('zeroPlaceholder')}
              />
            </div>
            <div>
              <Label htmlFor='imageUrl'>{t('imageUrlOptional')}</Label>
              <Input
                id='imageUrl'
                value={newProduct.imageUrl}
                onChange={e =>
                  setNewProduct({ ...newProduct, imageUrl: e.target.value })
                }
                placeholder={t('imageUrlPlaceholder')}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant='outline'
              onClick={() => setIsAddProductOpen(false)}
            >
              {t('cancel')}
            </Button>
            <Button onClick={handleAddProduct}>{t('addProduct')}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={isEditProductOpen}
        onOpenChange={open => {
          if (!open) closeEditDialog();
          else setIsEditProductOpen(true);
        }}
      >
        <DialogContent className='sm:max-w-md'>
          <DialogHeader>
            <DialogTitle>{t('editProduct')}</DialogTitle>
            <DialogDescription>
              {t('updateProductInformationBelow')}
            </DialogDescription>
          </DialogHeader>

          <div className='space-y-4'>
            <div>
              <Label htmlFor='edit-name'>{t('productName')}</Label>
              <Input
                id='edit-name'
                value={editProduct.name}
                onChange={e =>
                  setEditProduct({ ...editProduct, name: e.target.value })
                }
                placeholder={t('enterProductName')}
                aria-invalid={Boolean(editErrors.name)}
              />
              {editErrors.name ? (
                <p className='mt-1 text-sm text-destructive'>{editErrors.name}</p>
              ) : null}
            </div>

            <div>
              <Label htmlFor='edit-category'>{t('category')}</Label>
              <Select
                value={editProduct.category}
                onValueChange={value =>
                  setEditProduct({ ...editProduct, category: value })
                }
              >
                <SelectTrigger id='edit-category'>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='vegetables'>{t('vegetables')}</SelectItem>
                  <SelectItem value='fruits'>{t('fruits')}</SelectItem>
                  <SelectItem value='dairy'>{t('dairy')}</SelectItem>
                  <SelectItem value='meat'>{t('meat')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <div>
                <Label htmlFor='edit-price'>{t('price')}</Label>
                <Input
                  id='edit-price'
                  type='number'
                  step='0.01'
                  value={editProduct.price}
                  onChange={e =>
                    setEditProduct({ ...editProduct, price: e.target.value })
                  }
                  placeholder={t('pricePlaceholder')}
                  aria-invalid={Boolean(editErrors.price)}
                />
                {editErrors.price ? (
                  <p className='mt-1 text-sm text-destructive'>
                    {editErrors.price}
                  </p>
                ) : null}
              </div>
              <div>
                <Label htmlFor='edit-unit'>{t('unit')}</Label>
                <Select
                  value={editProduct.unit}
                  onValueChange={value =>
                    setEditProduct({ ...editProduct, unit: value })
                  }
                >
                  <SelectTrigger id='edit-unit'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='kg'>kg</SelectItem>
                    <SelectItem value='lb'>lb</SelectItem>
                    <SelectItem value='piece'>{t('pieceUnit')}</SelectItem>
                    <SelectItem value='bunch'>{t('bunchUnit')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>{t('stockUpdateMode')}</Label>
              <RadioGroup
                value={stockMode}
                onValueChange={value => setStockMode(value as EditStockMode)}
                className='mt-2'
              >
                <div className='flex items-center gap-2'>
                  <RadioGroupItem value='set' id='stock-mode-set' />
                  <Label htmlFor='stock-mode-set' className='font-normal'>
                    {t('setStock')}
                  </Label>
                </div>
                <div className='flex items-center gap-2'>
                  <RadioGroupItem value='add' id='stock-mode-add' />
                  <Label htmlFor='stock-mode-add' className='font-normal'>
                    {t('addStock')}
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {stockMode === 'set' ? (
              <div>
                <Label htmlFor='edit-stock'>{t('stock')}</Label>
                <Input
                  id='edit-stock'
                  type='number'
                  value={editProduct.stock}
                  onChange={e =>
                    setEditProduct({ ...editProduct, stock: e.target.value })
                  }
                  placeholder={t('zeroPlaceholder')}
                  aria-invalid={Boolean(editErrors.stock)}
                />
                {editErrors.stock ? (
                  <p className='mt-1 text-sm text-destructive'>
                    {editErrors.stock}
                  </p>
                ) : null}
              </div>
            ) : (
              <div className='space-y-2'>
                <div>
                  <Label htmlFor='edit-add-stock'>{t('additionalStock')}</Label>
                  <Input
                    id='edit-add-stock'
                    type='number'
                    value={addStock}
                    onChange={e => setAddStock(e.target.value)}
                    placeholder={t('zeroPlaceholder')}
                    aria-invalid={Boolean(editErrors.addStock)}
                  />
                  {editErrors.addStock ? (
                    <p className='mt-1 text-sm text-destructive'>
                      {editErrors.addStock}
                    </p>
                  ) : null}
                </div>
                <Card className='p-3'>
                  <div className='text-sm text-muted-foreground'>
                    {t('stockPreview')}
                  </div>
                  <div className='mt-1 text-sm'>
                    <span className='font-medium'>{t('currentStock')}:</span>{' '}
                    {currentStock} + <span className='font-medium'>{t('addStock')}:</span>{' '}
                    {addStock === '' ? 0 : addStock} ={' '}
                    <span className='font-medium'>{t('newTotalStock')}:</span>{' '}
                    {Number.isFinite(computedNewStock) ? computedNewStock : currentStock}
                  </div>
                </Card>
              </div>
            )}

            <div>
              <Label htmlFor='edit-image-url'>{t('imageUrlOptional')}</Label>
              <Input
                id='edit-image-url'
                value={editProduct.imageUrl}
                onChange={e =>
                  setEditProduct({ ...editProduct, imageUrl: e.target.value })
                }
                placeholder={t('imageUrlPlaceholder')}
              />
            </div>

            {editingProductItem ? (
              <div className='grid grid-cols-2 gap-4'>
                <div className='text-sm'>
                  <div className='text-muted-foreground'>{t('sales')}</div>
                  <div className='font-medium'>{editingProductItem.sales}</div>
                </div>
                <div className='text-sm'>
                  <div className='text-muted-foreground'>{t('revenueLabel')}</div>
                  <div className='font-medium'>{editingProductItem.revenue}</div>
                </div>
              </div>
            ) : null}
          </div>

          <DialogFooter>
            <Button variant='outline' onClick={closeEditDialog}>
              {t('cancel')}
            </Button>
            <Button onClick={handleSaveEdit}>{t('saveChanges')}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
