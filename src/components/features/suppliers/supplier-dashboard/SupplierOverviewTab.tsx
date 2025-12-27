'use client';

// Overview tab component for supplier dashboard

import {
  SupplierInfo,
  StatCard,
} from '@/types/suppliers/supplier-dashboard/types';
import { SupplierDashboardTab } from '../dashboard/SupplierDashboardTab';
import { toast } from 'sonner';
import { useLanguage } from '@contexts/LanguageContext';

interface SupplierOverviewTabProps {
  supplierInfo: SupplierInfo;
  stats: StatCard[];
}

export function SupplierOverviewTab({
  supplierInfo,
  stats,
}: SupplierOverviewTabProps) {
  const { t } = useLanguage();
  return (
    <SupplierDashboardTab
      stats={stats}
      onContactRestaurant={name =>
        toast.success(t('openingMessageTo'), {
          description: name,
        })
      }
      onViewRestaurantProfile={id =>
        toast.success(t('openingRestaurantProfile'), {
          description: id,
        })
      }
    />
  );
}
