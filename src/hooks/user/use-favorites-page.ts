import { useEffect, useState } from 'react';
import { useLanguage } from '@contexts/LanguageContext';

export interface FavoriteSupplierItem {
  id: number;
  name: string;
  image: string;
  location: string;
  rating: number;
  reviews: number;
  verified: boolean;
  category: string;
  totalOrders: number;
  lastOrder: string;
  specialties: string[];
  description: string;
}

export interface FavoriteProductItem {
  id: number;
  name: string;
  supplier: string;
  supplierId: number;
  image: string;
  price: number;
  unit: string;
  inStock: boolean;
  rating: number;
  organic: boolean;
  lastOrdered: string;
}

export interface FavoriteOrderItem {
  id: string;
  supplier: string;
  supplierId: number;
  date: string;
  total: number;
  itemCount: number;
  frequency: string;
  lastOrdered: string;
  items: Array<{ name: string; quantity: string; price: number }>;
}

export function useFavoritesPage() {
  const { t } = useLanguage();
  const [favoriteSuppliers, setFavoriteSuppliers] = useState<
    FavoriteSupplierItem[]
  >([
    {
      id: 1,
      name: t('supplierNameGreenValleyFarm'),
      image:
        'https://images.unsplash.com/photo-1573481078935-b9605167e06b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHZlZ2V0YWJsZXMlMjBmYXJtZXJ8ZW58MXx8fHwxNzYxMzA3MzM4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      location: t('distance12kmAway'),
      rating: 4.8,
      reviews: 127,
      verified: true,
      category: t('supplierCategoryOrganicVegetables'),
      totalOrders: 24,
      lastOrder: t('twoWeeksAgo'),
      specialties: [
        t('productHeirloomTomatoes'),
        t('specialtySeasonalGreens'),
        t('specialtyRootVegetables'),
      ],
      description: t('supplierDescriptionGreenValleyShort'),
    },
    {
      id: 2,
      name: t('supplierNameMountainDairyCo'),
      image:
        'https://images.unsplash.com/photo-1722718461923-c69728f7640b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc2FuJTIwY2hlZXNlJTIwZGFpcnl8ZW58MXx8fHwxNzYxMzA3MzM4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      location: t('distance8kmAway'),
      rating: 4.9,
      reviews: 203,
      verified: true,
      category: t('supplierCategoryArtisanDairy'),
      totalOrders: 18,
      lastOrder: t('oneWeekAgo'),
      specialties: [
        t('specialtyAgedCheese'),
        t('specialtyFreshMilk'),
        t('specialtyYogurt'),
      ],
      description: t('supplierDescriptionMountainDairyShort'),
    },
  ]);

  const [favoriteProducts, setFavoriteProducts] = useState<
    FavoriteProductItem[]
  >([
    {
      id: 1,
      name: t('productHeirloomTomatoes'),
      supplier: t('supplierNameGreenValleyFarm'),
      supplierId: 1,
      image:
        'https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=400',
      price: 4.5,
      unit: 'kg',
      inStock: true,
      rating: 4.9,
      organic: true,
      lastOrdered: t('oneWeekAgo'),
    },
    {
      id: 2,
      name: t('productFreshMozzarella'),
      supplier: t('supplierNameMountainDairyCo'),
      supplierId: 2,
      image:
        'https://images.unsplash.com/photo-1452195100486-9cc805987862?w=400',
      price: 12.0,
      unit: 'kg',
      inStock: true,
      rating: 4.8,
      organic: false,
      lastOrdered: t('twoDaysAgo'),
    },
  ]);

  const [favoriteOrders, setFavoriteOrders] = useState<FavoriteOrderItem[]>([
    {
      id: 'ORD-998',
      supplier: t('supplierNameGreenValleyFarm'),
      supplierId: 1,
      date: t('orderDateOct18_2025'),
      total: 156.8,
      itemCount: 8,
      frequency: t('weeklyFrequency'),
      lastOrdered: t('oneWeekAgo'),
      items: [{ name: t('productHeirloomTomatoes'), quantity: '3 kg', price: 13.5 }],
    },
  ]);

  const removeFavoriteSupplier = (id: number) =>
    setFavoriteSuppliers(prev => prev.filter(s => s.id !== id));
  const removeFavoriteProduct = (id: number) =>
    setFavoriteProducts(prev => prev.filter(p => p.id !== id));
  const removeFavoriteOrder = (id: string) =>
    setFavoriteOrders(prev => prev.filter(o => o.id !== id));

  useEffect(() => {
    setFavoriteSuppliers(prev =>
      prev.map(s => {
        if (s.id === 1)
          return {
            ...s,
            name: t('supplierNameGreenValleyFarm'),
            location: t('distance12kmAway'),
            category: t('supplierCategoryOrganicVegetables'),
            lastOrder: t('twoWeeksAgo'),
            specialties: [
              t('productHeirloomTomatoes'),
              t('specialtySeasonalGreens'),
              t('specialtyRootVegetables'),
            ],
            description: t('supplierDescriptionGreenValleyShort'),
          };
        if (s.id === 2)
          return {
            ...s,
            name: t('supplierNameMountainDairyCo'),
            location: t('distance8kmAway'),
            category: t('supplierCategoryArtisanDairy'),
            lastOrder: t('oneWeekAgo'),
            specialties: [
              t('specialtyAgedCheese'),
              t('specialtyFreshMilk'),
              t('specialtyYogurt'),
            ],
            description: t('supplierDescriptionMountainDairyShort'),
          };
        return s;
      })
    );

    setFavoriteProducts(prev =>
      prev.map(p => {
        if (p.id === 1)
          return {
            ...p,
            name: t('productHeirloomTomatoes'),
            supplier: t('supplierNameGreenValleyFarm'),
            lastOrdered: t('oneWeekAgo'),
          };
        if (p.id === 2)
          return {
            ...p,
            name: t('productFreshMozzarella'),
            supplier: t('supplierNameMountainDairyCo'),
            lastOrdered: t('twoDaysAgo'),
          };
        return p;
      })
    );

    setFavoriteOrders(prev =>
      prev.map(o => {
        if (o.id !== 'ORD-998') return o;
        return {
          ...o,
          supplier: t('supplierNameGreenValleyFarm'),
          date: t('orderDateOct18_2025'),
          frequency: t('weeklyFrequency'),
          lastOrdered: t('oneWeekAgo'),
          items: [
            {
              name: t('productHeirloomTomatoes'),
              quantity: '3 kg',
              price: 13.5,
            },
          ],
        };
      })
    );
  }, [t]);

  return {
    favoriteSuppliers,
    setFavoriteSuppliers,
    removeFavoriteSupplier,
    favoriteProducts,
    setFavoriteProducts,
    removeFavoriteProduct,
    favoriteOrders,
    setFavoriteOrders,
    removeFavoriteOrder,
  };
}
