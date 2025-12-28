import { useEffect, useState, useCallback } from 'react';
import { toast } from 'sonner';
import { getStoredLanguage, t } from '@lib/i18n';

export interface RestaurantMenuItem {
  name: string;
  description: string;
  price: string;
  image: string;
}

export interface RestaurantMenuCategory {
  category: string;
  items: RestaurantMenuItem[];
}

export interface SupplierNeed {
  category: string;
  frequency: string;
  averageOrder: string;
  preferences: string;
}

interface RestaurantIdentityInfo {
  name: string;
  type: string;
  cuisine: string[];
  location: string;
  description: string;
  coverImage: string;
}

interface RestaurantOperationsInfo {
  seatingCapacity: string;
  established: string;
  orderVolume: string;
  leadTime: string;
  deliveryWindow: string;
  paymentTerms: string;
  minimumOrder: string;
}

interface RestaurantContactInfo {
  email: string;
  phone: string;
  website: string;
}

interface RestaurantRelationsInfo {
  menu: RestaurantMenuCategory[];
  supplierNeeds: SupplierNeed[];
}

export type RestaurantProfile = RestaurantIdentityInfo &
  RestaurantOperationsInfo &
  RestaurantContactInfo &
  RestaurantRelationsInfo;

export interface TopSupplierSummary {
  name: string;
  orders: number;
  spend: string;
}

export function useRestaurantProfile() {
  const language = getStoredLanguage();

  const getDefaultRestaurantProfile = useCallback((): RestaurantProfile => ({
    name: t('restaurantLaBellaCucina', language),
    type: t('restaurantTypeItalianFineDining', language),
    cuisine: [
      t('restaurantCuisineItalian', language),
      t('restaurantCuisineMediterranean', language),
    ],
    location: t('restaurantProfileAddressSample', language),
    description: t('restaurantProfileDescriptionSample', language),
    coverImage:
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200',
    seatingCapacity: '85',
    established: '2020',
    orderVolume: t('restaurantOrderVolumeSample', language),
    email: 'orders@labellacucina.com',
    phone: '+1 (555) 987-6543',
    website: 'www.labellacucina.com',
    leadTime: t('leadTime48Hours', language),
    deliveryWindow: t('deliveryWindow6to9am', language),
    paymentTerms: t('paymentTermsNet30', language),
    minimumOrder: 'kr1,000',
    menu: [
      {
        category: t('menuCategoryAntipasti', language),
        items: [
          {
            name: t('menuItemBruschettaAlPomodoro', language),
            description: t('menuItemBruschettaDescription', language),
            price: 'kr120',
            image:
              'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=400',
          },
          {
            name: t('menuItemBurrataConProsciutto', language),
            description: t('menuItemBurrataDescription', language),
            price: 'kr180',
            image:
              'https://images.unsplash.com/photo-1498579397066-22750a3cb424?w=400',
          },
        ],
      },
      {
        category: t('menuCategoryPrimiPiatti', language),
        items: [
          {
            name: t('menuItemTagliatelleAlTartufo', language),
            description: t('menuItemTagliatelleDescription', language),
            price: 'kr280',
            image:
              'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400',
          },
          {
            name: t('menuItemRisottoAiFunghi', language),
            description: t('menuItemRisottoDescription', language),
            price: 'kr240',
            image:
              'https://images.unsplash.com/photo-1476124369491-c7addf8a3b52?w=400',
          },
        ],
      },
    ],
    supplierNeeds: [
      {
        category: t('vegetables', language),
        frequency: t('supplierNeedFrequencyTwiceWeekly', language),
        averageOrder: 'kr2,500',
        preferences: t('supplierNeedPreferencesOrganicLocallySourced', language),
      },
      {
        category: t('seafood', language),
        frequency: t('supplierNeedFrequencyDaily', language),
        averageOrder: 'kr4,500',
        preferences: t('supplierNeedPreferencesFreshSustainableSources', language),
      },
      {
        category: t('dairy', language),
        frequency: t('weeklyFrequency', language),
        averageOrder: 'kr1,800',
        preferences: t('supplierNeedPreferencesPremiumItalianCheeses', language),
      },
    ],
  }), [language]);

  const [restaurantProfile, setRestaurantProfile] = useState<RestaurantProfile>(
    getDefaultRestaurantProfile()
  );

  useEffect(() => {
    setRestaurantProfile(getDefaultRestaurantProfile());
  }, [language, getDefaultRestaurantProfile]);

  const restaurantInfo = {
    name: restaurantProfile.name,
    type: restaurantProfile.type,
    address: restaurantProfile.location,
    memberSince: t('memberSinceJanuary2024', language),
  };

  const metrics = [
    {
      label: t('monthlyOrders', language),
      value: '47',
      change: '+12%',
      trend: 'up' as const,
    },
    {
      label: t('reorderRate', language),
      value: '87%',
      change: '+5%',
      trend: 'up' as const,
    },
    {
      label: t('wasteReduction', language),
      value: '23%',
      change: '+8%',
      trend: 'up' as const,
    },
  ];

  const topSuppliers: TopSupplierSummary[] = [
    { name: t('supplierNameGreenValleyFarm', language), orders: 28, spend: 'kr12,470' },
    { name: t('supplierNameMountainDairyCo', language), orders: 19, spend: 'kr8,920' },
    { name: t('supplierNameHeritageBakery', language), orders: 15, spend: 'kr6,750' },
  ];

  const sustainabilityScore = 82;

  const handleSaveProfile = (updatedProfile: RestaurantProfile) => {
    setRestaurantProfile(updatedProfile);
    toast.success(t('restaurantProfileUpdatedSuccessfully', language));
  };

  return {
    restaurantProfile,
    setRestaurantProfile,
    restaurantInfo,
    metrics,
    topSuppliers,
    sustainabilityScore,
    handleSaveProfile,
  };
}
