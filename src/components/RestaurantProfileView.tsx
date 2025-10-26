import { Star, MapPin, Award, Users, Calendar, TrendingUp, Mail, Phone, Globe, Clock, Utensils, DollarSign, MessageCircle, Heart, FileText, Plus, Package } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Avatar, AvatarFallback } from './ui/avatar';
import { toast } from 'sonner@2.0.3';
import { useState } from 'react';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';

interface RestaurantProfileViewProps {
  restaurantId: string;
  onBack: () => void;
  isSupplierView?: boolean;
}

export function RestaurantProfileView({ restaurantId, onBack, isSupplierView }: RestaurantProfileViewProps) {
  const [notes, setNotes] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);

  // Mock supplier-specific data (order history with this restaurant)
  const orderHistory = [
    {
      id: 'ORD-1234',
      date: '2024-10-20',
      items: ['Tomatoes', 'Basil', 'Mozzarella'],
      total: '€265.50',
      status: 'Delivered',
    },
    {
      id: 'ORD-1198',
      date: '2024-10-13',
      items: ['Olive Oil', 'Parmesan', 'Fresh Herbs'],
      total: '€189.30',
      status: 'Delivered',
    },
    {
      id: 'ORD-1167',
      date: '2024-10-06',
      items: ['Tomatoes', 'Arugula', 'Burrata'],
      total: '€245.00',
      status: 'Delivered',
    },
  ];

  const supplierAnalytics = {
    totalRevenue: '€12,543',
    totalOrders: 47,
    avgOrderValue: '€267',
    lastOrderDate: '2 days ago',
    orderFrequency: 'Weekly',
    topProducts: ['Tomatoes', 'Fresh Herbs', 'Mozzarella'],
  };

  // Mock restaurant data - in real app, fetch based on restaurantId
  const restaurant = {
    id: restaurantId,
    name: 'La Bella Cucina',
    type: 'Italian Fine Dining',
    cuisine: ['Italian', 'Mediterranean'],
    location: '123 Gastronomy Street, Culinary District',
    rating: 4.7,
    totalReviews: 342,
    memberSince: 'January 2024',
    description:
      'An authentic Italian fine dining experience bringing traditional recipes from Tuscany with a modern twist. We pride ourselves on using locally sourced, organic ingredients to create unforgettable culinary experiences.',
    coverImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200',
    avatar: 'LC',
    stats: {
      seatingCapacity: 85,
      avgMonthlyOrders: 47,
      established: '2020',
      orderVolume: '€12,500/month',
    },
    menu: [
      {
        category: 'Antipasti',
        items: [
          {
            name: 'Bruschetta al Pomodoro',
            description: 'Grilled bread topped with fresh tomatoes, basil, and extra virgin olive oil',
            price: '€12',
            image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=400',
          },
          {
            name: 'Burrata con Prosciutto',
            description: 'Creamy burrata with aged prosciutto and arugula',
            price: '€18',
            image: 'https://images.unsplash.com/photo-1498579397066-22750a3cb424?w=400',
          },
        ],
      },
      {
        category: 'Primi Piatti',
        items: [
          {
            name: 'Tagliatelle al Tartufo',
            description: 'Fresh pasta with black truffle and parmesan',
            price: '€28',
            image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400',
          },
          {
            name: 'Risotto ai Funghi',
            description: 'Creamy risotto with wild mushrooms',
            price: '€24',
            image: 'https://images.unsplash.com/photo-1476124369491-c7addf8a3b52?w=400',
          },
        ],
      },
      {
        category: 'Secondi',
        items: [
          {
            name: 'Osso Buco alla Milanese',
            description: 'Braised veal shanks with saffron risotto',
            price: '€38',
            image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400',
          },
          {
            name: 'Branzino al Forno',
            description: 'Oven-roasted sea bass with herbs and lemon',
            price: '€35',
            image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400',
          },
        ],
      },
    ],
    supplierNeeds: [
      {
        category: 'Vegetables',
        frequency: 'Twice weekly',
        averageOrder: '€250',
        preferences: 'Organic, locally sourced',
      },
      {
        category: 'Seafood',
        frequency: 'Daily',
        averageOrder: '€450',
        preferences: 'Fresh, sustainable sources',
      },
      {
        category: 'Dairy',
        frequency: 'Weekly',
        averageOrder: '€180',
        preferences: 'Premium Italian cheeses',
      },
      {
        category: 'Herbs & Spices',
        frequency: 'Weekly',
        averageOrder: '€120',
        preferences: 'Fresh herbs, specialty spices',
      },
    ],
    contact: {
      email: 'orders@labellacucina.com',
      phone: '+1 (555) 987-6543',
      website: 'www.labellacucina.com',
    },
    orderingPreferences: {
      leadTime: '48 hours',
      deliveryWindow: '6:00 AM - 9:00 AM',
      paymentTerms: 'Net 30',
      minimumOrder: '€100',
    },
  };

  const handleContact = () => {
    toast.success('Opening message to ' + restaurant.name);
  };

  const handleProposal = () => {
    toast.success('Creating supply proposal for ' + restaurant.name);
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast.success(isFavorite ? 'Removed from favorites' : 'Added to favorites');
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
              src={restaurant.coverImage}
              alt={restaurant.name}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
              <div className="flex items-end gap-4">
                <Avatar className="h-20 w-20 border-4 border-white">
                  <AvatarFallback className="bg-primary text-2xl text-primary-foreground">
                    {restaurant.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="text-white">
                  <h1 className="mb-1 text-3xl">{restaurant.name}</h1>
                  <div className="flex items-center gap-2 text-sm">
                    <Utensils className="h-4 w-4" />
                    {restaurant.type}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="rounded-xl border-white bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"
                  onClick={handleContact}
                >
                  Contact
                </Button>
                <Button
                  size="sm"
                  className="rounded-xl bg-primary hover:bg-primary/90"
                  onClick={handleProposal}
                >
                  Send Proposal
                </Button>
                <Button
                  size="sm"
                  className="rounded-xl bg-primary hover:bg-primary/90"
                  onClick={handleFavorite}
                >
                  {isFavorite ? <Heart className="h-4 w-4 fill-red-500" /> : <Heart className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="mb-4 flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 fill-primary text-primary" />
                <span className="text-lg">{restaurant.rating}</span>
                <span className="text-sm text-muted-foreground">
                  ({restaurant.totalReviews} reviews)
                </span>
              </div>
              <div className="h-6 w-px bg-border" />
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {restaurant.location}
              </div>
              <div className="h-6 w-px bg-border" />
              <div className="text-sm text-muted-foreground">
                Member since {restaurant.memberSince}
              </div>
            </div>

            <p className="mb-4 leading-relaxed text-foreground">
              {restaurant.description}
            </p>

            <div className="mb-4">
              <p className="mb-2 text-sm text-muted-foreground">Cuisine Types</p>
              <div className="flex flex-wrap gap-2">
                {restaurant.cuisine.map((type, index) => (
                  <Badge key={index} variant="outline">
                    {type}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-4 gap-4 rounded-2xl bg-muted/30 p-4">
              <div>
                <div className="mb-1 flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  Seating
                </div>
                <div>{restaurant.stats.seatingCapacity} seats</div>
              </div>
              <div>
                <div className="mb-1 flex items-center gap-2 text-sm text-muted-foreground">
                  <TrendingUp className="h-4 w-4" />
                  Monthly Orders
                </div>
                <div>{restaurant.stats.avgMonthlyOrders}</div>
              </div>
              <div>
                <div className="mb-1 flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  Established
                </div>
                <div>{restaurant.stats.established}</div>
              </div>
              <div>
                <div className="mb-1 flex items-center gap-2 text-sm text-muted-foreground">
                  <DollarSign className="h-4 w-4" />
                  Order Volume
                </div>
                <div>{restaurant.stats.orderVolume}</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Tabs Section */}
        <Tabs defaultValue="menu" className="w-full">
          <TabsList className="mb-6 inline-flex h-12 rounded-2xl bg-white p-1 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
            <TabsTrigger value="menu" className="rounded-xl">
              Menu
            </TabsTrigger>
            <TabsTrigger value="needs" className="rounded-xl">
              Supply Needs
            </TabsTrigger>
            <TabsTrigger value="ordering" className="rounded-xl">
              Ordering Info
            </TabsTrigger>
          </TabsList>

          {/* Menu Tab */}
          <TabsContent value="menu" className="mt-0">
            <div className="space-y-6">
              {restaurant.menu.map((section, sectionIndex) => (
                <Card
                  key={sectionIndex}
                  className="rounded-2xl border-0 p-6 shadow-[0_1px_4px_rgba(0,0,0,0.08)]"
                >
                  <h3 className="mb-4 text-xl text-primary">{section.category}</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    {section.items.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="flex gap-4 rounded-xl border border-border p-4 transition-all duration-250 hover:border-primary/50"
                      >
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg">
                          <ImageWithFallback
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="mb-1 flex items-start justify-between">
                            <h4>{item.name}</h4>
                            <span className="text-primary">{item.price}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Supply Needs Tab */}
          <TabsContent value="needs" className="mt-0">
            <Card className="rounded-2xl border-0 p-6 shadow-[0_1px_4px_rgba(0,0,0,0.08)]">
              <h3 className="mb-4">Current Supply Requirements</h3>
              <p className="mb-6 text-sm text-muted-foreground">
                This restaurant regularly orders the following categories. Consider
                reaching out with a proposal.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                {restaurant.supplierNeeds.map((need, index) => (
                  <div
                    key={index}
                    className="rounded-xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent p-5"
                  >
                    <div className="mb-3 flex items-start justify-between">
                      <h4>{need.category}</h4>
                      <Badge variant="outline" className="text-primary">
                        {need.averageOrder}
                      </Badge>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Frequency:</span>
                        <span>{need.frequency}</span>
                      </div>
                      <div className="flex items-start justify-between">
                        <span className="text-muted-foreground">Preferences:</span>
                        <span className="text-right">{need.preferences}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Ordering Info Tab */}
          <TabsContent value="ordering" className="mt-0">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="rounded-2xl border-0 p-6 shadow-[0_1px_4px_rgba(0,0,0,0.08)]">
                <h3 className="mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 rounded-xl bg-muted/30 p-4">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <div className="text-sm text-muted-foreground">Email</div>
                      <div>{restaurant.contact.email}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-xl bg-muted/30 p-4">
                    <Phone className="h-5 w-5 text-primary" />
                    <div>
                      <div className="text-sm text-muted-foreground">Phone</div>
                      <div>{restaurant.contact.phone}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-xl bg-muted/30 p-4">
                    <Globe className="h-5 w-5 text-primary" />
                    <div>
                      <div className="text-sm text-muted-foreground">Website</div>
                      <div>{restaurant.contact.website}</div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="rounded-2xl border-0 p-6 shadow-[0_1px_4px_rgba(0,0,0,0.08)]">
                <h3 className="mb-4">Ordering Preferences</h3>
                <div className="space-y-4">
                  <div className="rounded-xl bg-muted/30 p-4">
                    <div className="mb-1 flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      Lead Time
                    </div>
                    <div>{restaurant.orderingPreferences.leadTime}</div>
                  </div>
                  <div className="rounded-xl bg-muted/30 p-4">
                    <div className="mb-1 flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      Delivery Window
                    </div>
                    <div>{restaurant.orderingPreferences.deliveryWindow}</div>
                  </div>
                  <div className="rounded-xl bg-muted/30 p-4">
                    <div className="mb-1 text-sm text-muted-foreground">
                      Payment Terms
                    </div>
                    <div>{restaurant.orderingPreferences.paymentTerms}</div>
                  </div>
                  <div className="rounded-xl bg-muted/30 p-4">
                    <div className="mb-1 text-sm text-muted-foreground">
                      Minimum Order
                    </div>
                    <div>{restaurant.orderingPreferences.minimumOrder}</div>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Supplier-Specific Sections - Only shown to suppliers */}
        {isSupplierView && (
          <div className="mt-8 space-y-6">
            {/* Order History & Analytics */}
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Analytics Overview */}
              <Card className="rounded-3xl border-0 p-6 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
                <div className="mb-4 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <h3>Your Analytics</h3>
                </div>
                <p className="mb-4 text-sm text-muted-foreground">
                  Performance with this restaurant
                </p>
                <div className="space-y-4">
                  <div className="rounded-xl bg-primary/5 p-4">
                    <div className="mb-1 text-sm text-muted-foreground">Total Revenue</div>
                    <div className="text-2xl text-primary">{supplierAnalytics.totalRevenue}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-muted/30 p-3">
                      <div className="mb-1 text-xs text-muted-foreground">Orders</div>
                      <div className="font-medium">{supplierAnalytics.totalOrders}</div>
                    </div>
                    <div className="rounded-xl bg-muted/30 p-3">
                      <div className="mb-1 text-xs text-muted-foreground">Avg Order</div>
                      <div className="font-medium">{supplierAnalytics.avgOrderValue}</div>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Last Order:</span>
                      <span>{supplierAnalytics.lastOrderDate}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Frequency:</span>
                      <span>{supplierAnalytics.orderFrequency}</span>
                    </div>
                  </div>
                  <div>
                    <div className="mb-2 text-sm text-muted-foreground">Top Products</div>
                    <div className="flex flex-wrap gap-1">
                      {supplierAnalytics.topProducts.map((product, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {product}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>

              {/* Order History */}
              <Card className="rounded-3xl border-0 p-6 shadow-[0_2px_8px_rgba(0,0,0,0.08)] lg:col-span-2">
                <div className="mb-4 flex items-center gap-2">
                  <Package className="h-5 w-5 text-primary" />
                  <h3>Order History</h3>
                </div>
                <p className="mb-4 text-sm text-muted-foreground">
                  Recent orders from this restaurant
                </p>
                <div className="space-y-3">
                  {orderHistory.map((order) => (
                    <div
                      key={order.id}
                      className="rounded-xl border border-border p-4 transition-all duration-250 hover:border-primary/50"
                    >
                      <div className="mb-3 flex items-start justify-between">
                        <div>
                          <h4 className="mb-1">{order.id}</h4>
                          <p className="text-sm text-muted-foreground">{order.date}</p>
                        </div>
                        <div className="text-right">
                          <div className="mb-1 text-primary">{order.total}</div>
                          <Badge variant="outline">{order.status}</Badge>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {order.items.map((item, idx) => (
                          <span
                            key={idx}
                            className="rounded-lg bg-muted/50 px-2 py-1 text-xs"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Private Notes Section */}
            <Card className="rounded-3xl border-0 p-6 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
              <div className="mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                <h3>Private Notes</h3>
              </div>
              <p className="mb-4 text-sm text-muted-foreground">
                Add private notes about this restaurant (only visible to you)
              </p>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="notes">Your Notes</Label>
                  <Textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add notes about preferences, special requests, delivery instructions..."
                    className="mt-2 min-h-[120px] rounded-xl"
                  />
                </div>
                <Button
                  onClick={() => {
                    toast.success('Notes saved successfully');
                  }}
                  className="rounded-xl bg-primary hover:bg-primary/90"
                >
                  Save Notes
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}