export type MarketplaceSort =
  | 'recommended'
  | 'new'
  | 'priceAsc'
  | 'priceDesc'
  | 'rating'
  | 'distance';

export type MarketplaceQuickFilter =
  | 'organic'
  | 'local'
  | 'traceable'
  | 'fastDelivery'
  | 'deals'
  | 'availableNow';

export interface MarketplaceFilters {
  search?: string;
  category?: string;
  supplierId?: string;
  minPrice?: number;
  maxPrice?: number;
  tags?: string[];
  isAvailable?: boolean;
  maxDistanceKm?: number;
}

export interface MarketplaceProductBadges {
  isDeal?: boolean;
  isNew?: boolean;
  isTrending?: boolean;
  isLowStock?: boolean;
}

export interface MarketplaceProduct {
  id: string;
  productId: string;
  supplierId: string;
  supplierName: string;
  name: string;
  description: string;
  image?: string;
  listedUnitPrice: number;
  unitLabel: string;
  pricePerKgSek?: number;
  isAvailable: boolean;
  stockQuantity?: number;
  rating: number;
  distanceKm?: number;
  tags: string[];
  badges: MarketplaceProductBadges;
}

export interface MarketplaceSupplierSpotlight {
  supplierId: string;
  name: string;
  description?: string;
  rating: number;
  distanceKm?: number;
  isVerified?: boolean;
  businessType?: string;
  image?: string;
  productPreviewIds: string[];
}

export interface MarketplaceSection<T> {
  id: string;
  titleKey: string;
  descriptionKey?: string;
  items: T[];
}
