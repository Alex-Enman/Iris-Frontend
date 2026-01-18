import { getMockProducts, getMockSuppliers } from '@/tests/mocks/mock-data';
import {
  getPricingMode,
  getProductListedUnitPrice,
  getProductPricePerKgSek,
  getProductQuantityUnit,
} from '@/utils/product-pricing';
import type {
  MarketplaceFilters,
  MarketplaceProduct,
  MarketplaceSection,
  MarketplaceSort,
  MarketplaceSupplierSpotlight,
} from '@/types/marketplace/marketplace';

function normalizeTag(tag: string) {
  return tag.trim().toLowerCase();
}

function includesAnyTag(productTags: string[], required: string[]) {
  const set = new Set(productTags.map(normalizeTag));
  return required.some(t => set.has(normalizeTag(t)));
}

function includesAllTags(productTags: string[], required: string[]) {
  const set = new Set(productTags.map(normalizeTag));
  return required.every(t => set.has(normalizeTag(t)));
}

function pseudoDistanceKm(seed: string) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  return 3 + (hash % 47);
}

function pseudoRating(seed: string) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 33 + seed.charCodeAt(i)) >>> 0;
  const base = 3.8 + ((hash % 120) / 100);
  return Number(Math.min(5, base).toFixed(1));
}

function toMarketplaceProduct(productId: string): MarketplaceProduct | null {
  const products = getMockProducts();
  const p = products.find(x => x.id === productId);
  if (!p) return null;

  const listedUnitPrice = getProductListedUnitPrice(p);
  const pricingMode = getPricingMode(p);
  const quantityUnit = getProductQuantityUnit(p);
  const unitLabel = pricingMode === 'batch' ? 'batch' : (quantityUnit ?? p.unit);

  const distanceKm = pseudoDistanceKm(p.supplierId);
  const rating = pseudoRating(`${p.id}::${p.supplierId}`);

  const stockQuantity = p.stockQuantity;
  const isLowStock = typeof stockQuantity === 'number' && stockQuantity > 0 && stockQuantity <= 20;
  const isNew = new Date(p.createdAt).getTime() > Date.now() - 1000 * 60 * 60 * 24 * 45;

  const tags = p.tags ?? [];

  return {
    id: `mp::${p.id}`,
    productId: p.id,
    supplierId: p.supplierId,
    supplierName: p.supplierName,
    name: p.name,
    description: p.description,
    image: p.image,
    listedUnitPrice,
    unitLabel,
    pricePerKgSek: getProductPricePerKgSek(p),
    isAvailable: p.isAvailable,
    stockQuantity,
    rating,
    distanceKm,
    tags,
    badges: {
      isLowStock,
      isNew,
      isTrending: p.id === '1' || p.id === '4' || p.id === '6',
      isDeal: normalizeTag(p.name).includes('batch') || includesAnyTag(tags, ['seasonal']),
    },
  };
}

function applyFilters(products: MarketplaceProduct[], filters: MarketplaceFilters) {
  return products.filter(p => {
    if (filters.search) {
      const q = filters.search.trim().toLowerCase();
      const match =
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.supplierName.toLowerCase().includes(q);
      if (!match) return false;
    }

    if (filters.category) {
      // Category is string; domain category is enum value stored on product base.
      // We approximate using the tag/category semantics in the mock.
      const cat = filters.category.toLowerCase();
      const has = includesAnyTag(p.tags, [cat]) || p.name.toLowerCase().includes(cat);
      if (!has) return false;
    }

    if (filters.supplierId && p.supplierId !== filters.supplierId) return false;

    if (typeof filters.minPrice === 'number' && p.listedUnitPrice < filters.minPrice) return false;
    if (typeof filters.maxPrice === 'number' && p.listedUnitPrice > filters.maxPrice) return false;

    if (filters.isAvailable === true && !p.isAvailable) return false;

    if (filters.tags && filters.tags.length > 0) {
      if (!includesAllTags(p.tags, filters.tags)) return false;
    }

    if (typeof filters.maxDistanceKm === 'number' && (p.distanceKm ?? 0) > filters.maxDistanceKm)
      return false;

    return true;
  });
}

function applySort(products: MarketplaceProduct[], sort: MarketplaceSort) {
  const list = [...products];
  switch (sort) {
    case 'priceAsc':
      return list.sort((a, b) => a.listedUnitPrice - b.listedUnitPrice);
    case 'priceDesc':
      return list.sort((a, b) => b.listedUnitPrice - a.listedUnitPrice);
    case 'rating':
      return list.sort((a, b) => b.rating - a.rating);
    case 'distance':
      return list.sort((a, b) => (a.distanceKm ?? 0) - (b.distanceKm ?? 0));
    case 'new':
      return list.sort((a, b) => (b.badges.isNew ? 1 : 0) - (a.badges.isNew ? 1 : 0));
    case 'recommended':
    default:
      return list.sort((a, b) => {
        const score = (x: MarketplaceProduct) =>
          (x.badges.isTrending ? 2 : 0) + (x.badges.isDeal ? 1 : 0) + x.rating / 5;
        return score(b) - score(a);
      });
  }
}

export class MarketplaceService {
  async getAllProducts(): Promise<MarketplaceProduct[]> {
    const products = getMockProducts();
    const mapped = products
      .map(p => toMarketplaceProduct(p.id))
      .filter((p): p is MarketplaceProduct => !!p);
    return mapped;
  }

  async searchProducts(input: {
    filters: MarketplaceFilters;
    sort: MarketplaceSort;
  }): Promise<MarketplaceProduct[]> {
    const all = await this.getAllProducts();
    const filtered = applyFilters(all, input.filters);
    return applySort(filtered, input.sort);
  }

  async getSupplierSpotlights(): Promise<MarketplaceSupplierSpotlight[]> {
    const suppliers = getMockSuppliers();
    const products = await this.getAllProducts();

    const bySupplier = new Map<string, MarketplaceProduct[]>();
    for (const p of products) {
      const list = bySupplier.get(p.supplierId) ?? [];
      list.push(p);
      bySupplier.set(p.supplierId, list);
    }

    return suppliers.map(s => {
      const list = bySupplier.get(s.id) ?? [];
      const preview = list
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 6)
        .map(p => p.productId);

      return {
        supplierId: s.id,
        name: s.name,
        description: s.description,
        rating: Number((s.rating ?? pseudoRating(s.id)).toFixed(1)),
        distanceKm: pseudoDistanceKm(s.id),
        isVerified: s.isVerified,
        businessType: s.businessType,
        image: s.image,
        productPreviewIds: preview,
      };
    });
  }

  async getCuratedSections(): Promise<MarketplaceSection<MarketplaceProduct>[]> {
    const products = await this.getAllProducts();

    const hot = products.filter(p => p.badges.isTrending).slice(0, 12);
    const deals = products.filter(p => p.badges.isDeal).slice(0, 12);
    const seasonal = products.filter(p => includesAnyTag(p.tags, ['seasonal'])).slice(0, 12);
    const lowStock = products.filter(p => p.badges.isLowStock).slice(0, 12);

    return [
      { id: 'hot', titleKey: 'hotRightNow', descriptionKey: 'overviewHotRightNowDescription', items: hot },
      { id: 'deals', titleKey: 'promotionsAndDeals', descriptionKey: 'promotionsAndDealsDescription', items: deals },
      { id: 'seasonal', titleKey: 'seasonalPicks', descriptionKey: 'seasonalPicksDescription', items: seasonal },
      { id: 'lowStock', titleKey: 'lowStock', descriptionKey: 'lowStockDescription', items: lowStock },
    ];
  }
}

export const marketplaceService = new MarketplaceService();
