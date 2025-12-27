import { Search } from 'lucide-react';
import { Input } from '@components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select';
import { useLanguage } from '@contexts/LanguageContext';

interface OrdersFilterBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
}

export function OrdersFilterBar({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
}: OrdersFilterBarProps) {
  const { t } = useLanguage();
  return (
    <div className='mb-6 flex gap-4'>
      <div className='flex-1'>
        <div className='relative'>
          <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
          <Input
            placeholder={t('searchOrdersShortPlaceholder')}
            value={searchTerm}
            onChange={e => onSearchChange(e.target.value)}
            className='pl-10'
          />
        </div>
      </div>
      <Select value={statusFilter} onValueChange={onStatusFilterChange}>
        <SelectTrigger className='w-[180px]'>
          <SelectValue placeholder={t('filterByStatus')} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='all'>{t('allStatuses')}</SelectItem>
          <SelectItem value='processing'>{t('processing')}</SelectItem>
          <SelectItem value='shipped'>{t('shipped')}</SelectItem>
          <SelectItem value='delivered'>{t('delivered')}</SelectItem>
          <SelectItem value='cancelled'>{t('cancelled')}</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
