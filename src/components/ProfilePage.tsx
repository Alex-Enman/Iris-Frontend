import { User, Building2, FileText, BarChart3, TrendingUp, Package, Percent, RefreshCw, Mail, Phone, Calendar, Repeat, Star, MessageCircle, Clock, Store, Edit } from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState } from 'react';
import { toast } from 'sonner';
import { EditRestaurantProfileDialog } from './EditRestaurantProfileDialog';

interface ProfilePageProps {
  onViewSupplier?: (supplierId: string) => void;
}

export function ProfilePage({ onViewSupplier }: ProfilePageProps) {
  const [activeTab, setActiveTab] = useState('account');
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  // Restaurant profile data - this would be fetched from backend
  const [restaurantProfile, setRestaurantProfile] = useState({
    name: 'La Bella Cucina',
    type: 'Italian Fine Dining',
    cuisine: ['Italian', 'Mediterranean'],
    location: '123 Gastronomy Street, Culinary District',
    description:
      'An authentic Italian fine dining experience bringing traditional recipes from Tuscany with a modern twist. We pride ourselves on using locally sourced, organic ingredients to create unforgettable culinary experiences.',
    coverImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200',
    seatingCapacity: '85',
    established: '2020',
    orderVolume: '€12,500/month',
    email: 'orders@labellacucina.com',
    phone: '+1 (555) 987-6543',
    website: 'www.labellacucina.com',
    leadTime: '48 hours',
    deliveryWindow: '6:00 AM - 9:00 AM',
    paymentTerms: 'Net 30',
    minimumOrder: '€100',
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
    ],
  });

  const restaurantInfo = {
    name: restaurantProfile.name,
    type: restaurantProfile.type,
    address: restaurantProfile.location,
    memberSince: 'January 2024',
  };

  const handleSaveProfile = (updatedProfile: typeof restaurantProfile) => {
    setRestaurantProfile(updatedProfile);
    toast.success('Restaurant profile updated successfully!');
  };

  const metrics = [
    {
      label: 'Monthly Orders',
      value: '47',
      change: '+12%',
      trend: 'up',
      icon: Package,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      label: 'Reorder Rate',
      value: '87%',
      change: '+5%',
      trend: 'up',
      icon: Percent,
      color: 'text-accent',
      bgColor: 'bg-accent/10',
    },
    {
      label: 'Waste Reduction',
      value: '23%',
      change: '+8%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
  ];

  const topSuppliers = [
    { name: 'Green Valley Farm', orders: 28, spend: '€1,247' },
    { name: 'Mountain Dairy Co.', orders: 19, spend: '€892' },
    { name: 'Heritage Bakery', orders: 15, spend: '€675' },
  ];

  const suppliersList = [
    {
      id: 1,
      name: 'Green Valley Farm',
      category: 'Organic Vegetables',
      rating: 4.8,
      totalOrders: 28,
      monthlySpend: '€1,247',
      lastOrder: '2 days ago',
      relationship: 'Premium Partner',
      contactEmail: 'orders@greenvalley.com',
      contactPhone: '+1 (555) 123-4567',
      hasContract: true,
      image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400',
    },
    {
      id: 2,
      name: 'Mountain Dairy Co.',
      category: 'Dairy Products',
      rating: 4.6,
      totalOrders: 19,
      monthlySpend: '€892',
      lastOrder: '1 week ago',
      relationship: 'Regular Supplier',
      contactEmail: 'sales@mountaindairy.com',
      contactPhone: '+1 (555) 234-5678',
      hasContract: true,
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400',
    },
    {
      id: 3,
      name: 'Heritage Bakery',
      category: 'Artisan Bread & Pastries',
      rating: 4.9,
      totalOrders: 15,
      monthlySpend: '€675',
      lastOrder: '3 days ago',
      relationship: 'Preferred Vendor',
      contactEmail: 'contact@heritagebakery.com',
      contactPhone: '+1 (555) 345-6789',
      hasContract: false,
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400',
    },
    {
      id: 4,
      name: 'Ocean Fresh Seafood',
      category: 'Fresh Seafood',
      rating: 4.7,
      totalOrders: 12,
      monthlySpend: '€1,145',
      lastOrder: '4 days ago',
      relationship: 'Regular Supplier',
      contactEmail: 'orders@oceanfresh.com',
      contactPhone: '+1 (555) 456-7890',
      hasContract: true,
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400',
    },
  ];

  const supplyAgreements = [
    {
      id: 1,
      supplier: 'Green Valley Farm',
      type: 'Weekly Delivery',
      frequency: 'Every Monday & Thursday',
      status: 'Active',
      nextDelivery: '2024-10-28',
      items: 'Seasonal vegetables, herbs',
      discount: '15%',
      startDate: '2024-03-15',
      endDate: '2025-03-15',
    },
    {
      id: 2,
      supplier: 'Mountain Dairy Co.',
      type: 'Bi-Weekly Supply',
      frequency: 'Every other Tuesday',
      status: 'Active',
      nextDelivery: '2024-10-29',
      items: 'Dairy products, cheese',
      discount: '10%',
      startDate: '2024-04-01',
      endDate: '2025-04-01',
    },
    {
      id: 3,
      supplier: 'Ocean Fresh Seafood',
      type: 'On-Demand',
      frequency: 'As needed (24h notice)',
      status: 'Active',
      nextDelivery: 'Pending order',
      items: 'Fresh fish, shellfish',
      discount: '8%',
      startDate: '2024-05-10',
      endDate: '2025-05-10',
    },
  ];

  const sustainabilityScore = 82;

  const handleReorder = (orderId: string, supplier: string) => {
    toast.success(`Reordering from ${supplier}`, {
      description: `Order ${orderId} has been added to your cart.`,
    });
  };

  const handleContactSupplier = (supplier: string) => {
    toast.success(`Opening message to ${supplier}`);
  };

  return (
    <div className="min-h-screen py-12">
      <div className="mx-auto max-w-[1440px] px-8">
        <div className="mb-8">
          <h1 className="mb-2 text-4xl text-primary">Profile</h1>
          <p className="text-muted-foreground">
            Manage your restaurant profile and view insights
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Column - Navigation & Info */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Restaurant Info Card */}
              <div className="overflow-hidden rounded-2xl bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
                <div className="mb-6 flex items-start gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="bg-primary text-2xl text-primary-foreground">
                      LC
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="mb-1">{restaurantInfo.name}</h3>
                    <p className="mb-1 text-sm text-muted-foreground">
                      {restaurantInfo.type}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Member since {restaurantInfo.memberSince}
                    </p>
                  </div>
                </div>
                <div className="mb-4 text-sm text-muted-foreground">
                  <Building2 className="mb-2 h-4 w-4 inline" /> {restaurantInfo.address}
                </div>
                <Button
                  variant="outline"
                  className="w-full rounded-xl"
                  onClick={() => setIsEditProfileOpen(true)}
                >
                  Edit Profile
                </Button>
              </div>

              {/* Navigation Links */}
              <div className="rounded-2xl bg-white shadow-[0_1px_4px_rgba(0,0,0,0.08)]">
                <nav className="p-2">
                  {[
                    { icon: User, label: 'My Account', value: 'account' },
                    { icon: Package, label: 'My Suppliers', value: 'suppliers' },
                    { icon: FileText, label: 'Invoices', value: 'invoices' },
                    { icon: BarChart3, label: 'Analytics', value: 'analytics' },
                  ].map((item, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveTab(item.value)}
                      className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 transition-all duration-250 ${
                        activeTab === item.value
                          ? 'bg-primary text-primary-foreground'
                          : 'text-foreground hover:bg-primary/5'
                      }`}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          {/* Right Column - Insights & Metrics */}
          <div className="lg:col-span-2">
            {activeTab === 'account' && (
              <div className="space-y-6">
                {/* Metrics Grid */}
                <div className="grid gap-6 md:grid-cols-3">
                  {metrics.map((metric, index) => (
                    <div
                      key={index}
                      className="overflow-hidden rounded-2xl bg-white p-6 shadow-[0_1px_4px_rgba(0,0,0,0.08)] transition-all duration-250 hover:shadow-[0_2px_8px_rgba(0,0,0,0.12)]"
                    >
                      <div className="mb-4 flex items-center justify-between">
                        <div className={`rounded-xl ${metric.bgColor} p-3`}>
                          <metric.icon className={`h-5 w-5 ${metric.color}`} />
                        </div>
                        <div
                          className={`text-sm ${
                            metric.trend === 'up' ? 'text-primary' : 'text-accent'
                          }`}
                        >
                          {metric.change}
                        </div>
                      </div>
                      <div className="text-3xl text-primary">{metric.value}</div>
                      <div className="mt-1 text-sm text-muted-foreground">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Sustainability Score */}
                <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 to-accent/5 p-6 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <h3 className="mb-1">Sustainability Score</h3>
                      <p className="text-sm text-muted-foreground">
                        Based on sourcing practices
                      </p>
                    </div>
                    <div className="text-4xl text-primary">
                      {sustainabilityScore}
                      <span className="text-xl text-muted-foreground">/100</span>
                    </div>
                  </div>
                  <Progress value={sustainabilityScore} className="h-3" />
                  <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">Local</div>
                      <div className="text-primary">78%</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Organic</div>
                      <div className="text-primary">65%</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Traceable</div>
                      <div className="text-primary">92%</div>
                    </div>
                  </div>
                </div>

                {/* Top Suppliers */}
                <div className="rounded-2xl bg-white p-6 shadow-[0_1px_4px_rgba(0,0,0,0.08)]">
                  <h3 className="mb-4">Top Suppliers This Month</h3>
                  <div className="space-y-4">
                    {topSuppliers.map((supplier, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between rounded-xl bg-muted/30 p-4 transition-all duration-250 hover:bg-muted/50"
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                            #{index + 1}
                          </div>
                          <div>
                            <div className="mb-1">{supplier.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {supplier.orders} orders
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <div className="text-lg text-primary">{supplier.spend}</div>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            className="rounded-xl"
                            onClick={() => onViewSupplier?.((index + 1).toString())}
                          >
                            View Profile
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="rounded-2xl bg-white p-6 shadow-[0_1px_4px_rgba(0,0,0,0.08)]">
                  <h3 className="mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    {[
                      {
                        action: 'Order delivered',
                        supplier: 'Green Valley Farm',
                        time: '2 hours ago',
                      },
                      {
                        action: 'Invoice paid',
                        supplier: 'Mountain Dairy Co.',
                        time: '1 day ago',
                      },
                      {
                        action: 'New review posted',
                        supplier: 'Heritage Bakery',
                        time: '3 days ago',
                      },
                    ].map((activity, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 border-l-2 border-primary/20 pl-4"
                      >
                        <div className="flex-1">
                          <div className="mb-1">{activity.action}</div>
                          <div className="text-sm text-muted-foreground">
                            {activity.supplier}
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {activity.time}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'suppliers' && (
              <div className="space-y-6">
                {/* My Suppliers Section */}
                <Tabs defaultValue="all" className="w-full">
                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <h2 className="mb-1">My Suppliers</h2>
                      <p className="text-sm text-muted-foreground">
                        Manage your supplier relationships and recurring orders
                      </p>
                    </div>
                    <TabsList className="rounded-xl">
                      <TabsTrigger value="all" className="rounded-lg">
                        All Suppliers
                      </TabsTrigger>
                      <TabsTrigger value="agreements" className="rounded-lg">
                        Contracts
                      </TabsTrigger>
                    </TabsList>
                  </div>

                  {/* All Suppliers Tab */}
                  <TabsContent value="all" className="mt-0 space-y-4">
                    {suppliersList.map((supplier, index) => (
                      <div
                        key={supplier.id}
                        className="cursor-pointer overflow-hidden rounded-2xl bg-white shadow-[0_1px_4px_rgba(0,0,0,0.08)] transition-all duration-250 hover:shadow-[0_2px_8px_rgba(0,0,0,0.12)]"
                        onClick={() => onViewSupplier?.(supplier.id.toString())}
                      >
                        <div className="p-6">
                          <div className="flex items-start gap-4">
                            <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl">
                              <ImageWithFallback
                                src={supplier.image}
                                alt={supplier.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="mb-2 flex items-start justify-between">
                                <div>
                                  <div className="mb-1 flex items-center gap-2">
                                    <h3>{supplier.name}</h3>
                                    {supplier.hasContract && (
                                      <Badge variant="default" className="bg-primary">
                                        <Repeat className="mr-1 h-3 w-3" />
                                        Contract
                                      </Badge>
                                    )}
                                  </div>
                                  <p className="text-sm text-muted-foreground">
                                    {supplier.category}
                                  </p>
                                </div>
                              </div>
                              <div className="mb-4 flex flex-wrap gap-4 text-sm">
                                <div>
                                  <span className="text-muted-foreground">Relationship: </span>
                                  <Badge variant="outline">{supplier.relationship}</Badge>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Total Orders: </span>
                                  <span>{supplier.totalOrders}</span>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Monthly: </span>
                                  <span className="text-primary">{supplier.monthlySpend}</span>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Last Order: </span>
                                  <span>{supplier.lastOrder}</span>
                                </div>
                              </div>
                              <div className="flex flex-wrap items-center gap-2 border-t border-border pt-4">
                                <Button
                                  size="sm"
                                  className="rounded-xl"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onViewSupplier?.(supplier.id.toString());
                                  }}
                                >
                                  <Store className="mr-2 h-4 w-4" />
                                  Visit Store
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="rounded-xl"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleContactSupplier(supplier.name);
                                  }}
                                >
                                  <MessageCircle className="mr-2 h-4 w-4" />
                                  Message
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="rounded-xl"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <Mail className="mr-2 h-4 w-4" />
                                  Email
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="rounded-xl"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <Phone className="mr-2 h-4 w-4" />
                                  Call
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </TabsContent>

                  {/* Supply Agreements Tab */}
                  <TabsContent value="agreements" className="mt-0 space-y-4">
                    <div className="rounded-2xl bg-white p-6 shadow-[0_1px_4px_rgba(0,0,0,0.08)]">
                      <h3 className="mb-4">Active Supply Agreements</h3>
                      <div className="space-y-4">
                        {supplyAgreements.map((agreement) => (
                          <div
                            key={agreement.id}
                            className="rounded-xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent p-5"
                          >
                            <div className="mb-4 flex items-start justify-between">
                              <div>
                                <div className="mb-1 flex items-center gap-2">
                                  <h4>{agreement.supplier}</h4>
                                  <Badge
                                    variant="default"
                                    className="bg-primary"
                                  >
                                    {agreement.status}
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  {agreement.type}
                                </p>
                              </div>
                              <Badge variant="outline" className="text-primary">
                                <Percent className="mr-1 h-3 w-3" />
                                {agreement.discount} discount
                              </Badge>
                            </div>
                            <div className="mb-4 grid gap-3 sm:grid-cols-2">
                              <div className="rounded-lg bg-background/50 p-3">
                                <div className="mb-1 flex items-center gap-2 text-xs text-muted-foreground">
                                  <Repeat className="h-3 w-3" />
                                  Frequency
                                </div>
                                <div className="text-sm">{agreement.frequency}</div>
                              </div>
                              <div className="rounded-lg bg-background/50 p-3">
                                <div className="mb-1 flex items-center gap-2 text-xs text-muted-foreground">
                                  <Calendar className="h-3 w-3" />
                                  Next Delivery
                                </div>
                                <div className="text-sm">{agreement.nextDelivery}</div>
                              </div>
                            </div>
                            <div className="mb-3 text-sm">
                              <span className="text-muted-foreground">Items: </span>
                              <span>{agreement.items}</span>
                            </div>
                            <div className="flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground">
                              <span>
                                Contract: {agreement.startDate} - {agreement.endDate}
                              </span>
                              <Button size="sm" variant="outline" className="rounded-xl">
                                View Details
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            )}

            {activeTab === 'invoices' && (
              <div className="flex min-h-[400px] items-center justify-center rounded-2xl bg-white p-12 shadow-[0_1px_4px_rgba(0,0,0,0.08)]">
                <div className="text-center">
                  <FileText className="mx-auto mb-4 h-16 w-16 text-muted-foreground/30" />
                  <h3 className="mb-2 text-primary">Invoices</h3>
                  <p className="text-muted-foreground">
                    Invoice management coming soon
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="flex min-h-[400px] items-center justify-center rounded-2xl bg-white p-12 shadow-[0_1px_4px_rgba(0,0,0,0.08)]">
                <div className="text-center">
                  <BarChart3 className="mx-auto mb-4 h-16 w-16 text-muted-foreground/30" />
                  <h3 className="mb-2 text-primary">Analytics Dashboard</h3>
                  <p className="text-muted-foreground">
                    Detailed analytics and insights coming soon
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Restaurant Profile Dialog */}
      <EditRestaurantProfileDialog
        open={isEditProfileOpen}
        onOpenChange={setIsEditProfileOpen}
        restaurantProfile={restaurantProfile}
        onSave={handleSaveProfile}
      />
    </div>
  );
}