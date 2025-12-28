// Analytics tab component for supplier dashboard

import { Card } from '@components/ui/card';
import { Button } from '@components/ui/button';
import { Badge } from '@components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  Calendar,
  Download,
} from 'lucide-react';
import { useLanguage } from '@contexts/LanguageContext';
import { formatCurrency } from '@/utils/formatters';

interface SupplierAnalyticsTabProps {
  // Analytics data would be passed as props
}

export function SupplierAnalyticsTab({}: SupplierAnalyticsTabProps) {
  const { t } = useLanguage();
  // Mock analytics data
  const revenueData = [
    { month: 'Jan', revenue: 8500, orders: 45 },
    { month: 'Feb', revenue: 9200, orders: 52 },
    { month: 'Mar', revenue: 10800, orders: 61 },
    { month: 'Apr', revenue: 12450, orders: 68 },
    { month: 'May', revenue: 11200, orders: 58 },
    { month: 'Jun', revenue: 13400, orders: 72 },
  ];

  const topProducts = [
    { name: 'Heirloom Tomatoes', sales: 245, revenue: 'kr11,025.00' },
    { name: 'Organic Carrots', sales: 189, revenue: 'kr6,048.00' },
    { name: 'Fresh Lettuce', sales: 134, revenue: 'kr3,752.00' },
    { name: 'Organic Spinach', sales: 98, revenue: 'kr3,430.00' },
  ];

  const topCustomers = [
    { name: 'Bella Vista Restaurant', orders: 24, total: 'kr23,405.00' },
    { name: 'The Garden Bistro', orders: 31, total: 'kr31,208.00' },
    { name: 'Café Moderno', orders: 18, total: 'kr18,902.00' },
  ];

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h2 className='text-2xl font-bold'>{t('analyticsAndReports')}</h2>
          <p className='text-muted-foreground'>
            {t('analyticsDescription')}
          </p>
        </div>
        <div className='flex items-center space-x-2'>
          <Select defaultValue='6months'>
            <SelectTrigger className='w-40'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='1month'>{t('lastMonth')}</SelectItem>
              <SelectItem value='3months'>{t('last3Months')}</SelectItem>
              <SelectItem value='6months'>{t('last6Months')}</SelectItem>
              <SelectItem value='1year'>{t('lastYear')}</SelectItem>
            </SelectContent>
          </Select>
          <Button variant='outline'>
            <Download className='mr-2 h-4 w-4' />
            {t('export')}
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
        <Card className='p-6'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-muted-foreground'>
                {t('totalRevenue')}
              </p>
              <p className='text-2xl font-bold'>{formatCurrency(655500, 'SEK')}</p>
              <div className='mt-2 flex items-center'>
                <TrendingUp className='mr-1 h-4 w-4 text-green-500' />
                <span className='text-sm text-green-600'>
                  +15.2% {t('fromLastPeriod')}
                </span>
              </div>
            </div>
            <DollarSign className='h-8 w-8 text-primary' />
          </div>
        </Card>

        <Card className='p-6'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-muted-foreground'>
                {t('totalOrders')}
              </p>
              <p className='text-2xl font-bold'>356</p>
              <div className='mt-2 flex items-center'>
                <TrendingUp className='mr-1 h-4 w-4 text-green-500' />
                <span className='text-sm text-green-600'>
                  +8.3% {t('fromLastPeriod')}
                </span>
              </div>
            </div>
            <ShoppingCart className='h-8 w-8 text-primary' />
          </div>
        </Card>

        <Card className='p-6'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-muted-foreground'>
                {t('activeCustomers')}
              </p>
              <p className='text-2xl font-bold'>89</p>
              <div className='mt-2 flex items-center'>
                <TrendingUp className='mr-1 h-4 w-4 text-green-500' />
                <span className='text-sm text-green-600'>
                  +12.5% {t('fromLastPeriod')}
                </span>
              </div>
            </div>
            <Users className='h-8 w-8 text-primary' />
          </div>
        </Card>

        <Card className='p-6'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-muted-foreground'>
                {t('avgOrderValue')}
              </p>
              <p className='text-2xl font-bold'>{formatCurrency(1841.3, 'SEK')}</p>
              <div className='mt-2 flex items-center'>
                <TrendingDown className='mr-1 h-4 w-4 text-red-500' />
                <span className='text-sm text-red-600'>
                  -2.1% {t('fromLastPeriod')}
                </span>
              </div>
            </div>
            <BarChart3 className='h-8 w-8 text-primary' />
          </div>
        </Card>
      </div>

      {/* Revenue Chart Placeholder */}
      <Card className='p-6'>
        <div className='mb-6 flex items-center justify-between'>
          <h3 className='text-lg font-semibold'>{t('revenueTrend')}</h3>
          <div className='flex items-center space-x-2'>
            <Badge variant='outline'>{t('sixMonths')}</Badge>
            <Button variant='outline' size='sm'>
              <Calendar className='mr-2 h-4 w-4' />
              {t('customRange')}
            </Button>
          </div>
        </div>
        <div className='flex h-64 items-center justify-center rounded-lg bg-muted/20'>
          <div className='text-center'>
            <BarChart3 className='mx-auto mb-4 h-12 w-12 text-muted-foreground' />
            <p className='text-muted-foreground'>
              {t('revenueChartPlaceholder')}
            </p>
            <p className='text-sm text-muted-foreground'>
              {t('chartIntegrationNeeded')}
            </p>
          </div>
        </div>
      </Card>

      <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
        {/* Top Products */}
        <Card className='p-6'>
          <h3 className='mb-4 text-lg font-semibold'>
            {t('topPerformingProducts')}
          </h3>
          <div className='space-y-4'>
            {topProducts.map((product, index) => (
              <div key={index} className='flex items-center justify-between'>
                <div className='flex items-center space-x-3'>
                  <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10'>
                    <Package className='h-4 w-4 text-primary' />
                  </div>
                  <div>
                    <p className='font-medium'>{product.name}</p>
                    <p className='text-sm text-muted-foreground'>
                      {product.sales} {t('unitsSold')}
                    </p>
                  </div>
                </div>
                <div className='text-right'>
                  <p className='font-semibold'>{product.revenue}</p>
                  <p className='text-sm text-muted-foreground'>{t('revenueLabel')}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Top Customers */}
        <Card className='p-6'>
          <h3 className='mb-4 text-lg font-semibold'>{t('topCustomers')}</h3>
          <div className='space-y-4'>
            {topCustomers.map((customer, index) => (
              <div key={index} className='flex items-center justify-between'>
                <div className='flex items-center space-x-3'>
                  <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10'>
                    <Users className='h-4 w-4 text-primary' />
                  </div>
                  <div>
                    <p className='font-medium'>{customer.name}</p>
                    <p className='text-sm text-muted-foreground'>
                      {customer.orders} {t('orders')}
                    </p>
                  </div>
                </div>
                <div className='text-right'>
                  <p className='font-semibold'>{customer.total}</p>
                  <p className='text-sm text-muted-foreground'>{t('totalSpent')}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Performance Insights */}
      <Card className='p-6'>
        <h3 className='mb-4 text-lg font-semibold'>{t('performanceInsights')}</h3>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
          <div className='text-center'>
            <div className='mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100'>
              <TrendingUp className='h-6 w-6 text-green-600' />
            </div>
            <h4 className='mb-2 font-semibold'>{t('revenueGrowth')}</h4>
            <p className='text-sm text-muted-foreground'>
              {t('revenueGrowthDescription')}
            </p>
          </div>
          <div className='text-center'>
            <div className='mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100'>
              <Users className='h-6 w-6 text-blue-600' />
            </div>
            <h4 className='mb-2 font-semibold'>{t('customerAcquisition')}</h4>
            <p className='text-sm text-muted-foreground'>
              {t('customerAcquisitionDescription')}
            </p>
          </div>
          <div className='text-center'>
            <div className='mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-100'>
              <Package className='h-6 w-6 text-yellow-600' />
            </div>
            <h4 className='mb-2 font-semibold'>{t('productPerformance')}</h4>
            <p className='text-sm text-muted-foreground'>
              {t('productPerformanceDescription')}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
