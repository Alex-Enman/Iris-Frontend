import {
  AlertCircle,
  Clock,
  TrendingDown,
  MessageCircle,
  Store,
  Package,
  MapPin,
  Eye,
  Star,
  FileText,
  ArrowRight,
  DollarSign,
  ShoppingCart,
  Users,
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { toast } from 'sonner@2.0.3';

interface Stat {
  label: string;
  value: string;
  change: string;
  icon: any;
  trend: string;
}

interface SupplierDashboardTabProps {
  onContactRestaurant: (restaurantName: string) => void;
  onViewRestaurantProfile: (restaurantId: string) => void;
  stats: Stat[];
}

export function SupplierDashboardTab({
  onContactRestaurant,
  onViewRestaurantProfile,
  stats,
}: SupplierDashboardTabProps) {
  return (
    <div className="space-y-6">
      {/* Compact KPI Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="rounded-2xl border-0 p-4 shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
          >
            <div className="flex items-center justify-between">
              <div className="rounded-xl bg-muted p-2">
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <Badge
                variant="secondary"
                className={`text-xs ${
                  stat.trend === 'up' ? 'bg-primary/10 text-primary' : ''
                }`}
              >
                {stat.change}
              </Badge>
            </div>
            <h3 className="mb-0.5 mt-3">{stat.value}</h3>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </Card>
        ))}
      </div>

      {/* Pressing Actions Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Urgent Orders */}
        <Card className="rounded-3xl border-0 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
          <div className="border-b border-border p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="rounded-xl bg-destructive/10 p-2">
                  <AlertCircle className="h-5 w-5 text-destructive" />
                </div>
                <h3 className="text-lg">Urgent Actions</h3>
              </div>
              <Badge variant="destructive">3</Badge>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              {/* Low Stock Alert */}
              <div className="rounded-2xl border-2 border-destructive/20 bg-destructive/5 p-4">
                <div className="mb-2 flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <TrendingDown className="h-5 w-5 text-destructive" />
                    <div>
                      <h4 className="mb-1 font-medium">Low Stock Alert</h4>
                      <p className="text-sm text-muted-foreground">
                        Seasonal Greens Mix: Only 12 kg remaining
                      </p>
                    </div>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="mt-3 w-full rounded-xl border-destructive/30 hover:bg-destructive/10"
                  onClick={() => toast.success('Opening stock management')}
                >
                  Update Stock
                </Button>
              </div>

              {/* Out of Stock */}
              <div className="rounded-2xl border-2 border-destructive/20 bg-destructive/5 p-4">
                <div className="mb-2 flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-destructive" />
                    <div>
                      <h4 className="mb-1 font-medium">Out of Stock</h4>
                      <p className="text-sm text-muted-foreground">
                        Baby Potatoes: Unavailable
                      </p>
                    </div>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="mt-3 w-full rounded-xl border-destructive/30 hover:bg-destructive/10"
                  onClick={() => toast.success('Opening restock form')}
                >
                  Restock Now
                </Button>
              </div>

              {/* Pending Orders */}
              <div className="rounded-2xl border-2 border-accent/20 bg-accent/5 p-4">
                <div className="mb-2 flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-accent" />
                    <div>
                      <h4 className="mb-1 font-medium">Pending Order</h4>
                      <p className="text-sm text-muted-foreground">
                        Order #ORD-1234 from La Cucina awaiting confirmation
                      </p>
                    </div>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="mt-3 w-full rounded-xl border-accent/30 hover:bg-accent/10"
                  onClick={() => toast.success('Opening order details')}
                >
                  Review Order
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Message Notifications */}
        <Card className="rounded-3xl border-0 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
          <div className="border-b border-border p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="rounded-xl bg-primary/10 p-2">
                  <MessageCircle className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg">Unread Messages</h3>
              </div>
              <Badge className="bg-primary">5</Badge>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              {/* Message from La Cucina */}
              <button
                onClick={() => onContactRestaurant('La Cucina')}
                className="w-full rounded-2xl border-2 border-primary/10 bg-primary/5 p-4 text-left transition-all hover:border-primary/20"
              >
                <div className="mb-2 flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm text-primary-foreground">
                      LC
                    </div>
                    <div>
                      <h4 className="mb-1 font-medium">La Cucina</h4>
                      <p className="text-sm text-muted-foreground">
                        "Can we schedule a regular weekly delivery?"
                      </p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    2h ago
                  </Badge>
                </div>
              </button>

              {/* Message from Green Table */}
              <button
                onClick={() => onContactRestaurant('Green Table')}
                className="w-full rounded-2xl border-2 border-primary/10 bg-primary/5 p-4 text-left transition-all hover:border-primary/20"
              >
                <div className="mb-2 flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm text-primary-foreground">
                      GT
                    </div>
                    <div>
                      <h4 className="mb-1 font-medium">Green Table</h4>
                      <p className="text-sm text-muted-foreground">
                        "Inquiry about organic certification"
                      </p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    5h ago
                  </Badge>
                </div>
              </button>

              {/* Message from The Garden */}
              <button
                onClick={() => onContactRestaurant('The Garden')}
                className="w-full rounded-2xl border-2 border-primary/10 bg-primary/5 p-4 text-left transition-all hover:border-primary/20"
              >
                <div className="mb-2 flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm text-primary-foreground">
                      TG
                    </div>
                    <div>
                      <h4 className="mb-1 font-medium">The Garden</h4>
                      <p className="text-sm text-muted-foreground">
                        "Thank you for the fresh produce!"
                      </p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    1d ago
                  </Badge>
                </div>
              </button>
            </div>
            <Button
              variant="outline"
              className="mt-4 w-full rounded-xl"
              onClick={() => toast.success('Opening messages')}
            >
              View All Messages
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </Card>
      </div>

      {/* New Restaurant Matches */}
      <Card className="rounded-3xl border-0 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
        <div className="border-b border-border p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="mb-1 flex items-center gap-2">
                <div className="rounded-xl bg-primary/10 p-2">
                  <Store className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg">New Restaurant Matches</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Restaurants looking for suppliers like you
              </p>
            </div>
            <Badge className="bg-primary">4 New</Badge>
          </div>
        </div>
        <div className="p-6">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Restaurant Match 1 */}
            <div className="rounded-2xl border-2 border-primary/10 bg-gradient-to-br from-primary/5 to-transparent p-5">
              <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    OT
                  </div>
                  <div>
                    <h4 className="mb-1 font-medium">Organic Table</h4>
                    <p className="text-sm text-muted-foreground">
                      Plant-Based Restaurant
                    </p>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  95% Match
                </Badge>
              </div>
              <div className="mb-4 space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>10 min away</span>
                </div>
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-primary" />
                  <span>Looking for: Organic vegetables, seasonal produce</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>Needs weekly deliveries</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onViewRestaurantProfile('5')}
                  className="flex-1 rounded-xl"
                >
                  <Eye className="mr-2 h-4 w-4" />
                  View
                </Button>
                <Button
                  size="sm"
                  onClick={() => onContactRestaurant('Organic Table')}
                  className="flex-1 rounded-xl bg-primary hover:bg-primary/90"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Contact
                </Button>
              </div>
            </div>

            {/* Restaurant Match 2 */}
            <div className="rounded-2xl border-2 border-primary/10 bg-gradient-to-br from-primary/5 to-transparent p-5">
              <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    VK
                  </div>
                  <div>
                    <h4 className="mb-1 font-medium">Verde Kitchen</h4>
                    <p className="text-sm text-muted-foreground">
                      Modern European
                    </p>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  88% Match
                </Badge>
              </div>
              <div className="mb-4 space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>15 min away</span>
                </div>
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-primary" />
                  <span>Looking for: Root vegetables, fresh herbs</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>Needs bi-weekly deliveries</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onViewRestaurantProfile('6')}
                  className="flex-1 rounded-xl"
                >
                  <Eye className="mr-2 h-4 w-4" />
                  View
                </Button>
                <Button
                  size="sm"
                  onClick={() => onContactRestaurant('Verde Kitchen')}
                  className="flex-1 rounded-xl bg-primary hover:bg-primary/90"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Contact
                </Button>
              </div>
            </div>

            {/* Restaurant Match 3 */}
            <div className="rounded-2xl border-2 border-primary/10 bg-gradient-to-br from-primary/5 to-transparent p-5">
              <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    RC
                  </div>
                  <div>
                    <h4 className="mb-1 font-medium">Roots Cafe</h4>
                    <p className="text-sm text-muted-foreground">
                      Healthy Casual Dining
                    </p>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  82% Match
                </Badge>
              </div>
              <div className="mb-4 space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>22 min away</span>
                </div>
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-primary" />
                  <span>Looking for: Mixed vegetables, greens</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>Needs daily deliveries</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onViewRestaurantProfile('7')}
                  className="flex-1 rounded-xl"
                >
                  <Eye className="mr-2 h-4 w-4" />
                  View
                </Button>
                <Button
                  size="sm"
                  onClick={() => onContactRestaurant('Roots Cafe')}
                  className="flex-1 rounded-xl bg-primary hover:bg-primary/90"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Contact
                </Button>
              </div>
            </div>

            {/* Restaurant Match 4 */}
            <div className="rounded-2xl border-2 border-primary/10 bg-gradient-to-br from-primary/5 to-transparent p-5">
              <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    SE
                  </div>
                  <div>
                    <h4 className="mb-1 font-medium">Season's Essence</h4>
                    <p className="text-sm text-muted-foreground">Fine Dining</p>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  90% Match
                </Badge>
              </div>
              <div className="mb-4 space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>18 min away</span>
                </div>
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-primary" />
                  <span>Looking for: Premium vegetables, rare varieties</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>Needs 3x weekly deliveries</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onViewRestaurantProfile('8')}
                  className="flex-1 rounded-xl"
                >
                  <Eye className="mr-2 h-4 w-4" />
                  View
                </Button>
                <Button
                  size="sm"
                  onClick={() => onContactRestaurant("Season's Essence")}
                  className="flex-1 rounded-xl bg-primary hover:bg-primary/90"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Contact
                </Button>
              </div>
            </div>
          </div>
          <Button
            variant="outline"
            className="mt-6 w-full rounded-xl"
            onClick={() => toast.success('Opening restaurant discovery')}
          >
            View All Matches
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </Card>

      {/* Recent Activity & Quick Actions */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Reviews */}
        <Card className="rounded-3xl border-0 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
          <div className="border-b border-border p-6">
            <div className="flex items-center gap-2">
              <div className="rounded-xl bg-accent/10 p-2">
                <Star className="h-5 w-5 text-accent" />
              </div>
              <h3 className="text-lg">Recent Reviews</h3>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="rounded-2xl border-2 border-accent/10 bg-accent/5 p-4">
                <div className="mb-2 flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                      GT
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Green Table</h4>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-3 w-3 fill-accent text-accent"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    1d ago
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  "Exceptional quality! The tomatoes were incredibly fresh."
                </p>
              </div>

              <div className="rounded-2xl border-2 border-accent/10 bg-accent/5 p-4">
                <div className="mb-2 flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                      FF
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Farm to Fork</h4>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-3 w-3 fill-accent text-accent"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    2d ago
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  "Reliable deliveries and great communication!"
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Pending Invoices */}
        <Card className="rounded-3xl border-0 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
          <div className="border-b border-border p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="rounded-xl bg-accent/10 p-2">
                  <FileText className="h-5 w-5 text-accent" />
                </div>
                <h3 className="text-lg">Pending Invoices</h3>
              </div>
              <Badge variant="secondary">2</Badge>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              <div className="rounded-2xl border-2 border-accent/10 bg-accent/5 p-4">
                <div className="mb-2 flex items-start justify-between">
                  <div>
                    <h4 className="mb-1 text-sm font-medium">INV-2024-002</h4>
                    <p className="text-sm text-muted-foreground">
                      Farm to Fork
                    </p>
                  </div>
                  <span className="text-primary">€32.40</span>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Due: Nov 06, 2024</span>
                  <Badge variant="secondary">Pending</Badge>
                </div>
              </div>

              <div className="rounded-2xl border-2 border-accent/10 bg-accent/5 p-4">
                <div className="mb-2 flex items-start justify-between">
                  <div>
                    <h4 className="mb-1 text-sm font-medium">INV-2024-003</h4>
                    <p className="text-sm text-muted-foreground">Green Table</p>
                  </div>
                  <span className="text-primary">€78.20</span>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Due: Nov 07, 2024</span>
                  <Badge variant="secondary">Sent</Badge>
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              className="mt-4 w-full rounded-xl"
              onClick={() => toast.success('Opening invoices')}
            >
              View All Invoices
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}