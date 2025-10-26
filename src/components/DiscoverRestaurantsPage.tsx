import { useState } from 'react';
import { Search, MapPin, Star, TrendingUp, Eye, MessageCircle, Heart, Utensils, Users, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { toast } from 'sonner@2.0.3';

interface DiscoverRestaurantsPageProps {
  onViewRestaurant: (id: string) => void;
  onContactRestaurant: (name: string) => void;
}

export function DiscoverRestaurantsPage({ onViewRestaurant, onContactRestaurant }: DiscoverRestaurantsPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [cuisineFilter, setCuisineFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [sortBy, setSortBy] = useState('rating');

  // Mock data - all restaurants on platform
  const allRestaurants = [
    {
      id: '1',
      name: 'La Bella Cucina',
      type: 'Italian Fine Dining',
      cuisine: 'Italian',
      location: 'Downtown',
      distance: '2.5 km away',
      rating: 4.7,
      reviews: 342,
      avatar: '🍝',
      isCustomer: true,
      totalSpent: '€12,500',
      lastOrder: '2 days ago',
      orderFrequency: 'Weekly',
      avgOrderValue: '€265',
      status: 'active',
      memberSince: 'Jan 2024',
      seatingCapacity: 85,
    },
    {
      id: '2',
      name: 'The Garden Bistro',
      type: 'Farm-to-Table',
      cuisine: 'Contemporary',
      location: 'Midtown',
      distance: '4.2 km away',
      rating: 4.9,
      reviews: 567,
      avatar: '🌿',
      isCustomer: false,
      status: 'new',
      memberSince: 'Sep 2024',
      seatingCapacity: 60,
      lookingForSuppliers: true,
    },
    {
      id: '3',
      name: 'Sakura Sushi House',
      type: 'Japanese Restaurant',
      cuisine: 'Japanese',
      location: 'East Side',
      distance: '3.8 km away',
      rating: 4.8,
      reviews: 421,
      avatar: '🍱',
      isCustomer: true,
      totalSpent: '€8,750',
      lastOrder: '1 week ago',
      orderFrequency: 'Bi-weekly',
      avgOrderValue: '€175',
      status: 'active',
      memberSince: 'Mar 2024',
      seatingCapacity: 50,
    },
    {
      id: '4',
      name: 'Harvest Moon',
      type: 'Organic Cafe',
      cuisine: 'Vegetarian',
      location: 'West End',
      distance: '5.1 km away',
      rating: 4.6,
      reviews: 289,
      avatar: '🥗',
      isCustomer: true,
      totalSpent: '€5,200',
      lastOrder: '3 days ago',
      orderFrequency: 'Weekly',
      avgOrderValue: '€130',
      status: 'active',
      memberSince: 'Feb 2024',
      seatingCapacity: 40,
    },
    {
      id: '5',
      name: 'Le Petit Gourmet',
      type: 'French Brasserie',
      cuisine: 'French',
      location: 'Downtown',
      distance: '1.9 km away',
      rating: 4.7,
      reviews: 398,
      avatar: '🥐',
      isCustomer: false,
      status: 'potential',
      memberSince: 'Aug 2024',
      seatingCapacity: 70,
      lookingForSuppliers: true,
    },
    {
      id: '6',
      name: 'The Spice Route',
      type: 'Indian Cuisine',
      cuisine: 'Indian',
      location: 'Midtown',
      distance: '3.3 km away',
      rating: 4.5,
      reviews: 312,
      avatar: '🍛',
      isCustomer: false,
      status: 'potential',
      memberSince: 'Jul 2024',
      seatingCapacity: 55,
    },
    {
      id: '7',
      name: 'Ocean Blue',
      type: 'Seafood Restaurant',
      cuisine: 'Seafood',
      location: 'Waterfront',
      distance: '6.7 km away',
      rating: 4.9,
      reviews: 643,
      avatar: '🦞',
      isCustomer: true,
      totalSpent: '€18,900',
      lastOrder: '1 day ago',
      orderFrequency: 'Daily',
      avgOrderValue: '€420',
      status: 'active',
      memberSince: 'Dec 2023',
      seatingCapacity: 100,
    },
    {
      id: '8',
      name: 'The Green Leaf',
      type: 'Vegan Kitchen',
      cuisine: 'Vegan',
      location: 'East Side',
      distance: '4.5 km away',
      rating: 4.8,
      reviews: 456,
      avatar: '🌱',
      isCustomer: false,
      status: 'new',
      memberSince: 'Oct 2024',
      seatingCapacity: 45,
      lookingForSuppliers: true,
    },
  ];

  const filteredRestaurants = allRestaurants
    .filter((restaurant) => {
      const matchesSearch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.type.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCuisine = cuisineFilter === 'all' || restaurant.cuisine === cuisineFilter;
      const matchesLocation = locationFilter === 'all' || restaurant.location === locationFilter;
      return matchesSearch && matchesCuisine && matchesLocation;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'newest':
          return new Date(b.memberSince).getTime() - new Date(a.memberSince).getTime();
        default:
          return 0;
      }
    });

  const handleAddToFavorites = (restaurantName: string) => {
    toast.success('Added to favorites', {
      description: `${restaurantName} has been added to your favorites`,
    });
  };

  const getStatusBadge = (restaurant: any) => {
    if (restaurant.isCustomer) {
      return <Badge variant="default">Customer</Badge>;
    }
    if (restaurant.lookingForSuppliers) {
      return <Badge className="bg-accent text-accent-foreground">Seeking Suppliers</Badge>;
    }
    if (restaurant.status === 'new') {
      return <Badge variant="secondary">New</Badge>;
    }
    return <Badge variant="outline">Potential</Badge>;
  };

  return (
    <div>
      {/* Search and Filters */}
      <div className="mb-6 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search restaurants by name or type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-12 rounded-2xl pl-12"
            />
          </div>
          <Select value={cuisineFilter} onValueChange={setCuisineFilter}>
            <SelectTrigger className="h-12 w-[180px] rounded-2xl">
              <SelectValue placeholder="All Cuisines" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="all">All Cuisines</SelectItem>
              <SelectItem value="Italian">Italian</SelectItem>
              <SelectItem value="Japanese">Japanese</SelectItem>
              <SelectItem value="French">French</SelectItem>
              <SelectItem value="Contemporary">Contemporary</SelectItem>
              <SelectItem value="Vegetarian">Vegetarian</SelectItem>
              <SelectItem value="Vegan">Vegan</SelectItem>
              <SelectItem value="Indian">Indian</SelectItem>
              <SelectItem value="Seafood">Seafood</SelectItem>
            </SelectContent>
          </Select>
          <Select value={locationFilter} onValueChange={setLocationFilter}>
            <SelectTrigger className="h-12 w-[180px] rounded-2xl">
              <SelectValue placeholder="All Locations" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="Downtown">Downtown</SelectItem>
              <SelectItem value="Midtown">Midtown</SelectItem>
              <SelectItem value="East Side">East Side</SelectItem>
              <SelectItem value="West End">West End</SelectItem>
              <SelectItem value="Waterfront">Waterfront</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="h-12 w-[180px] rounded-2xl">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="name">Name (A-Z)</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {filteredRestaurants.length} restaurant{filteredRestaurants.length !== 1 ? 's' : ''} found
          </p>
          <div className="flex gap-2">
            <Badge variant="outline" className="px-3 py-1">
              {filteredRestaurants.filter(r => r.isCustomer).length} Customers
            </Badge>
            <Badge variant="outline" className="px-3 py-1">
              {filteredRestaurants.filter(r => r.lookingForSuppliers).length} Seeking Suppliers
            </Badge>
          </div>
        </div>
      </div>

      {/* Restaurant Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {filteredRestaurants.map((restaurant) => (
          <div
            key={restaurant.id}
            className="rounded-2xl border-2 border-primary/10 bg-gradient-to-br from-primary/5 to-transparent p-5 transition-all duration-250 hover:border-primary/30"
          >
            <div className="mb-4 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-2xl text-primary-foreground">
                  {restaurant.avatar}
                </div>
                <div>
                  <h4 className="mb-1">{restaurant.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {restaurant.type}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {getStatusBadge(restaurant)}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => handleAddToFavorites(restaurant.name)}
                >
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Key Info Grid - Relevant for first-time view */}
            <div className="mb-4 grid grid-cols-3 gap-3 text-sm">
              <div>
                <p className="mb-1 text-xs text-muted-foreground">
                  Rating
                </p>
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-primary text-primary" />
                  <p className="font-medium">{restaurant.rating}</p>
                </div>
              </div>
              <div>
                <p className="mb-1 text-xs text-muted-foreground">
                  Reviews
                </p>
                <p className="font-medium">{restaurant.reviews}</p>
              </div>
              <div>
                <p className="mb-1 text-xs text-muted-foreground">
                  Capacity
                </p>
                <p className="font-medium">{restaurant.seatingCapacity}</p>
              </div>
            </div>

            {/* Location & Distance */}
            <div className="mb-4 flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {restaurant.location}
              </div>
              <span className="text-muted-foreground">{restaurant.distance}</span>
            </div>

            {/* Customer Stats (if existing customer) */}
            {restaurant.isCustomer && (
              <div className="mb-4 rounded-xl bg-primary/10 p-3">
                <div className="grid grid-cols-3 gap-3 text-sm">
                  <div>
                    <p className="mb-1 text-xs text-muted-foreground">Total Spent</p>
                    <p className="font-medium text-primary">{restaurant.totalSpent}</p>
                  </div>
                  <div>
                    <p className="mb-1 text-xs text-muted-foreground">Avg Order</p>
                    <p className="font-medium">{restaurant.avgOrderValue}</p>
                  </div>
                  <div>
                    <p className="mb-1 text-xs text-muted-foreground">Frequency</p>
                    <p className="font-medium">{restaurant.orderFrequency}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Looking for Suppliers Alert */}
            {restaurant.lookingForSuppliers && (
              <div className="mb-4 flex items-center gap-2 rounded-xl bg-accent/10 px-3 py-2 text-sm">
                <Sparkles className="h-4 w-4 text-accent" />
                <p className="text-accent-foreground">
                  Actively seeking new suppliers
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => onContactRestaurant(restaurant.name)}
                className="flex-1 rounded-xl"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Message
              </Button>
              <Button
                size="sm"
                onClick={() => onViewRestaurant(restaurant.id)}
                className="flex-1 rounded-xl bg-primary hover:bg-primary/90"
              >
                <Eye className="mr-2 h-4 w-4" />
                View Profile
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredRestaurants.length === 0 && (
        <Card className="rounded-3xl border-0 p-12 text-center shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
          <Utensils className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
          <h3 className="mb-2">No restaurants found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filters
          </p>
        </Card>
      )}
    </div>
  );
}
