import { useEffect, useMemo, useState } from 'react';
import { useLanguage } from '@contexts/LanguageContext';
import { getMockProducts } from '@/tests/mocks/mock-products';
import { formatCurrency } from '@/utils/formatters';
import {
  getPricingMode,
  getProductListedUnitPrice,
} from '@/utils/product-pricing';

export interface Producer {
  id: number;
  name: string;
  image: string;
  distance: string;
  distanceKm: number;
  rating: number;
  verified: boolean;
  category: string;
  categoryType: string[];
  certifications: string[];
  isSeasonal?: boolean;
}

export interface ProductItem {
  id: string;
  name: string;
  producer: string;
  image: string;
  price: string;
  categoryType: string[];
  certifications: string[];
}

export function useHomePage() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [selectedCerts, setSelectedCerts] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(true);
  const [categoryOpen, setCategoryOpen] = useState(true);
  const [regionOpen, setRegionOpen] = useState(true);
  const [certOpen, setCertOpen] = useState(true);

  const categories = [
    { id: 'all', label: t('all') },
    { id: 'vegetables', label: t('vegetables') },
    { id: 'dairy', label: t('dairy') },
    { id: 'meat', label: t('meat') },
    { id: 'organic', label: t('organic') },
    { id: 'seasonal', label: t('seasonal') },
  ];

  const regionOptions = [
    { id: 'within10km', label: t('within10km') },
    { id: 'tenToTwentyKm', label: t('tenToTwentyKm') },
    { id: 'twentyToFiftyKm', label: t('twentyToFiftyKm') },
  ];

  const regions = regionOptions.map(r => r.label);
  const certifications = [t('organic'), t('local'), t('traceable')];

  const allProducers: Producer[] = useMemo(
    () => [
      {
        id: 1,
        name: t('supplierNameGreenValleyFarm'),
        image:
          'https://images.unsplash.com/photo-1573481078935-b9605167e06b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHZlZ2V0YWJsZXMlMjBmYXJtZXJ8ZW58MXx8fHwxNzYxMzA3MzM4fDA&ixlib=rb-4.1.0&q=80&w=1080',
        distance: t('distance12km'),
        distanceKm: 12,
        rating: 4.8,
        verified: true,
        category: t('supplierCategoryOrganicVegetables'),
        categoryType: ['vegetables', 'organic'],
        certifications: [t('organic'), t('local'), t('traceable')],
        isSeasonal: true,
      },
      {
        id: 2,
        name: t('supplierNameMountainDairyCo'),
        image:
          'https://images.unsplash.com/photo-1722718461923-c69728f7640b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc2FuJTIwY2hlZXNlJTIwZGFpcnl8ZW58MXx8fHwxNzYxMzA3MzM4fDA&ixlib=rb-4.1.0&q=80&w=1080',
        distance: t('distance8km'),
        distanceKm: 8,
        rating: 4.9,
        verified: true,
        category: t('supplierCategoryArtisanDairy'),
        categoryType: ['dairy'],
        certifications: [t('local'), t('traceable')],
      },
    ],
    [t]
  );

  const allProducts: ProductItem[] = useMemo(() => {
    const categoryTypeByCategory = (category: unknown): string[] => {
      const raw = String(category ?? '').toLowerCase();
      if (raw.includes('dairy')) return ['dairy'];
      if (raw.includes('meat') || raw.includes('poultry')) return ['meat'];
      if (raw.includes('seafood') || raw.includes('fish')) return ['meat'];
      if (raw.includes('bakery')) return ['vegetables'];
      return ['vegetables'];
    };

    const mapCertifications = (tags: unknown): string[] => {
      const values = Array.isArray(tags) ? tags.map(v => String(v)) : [];
      const certs: string[] = [];
      if (values.some(v => v.toLowerCase().includes('organic'))) certs.push(t('organic'));
      if (values.some(v => v.toLowerCase().includes('local'))) certs.push(t('local'));
      if (values.some(v => v.toLowerCase().includes('trace'))) certs.push(t('traceable'));
      return certs;
    };

    const products = getMockProducts();
    return products.map(p => {
      const mode = getPricingMode(p as any);
      const listed = getProductListedUnitPrice(p as any);
      const unitLabel = mode === 'batch' ? t('batchUnitShort') : p.unit;

      return {
        id: p.id,
        name: p.name,
        producer: p.supplierName,
        image: p.image ?? '',
        price: `${formatCurrency(listed, 'SEK')}/${unitLabel}`,
        categoryType: categoryTypeByCategory((p as any).category),
        certifications: mapCertifications((p as any).tags),
      };
    });
  }, [t]);

  useEffect(() => {
    setSelectedRegions([]);
    setSelectedCerts([]);
  }, [t]);

  const filteredProducers = useMemo(() => {
    return allProducers.filter(producer => {
      const categoryMatch =
        selectedCategory === 'all' ||
        producer.categoryType.includes(selectedCategory) ||
        (selectedCategory === 'seasonal' && producer.isSeasonal);
      const regionMatch =
        selectedRegions.length === 0 ||
        selectedRegions.some(region => {
          const regionId =
            regionOptions.find(r => r.label === region)?.id ?? region;
          if (regionId === 'within10km') return producer.distanceKm <= 10;
          if (regionId === 'tenToTwentyKm')
            return producer.distanceKm > 10 && producer.distanceKm <= 20;
          if (regionId === 'twentyToFiftyKm')
            return producer.distanceKm > 20 && producer.distanceKm <= 50;
          return false;
        });
      const certMatch =
        selectedCerts.length === 0 ||
        selectedCerts.every(cert => producer.certifications.includes(cert));
      return categoryMatch && regionMatch && certMatch;
    });
  }, [selectedCategory, selectedRegions, selectedCerts, allProducers]);

  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => {
      const categoryMatch =
        selectedCategory === 'all' ||
        product.categoryType.includes(selectedCategory);
      const certMatch =
        selectedCerts.length === 0 ||
        selectedCerts.every(cert => product.certifications.includes(cert));
      return categoryMatch && certMatch;
    });
  }, [selectedCategory, selectedCerts, allProducts]);

  const toggleRegion = (region: string) => {
    setSelectedRegions(prev =>
      prev.includes(region) ? prev.filter(r => r !== region) : [...prev, region]
    );
  };

  const toggleCert = (cert: string) => {
    setSelectedCerts(prev =>
      prev.includes(cert) ? prev.filter(c => c !== cert) : [...prev, cert]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategory('all');
    setSelectedRegions([]);
    setSelectedCerts([]);
  };

  const activeFilterCount =
    (selectedCategory !== 'all' ? 1 : 0) +
    selectedRegions.length +
    selectedCerts.length;

  return {
    // state
    selectedCategory,
    setSelectedCategory,
    selectedRegions,
    setSelectedRegions,
    selectedCerts,
    setSelectedCerts,
    showFilters,
    setShowFilters,
    categoryOpen,
    setCategoryOpen,
    regionOpen,
    setRegionOpen,
    certOpen,
    setCertOpen,
    // data
    categories,
    regions,
    certifications,
    allProducers,
    allProducts,
    filteredProducers,
    filteredProducts,
    // actions
    toggleRegion,
    toggleCert,
    clearAllFilters,
    activeFilterCount,
  };
}
