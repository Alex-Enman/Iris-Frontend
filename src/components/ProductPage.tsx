import { useState } from 'react';
import { Star, MapPin, BadgeCheck, Leaf, Truck, Award, X, Info, ArrowLeftRight } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';

interface ProductPageProps {
  onAddToCart: () => void;
}

export function ProductPage({ onAddToCart }: ProductPageProps) {
  const [quantity, setQuantity] = useState(1);
  const [imageScale, setImageScale] = useState(1);
  const [showCompare, setShowCompare] = useState(false);
  const [highlightBest, setHighlightBest] = useState(false);

  const product = {
    name: 'Heirloom Tomatoes',
    producer: 'Green Valley Farm',
    price: 4.5,
    unit: 'kg',
    image: 'https://images.unsplash.com/photo-1591171551239-80a5eddd627a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b21hdG9lcyUyMGZyZXNoJTIwbWFya2V0fGVufDF8fHx8MTc2MTMwNzMzOXww&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.8,
    reviews: 127,
    location: '12 km away',
    verified: true,
    delivery: 'Thursday 8 AM',
    badges: [
      { icon: Leaf, label: 'Organic', color: 'text-primary' },
      { icon: MapPin, label: 'Local', color: 'text-accent' },
      { icon: Award, label: 'Traceable', color: 'text-primary' },
    ],
    description:
      'Our heirloom tomatoes are grown using traditional methods passed down through generations. Each variety is carefully selected for its unique flavor profile, vibrant color, and nutritional value. Hand-picked at peak ripeness to ensure maximum taste and quality.',
    producerInfo:
      'Green Valley Farm has been a family-run organic farm for over 40 years. Located in the heart of the countryside, we practice sustainable farming methods and take pride in delivering the freshest produce to local restaurants.',
  };

  const similarProducts = [
    {
      id: 1,
      name: 'Heirloom Tomatoes',
      producer: 'Green Valley Farm',
      price: '€4.50/kg',
      priceValue: 4.5,
      image: 'https://images.unsplash.com/photo-1591171551239-80a5eddd627a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b21hdG9lcyUyMGZyZXNoJTIwbWFya2V0fGVufDF8fHx8MTc2MTMwNzMzOXww&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.8,
      reviews: 127,
      location: '12 km away',
      deliveryTime: '24 hours',
      stockAvailable: 'In Stock',
      badges: ['Organic', 'Local', 'Traceable'],
      verified: true,
      isBestPrice: false,
      isBestRating: true,
      isBestDelivery: false,
    },
    {
      id: 2,
      name: 'Cherry Tomatoes',
      producer: 'Sunrise Organic',
      price: '€3.80/kg',
      priceValue: 3.8,
      image: 'https://images.unsplash.com/photo-1591171551239-80a5eddd627a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b21hdG9lcyUyMGZyZXNoJTIwbWFya2V0fGVufDF8fHx8MTc2MTMwNzMzOXww&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.6,
      reviews: 89,
      location: '18 km away',
      deliveryTime: '12 hours',
      stockAvailable: 'In Stock',
      badges: ['Organic', 'Local'],
      verified: true,
      isBestPrice: false,
      isBestRating: false,
      isBestDelivery: true,
    },
    {
      id: 3,
      name: 'Roma Tomatoes',
      producer: 'Heritage Produce',
      price: '€3.20/kg',
      priceValue: 3.2,
      image: 'https://images.unsplash.com/photo-1591171551239-80a5eddd627a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b21hdG9lcyUyMGZyZXNoJTIwbWFya2V0fGVufDF8fHx8MTc2MTMwNzMzOXww&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.7,
      reviews: 95,
      location: '25 km away',
      deliveryTime: '48 hours',
      stockAvailable: 'Limited Stock',
      badges: ['Organic', 'Traceable'],
      verified: false,
      isBestPrice: true,
      isBestRating: false,
      isBestDelivery: false,
    },
  ];

  const reviews = [
    {
      id: 1,
      author: 'Chef Marco',
      restaurant: 'La Cucina',
      rating: 5,
      comment:
        'Exceptional quality! The flavor is outstanding and our customers love them.',
      date: '2 weeks ago',
    },
    {
      id: 2,
      author: 'Chef Sarah',
      restaurant: 'Green Table',
      rating: 5,
      comment:
        'Best tomatoes we\'ve sourced. Perfect for our summer menu.',
      date: '3 weeks ago',
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-[1440px] px-8 py-12">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left Column - Image */}
          <div className="sticky top-24 h-fit">
            <div
              className="overflow-hidden rounded-3xl bg-white shadow-[0_4px_12px_rgba(0,0,0,0.12)]"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width;
                const y = (e.clientY - rect.top) / rect.height;
                setImageScale(1.2);
              }}
              onMouseLeave={() => setImageScale(1)}
            >
              <div className="aspect-square overflow-hidden">
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-500 ease-out"
                  style={{ transform: `scale(${imageScale})` }}
                />
              </div>
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div>
            <div className="mb-8">
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h1 className="mb-2 text-4xl text-primary">{product.name}</h1>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <span>{product.producer}</span>
                    {product.verified && (
                      <BadgeCheck className="h-5 w-5 text-primary" />
                    )}
                  </div>
                </div>
              </div>

              <div className="mb-6 flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-accent text-accent" />
                  <span className="text-lg">{product.rating}</span>
                  <span className="text-muted-foreground">
                    ({product.reviews} reviews)
                  </span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{product.location}</span>
                </div>
              </div>

              <div className="mb-6 text-4xl text-primary">
                €{product.price.toFixed(2)}
                <span className="text-xl text-muted-foreground">/{product.unit}</span>
              </div>

              {/* Badges */}
              <div className="mb-6 flex flex-wrap gap-3">
                {product.badges.map((badge, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 rounded-full bg-primary/5 px-4 py-2"
                  >
                    <badge.icon className={`h-4 w-4 ${badge.color}`} />
                    <span className="text-sm">{badge.label}</span>
                  </div>
                ))}
              </div>

              {/* Delivery Info */}
              <div className="mb-8 rounded-2xl bg-accent/10 p-4">
                <div className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-accent" />
                  <span className="text-sm">
                    Estimated delivery: <strong>{product.delivery}</strong>
                  </span>
                </div>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="mb-4 flex items-center gap-4">
                <div className="flex items-center rounded-xl border border-border bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-3 transition-colors hover:bg-muted"
                  >
                    −
                  </button>
                  <span className="min-w-[3rem] text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-3 transition-colors hover:bg-muted"
                  >
                    +
                  </button>
                </div>
                <Button
                  onClick={onAddToCart}
                  className="flex-1 h-12 rounded-xl bg-primary text-primary-foreground transition-all duration-250 hover:bg-primary/90 hover:shadow-[0_4px_12px_rgba(45,77,49,0.3)]"
                >
                  Add to Cart — €{(product.price * quantity).toFixed(2)}
                </Button>
              </div>

              {/* Compare Button */}
              <Button
                variant="outline"
                onClick={() => setShowCompare(true)}
                className="mb-8 w-full rounded-xl transition-all duration-250 hover:bg-accent/10 hover:text-accent hover:border-accent"
              >
                <ArrowLeftRight className="mr-2 h-4 w-4" />
                Compare with Similar Products
              </Button>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-4 rounded-xl bg-white p-1 shadow-[0_1px_4px_rgba(0,0,0,0.08)]">
                <TabsTrigger value="description" className="rounded-lg">
                  Description
                </TabsTrigger>
                <TabsTrigger value="producer" className="rounded-lg">
                  Producer
                </TabsTrigger>
                <TabsTrigger value="reviews" className="rounded-lg">
                  Reviews
                </TabsTrigger>
                <TabsTrigger value="similar" className="rounded-lg">
                  Similar
                </TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="mt-6">
                <div className="rounded-2xl bg-white p-6 shadow-[0_1px_4px_rgba(0,0,0,0.08)]">
                  <p className="leading-relaxed text-foreground">
                    {product.description}
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="producer" className="mt-6">
                <div className="rounded-2xl bg-white p-6 shadow-[0_1px_4px_rgba(0,0,0,0.08)]">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary">
                      <span className="text-xl text-primary-foreground">🌿</span>
                    </div>
                    <div>
                      <h3>{product.producer}</h3>
                      <p className="text-sm text-muted-foreground">
                        {product.location}
                      </p>
                    </div>
                  </div>
                  <p className="leading-relaxed text-foreground">
                    {product.producerInfo}
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="reviews" className="mt-6">
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div
                      key={review.id}
                      className="rounded-2xl bg-white p-6 shadow-[0_1px_4px_rgba(0,0,0,0.08)]"
                    >
                      <div className="mb-3 flex items-start justify-between">
                        <div>
                          <div className="mb-1">{review.author}</div>
                          <p className="text-sm text-muted-foreground">
                            {review.restaurant}
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="h-4 w-4 fill-accent text-accent"
                            />
                          ))}
                        </div>
                      </div>
                      <p className="mb-2 leading-relaxed">{review.comment}</p>
                      <p className="text-sm text-muted-foreground">
                        {review.date}
                      </p>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="similar" className="mt-6">
                <div className="grid gap-4 sm:grid-cols-3">
                  {similarProducts.map((item) => (
                    <div
                      key={item.id}
                      className="overflow-hidden rounded-2xl bg-white shadow-[0_1px_4px_rgba(0,0,0,0.08)] transition-all duration-250 hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)] hover:-translate-y-1"
                    >
                      <div className="aspect-square overflow-hidden">
                        <ImageWithFallback
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h4 className="mb-1">{item.name}</h4>
                        <p className="text-primary">{item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Sticky Add to Cart Button (mobile) */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-white/95 p-4 backdrop-blur-sm lg:hidden">
        <Button
          onClick={onAddToCart}
          className="w-full h-12 rounded-xl bg-primary text-primary-foreground"
        >
          Add to Cart — €{(product.price * quantity).toFixed(2)}
        </Button>
      </div>

      {/* Comparison Dialog */}
      <Dialog open={showCompare} onOpenChange={setShowCompare}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl text-primary">
              <ArrowLeftRight className="h-6 w-6" />
              Compare Similar Products
            </DialogTitle>
          </DialogHeader>

          {/* Controls */}
          <div className="mb-6 flex items-center justify-center gap-3 rounded-xl bg-primary/5 p-4">
            <Switch
              id="highlight-mode-dialog"
              checked={highlightBest}
              onCheckedChange={setHighlightBest}
            />
            <Label htmlFor="highlight-mode-dialog" className="cursor-pointer">
              Highlight Best Value
            </Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Mark the best price, rating, and delivery time</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          {/* Comparison Grid */}
          <div className="grid gap-6 lg:grid-cols-3">
            {similarProducts.map((item) => (
              <div
                key={item.id}
                className="overflow-hidden rounded-2xl bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-all duration-250 hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)]"
              >
                {/* Product Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                  {item.verified && (
                    <div className="absolute right-3 top-3 rounded-full bg-white/95 p-1.5 backdrop-blur-sm">
                      <BadgeCheck className="h-4 w-4 text-primary" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  {/* Producer Name */}
                  <div className="mb-4">
                    <h4 className="mb-1">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">{item.producer}</p>
                    <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span>{item.location}</span>
                    </div>
                  </div>

                  {/* Rating */}
                  <div
                    className={`mb-3 rounded-xl p-3 transition-all duration-250 ${
                      highlightBest && item.isBestRating
                        ? 'bg-primary/10 ring-2 ring-primary'
                        : 'bg-muted/30'
                    }`}
                  >
                    <div className="mb-1 text-xs text-muted-foreground">
                      Average Rating
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 fill-accent text-accent" />
                      <span>{item.rating}</span>
                      <span className="text-xs text-muted-foreground">
                        ({item.reviews})
                      </span>
                    </div>
                  </div>

                  {/* Price */}
                  <div
                    className={`mb-3 rounded-xl p-3 transition-all duration-250 ${
                      highlightBest && item.isBestPrice
                        ? 'bg-primary/10 ring-2 ring-primary'
                        : 'bg-muted/30'
                    }`}
                  >
                    <div className="mb-1 text-xs text-muted-foreground">
                      Price per Unit
                    </div>
                    <div className="text-xl text-primary">
                      €{item.priceValue.toFixed(2)}
                      <span className="text-sm text-muted-foreground">/kg</span>
                    </div>
                  </div>

                  {/* Delivery Time */}
                  <div
                    className={`mb-3 rounded-xl p-3 transition-all duration-250 ${
                      highlightBest && item.isBestDelivery
                        ? 'bg-primary/10 ring-2 ring-primary'
                        : 'bg-muted/30'
                    }`}
                  >
                    <div className="mb-1 text-xs text-muted-foreground">
                      Delivery Time
                    </div>
                    <div className="flex items-center gap-2">
                      <Truck className="h-4 w-4 text-accent" />
                      <span className="text-sm">{item.deliveryTime}</span>
                    </div>
                  </div>

                  {/* Stock */}
                  <div className="mb-3 rounded-xl bg-muted/30 p-3">
                    <div className="mb-1 text-xs text-muted-foreground">
                      Stock Status
                    </div>
                    <Badge
                      variant={
                        item.stockAvailable === 'In Stock'
                          ? 'default'
                          : 'secondary'
                      }
                      className="text-xs"
                    >
                      {item.stockAvailable}
                    </Badge>
                  </div>

                  {/* Certifications */}
                  <div className="mb-4 rounded-xl bg-muted/30 p-3">
                    <div className="mb-2 text-xs text-muted-foreground">
                      Certifications
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {item.badges.map((badge, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2">
                    <Button
                      onClick={() => {
                        onAddToCart();
                        setShowCompare(false);
                      }}
                      className="w-full rounded-xl bg-primary text-primary-foreground transition-all duration-250 hover:bg-primary/90"
                    >
                      Add to Cart
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full rounded-xl text-xs transition-all duration-250 hover:bg-accent/10"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 p-6 text-center">
            <p className="text-sm text-muted-foreground">
              Compare pricing, ratings, delivery times, and certifications to make the best choice for your needs.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}