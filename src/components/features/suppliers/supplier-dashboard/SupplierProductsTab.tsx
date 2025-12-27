'use client';

// Products tab component for supplier dashboard

import { useSupplierProductsTab } from '@hooks/suppliers/use-supplier-products-tab';
import { Card } from '@components/ui/card';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { ImageWithFallback } from '@components/ui/image-with-fallback';
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
import { ProductCard } from './components/ProductCard';
import { ProductsHeader } from './components/ProductsHeader';
import type {
  Product,
  NewProductForm,
} from '@/types/suppliers/supplier-dashboard/types';
import { useLanguage } from '@contexts/LanguageContext';

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
    editingProduct,
    setEditingProduct,
    searchTerm,
    setSearchTerm,
    categoryFilter,
    setCategoryFilter,
    filteredProducts,
    newProduct,
    setNewProduct,
    resetNewProduct,
  } = useSupplierProductsTab(products);

  const handleAddProduct = () => {
    onAddProduct(newProduct);
    resetNewProduct();
    setIsAddProductOpen(false);
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
            onEdit={onEditProduct}
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
    </div>
  );
}
