import { useState } from 'react';
import { X, Plus, Trash2, Upload, Utensils, Phone, Mail, Globe, UtensilsCrossed, Clock, Package, FileText } from 'lucide-react';
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
import { Card } from './ui/card';
import { toast } from 'sonner@2.0.3';

interface MenuItem {
  name: string;
  description: string;
  price: string;
  image: string;
}

interface MenuCategory {
  category: string;
  items: MenuItem[];
}

interface SupplyNeed {
  category: string;
  frequency: string;
  averageOrder: string;
  preferences: string;
}

interface RestaurantProfile {
  name: string;
  type: string;
  cuisine: string[];
  location: string;
  description: string;
  coverImage: string;
  seatingCapacity: string;
  established: string;
  orderVolume: string;
  email: string;
  phone: string;
  website: string;
  leadTime: string;
  deliveryWindow: string;
  paymentTerms: string;
  minimumOrder: string;
  menu: MenuCategory[];
  supplierNeeds: SupplyNeed[];
}

interface EditRestaurantProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  restaurantProfile: RestaurantProfile;
  onSave: (updatedProfile: RestaurantProfile) => void;
}

export function EditRestaurantProfileDialog({
  open,
  onOpenChange,
  restaurantProfile,
  onSave,
}: EditRestaurantProfileDialogProps) {
  const [profile, setProfile] = useState<RestaurantProfile>(restaurantProfile);
  const [newCuisine, setNewCuisine] = useState('');

  const handleSave = () => {
    onSave(profile);
    toast.success('Restaurant profile updated successfully!');
    onOpenChange(false);
  };

  const addCuisine = () => {
    if (newCuisine.trim()) {
      setProfile({
        ...profile,
        cuisine: [...profile.cuisine, newCuisine.trim()],
      });
      setNewCuisine('');
    }
  };

  const removeCuisine = (index: number) => {
    setProfile({
      ...profile,
      cuisine: profile.cuisine.filter((_, i) => i !== index),
    });
  };

  const addMenuCategory = () => {
    setProfile({
      ...profile,
      menu: [
        ...profile.menu,
        {
          category: 'New Category',
          items: [],
        },
      ],
    });
  };

  const removeMenuCategory = (categoryIndex: number) => {
    setProfile({
      ...profile,
      menu: profile.menu.filter((_, i) => i !== categoryIndex),
    });
  };

  const updateMenuCategory = (index: number, category: string) => {
    const updatedMenu = [...profile.menu];
    updatedMenu[index].category = category;
    setProfile({ ...profile, menu: updatedMenu });
  };

  const addMenuItem = (categoryIndex: number) => {
    const updatedMenu = [...profile.menu];
    updatedMenu[categoryIndex].items.push({
      name: '',
      description: '',
      price: '',
      image: '',
    });
    setProfile({ ...profile, menu: updatedMenu });
  };

  const removeMenuItem = (categoryIndex: number, itemIndex: number) => {
    const updatedMenu = [...profile.menu];
    updatedMenu[categoryIndex].items = updatedMenu[categoryIndex].items.filter(
      (_, i) => i !== itemIndex
    );
    setProfile({ ...profile, menu: updatedMenu });
  };

  const updateMenuItem = (
    categoryIndex: number,
    itemIndex: number,
    field: keyof MenuItem,
    value: string
  ) => {
    const updatedMenu = [...profile.menu];
    updatedMenu[categoryIndex].items[itemIndex][field] = value;
    setProfile({ ...profile, menu: updatedMenu });
  };

  const addSupplyNeed = () => {
    setProfile({
      ...profile,
      supplierNeeds: [
        ...profile.supplierNeeds,
        {
          category: '',
          frequency: '',
          averageOrder: '',
          preferences: '',
        },
      ],
    });
  };

  const removeSupplyNeed = (index: number) => {
    setProfile({
      ...profile,
      supplierNeeds: profile.supplierNeeds.filter((_, i) => i !== index),
    });
  };

  const updateSupplyNeed = (
    index: number,
    field: keyof SupplyNeed,
    value: string
  ) => {
    const updatedNeeds = [...profile.supplierNeeds];
    updatedNeeds[index][field] = value;
    setProfile({ ...profile, supplierNeeds: updatedNeeds });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[95vw] w-[95vw] max-h-[95vh] overflow-hidden rounded-3xl p-0">
        <DialogHeader className="border-b border-border p-6 pb-4">
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Utensils className="h-6 w-6 text-primary" />
            Edit Restaurant Profile
          </DialogTitle>
          <DialogDescription>
            Manage your restaurant's public profile visible to suppliers
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="basic" className="flex-1">
          <div className="border-b border-border px-6">
            <TabsList className="inline-flex h-12 rounded-xl bg-muted p-1">
              <TabsTrigger value="basic" className="rounded-lg">
                <Utensils className="mr-2 h-4 w-4" />
                Basic Info
              </TabsTrigger>
              <TabsTrigger value="contact" className="rounded-lg">
                <Phone className="mr-2 h-4 w-4" />
                Contact
              </TabsTrigger>
              <TabsTrigger value="menu" className="rounded-lg">
                <UtensilsCrossed className="mr-2 h-4 w-4" />
                Menu
              </TabsTrigger>
              <TabsTrigger value="supply-needs" className="rounded-lg">
                <Package className="mr-2 h-4 w-4" />
                Supply Needs
              </TabsTrigger>
              <TabsTrigger value="ordering" className="rounded-lg">
                <Clock className="mr-2 h-4 w-4" />
                Ordering
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="overflow-y-auto p-6" style={{ maxHeight: 'calc(90vh - 200px)' }}>
            {/* Basic Info Tab */}
            <TabsContent value="basic" className="m-0 space-y-4">
              <div>
                <Label htmlFor="name">Restaurant Name</Label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="mt-2 rounded-xl"
                />
              </div>

              <div>
                <Label htmlFor="type">Restaurant Type</Label>
                <Input
                  id="type"
                  value={profile.type}
                  onChange={(e) => setProfile({ ...profile, type: e.target.value })}
                  placeholder="e.g., Italian Fine Dining"
                  className="mt-2 rounded-xl"
                />
              </div>

              <div>
                <Label>Cuisine Types</Label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {profile.cuisine.map((cuisine, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="flex items-center gap-1 px-3 py-1"
                    >
                      {cuisine}
                      <button
                        onClick={() => removeCuisine(index)}
                        className="ml-1 rounded-full hover:bg-background/50"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="mt-2 flex gap-2">
                  <Input
                    value={newCuisine}
                    onChange={(e) => setNewCuisine(e.target.value)}
                    placeholder="Add cuisine type"
                    className="rounded-xl"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addCuisine();
                      }
                    }}
                  />
                  <Button onClick={addCuisine} className="rounded-xl">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={profile.location}
                  onChange={(e) =>
                    setProfile({ ...profile, location: e.target.value })
                  }
                  placeholder="Full address"
                  className="mt-2 rounded-xl"
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={profile.description}
                  onChange={(e) =>
                    setProfile({ ...profile, description: e.target.value })
                  }
                  placeholder="Describe your restaurant and culinary philosophy"
                  className="mt-2 min-h-[120px] rounded-xl"
                />
              </div>

              <div>
                <Label htmlFor="coverImage">Cover Image URL</Label>
                <Input
                  id="coverImage"
                  value={profile.coverImage}
                  onChange={(e) =>
                    setProfile({ ...profile, coverImage: e.target.value })
                  }
                  placeholder="https://..."
                  className="mt-2 rounded-xl"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <Label htmlFor="seatingCapacity">Seating Capacity</Label>
                  <Input
                    id="seatingCapacity"
                    value={profile.seatingCapacity}
                    onChange={(e) =>
                      setProfile({ ...profile, seatingCapacity: e.target.value })
                    }
                    placeholder="e.g., 85"
                    className="mt-2 rounded-xl"
                  />
                </div>

                <div>
                  <Label htmlFor="established">Established Year</Label>
                  <Input
                    id="established"
                    value={profile.established}
                    onChange={(e) =>
                      setProfile({ ...profile, established: e.target.value })
                    }
                    placeholder="e.g., 2020"
                    className="mt-2 rounded-xl"
                  />
                </div>

                <div>
                  <Label htmlFor="orderVolume">Monthly Order Volume</Label>
                  <Input
                    id="orderVolume"
                    value={profile.orderVolume}
                    onChange={(e) =>
                      setProfile({ ...profile, orderVolume: e.target.value })
                    }
                    placeholder="e.g., €12,500/month"
                    className="mt-2 rounded-xl"
                  />
                </div>
              </div>
            </TabsContent>

            {/* Contact Tab */}
            <TabsContent value="contact" className="m-0 space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  placeholder="orders@restaurant.com"
                  className="mt-2 rounded-xl"
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  placeholder="+1 (555) 123-4567"
                  className="mt-2 rounded-xl"
                />
              </div>

              <div>
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  type="url"
                  value={profile.website}
                  onChange={(e) =>
                    setProfile({ ...profile, website: e.target.value })
                  }
                  placeholder="www.restaurant.com"
                  className="mt-2 rounded-xl"
                />
              </div>
            </TabsContent>

            {/* Menu Tab */}
            <TabsContent value="menu" className="m-0 space-y-4">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Showcase your menu to help suppliers understand your needs
                </p>
                <Button onClick={addMenuCategory} size="sm" className="rounded-xl">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Category
                </Button>
              </div>

              <div className="space-y-6">
                {profile.menu.map((category, categoryIndex) => (
                  <div
                    key={categoryIndex}
                    className="rounded-2xl border border-border p-4"
                  >
                    <div className="mb-4 flex items-center gap-2">
                      <Input
                        value={category.category}
                        onChange={(e) =>
                          updateMenuCategory(categoryIndex, e.target.value)
                        }
                        placeholder="Category name"
                        className="flex-1 rounded-xl"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeMenuCategory(categoryIndex)}
                        className="h-8 w-8 p-0 text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="space-y-3">
                      {category.items.map((item, itemIndex) => (
                        <div
                          key={itemIndex}
                          className="rounded-xl bg-muted/30 p-3 space-y-2"
                        >
                          <div className="flex items-start gap-2">
                            <div className="flex-1 space-y-2">
                              <Input
                                value={item.name}
                                onChange={(e) =>
                                  updateMenuItem(
                                    categoryIndex,
                                    itemIndex,
                                    'name',
                                    e.target.value
                                  )
                                }
                                placeholder="Item name"
                                className="rounded-lg"
                              />
                              <Textarea
                                value={item.description}
                                onChange={(e) =>
                                  updateMenuItem(
                                    categoryIndex,
                                    itemIndex,
                                    'description',
                                    e.target.value
                                  )
                                }
                                placeholder="Description"
                                className="min-h-[60px] rounded-lg"
                              />
                              <div className="grid grid-cols-2 gap-2">
                                <Input
                                  value={item.price}
                                  onChange={(e) =>
                                    updateMenuItem(
                                      categoryIndex,
                                      itemIndex,
                                      'price',
                                      e.target.value
                                    )
                                  }
                                  placeholder="Price (e.g., €28)"
                                  className="rounded-lg"
                                />
                                <Input
                                  value={item.image}
                                  onChange={(e) =>
                                    updateMenuItem(
                                      categoryIndex,
                                      itemIndex,
                                      'image',
                                      e.target.value
                                    )
                                  }
                                  placeholder="Image URL"
                                  className="rounded-lg"
                                />
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeMenuItem(categoryIndex, itemIndex)}
                              className="h-8 w-8 p-0 text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addMenuItem(categoryIndex)}
                      className="mt-3 w-full rounded-xl"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Menu Item
                    </Button>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Supply Needs Tab */}
            <TabsContent value="supply-needs" className="m-0 space-y-4">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  List your supply requirements to help suppliers understand your needs
                </p>
                <Button onClick={addSupplyNeed} size="sm" className="rounded-xl">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Supply Need
                </Button>
              </div>

              <div className="space-y-4">
                {profile.supplierNeeds.map((need, index) => (
                  <div
                    key={index}
                    className="rounded-2xl border border-border p-4"
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <h4 className="text-sm font-medium">Supply Category {index + 1}</h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeSupplyNeed(index)}
                        className="h-8 w-8 p-0 text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <Label htmlFor={`category-${index}`}>Category</Label>
                        <Input
                          id={`category-${index}`}
                          value={need.category}
                          onChange={(e) =>
                            updateSupplyNeed(index, 'category', e.target.value)
                          }
                          placeholder="e.g., Vegetables"
                          className="mt-1 rounded-xl"
                        />
                      </div>

                      <div>
                        <Label htmlFor={`frequency-${index}`}>Frequency</Label>
                        <Input
                          id={`frequency-${index}`}
                          value={need.frequency}
                          onChange={(e) =>
                            updateSupplyNeed(index, 'frequency', e.target.value)
                          }
                          placeholder="e.g., Twice weekly"
                          className="mt-1 rounded-xl"
                        />
                      </div>

                      <div>
                        <Label htmlFor={`averageOrder-${index}`}>Average Order</Label>
                        <Input
                          id={`averageOrder-${index}`}
                          value={need.averageOrder}
                          onChange={(e) =>
                            updateSupplyNeed(index, 'averageOrder', e.target.value)
                          }
                          placeholder="e.g., €250"
                          className="mt-1 rounded-xl"
                        />
                      </div>

                      <div>
                        <Label htmlFor={`preferences-${index}`}>Preferences</Label>
                        <Input
                          id={`preferences-${index}`}
                          value={need.preferences}
                          onChange={(e) =>
                            updateSupplyNeed(index, 'preferences', e.target.value)
                          }
                          placeholder="e.g., Organic, locally sourced"
                          className="mt-1 rounded-xl"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Ordering Info Tab */}
            <TabsContent value="ordering" className="m-0 space-y-4">
              <div>
                <Label htmlFor="leadTime">Lead Time</Label>
                <Input
                  id="leadTime"
                  value={profile.leadTime}
                  onChange={(e) =>
                    setProfile({ ...profile, leadTime: e.target.value })
                  }
                  placeholder="e.g., 48 hours"
                  className="mt-2 rounded-xl"
                />
                <p className="mt-1 text-xs text-muted-foreground">
                  How much notice do you need before delivery?
                </p>
              </div>

              <div>
                <Label htmlFor="deliveryWindow">Delivery Window</Label>
                <Input
                  id="deliveryWindow"
                  value={profile.deliveryWindow}
                  onChange={(e) =>
                    setProfile({ ...profile, deliveryWindow: e.target.value })
                  }
                  placeholder="e.g., 6:00 AM - 9:00 AM"
                  className="mt-2 rounded-xl"
                />
                <p className="mt-1 text-xs text-muted-foreground">
                  Preferred delivery time window
                </p>
              </div>

              <div>
                <Label htmlFor="paymentTerms">Payment Terms</Label>
                <Input
                  id="paymentTerms"
                  value={profile.paymentTerms}
                  onChange={(e) =>
                    setProfile({ ...profile, paymentTerms: e.target.value })
                  }
                  placeholder="e.g., Net 30"
                  className="mt-2 rounded-xl"
                />
                <p className="mt-1 text-xs text-muted-foreground">
                  Standard payment terms
                </p>
              </div>

              <div>
                <Label htmlFor="minimumOrder">Minimum Order</Label>
                <Input
                  id="minimumOrder"
                  value={profile.minimumOrder}
                  onChange={(e) =>
                    setProfile({ ...profile, minimumOrder: e.target.value })
                  }
                  placeholder="e.g., €100"
                  className="mt-2 rounded-xl"
                />
                <p className="mt-1 text-xs text-muted-foreground">
                  Minimum order value (if any)
                </p>
              </div>
            </TabsContent>
          </div>
        </Tabs>

        <div className="flex items-center justify-end gap-3 border-t border-border p-6">
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