import { useState } from 'react';
import { Leaf, MapPin, Award } from 'lucide-react';
import { useLanguage } from '@contexts/LanguageContext';
import { getMockProducts } from '@/tests/mocks/mock-products';

export interface ProductBadgeDef {
  icon: any;
  label: string;
  color: string;
}

type ProductIdentity = {
  name: string;
  producer: string;
  image: string;
};

type ProductPricing = {
  price: number;
  unit: string;
  pricingMode?: 'perKg' | 'batch';
  batchWeightKg?: number;
  batchPriceSek?: number;
};

type ProductMeta = {
  rating: number;
  reviews: number;
  location: string;
  verified: boolean;
  delivery: string;
  badges: ProductBadgeDef[];
  description: string;
  producerInfo: string;
};

export type ProductData = ProductIdentity & ProductPricing & ProductMeta;

export type SimilarProductItem = {
  id: number;
  name: string;
  producer: string;
  price: string;
  priceValue: number;
  image: string;
  rating: number;
  reviews: number;
  location: string;
  deliveryTime: string;
  stockAvailable: string;
  badges: string[];
  verified: boolean;
  isBestPrice: boolean;
  isBestRating: boolean;
  isBestDelivery: boolean;
};

export type ReviewItem = {
  id: number;
  author: string;
  restaurant: string;
  rating: number;
  comment: string;
  date: string;
};

export function useProductPage(productId?: string) {
  const { t } = useLanguage();
  const [quantity, setQuantity] = useState(1);
  const [imageScale, setImageScale] = useState(1);
  const [showCompare, setShowCompare] = useState(false);
  const [highlightBest, setHighlightBest] = useState(false);

  const mockProducts = getMockProducts();
  const selected =
    productId != null
      ? mockProducts.find(p => p.id === productId) ?? mockProducts[0]
      : mockProducts[0];

  const selectedUnit = selected?.unit ?? 'kg';
  const selectedImage = selected?.image ?? '';

  const product: ProductData = {
    name: selected?.name ?? t('productHeirloomTomatoes'),
    producer: selected?.supplierName ?? t('supplierNameGreenValleyFarm'),
    price: selected?.price ?? 45,
    unit: selectedUnit,
    pricingMode: (selected as any)?.pricingMode,
    batchWeightKg: (selected as any)?.batchWeightKg,
    batchPriceSek: (selected as any)?.batchPriceSek,
    image: selectedImage,
    rating: 4.8,
    reviews: 127,
    location: t('distance12kmAway'),
    verified: true,
    delivery: t('thursday8am'),
    badges: [
      { icon: Leaf, label: t('organic'), color: 'text-primary' },
      { icon: MapPin, label: t('local'), color: 'text-accent' },
      { icon: Award, label: t('traceable'), color: 'text-primary' },
    ],
    description: t('productHeirloomTomatoesLongDescription'),
    producerInfo: t('producerInfoGreenValleyFarmLong'),
  };

  const similarProducts: SimilarProductItem[] = [
    {
      id: 1,
      name: t('productHeirloomTomatoes'),
      producer: t('supplierNameGreenValleyFarm'),
      price: 'kr45/kg',
      priceValue: 45,
      image: product.image,
      rating: 4.8,
      reviews: 127,
      location: t('distance12kmAway'),
      deliveryTime: t('deliveryTime24Hours'),
      stockAvailable: 'inStock',
      badges: [t('organic'), t('local'), t('traceable')],
      verified: true,
      isBestPrice: false,
      isBestRating: true,
      isBestDelivery: false,
    },
    {
      id: 2,
      name: t('productCherryTomatoes'),
      producer: t('supplierNameSunriseOrganic'),
      price: 'kr38/kg',
      priceValue: 38,
      image: product.image,
      rating: 4.6,
      reviews: 89,
      location: t('distance18kmAway'),
      deliveryTime: t('deliveryTime12Hours'),
      stockAvailable: 'limitedStock',
      badges: [t('organic'), t('local')],
      verified: true,
      isBestPrice: false,
      isBestRating: false,
      isBestDelivery: true,
    },
    {
      id: 3,
      name: t('productRomaTomatoes'),
      producer: t('supplierNameHeritageProduce'),
      price: 'kr32/kg',
      priceValue: 32,
      image: product.image,
      rating: 4.7,
      reviews: 95,
      location: t('distance25kmAway'),
      deliveryTime: t('deliveryTime48Hours'),
      stockAvailable: 'inStock',
      badges: [t('organic'), t('traceable')],
      verified: false,
      isBestPrice: true,
      isBestRating: false,
      isBestDelivery: false,
    },
  ];

  const reviews: ReviewItem[] = [
    {
      id: 1,
      author: t('chefMarco'),
      restaurant: t('laCucina'),
      rating: 5,
      comment: t('reviewCommentExceptionalFlavor'),
      date: t('twoWeeksAgo'),
    },
    {
      id: 2,
      author: t('chefSarah'),
      restaurant: t('greenTable'),
      rating: 5,
      comment: t('reviewCommentBestTomatoesSourced'),
      date: t('threeWeeksAgo'),
    },
  ];

  return {
    // state
    quantity,
    setQuantity,
    imageScale,
    setImageScale,
    showCompare,
    setShowCompare,
    highlightBest,
    setHighlightBest,
    // data
    product,
    similarProducts,
    reviews,
  };
}
