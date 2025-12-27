'use client';

import { Card } from '@components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs';
import { CoverHeader } from './supplier-profile/CoverHeader';
import { SupplierInfoSection } from './supplier-profile/SupplierInfoSection';
import { ProductsTab } from './supplier-profile/ProductsTab';
import { ReviewsTab } from './supplier-profile/ReviewsTab';
import { AboutTab } from './supplier-profile/AboutTab';
import { useSupplierProfileView } from '@/hooks/suppliers/use-supplier-profile-view';
import { useLanguage } from '@contexts/LanguageContext';

export interface SupplierProfileViewProps {
  supplierId: string;
  onBack: () => void;
}

export function SupplierProfileView({
  supplierId,
  onBack,
}: SupplierProfileViewProps) {
  const { t } = useLanguage();
  const { isFavorite, handleAddToCart, handleToggleFavorite, handleContact } =
    useSupplierProfileView({ supplierId });

  // Mock supplier data - in real app, fetch based on supplierId
  const supplier = {
    id: supplierId,
    name: t('supplierNameGreenValleyFarm'),
    category: t('supplierCategoryOrganicVegetablesHerbs'),
    location: t('supplierLocationValleyRidge12km'),
    verified: true,
    rating: 4.8,
    totalReviews: 127,
    memberSince: t('supplierMemberSinceMarch2022'),
    description: t('supplierDescriptionGreenValleyFarm'),
    certifications: [
      t('organicCertified'),
      t('localProducer'),
      t('traceable'),
      t('carbonNeutral'),
    ],
    coverImage:
      'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1200',
    avatar: 'GV',
    stats: {
      totalProducts: 24,
      totalOrders: 1247,
      responseTime: t('responseTimeUnderTwoHours'),
      deliveryRate: t('deliveryRate98Percent'),
    },
    products: [
      {
        id: 1,
        name: t('productHeirloomTomatoes'),
        price: 4.5,
        unit: 'kg',
        image:
          'https://images.unsplash.com/photo-1591171551239-80a5eddd627a?w=400',
        inStock: true,
        description: t('productHeirloomTomatoesDescription'),
      },
      {
        id: 2,
        name: t('productOrganicCarrots'),
        price: 3.2,
        unit: 'kg',
        image:
          'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400',
        inStock: true,
        description: t('productOrganicCarrotsDescription'),
      },
      {
        id: 3,
        name: t('productSeasonalGreensMix'),
        price: 3.8,
        unit: 'kg',
        image:
          'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400',
        inStock: true,
        description: t('productSeasonalGreensMixDescription'),
      },
      {
        id: 4,
        name: t('productHeritageBeets'),
        price: 4.2,
        unit: 'kg',
        image:
          'https://images.unsplash.com/photo-1590165482129-1b8b27698780?w=400',
        inStock: true,
        description: t('productHeritageBeetsDescription'),
      },
      {
        id: 5,
        name: t('productFreshHerbsBundle'),
        price: 5.5,
        unit: 'bundle',
        image:
          'https://images.unsplash.com/photo-1583163651581-0b9ed2c9c78f?w=400',
        inStock: true,
        description: t('productFreshHerbsBundleDescription'),
      },
      {
        id: 6,
        name: t('productBabyPotatoes'),
        price: 2.9,
        unit: 'kg',
        image:
          'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400',
        inStock: false,
        description: t('productBabyPotatoesDescription'),
      },
    ],
    reviews: [
      {
        id: 1,
        restaurant: t('laCucina'),
        rating: 5,
        comment: t('reviewExceptionalQualityAndFreshness'),
        date: '2024-10-20',
        verified: true,
      },
      {
        id: 2,
        restaurant: t('greenTableBistro'),
        rating: 5,
        comment: t('reviewConsistentQualityOnTime'),
        date: '2024-10-15',
        verified: true,
      },
      {
        id: 3,
        restaurant: t('farmToFork'),
        rating: 4,
        comment: t('reviewGreatProductsLimitedWinter'),
        date: '2024-10-10',
        verified: true,
      },
    ],
    contact: {
      email: 'orders@greenvalley.com',
      phone: '+1 (555) 123-4567',
      website: 'www.greenvalleyfarm.com',
    },
  };

  return (
    <div className='min-h-screen bg-background py-8'>
      <div className='mx-auto max-w-[1440px] px-8'>
        <CoverHeader
          name={supplier.name}
          verified={supplier.verified}
          location={supplier.location}
          coverImage={supplier.coverImage}
          avatarCode={supplier.avatar}
          onBack={onBack}
          onToggleFavorite={handleToggleFavorite}
          onContact={handleContact}
          isFavorite={isFavorite}
        />

        <Card className='mb-8 overflow-hidden rounded-3xl border-0 shadow-[0_2px_8px_rgba(0,0,0,0.08)]'>
          <SupplierInfoSection
            display={{
              rating: supplier.rating,
              totalReviews: supplier.totalReviews,
              memberSince: supplier.memberSince,
            }}
            content={{
              description: supplier.description,
              certifications: supplier.certifications,
            }}
            stats={supplier.stats}
          />
        </Card>

        <Tabs defaultValue='products' className='w-full'>
          <TabsList className='mb-6 inline-flex h-12 rounded-2xl bg-white p-1 shadow-[0_2px_8px_rgba(0,0,0,0.08)]'>
            <TabsTrigger value='products' className='rounded-xl'>
              {t('products')} ({supplier.products.length})
            </TabsTrigger>
            <TabsTrigger value='reviews' className='rounded-xl'>
              {t('reviews')} ({supplier.reviews.length})
            </TabsTrigger>
            <TabsTrigger value='about' className='rounded-xl'>
              {t('about')}
            </TabsTrigger>
          </TabsList>

          <TabsContent value='products' className='mt-0'>
            <ProductsTab
              products={supplier.products}
              onAddToCart={handleAddToCart}
            />
          </TabsContent>

          <TabsContent value='reviews' className='mt-0'>
            <ReviewsTab
              rating={supplier.rating}
              totalReviews={supplier.totalReviews}
              reviews={supplier.reviews}
            />
          </TabsContent>

          <TabsContent value='about' className='mt-0'>
            <AboutTab
              contact={supplier.contact}
              location={supplier.location}
              category={supplier.category}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
