import { Search } from 'lucide-react';
import { Input } from '@components/ui/input';
import { Badge } from '@components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select';
import { useLanguage } from '@contexts/LanguageContext';

interface RestaurantFiltersBarProps {
  searchQuery: string;
  setSearchQuery: (v: string) => void;
  cuisineFilter: string;
  setCuisineFilter: (v: string) => void;
  locationFilter: string;
  setLocationFilter: (v: string) => void;
  sortBy: string;
  setSortBy: (v: string) => void;
  numFound: number;
  numCustomers: number;
  numSeeking: number;
}

export function RestaurantFiltersBar(props: RestaurantFiltersBarProps) {
  const { t } = useLanguage();
  const {
    searchQuery,
    setSearchQuery,
    cuisineFilter,
    setCuisineFilter,
    locationFilter,
    setLocationFilter,
    sortBy,
    setSortBy,
    numFound,
    numCustomers,
    numSeeking,
  } = props;
  return (
    <div className='mb-6 flex flex-col gap-4'>
      <div className='flex items-center gap-3'>
        <div className='relative flex-1'>
          <Search className='absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground' />
          <Input
            placeholder={t('searchRestaurantsPlaceholder')}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className='h-12 rounded-2xl pl-12'
          />
        </div>
        <Select value={cuisineFilter} onValueChange={setCuisineFilter}>
          <SelectTrigger className='h-12 w-[180px] rounded-2xl'>
            <SelectValue placeholder={t('allCuisines')} />
          </SelectTrigger>
          <SelectContent className='rounded-xl'>
            <SelectItem value='all'>{t('allCuisines')}</SelectItem>
            <SelectItem value='Italian'>{t('italian')}</SelectItem>
            <SelectItem value='Japanese'>{t('japanese')}</SelectItem>
            <SelectItem value='French'>{t('french')}</SelectItem>
            <SelectItem value='Contemporary'>{t('contemporary')}</SelectItem>
            <SelectItem value='Vegetarian'>{t('vegetarian')}</SelectItem>
            <SelectItem value='Vegan'>{t('vegan')}</SelectItem>
            <SelectItem value='Indian'>{t('indian')}</SelectItem>
            <SelectItem value='Seafood'>{t('seafood')}</SelectItem>
          </SelectContent>
        </Select>
        <Select value={locationFilter} onValueChange={setLocationFilter}>
          <SelectTrigger className='h-12 w-[180px] rounded-2xl'>
            <SelectValue placeholder={t('allLocations')} />
          </SelectTrigger>
          <SelectContent className='rounded-xl'>
            <SelectItem value='all'>{t('allLocations')}</SelectItem>
            <SelectItem value='Downtown'>{t('downtown')}</SelectItem>
            <SelectItem value='Midtown'>{t('midtown')}</SelectItem>
            <SelectItem value='East Side'>{t('eastSide')}</SelectItem>
            <SelectItem value='West End'>{t('westEnd')}</SelectItem>
            <SelectItem value='Waterfront'>{t('waterfront')}</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className='h-12 w-[180px] rounded-2xl'>
            <SelectValue placeholder={t('sortBy')} />
          </SelectTrigger>
          <SelectContent className='rounded-xl'>
            <SelectItem value='rating'>{t('highestRated')}</SelectItem>
            <SelectItem value='name'>{t('nameAZ')}</SelectItem>
            <SelectItem value='newest'>{t('newest')}</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className='flex items-center justify-between'>
        <p className='text-sm text-muted-foreground'>
          {numFound} {numFound === 1 ? t('restaurant') : t('restaurants')} {t('found')}
        </p>
        <div className='flex gap-2'>
          <Badge variant='outline' className='px-3 py-1'>
            {numCustomers} {t('customers')}
          </Badge>
          <Badge variant='outline' className='px-3 py-1'>
            {numSeeking} {t('seekingSuppliers')}
          </Badge>
        </div>
      </div>
    </div>
  );
}
