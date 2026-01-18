import { useQuery } from '@tanstack/react-query';
import { marketplaceService } from '@/lib/data/services/marketplace/marketplace-service';
import type {
  MarketplaceFilters,
  MarketplaceSort,
} from '@/types/marketplace/marketplace';
import { QUERY_KEYS } from '@/constants';

export function useMarketplaceProducts(input: {
  filters: MarketplaceFilters;
  sort: MarketplaceSort;
}) {
  return useQuery({
    queryKey: [...QUERY_KEYS.PRODUCTS, 'marketplace', 'search', input],
    queryFn: () => marketplaceService.searchProducts(input),
    staleTime: 60 * 1000,
  });
}

export function useMarketplaceSections() {
  return useQuery({
    queryKey: [...QUERY_KEYS.PRODUCTS, 'marketplace', 'sections'],
    queryFn: () => marketplaceService.getCuratedSections(),
    staleTime: 5 * 60 * 1000,
  });
}

export function useMarketplaceSupplierSpotlights() {
  return useQuery({
    queryKey: [...QUERY_KEYS.SUPPLIERS, 'marketplace', 'spotlights'],
    queryFn: () => marketplaceService.getSupplierSpotlights(),
    staleTime: 10 * 60 * 1000,
  });
}
