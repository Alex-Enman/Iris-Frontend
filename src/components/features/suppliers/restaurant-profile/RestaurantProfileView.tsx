'use client';

import { Card } from '@components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs';
import { CoverHeader } from './CoverHeader';
import { RestaurantInfoSection } from './RestaurantInfoSection';
import { MenuTab } from './MenuTab';
import { SupplyNeedsTab } from './SupplyNeedsTab';
import { OrderingInfoTab } from './OrderingInfoTab';
import { SupplierAnalyticsCard } from './SupplierAnalyticsCard';
import { OrderHistoryCard } from './OrderHistoryCard';
import { PrivateNotesCard } from './PrivateNotesCard';
import { useRestaurantProfileView } from '@/hooks/suppliers/use-restaurant-profile-view';
import { useLanguage } from '@contexts/LanguageContext';

export interface RestaurantProfileViewProps {
  restaurantId: string;
  onBack: () => void;
  isSupplierView?: boolean;
}

export function RestaurantProfileView({
  restaurantId,
  onBack,
  isSupplierView,
}: RestaurantProfileViewProps) {
  const { t } = useLanguage();
  const {
    notes,
    setNotes,
    isFavorite,
    handleContact,
    handleProposal,
    handleFavorite,
    handleSaveNotes,
  } = useRestaurantProfileView({ restaurantId });

  // Mock restaurant data - in real app, fetch based on restaurantId
  const restaurant = {
    id: restaurantId,
    name: t('restaurantLaBellaCucina'),
    type: t('restaurantTypeItalianFineDining'),
    cuisine: [t('restaurantCuisineItalian'), t('restaurantCuisineMediterranean')],
    location: t('restaurantProfileAddressSample'),
    rating: 4.7,
    totalReviews: 342,
    memberSince: t('memberSinceJanuary2024'),
    description: t('restaurantProfileDescriptionSample'),
    coverImage:
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200',
    avatar: 'LC',
    stats: {
      seatingCapacity: 85,
      avgMonthlyOrders: 47,
      established: '2020',
      orderVolume: t('restaurantOrderVolumeSample'),
    },
    menu: [
      {
        category: t('menuCategoryAntipasti'),
        items: [
          {
            name: t('menuItemBruschettaAlPomodoro'),
            description: t('menuItemBruschettaDescription'),
            price: 'kr120',
            image:
              'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=400',
          },
          {
            name: t('menuItemBurrataConProsciutto'),
            description: t('menuItemBurrataDescription'),
            price: 'kr180',
            image:
              'https://images.unsplash.com/photo-1498579397066-22750a3cb424?w=400',
          },
        ],
      },
      {
        category: t('menuCategoryPrimiPiatti'),
        items: [
          {
            name: t('menuItemTagliatelleAlTartufo'),
            description: t('menuItemTagliatelleDescription'),
            price: 'kr280',
            image:
              'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400',
          },
          {
            name: t('menuItemRisottoAiFunghi'),
            description: t('menuItemRisottoDescription'),
            price: 'kr240',
            image:
              'https://images.unsplash.com/photo-1476124369491-c7addf8a3b52?w=400',
          },
        ],
      },
      {
        category: t('menuCategorySecondi'),
        items: [
          {
            name: t('menuItemOssoBucoAllaMilanese'),
            description: t('menuItemOssoBucoDescription'),
            price: 'kr380',
            image:
              'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400',
          },
          {
            name: t('menuItemBranzinoAlForno'),
            description: t('menuItemBranzinoDescription'),
            price: 'kr350',
            image:
              'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400',
          },
        ],
      },
    ],
    supplierNeeds: [
      {
        category: t('vegetables'),
        frequency: t('supplierNeedFrequencyTwiceWeekly'),
        averageOrder: 'kr2,500',
        preferences: t('supplierNeedPreferencesOrganicLocallySourced'),
      },
      {
        category: t('seafood'),
        frequency: t('supplierNeedFrequencyDaily'),
        averageOrder: 'kr4,500',
        preferences: t('supplierNeedPreferencesFreshSustainableSources'),
      },
      {
        category: t('dairy'),
        frequency: t('weeklyFrequency'),
        averageOrder: 'kr1,800',
        preferences: t('supplierNeedPreferencesPremiumItalianCheeses'),
      },
      {
        category: t('supplierNeedCategoryHerbsAndSpices'),
        frequency: t('weeklyFrequency'),
        averageOrder: 'kr1,200',
        preferences: t('supplierNeedPreferencesFreshHerbsSpecialtySpices'),
      },
    ],
    contact: {
      email: 'orders@labellacucina.com',
      phone: '+1 (555) 987-6543',
      website: 'www.labellacucina.com',
    },
    orderingPreferences: {
      leadTime: t('leadTime48Hours'),
      deliveryWindow: t('deliveryWindow6to9am'),
      paymentTerms: t('paymentTermsNet30'),
      minimumOrder: 'kr1,000',
    },
  };

  const supplierAnalytics = {
    totalRevenue: 'kr125,430',
    totalOrders: 47,
    avgOrderValue: 'kr2,670',
    lastOrderDate: `2 ${t('daysAgo')}`,
    orderFrequency: t('weeklyFrequency'),
    topProducts: [t('productTomatoes'), t('productFreshHerbs'), t('productMozzarella')],
  };

  const orderHistory = [
    {
      id: 'ORD-1234',
      date: '2024-10-20',
      items: [t('productTomatoes'), t('productBasil'), t('productMozzarella')],
      total: 'kr2,655.00',
      status: t('deliveredStatus'),
    },
    {
      id: 'ORD-1198',
      date: '2024-10-13',
      items: [t('productOliveOil'), t('productParmesan'), t('productFreshHerbs')],
      total: 'kr1,893.00',
      status: t('deliveredStatus'),
    },
    {
      id: 'ORD-1167',
      date: '2024-10-06',
      items: [t('productTomatoes'), t('productArugula'), t('productBurrata')],
      total: 'kr2,450.00',
      status: t('deliveredStatus'),
    },
  ];

  return (
    <div className='min-h-screen bg-background py-8'>
      <div className='mx-auto max-w-[1440px] px-8'>
        <CoverHeader
          name={restaurant.name}
          type={restaurant.type}
          coverImage={restaurant.coverImage}
          avatarCode={restaurant.avatar}
          onBack={onBack}
          onContact={handleContact}
          onProposal={handleProposal}
          onToggleFavorite={handleFavorite}
          isFavorite={isFavorite}
        />

        <Card className='mb-8 rounded-3xl border-0 shadow-[0_2px_8px_rgba(0,0,0,0.08)]'>
          <RestaurantInfoSection
            display={{
              rating: restaurant.rating,
              totalReviews: restaurant.totalReviews,
              location: restaurant.location,
              memberSince: restaurant.memberSince,
            }}
            content={{
              description: restaurant.description,
              cuisine: restaurant.cuisine,
            }}
            stats={restaurant.stats}
          />
        </Card>

        <Tabs defaultValue='menu' className='w-full'>
          <TabsList className='mb-6 inline-flex h-12 rounded-2xl bg-white p-1 shadow-[0_2px_8px_rgba(0,0,0,0.08)]'>
            <TabsTrigger value='menu' className='rounded-xl'>
              {t('menu')}
            </TabsTrigger>
            <TabsTrigger value='needs' className='rounded-xl'>
              {t('supplyNeeds')}
            </TabsTrigger>
            <TabsTrigger value='ordering' className='rounded-xl'>
              {t('orderingInfo')}
            </TabsTrigger>
          </TabsList>

          <TabsContent value='menu' className='mt-0'>
            <MenuTab menu={restaurant.menu} />
          </TabsContent>

          <TabsContent value='needs' className='mt-0'>
            <SupplyNeedsTab supplierNeeds={restaurant.supplierNeeds} />
          </TabsContent>

          <TabsContent value='ordering' className='mt-0'>
            <OrderingInfoTab
              contact={restaurant.contact}
              orderingPreferences={restaurant.orderingPreferences}
            />
          </TabsContent>
        </Tabs>

        {isSupplierView && (
          <div className='mt-8 space-y-6'>
            <div className='grid gap-6 lg:grid-cols-3'>
              <SupplierAnalyticsCard analytics={supplierAnalytics} />
              <OrderHistoryCard orders={orderHistory} />
            </div>
            <PrivateNotesCard
              notes={notes}
              onNotesChange={setNotes}
              onSave={handleSaveNotes}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default RestaurantProfileView;
