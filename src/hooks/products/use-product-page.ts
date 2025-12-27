import { useState } from 'react';
import { Leaf, MapPin, Award } from 'lucide-react';
import { useLanguage } from '@contexts/LanguageContext';

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

export function useProductPage() {
  const { t } = useLanguage();
  const [quantity, setQuantity] = useState(1);
  const [imageScale, setImageScale] = useState(1);
  const [showCompare, setShowCompare] = useState(false);
  const [highlightBest, setHighlightBest] = useState(false);

  const product: ProductData = {
    name: t('productHeirloomTomatoes'),
    producer: t('supplierNameGreenValleyFarm'),
    price: 4.5,
    unit: 'kg',
    image:
      'https://images.unsplash.com/photo-1591171551239-80a5eddd627a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b21hdG9lcyUyMGZyZXNoJTIwbWFya2V0fGVufDF8fHx8MTc2MTMwNzMzOXww&ixlib=rb-4.1.0&q=80&w=1080',
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
      price: '€4.50/kg',
      priceValue: 4.5,
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
      price: '€3.80/kg',
      priceValue: 3.8,
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
      price: '€3.20/kg',
      priceValue: 3.2,
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
