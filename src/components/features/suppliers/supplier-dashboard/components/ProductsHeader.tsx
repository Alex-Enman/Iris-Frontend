import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select';
import { Label } from '@components/ui/label';
import { Search, Plus } from 'lucide-react';
import { useLanguage } from '@contexts/LanguageContext';

interface ProductsHeaderProps {
  searchTerm: string;
  setSearchTerm: (v: string) => void;
  categoryFilter: string;
  setCategoryFilter: (v: string) => void;
  onOpenAdd: () => void;
}

export function ProductsHeader({
  searchTerm,
  setSearchTerm,
  categoryFilter,
  setCategoryFilter,
  onOpenAdd,
}: ProductsHeaderProps) {
  const { t } = useLanguage();
  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <div>
          <h2 className='text-2xl font-bold'>{t('productInventory')}</h2>
          <p className='text-muted-foreground'>
            {t('productInventoryDescription')}
          </p>
        </div>
        <Button onClick={onOpenAdd}>
          <Plus className='mr-2 h-4 w-4' />
          {t('addProduct')}
        </Button>
      </div>

      <div className='flex items-center space-x-4'>
        <div className='relative max-w-sm flex-1'>
          <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground' />
          <Input
            placeholder={t('searchProductsPlaceholder')}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className='pl-10'
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className='w-48'>
            <SelectValue placeholder={t('filterByCategory')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>{t('allCategories')}</SelectItem>
            <SelectItem value='vegetables'>{t('vegetables')}</SelectItem>
            <SelectItem value='fruits'>{t('fruits')}</SelectItem>
            <SelectItem value='dairy'>{t('dairy')}</SelectItem>
            <SelectItem value='meat'>{t('meat')}</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
