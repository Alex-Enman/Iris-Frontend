'use client';

import { useCallback } from 'react';
import { toast } from 'sonner';
import { useLanguage } from '@contexts/LanguageContext';

export interface SupplierKpiStat {
  label: string;
  value: string;
  change: string;
  icon: any;
  trend: 'up' | 'down' | 'flat';
}

export interface UseSupplierDashboardTabOptions {
  onContactRestaurant?: (restaurantName: string) => void;
  onViewRestaurantProfile?: (restaurantId: string) => void;
}

export function useSupplierDashboardTab(
  options: UseSupplierDashboardTabOptions = {}
) {
  const { onContactRestaurant, onViewRestaurantProfile } = options;
  const { t } = useLanguage();

  const handleContactRestaurant = useCallback(
    (restaurantName: string) => {
      if (onContactRestaurant) {
        onContactRestaurant(restaurantName);
      } else {
        toast.success(t('openingMessageTo'), {
          description: restaurantName,
        });
      }
    },
    [onContactRestaurant, t]
  );

  const handleViewRestaurantProfile = useCallback(
    (restaurantId: string) => {
      if (onViewRestaurantProfile) {
        onViewRestaurantProfile(restaurantId);
      } else {
        toast.success(t('openingRestaurantProfile'));
      }
    },
    [onViewRestaurantProfile, t]
  );

  return {
    handleContactRestaurant,
    handleViewRestaurantProfile,
  };
}

export type UseSupplierDashboardTabReturn = ReturnType<
  typeof useSupplierDashboardTab
>;
