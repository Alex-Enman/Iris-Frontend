'use client';

import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import { Card } from '@components/ui/card';
import { ImageWithFallback } from '@components/ui/image-with-fallback';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';
import { Edit, MoreVertical, Trash2 } from 'lucide-react';
import { Product } from '@/types/suppliers/edit-store/types';
import { useLanguage } from '@contexts/LanguageContext';

export interface ProductCardProps {
  product: Product;
  onEdit: (productId: number) => void;
  onDelete: (productId: number) => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'inStock':
      return 'bg-green-100 text-green-800';
    case 'lowStock':
      return 'bg-yellow-100 text-yellow-800';
    case 'outOfStock':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getStatusLabelKey = (status: string) => {
  switch (status) {
    case 'inStock':
      return 'inStock';
    case 'lowStock':
      return 'lowStock';
    case 'outOfStock':
      return 'outOfStock';
    default:
      return null;
  }
};

export function ProductCard({ product, onEdit, onDelete }: ProductCardProps) {
  const { t } = useLanguage();
  const categoryLabel = (t(product.category as any) as string) ?? product.category;
  const statusKey = getStatusLabelKey(product.status);
  return (
    <Card className='p-4'>
      <div className='mb-3 flex items-start justify-between'>
        <div className='flex-1'>
          <h4 className='font-semibold'>{product.name}</h4>
          <p className='text-sm text-muted-foreground'>{categoryLabel}</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' size='sm'>
              <MoreVertical className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuItem onClick={() => onEdit(product.id)}>
              <Edit className='mr-2 h-4 w-4' />
              {t('edit')}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete(product.id)}>
              <Trash2 className='mr-2 h-4 w-4' />
              {t('delete')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className='relative mb-3 aspect-square'>
        <ImageWithFallback
          src={product.image}
          alt={product.name}
          className='h-full w-full rounded object-cover'
          fallbackSrc='https://via.placeholder.com/150'
        />
      </div>

      <div className='space-y-2'>
        <div className='flex justify-between text-sm'>
          <span className='text-muted-foreground'>{t('price')}:</span>
          <span className='font-medium'>
            €{product.price}/{product.unit}
          </span>
        </div>
        <div className='flex justify-between text-sm'>
          <span className='text-muted-foreground'>{t('stock')}:</span>
          <span className='font-medium'>
            {product.stock} {t('units')}
          </span>
        </div>
        <div className='flex items-center justify-between'>
          <span className='text-sm text-muted-foreground'>{t('status')}:</span>
          <Badge className={getStatusColor(product.status)}>
            {statusKey ? t(statusKey) : product.status}
          </Badge>
        </div>
      </div>
    </Card>
  );
}
