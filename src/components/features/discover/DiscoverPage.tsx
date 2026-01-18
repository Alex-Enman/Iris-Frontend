'use client';

import { useMemo } from 'react';
import { useLanguage } from '@contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { Button } from '@components/ui/button';
import { Badge } from '@components/ui/badge';
import { getMockSuppliers } from '@/tests/mocks/mock-suppliers';
import { getMockProducts } from '@/tests/mocks/mock-products';
import { Sparkles, ArrowRight, Compass, Layers, Star } from 'lucide-react';

export interface DiscoverPageProps {
  onNavigateToMarketplace: (queryString?: string) => void;
  onViewSupplier: (supplierId: string) => void;
}

function qs(input: Record<string, string | number | undefined>) {
  const sp = new URLSearchParams();
  Object.entries(input).forEach(([k, v]) => {
    if (v === undefined || v === '') return;
    sp.set(k, String(v));
  });
  return sp.toString();
}

export function DiscoverPage({ onNavigateToMarketplace, onViewSupplier }: DiscoverPageProps) {
  const { t } = useLanguage();

  const suppliers = useMemo(() => getMockSuppliers(), []);
  const products = useMemo(() => getMockProducts(), []);

  const collections = useMemo(
    () => [
      {
        id: 'farm-to-table',
        titleKey: 'collectionFarmToTable',
        descriptionKey: 'collectionFarmToTableDescription',
        ctaKey: 'viewCollection',
        query: qs({ tags: 'Local,Fresh' }),
      },
      {
        id: 'organic-week',
        titleKey: 'collectionOrganicWeek',
        descriptionKey: 'collectionOrganicWeekDescription',
        ctaKey: 'viewCollection',
        query: qs({ tags: 'Organic' }),
      },
      {
        id: 'chef-favorites',
        titleKey: 'collectionChefFavorites',
        descriptionKey: 'collectionChefFavoritesDescription',
        ctaKey: 'viewCollection',
        query: qs({ sort: 'rating' }),
      },
      {
        id: 'fast-delivery',
        titleKey: 'collectionFastDelivery',
        descriptionKey: 'collectionFastDeliveryDescription',
        ctaKey: 'viewCollection',
        query: qs({ maxDistanceKm: 15, available: 1 }),
      },
    ],
    []
  );

  const categoryTiles = useMemo(
    () => [
      { id: 'produce', titleKey: 'produce', query: qs({ category: 'produce' }) },
      { id: 'dairy', titleKey: 'dairy', query: qs({ category: 'dairy' }) },
      { id: 'meat', titleKey: 'meat', query: qs({ category: 'meat' }) },
      { id: 'seafood', titleKey: 'seafood', query: qs({ category: 'seafood' }) },
      { id: 'bakery', titleKey: 'bakery', query: qs({ category: 'bakery' }) },
      { id: 'pantry', titleKey: 'pantry', query: qs({ category: 'pantry' }) },
    ],
    []
  );

  const spotlightSuppliers = useMemo(() => suppliers.slice(0, 3), [suppliers]);

  const newAndNoteworthy = useMemo(() => {
    const byCreated = [...products].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    const supplierIds = Array.from(new Set(byCreated.map(p => p.supplierId)));
    return supplierIds
      .map(id => suppliers.find(s => s.id === id))
      .filter((s): s is NonNullable<typeof s> => !!s)
      .slice(0, 6);
  }, [products, suppliers]);

  return (
    <div className='min-h-screen bg-gradient-to-b from-background via-primary/5 to-accent/10'>
      <div className='mx-auto max-w-[1440px] px-8 py-10'>
        <div className='mb-10'>
          <div className='flex items-center gap-2 text-sm text-muted-foreground'>
            <Compass className='h-4 w-4' />
            {t('discoverHeroKicker')}
          </div>
          <h1 className='mt-2 text-4xl font-semibold tracking-tight'>{t('discover')}</h1>
          <p className='mt-2 max-w-2xl text-muted-foreground'>
            {t('discoverHeroDescription')}
          </p>
        </div>
        <section className='mb-12'>
          <div className='mb-4 flex items-center justify-between'>
            <div>
              <h2 className='text-2xl font-semibold tracking-tight'>{t('curatedCollections')}</h2>
              <p className='mt-1 text-sm text-muted-foreground'>{t('curatedCollectionsDescription')}</p>
            </div>
            <Sparkles className='h-5 w-5 text-muted-foreground' />
          </div>

          <div className='grid gap-6 lg:grid-cols-4'>
            {collections.map(c => (
              <Card
                key={c.id}
                className='group overflow-hidden rounded-3xl border bg-white/70 shadow-[0_10px_40px_rgba(0,0,0,0.06)] backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_60px_rgba(0,0,0,0.10)]'
              >
                <CardHeader>
                  <CardTitle className='text-base'>{t(c.titleKey as any)}</CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <p className='text-sm text-muted-foreground'>{t(c.descriptionKey as any)}</p>
                  <Button
                    className='w-full rounded-2xl'
                    variant='outline'
                    onClick={() => onNavigateToMarketplace(c.query)}
                  >
                    {t(c.ctaKey as any)}
                    <ArrowRight className='ml-2 h-4 w-4' />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
        <section className='mb-12'>
          <div className='mb-4 flex items-center justify-between'>
            <div>
              <h2 className='text-2xl font-semibold tracking-tight'>{t('exploreByCategory')}</h2>
              <p className='mt-1 text-sm text-muted-foreground'>{t('exploreByCategoryDescription')}</p>
            </div>
            <Layers className='h-5 w-5 text-muted-foreground' />
          </div>

          <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
            {categoryTiles.map(tile => (
              <button
                key={tile.id}
                className='text-left'
                onClick={() => onNavigateToMarketplace(tile.query)}
              >
                <Card className='rounded-3xl border bg-white/60 shadow-[0_10px_40px_rgba(0,0,0,0.06)] backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_60px_rgba(0,0,0,0.10)]'>
                  <CardHeader>
                    <CardTitle className='text-base'>{t(tile.titleKey as any)}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='text-sm text-muted-foreground'>{t('tapToBrowse')}</div>
                  </CardContent>
                </Card>
              </button>
            ))}
          </div>
        </section>
        <section className='mb-12'>
          <div className='mb-4 flex items-center justify-between'>
            <div>
              <h2 className='text-2xl font-semibold tracking-tight'>{t('supplierSpotlights')}</h2>
              <p className='mt-1 text-sm text-muted-foreground'>{t('supplierSpotlightsDescription')}</p>
            </div>
            <Star className='h-5 w-5 text-muted-foreground' />
          </div>

          <div className='grid gap-6 lg:grid-cols-3'>
            {spotlightSuppliers.map(s => (
              <Card
                key={s.id}
                className='rounded-3xl border bg-white/70 shadow-[0_10px_40px_rgba(0,0,0,0.06)] backdrop-blur-xl'
              >
                <CardHeader>
                  <CardTitle className='text-base'>{s.name}</CardTitle>
                  <div className='text-xs text-muted-foreground'>{s.businessType}</div>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <p className='text-sm text-muted-foreground'>{s.description}</p>
                  <div className='flex flex-wrap gap-2'>
                    <Badge variant='secondary'>{t('recommendedForYou')}</Badge>
                    {s.isVerified && <Badge className='bg-primary text-primary-foreground'>{t('verified')}</Badge>}
                  </div>
                  <div className='flex gap-2'>
                    <Button className='flex-1 rounded-2xl' onClick={() => onViewSupplier(s.id)}>
                      {t('viewProfile')}
                    </Button>
                    <Button
                      className='flex-1 rounded-2xl'
                      variant='outline'
                      onClick={() => onNavigateToMarketplace(qs({ supplierId: s.id }))}
                    >
                      {t('browseProducts')}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
        <section>
          <div className='mb-4'>
            <h2 className='text-2xl font-semibold tracking-tight'>{t('newAndNoteworthySuppliers')}</h2>
            <p className='mt-1 text-sm text-muted-foreground'>{t('newAndNoteworthySuppliersDescription')}</p>
          </div>

          <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
            {newAndNoteworthy.map(s => (
              <button key={s.id} className='text-left' onClick={() => onViewSupplier(s.id)}>
                <Card className='rounded-3xl border bg-white/60 shadow-[0_10px_40px_rgba(0,0,0,0.06)] backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_60px_rgba(0,0,0,0.10)]'>
                  <CardHeader>
                    <CardTitle className='text-base'>{s.name}</CardTitle>
                    <div className='text-xs text-muted-foreground'>{s.businessType}</div>
                  </CardHeader>
                  <CardContent>
                    <div className='text-sm text-muted-foreground line-clamp-2'>{s.description}</div>
                    <div className='mt-3'>
                      <Button
                        className='w-full rounded-2xl'
                        variant='outline'
                        onClick={e => {
                          e.preventDefault();
                          e.stopPropagation();
                          onNavigateToMarketplace(qs({ supplierId: s.id }));
                        }}
                      >
                        {t('viewInMarketplace')}
                        <ArrowRight className='ml-2 h-4 w-4' />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
