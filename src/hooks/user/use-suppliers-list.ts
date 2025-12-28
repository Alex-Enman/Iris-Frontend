import { toast } from 'sonner';
import { getStoredLanguage, t } from '@lib/i18n';

export interface SupplierListItem {
  id: number;
  name: string;
  category: string;
  rating: number;
  totalOrders: number;
  monthlySpend: string;
  lastOrder: string;
  relationship: string;
  contactEmail: string;
  contactPhone: string;
  hasContract: boolean;
  image: string;
}

export function useSuppliersList() {
  const language = getStoredLanguage();
  const suppliersList: SupplierListItem[] = [
    {
      id: 1,
      name: t('supplierNameGreenValleyFarm', language),
      category: t('supplierCategoryOrganicVegetables', language),
      rating: 4.8,
      totalOrders: 28,
      monthlySpend: 'kr12,470',
      lastOrder: t('twoDaysAgo', language),
      relationship: t('relationshipPremiumPartner', language),
      contactEmail: 'orders@greenvalley.com',
      contactPhone: '+1 (555) 123-4567',
      hasContract: true,
      image:
        'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400',
    },
    {
      id: 2,
      name: t('supplierNameMountainDairyCo', language),
      category: t('supplierCategoryDairyProducts', language),
      rating: 4.6,
      totalOrders: 19,
      monthlySpend: 'kr8,920',
      lastOrder: t('oneWeekAgo', language),
      relationship: t('relationshipRegularSupplier', language),
      contactEmail: 'sales@mountaindairy.com',
      contactPhone: '+1 (555) 234-5678',
      hasContract: true,
      image:
        'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400',
    },
    {
      id: 3,
      name: t('supplierNameHeritageBakery', language),
      category: t('supplierCategoryArtisanBreadAndPastries', language),
      rating: 4.9,
      totalOrders: 15,
      monthlySpend: 'kr6,750',
      lastOrder: t('threeDaysAgo', language),
      relationship: t('relationshipPreferredVendor', language),
      contactEmail: 'contact@heritagebakery.com',
      contactPhone: '+1 (555) 345-6789',
      hasContract: false,
      image:
        'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400',
    },
  ];

  const handleReorder = (orderId: string, supplier: string) => {
    toast.success(t('reorderingFrom', language), {
      description: `${supplier} — ${t('order', language)} ${orderId} ${t('orderAddedToCart', language)}`,
    });
  };

  const handleContactSupplier = (supplier: string) => {
    toast.success(t('openingMessageTo', language), {
      description: supplier,
    });
  };

  return {
    suppliersList,
    handleReorder,
    handleContactSupplier,
  };
}
