import { useState } from 'react';
import {
  Package,
  TrendingUp,
  ShoppingCart,
  Edit,
  Plus,
  Eye,
  MoreVertical,
  BarChart3,
  Users,
  DollarSign,
  LogOut,
  Upload,
  FileText,
  Download,
  Send,
  CheckCircle,
  Clock,
  Store,
  Utensils,
  MessageCircle,
  Phone,
  Mail,
  ChevronDown,
  ChevronUp,
  MapPin,
  LayoutDashboard,
  AlertCircle,
  Bell,
  TrendingDown,
  Star,
  ArrowRight,
  Globe,
  Settings,
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ImageWithFallback } from './figma/ImageWithFallback';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { toast } from 'sonner@2.0.3';
import { MessagesPage } from './MessagesPage';
import { RestaurantProfileView } from './RestaurantProfileView';
import { EditStoreDialog } from './EditStoreDialog';
import { DiscoverRestaurantsPage } from './DiscoverRestaurantsPage';
import { SupplierDashboardTab } from './SupplierDashboardTab';

interface SupplierDashboardProps {
  onLogout: () => void;
}

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  unit: string;
  stock: number;
  status: string;
  image: string;
  sales: number;
  revenue: string;
}

interface NewProductForm {
  name: string;
  category: string;
  price: string;
  unit: string;
  stock: string;
  imageUrl: string;
}

interface SupplierInfoForm {
  name: string;
  category: string;
  location: string;
  description: string;
  email: string;
  phone: string;
  website: string;
}

export function SupplierDashboard({ onLogout }: SupplierDashboardProps) {
  const [editingProduct, setEditingProduct] = useState<number | null>(null);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isEditStoreOpen, setIsEditStoreOpen] = useState(false);
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [viewingRestaurantId, setViewingRestaurantId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const [newProduct, setNewProduct] = useState<NewProductForm>({
    name: '',
    category: 'Vegetables',
    price: '',
    unit: 'kg',
    stock: '',
    imageUrl: '',
  });

  // Mock supplier data
  const [supplierInfo, setSupplierInfo] = useState({
    name: 'Green Valley Farm',
    category: 'Organic Vegetables',
    location: 'Valley Ridge, 12 km from city center',
    verified: true,
    rating: 4.8,
    totalReviews: 127,
    memberSince: 'March 2022',
    description:
      'Family-run organic farm specializing in heritage vegetables and sustainable farming practices. We use traditional methods passed down through generations.',
    certifications: ['Organic Certified', 'Local Producer', 'Traceable'],
    email: 'contact@greenvalleyfarm.com',
    phone: '+1 (555) 123-4567',
    website: 'www.greenvalleyfarm.com',
  });

  const [editStoreForm, setEditStoreForm] = useState<SupplierInfoForm>({
    name: supplierInfo.name,
    category: supplierInfo.category,
    location: supplierInfo.location,
    description: supplierInfo.description,
    email: supplierInfo.email,
    phone: supplierInfo.phone,
    website: supplierInfo.website,
  });

  const stats = [
    {
      label: 'Total Revenue',
      value: '€12,450',
      change: '+12.5%',
      icon: DollarSign,
      trend: 'up',
    },
    {
      label: 'Active Orders',
      value: '24',
      change: '+3',
      icon: ShoppingCart,
      trend: 'up',
    },
    {
      label: 'Total Customers',
      value: '89',
      change: '+8',
      icon: Users,
      trend: 'up',
    },
    {
      label: 'Products Listed',
      value: '12',
      change: '+2',
      icon: Package,
      trend: 'up',
    },
  ];

  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: 'Heirloom Tomatoes',
      category: 'Vegetables',
      price: 4.5,
      unit: 'kg',
      stock: 145,
      status: 'In Stock',
      image:
        'https://images.unsplash.com/photo-1591171551239-80a5eddd627a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b21hdG9lcyUyMGZyZXNoJTIwbWFya2V0fGVufDF8fHx8MTc2MTMwNzMzOXww&ixlib=rb-4.1.0&q=80&w=1080',
      sales: 245,
      revenue: '€1,102.50',
    },
    {
      id: 2,
      name: 'Organic Carrots',
      category: 'Vegetables',
      price: 3.2,
      unit: 'kg',
      stock: 230,
      status: 'In Stock',
      image:
        'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJyb3RzJTIwZnJlc2h8ZW58MXx8fHwxNzYxMzA3MzM4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      sales: 189,
      revenue: '€604.80',
    },
    {
      id: 3,
      name: 'Seasonal Greens Mix',
      category: 'Vegetables',
      price: 3.8,
      unit: 'kg',
      stock: 12,
      status: 'Low Stock',
      image:
        'https://images.unsplash.com/photo-1540420773420-3366772f4999?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHZlZ2V0YWJsZXMlMjBtYXJrZXR8ZW58MXx8fHwxNzYxMzA3MzM4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      sales: 156,
      revenue: '€592.80',
    },
    {
      id: 4,
      name: 'Baby Potatoes',
      category: 'Vegetables',
      price: 2.9,
      unit: 'kg',
      stock: 0,
      status: 'Out of Stock',
      image:
        'https://images.unsplash.com/photo-1518977676601-b53f82aba655?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3RhdG9lcyUyMGZyZXNofGVufDF8fHx8MTc2MTMwNzMzOHww&ixlib=rb-4.1.0&q=80&w=1080',
      sales: 134,
      revenue: '€388.60',
    },
    {
      id: 5,
      name: 'Heritage Beets',
      category: 'Vegetables',
      price: 4.2,
      unit: 'kg',
      stock: 78,
      status: 'In Stock',
      image:
        'https://images.unsplash.com/photo-1590165482129-1b8b27698780?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWV0cyUyMGZyZXNofGVufDF8fHx8MTc2MTMwNzMzOHww&ixlib=rb-4.1.0&q=80&w=1080',
      sales: 98,
      revenue: '€411.60',
    },
  ]);

  const recentOrders = [
    {
      id: 'ORD-1234',
      restaurantId: '1',
      restaurant: 'La Cucina',
      items: [
        { name: 'Heirloom Tomatoes', quantity: '5 kg', price: '€22.50' },
        { name: 'Organic Carrots', quantity: '3 kg', price: '€9.60' },
        { name: 'Seasonal Greens Mix', quantity: '2 kg', price: '€7.60' },
      ],
      total: '€45.60',
      status: 'Pending',
      date: '2 hours ago',
      deliveryDate: '2024-10-28',
      notes: 'Please deliver early morning before 8 AM',
    },
    {
      id: 'ORD-1233',
      restaurantId: '2',
      restaurant: 'Green Table',
      items: [
        { name: 'Heirloom Tomatoes', quantity: '8 kg', price: '€36.00' },
        { name: 'Heritage Beets', quantity: '4 kg', price: '€16.80' },
        { name: 'Seasonal Greens Mix', quantity: '5 kg', price: '€19.00' },
        { name: 'Organic Carrots', quantity: '2 kg', price: '€6.40' },
      ],
      total: '€78.20',
      status: 'Processing',
      date: '5 hours ago',
      deliveryDate: '2024-10-27',
      notes: '',
    },
    {
      id: 'ORD-1232',
      restaurantId: '3',
      restaurant: 'Farm to Fork',
      items: [
        { name: 'Organic Carrots', quantity: '6 kg', price: '€19.20' },
        { name: 'Heritage Beets', quantity: '3 kg', price: '€12.60' },
      ],
      total: '€32.40',
      status: 'Shipped',
      date: '1 day ago',
      deliveryDate: '2024-10-26',
      notes: 'Contact on arrival',
    },
    {
      id: 'ORD-1231',
      restaurantId: '4',
      restaurant: 'The Garden',
      items: [
        { name: 'Heirloom Tomatoes', quantity: '10 kg', price: '€45.00' },
        { name: 'Seasonal Greens Mix', quantity: '3 kg', price: '€11.40' },
      ],
      total: '€56.80',
      status: 'Delivered',
      date: '2 days ago',
      deliveryDate: '2024-10-23',
      notes: '',
    },
  ];

  const customers = [
    {
      id: '1',
      name: 'La Cucina',
      type: 'Italian Restaurant',
      location: '15 min away',
      totalOrders: 47,
      totalSpent: '€2,340',
      lastOrder: '2 hours ago',
      status: 'active',
      avatar: 'LC',
    },
    {
      id: '2',
      name: 'Green Table',
      type: 'Farm to Table',
      location: '8 min away',
      totalOrders: 62,
      totalSpent: '€3,120',
      lastOrder: '5 hours ago',
      status: 'active',
      avatar: 'GT',
    },
    {
      id: '3',
      name: 'Farm to Fork',
      type: 'Modern Bistro',
      location: '12 min away',
      totalOrders: 28,
      totalSpent: '€1,450',
      lastOrder: '1 day ago',
      status: 'active',
      avatar: 'FF',
    },
    {
      id: '4',
      name: 'The Garden',
      type: 'Fine Dining',
      location: '20 min away',
      totalOrders: 35,
      totalSpent: '€1,980',
      lastOrder: '2 days ago',
      status: 'active',
      avatar: 'TG',
    },
    {
      id: '5',
      name: 'Harvest Moon',
      type: 'Contemporary',
      location: '18 min away',
      totalOrders: 15,
      totalSpent: '€750',
      lastOrder: '1 week ago',
      status: 'inactive',
      avatar: 'HM',
    },
  ];

  const invoices = [
    {
      id: 'INV-2024-001',
      orderId: 'ORD-1231',
      restaurant: 'The Garden',
      amount: '€56.80',
      status: 'Paid',
      issueDate: '2024-10-22',
      dueDate: '2024-11-05',
      paymentDate: '2024-10-25',
    },
    {
      id: 'INV-2024-002',
      orderId: 'ORD-1232',
      restaurant: 'Farm to Fork',
      amount: '€32.40',
      status: 'Pending',
      issueDate: '2024-10-23',
      dueDate: '2024-11-06',
      paymentDate: null,
    },
    {
      id: 'INV-2024-003',
      orderId: 'ORD-1233',
      restaurant: 'Green Table',
      amount: '€78.20',
      status: 'Sent',
      issueDate: '2024-10-24',
      dueDate: '2024-11-07',
      paymentDate: null,
    },
    {
      id: 'INV-2024-004',
      orderId: 'ORD-1189',
      restaurant: 'La Cucina',
      amount: '€124.50',
      status: 'Paid',
      issueDate: '2024-10-15',
      dueDate: '2024-10-29',
      paymentDate: '2024-10-28',
    },
    {
      id: 'INV-2024-005',
      orderId: 'ORD-1167',
      restaurant: 'Harvest Moon',
      amount: '€89.30',
      status: 'Overdue',
      issueDate: '2024-10-10',
      dueDate: '2024-10-24',
      paymentDate: null,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Stock':
        return 'default';
      case 'Low Stock':
        return 'secondary';
      case 'Out of Stock':
        return 'destructive';
      default:
        return 'default';
    }
  };

  const getOrderStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'secondary';
      case 'Processing':
        return 'default';
      case 'Shipped':
        return 'default';
      case 'Delivered':
        return 'outline';
      default:
        return 'default';
    }
  };

  const getInvoiceStatusColor = (status: string) => {
    switch (status) {
      case 'Paid':
        return 'default';
      case 'Sent':
        return 'secondary';
      case 'Pending':
        return 'outline';
      case 'Overdue':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const getInvoiceStatusIcon = (status: string) => {
    switch (status) {
      case 'Paid':
        return CheckCircle;
      case 'Sent':
        return Send;
      case 'Pending':
      case 'Overdue':
        return Clock;
      default:
        return FileText;
    }
  };

  const handleAddProduct = () => {
    const newProductData: Product = {
      id: products.length + 1,
      name: newProduct.name,
      category: newProduct.category,
      price: parseFloat(newProduct.price),
      unit: newProduct.unit,
      stock: parseInt(newProduct.stock),
      status: 'In Stock',
      image: newProduct.imageUrl,
      sales: 0,
      revenue: '€0.00',
    };

    setProducts([...products, newProductData]);
    setIsAddProductOpen(false);
    setNewProduct({
      name: '',
      category: 'Vegetables',
      price: '',
      unit: 'kg',
      stock: '',
      imageUrl: '',
    });
    toast.success('Product added successfully!');
  };

  const handleEditStore = () => {
    setSupplierInfo({
      ...supplierInfo,
      name: editStoreForm.name,
      category: editStoreForm.category,
      location: editStoreForm.location,
      description: editStoreForm.description,
      email: editStoreForm.email,
      phone: editStoreForm.phone,
      website: editStoreForm.website,
    });
    setIsEditStoreOpen(false);
    toast.success('Store information updated successfully!');
  };

  const handleContactRestaurant = (restaurantName: string) => {
    toast.success(`Opening message to ${restaurantName}`);
  };

  const handleViewRestaurantProfile = (restaurantId: string) => {
    setViewingRestaurantId(restaurantId);
  };

  // If viewing a restaurant profile, show that
  if (viewingRestaurantId) {
    return (
      <RestaurantProfileView
        restaurantId={viewingRestaurantId}
        onBack={() => setViewingRestaurantId(null)}
        isSupplierView={true}
      />
    );
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Left Sidebar Navigation */}
      <aside className="sticky top-0 h-screen w-64 border-r border-border bg-white">
        {/* Logo Section */}
        <div className="flex h-16 items-center gap-3 border-b border-border px-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
            <span className="text-xl text-primary-foreground">🌿</span>
          </div>
          <div>
            <h1 className="tracking-tight text-primary">Iris Supplier</h1>
            <p className="text-xs text-muted-foreground">{supplierInfo.name}</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1 p-4">
          <Button
            variant={activeTab === 'dashboard' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('dashboard')}
            className="justify-start rounded-xl"
          >
            <LayoutDashboard className="mr-3 h-4 w-4" />
            Dashboard
          </Button>
          <Button
            variant={activeTab === 'products' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('products')}
            className="justify-start rounded-xl"
          >
            <Package className="mr-3 h-4 w-4" />
            Products
          </Button>
          <Button
            variant={activeTab === 'orders' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('orders')}
            className="justify-start rounded-xl"
          >
            <ShoppingCart className="mr-3 h-4 w-4" />
            Orders
          </Button>
          <Button
            variant={activeTab === 'customers' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('customers')}
            className="justify-start rounded-xl"
          >
            <Users className="mr-3 h-4 w-4" />
            Customers
          </Button>
          <Button
            variant={activeTab === 'discover' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('discover')}
            className="justify-start rounded-xl"
          >
            <Store className="mr-3 h-4 w-4" />
            Discover
          </Button>
          <Button
            variant={activeTab === 'messages' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('messages')}
            className="justify-start rounded-xl"
          >
            <MessageCircle className="mr-3 h-4 w-4" />
            Messages
          </Button>
          <Button
            variant={activeTab === 'analytics' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('analytics')}
            className="justify-start rounded-xl"
          >
            <BarChart3 className="mr-3 h-4 w-4" />
            Analytics
          </Button>
          <Button
            variant={activeTab === 'profile' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('profile')}
            className="justify-start rounded-xl"
          >
            <Edit className="mr-3 h-4 w-4" />
            Profile
          </Button>
          
          {/* Separator */}
          <div className="my-2 border-t border-border" />
          
          <Button
            variant={activeTab === 'settings' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('settings')}
            className="justify-start rounded-xl"
          >
            <Settings className="mr-3 h-4 w-4" />
            Settings
          </Button>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1">
        <div className="mx-auto max-w-[1440px] px-8 py-8">
          {/* Active Tab Title */}
          <div className="mb-6">
            <h2 className="text-2xl text-primary">
              {activeTab === 'dashboard' && 'Dashboard'}
              {activeTab === 'products' && 'Product Inventory'}
              {activeTab === 'orders' && 'Order Management'}
              {activeTab === 'customers' && 'Restaurant Customers'}
              {activeTab === 'discover' && 'Discover Restaurants'}
              {activeTab === 'messages' && 'Messages'}
              {activeTab === 'analytics' && 'Analytics'}
              {activeTab === 'profile' && 'Store Profile'}
              {activeTab === 'settings' && 'Settings'}
            </h2>
          </div>
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <SupplierDashboardTab
            onContactRestaurant={handleContactRestaurant}
            onViewRestaurantProfile={handleViewRestaurantProfile}
            stats={stats}
          />
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div>
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Manage your product catalog and inventory
              </p>
              <Button
                onClick={() => setIsAddProductOpen(true)}
                className="rounded-xl bg-primary hover:bg-primary/90"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </div>
            
            <div className="space-y-4">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-4 rounded-2xl bg-muted/30 p-4 transition-all duration-250 hover:bg-muted/50"
                  >
                    <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl">
                      <ImageWithFallback
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="mb-1">{product.name}</h4>
                      <p className="mb-2 text-sm text-muted-foreground">
                        {product.category}
                      </p>
                      <div className="flex items-center gap-3 text-sm">
                        <span className="text-primary">
                          €{product.price.toFixed(2)}/{product.unit}
                        </span>
                        <Badge variant={getStatusColor(product.status) as any}>
                          {product.status}
                        </Badge>
                        <span className="text-muted-foreground">
                          Stock: {product.stock} {product.unit}
                        </span>
                      </div>
                    </div>
                    <div className="hidden text-right sm:block">
                      <div className="mb-1 text-sm text-muted-foreground">
                        Sales
                      </div>
                      <div>{product.sales} units</div>
                      <div className="text-sm text-primary">
                        {product.revenue}
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="rounded-xl">
                        <DropdownMenuItem className="rounded-lg">
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="rounded-lg">
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ))}
              </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <Card className="rounded-3xl border-0 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
            <Tabs defaultValue="orders-list" className="w-full">
              <div className="border-b border-border px-6 pt-6">
                <TabsList className="inline-flex h-10 rounded-xl bg-muted p-1">
                  <TabsTrigger value="orders-list" className="rounded-lg">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Orders
                  </TabsTrigger>
                  <TabsTrigger value="invoices" className="rounded-lg">
                    <FileText className="mr-2 h-4 w-4" />
                    Invoices
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="orders-list" className="m-0 p-6">
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div
                      key={order.id}
                      className="rounded-2xl bg-muted/30 p-4 transition-all duration-250 hover:bg-muted/50"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="mb-2 flex items-center gap-2">
                            <span className="font-medium">{order.id}</span>
                            <Badge
                              variant={getOrderStatusColor(order.status) as any}
                            >
                              {order.status}
                            </Badge>
                          </div>
                          <button
                            onClick={() => handleViewRestaurantProfile(order.restaurantId)}
                            className="mb-1 flex items-center gap-2 text-sm text-primary transition-colors hover:underline"
                          >
                            <Utensils className="h-4 w-4" />
                            {order.restaurant}
                          </button>
                          <p className="text-sm text-muted-foreground">
                            {order.items.length} items • Delivery: {order.deliveryDate}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <div className="mb-1 text-primary">{order.total}</div>
                            <p className="text-xs text-muted-foreground">
                              {order.date}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              setExpandedOrderId(
                                expandedOrderId === order.id ? null : order.id
                              )
                            }
                            className="h-8 w-8 p-0"
                          >
                            {expandedOrderId === order.id ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>

                      {/* Expanded Order Details */}
                      {expandedOrderId === order.id && (
                        <div className="mt-4 space-y-3 border-t border-border pt-4">
                          <div>
                            <h4 className="mb-2 text-sm font-medium">Order Items</h4>
                            <div className="space-y-2">
                              {order.items.map((item, index) => (
                                <div
                                  key={index}
                                  className="flex items-center justify-between rounded-lg bg-background/50 p-3 text-sm"
                                >
                                  <span>{item.name}</span>
                                  <div className="flex items-center gap-4">
                                    <span className="text-muted-foreground">
                                      {item.quantity}
                                    </span>
                                    <span className="min-w-[60px] text-right text-primary">
                                      {item.price}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          {order.notes && (
                            <div>
                              <h4 className="mb-1 text-sm font-medium">Notes</h4>
                              <p className="text-sm text-muted-foreground">
                                {order.notes}
                              </p>
                            </div>
                          )}
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleContactRestaurant(order.restaurant)}
                              className="rounded-xl"
                            >
                              <MessageCircle className="mr-2 h-4 w-4" />
                              Contact Restaurant
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                handleViewRestaurantProfile(order.restaurantId)
                              }
                              className="rounded-xl"
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              View Profile
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="invoices" className="m-0 p-6">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h4 className="mb-1">Invoice Management</h4>
                    <p className="text-sm text-muted-foreground">
                      Track and manage your invoices
                    </p>
                  </div>
                  <Button className="rounded-xl bg-primary hover:bg-primary/90">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Invoice
                  </Button>
                </div>

                <div className="space-y-4">
                  {invoices.map((invoice) => {
                    const StatusIcon = getInvoiceStatusIcon(invoice.status);
                    return (
                      <div
                        key={invoice.id}
                        className="rounded-2xl bg-muted/30 p-5 transition-all duration-250 hover:bg-muted/50"
                      >
                        <div className="mb-4 flex items-start justify-between">
                          <div className="flex-1">
                            <div className="mb-2 flex items-center gap-2">
                              <h4>{invoice.id}</h4>
                              <Badge
                                variant={
                                  getInvoiceStatusColor(invoice.status) as any
                                }
                                className="flex items-center gap-1"
                              >
                                <StatusIcon className="h-3 w-3" />
                                {invoice.status}
                              </Badge>
                            </div>
                            <p className="mb-1 text-sm text-muted-foreground">
                              Order: {invoice.orderId} • {invoice.restaurant}
                            </p>
                            <p className="text-primary">{invoice.amount}</p>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                              >
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                              align="end"
                              className="rounded-xl"
                            >
                              <DropdownMenuItem className="rounded-lg">
                                <Eye className="mr-2 h-4 w-4" />
                                View Invoice
                              </DropdownMenuItem>
                              <DropdownMenuItem className="rounded-lg">
                                <Download className="mr-2 h-4 w-4" />
                                Download PDF
                              </DropdownMenuItem>
                              {invoice.status !== 'Paid' && (
                                <DropdownMenuItem className="rounded-lg">
                                  <Send className="mr-2 h-4 w-4" />
                                  Send Reminder
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <div className="grid grid-cols-3 gap-4 rounded-xl bg-background/50 p-3 text-sm">
                          <div>
                            <p className="mb-1 text-xs text-muted-foreground">
                              Issue Date
                            </p>
                            <p>{invoice.issueDate}</p>
                          </div>
                          <div>
                            <p className="mb-1 text-xs text-muted-foreground">
                              Due Date
                            </p>
                            <p
                              className={
                                invoice.status === 'Overdue'
                                  ? 'text-destructive'
                                  : ''
                              }
                            >
                              {invoice.dueDate}
                            </p>
                          </div>
                          <div>
                            <p className="mb-1 text-xs text-muted-foreground">
                              Payment Date
                            </p>
                            <p>
                              {invoice.paymentDate
                                ? invoice.paymentDate
                                : '—'}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        )}

        {/* Customers Tab */}
        {activeTab === 'customers' && (
          <div>
            <div className="mb-6">
              <p className="text-sm text-muted-foreground">
                View and manage your restaurant partnerships
              </p>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2">
                {customers.map((customer) => (
                  <div
                    key={customer.id}
                    className="rounded-2xl border-2 border-primary/10 bg-gradient-to-br from-primary/5 to-transparent p-5 transition-all duration-250 hover:border-primary/30"
                  >
                    <div className="mb-4 flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                          {customer.avatar}
                        </div>
                        <div>
                          <h4 className="mb-1">{customer.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {customer.type}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant={customer.status === 'active' ? 'default' : 'outline'}
                      >
                        {customer.status}
                      </Badge>
                    </div>

                    <div className="mb-4 grid grid-cols-3 gap-3 text-sm">
                      <div>
                        <p className="mb-1 text-xs text-muted-foreground">
                          Total Orders
                        </p>
                        <p className="font-medium">{customer.totalOrders}</p>
                      </div>
                      <div>
                        <p className="mb-1 text-xs text-muted-foreground">
                          Total Spent
                        </p>
                        <p className="font-medium text-primary">
                          {customer.totalSpent}
                        </p>
                      </div>
                      <div>
                        <p className="mb-1 text-xs text-muted-foreground">
                          Last Order
                        </p>
                        <p className="font-medium">{customer.lastOrder}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {customer.location}
                    </div>

                    <div className="mt-4 flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleContactRestaurant(customer.name)}
                        className="flex-1 rounded-xl"
                      >
                        <MessageCircle className="mr-2 h-4 w-4" />
                        Message
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleViewRestaurantProfile(customer.id)}
                        className="flex-1 rounded-xl bg-primary hover:bg-primary/90"
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View Profile
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
          </div>
        )}

        {/* Discover Tab */}
        {activeTab === 'discover' && (
          <DiscoverRestaurantsPage
            onViewRestaurant={handleViewRestaurantProfile}
            onContactRestaurant={handleContactRestaurant}
          />
        )}

        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <MessagesPage />
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <Card className="rounded-3xl border-0 p-8 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
            <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
              <BarChart3 className="mb-4 h-16 w-16 text-muted-foreground/30" />
              <h3 className="mb-2 text-xl text-primary">Analytics Dashboard</h3>
              <p className="max-w-md text-muted-foreground">
                Detailed analytics and insights about your sales, revenue trends,
                and customer behavior will be displayed here.
              </p>
            </div>
          </Card>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <Card className="overflow-hidden rounded-3xl border-0 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
            <div className="bg-gradient-to-br from-primary/10 to-accent/5 p-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <h2 className="text-2xl text-primary">{supplierInfo.name}</h2>
                    {supplierInfo.verified && (
                      <Badge className="bg-primary">Verified</Badge>
                    )}
                  </div>
                  <p className="mb-1 text-muted-foreground">
                    {supplierInfo.category}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {supplierInfo.location}
                  </p>
                </div>
                <Button
                  onClick={() => setIsEditStoreOpen(true)}
                  className="rounded-xl bg-primary hover:bg-primary/90"
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Store Profile
                </Button>
              </div>
            </div>
            <div className="p-6">
              <p className="mb-4 leading-relaxed text-foreground">
                {supplierInfo.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {supplierInfo.certifications.map((cert, index) => (
                  <Badge key={index} variant="outline">
                    {cert}
                  </Badge>
                ))}
              </div>

              {/* Additional Profile Details */}
              <div className="mt-6 space-y-4 border-t border-border pt-6">
                <h3 className="text-lg">Contact Information</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex items-center gap-3 rounded-xl bg-muted/30 p-4">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Email</p>
                      <p className="text-sm">{supplierInfo.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-xl bg-muted/30 p-4">
                    <Phone className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Phone</p>
                      <p className="text-sm">{supplierInfo.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-xl bg-muted/30 p-4">
                    <Globe className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Website</p>
                      <p className="text-sm">{supplierInfo.website}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-xl bg-muted/30 p-4">
                    <MapPin className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Location</p>
                      <p className="text-sm">{supplierInfo.location}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Store Stats */}
              <div className="mt-6 space-y-4 border-t border-border pt-6">
                <h3 className="text-lg">Store Statistics</h3>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-xl bg-muted/30 p-4">
                    <p className="mb-1 text-xs text-muted-foreground">Rating</p>
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 fill-accent text-accent" />
                      <span className="text-lg">{supplierInfo.rating}</span>
                      <span className="text-xs text-muted-foreground">
                        ({supplierInfo.totalReviews} reviews)
                      </span>
                    </div>
                  </div>
                  <div className="rounded-xl bg-muted/30 p-4">
                    <p className="mb-1 text-xs text-muted-foreground">Member Since</p>
                    <p className="text-lg">{supplierInfo.memberSince}</p>
                  </div>
                  <div className="rounded-xl bg-muted/30 p-4">
                    <p className="mb-1 text-xs text-muted-foreground">Status</p>
                    <p className="text-lg">
                      {supplierInfo.verified ? 'Verified' : 'Unverified'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            {/* Account Settings */}
            <Card className="rounded-3xl border-0 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
              <div className="border-b border-border p-6">
                <h3 className="text-xl">Account Settings</h3>
                <p className="text-sm text-muted-foreground">
                  Manage your account preferences and security
                </p>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between rounded-2xl bg-muted/30 p-4">
                    <div>
                      <h4 className="mb-1">Email Notifications</h4>
                      <p className="text-sm text-muted-foreground">
                        Receive email updates about orders and messages
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between rounded-2xl bg-muted/30 p-4">
                    <div>
                      <h4 className="mb-1">Order Alerts</h4>
                      <p className="text-sm text-muted-foreground">
                        Get notified when new orders are placed
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between rounded-2xl bg-muted/30 p-4">
                    <div>
                      <h4 className="mb-1">Marketing Emails</h4>
                      <p className="text-sm text-muted-foreground">
                        Receive updates about new features and tips
                      </p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between rounded-2xl bg-muted/30 p-4">
                    <div>
                      <h4 className="mb-1">Low Stock Alerts</h4>
                      <p className="text-sm text-muted-foreground">
                        Get notified when products are running low
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            </Card>

            {/* Privacy & Security */}
            <Card className="rounded-3xl border-0 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
              <div className="border-b border-border p-6">
                <h3 className="text-xl">Privacy & Security</h3>
                <p className="text-sm text-muted-foreground">
                  Manage your privacy and security settings
                </p>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <Button
                    variant="outline"
                    className="w-full justify-start rounded-xl"
                    onClick={() => toast.success('Password change functionality coming soon!')}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Change Password
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start rounded-xl"
                    onClick={() => toast.success('Two-factor authentication coming soon!')}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Enable Two-Factor Authentication
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start rounded-xl"
                    onClick={() => toast.success('Privacy settings updated!')}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Privacy Settings
                  </Button>
                </div>
              </div>
            </Card>

            {/* Support & Help */}
            <Card className="rounded-3xl border-0 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
              <div className="border-b border-border p-6">
                <h3 className="text-xl">Support & Help</h3>
                <p className="text-sm text-muted-foreground">
                  Get help and support resources
                </p>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <Button
                    variant="outline"
                    className="w-full justify-start rounded-xl"
                    onClick={() => toast.success('Opening help center...')}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Help Center
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start rounded-xl"
                    onClick={() => toast.success('Opening contact support...')}
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Contact Support
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start rounded-xl"
                    onClick={() => toast.success('Opening terms of service...')}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Terms of Service
                  </Button>
                </div>
              </div>
            </Card>

            {/* Danger Zone */}
            <Card className="overflow-hidden rounded-3xl border-0 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
              <div className="border-b border-border bg-destructive/5 p-6">
                <h3 className="text-xl text-destructive">Danger Zone</h3>
                <p className="text-sm text-muted-foreground">
                  Irreversible actions for your account
                </p>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <Button
                    variant="destructive"
                    className="w-full rounded-xl"
                    onClick={onLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full rounded-xl border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                    onClick={() => {
                      if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
                        toast.error('Account deletion functionality coming soon');
                      }
                    }}
                  >
                    <AlertCircle className="mr-2 h-4 w-4" />
                    Delete Account
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
        </div>
      </main>

      {/* Add Product Dialog */}
      <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
        <DialogContent className="max-w-2xl rounded-3xl">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
            <DialogDescription>
              Add a new product to your inventory.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                className="col-span-3 rounded-xl"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category">Category</Label>
              <Select
                value={newProduct.category}
                onValueChange={(value) =>
                  setNewProduct({ ...newProduct, category: value })
                }
              >
                <SelectTrigger className="col-span-3 rounded-xl">
                  <SelectValue placeholder="Select a category">
                    {newProduct.category}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="Vegetables">Vegetables</SelectItem>
                  <SelectItem value="Fruits">Fruits</SelectItem>
                  <SelectItem value="Dairy">Dairy</SelectItem>
                  <SelectItem value="Meat">Meat</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price">Price (€)</Label>
              <Input
                id="price"
                type="number"
                step="0.1"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
                className="col-span-3 rounded-xl"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="unit">Unit</Label>
              <Select
                value={newProduct.unit}
                onValueChange={(value) => setNewProduct({ ...newProduct, unit: value })}
              >
                <SelectTrigger className="col-span-3 rounded-xl">
                  <SelectValue placeholder="Select a unit">
                    {newProduct.unit}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="kg">kg</SelectItem>
                  <SelectItem value="g">g</SelectItem>
                  <SelectItem value="l">l</SelectItem>
                  <SelectItem value="ml">ml</SelectItem>
                  <SelectItem value="piece">piece</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="stock">Stock</Label>
              <Input
                id="stock"
                type="number"
                value={newProduct.stock}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, stock: e.target.value })
                }
                className="col-span-3 rounded-xl"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input
                id="imageUrl"
                value={newProduct.imageUrl}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, imageUrl: e.target.value })
                }
                className="col-span-3 rounded-xl"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsAddProductOpen(false)}
              className="rounded-xl"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleAddProduct}
              disabled={
                !newProduct.name ||
                !newProduct.price ||
                !newProduct.stock ||
                !newProduct.imageUrl
              }
              className="rounded-xl bg-primary hover:bg-primary/90"
            >
              Add Product
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Store Dialog */}
      <EditStoreDialog
        open={isEditStoreOpen}
        onOpenChange={setIsEditStoreOpen}
        supplierInfo={supplierInfo}
        products={products}
        onSave={(updatedInfo, updatedProducts) => {
          setSupplierInfo(updatedInfo);
          setProducts(updatedProducts);
        }}
      />
    </div>
  );
}