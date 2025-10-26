import { useState, useMemo } from 'react';
import { Search, Filter, Star, MapPin, Award, ChevronDown, X, TrendingUp } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Avatar, AvatarFallback } from './ui/avatar';
import { ScrollArea } from './ui/scroll-area';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './ui/collapsible';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface SuppliersPageProps {
  onViewSupplier: (supplierId: string) => void;
}

interface Supplier {
  id: string;
  name: string;
  category: string;
  categoryTypes: string[];
  location: string;
  distance: number;
  rating: number;
  totalReviews: number;
  verified: boolean;
  certifications: string[];
  image: string;
  avatar: string;
  totalProducts: number;
  responseTime: string;
  memberSince: string;
  description: string;
}

export function SuppliersPage({ onViewSupplier }: SuppliersPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedCerts, setSelectedCerts] = useState<string[]>([]);
  const [selectedDistance, setSelectedDistance] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(true);
  const [categoryOpen, setCategoryOpen] = useState(true);
  const [certOpen, setCertOpen] = useState(true);
  const [sortBy, setSortBy] = useState<string>('rating');

  const suppliers: Supplier[] = [
    {
      id: '1',
      name: 'Green Valley Farm',
      category: 'Organic Vegetables & Herbs',
      categoryTypes: ['Vegetables', 'Herbs'],
      location: 'Valley Ridge',
      distance: 12,
      rating: 4.8,
      totalReviews: 127,
      verified: true,
      certifications: ['Organic Certified', 'Local Producer', 'Traceable'],
      image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800',
      avatar: 'GV',
      totalProducts: 24,
      responseTime: '< 2 hours',
      memberSince: 'March 2022',
      description: 'Family-run organic farm specializing in heritage vegetables and sustainable farming practices.',
    },
    {
      id: '2',
      name: 'Mountain Dairy Co.',
      category: 'Dairy Products & Cheese',
      categoryTypes: ['Dairy', 'Cheese'],
      location: 'Highland Valley',
      distance: 18,
      rating: 4.6,
      totalReviews: 93,
      verified: true,
      certifications: ['Organic Certified', 'Traceable'],
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800',
      avatar: 'MD',
      totalProducts: 18,
      responseTime: '< 3 hours',
      memberSince: 'June 2021',
      description: 'Artisan dairy producing premium cheeses and dairy products from grass-fed cows.',
    },
    {
      id: '3',
      name: 'Ocean Fresh Seafood',
      category: 'Fresh Seafood',
      categoryTypes: ['Seafood', 'Fish'],
      location: 'Coastal Harbor',
      distance: 35,
      rating: 4.7,
      totalReviews: 156,
      verified: true,
      certifications: ['Sustainable', 'Traceable', 'Local Producer'],
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800',
      avatar: 'OF',
      totalProducts: 32,
      responseTime: '< 1 hour',
      memberSince: 'January 2023',
      description: 'Sustainable seafood supplier with daily catches from local fishermen.',
    },
    {
      id: '4',
      name: 'Heritage Bakery',
      category: 'Artisan Bread & Pastries',
      categoryTypes: ['Bakery', 'Bread'],
      location: 'Old Town',
      distance: 8,
      rating: 4.9,
      totalReviews: 201,
      verified: true,
      certifications: ['Organic Certified', 'Local Producer'],
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800',
      avatar: 'HB',
      totalProducts: 41,
      responseTime: '< 2 hours',
      memberSince: 'August 2020',
      description: 'Traditional bakery using ancient grains and time-honored baking techniques.',
    },
    {
      id: '5',
      name: 'Sunrise Poultry Farm',
      category: 'Free-Range Poultry & Eggs',
      categoryTypes: ['Poultry', 'Eggs'],
      location: 'Meadow Hills',
      distance: 22,
      rating: 4.5,
      totalReviews: 84,
      verified: true,
      certifications: ['Free-Range', 'Traceable', 'Local Producer'],
      image: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=800',
      avatar: 'SP',
      totalProducts: 12,
      responseTime: '< 4 hours',
      memberSince: 'November 2022',
      description: 'Ethical poultry farm with free-range chickens and fresh organic eggs.',
    },
    {
      id: '6',
      name: 'Wild Harvest Mushrooms',
      category: 'Specialty Mushrooms',
      categoryTypes: ['Vegetables', 'Specialty'],
      location: 'Forest Grove',
      distance: 28,
      rating: 4.8,
      totalReviews: 67,
      verified: true,
      certifications: ['Organic Certified', 'Sustainable'],
      image: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=800',
      avatar: 'WH',
      totalProducts: 15,
      responseTime: '< 3 hours',
      memberSince: 'May 2023',
      description: 'Gourmet mushroom cultivator specializing in rare and exotic varieties.',
    },
    {
      id: '7',
      name: 'Artisan Olive Grove',
      category: 'Olive Oil & Preserves',
      categoryTypes: ['Oils', 'Preserves'],
      location: 'Sunny Valley',
      distance: 45,
      rating: 4.7,
      totalReviews: 112,
      verified: true,
      certifications: ['Organic Certified', 'Traceable'],
      image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800',
      avatar: 'AO',
      totalProducts: 9,
      responseTime: '< 5 hours',
      memberSince: 'February 2021',
      description: 'Premium extra virgin olive oil and handcrafted preserves from our family grove.',
    },
    {
      id: '8',
      name: 'Garden Fresh Herbs',
      category: 'Fresh Herbs & Microgreens',
      categoryTypes: ['Herbs', 'Vegetables'],
      location: 'Green Park',
      distance: 5,
      rating: 4.9,
      totalReviews: 143,
      verified: true,
      certifications: ['Organic Certified', 'Local Producer', 'Traceable'],
      image: 'https://images.unsplash.com/photo-1583163651581-0b9ed2c9c78f?w=800',
      avatar: 'GF',
      totalProducts: 27,
      responseTime: '< 1 hour',
      memberSince: 'July 2022',
      description: 'Year-round fresh herbs and microgreens grown in our controlled environment facility.',
    },
  ];

  const categories = ['Vegetables', 'Dairy', 'Seafood', 'Bakery', 'Poultry', 'Herbs', 'Specialty', 'Oils'];
  const certifications = ['Organic Certified', 'Local Producer', 'Traceable', 'Sustainable', 'Free-Range'];

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const toggleCert = (cert: string) => {
    setSelectedCerts((prev) =>
      prev.includes(cert) ? prev.filter((c) => c !== cert) : [...prev, cert]
    );
  };

  const filteredSuppliers = useMemo(() => {
    let filtered = suppliers;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (supplier) =>
          supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          supplier.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          supplier.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((supplier) =>
        supplier.categoryTypes.some((type) => selectedCategories.includes(type))
      );
    }

    // Certification filter
    if (selectedCerts.length > 0) {
      filtered = filtered.filter((supplier) =>
        selectedCerts.every((cert) => supplier.certifications.includes(cert))
      );
    }

    // Distance filter
    if (selectedDistance !== 'all') {
      const maxDistance = parseInt(selectedDistance);
      filtered = filtered.filter((supplier) => supplier.distance <= maxDistance);
    }

    // Sort
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'distance':
          return a.distance - b.distance;
        case 'reviews':
          return b.totalReviews - a.totalReviews;
        case 'products':
          return b.totalProducts - a.totalProducts;
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, selectedCategories, selectedCerts, selectedDistance, sortBy]);

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedCerts([]);
    setSelectedDistance('all');
    setSearchQuery('');
  };

  const activeFiltersCount =
    selectedCategories.length + selectedCerts.length + (selectedDistance !== 'all' ? 1 : 0);

  return (
    <div className="min-h-screen py-12">
      <div className="mx-auto max-w-[1440px] px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-4xl text-primary">Suppliers Directory</h1>
          <p className="text-muted-foreground">
            Browse and connect with local producers and suppliers
          </p>
        </div>

        {/* Search & Controls */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 sm:max-w-md">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search suppliers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rounded-2xl border-border pl-12 pr-4"
            />
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="rounded-xl"
            >
              <Filter className="mr-2 h-4 w-4" />
              Filters
              {activeFiltersCount > 0 && (
                <Badge className="ml-2 bg-primary">{activeFiltersCount}</Badge>
              )}
            </Button>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px] rounded-xl">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="distance">Nearest First</SelectItem>
                <SelectItem value="reviews">Most Reviewed</SelectItem>
                <SelectItem value="products">Most Products</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Featured Producers */}
        <section className="mb-12">
          <div className="mb-6">
            <h2 className="text-3xl text-primary">Featured Producers</h2>
            <p className="mt-1 text-muted-foreground">
              Top-rated local suppliers recommended for you
            </p>
          </div>
          <div className="relative -mx-2 px-2">
            <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
              {suppliers
                .filter((s) => s.rating >= 4.8)
                .slice(0, 6)
                .map((supplier) => (
                  <Card
                    key={supplier.id}
                    className="group w-80 flex-shrink-0 cursor-pointer overflow-hidden rounded-2xl border-0 shadow-[0_1px_4px_rgba(0,0,0,0.08)] transition-all duration-250 hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] hover:-translate-y-1 snap-start"
                    onClick={() => onViewSupplier(supplier.id)}
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <ImageWithFallback
                        src={supplier.image}
                        alt={supplier.name}
                        className="h-full w-full object-cover transition-transform duration-250 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                        <Avatar className="h-12 w-12 border-2 border-white">
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            {supplier.avatar}
                          </AvatarFallback>
                        </Avatar>
                        {supplier.verified && (
                          <Badge className="bg-primary">
                            <Award className="mr-1 h-3 w-3" />
                            Verified
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="mb-2 flex items-start justify-between">
                        <div>
                          <h3 className="mb-1 line-clamp-1">{supplier.name}</h3>
                          <p className="text-sm text-muted-foreground">{supplier.category}</p>
                        </div>
                      </div>

                      <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">
                        {supplier.description}
                      </p>

                      <div className="mb-3 flex items-center gap-3 text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-primary text-primary" />
                          <span>{supplier.rating}</span>
                          <span className="text-muted-foreground">
                            ({supplier.totalReviews})
                          </span>
                        </div>
                        <div className="h-4 w-px bg-border" />
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>{supplier.distance} km</span>
                        </div>
                      </div>

                      <div className="mb-3 flex flex-wrap gap-1">
                        {supplier.certifications.slice(0, 2).map((cert, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {cert}
                          </Badge>
                        ))}
                        {supplier.certifications.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{supplier.certifications.length - 2}
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center justify-between border-t border-border pt-3 text-sm text-muted-foreground">
                        <div>{supplier.totalProducts} products</div>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" />
                          {supplier.responseTime}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
            </div>
            {/* Gradient fade on edges */}
            <div className="pointer-events-none absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-background to-transparent" />
          </div>
        </section>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          {showFilters && (
            <div className="w-72 flex-shrink-0">
              <div className="sticky top-24">
                <div className="rounded-2xl bg-white shadow-[0_1px_4px_rgba(0,0,0,0.08)]">
                  <div className="flex items-center justify-between border-b border-border p-6 pb-4">
                    <h3>Filters</h3>
                    {activeFiltersCount > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearAllFilters}
                        className="h-auto p-0 text-sm text-primary hover:bg-transparent"
                      >
                        Clear all
                      </Button>
                    )}
                  </div>

                  <ScrollArea className="h-[calc(100vh-280px)]">
                    <div className="p-6 pt-4">
                      {/* Distance Filter */}
                      <div className="mb-6">
                        <Label className="mb-3 block text-sm">Distance</Label>
                        <Select value={selectedDistance} onValueChange={setSelectedDistance}>
                          <SelectTrigger className="rounded-xl">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Any distance</SelectItem>
                            <SelectItem value="10">Within 10 km</SelectItem>
                            <SelectItem value="25">Within 25 km</SelectItem>
                            <SelectItem value="50">Within 50 km</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Category Filter */}
                      <Collapsible open={categoryOpen} onOpenChange={setCategoryOpen}>
                        <CollapsibleTrigger className="mb-3 flex w-full items-center justify-between text-sm">
                          <span>Category</span>
                          <ChevronDown
                            className={`h-4 w-4 transition-transform duration-200 ${
                              categoryOpen ? 'rotate-180' : ''
                            }`}
                          />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="space-y-3">
                          {categories.map((category) => (
                            <div key={category} className="flex items-center space-x-2">
                              <Checkbox
                                id={`category-${category}`}
                                checked={selectedCategories.includes(category)}
                                onCheckedChange={() => toggleCategory(category)}
                              />
                              <Label
                                htmlFor={`category-${category}`}
                                className="cursor-pointer text-sm"
                              >
                                {category}
                              </Label>
                            </div>
                          ))}
                        </CollapsibleContent>
                      </Collapsible>

                      <div className="my-4 border-t border-border" />

                      {/* Certifications Filter */}
                      <Collapsible open={certOpen} onOpenChange={setCertOpen}>
                        <CollapsibleTrigger className="mb-3 flex w-full items-center justify-between text-sm">
                          <span>Certifications</span>
                          <ChevronDown
                            className={`h-4 w-4 transition-transform duration-200 ${
                              certOpen ? 'rotate-180' : ''
                            }`}
                          />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="space-y-3">
                          {certifications.map((cert) => (
                            <div key={cert} className="flex items-center space-x-2">
                              <Checkbox
                                id={`cert-${cert}`}
                                checked={selectedCerts.includes(cert)}
                                onCheckedChange={() => toggleCert(cert)}
                              />
                              <Label htmlFor={`cert-${cert}`} className="cursor-pointer text-sm">
                                {cert}
                              </Label>
                            </div>
                          ))}
                        </CollapsibleContent>
                      </Collapsible>
                    </div>
                  </ScrollArea>
                </div>
              </div>
            </div>
          )}

          {/* Suppliers Grid */}
          <div className="flex-1">
            <div className="mb-4 text-sm text-muted-foreground">
              Showing {filteredSuppliers.length} of {suppliers.length} suppliers
            </div>

            {filteredSuppliers.length === 0 ? (
              <div className="flex min-h-[400px] items-center justify-center rounded-2xl bg-white p-12 shadow-[0_1px_4px_rgba(0,0,0,0.08)]">
                <div className="text-center">
                  <Search className="mx-auto mb-4 h-16 w-16 text-muted-foreground/30" />
                  <h3 className="mb-2 text-primary">No suppliers found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your filters or search query
                  </p>
                  {activeFiltersCount > 0 && (
                    <Button
                      onClick={clearAllFilters}
                      className="mt-4 rounded-xl"
                      variant="outline"
                    >
                      Clear filters
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {filteredSuppliers.map((supplier) => (
                  <Card
                    key={supplier.id}
                    className="group cursor-pointer overflow-hidden rounded-2xl border-0 shadow-[0_1px_4px_rgba(0,0,0,0.08)] transition-all duration-250 hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)]"
                    onClick={() => onViewSupplier(supplier.id)}
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <ImageWithFallback
                        src={supplier.image}
                        alt={supplier.name}
                        className="h-full w-full object-cover transition-transform duration-250 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                        <Avatar className="h-12 w-12 border-2 border-white">
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            {supplier.avatar}
                          </AvatarFallback>
                        </Avatar>
                        {supplier.verified && (
                          <Badge className="bg-primary">
                            <Award className="mr-1 h-3 w-3" />
                            Verified
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="mb-2 flex items-start justify-between">
                        <div>
                          <h3 className="mb-1 line-clamp-1">{supplier.name}</h3>
                          <p className="text-sm text-muted-foreground">{supplier.category}</p>
                        </div>
                      </div>

                      <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">
                        {supplier.description}
                      </p>

                      <div className="mb-3 flex items-center gap-3 text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-primary text-primary" />
                          <span>{supplier.rating}</span>
                          <span className="text-muted-foreground">
                            ({supplier.totalReviews})
                          </span>
                        </div>
                        <div className="h-4 w-px bg-border" />
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>{supplier.distance} km</span>
                        </div>
                      </div>

                      <div className="mb-3 flex flex-wrap gap-1">
                        {supplier.certifications.slice(0, 2).map((cert, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {cert}
                          </Badge>
                        ))}
                        {supplier.certifications.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{supplier.certifications.length - 2}
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center justify-between border-t border-border pt-3 text-sm text-muted-foreground">
                        <div>{supplier.totalProducts} products</div>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" />
                          {supplier.responseTime}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}