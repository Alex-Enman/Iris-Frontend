'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@components/ui/card';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { Search, Filter, Plus } from 'lucide-react';
import { useLanguage } from '@contexts/LanguageContext';

export default function ProductsPage() {
  const { t } = useLanguage();
  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>{t('products')}</h1>
          <p className='text-muted-foreground'>
            {t('productInventoryDescription')}
          </p>
        </div>
        <Button>
          <Plus className='mr-2 h-4 w-4' />
          {t('addProduct')}
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>{t('searchAndFilter')}</CardTitle>
          <CardDescription>
            {t('findProductsByNameCategoryOrSupplier')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex gap-4'>
            <div className='flex-1'>
              <div className='relative'>
                <Search className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
                <Input
                  placeholder={t('searchProductsPlaceholder')}
                  className='pl-10'
                />
              </div>
            </div>
            <Button variant='outline'>
              <Filter className='mr-2 h-4 w-4' />
              {t('filters')}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Products Grid */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {[1, 2, 3, 4, 5, 6].map(i => (
          <Card key={i}>
            <CardHeader>
              <CardTitle>
                {t('product')} {i}
              </CardTitle>
              <CardDescription>{t('freshOrganicProduce')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-2'>
                <div className='flex justify-between'>
                  <span className='text-sm text-muted-foreground'>
                    {t('price')}:
                  </span>
                  <span className='font-medium'>$12.99</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-sm text-muted-foreground'>
                    {t('stock')}:
                  </span>
                  <span className='font-medium'>24 units</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-sm text-muted-foreground'>
                    {t('supplierLabel')}:
                  </span>
                  <span className='font-medium'>Fresh Farms</span>
                </div>
              </div>
              <div className='mt-4 flex gap-2'>
                <Button size='sm' className='flex-1'>
                  {t('edit')}
                </Button>
                <Button size='sm' variant='outline'>
                  {t('view')}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
