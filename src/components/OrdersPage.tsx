import { useState } from 'react';
import { Package, Calendar, DollarSign, Download, ChevronDown, MessageCircle, Heart, Phone, Mail, RefreshCw, Truck, Clock, CheckCircle, AlertCircle, Store, MapPin } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { toast } from 'sonner@2.0.3';

interface OrdersPageProps {
  onViewSupplier?: (supplierId: string) => void;
}

export function OrdersPage({ onViewSupplier }: OrdersPageProps) {
  const [expandedOrder, setExpandedOrder] = useState<number | string | null>(null);
  const [favoriteOrderIds, setFavoriteOrderIds] = useState<Set<number | string>>(
    new Set(['ORD-998', 'ORD-985'])
  );

  const activeOrders = [
    {
      id: 1001,
      orderNumber: 'ORD-1001',
      supplier: 'Green Valley Farm',
      supplierId: 1,
      supplierPhone: '+1 (555) 123-4567',
      supplierEmail: 'orders@greenvalley.com',
      date: 'Oct 22, 2025',
      total: 127.5,
      status: 'In Transit',
      statusColor: 'bg-accent text-accent-foreground',
      progress: 75,
      items: [
        { name: 'Heirloom Tomatoes', quantity: '3 kg', price: 13.5 },
        { name: 'Mixed Greens', quantity: '2 kg', price: 8.0 },
        { name: 'Organic Carrots', quantity: '5 kg', price: 16.0 },
      ],
      estimatedDelivery: 'Thursday, Oct 24 - 8 AM',
      trackingNumber: 'TRK-789456123',
      deliveryAddress: '123 Gastronomy Street, Culinary District',
      paymentStatus: 'Paid',
      notes: 'Please deliver to back entrance',
    },
    {
      id: 1002,
      orderNumber: 'ORD-1002',
      supplier: 'Mountain Dairy Co.',
      supplierId: 2,
      supplierPhone: '+1 (555) 234-5678',
      supplierEmail: 'sales@mountaindairy.com',
      date: 'Oct 23, 2025',
      total: 89.2,
      status: 'Processing',
      statusColor: 'bg-primary/20 text-primary',
      progress: 25,
      items: [
        { name: 'Fresh Mozzarella', quantity: '2 kg', price: 24.0 },
        { name: 'Ricotta Cheese', quantity: '1 kg', price: 15.2 },
        { name: 'Heavy Cream', quantity: '3 L', price: 18.5 },
      ],
      estimatedDelivery: 'Friday, Oct 25 - 10 AM',
      trackingNumber: 'TRK-456789012',
      deliveryAddress: '123 Gastronomy Street, Culinary District',
      paymentStatus: 'Paid',
      notes: '',
    },
    {
      id: 1003,
      orderNumber: 'ORD-1003',
      supplier: 'Heritage Bakery',
      supplierId: 3,
      supplierPhone: '+1 (555) 345-6789',
      supplierEmail: 'contact@heritagebakery.com',
      date: 'Oct 24, 2025',
      total: 68.0,
      status: 'Confirmed',
      statusColor: 'bg-primary/10 text-primary',
      progress: 10,
      items: [
        { name: 'Sourdough Bread', quantity: '5 loaves', price: 34.0 },
        { name: 'Baguettes', quantity: '10 pieces', price: 20.0 },
      ],
      estimatedDelivery: 'Saturday, Oct 26 - 7 AM',
      trackingNumber: 'TRK-234567890',
      deliveryAddress: '123 Gastronomy Street, Culinary District',
      paymentStatus: 'Paid',
      notes: '',
    },
  ];

  const completedOrders = [
    {
      id: 'ORD-998',
      orderNumber: 'ORD-998',
      supplier: 'Green Valley Farm',
      supplierId: 1,
      supplierPhone: '+1 (555) 123-4567',
      supplierEmail: 'orders@greenvalley.com',
      date: 'Oct 18, 2025',
      total: 156.8,
      status: 'Delivered',
      statusColor: 'bg-primary text-primary-foreground',
      items: [
        { name: 'Organic Potatoes', quantity: '10 kg', price: 25.0 },
        { name: 'Carrots', quantity: '5 kg', price: 12.5 },
        { name: 'Beetroot', quantity: '3 kg', price: 9.9 },
        { name: 'Mixed Greens', quantity: '4 kg', price: 18.0 },
      ],
      deliveredDate: 'Oct 19, 2025',
      deliveryAddress: '123 Gastronomy Street, Culinary District',
      paymentStatus: 'Paid',
      rating: 5,
    },
    {
      id: 'ORD-985',
      orderNumber: 'ORD-985',
      supplier: 'Mountain Dairy Co.',
      supplierId: 2,
      supplierPhone: '+1 (555) 234-5678',
      supplierEmail: 'sales@mountaindairy.com',
      date: 'Oct 15, 2025',
      total: 89.20,
      status: 'Delivered',
      statusColor: 'bg-primary text-primary-foreground',
      items: [
        { name: 'Fresh Mozzarella', quantity: '2 kg', price: 24.0 },
        { name: 'Ricotta', quantity: '3 kg', price: 45.0 },
        { name: 'Yogurt', quantity: '4 L', price: 20.2 },
      ],
      deliveredDate: 'Oct 16, 2025',
      deliveryAddress: '123 Gastronomy Street, Culinary District',
      paymentStatus: 'Paid',
      rating: 5,
    },
    {
      id: 'ORD-972',
      orderNumber: 'ORD-972',
      supplier: 'Heritage Bakery',
      supplierId: 3,
      supplierPhone: '+1 (555) 345-6789',
      supplierEmail: 'contact@heritagebakery.com',
      date: 'Oct 15, 2025',
      total: 68.0,
      status: 'Delivered',
      statusColor: 'bg-primary text-primary-foreground',
      items: [
        { name: 'Sourdough Bread', quantity: '5 loaves', price: 34.0 },
        { name: 'Baguettes', quantity: '10 pieces', price: 20.0 },
        { name: 'Croissants', quantity: '12 pieces', price: 14.0 },
      ],
      deliveredDate: 'Oct 16, 2025',
      deliveryAddress: '123 Gastronomy Street, Culinary District',
      paymentStatus: 'Paid',
      rating: 5,
    },
  ];

  // Reorder history - previous orders that can be easily reordered
  const reorderHistory = [
    {
      id: 'ORD-1245',
      orderNumber: 'ORD-1245',
      supplierId: 1,
      supplier: 'Green Valley Farm',
      date: '2024-10-23',
      total: 145.80,
      items: [
        { name: 'Heirloom Tomatoes', quantity: '5 kg', price: 22.50 },
        { name: 'Organic Carrots', quantity: '10 kg', price: 32.00 },
        { name: 'Seasonal Greens Mix', quantity: '8 kg', price: 30.40 },
      ],
    },
    {
      id: 'ORD-1238',
      orderNumber: 'ORD-1238',
      supplierId: 2,
      supplier: 'Mountain Dairy Co.',
      date: '2024-10-18',
      total: 89.50,
      items: [
        { name: 'Fresh Mozzarella', quantity: '3 kg', price: 45.00 },
        { name: 'Organic Butter', quantity: '2 kg', price: 24.00 },
        { name: 'Heavy Cream', quantity: '5 L', price: 20.50 },
      ],
    },
    {
      id: 'ORD-1232',
      orderNumber: 'ORD-1232',
      supplierId: 3,
      supplier: 'Heritage Bakery',
      date: '2024-10-22',
      total: 67.30,
      items: [
        { name: 'Sourdough Loaves', quantity: '12 units', price: 36.00 },
        { name: 'Croissants', quantity: '24 units', price: 19.20 },
        { name: 'Focaccia', quantity: '4 units', price: 12.10 },
      ],
    },
    {
      id: 'ORD-1198',
      orderNumber: 'ORD-1198',
      supplierId: 4,
      supplier: 'Ocean Fresh Seafood',
      date: '2024-10-15',
      total: 234.50,
      items: [
        { name: 'Atlantic Salmon', quantity: '4 kg', price: 96.00 },
        { name: 'Fresh Prawns', quantity: '2 kg', price: 78.00 },
        { name: 'Sea Bass', quantity: '3 kg', price: 60.50 },
      ],
    },
  ];

  const draftOrders = [
    {
      id: 'draft-1',
      orderNumber: 'DRAFT-001',
      supplier: 'Multiple Suppliers',
      date: 'Oct 24, 2025',
      total: 234.5,
      status: 'Draft',
      statusColor: 'bg-muted text-muted-foreground',
      itemCount: 8,
    },
  ];

  const toggleFavorite = (orderId: number | string) => {
    const newFavorites = new Set(favoriteOrderIds);
    if (newFavorites.has(orderId)) {
      newFavorites.delete(orderId);
      toast.success('Removed from favorites');
    } else {
      newFavorites.add(orderId);
      toast.success('Added to favorites');
    }
    setFavoriteOrderIds(newFavorites);
  };

  const handleContactSupplier = (supplierName: string) => {
    toast.success(`Opening message to ${supplierName}`);
  };

  const handleReorder = (orderNumber: string, supplier: string) => {
    toast.success(`Reordering from ${supplier}`, {
      description: `Order ${orderNumber} has been added to your cart`,
    });
  };

  const OrderCard = ({ order, type }: { order: any; type: string }) => {
    const isExpanded = expandedOrder === order.id;
    const isFavorite = favoriteOrderIds.has(order.id);

    return (
      <div className="overflow-hidden rounded-2xl bg-white shadow-[0_1px_4px_rgba(0,0,0,0.08)] transition-all duration-250 hover:shadow-[0_2px_8px_rgba(0,0,0,0.12)]">
        <div
          className="cursor-pointer p-6"
          onClick={() =>
            setExpandedOrder(isExpanded ? null : order.id)
          }
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="mb-2 flex items-center gap-3">
                <h3 className="text-lg">{order.orderNumber}</h3>
                <Badge className={order.statusColor}>{order.status}</Badge>
                {type === 'completed' && isFavorite && (
                  <Badge variant="outline" className="text-accent">
                    <Heart className="mr-1 h-3 w-3 fill-accent" />
                    Favorite
                  </Badge>
                )}
              </div>
              <div className="mb-2 flex items-center gap-2">
                <span className="text-muted-foreground">{order.supplier}</span>
                {order.supplierId && (
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-6 rounded-lg px-2 text-xs"
                    onClick={(e) => {
                      e.stopPropagation();
                      onViewSupplier?.(order.supplierId.toString());
                    }}
                  >
                    <Store className="mr-1 h-3 w-3" />
                    View Store
                  </Button>
                )}
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{order.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4" />
                  <span>€{order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              {type === 'completed' && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(order.id);
                  }}
                  className="rounded-lg p-2 transition-all duration-250 hover:bg-accent/5"
                  aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                >
                  <Heart className={`h-5 w-5 ${isFavorite ? 'fill-accent text-accent' : 'text-muted-foreground'}`} />
                </button>
              )}
              <ChevronDown
                className={`h-5 w-5 text-muted-foreground transition-transform duration-250 ${
                  isExpanded ? 'rotate-180' : ''
                }`}
              />
            </div>
          </div>

          {/* Progress Bar for Active Orders */}
          {type === 'active' && order.progress !== undefined && (
            <div className="mt-4">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Order Progress</span>
                <span className="text-primary">{order.progress}%</span>
              </div>
              <Progress value={order.progress} className="h-2" />
            </div>
          )}

          {type === 'active' && order.estimatedDelivery && (
            <div className="mt-4 rounded-xl bg-accent/10 p-3">
              <div className="flex items-center gap-2 text-sm">
                <Truck className="h-4 w-4 text-accent" />
                <span className="text-muted-foreground">Estimated delivery: </span>
                <span className="text-accent">{order.estimatedDelivery}</span>
              </div>
            </div>
          )}

          {type === 'completed' && order.deliveredDate && !isExpanded && (
            <div className="mt-4 flex items-center gap-2 text-sm">
              <CheckCircle className="h-4 w-4 text-primary" />
              <span className="text-muted-foreground">
                Delivered on {order.deliveredDate}
              </span>
            </div>
          )}
        </div>

        {/* Expanded Content */}
        {isExpanded && order.items && (
          <div className="border-t border-border bg-muted/20 p-6">
            {/* Order Details */}
            {(order.trackingNumber || order.deliveryAddress) && (
              <div className="mb-4 grid gap-3 rounded-xl bg-white p-4 sm:grid-cols-2">
                {order.trackingNumber && (
                  <div>
                    <div className="mb-1 text-xs text-muted-foreground">Tracking Number</div>
                    <div className="flex items-center gap-2 text-sm">
                      <Package className="h-4 w-4 text-primary" />
                      <span>{order.trackingNumber}</span>
                    </div>
                  </div>
                )}
                {order.deliveryAddress && (
                  <div>
                    <div className="mb-1 text-xs text-muted-foreground">Delivery Address</div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span>{order.deliveryAddress}</span>
                    </div>
                  </div>
                )}
                {order.paymentStatus && (
                  <div>
                    <div className="mb-1 text-xs text-muted-foreground">Payment Status</div>
                    <Badge variant="outline" className="text-primary">
                      <CheckCircle className="mr-1 h-3 w-3" />
                      {order.paymentStatus}
                    </Badge>
                  </div>
                )}
              </div>
            )}

            {/* Order Items */}
            <h4 className="mb-3">Order Items</h4>
            <div className="mb-4 space-y-2">
              {order.items.map((item: any, index: number) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg bg-white p-3"
                >
                  <div>
                    <div className="mb-1">{item.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {item.quantity}
                    </div>
                  </div>
                  <div className="text-primary">€{item.price.toFixed(2)}</div>
                </div>
              ))}
              <div className="flex items-center justify-between rounded-lg bg-primary/5 p-3">
                <span>Total</span>
                <span className="text-lg text-primary">€{order.total.toFixed(2)}</span>
              </div>
            </div>

            {/* Notes */}
            {order.notes && (
              <div className="mb-4 rounded-xl bg-accent/5 p-3">
                <div className="mb-1 flex items-center gap-2 text-sm text-muted-foreground">
                  <AlertCircle className="h-4 w-4" />
                  Delivery Notes
                </div>
                <p className="text-sm">{order.notes}</p>
              </div>
            )}

            {/* Actions */}
            <div className="grid gap-2 sm:grid-cols-2">
              <Button
                variant="outline"
                className="rounded-xl"
                onClick={(e) => {
                  e.stopPropagation();
                  toast.success('Downloading invoice...');
                }}
              >
                <Download className="mr-2 h-4 w-4" />
                Download Invoice
              </Button>
              
              {type === 'completed' && (
                <Button
                  className="rounded-xl bg-primary text-primary-foreground"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleReorder(order.orderNumber, order.supplier);
                  }}
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Reorder
                </Button>
              )}

              {type === 'active' && (
                <Button
                  variant="outline"
                  className="rounded-xl"
                  onClick={(e) => {
                    e.stopPropagation();
                    toast.success('Tracking your order...');
                  }}
                >
                  <Truck className="mr-2 h-4 w-4" />
                  Track Order
                </Button>
              )}
            </div>

            {/* Contact Supplier */}
            {(order.supplierPhone || order.supplierEmail) && (
              <div className="mt-4 border-t border-border pt-4">
                <div className="mb-2 text-sm text-muted-foreground">Contact Supplier</div>
                <div className="flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="rounded-xl"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleContactSupplier(order.supplier);
                    }}
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Message
                  </Button>
                  {order.supplierEmail && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-xl"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Mail className="mr-2 h-4 w-4" />
                      Email
                    </Button>
                  )}
                  {order.supplierPhone && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-xl"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Phone className="mr-2 h-4 w-4" />
                      Call
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen py-12">
      <div className="mx-auto max-w-[1440px] px-8">
        <div className="mb-8">
          <h1 className="mb-2 text-4xl text-primary">Orders</h1>
          <p className="text-muted-foreground">
            Manage and track all your orders in one place
          </p>
        </div>

        <Tabs defaultValue="active" className="w-full">
          <TabsList className="mb-8 grid w-full max-w-2xl grid-cols-4 rounded-xl bg-white p-1 shadow-[0_1px_4px_rgba(0,0,0,0.08)]">
            <TabsTrigger value="active" className="rounded-lg">
              <Clock className="mr-2 h-4 w-4" />
              Active ({activeOrders.length})
            </TabsTrigger>
            <TabsTrigger value="completed" className="rounded-lg">
              <CheckCircle className="mr-2 h-4 w-4" />
              Completed ({completedOrders.length})
            </TabsTrigger>
            <TabsTrigger value="reorder" className="rounded-lg">
              <RefreshCw className="mr-2 h-4 w-4" />
              Reorder ({reorderHistory.length})
            </TabsTrigger>
            <TabsTrigger value="drafts" className="rounded-lg">
              <Package className="mr-2 h-4 w-4" />
              Drafts ({draftOrders.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4">
            {activeOrders.length === 0 ? (
              <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl bg-white p-12 text-center shadow-[0_1px_4px_rgba(0,0,0,0.08)]">
                <Clock className="mb-4 h-16 w-16 text-muted-foreground/30" />
                <h3 className="mb-2 text-primary">No active orders</h3>
                <p className="text-muted-foreground">
                  Your active orders will appear here
                </p>
              </div>
            ) : (
              activeOrders.map((order) => (
                <OrderCard key={order.id} order={order} type="active" />
              ))
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {completedOrders.length === 0 ? (
              <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl bg-white p-12 text-center shadow-[0_1px_4px_rgba(0,0,0,0.08)]">
                <CheckCircle className="mb-4 h-16 w-16 text-muted-foreground/30" />
                <h3 className="mb-2 text-primary">No completed orders</h3>
                <p className="text-muted-foreground">
                  Your order history will appear here
                </p>
              </div>
            ) : (
              completedOrders.map((order) => (
                <OrderCard key={order.id} order={order} type="completed" />
              ))
            )}
          </TabsContent>

          <TabsContent value="reorder" className="space-y-4">
            <div className="rounded-2xl bg-white p-6 shadow-[0_1px_4px_rgba(0,0,0,0.08)]">
              <h3 className="mb-4">Quick Reorder</h3>
              <p className="mb-6 text-sm text-muted-foreground">
                Easily reorder your favorite items from previous orders
              </p>
              <div className="space-y-4">
                {reorderHistory.map((order) => (
                  <div
                    key={order.id}
                    className="rounded-xl border border-border p-4 transition-all duration-250 hover:border-primary/50"
                  >
                    <div className="mb-3 flex items-start justify-between">
                      <div className="flex-1">
                        <div className="mb-1 flex items-center gap-2">
                          <span>{order.orderNumber}</span>
                          <Badge variant="outline">{order.supplier}</Badge>
                          {order.supplierId && (
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-6 rounded-lg px-2 text-xs"
                              onClick={() => onViewSupplier?.(order.supplierId.toString())}
                            >
                              <Store className="mr-1 h-3 w-3" />
                              View Store
                            </Button>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{order.date}</p>
                      </div>
                      <div className="text-right">
                        <div className="mb-2 text-primary">€{order.total.toFixed(2)}</div>
                        <Button
                          size="sm"
                          className="rounded-xl"
                          onClick={() => handleReorder(order.orderNumber, order.supplier)}
                        >
                          <RefreshCw className="mr-2 h-4 w-4" />
                          Reorder
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2 border-t border-border pt-3">
                      {order.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between text-sm"
                        >
                          <span>{item.name}</span>
                          <div className="flex items-center gap-3">
                            <span className="text-muted-foreground">
                              {item.quantity}
                            </span>
                            <span className="text-primary">€{item.price.toFixed(2)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="drafts" className="space-y-4">
            {draftOrders.length === 0 ? (
              <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl bg-white p-12 text-center shadow-[0_1px_4px_rgba(0,0,0,0.08)]">
                <Package className="mb-4 h-16 w-16 text-muted-foreground/30" />
                <h3 className="mb-2 text-primary">No draft orders</h3>
                <p className="text-muted-foreground">
                  Save incomplete orders as drafts to complete later
                </p>
              </div>
            ) : (
              draftOrders.map((order) => (
                <div
                  key={order.id}
                  className="rounded-2xl bg-white p-6 shadow-[0_1px_4px_rgba(0,0,0,0.08)]"
                >
                  <div className="mb-4 flex items-start justify-between">
                    <div>
                      <div className="mb-2 flex items-center gap-3">
                        <h3 className="text-lg">{order.orderNumber}</h3>
                        <Badge className={order.statusColor}>{order.status}</Badge>
                      </div>
                      <div className="mb-1 text-muted-foreground">
                        {order.supplier}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {order.itemCount} items • €{order.total.toFixed(2)}
                      </div>
                    </div>
                    <Package className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1 rounded-xl"
                      onClick={() => toast.success('Opening draft editor...')}
                    >
                      Edit Draft
                    </Button>
                    <Button
                      className="flex-1 rounded-xl bg-primary text-primary-foreground"
                      onClick={() => toast.success('Completing order...')}
                    >
                      Complete Order
                    </Button>
                  </div>
                </div>
              ))
            )}
          </TabsContent>
        </Tabs>

        {/* Summary Stats */}
        <div className="mt-12 grid gap-6 md:grid-cols-4">
          <div className="rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 p-6">
            <div className="mb-2 flex items-center gap-2">
              <Package className="h-5 w-5 text-primary" />
              <div className="text-sm text-muted-foreground">Total Orders</div>
            </div>
            <div className="text-3xl text-primary">
              {activeOrders.length + completedOrders.length}
            </div>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-accent/5 to-accent/10 p-6">
            <div className="mb-2 flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-accent" />
              <div className="text-sm text-muted-foreground">This Month</div>
            </div>
            <div className="text-3xl text-accent">
              €
              {(
                activeOrders.reduce((sum, o) => sum + o.total, 0) +
                completedOrders.reduce((sum, o) => sum + o.total, 0)
              ).toFixed(0)}
            </div>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 p-6">
            <div className="mb-2 flex items-center gap-2">
              <Store className="h-5 w-5 text-primary" />
              <div className="text-sm text-muted-foreground">
                Active Suppliers
              </div>
            </div>
            <div className="text-3xl text-primary">6</div>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-accent/5 to-primary/5 p-6">
            <div className="mb-2 flex items-center gap-2">
              <Heart className="h-5 w-5 text-accent" />
              <div className="text-sm text-muted-foreground">
                Favorite Orders
              </div>
            </div>
            <div className="text-3xl text-accent">{favoriteOrderIds.size}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
