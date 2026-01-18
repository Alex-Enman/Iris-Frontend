'use client';

import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants';
import { useLanguage } from '@contexts/LanguageContext';
import { getMockProducts } from '@/tests/mocks/mock-products';
import { formatCurrency } from '@/utils/formatters';
import { getPricingMode, getProductListedUnitPrice } from '@/utils/product-pricing';
import type { Product } from '@/types';

export type OverviewUrgentActionSeverity = 'warning' | 'info';

export interface OverviewUrgentAction {
  id: string;
  title: string;
  description: string;
  severity: OverviewUrgentActionSeverity;
  ctaLabel: string;
  ctaType: 'navigate' | 'comingSoon';
  targetPage?: string;
}

export interface OverviewReview {
  id: string;
  supplierName: string;
  rating: number;
  excerpt: string;
  date: string;
}

export interface OverviewHotProduct {
  id: string;
  name: string;
  supplierName: string;
  image: string;
  priceLabel: string;
}

export interface OverviewUnreadMessagePreview {
  id: string;
  name: string;
  initials: string;
  previewText: string;
  timestamp: string;
}

export interface OverviewPageData {
  hotProducts: OverviewHotProduct[];
  urgentActions: OverviewUrgentAction[];
  recentReviews: OverviewReview[];
  unreadMessagePreviews: OverviewUnreadMessagePreview[];
  productsById: Record<string, Product>;
}

export function useOverviewPage() {
  const { t, language } = useLanguage();

  return useQuery({
    queryKey: [...QUERY_KEYS.OVERVIEW, language],
    queryFn: async (): Promise<OverviewPageData> => {
      await new Promise(resolve => setTimeout(resolve, 350));

      const products = getMockProducts();
      const productsById = products.reduce<Record<string, Product>>((acc, p) => {
        acc[p.id] = p;
        return acc;
      }, {});

      const hotProducts: OverviewHotProduct[] = products
        .filter(p => p.isAvailable)
        .slice(0, 6)
        .map(p => {
          const mode = getPricingMode(p as any);
          const listed = getProductListedUnitPrice(p as any);
          const unitLabel = mode === 'batch' ? t('batchUnitShort') : p.unit;
          return {
            id: p.id,
            name: p.name,
            supplierName: p.supplierName,
            image: p.image ?? '',
            priceLabel: `${formatCurrency(listed, 'SEK')}/${unitLabel}`,
          };
        });

      const urgentActions: OverviewUrgentAction[] = [
        {
          id: 'pending-invoices',
          title: t('pendingInvoices'),
          description: t('overviewUrgentPendingInvoicesDescription'),
          severity: 'warning',
          ctaLabel: t('payNow'),
          ctaType: 'navigate',
          targetPage: 'profile',
        },
        {
          id: 'offers-pending',
          title: t('overviewUrgentOffersPendingTitle'),
          description: t('overviewUrgentOffersPendingDescription'),
          severity: 'info',
          ctaLabel: t('review'),
          ctaType: 'comingSoon',
        },
        {
          id: 'orders-confirmation',
          title: t('overviewUrgentOrdersNeedConfirmationTitle'),
          description: t('overviewUrgentOrdersNeedConfirmationDescription'),
          severity: 'warning',
          ctaLabel: t('resolve'),
          ctaType: 'navigate',
          targetPage: 'orders',
        },
      ];

      const recentReviews: OverviewReview[] = [
        {
          id: 'review-1',
          supplierName: t('supplierNameGreenValleyFarm'),
          rating: 5,
          excerpt: t('overviewReviewExcerpt1'),
          date: '2025-10-24T09:30:00Z',
        },
        {
          id: 'review-2',
          supplierName: t('supplierNameMountainDairyCo'),
          rating: 4,
          excerpt: t('overviewReviewExcerpt2'),
          date: '2025-10-18T15:10:00Z',
        },
      ];

      const unreadMessagePreviews: OverviewUnreadMessagePreview[] = [
        {
          id: 'unread-1',
          name: t('supplierNameGreenValleyFarm'),
          initials: 'GV',
          previewText: t('messageThanksForFreshProduce'),
          timestamp: '2025-10-24T12:10:00Z',
        },
        {
          id: 'unread-2',
          name: t('supplierNameMountainDairyCo'),
          initials: 'MD',
          previewText: t('messageInquiryAboutOrganicCertification'),
          timestamp: '2025-10-24T08:30:00Z',
        },
        {
          id: 'unread-3',
          name: t('supplierNameHeritageBakery'),
          initials: 'HB',
          previewText: t('messageScheduleWeeklyDelivery'),
          timestamp: '2025-10-23T16:25:00Z',
        },
      ];

      return {
        hotProducts,
        urgentActions,
        recentReviews,
        unreadMessagePreviews,
        productsById,
      };
    },
    staleTime: 2 * 60 * 1000,
  });
}
