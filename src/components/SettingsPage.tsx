import { useState } from 'react';
import { 
  User, 
  Bell, 
  Lock, 
  CreditCard, 
  MapPin, 
  Mail, 
  Phone, 
  Building2,
  Save,
  Eye,
  EyeOff
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { toast } from 'sonner@2.0.3';

export function SettingsPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  
  // Account settings state
  const [accountData, setAccountData] = useState({
    fullName: 'John Smith',
    email: 'john@labelacucina.com',
    phone: '+1 (555) 123-4567',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Restaurant settings state
  const [restaurantData, setRestaurantData] = useState({
    name: 'La Bella Cucina',
    address: '123 Main Street',
    city: 'Downtown',
    postalCode: '10001',
    country: 'United States',
    taxId: 'US123456789',
  });

  // Notification settings state
  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    newProducts: true,
    promotions: false,
    weeklyDigest: true,
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
  });

  // Ordering preferences state
  const [orderingPrefs, setOrderingPrefs] = useState({
    autoReorder: false,
    savedPaymentMethod: true,
    requireApproval: true,
    defaultDeliveryTime: 'morning',
  });

  const handleSaveAccount = () => {
    if (accountData.newPassword && accountData.newPassword !== accountData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    toast.success('Account settings saved', {
      description: 'Your account information has been updated',
    });
  };

  const handleSaveRestaurant = () => {
    toast.success('Restaurant settings saved', {
      description: 'Your restaurant information has been updated',
    });
  };

  const handleSaveNotifications = () => {
    toast.success('Notification preferences saved', {
      description: 'Your notification settings have been updated',
    });
  };

  const handleSaveOrdering = () => {
    toast.success('Ordering preferences saved', {
      description: 'Your ordering preferences have been updated',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-[1200px] px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>

        {/* Settings Tabs */}
        <Tabs defaultValue="account" className="w-full">
          <TabsList className="mb-8 inline-flex h-12 rounded-2xl bg-muted p-1">
            <TabsTrigger value="account" className="rounded-xl">
              <User className="mr-2 h-4 w-4" />
              Account
            </TabsTrigger>
            <TabsTrigger value="restaurant" className="rounded-xl">
              <Building2 className="mr-2 h-4 w-4" />
              Restaurant
            </TabsTrigger>
            <TabsTrigger value="notifications" className="rounded-xl">
              <Bell className="mr-2 h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="ordering" className="rounded-xl">
              <CreditCard className="mr-2 h-4 w-4" />
              Ordering
            </TabsTrigger>
          </TabsList>

          {/* Account Tab */}
          <TabsContent value="account" className="space-y-6">
            <Card className="rounded-3xl border-0 p-8 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
              <div className="mb-6">
                <h2 className="mb-2">Account Information</h2>
                <p className="text-sm text-muted-foreground">
                  Update your personal account details
                </p>
              </div>

              <div className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      value={accountData.fullName}
                      onChange={(e) =>
                        setAccountData({ ...accountData, fullName: e.target.value })
                      }
                      className="rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        value={accountData.email}
                        onChange={(e) =>
                          setAccountData({ ...accountData, email: e.target.value })
                        }
                        className="rounded-xl pl-10"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      value={accountData.phone}
                      onChange={(e) =>
                        setAccountData({ ...accountData, phone: e.target.value })
                      }
                      className="rounded-xl pl-10"
                    />
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="mb-4">
                  <h3 className="mb-2">Change Password</h3>
                  <p className="text-sm text-muted-foreground">
                    Leave blank to keep your current password
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="currentPassword"
                        type={showPassword ? 'text' : 'password'}
                        value={accountData.currentPassword}
                        onChange={(e) =>
                          setAccountData({ ...accountData, currentPassword: e.target.value })
                        }
                        className="rounded-xl pl-10 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="newPassword"
                          type={showNewPassword ? 'text' : 'password'}
                          value={accountData.newPassword}
                          onChange={(e) =>
                            setAccountData({ ...accountData, newPassword: e.target.value })
                          }
                          className="rounded-xl pl-10 pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showNewPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={accountData.confirmPassword}
                        onChange={(e) =>
                          setAccountData({ ...accountData, confirmPassword: e.target.value })
                        }
                        className="rounded-xl"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button
                    onClick={handleSaveAccount}
                    className="rounded-xl bg-primary hover:bg-primary/90"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Restaurant Tab */}
          <TabsContent value="restaurant" className="space-y-6">
            <Card className="rounded-3xl border-0 p-8 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
              <div className="mb-6">
                <h2 className="mb-2">Restaurant Information</h2>
                <p className="text-sm text-muted-foreground">
                  Manage your restaurant's business details
                </p>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="restaurantName">Restaurant Name</Label>
                  <Input
                    id="restaurantName"
                    value={restaurantData.name}
                    onChange={(e) =>
                      setRestaurantData({ ...restaurantData, name: e.target.value })
                    }
                    className="rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Street Address</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="address"
                      value={restaurantData.address}
                      onChange={(e) =>
                        setRestaurantData({ ...restaurantData, address: e.target.value })
                      }
                      className="rounded-xl pl-10"
                    />
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={restaurantData.city}
                      onChange={(e) =>
                        setRestaurantData({ ...restaurantData, city: e.target.value })
                      }
                      className="rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input
                      id="postalCode"
                      value={restaurantData.postalCode}
                      onChange={(e) =>
                        setRestaurantData({ ...restaurantData, postalCode: e.target.value })
                      }
                      className="rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      value={restaurantData.country}
                      onChange={(e) =>
                        setRestaurantData({ ...restaurantData, country: e.target.value })
                      }
                      className="rounded-xl"
                    />
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="space-y-2">
                  <Label htmlFor="taxId">Tax ID / Business Number</Label>
                  <Input
                    id="taxId"
                    value={restaurantData.taxId}
                    onChange={(e) =>
                      setRestaurantData({ ...restaurantData, taxId: e.target.value })
                    }
                    className="rounded-xl"
                  />
                  <p className="text-xs text-muted-foreground">
                    Required for invoicing and tax purposes
                  </p>
                </div>

                <div className="flex justify-end pt-4">
                  <Button
                    onClick={handleSaveRestaurant}
                    className="rounded-xl bg-primary hover:bg-primary/90"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card className="rounded-3xl border-0 p-8 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
              <div className="mb-6">
                <h2 className="mb-2">Notification Preferences</h2>
                <p className="text-sm text-muted-foreground">
                  Choose how you want to be notified about updates
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="mb-4">Email Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between rounded-xl bg-muted/30 p-4">
                      <div>
                        <p className="font-medium">Order Updates</p>
                        <p className="text-sm text-muted-foreground">
                          Get notified when your order status changes
                        </p>
                      </div>
                      <Switch
                        checked={notifications.orderUpdates}
                        onCheckedChange={(checked) =>
                          setNotifications({ ...notifications, orderUpdates: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between rounded-xl bg-muted/30 p-4">
                      <div>
                        <p className="font-medium">New Products</p>
                        <p className="text-sm text-muted-foreground">
                          Be the first to know about new products from your suppliers
                        </p>
                      </div>
                      <Switch
                        checked={notifications.newProducts}
                        onCheckedChange={(checked) =>
                          setNotifications({ ...notifications, newProducts: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between rounded-xl bg-muted/30 p-4">
                      <div>
                        <p className="font-medium">Promotions & Deals</p>
                        <p className="text-sm text-muted-foreground">
                          Receive exclusive offers and special promotions
                        </p>
                      </div>
                      <Switch
                        checked={notifications.promotions}
                        onCheckedChange={(checked) =>
                          setNotifications({ ...notifications, promotions: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between rounded-xl bg-muted/30 p-4">
                      <div>
                        <p className="font-medium">Weekly Digest</p>
                        <p className="text-sm text-muted-foreground">
                          Summary of your activity and recommendations
                        </p>
                      </div>
                      <Switch
                        checked={notifications.weeklyDigest}
                        onCheckedChange={(checked) =>
                          setNotifications({ ...notifications, weeklyDigest: checked })
                        }
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="mb-4">Delivery Channels</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between rounded-xl bg-muted/30 p-4">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications via email
                        </p>
                      </div>
                      <Switch
                        checked={notifications.emailNotifications}
                        onCheckedChange={(checked) =>
                          setNotifications({ ...notifications, emailNotifications: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between rounded-xl bg-muted/30 p-4">
                      <div>
                        <p className="font-medium">SMS Notifications</p>
                        <p className="text-sm text-muted-foreground">
                          Get important updates via text message
                        </p>
                      </div>
                      <Switch
                        checked={notifications.smsNotifications}
                        onCheckedChange={(checked) =>
                          setNotifications({ ...notifications, smsNotifications: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between rounded-xl bg-muted/30 p-4">
                      <div>
                        <p className="font-medium">Push Notifications</p>
                        <p className="text-sm text-muted-foreground">
                          Browser notifications for instant updates
                        </p>
                      </div>
                      <Switch
                        checked={notifications.pushNotifications}
                        onCheckedChange={(checked) =>
                          setNotifications({ ...notifications, pushNotifications: checked })
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button
                    onClick={handleSaveNotifications}
                    className="rounded-xl bg-primary hover:bg-primary/90"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Save Preferences
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Ordering Tab */}
          <TabsContent value="ordering" className="space-y-6">
            <Card className="rounded-3xl border-0 p-8 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
              <div className="mb-6">
                <h2 className="mb-2">Ordering Preferences</h2>
                <p className="text-sm text-muted-foreground">
                  Customize your ordering experience
                </p>
              </div>

              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between rounded-xl bg-muted/30 p-4">
                    <div>
                      <p className="font-medium">Auto-Reorder Favorites</p>
                      <p className="text-sm text-muted-foreground">
                        Automatically reorder frequently purchased items
                      </p>
                    </div>
                    <Switch
                      checked={orderingPrefs.autoReorder}
                      onCheckedChange={(checked) =>
                        setOrderingPrefs({ ...orderingPrefs, autoReorder: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between rounded-xl bg-muted/30 p-4">
                    <div>
                      <p className="font-medium">Save Payment Method</p>
                      <p className="text-sm text-muted-foreground">
                        Save your payment information for faster checkout
                      </p>
                    </div>
                    <Switch
                      checked={orderingPrefs.savedPaymentMethod}
                      onCheckedChange={(checked) =>
                        setOrderingPrefs({ ...orderingPrefs, savedPaymentMethod: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between rounded-xl bg-muted/30 p-4">
                    <div>
                      <p className="font-medium">Require Order Approval</p>
                      <p className="text-sm text-muted-foreground">
                        Orders must be approved before being sent to suppliers
                      </p>
                    </div>
                    <Switch
                      checked={orderingPrefs.requireApproval}
                      onCheckedChange={(checked) =>
                        setOrderingPrefs({ ...orderingPrefs, requireApproval: checked })
                      }
                    />
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="mb-4">Default Delivery Preferences</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Preferred Delivery Time</Label>
                      <div className="grid gap-3 md:grid-cols-3">
                        <button
                          onClick={() =>
                            setOrderingPrefs({ ...orderingPrefs, defaultDeliveryTime: 'morning' })
                          }
                          className={`rounded-xl border-2 p-4 text-center transition-all ${
                            orderingPrefs.defaultDeliveryTime === 'morning'
                              ? 'border-primary bg-primary/5'
                              : 'border-border hover:border-primary/50'
                          }`}
                        >
                          <p className="font-medium">Morning</p>
                          <p className="text-sm text-muted-foreground">6AM - 12PM</p>
                        </button>
                        <button
                          onClick={() =>
                            setOrderingPrefs({ ...orderingPrefs, defaultDeliveryTime: 'afternoon' })
                          }
                          className={`rounded-xl border-2 p-4 text-center transition-all ${
                            orderingPrefs.defaultDeliveryTime === 'afternoon'
                              ? 'border-primary bg-primary/5'
                              : 'border-border hover:border-primary/50'
                          }`}
                        >
                          <p className="font-medium">Afternoon</p>
                          <p className="text-sm text-muted-foreground">12PM - 6PM</p>
                        </button>
                        <button
                          onClick={() =>
                            setOrderingPrefs({ ...orderingPrefs, defaultDeliveryTime: 'evening' })
                          }
                          className={`rounded-xl border-2 p-4 text-center transition-all ${
                            orderingPrefs.defaultDeliveryTime === 'evening'
                              ? 'border-primary bg-primary/5'
                              : 'border-border hover:border-primary/50'
                          }`}
                        >
                          <p className="font-medium">Evening</p>
                          <p className="text-sm text-muted-foreground">6PM - 10PM</p>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button
                    onClick={handleSaveOrdering}
                    className="rounded-xl bg-primary hover:bg-primary/90"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Save Preferences
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
