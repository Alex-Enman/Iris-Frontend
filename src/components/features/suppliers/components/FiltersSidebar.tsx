import { Button } from '@components/ui/button';
import { Checkbox } from '@components/ui/checkbox';
import { Label } from '@components/ui/label';
import { ScrollArea } from '@components/ui/scroll-area';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@components/ui/collapsible';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '@contexts/LanguageContext';

interface FiltersSidebarToggles {
  show: boolean;
  categoryOpen: boolean;
  setCategoryOpen: (v: boolean) => void;
  certOpen: boolean;
  setCertOpen: (v: boolean) => void;
}

interface FiltersSidebarSelections {
  selectedDistance: string;
  setSelectedDistance: (v: string) => void;
  categories: string[];
  selectedCategories: string[];
  toggleCategory: (c: string) => void;
  certifications: string[];
  selectedCerts: string[];
  toggleCert: (c: string) => void;
}

interface FiltersSidebarMeta {
  clearAllFilters: () => void;
  activeFiltersCount: number;
}

type FiltersSidebarProps = FiltersSidebarToggles &
  FiltersSidebarSelections &
  FiltersSidebarMeta;

export function FiltersSidebar(props: FiltersSidebarProps) {
  const { t } = useLanguage();
  const {
    show,
    selectedDistance,
    setSelectedDistance,
    categories,
    selectedCategories,
    toggleCategory,
    certifications,
    selectedCerts,
    toggleCert,
    clearAllFilters,
    activeFiltersCount,
    categoryOpen,
    setCategoryOpen,
    certOpen,
    setCertOpen,
  } = props;
  if (!show) return null;
  return (
    <div className='w-72 flex-shrink-0'>
      <div className='sticky top-24'>
        <div className='rounded-2xl bg-white shadow-[0_1px_4px_rgba(0,0,0,0.08)]'>
          <div className='flex items-center justify-between border-b border-border p-6 pb-4'>
            <h3>{t('filters')}</h3>
            {activeFiltersCount > 0 && (
              <Button
                variant='ghost'
                size='sm'
                onClick={clearAllFilters}
                className='h-auto p-0 text-sm text-primary hover:bg-transparent'
              >
                {t('clearAll')}
              </Button>
            )}
          </div>

          <ScrollArea className='h-[calc(100vh-280px)]'>
            <div className='p-6 pt-4'>
              <div className='mb-6'>
                <Label className='mb-3 block text-sm'>{t('distance')}</Label>
                <Select
                  value={selectedDistance}
                  onValueChange={setSelectedDistance}
                >
                  <SelectTrigger className='rounded-xl'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='all'>{t('anyDistance')}</SelectItem>
                    <SelectItem value='10'>{t('within10km')}</SelectItem>
                    <SelectItem value='25'>{t('within25km')}</SelectItem>
                    <SelectItem value='50'>{t('within50km')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Collapsible open={categoryOpen} onOpenChange={setCategoryOpen}>
                <CollapsibleTrigger className='mb-3 flex w-full items-center justify-between text-sm'>
                  <span>{t('category')}</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${categoryOpen ? 'rotate-180' : ''}`}
                  />
                </CollapsibleTrigger>
                <CollapsibleContent className='space-y-3'>
                  {categories.map(category => (
                    <div key={category} className='flex items-center space-x-2'>
                      <Checkbox
                        id={`category-${category}`}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => toggleCategory(category)}
                      />
                      <Label
                        htmlFor={`category-${category}`}
                        className='cursor-pointer text-sm'
                      >
                        {category}
                      </Label>
                    </div>
                  ))}
                </CollapsibleContent>
              </Collapsible>

              <div className='my-4 border-t border-border' />

              <Collapsible open={certOpen} onOpenChange={setCertOpen}>
                <CollapsibleTrigger className='mb-3 flex w-full items-center justify-between text-sm'>
                  <span>{t('certificationsLabel')}</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${certOpen ? 'rotate-180' : ''}`}
                  />
                </CollapsibleTrigger>
                <CollapsibleContent className='space-y-3'>
                  {certifications.map(cert => (
                    <div key={cert} className='flex items-center space-x-2'>
                      <Checkbox
                        id={`cert-${cert}`}
                        checked={selectedCerts.includes(cert)}
                        onCheckedChange={() => toggleCert(cert)}
                      />
                      <Label
                        htmlFor={`cert-${cert}`}
                        className='cursor-pointer text-sm'
                      >
                        {cert}
                      </Label>
                    </div>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
