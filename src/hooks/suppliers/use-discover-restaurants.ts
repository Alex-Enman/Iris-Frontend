import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { getStoredLanguage, t } from '@lib/i18n';

export type RestaurantIdentity = {
  id: string;
  name: string;
  type: string;
  cuisine: string;
};

export type RestaurantLocation = {
  location: string;
  distance: string;
};

export type RestaurantMetrics = {
  rating: number;
  reviews: number;
  seatingCapacity: number;
};

export type RestaurantRelations = {
  avatar: string;
  isCustomer?: boolean;
  lookingForSuppliers?: boolean;
  status?: 'active' | 'new' | 'potential';
};

export type RestaurantCommerce = {
  totalSpent?: string;
  lastOrder?: string;
  orderFrequency?: string;
  avgOrderValue?: string;
  memberSince: string;
};

export type RestaurantItem = RestaurantIdentity &
  RestaurantLocation &
  RestaurantMetrics &
  RestaurantRelations &
  RestaurantCommerce;

export type SortBy = 'rating' | 'name' | 'newest';

export function useDiscoverRestaurants() {
  const language = getStoredLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [cuisineFilter, setCuisineFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [sortBy, setSortBy] = useState<SortBy>('rating');

  useEffect(() => {
    setCuisineFilter('all');
    setLocationFilter('all');
  }, [language]);

  const allRestaurants: RestaurantItem[] = useMemo(
    () => [
      {
        id: '1',
        name: t('restaurantLaBellaCucina', language),
        type: t('restaurantTypeItalianFineDining', language),
        cuisine: t('restaurantCuisineItalian', language),
        location: t('restaurantLocationDowntown', language),
        distance: t('distance2_5kmAway', language),
        rating: 4.7,
        reviews: 342,
        avatar: '🍝',
        isCustomer: true,
        totalSpent: 'kr125,000',
        lastOrder: t('twoDaysAgo', language),
        orderFrequency: t('weeklyFrequency', language),
        avgOrderValue: 'kr2,650',
        status: 'active',
        memberSince: t('memberSinceJan2024', language),
        seatingCapacity: 85,
      },
      {
        id: '2',
        name: t('restaurantTheGardenBistro', language),
        type: t('restaurantTypeFarmToTable', language),
        cuisine: t('restaurantCuisineContemporary', language),
        location: t('restaurantLocationMidtown', language),
        distance: t('distance4_2kmAway', language),
        rating: 4.9,
        reviews: 567,
        avatar: '🌿',
        isCustomer: false,
        status: 'new',
        memberSince: t('memberSinceSep2024', language),
        seatingCapacity: 60,
        lookingForSuppliers: true,
      },
      {
        id: '3',
        name: t('restaurantSakuraSushiHouse', language),
        type: t('restaurantTypeJapaneseRestaurant', language),
        cuisine: t('restaurantCuisineJapanese', language),
        location: t('restaurantLocationEastSide', language),
        distance: t('distance3_8kmAway', language),
        rating: 4.8,
        reviews: 421,
        avatar: '🍱',
        isCustomer: true,
        totalSpent: 'kr87,500',
        lastOrder: t('oneWeekAgo', language),
        orderFrequency: t('biWeeklyFrequency', language),
        avgOrderValue: 'kr1,750',
        status: 'active',
        memberSince: t('memberSinceMar2024', language),
        seatingCapacity: 50,
      },
    ],
    [language]
  );

  const filteredRestaurants = useMemo(() => {
    return allRestaurants
      .filter(restaurant => {
        const matchesSearch =
          restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          restaurant.type.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCuisine =
          cuisineFilter === 'all' || restaurant.cuisine === cuisineFilter;
        const matchesLocation =
          locationFilter === 'all' || restaurant.location === locationFilter;
        return matchesSearch && matchesCuisine && matchesLocation;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'rating':
            return b.rating - a.rating;
          case 'name':
            return a.name.localeCompare(b.name);
          case 'newest':
            return (
              new Date(b.memberSince).getTime() -
              new Date(a.memberSince).getTime()
            );
          default:
            return 0;
        }
      });
  }, [allRestaurants, searchQuery, cuisineFilter, locationFilter, sortBy]);

  const handleAddToFavorites = (restaurantName: string) => {
    toast.success(t('addedToFavorites', language), {
      description: `${restaurantName} ${t('hasBeenAddedToYourFavorites', language)}`,
    });
  };

  return {
    // state
    searchQuery,
    setSearchQuery,
    cuisineFilter,
    setCuisineFilter,
    locationFilter,
    setLocationFilter,
    sortBy,
    setSortBy,
    // data
    allRestaurants,
    filteredRestaurants,
    // actions
    handleAddToFavorites,
  };
}
