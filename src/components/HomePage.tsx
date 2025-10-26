import { useState, useMemo } from 'react';
import { Search, Filter, ChevronRight, ChevronDown, X } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { ProducerCard } from './ProducerCard';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { ImageWithFallback } from './figma/ImageWithFallback';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './ui/collapsible';

interface HomePageProps {
  onNavigateToProduct: () => void;
  onViewSupplier?: (supplierId: string) => void;
}

interface Producer {
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

interface Product {
  id: number;
  name: string;
  producer: string;
  image: string;
  price: string;
  categoryType: string[];
  certifications: string[];
}

export function HomePage({ onNavigateToProduct, onViewSupplier }: HomePageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [selectedCerts, setSelectedCerts] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(true);
  const [categoryOpen, setCategoryOpen] = useState(true);
  const [regionOpen, setRegionOpen] = useState(true);
  const [certOpen, setCertOpen] = useState(true);

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'vegetables', label: 'Vegetables' },
    { id: 'dairy', label: 'Dairy' },
    { id: 'meat', label: 'Meat' },
    { id: 'organic', label: 'Organic' },
    { id: 'seasonal', label: 'Seasonal' },
  ];

  const regions = ['Within 10km', '10-20km', '20-50km'];
  const certifications = ['Organic', 'Local', 'Traceable'];

  // Comprehensive mock data for producers
  const allProducers: Producer[] = [
    {
      id: 1,
      name: 'Green Valley Farm',
      image: 'https://images.unsplash.com/photo-1573481078935-b9605167e06b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHZlZ2V0YWJsZXMlMjBmYXJtZXJ8ZW58MXx8fHwxNzYxMzA3MzM4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      distance: '12 km',
      distanceKm: 12,
      rating: 4.8,
      verified: true,
      category: 'Organic Vegetables',
      categoryType: ['vegetables', 'organic'],
      certifications: ['Organic', 'Local', 'Traceable'],
      isSeasonal: true,
    },
    {
      id: 2,
      name: 'Mountain Dairy Co.',
      image: 'https://images.unsplash.com/photo-1722718461923-c69728f7640b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc2FuJTIwY2hlZXNlJTIwZGFpcnl8ZW58MXx8fHwxNzYxMzA3MzM4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      distance: '8 km',
      distanceKm: 8,
      rating: 4.9,
      verified: true,
      category: 'Artisan Dairy',
      categoryType: ['dairy'],
      certifications: ['Local', 'Traceable'],
    },
    {
      id: 3,
      name: 'Sunset Organic Farm',
      image: 'https://images.unsplash.com/photo-1738598667319-fbee044cd8cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwZmFybSUyMHByb2R1Y2V8ZW58MXx8fHwxNzYxMjkwOTg4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      distance: '15 km',
      distanceKm: 15,
      rating: 4.7,
      verified: true,
      category: 'Mixed Organic Produce',
      categoryType: ['vegetables', 'organic'],
      certifications: ['Organic', 'Traceable'],
      isSeasonal: true,
    },
    {
      id: 4,
      name: 'Heritage Bakery',
      image: 'https://images.unsplash.com/photo-1744217083335-8b57ec3826ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGJyZWFkJTIwYXJ0aXNhbnxlbnwxfHx8fDE3NjEyMzQ5MDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      distance: '5 km',
      distanceKm: 5,
      rating: 4.9,
      verified: true,
      category: 'Artisan Bakery',
      categoryType: ['seasonal'],
      certifications: ['Local', 'Organic'],
    },
    {
      id: 5,
      name: 'Riverside Butcher',
      image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWF0JTIwYnV0Y2hlciUyMHNob3B8ZW58MXx8fHwxNzYxMzA3MzM4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      distance: '18 km',
      distanceKm: 18,
      rating: 4.6,
      verified: true,
      category: 'Premium Meats',
      categoryType: ['meat'],
      certifications: ['Local', 'Traceable'],
    },
    {
      id: 6,
      name: 'Organic Pastures',
      image: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwZmFybSUyMGNvd3xlbnwxfHx8fDE3NjEzMDczMzh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      distance: '22 km',
      distanceKm: 22,
      rating: 4.8,
      verified: true,
      category: 'Organic Dairy & Meat',
      categoryType: ['dairy', 'meat', 'organic'],
      certifications: ['Organic', 'Traceable'],
    },
    {
      id: 7,
      name: 'City Greens Co-op',
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHZlZ2V0YWJsZXMlMjBtYXJrZXR8ZW58MXx8fHwxNzYxMzA3MzM4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      distance: '3 km',
      distanceKm: 3,
      rating: 4.5,
      verified: false,
      category: 'Urban Vegetables',
      categoryType: ['vegetables'],
      certifications: ['Local'],
    },
    {
      id: 8,
      name: 'Farmstead Cheese',
      image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc2FuJTIwY2hlZXNlfGVufDF8fHx8MTc2MTMwNzMzOHww&ixlib=rb-4.1.0&q=80&w=1080',
      distance: '14 km',
      distanceKm: 14,
      rating: 4.9,
      verified: true,
      category: 'Specialty Cheese',
      categoryType: ['dairy', 'organic'],
      certifications: ['Organic', 'Local', 'Traceable'],
    },
    {
      id: 9,
      name: 'Highland Ranch',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWVmJTIwZmFybSUyMGNhdHRsZXxlbnwxfHx8fDE3NjEzMDczMzh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      distance: '28 km',
      distanceKm: 28,
      rating: 4.7,
      verified: true,
      category: 'Grass-Fed Beef',
      categoryType: ['meat', 'organic'],
      certifications: ['Organic', 'Traceable'],
    },
    {
      id: 10,
      name: 'Seasonal Harvest',
      image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWFzb25hbCUyMGZhcm0lMjBwcm9kdWNlfGVufDF8fHx8MTc2MTMwNzMzOHww&ixlib=rb-4.1.0&q=80&w=1080',
      distance: '9 km',
      distanceKm: 9,
      rating: 4.8,
      verified: true,
      category: 'Seasonal Produce',
      categoryType: ['vegetables', 'seasonal'],
      certifications: ['Local', 'Traceable'],
      isSeasonal: true,
    },
    {
      id: 11,
      name: 'Free Range Poultry',
      image: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVlJTIwcmFuZ2UlMjBjaGlja2VufGVufDF8fHx8MTc2MTMwNzMzOHww&ixlib=rb-4.1.0&q=80&w=1080',
      distance: '16 km',
      distanceKm: 16,
      rating: 4.6,
      verified: true,
      category: 'Organic Poultry',
      categoryType: ['meat', 'organic'],
      certifications: ['Organic', 'Local'],
    },
    {
      id: 12,
      name: 'Valley Creamery',
      image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWxrJTIwZGFpcnklMjBmYXJtfGVufDF8fHx8MTc2MTMwNzMzOHww&ixlib=rb-4.1.0&q=80&w=1080',
      distance: '7 km',
      distanceKm: 7,
      rating: 4.7,
      verified: true,
      category: 'Fresh Dairy',
      categoryType: ['dairy'],
      certifications: ['Local'],
    },
  ];

  const allProducts: Product[] = [
    {
      id: 1,
      name: 'Heirloom Tomatoes',
      producer: 'Green Valley Farm',
      image: 'https://images.unsplash.com/photo-1591171551239-80a5eddd627a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b21hdG9lcyUyMGZyZXNoJTIwbWFya2V0fGVufDF8fHx8MTc2MTMwNzMzOXww&ixlib=rb-4.1.0&q=80&w=1080',
      price: '€4.50/kg',
      categoryType: ['vegetables', 'organic', 'seasonal'],
      certifications: ['Organic', 'Local'],
    },
    {
      id: 2,
      name: 'Free-Range Eggs',
      producer: 'Free Range Poultry',
      image: 'https://images.unsplash.com/photo-1669669420238-7a4be2e3eac6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwZWdncyUyMGZhcm18ZW58MXx8fHwxNzYxMjcyMTk0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      price: '€5.20/dozen',
      categoryType: ['organic'],
      certifications: ['Organic', 'Local'],
    },
    {
      id: 3,
      name: 'Extra Virgin Olive Oil',
      producer: 'Seasonal Harvest',
      image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbGl2ZSUyMG9pbCUyMGJvdHRsZXxlbnwxfHx8fDE3NjEyMDU0MTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      price: '€12.00/L',
      categoryType: ['organic'],
      certifications: ['Organic', 'Traceable'],
    },
    {
      id: 4,
      name: 'Sourdough Bread',
      producer: 'Heritage Bakery',
      image: 'https://images.unsplash.com/photo-1744217083335-8b57ec3826ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGJyZWFkJTIwYXJ0aXNhbnxlbnwxfHx8fDE3NjEyMzQ5MDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      price: '€6.80/loaf',
      categoryType: ['seasonal'],
      certifications: ['Local', 'Organic'],
    },
    {
      id: 5,
      name: 'Artisan Cheese Selection',
      producer: 'Mountain Dairy Co.',
      image: 'https://images.unsplash.com/photo-1722718461923-c69728f7640b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc2FuJTIwY2hlZXNlJTIwZGFpcnl8ZW58MXx8fHwxNzYxMzA3MzM4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      price: '€18.50/kg',
      categoryType: ['dairy'],
      certifications: ['Local', 'Traceable'],
    },
    {
      id: 6,
      name: 'Grass-Fed Ribeye Steak',
      producer: 'Highland Ranch',
      image: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWVmJTIwc3RlYWt8ZW58MXx8fHwxNzYxMzA3MzM4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      price: '€24.90/kg',
      categoryType: ['meat', 'organic'],
      certifications: ['Organic', 'Traceable'],
    },
    {
      id: 7,
      name: 'Seasonal Greens Mix',
      producer: 'Sunset Organic Farm',
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHZlZ2V0YWJsZXMlMjBtYXJrZXR8ZW58MXx8fHwxNzYxMzA3MzM4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      price: '€3.80/kg',
      categoryType: ['vegetables', 'organic', 'seasonal'],
      certifications: ['Organic', 'Traceable'],
    },
    {
      id: 8,
      name: 'Fresh Whole Milk',
      producer: 'Valley Creamery',
      image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWxrJTIwYm90dGxlfGVufDF8fHx8MTc2MTMwNzMzOHww&ixlib=rb-4.1.0&q=80&w=1080',
      price: '€2.50/L',
      categoryType: ['dairy'],
      certifications: ['Local'],
    },
  ];

  // Filter producers based on selected filters
  const filteredProducers = useMemo(() => {
    return allProducers.filter((producer) => {
      // Category filter
      const categoryMatch =
        selectedCategory === 'all' ||
        producer.categoryType.includes(selectedCategory) ||
        (selectedCategory === 'seasonal' && producer.isSeasonal);

      // Region filter
      const regionMatch =
        selectedRegions.length === 0 ||
        selectedRegions.some((region) => {
          if (region === 'Within 10km') return producer.distanceKm <= 10;
          if (region === '10-20km')
            return producer.distanceKm > 10 && producer.distanceKm <= 20;
          if (region === '20-50km')
            return producer.distanceKm > 20 && producer.distanceKm <= 50;
          return false;
        });

      // Certification filter
      const certMatch =
        selectedCerts.length === 0 ||
        selectedCerts.every((cert) => producer.certifications.includes(cert));

      return categoryMatch && regionMatch && certMatch;
    });
  }, [selectedCategory, selectedRegions, selectedCerts]);

  // Filter products based on selected filters
  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      // Category filter
      const categoryMatch =
        selectedCategory === 'all' ||
        product.categoryType.includes(selectedCategory);

      // Certification filter
      const certMatch =
        selectedCerts.length === 0 ||
        selectedCerts.every((cert) => product.certifications.includes(cert));

      return categoryMatch && certMatch;
    });
  }, [selectedCategory, selectedCerts]);

  const toggleRegion = (region: string) => {
    setSelectedRegions((prev) =>
      prev.includes(region) ? prev.filter((r) => r !== region) : [...prev, region]
    );
  };

  const toggleCert = (cert: string) => {
    setSelectedCerts((prev) =>
      prev.includes(cert) ? prev.filter((c) => c !== cert) : [...prev, cert]
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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 to-accent/5">
        <div className="mx-auto max-w-[1440px] px-8 py-20">
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-5xl tracking-tight text-primary">
              Empowering local producers
            </h1>
            <p className="flex items-center justify-center gap-2 text-xl text-muted-foreground">
              Fresh ingredients daily
              <ChevronRight className="h-5 w-5 text-accent" />
            </p>
          </div>

          {/* Search Bar */}
          <div className="mx-auto max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search producers, ingredients, or categories..."
                className="h-14 rounded-2xl border-0 bg-white pl-12 pr-4 shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-shadow duration-250 focus:shadow-[0_4px_16px_rgba(0,0,0,0.12)]"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] px-8 py-12">
        <div className="relative">
          {/* Sticky Floating Filter Menu */}
          {showFilters && (
            <div className="fixed left-8 top-32 z-40 w-72">
              <div className="overflow-hidden rounded-3xl bg-white/95 shadow-[0_8px_32px_rgba(0,0,0,0.12)] backdrop-blur-xl transition-all duration-300 hover:shadow-[0_12px_48px_rgba(0,0,0,0.16)]">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-primary/10 bg-gradient-to-br from-primary/5 to-accent/5 p-5">
                  <div className="flex items-center gap-2">
                    <Filter className="h-5 w-5 text-primary" />
                    <h3 className="text-lg">Filters</h3>
                    {activeFilterCount > 0 && (
                      <Badge className="ml-1 bg-accent">{activeFilterCount}</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    {activeFilterCount > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearAllFilters}
                        className="h-8 px-2 text-xs hover:bg-primary/10"
                      >
                        Clear
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowFilters(false)}
                      className="h-8 w-8 p-0 hover:bg-primary/10"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Filter Content */}
                <div className="max-h-[calc(100vh-240px)] overflow-y-auto p-2">
                  {/* Categories */}
                  <Collapsible open={categoryOpen} onOpenChange={setCategoryOpen}>
                    <CollapsibleTrigger className="flex w-full items-center justify-between rounded-2xl p-4 transition-colors hover:bg-primary/5">
                      <span className="text-sm">Category</span>
                      <ChevronDown
                        className={`h-4 w-4 text-muted-foreground transition-transform duration-250 ${
                          categoryOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="px-2 pb-2">
                      <div className="space-y-1 pt-2">
                        {categories.map((category) => (
                          <button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.id)}
                            className={`w-full rounded-xl px-4 py-2.5 text-left text-sm transition-all duration-250 ${
                              selectedCategory === category.id
                                ? 'bg-primary text-primary-foreground shadow-[0_2px_8px_rgba(45,77,49,0.2)]'
                                : 'hover:bg-primary/5'
                            }`}
                          >
                            {category.label}
                          </button>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>

                  {/* Region */}
                  <Collapsible
                    open={regionOpen}
                    onOpenChange={setRegionOpen}
                    className="mt-2"
                  >
                    <CollapsibleTrigger className="flex w-full items-center justify-between rounded-2xl p-4 transition-colors hover:bg-primary/5">
                      <span className="text-sm">Region</span>
                      <ChevronDown
                        className={`h-4 w-4 text-muted-foreground transition-transform duration-250 ${
                          regionOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="px-4 pb-2">
                      <div className="space-y-3 pt-2">
                        {regions.map((region) => (
                          <div
                            key={region}
                            className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-primary/5"
                          >
                            <Checkbox
                              id={`filter-${region}`}
                              checked={selectedRegions.includes(region)}
                              onCheckedChange={() => toggleRegion(region)}
                            />
                            <Label
                              htmlFor={`filter-${region}`}
                              className="flex-1 cursor-pointer text-sm"
                            >
                              {region}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>

                  {/* Certification */}
                  <Collapsible
                    open={certOpen}
                    onOpenChange={setCertOpen}
                    className="mt-2"
                  >
                    <CollapsibleTrigger className="flex w-full items-center justify-between rounded-2xl p-4 transition-colors hover:bg-primary/5">
                      <span className="text-sm">Certification</span>
                      <ChevronDown
                        className={`h-4 w-4 text-muted-foreground transition-transform duration-250 ${
                          certOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="px-4 pb-2">
                      <div className="space-y-3 pt-2">
                        {certifications.map((cert) => (
                          <div
                            key={cert}
                            className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-primary/5"
                          >
                            <Checkbox
                              id={`filter-${cert}`}
                              checked={selectedCerts.includes(cert)}
                              onCheckedChange={() => toggleCert(cert)}
                            />
                            <Label
                              htmlFor={`filter-${cert}`}
                              className="flex-1 cursor-pointer text-sm"
                            >
                              {cert}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </div>
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className={`transition-all duration-300 ${showFilters ? 'ml-80' : 'ml-0'}`}>
            {/* Show Filters Button */}
            {!showFilters && (
              <div className="mb-6">
                <Button
                  onClick={() => setShowFilters(true)}
                  className="rounded-2xl bg-white shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-all duration-250 hover:bg-primary/5 hover:shadow-[0_6px_24px_rgba(0,0,0,0.12)]"
                  variant="outline"
                >
                  <Filter className="mr-2 h-4 w-4" />
                  Show Filters
                </Button>
              </div>
            )}

            {/* Featured Products */}
            <section className="mb-16">
              <div className="mb-6">
                <h2>Featured Products</h2>
                <p className="mt-1 text-muted-foreground">
                  {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} available
                </p>
              </div>
              {filteredProducts.length === 0 ? (
                <div className="flex min-h-[300px] flex-col items-center justify-center rounded-3xl bg-gradient-to-br from-primary/5 to-accent/5 p-12 text-center">
                  <Filter className="mb-4 h-12 w-12 text-muted-foreground/30" />
                  <h3 className="mb-2 text-xl text-primary">No products found</h3>
                  <p className="mb-4 max-w-md text-muted-foreground">
                    Try adjusting your filters to see more results
                  </p>
                  <Button
                    onClick={clearAllFilters}
                    variant="outline"
                    className="rounded-xl"
                  >
                    Clear All Filters
                  </Button>
                </div>
              ) : (
                <div className="relative -mx-2 px-2">
                  <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
                    {filteredProducts.map((product) => (
                      <div
                        key={product.id}
                        onClick={onNavigateToProduct}
                        className="group w-80 flex-shrink-0 cursor-pointer overflow-hidden rounded-2xl bg-white shadow-[0_1px_4px_rgba(0,0,0,0.08)] transition-all duration-250 hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)] hover:-translate-y-1 snap-start"
                      >
                        <div className="relative aspect-square overflow-hidden">
                          <ImageWithFallback
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-cover transition-transform duration-250 group-hover:scale-105"
                          />
                        </div>
                        <div className="p-5">
                          <h3 className="mb-1 text-lg">{product.name}</h3>
                          <p className="mb-3 text-sm text-muted-foreground">
                            {product.producer}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-primary">{product.price}</span>
                            <Badge variant="secondary">In Stock</Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Gradient fade on edges */}
                  <div className="pointer-events-none absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-background to-transparent" />
                </div>
              )}
            </section>

            {/* Recommended For You */}
            <section className="overflow-hidden">
              <div className="mb-6">
                <h2>Recommended for You</h2>
                <p className="mt-1 text-muted-foreground">
                  Based on your preferences — {filteredProducers.length} producer{filteredProducers.length !== 1 ? 's' : ''} found
                </p>
              </div>
              {filteredProducers.length === 0 ? (
                <div className="flex min-h-[300px] flex-col items-center justify-center rounded-3xl bg-gradient-to-br from-primary/5 to-accent/5 p-12 text-center">
                  <Search className="mb-4 h-12 w-12 text-muted-foreground/30" />
                  <h3 className="mb-2 text-xl text-primary">No producers found</h3>
                  <p className="mb-4 max-w-md text-muted-foreground">
                    Try different filters to discover more producers
                  </p>
                  <Button
                    onClick={clearAllFilters}
                    variant="outline"
                    className="rounded-xl"
                  >
                    Clear All Filters
                  </Button>
                </div>
              ) : (
                <div className="relative -mx-2 px-2">
                  <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
                    {filteredProducers.map((producer) => (
                      <div key={producer.id} className="w-80 flex-shrink-0 snap-start">
                        <ProducerCard
                          {...producer}
                          onClick={() => onViewSupplier?.(producer.id.toString())}
                        />
                      </div>
                    ))}
                  </div>
                  {/* Gradient fade on edges */}
                  <div className="pointer-events-none absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-background to-transparent" />
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}