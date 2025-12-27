'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@components/ui/card';
import { Button } from '@components/ui/button';
import { Package, ShoppingCart, Users, TrendingUp } from 'lucide-react';
import { useLanguage } from '@contexts/LanguageContext';

export default function DashboardPage() {
  const { t } = useLanguage();
  return (
    <div className='space-y-8'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>{t('dashboard')}</h1>
        <p className='text-muted-foreground'>
          {t('dashboardWelcome')}
        </p>
      </div>

      {/* Quick Stats */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>{t('totalOrders')}</CardTitle>
            <ShoppingCart className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>2,350</div>
            <p className='text-xs text-muted-foreground'>
              +20.1% {t('fromLastMonth')}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>{t('products')}</CardTitle>
            <Package className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>1,234</div>
            <p className='text-xs text-muted-foreground'>
              +12.5% {t('fromLastMonth')}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>{t('suppliers')}</CardTitle>
            <Users className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>89</div>
            <p className='text-xs text-muted-foreground'>
              +3.2% {t('fromLastMonth')}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>{t('revenue')}</CardTitle>
            <TrendingUp className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>$45,231</div>
            <p className='text-xs text-muted-foreground'>
              +15.3% {t('fromLastMonth')}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        <Card>
          <CardHeader>
            <CardTitle>{t('recentOrders')}</CardTitle>
            <CardDescription>{t('yourLatestMarketplaceOrders')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-2'>
              <div className='flex items-center justify-between'>
                <span className='text-sm'>
                  {t('orderNumberPrefix')} #1234
                </span>
                <span className='text-sm text-muted-foreground'>$125.00</span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-sm'>
                  {t('orderNumberPrefix')} #1235
                </span>
                <span className='text-sm text-muted-foreground'>$89.50</span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-sm'>
                  {t('orderNumberPrefix')} #1236
                </span>
                <span className='text-sm text-muted-foreground'>$234.75</span>
              </div>
            </div>
            <Button className='mt-4 w-full' variant='outline'>
              {t('viewAllOrders')}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('topSuppliers')}</CardTitle>
            <CardDescription>{t('yourMostTrustedSuppliers')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-2'>
              <div className='flex items-center justify-between'>
                <span className='text-sm'>{t('freshFarmsCo')}</span>
                <span className='text-sm text-muted-foreground'>4.9★</span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-sm'>{t('organicValley')}</span>
                <span className='text-sm text-muted-foreground'>4.8★</span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-sm'>{t('localHarvest')}</span>
                <span className='text-sm text-muted-foreground'>4.7★</span>
              </div>
            </div>
            <Button className='mt-4 w-full' variant='outline'>
              {t('browseSuppliers')}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('quickActions')}</CardTitle>
            <CardDescription>{t('commonTasksAndShortcuts')}</CardDescription>
          </CardHeader>
          <CardContent className='space-y-2'>
            <Button className='w-full' variant='default'>
              {t('createNewOrder')}
            </Button>
            <Button className='w-full' variant='outline'>
              {t('browseProducts')}
            </Button>
            <Button className='w-full' variant='outline'>
              {t('manageSuppliers')}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
