import { useState } from 'react';
import {
  Store,
  MapPin,
  Phone,
  Mail,
  Globe,
  Package,
  Clock,
  Truck,
  Award,
  Plus,
  X,
  Upload,
  Edit,
  Trash2,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { Card } from './ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  unit: string;
  stock: number;
  status: string;
  image: string;
  description?: string;
}

interface SupplierInfo {
  name: string;
  category: string;
  location: string;
  description: string;
  email: string;
  phone: string;
  website: string;
  certifications: string[];
  rating: number;
  totalReviews: number;
  memberSince: string;
  verified: boolean;
}

interface EditStoreDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  supplierInfo: SupplierInfo;
  products: Product[];
  onSave: (updatedInfo: SupplierInfo, updatedProducts: Product[]) => void;
}

export function EditStoreDialog({
  open,
  onOpenChange,
  supplierInfo,
  products,
  onSave,
}: EditStoreDialogProps) {
  const [activeTab, setActiveTab] = useState('basic');
  
  // Basic Info
  const [storeName, setStoreName] = useState(supplierInfo.name);
  const [storeCategory, setStoreCategory] = useState(supplierInfo.category);
  const [location, setLocation] = useState(supplierInfo.location);
  const [description, setDescription] = useState(supplierInfo.description);

  // Contact Info
  const [email, setEmail] = useState(supplierInfo.email);
  const [phone, setPhone] = useState(supplierInfo.phone);
  const [website, setWebsite] = useState(supplierInfo.website);

  // Certifications
  const [certifications, setCertifications] = useState<string[]>(
    supplierInfo.certifications
  );
  const [newCertification, setNewCertification] = useState('');

  // Products
  const [editableProducts, setEditableProducts] = useState<Product[]>(products);
  const [editingProductId, setEditingProductId] = useState<number | null>(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    price: '',
    unit: 'kg',
    stock: '',
    image: '',
    description: '',
  });

  // Operating Hours
  const [operatingHours, setOperatingHours] = useState({
    monday: { open: '08:00', close: '18:00', closed: false },
    tuesday: { open: '08:00', close: '18:00', closed: false },
    wednesday: { open: '08:00', close: '18:00', closed: false },
    thursday: { open: '08:00', close: '18:00', closed: false },
    friday: { open: '08:00', close: '18:00', closed: false },
    saturday: { open: '09:00', close: '14:00', closed: false },
    sunday: { open: '00:00', close: '00:00', closed: true },
  });

  // Delivery Info
  const [deliveryInfo, setDeliveryInfo] = useState({
    minimumOrder: '100',
    deliveryFee: '10',
    freeDeliveryOver: '200',
    deliveryRadius: '25',
    leadTime: '24',
  });

  const categories = [
    'Organic Vegetables',
    'Fresh Fruits',
    'Dairy Products',
    'Artisan Bakery',
    'Meat & Poultry',
    'Seafood',
    'Herbs & Spices',
    'Oils & Preserves',
    'Beverages',
    'Other',
  ];

  const availableCertifications = [
    'Organic Certified',
    'Local Producer',
    'Fair Trade',
    'Non-GMO',
    'Sustainable Farming',
    'Farm to Table',
    'Traceable',
    'Animal Welfare Certified',
    'Pesticide Free',
  ];

  const productCategories = [
    'Vegetables',
    'Fruits',
    'Dairy',
    'Meat',
    'Seafood',
    'Bakery',
    'Herbs',
    'Oils',
    'Beverages',
    'Other',
  ];

  const units = ['kg', 'g', 'l', 'ml', 'piece', 'bunch', 'dozen', 'lb'];

  const handleAddCertification = (cert: string) => {
    if (!certifications.includes(cert)) {
      setCertifications([...certifications, cert]);
    }
  };

  const handleRemoveCertification = (cert: string) => {
    setCertifications(certifications.filter((c) => c !== cert));
  };

  const handleAddCustomCertification = () => {
    if (newCertification && !certifications.includes(newCertification)) {
      setCertifications([...certifications, newCertification]);
      setNewCertification('');
    }
  };

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.category || !newProduct.price || !newProduct.stock) {
      toast.error('Please fill in all required fields');
      return;
    }

    const product: Product = {
      id: Date.now(),
      name: newProduct.name,
      category: newProduct.category,
      price: parseFloat(newProduct.price),
      unit: newProduct.unit,
      stock: parseInt(newProduct.stock),
      status: parseInt(newProduct.stock) > 20 ? 'In Stock' : parseInt(newProduct.stock) > 0 ? 'Low Stock' : 'Out of Stock',
      image: newProduct.image || 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400',
      description: newProduct.description,
    };

    setEditableProducts([...editableProducts, product]);
    setNewProduct({
      name: '',
      category: '',
      price: '',
      unit: 'kg',
      stock: '',
      image: '',
      description: '',
    });
    toast.success('Product added successfully!');
  };

  const handleDeleteProduct = (id: number) => {
    setEditableProducts(editableProducts.filter((p) => p.id !== id));
    toast.success('Product removed');
  };

  const handleSave = () => {
    const updatedInfo: SupplierInfo = {
      ...supplierInfo,
      name: storeName,
      category: storeCategory,
      location,
      description,
      email,
      phone,
      website,
      certifications,
    };

    onSave(updatedInfo, editableProducts);
    toast.success('Store information updated successfully!');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[95vw] w-[95vw] max-h-[95vh] overflow-hidden rounded-3xl p-0">
        <DialogHeader className="border-b border-border p-6 pb-4">
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Store className="h-6 w-6 text-primary" />
            Edit Store Profile
          </DialogTitle>
          <DialogDescription>
            Manage your store information, products, and settings
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
          <div className="border-b border-border px-6">
            <TabsList className="inline-flex h-12 rounded-xl bg-muted p-1">
              <TabsTrigger value="basic" className="rounded-lg">
                <Store className="mr-2 h-4 w-4" />
                Basic Info
              </TabsTrigger>
              <TabsTrigger value="contact" className="rounded-lg">
                <Phone className="mr-2 h-4 w-4" />
                Contact
              </TabsTrigger>
              <TabsTrigger value="products" className="rounded-lg">
                <Package className="mr-2 h-4 w-4" />
                Products
              </TabsTrigger>
              <TabsTrigger value="certifications" className="rounded-lg">
                <Award className="mr-2 h-4 w-4" />
                Credentials
              </TabsTrigger>
              <TabsTrigger value="hours" className="rounded-lg">
                <Clock className="mr-2 h-4 w-4" />
                Hours
              </TabsTrigger>
              <TabsTrigger value="delivery" className="rounded-lg">
                <Truck className="mr-2 h-4 w-4" />
                Delivery
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="overflow-y-auto p-6" style={{ maxHeight: 'calc(90vh - 200px)' }}>
            {/* Basic Info Tab */}
            <TabsContent value="basic" className="m-0 space-y-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="store-name">Store Name *</Label>
                  <Input
                    id="store-name"
                    value={storeName}
                    onChange={(e) => setStoreName(e.target.value)}
                    className="rounded-xl"
                    placeholder="e.g., Green Valley Farm"
                  />
                </div>

                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select value={storeCategory} onValueChange={setStoreCategory}>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="location">Location *</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="rounded-xl pl-10"
                      placeholder="e.g., Valley Ridge, 12 km from city center"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Store Description *</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="rounded-xl"
                    rows={4}
                    placeholder="Tell customers about your store, farming practices, and what makes you special..."
                  />
                  <p className="mt-1 text-xs text-muted-foreground">
                    {description.length}/500 characters
                  </p>
                </div>
              </div>
            </TabsContent>

            {/* Contact Tab */}
            <TabsContent value="contact" className="m-0 space-y-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="rounded-xl pl-10"
                      placeholder="contact@yourfarm.com"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="rounded-xl pl-10"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="website">Website (Optional)</Label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="website"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      className="rounded-xl pl-10"
                      placeholder="www.yourfarm.com"
                    />
                  </div>
                </div>

                <Card className="rounded-2xl border-primary/20 bg-primary/5 p-4">
                  <p className="text-sm text-muted-foreground">
                    <strong>Note:</strong> This contact information will be visible to
                    restaurants on your public profile. Make sure it's accurate and
                    monitored regularly.
                  </p>
                </Card>
              </div>
            </TabsContent>

            {/* Products Tab */}
            <TabsContent value="products" className="m-0 space-y-4">
              <div className="space-y-6">
                {/* Add New Product */}
                <Card className="rounded-2xl border-2 border-dashed border-primary/30 bg-primary/5 p-5">
                  <h4 className="mb-4 flex items-center gap-2 font-medium">
                    <Plus className="h-4 w-4" />
                    Add New Product
                  </h4>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="product-name">Product Name *</Label>
                      <Input
                        id="product-name"
                        value={newProduct.name}
                        onChange={(e) =>
                          setNewProduct({ ...newProduct, name: e.target.value })
                        }
                        className="rounded-xl"
                        placeholder="e.g., Heirloom Tomatoes"
                      />
                    </div>
                    <div>
                      <Label htmlFor="product-category">Category *</Label>
                      <Select
                        value={newProduct.category}
                        onValueChange={(value) =>
                          setNewProduct({ ...newProduct, category: value })
                        }
                      >
                        <SelectTrigger className="rounded-xl">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                          {productCategories.map((cat) => (
                            <SelectItem key={cat} value={cat}>
                              {cat}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="product-price">Price (€) *</Label>
                      <Input
                        id="product-price"
                        type="number"
                        step="0.01"
                        value={newProduct.price}
                        onChange={(e) =>
                          setNewProduct({ ...newProduct, price: e.target.value })
                        }
                        className="rounded-xl"
                        placeholder="4.50"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label htmlFor="product-stock">Stock *</Label>
                        <Input
                          id="product-stock"
                          type="number"
                          value={newProduct.stock}
                          onChange={(e) =>
                            setNewProduct({ ...newProduct, stock: e.target.value })
                          }
                          className="rounded-xl"
                          placeholder="100"
                        />
                      </div>
                      <div>
                        <Label htmlFor="product-unit">Unit *</Label>
                        <Select
                          value={newProduct.unit}
                          onValueChange={(value) =>
                            setNewProduct({ ...newProduct, unit: value })
                          }
                        >
                          <SelectTrigger className="rounded-xl">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl">
                            {units.map((unit) => (
                              <SelectItem key={unit} value={unit}>
                                {unit}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="product-image">Image URL (Optional)</Label>
                      <Input
                        id="product-image"
                        value={newProduct.image}
                        onChange={(e) =>
                          setNewProduct({ ...newProduct, image: e.target.value })
                        }
                        className="rounded-xl"
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="product-description">
                        Description (Optional)
                      </Label>
                      <Textarea
                        id="product-description"
                        value={newProduct.description}
                        onChange={(e) =>
                          setNewProduct({ ...newProduct, description: e.target.value })
                        }
                        className="rounded-xl"
                        rows={2}
                        placeholder="Brief description of the product..."
                      />
                    </div>
                  </div>
                  <Button
                    onClick={handleAddProduct}
                    className="mt-4 rounded-xl bg-primary hover:bg-primary/90"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Product
                  </Button>
                </Card>

                {/* Current Products */}
                <div>
                  <h4 className="mb-3 font-medium">
                    Current Products ({editableProducts.length})
                  </h4>
                  {editableProducts.length === 0 ? (
                    <Card className="rounded-2xl border-dashed p-8 text-center">
                      <Package className="mx-auto mb-2 h-12 w-12 text-muted-foreground/30" />
                      <p className="text-sm text-muted-foreground">
                        No products yet. Add your first product above.
                      </p>
                    </Card>
                  ) : (
                    <div className="space-y-3">
                      {editableProducts.map((product) => (
                        <Card
                          key={product.id}
                          className="flex items-center gap-4 rounded-2xl p-4 transition-all duration-250 hover:border-primary/30"
                        >
                          <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl bg-muted">
                            <ImageWithFallback
                              src={product.image}
                              alt={product.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h5 className="mb-1 font-medium">{product.name}</h5>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <span>{product.category}</span>
                              <span>•</span>
                              <span className="text-primary">
                                €{product.price.toFixed(2)}/{product.unit}
                              </span>
                              <span>•</span>
                              <span>
                                Stock: {product.stock} {product.unit}
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 rounded-lg p-0"
                              onClick={() => toast.info('Edit functionality coming soon')}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 rounded-lg p-0 text-destructive hover:text-destructive"
                              onClick={() => handleDeleteProduct(product.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            {/* Certifications Tab */}
            <TabsContent value="certifications" className="m-0 space-y-4">
              <div className="space-y-6">
                <div>
                  <h4 className="mb-3 font-medium">Available Certifications</h4>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Select all certifications and credentials that apply to your farm
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {availableCertifications.map((cert) => (
                      <Card
                        key={cert}
                        className={`cursor-pointer rounded-xl p-4 transition-all duration-250 ${
                          certifications.includes(cert)
                            ? 'border-2 border-primary bg-primary/5'
                            : 'border hover:border-primary/30'
                        }`}
                        onClick={() =>
                          certifications.includes(cert)
                            ? handleRemoveCertification(cert)
                            : handleAddCertification(cert)
                        }
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Award
                              className={`h-4 w-4 ${
                                certifications.includes(cert)
                                  ? 'text-primary'
                                  : 'text-muted-foreground'
                              }`}
                            />
                            <span
                              className={
                                certifications.includes(cert) ? 'font-medium' : ''
                              }
                            >
                              {cert}
                            </span>
                          </div>
                          {certifications.includes(cert) && (
                            <Badge className="bg-primary">Selected</Badge>
                          )}
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="mb-3 font-medium">Add Custom Certification</h4>
                  <div className="flex gap-2">
                    <Input
                      value={newCertification}
                      onChange={(e) => setNewCertification(e.target.value)}
                      className="rounded-xl"
                      placeholder="Enter certification name"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleAddCustomCertification();
                        }
                      }}
                    />
                    <Button
                      onClick={handleAddCustomCertification}
                      className="rounded-xl"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add
                    </Button>
                  </div>
                </div>

                {certifications.length > 0 && (
                  <div>
                    <h4 className="mb-3 font-medium">Selected Certifications</h4>
                    <div className="flex flex-wrap gap-2">
                      {certifications.map((cert) => (
                        <Badge
                          key={cert}
                          variant="outline"
                          className="flex items-center gap-2 rounded-xl px-3 py-1.5"
                        >
                          {cert}
                          <button
                            onClick={() => handleRemoveCertification(cert)}
                            className="ml-1 hover:text-destructive"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Operating Hours Tab */}
            <TabsContent value="hours" className="m-0 space-y-4">
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Set your operating hours for order processing and customer inquiries
                </p>
                {Object.entries(operatingHours).map(([day, hours]) => (
                  <Card key={day} className="rounded-2xl p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-24">
                          <span className="font-medium capitalize">{day}</span>
                        </div>
                        {!hours.closed ? (
                          <div className="flex items-center gap-2">
                            <Input
                              type="time"
                              value={hours.open}
                              onChange={(e) =>
                                setOperatingHours({
                                  ...operatingHours,
                                  [day]: { ...hours, open: e.target.value },
                                })
                              }
                              className="w-32 rounded-xl"
                            />
                            <span className="text-muted-foreground">to</span>
                            <Input
                              type="time"
                              value={hours.close}
                              onChange={(e) =>
                                setOperatingHours({
                                  ...operatingHours,
                                  [day]: { ...hours, close: e.target.value },
                                })
                              }
                              className="w-32 rounded-xl"
                            />
                          </div>
                        ) : (
                          <span className="text-muted-foreground">Closed</span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Label htmlFor={`closed-${day}`} className="text-sm">
                          Closed
                        </Label>
                        <Switch
                          id={`closed-${day}`}
                          checked={hours.closed}
                          onCheckedChange={(checked) =>
                            setOperatingHours({
                              ...operatingHours,
                              [day]: { ...hours, closed: checked },
                            })
                          }
                        />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Delivery Tab */}
            <TabsContent value="delivery" className="m-0 space-y-4">
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="min-order">Minimum Order (€)</Label>
                    <Input
                      id="min-order"
                      type="number"
                      value={deliveryInfo.minimumOrder}
                      onChange={(e) =>
                        setDeliveryInfo({
                          ...deliveryInfo,
                          minimumOrder: e.target.value,
                        })
                      }
                      className="rounded-xl"
                    />
                  </div>
                  <div>
                    <Label htmlFor="delivery-fee">Delivery Fee (€)</Label>
                    <Input
                      id="delivery-fee"
                      type="number"
                      value={deliveryInfo.deliveryFee}
                      onChange={(e) =>
                        setDeliveryInfo({
                          ...deliveryInfo,
                          deliveryFee: e.target.value,
                        })
                      }
                      className="rounded-xl"
                    />
                  </div>
                  <div>
                    <Label htmlFor="free-delivery">Free Delivery Over (€)</Label>
                    <Input
                      id="free-delivery"
                      type="number"
                      value={deliveryInfo.freeDeliveryOver}
                      onChange={(e) =>
                        setDeliveryInfo({
                          ...deliveryInfo,
                          freeDeliveryOver: e.target.value,
                        })
                      }
                      className="rounded-xl"
                    />
                  </div>
                  <div>
                    <Label htmlFor="delivery-radius">Delivery Radius (km)</Label>
                    <Input
                      id="delivery-radius"
                      type="number"
                      value={deliveryInfo.deliveryRadius}
                      onChange={(e) =>
                        setDeliveryInfo({
                          ...deliveryInfo,
                          deliveryRadius: e.target.value,
                        })
                      }
                      className="rounded-xl"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="lead-time">Lead Time (hours)</Label>
                    <Input
                      id="lead-time"
                      type="number"
                      value={deliveryInfo.leadTime}
                      onChange={(e) =>
                        setDeliveryInfo({
                          ...deliveryInfo,
                          leadTime: e.target.value,
                        })
                      }
                      className="rounded-xl"
                    />
                    <p className="mt-1 text-xs text-muted-foreground">
                      How much notice you need before fulfilling an order
                    </p>
                  </div>
                </div>

                <Card className="rounded-2xl border-primary/20 bg-primary/5 p-4">
                  <h4 className="mb-2 font-medium">Delivery Summary</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Minimum order: €{deliveryInfo.minimumOrder}</li>
                    <li>• Delivery fee: €{deliveryInfo.deliveryFee}</li>
                    <li>
                      • Free delivery on orders over €{deliveryInfo.freeDeliveryOver}
                    </li>
                    <li>• Delivery within {deliveryInfo.deliveryRadius} km radius</li>
                    <li>• {deliveryInfo.leadTime} hours lead time required</li>
                  </ul>
                </Card>
              </div>
            </TabsContent>
          </div>
        </Tabs>

        {/* Footer Actions */}
        <div className="flex items-center justify-between border-t border-border p-6">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="rounded-xl"
          >
            Cancel
          </Button>
          <Button onClick={handleSave} className="rounded-xl bg-primary hover:bg-primary/90">
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}