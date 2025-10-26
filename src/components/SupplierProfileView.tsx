import { Star, MapPin, Award, Package, TrendingUp, Clock, Mail, Phone, ShoppingCart, Heart } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Progress } from './ui/progress';
import { useState } from 'react';
import { toast } from 'sonner@2.0.3';

interface SupplierProfileViewProps {
  supplierId: string;
  onBack: () => void;
}

export function SupplierProfileView({ supplierId, onBack }: SupplierProfileViewProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  // Mock supplier data - in real app, fetch based on supplierId
  const supplier = {
    id: supplierId,
    name: 'Green Valley Farm',
    category: 'Organic Vegetables & Herbs',
    location: 'Valley Ridge, 12 km from city center',
    verified: true,
    rating: 4.8,
    totalReviews: 127,
    memberSince: 'March 2022',
    description:
      'Family-run organic farm specializing in heritage vegetables and sustainable farming practices. We use traditional methods passed down through generations, ensuring the highest quality produce while respecting the environment.',
    certifications: ['Organic Certified', 'Local Producer', 'Traceable', 'Carbon Neutral'],
    coverImage: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1200',
    avatar: 'GV',
    stats: {
      totalProducts: 24,
      totalOrders: 1247,
      responseTime: '< 2 hours',
      deliveryRate: '98%',
    },
    products: [
      {
        id: 1,
        name: 'Heirloom Tomatoes',
        price: 4.5,
        unit: 'kg',
        image: 'https://images.unsplash.com/photo-1591171551239-80a5eddd627a?w=400',
        inStock: true,
        description: 'Organic heritage variety tomatoes',
      },
      {
        id: 2,
        name: 'Organic Carrots',
        price: 3.2,
        unit: 'kg',
        image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400',
        inStock: true,
        description: 'Fresh organic carrots',
      },
      {
        id: 3,
        name: 'Seasonal Greens Mix',
        price: 3.8,
        unit: 'kg',
        image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400',
        inStock: true,
        description: 'Variety of seasonal greens',
      },
      {
        id: 4,
        name: 'Heritage Beets',
        price: 4.2,
        unit: 'kg',
        image: 'https://images.unsplash.com/photo-1590165482129-1b8b27698780?w=400',
        inStock: true,
        description: 'Multi-colored heritage beets',
      },
      {
        id: 5,
        name: 'Fresh Herbs Bundle',
        price: 5.5,
        unit: 'bundle',
        image: 'https://images.unsplash.com/photo-1583163651581-0b9ed2c9c78f?w=400',
        inStock: true,
        description: 'Basil, thyme, rosemary mix',
      },
      {
        id: 6,
        name: 'Baby Potatoes',
        price: 2.9,
        unit: 'kg',
        image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400',
        inStock: false,
        description: 'Small organic potatoes',
      },
    ],
    reviews: [
      {
        id: 1,
        restaurant: 'La Cucina',
        rating: 5,
        comment: 'Exceptional quality and freshness. The heirloom tomatoes are amazing!',
        date: '2024-10-20',
        verified: true,
      },
      {
        id: 2,
        restaurant: 'Green Table Bistro',
        rating: 5,
        comment: 'Consistent quality and always on time. Best organic supplier in the region.',
        date: '2024-10-15',
        verified: true,
      },
      {
        id: 3,
        restaurant: 'Farm to Fork',
        rating: 4,
        comment: 'Great products, though sometimes limited variety in winter months.',
        date: '2024-10-10',
        verified: true,
      },
    ],
    contact: {
      email: 'orders@greenvalley.com',
      phone: '+1 (555) 123-4567',
      website: 'www.greenvalleyfarm.com',
    },
  };

  const handleAddToCart = (productId: number, productName: string) => {
    toast.success(`${productName} added to cart`);
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast.success(isFavorite ? 'Removed from favorites' : 'Added to favorites');
  };

  const handleContact = () => {
    toast.success('Opening message to ' + supplier.name);
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="mx-auto max-w-[1440px] px-8">
        {/* Back Button */}
        <Button
          variant="outline"
          onClick={onBack}
          className="mb-6 rounded-xl"
        >
          ← Back
        </Button>

        {/* Cover Image & Header */}
        <Card className="mb-8 overflow-hidden rounded-3xl border-0 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
          <div className="relative h-64 overflow-hidden">
            <ImageWithFallback
              src={supplier.coverImage}
              alt={supplier.name}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
              <div className="flex items-end gap-4">
                <Avatar className="h-20 w-20 border-4 border-white">
                  <AvatarFallback className="bg-primary text-2xl text-primary-foreground">
                    {supplier.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="text-white">
                  <div className="mb-1 flex items-center gap-2">
                    <h1 className="text-3xl">{supplier.name}</h1>
                    {supplier.verified && (
                      <Badge className="bg-primary">
                        <Award className="mr-1 h-3 w-3" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4" />
                    {supplier.location}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-xl border-white bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"
                  onClick={handleToggleFavorite}
                >
                  <Heart
                    className={`h-4 w-4 ${isFavorite ? 'fill-white' : ''}`}
                  />
                </Button>
                <Button
                  size="sm"
                  className="rounded-xl bg-primary hover:bg-primary/90"
                  onClick={handleContact}
                >
                  Contact Supplier
                </Button>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="mb-4 flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 fill-primary text-primary" />
                <span className="text-lg">{supplier.rating}</span>
                <span className="text-sm text-muted-foreground">
                  ({supplier.totalReviews} reviews)
                </span>
              </div>
              <div className="h-6 w-px bg-border" />
              <div className="text-sm text-muted-foreground">
                Member since {supplier.memberSince}
              </div>
            </div>

            <p className="mb-4 leading-relaxed text-foreground">
              {supplier.description}
            </p>

            <div className="mb-4">
              <p className="mb-2 text-sm text-muted-foreground">Certifications</p>
              <div className="flex flex-wrap gap-2">
                {supplier.certifications.map((cert, index) => (
                  <Badge key={index} variant="outline">
                    {cert}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-4 gap-4 rounded-2xl bg-muted/30 p-4">
              <div>
                <div className="mb-1 flex items-center gap-2 text-sm text-muted-foreground">
                  <Package className="h-4 w-4" />
                  Products
                </div>
                <div>{supplier.stats.totalProducts}</div>
              </div>
              <div>
                <div className="mb-1 flex items-center gap-2 text-sm text-muted-foreground">
                  <ShoppingCart className="h-4 w-4" />
                  Total Orders
                </div>
                <div>{supplier.stats.totalOrders}</div>
              </div>
              <div>
                <div className="mb-1 flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  Response Time
                </div>
                <div>{supplier.stats.responseTime}</div>
              </div>
              <div>
                <div className="mb-1 flex items-center gap-2 text-sm text-muted-foreground">
                  <TrendingUp className="h-4 w-4" />
                  Delivery Rate
                </div>
                <div>{supplier.stats.deliveryRate}</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Tabs Section */}
        <Tabs defaultValue="products" className="w-full">
          <TabsList className="mb-6 inline-flex h-12 rounded-2xl bg-white p-1 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
            <TabsTrigger value="products" className="rounded-xl">
              Products ({supplier.products.length})
            </TabsTrigger>
            <TabsTrigger value="reviews" className="rounded-xl">
              Reviews ({supplier.reviews.length})
            </TabsTrigger>
            <TabsTrigger value="about" className="rounded-xl">
              About
            </TabsTrigger>
          </TabsList>

          {/* Products Tab */}
          <TabsContent value="products" className="mt-0">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {supplier.products.map((product) => (
                <Card
                  key={product.id}
                  className="overflow-hidden rounded-2xl border-0 shadow-[0_1px_4px_rgba(0,0,0,0.08)] transition-all duration-250 hover:shadow-[0_2px_8px_rgba(0,0,0,0.12)]"
                >
                  <div className="relative aspect-square overflow-hidden">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform duration-250 hover:scale-105"
                    />
                    {!product.inStock && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white">
                        Out of Stock
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="mb-1">{product.name}</h3>
                    <p className="mb-3 text-sm text-muted-foreground">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="text-primary">
                        €{product.price.toFixed(2)}
                        <span className="text-sm text-muted-foreground">
                          /{product.unit}
                        </span>
                      </div>
                      <Button
                        size="sm"
                        className="rounded-xl"
                        disabled={!product.inStock}
                        onClick={() => handleAddToCart(product.id, product.name)}
                      >
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews" className="mt-0">
            <Card className="rounded-2xl border-0 p-6 shadow-[0_1px_4px_rgba(0,0,0,0.08)]">
              <div className="mb-6">
                <h3 className="mb-4">Customer Reviews</h3>
                <div className="flex items-center gap-6 rounded-xl bg-muted/30 p-4">
                  <div className="text-center">
                    <div className="mb-1 text-4xl text-primary">
                      {supplier.rating}
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${
                            star <= Math.round(supplier.rating)
                              ? 'fill-primary text-primary'
                              : 'text-muted-foreground'
                          }`}
                        />
                      ))}
                    </div>
                    <div className="mt-1 text-sm text-muted-foreground">
                      {supplier.totalReviews} reviews
                    </div>
                  </div>
                  <div className="flex-1 space-y-2">
                    {[5, 4, 3, 2, 1].map((stars) => {
                      const percentage =
                        stars === 5
                          ? 85
                          : stars === 4
                          ? 12
                          : stars === 3
                          ? 3
                          : 0;
                      return (
                        <div key={stars} className="flex items-center gap-3">
                          <div className="flex w-12 items-center gap-1 text-sm">
                            <Star className="h-3 w-3 fill-primary text-primary" />
                            {stars}
                          </div>
                          <Progress value={percentage} className="h-2 flex-1" />
                          <div className="w-12 text-right text-sm text-muted-foreground">
                            {percentage}%
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {supplier.reviews.map((review) => (
                  <div
                    key={review.id}
                    className="rounded-xl border border-border p-4"
                  >
                    <div className="mb-2 flex items-start justify-between">
                      <div>
                        <div className="mb-1 flex items-center gap-2">
                          <span>{review.restaurant}</span>
                          {review.verified && (
                            <Badge variant="outline" className="text-xs">
                              Verified Purchase
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-3 w-3 ${
                                star <= review.rating
                                  ? 'fill-primary text-primary'
                                  : 'text-muted-foreground'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {review.date}
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed">{review.comment}</p>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* About Tab */}
          <TabsContent value="about" className="mt-0">
            <Card className="rounded-2xl border-0 p-6 shadow-[0_1px_4px_rgba(0,0,0,0.08)]">
              <h3 className="mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 rounded-xl bg-muted/30 p-4">
                  <Mail className="h-5 w-5 text-primary" />
                  <div>
                    <div className="text-sm text-muted-foreground">Email</div>
                    <div>{supplier.contact.email}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-xl bg-muted/30 p-4">
                  <Phone className="h-5 w-5 text-primary" />
                  <div>
                    <div className="text-sm text-muted-foreground">Phone</div>
                    <div>{supplier.contact.phone}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-xl bg-muted/30 p-4">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <div className="text-sm text-muted-foreground">Location</div>
                    <div>{supplier.location}</div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="mb-4">Categories</h3>
                <div className="text-muted-foreground">{supplier.category}</div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
