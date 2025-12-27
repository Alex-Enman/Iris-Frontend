// Order filters component for orders page

import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select';
import { Search, Filter } from 'lucide-react';
import { OrderFilters as OrderFiltersType } from '@/types/orders/types';
import { useLanguage } from '@contexts/LanguageContext';

interface OrderFiltersProps {
  filters: OrderFiltersType;
  onFiltersChange: (filters: OrderFiltersType) => void;
  suppliers: string[];
}

export function OrderFilters({
  filters,
  onFiltersChange,
  suppliers,
}: OrderFiltersProps) {
  const { t } = useLanguage();
  const handleFilterChange = (key: keyof OrderFiltersType, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  return (
    <div className='space-y-4 rounded-lg border bg-white p-4'>
      <div className='flex items-center space-x-2'>
        <Filter className='h-5 w-5 text-primary' />
        <h3 className='text-lg font-semibold'>{t('filters')}</h3>
      </div>

      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <div>
          <Label htmlFor='search'>{t('searchOrders')}</Label>
          <div className='relative'>
            <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground' />
            <Input
              id='search'
              placeholder={t('searchOrdersPlaceholder')}
              value={filters.searchTerm}
              onChange={e => handleFilterChange('searchTerm', e.target.value)}
              className='pl-10'
            />
          </div>
        </div>

        <div>
          <Label htmlFor='status'>{t('status')}</Label>
          <Select
            value={filters.status}
            onValueChange={value => handleFilterChange('status', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder={t('allStatus')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>{t('allStatus')}</SelectItem>
              <SelectItem value='processing'>{t('processing')}</SelectItem>
              <SelectItem value='confirmed'>{t('confirmed')}</SelectItem>
              <SelectItem value='inTransit'>{t('inTransit')}</SelectItem>
              <SelectItem value='delivered'>{t('delivered')}</SelectItem>
              <SelectItem value='draft'>{t('draft')}</SelectItem>
              <SelectItem value='reorder'>{t('reorder')}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor='supplier'>{t('supplier')}</Label>
          <Select
            value={filters.supplier}
            onValueChange={value => handleFilterChange('supplier', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder={t('allSuppliers')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>{t('allSuppliers')}</SelectItem>
              {suppliers.map(supplier => (
                <SelectItem key={supplier} value={supplier}>
                  {supplier}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor='dateRange'>{t('dateRange')}</Label>
          <Select
            value={filters.dateRange}
            onValueChange={value => handleFilterChange('dateRange', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder={t('allTime')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>{t('allTime')}</SelectItem>
              <SelectItem value='today'>{t('today')}</SelectItem>
              <SelectItem value='week'>{t('thisWeek')}</SelectItem>
              <SelectItem value='month'>{t('thisMonth')}</SelectItem>
              <SelectItem value='quarter'>{t('thisQuarter')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {(filters.searchTerm ||
        filters.status !== 'all' ||
        filters.supplier !== 'all' ||
        filters.dateRange !== 'all') && (
        <div className='flex items-center justify-between border-t pt-2'>
          <span className='text-sm text-muted-foreground'>
            {t('filtersApplied')}
          </span>
          <button
            onClick={() =>
              onFiltersChange({
                status: 'all',
                supplier: 'all',
                dateRange: 'all',
                searchTerm: '',
              })
            }
            className='text-sm text-primary hover:underline'
          >
            {t('clearAllFilters')}
          </button>
        </div>
      )}
    </div>
  );
}
