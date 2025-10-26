import { useState } from 'react';
import { Heart, Star, MapPin, BadgeCheck, Trash2, Package, ShoppingBag, Store, Receipt } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface FavoritesPageProps {
  onNavigateToProduct: () => void;
  onViewSupplier?: (supplierId: string) => void;
}

export function FavoritesPage({ onNavigateToProduct, onViewSupplier }: FavoritesPageProps) {
  const [favoriteSuppliers, setFavoriteSuppliers] = useState([
    {
      id: 1,
      name: 'Green Valley Farm',
      image: 'https://images.unsplash.com/photo-1573481078935-b9605167e06b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHZlZ2V0YWJsZXMlMjBmYXJtZXJ8ZW58MXx8fHwxNzYxMzA3MzM4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      location: '12 km away',
      rating: 4.8,
      reviews: 127,
      verified: true,
      category: 'Organic Vegetables',
      totalOrders: 24,
      lastOrder: '2 weeks ago',
      specialties: ['Heirloom Tomatoes', 'Seasonal Greens', 'Root Vegetables'],
      description: 'Family-run organic farm specializing in heritage vegetables and sustainable farming practices.',
    },
    {
      id: 2,
      name: 'Mountain Dairy Co.',
      image: 'https://images.unsplash.com/photo-1722718461923-c69728f7640b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc2FuJTIwY2hlZXNlJTIwZGFpcnl8ZW58MXx8fHwxNzYxMzA3MzM4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      location: '8 km away',
      rating: 4.9,
      reviews: 203,
      verified: true,
      category: 'Artisan Dairy',
      totalOrders: 18,
      lastOrder: '1 week ago',
      specialties: ['Aged Cheese', 'Fresh Milk', 'Yogurt'],
      description: 'Award-winning dairy producer using traditional methods with grass-fed cattle.',
    },
    {
      id: 3,
      name: 'Heritage Bakery',
      image: 'https://images.unsplash.com/photo-1744217083335-8b57ec3826ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGJyZWFkJTIwYXJ0aXNhbnxlbnwxfHx8fDE3NjEyMzQ5MDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      location: '5 km away',
      rating: 4.9,
      reviews: 156,
      verified: true,
      category: 'Artisan Bakery',
      totalOrders: 31,
      lastOrder: '3 days ago',
      specialties: ['Sourdough Bread', 'Pastries', 'Seasonal Tarts'],
      description: 'Traditional bakery using locally-sourced ingredients and time-honored recipes.',
    },
  ]);

  const [favoriteProducts, setFavoriteProducts] = useState([
    {
      id: 1,
      name: 'Heirloom Tomatoes',
      supplier: 'Green Valley Farm',
      supplierId: 1,
      image: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=400',
      price: 4.50,
      unit: 'kg',
      inStock: true,
      rating: 4.9,
      organic: true,
      lastOrdered: '1 week ago',
    },
    {
      id: 2,
      name: 'Fresh Mozzarella',
      supplier: 'Mountain Dairy Co.',
      supplierId: 2,
      image: 'https://images.unsplash.com/photo-1452195100486-9cc805987862?w=400',
      price: 12.00,
      unit: 'kg',
      inStock: true,
      rating: 4.8,
      organic: false,
      lastOrdered: '2 days ago',
    },
    {
      id: 3,
      name: 'Sourdough Loaf',
      supplier: 'Heritage Bakery',
      supplierId: 3,
      image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=400',
      price: 6.50,
      unit: 'loaf',
      inStock: true,
      rating: 5.0,
      organic: true,
      lastOrdered: '3 days ago',
    },
    {
      id: 4,
      name: 'Organic Carrots',
      supplier: 'Green Valley Farm',
      supplierId: 1,
      image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400',
      price: 3.20,
      unit: 'kg',
      inStock: true,
      rating: 4.7,
      organic: true,
      lastOrdered: '5 days ago',
    },
  ]);

  const [favoriteOrders, setFavoriteOrders] = useState([
    {
      id: 'ORD-998',
      supplier: 'Green Valley Farm',
      supplierId: 1,
      date: 'Oct 18, 2025',
      total: 156.80,
      itemCount: 8,
      frequency: 'Weekly',
      lastOrdered: '1 week ago',
      items: [
        { name: 'Heirloom Tomatoes', quantity: '3 kg', price: 13.50 },
        { name: 'Organic Carrots', quantity: '10 kg', price: 32.00 },
        { name: 'Mixed Greens', quantity: '5 kg', price: 27.50 },
      ],
    },
    {
      id: 'ORD-985',
      supplier: 'Mountain Dairy Co.',
      supplierId: 2,
      date: 'Oct 15, 2025',
      total: 89.20,
      itemCount: 5,
      frequency: 'Bi-weekly',
      lastOrdered: '2 weeks ago',
      items: [
        { name: 'Fresh Mozzarella', quantity: '2 kg', price: 24.00 },
        { name: 'Ricotta', quantity: '3 kg', price: 45.00 },
        { name: 'Yogurt', quantity: '4 L', price: 20.20 },
      ],
    },
  ]);

  const removeFavoriteSupplier = (id: number) => {
    setFavoriteSuppliers(favoriteSuppliers.filter((fav) => fav.id !== id));
  };

  const removeFavoriteProduct = (id: number) => {
    setFavoriteProducts(favoriteProducts.filter((fav) => fav.id !== id));
  };

  const removeFavoriteOrder = (id: string) => {
    setFavoriteOrders(favoriteOrders.filter((fav) => fav.id !== id));
  };

  return (
    <div className="min-h-screen py-12">
      <div className="mx-auto max-w-[1440px] px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-3 flex items-center gap-3">
            <Heart className="h-8 w-8 fill-accent text-accent" />
            <h1 className="text-4xl text-primary">Favorites</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Quick access to your favorite suppliers, products, and recurring orders
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="suppliers" className="w-full">
          <TabsList className="mb-8 rounded-xl bg-white p-1 shadow-[0_1px_4px_rgba(0,0,0,0.08)]">
            <TabsTrigger value="suppliers" className="rounded-lg">
              <Store className="mr-2 h-4 w-4" />
              Suppliers ({favoriteSuppliers.length})
            </TabsTrigger>
            <TabsTrigger value="products" className="rounded-lg">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Products ({favoriteProducts.length})
            </TabsTrigger>
            <TabsTrigger value="orders" className="rounded-lg">
              <Receipt className="mr-2 h-4 w-4" />
              Orders ({favoriteOrders.length})
            </TabsTrigger>
          </TabsList>

          {/* Suppliers Tab */}
          <TabsContent value="suppliers" className="mt-0">
            {favoriteSuppliers.length === 0 ? (
              <div className="flex min-h-[400px] flex-col items-center justify-center rounded-3xl bg-gradient-to-br from-primary/5 to-accent/5 p-12 text-center">
                <Store className="mb-4 h-16 w-16 text-muted-foreground/30" />
                <h3 className="mb-2 text-xl text-primary">No favorite suppliers yet</h3>
                <p className="max-w-md text-muted-foreground">
                  Start exploring the marketplace and save your favorite suppliers for quick access
                </p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {favoriteSuppliers.map((supplier) => (
                  <div
                    key={supplier.id}
                    className="group overflow-hidden rounded-3xl bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-all duration-250 hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:-translate-y-1"
                  >
                    {/* Image */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <ImageWithFallback
                        src={supplier.image}
                        alt={supplier.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {supplier.verified && (
                        <div className="absolute right-4 top-4 rounded-full bg-white/95 p-2 backdrop-blur-sm shadow-lg">
                          <BadgeCheck className="h-5 w-5 text-primary" />
                        </div>
                      )}
                      <button
                        onClick={() => removeFavoriteSupplier(supplier.id)}
                        className="absolute left-4 top-4 rounded-full bg-white/95 p-2 backdrop-blur-sm shadow-lg transition-all duration-250 hover:bg-accent/10 hover:scale-110"
                        aria-label="Remove from favorites"
                      >
                        <Heart className="h-5 w-5 fill-accent text-accent" />
                      </button>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      {/* Header */}
                      <div className="mb-4">
                        <h3 className="mb-1 text-xl">{supplier.name}</h3>
                        <p className="mb-2 text-sm text-muted-foreground">
                          {supplier.category}
                        </p>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-accent text-accent" />
                            <span>{supplier.rating}</span>
                            <span className="text-muted-foreground">
                              ({supplier.reviews})
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            <span>{supplier.location}</span>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-foreground">
                        {supplier.description}
                      </p>

                      {/* Specialties */}
                      <div className="mb-4">
                        <div className="mb-2 text-xs text-muted-foreground">
                          Specialties
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {supplier.specialties.slice(0, 3).map((specialty, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="text-xs"
                            >
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Order Stats */}
                      <div className="mb-4 rounded-xl bg-primary/5 p-3">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-1.5 text-muted-foreground">
                            <Package className="h-4 w-4" />
                            <span>{supplier.totalOrders} orders</span>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            Last: {supplier.lastOrder}
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="space-y-2">
                        <Button
                          onClick={() => onViewSupplier?.(supplier.id.toString())}
                          className="w-full rounded-xl bg-primary text-primary-foreground transition-all duration-250 hover:bg-primary/90 hover:shadow-[0_4px_12px_rgba(45,77,49,0.3)]"
                        >
                          <Store className="mr-2 h-4 w-4" />
                          Visit Store
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => removeFavoriteSupplier(supplier.id)}
                          className="w-full rounded-xl transition-all duration-250 hover:bg-destructive/5 hover:text-destructive hover:border-destructive/20"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products" className="mt-0">
            {favoriteProducts.length === 0 ? (
              <div className="flex min-h-[400px] flex-col items-center justify-center rounded-3xl bg-gradient-to-br from-primary/5 to-accent/5 p-12 text-center">
                <ShoppingBag className="mb-4 h-16 w-16 text-muted-foreground/30" />
                <h3 className="mb-2 text-xl text-primary">No favorite products yet</h3>
                <p className="max-w-md text-muted-foreground">
                  Browse products and save your favorites for quick reordering
                </p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {favoriteProducts.map((product) => (
                  <div
                    key={product.id}
                    className="group overflow-hidden rounded-2xl bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-all duration-250 hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:-translate-y-1"
                  >
                    {/* Image */}
                    <div className="relative aspect-square overflow-hidden">
                      <ImageWithFallback
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <button
                        onClick={() => removeFavoriteProduct(product.id)}
                        className="absolute right-3 top-3 rounded-full bg-white/95 p-2 backdrop-blur-sm shadow-lg transition-all duration-250 hover:bg-accent/10 hover:scale-110"
                        aria-label="Remove from favorites"
                      >
                        <Heart className="h-4 w-4 fill-accent text-accent" />
                      </button>
                      {product.organic && (
                        <div className="absolute left-3 top-3">
                          <Badge className="bg-primary text-primary-foreground">
                            Organic
                          </Badge>
                        </div>
                      )}
                      {!product.inStock && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                          <Badge variant="destructive">Out of Stock</Badge>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <h4 className="mb-1 line-clamp-1">{product.name}</h4>
                      <p className="mb-2 text-sm text-muted-foreground">
                        {product.supplier}
                      </p>

                      <div className="mb-3 flex items-center gap-2">
                        <div className="flex items-center gap-1 text-sm">
                          <Star className="h-3 w-3 fill-accent text-accent" />
                          <span>{product.rating}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          Last ordered {product.lastOrdered}
                        </span>
                      </div>

                      <div className="mb-3 flex items-baseline gap-1">
                        <span className="text-xl text-primary">
                          €{product.price.toFixed(2)}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          / {product.unit}
                        </span>
                      </div>

                      <div className="space-y-2">
                        <Button
                          onClick={onNavigateToProduct}
                          disabled={!product.inStock}
                          className="w-full rounded-xl"
                        >
                          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onViewSupplier?.(product.supplierId.toString())}
                          className="w-full rounded-xl"
                        >
                          View Supplier
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="mt-0">
            {favoriteOrders.length === 0 ? (
              <div className="flex min-h-[400px] flex-col items-center justify-center rounded-3xl bg-gradient-to-br from-primary/5 to-accent/5 p-12 text-center">
                <Receipt className="mb-4 h-16 w-16 text-muted-foreground/30" />
                <h3 className="mb-2 text-xl text-primary">No favorite orders yet</h3>
                <p className="max-w-md text-muted-foreground">
                  Save frequently repeated orders for quick one-click reordering
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {favoriteOrders.map((order) => (
                  <div
                    key={order.id}
                    className="overflow-hidden rounded-2xl bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-all duration-250 hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]"
                  >
                    <div className="p-6">
                      <div className="mb-4 flex items-start justify-between">
                        <div className="flex-1">
                          <div className="mb-2 flex items-center gap-3">
                            <h3 className="text-lg">Order #{order.id}</h3>
                            <Badge className="bg-accent/10 text-accent">
                              <Heart className="mr-1 h-3 w-3 fill-accent" />
                              Favorite
                            </Badge>
                            <Badge variant="outline">{order.frequency}</Badge>
                          </div>
                          <p className="mb-1 text-muted-foreground">{order.supplier}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>{order.itemCount} items</span>
                            <span>Last ordered: {order.lastOrdered}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFavoriteOrder(order.id)}
                          className="rounded-full p-2 transition-all duration-250 hover:bg-destructive/5"
                          aria-label="Remove from favorites"
                        >
                          <Heart className="h-5 w-5 fill-accent text-accent" />
                        </button>
                      </div>

                      {/* Order Items */}
                      <div className="mb-4 space-y-2 rounded-xl bg-muted/20 p-4">
                        <div className="mb-2 text-sm text-muted-foreground">
                          Order includes:
                        </div>
                        {order.items.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between text-sm"
                          >
                            <span>
                              {item.name} × {item.quantity}
                            </span>
                            <span className="text-primary">€{item.price.toFixed(2)}</span>
                          </div>
                        ))}
                        <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
                          <span className="text-muted-foreground">Total</span>
                          <span className="text-lg text-primary">
                            €{order.total.toFixed(2)}
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Button
                          className="flex-1 rounded-xl bg-primary text-primary-foreground"
                        >
                          <Package className="mr-2 h-4 w-4" />
                          Reorder Now
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => onViewSupplier?.(order.supplierId.toString())}
                          className="rounded-xl"
                        >
                          <Store className="mr-2 h-4 w-4" />
                          View Supplier
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Info Section */}
        {(favoriteSuppliers.length > 0 || favoriteProducts.length > 0 || favoriteOrders.length > 0) && (
          <div className="mt-12 rounded-3xl bg-gradient-to-br from-primary/5 to-accent/5 p-8 text-center">
            <h3 className="mb-3 text-xl text-primary">
              Build lasting partnerships
            </h3>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Favoriting suppliers, products, and orders helps you maintain consistent quality and streamline your ordering process. Your favorites are always just a click away.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
