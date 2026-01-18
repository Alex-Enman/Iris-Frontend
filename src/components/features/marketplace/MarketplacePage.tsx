'use client';

import { useMemo, useState } from 'react';
import { useLanguage } from '@contexts/LanguageContext';
import { Input } from '@components/ui/input';
import { Button } from '@components/ui/button';
import { Badge } from '@components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { Slider } from '@components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select';
import { Checkbox } from '@components/ui/checkbox';
import { Label } from '@components/ui/label';
import { LoadingSkeleton } from '@components/ui/loading-skeleton';
import { EmptyState } from '@components/ui/empty-state';
import { Search, Sparkles, SlidersHorizontal } from 'lucide-react';
import { useDebouncedValue } from '@/hooks/use-debounced-value';
import {
  useMarketplaceProducts,
  useMarketplaceSections,
  useMarketplaceSupplierSpotlights,
} from '@/hooks/data/useMarketplace';
import type {
  MarketplaceFilters,
  MarketplaceQuickFilter,
  MarketplaceSort,
} from '@/types/marketplace/marketplace';
import { ProductCard } from '@components/features/products/components/ProductCard';
import { getMockSuppliers } from '@/tests/mocks/mock-data';
import { createCartItemFromProduct } from '@contexts/CartContext';
import { useCartActions } from '@/hooks/cart/use-cart-actions';
import { getMockProducts } from '@/tests/mocks/mock-products';

export interface MarketplacePageProps {
  onNavigateToProduct: (productId: string) => void;
  onViewSupplier: (supplierId: string) => void;
}

const QUICK_FILTERS: Array<{ id: MarketplaceQuickFilter; labelKey: string }> = [
  { id: 'organic', labelKey: 'organic' },
  { id: 'local', labelKey: 'local' },
  { id: 'traceable', labelKey: 'traceable' },
  { id: 'availableNow', labelKey: 'availableNow' },
  { id: 'deals', labelKey: 'deals' },
];

function parseNumber(v: string | null) {
  if (!v) return undefined;
  const n = Number(v);
  return Number.isFinite(n) ? n : undefined;
}

export function MarketplacePage({ onNavigateToProduct, onViewSupplier }: MarketplacePageProps) {
  const { t } = useLanguage();
  const { addDirectLineItem } = useCartActions();

  const [search, setSearch] = useState(() => {
    if (typeof window === 'undefined') return '';
    return new URLSearchParams(window.location.search).get('q') ?? '';
  });

  const debouncedSearch = useDebouncedValue(search, 250);

  const [sort, setSort] = useState<MarketplaceSort>(() => {
    if (typeof window === 'undefined') return 'recommended';
    const raw = new URLSearchParams(window.location.search).get('sort') as MarketplaceSort | null;
    return raw ?? 'recommended';
  });

  const [category, setCategory] = useState<string>(() => {
    if (typeof window === 'undefined') return 'all';
    return new URLSearchParams(window.location.search).get('category') ?? 'all';
  });

  const [supplierId, setSupplierId] = useState<string>(() => {
    if (typeof window === 'undefined') return 'all';
    return new URLSearchParams(window.location.search).get('supplierId') ?? 'all';
  });

  const [priceRange, setPriceRange] = useState<[number, number]>(() => {
    if (typeof window === 'undefined') return [0, 300];
    const sp = new URLSearchParams(window.location.search);
    return [parseNumber(sp.get('minPrice')) ?? 0, parseNumber(sp.get('maxPrice')) ?? 300];
  });

  const [maxDistanceKm, setMaxDistanceKm] = useState<number>(() => {
    if (typeof window === 'undefined') return 50;
    return parseNumber(new URLSearchParams(window.location.search).get('maxDistanceKm')) ?? 50;
  });

  const [selectedTags, setSelectedTags] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    const raw = new URLSearchParams(window.location.search).get('tags');
    return raw ? raw.split(',').filter(Boolean) : [];
  });

  const [availableNow, setAvailableNow] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return new URLSearchParams(window.location.search).get('available') === '1';
  });

  const [quickFilters, setQuickFilters] = useState<Set<MarketplaceQuickFilter>>(new Set());

  const suppliers = useMemo(() => getMockSuppliers(), []);

  const filters: MarketplaceFilters = useMemo(() => {
    const tagsFromQuick = Array.from(quickFilters)
      .filter(q => q === 'organic' || q === 'local' || q === 'traceable')
      .map(q => (q === 'organic' ? 'Organic' : q === 'local' ? 'Local' : 'Traceable'));

    const tags = Array.from(new Set([...selectedTags, ...tagsFromQuick]));

    return {
      search: debouncedSearch,
      category: category === 'all' ? undefined : category,
      supplierId: supplierId === 'all' ? undefined : supplierId,
      minPrice: priceRange[0] > 0 ? priceRange[0] : undefined,
      maxPrice: priceRange[1] < 300 ? priceRange[1] : undefined,
      isAvailable: availableNow || quickFilters.has('availableNow') ? true : undefined,
      tags: tags.length > 0 ? tags : undefined,
      maxDistanceKm,
    };
  }, [debouncedSearch, category, supplierId, priceRange, availableNow, selectedTags, quickFilters, maxDistanceKm]);

  const productsQuery = useMarketplaceProducts({ filters, sort });
  const sectionsQuery = useMarketplaceSections();
  const spotlightsQuery = useMarketplaceSupplierSpotlights();

  const products = productsQuery.data ?? [];

  const syncUrl = () => {
    const sp = new URLSearchParams(window.location.search);
    if (search) sp.set('q', search); else sp.delete('q');
    if (sort) sp.set('sort', sort); else sp.delete('sort');
    if (category && category !== 'all') sp.set('category', category); else sp.delete('category');
    if (supplierId && supplierId !== 'all') sp.set('supplierId', supplierId); else sp.delete('supplierId');
    if (priceRange[0] > 0) sp.set('minPrice', String(priceRange[0])); else sp.delete('minPrice');
    if (priceRange[1] < 300) sp.set('maxPrice', String(priceRange[1])); else sp.delete('maxPrice');
    if (availableNow) sp.set('available', '1'); else sp.delete('available');
    if (selectedTags.length > 0) sp.set('tags', selectedTags.join(',')); else sp.delete('tags');
    if (maxDistanceKm !== 50) sp.set('maxDistanceKm', String(maxDistanceKm)); else sp.delete('maxDistanceKm');

    const next = `/marketplace${sp.toString() ? `?${sp.toString()}` : ''}`;
    window.history.replaceState({}, '', next);
  };

  const toggleQuick = (id: MarketplaceQuickFilter) => {
    setQuickFilters(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => (prev.includes(tag) ? prev.filter(tg => tg !== tag) : [...prev, tag]));
  };

  const clearAll = () => {
    setSearch('');
    setSort('recommended');
    setCategory('all');
    setSupplierId('all');
    setPriceRange([0, 300]);
    setMaxDistanceKm(50);
    setSelectedTags([]);
    setAvailableNow(false);
    setQuickFilters(new Set());
    window.history.replaceState({}, '', '/marketplace');
  };

  const tagOptions = ['Organic', 'Local', 'Traceable', 'Fresh', 'Grass-fed', 'Wild-caught', 'Seasonal', 'Batch'];

  const addToCartFromProductId = (productId: string) => {
    const p = getMockProducts().find(x => x.id === productId);
    if (!p) return;
    const base = createCartItemFromProduct(p);
    addDirectLineItem({
      ...base,
      quantity: 1,
    });
  };

  return (
    <div className='min-h-screen bg-gradient-to-b from-background to-primary/5'>
      <div className='mx-auto max-w-[1440px] px-8 py-10'>
        <div className='mb-8 grid gap-6 lg:grid-cols-12'>
          <div className='lg:col-span-7'>
            <div className='flex items-center gap-2 text-sm text-muted-foreground'>
              <Sparkles className='h-4 w-4' />
              {t('marketplaceHeroKicker')}
            </div>
            <h1 className='mt-2 text-4xl font-semibold tracking-tight'>{t('marketplace')}</h1>
            <p className='mt-2 max-w-2xl text-muted-foreground'>
              {t('marketplaceHeroDescription')}
            </p>

            <div className='mt-6 flex flex-col gap-3 rounded-3xl border bg-white/70 p-4 shadow-[0_10px_40px_rgba(0,0,0,0.06)] backdrop-blur-xl sm:flex-row sm:items-center'>
              <div className='relative flex-1'>
                <Search className='absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground' />
                <Input
                  value={search}
                  onChange={e => {
                    setSearch(e.target.value);
                  }}
                  onBlur={syncUrl}
                  placeholder={t('searchMarketplacePlaceholder')}
                  className='h-12 rounded-2xl border-border pl-12'
                />
              </div>
              <div className='flex items-center gap-2'>
                <Select
                  value={sort}
                  onValueChange={v => {
                    setSort(v as MarketplaceSort);
                    setTimeout(syncUrl, 0);
                  }}
                >
                  <SelectTrigger className='h-12 w-[200px] rounded-2xl'>
                    <SelectValue placeholder={t('sortBy')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='recommended'>{t('recommended')}</SelectItem>
                    <SelectItem value='new'>{t('newest')}</SelectItem>
                    <SelectItem value='priceAsc'>{t('priceLowToHigh')}</SelectItem>
                    <SelectItem value='priceDesc'>{t('priceHighToLow')}</SelectItem>
                    <SelectItem value='rating'>{t('highestRated')}</SelectItem>
                    <SelectItem value='distance'>{t('nearestFirst')}</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  variant='outline'
                  className='h-12 rounded-2xl'
                  onClick={clearAll}
                >
                  <SlidersHorizontal className='mr-2 h-4 w-4' />
                  {t('reset')}
                </Button>
              </div>
            </div>

            <div className='mt-4 flex flex-wrap gap-2'>
              {QUICK_FILTERS.map(q => (
                <button
                  key={q.id}
                  onClick={() => {
                    toggleQuick(q.id);
                    setTimeout(syncUrl, 0);
                  }}
                >
                  <Badge
                    className={
                      quickFilters.has(q.id)
                        ? 'rounded-full bg-primary text-primary-foreground'
                        : 'rounded-full bg-white/70 text-foreground'
                    }
                  >
                    {t(q.labelKey as any)}
                  </Badge>
                </button>
              ))}
            </div>
          </div>

          <div className='lg:col-span-5'>
            <Card className='rounded-3xl border bg-white/70 shadow-[0_10px_40px_rgba(0,0,0,0.06)] backdrop-blur-xl'>
              <CardHeader>
                <CardTitle className='text-base'>{t('filters')}</CardTitle>
              </CardHeader>
              <CardContent className='space-y-5'>
                <div className='grid gap-4 sm:grid-cols-2'>
                  <div>
                    <div className='mb-2 text-xs font-medium text-muted-foreground'>
                      {t('category')}
                    </div>
                    <Select
                      value={category}
                      onValueChange={v => {
                        setCategory(v);
                        setTimeout(syncUrl, 0);
                      }}
                    >
                      <SelectTrigger className='rounded-2xl'>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='all'>{t('all')}</SelectItem>
                        <SelectItem value='produce'>{t('produce')}</SelectItem>
                        <SelectItem value='dairy'>{t('dairy')}</SelectItem>
                        <SelectItem value='meat'>{t('meat')}</SelectItem>
                        <SelectItem value='seafood'>{t('seafood')}</SelectItem>
                        <SelectItem value='bakery'>{t('bakery')}</SelectItem>
                        <SelectItem value='pantry'>{t('pantry')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <div className='mb-2 text-xs font-medium text-muted-foreground'>
                      {t('supplier')}
                    </div>
                    <Select
                      value={supplierId}
                      onValueChange={v => {
                        setSupplierId(v);
                        setTimeout(syncUrl, 0);
                      }}
                    >
                      <SelectTrigger className='rounded-2xl'>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='all'>{t('all')}</SelectItem>
                        {suppliers.map(s => (
                          <SelectItem key={s.id} value={s.id}>
                            {s.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <div className='mb-2 flex items-center justify-between'>
                    <div className='text-xs font-medium text-muted-foreground'>
                      {t('priceRange')}
                    </div>
                    <div className='text-xs text-muted-foreground'>
                      {priceRange[0]}–{priceRange[1]}
                    </div>
                  </div>
                  <Slider
                    value={priceRange}
                    min={0}
                    max={300}
                    step={5}
                    onValueChange={v => setPriceRange([v[0] ?? 0, v[1] ?? 300])}
                    onValueCommit={() => syncUrl()}
                  />
                </div>

                <div>
                  <div className='mb-2 flex items-center justify-between'>
                    <div className='text-xs font-medium text-muted-foreground'>
                      {t('distance')}
                    </div>
                    <div className='text-xs text-muted-foreground'>
                      {maxDistanceKm} km
                    </div>
                  </div>
                  <Slider
                    value={[maxDistanceKm]}
                    min={5}
                    max={50}
                    step={5}
                    onValueChange={v => setMaxDistanceKm(v[0] ?? 50)}
                    onValueCommit={() => syncUrl()}
                  />
                </div>

                <div className='flex items-center gap-3 rounded-2xl border bg-white/60 px-4 py-3'>
                  <Checkbox
                    id='available'
                    checked={availableNow}
                    onCheckedChange={v => {
                      setAvailableNow(Boolean(v));
                      setTimeout(syncUrl, 0);
                    }}
                  />
                  <Label htmlFor='available' className='text-sm'>
                    {t('availableNow')}
                  </Label>
                </div>

                <div>
                  <div className='mb-2 text-xs font-medium text-muted-foreground'>
                    {t('certification')}
                  </div>
                  <div className='grid gap-2 sm:grid-cols-2'>
                    {tagOptions.map(tag => (
                      <button
                        key={tag}
                        className='flex items-center gap-3 rounded-2xl border bg-white/60 px-4 py-3 text-left'
                        onClick={() => {
                          toggleTag(tag);
                          setTimeout(syncUrl, 0);
                        }}
                        type='button'
                      >
                        <Checkbox checked={selectedTags.includes(tag)} />
                        <span className='text-sm'>{tag}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Curated sections */}
        <div className='space-y-12'>
          {sectionsQuery.isLoading ? (
            <LoadingSkeleton variant='card' count={2} />
          ) : (
            (sectionsQuery.data ?? []).map(section => (
              <section key={section.id}>
                <div className='mb-4'>
                  <h2 className='text-2xl font-semibold tracking-tight'>
                    {t(section.titleKey as any)}
                  </h2>
                  {section.descriptionKey && (
                    <p className='mt-1 text-sm text-muted-foreground'>
                      {t(section.descriptionKey as any)}
                    </p>
                  )}
                </div>

                <div className='relative -mx-2 px-2'>
                  <div className='scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2'>
                    {section.items.map(p => (
                      <div key={p.id} className='w-[320px] flex-shrink-0 snap-start'>
                        <Card className='rounded-3xl border bg-white/70 p-4 shadow-[0_8px_28px_rgba(0,0,0,0.06)] backdrop-blur-xl'>
                          <div className='flex items-start justify-between gap-3'>
                            <div className='min-w-0'>
                              <div className='truncate text-sm font-medium'>{p.name}</div>
                              <button
                                className='mt-1 truncate text-xs text-muted-foreground hover:underline'
                                onClick={() => onViewSupplier(p.supplierId)}
                              >
                                {p.supplierName}
                              </button>
                              <div className='mt-2 flex flex-wrap gap-2'>
                                {p.badges.isLowStock && (
                                  <Badge className='rounded-full bg-destructive/15 text-destructive'>
                                    {t('lowStock')}
                                  </Badge>
                                )}
                                {p.badges.isDeal && (
                                  <Badge className='rounded-full bg-accent text-accent-foreground'>
                                    {t('deals')}
                                  </Badge>
                                )}
                                {p.badges.isNew && (
                                  <Badge className='rounded-full bg-primary/10 text-primary'>
                                    {t('newest')}
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <Button
                              size='sm'
                              className='rounded-2xl'
                              onClick={() => addToCartFromProductId(p.productId)}
                              disabled={!p.isAvailable}
                            >
                              {t('quickAdd')}
                            </Button>
                          </div>
                        </Card>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            ))
          )}
          <section>
            <div className='mb-4 flex items-end justify-between gap-6'>
              <div>
                <h2 className='text-2xl font-semibold tracking-tight'>
                  {t('featuredProducers')}
                </h2>
                <p className='mt-1 text-sm text-muted-foreground'>
                  {t('featuredProducersDescription')}
                </p>
              </div>
            </div>

            {spotlightsQuery.isLoading ? (
              <LoadingSkeleton variant='card' count={1} />
            ) : (
              <div className='grid gap-6 lg:grid-cols-3'>
                {(spotlightsQuery.data ?? []).slice(0, 6).map(s => (
                  <Card
                    key={s.supplierId}
                    className='group cursor-pointer overflow-hidden rounded-3xl border bg-white/70 shadow-[0_10px_40px_rgba(0,0,0,0.06)] backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_60px_rgba(0,0,0,0.10)]'
                    onClick={() => onViewSupplier(s.supplierId)}
                  >
                    <CardHeader className='space-y-1'>
                      <CardTitle className='text-base'>{s.name}</CardTitle>
                      <div className='text-xs text-muted-foreground'>
                        {s.businessType}
                        {typeof s.distanceKm === 'number' ? ` · ${s.distanceKm} km` : ''}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className='text-sm text-muted-foreground line-clamp-2'>
                        {s.description}
                      </div>
                      <div className='mt-4 grid grid-cols-3 gap-2'>
                        {s.productPreviewIds.slice(0, 6).map(pid => {
                          const p = getMockProducts().find(x => x.id === pid);
                          return (
                            <div
                              key={pid}
                              className='rounded-2xl border bg-white/60 p-2 text-xs'
                            >
                              <div className='line-clamp-2'>{p?.name ?? ''}</div>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </section>
          <section>
            <div className='mb-4 flex items-center justify-between'>
              <h2 className='text-2xl font-semibold tracking-tight'>
                {t('browseAll')}
              </h2>
              <div className='text-sm text-muted-foreground'>
                {products.length} {t('products')}
              </div>
            </div>

            {productsQuery.isLoading ? (
              <LoadingSkeleton variant='card' count={3} />
            ) : products.length === 0 ? (
              <EmptyState
                variant='default'
                icon={Search}
                title={t('noProductsFound')}
                description={t('tryAdjustingFilters')}
                action={{ label: t('clearAllFilters'), onClick: clearAll }}
              />
            ) : (
              <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                {products.map(p => {
                  const domainProduct = getMockProducts().find(x => x.id === p.productId);
                  if (!domainProduct) return null;
                  return (
                    <ProductCard
                      key={p.id}
                      product={domainProduct}
                      onViewDetails={onNavigateToProduct}
                      onAddToCart={prod => {
                        const base = createCartItemFromProduct(prod);
                        addDirectLineItem({ ...base, quantity: 1 });
                      }}
                      showSupplier
                    />
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
