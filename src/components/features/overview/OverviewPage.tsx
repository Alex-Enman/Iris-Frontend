import { useMemo } from 'react';
import { useLanguage } from '@contexts/LanguageContext';
import { useOverviewPage } from '@hooks/overview/use-overview-page';
import { useOrders } from '@/hooks/data/use-orders';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import { EmptyState } from '@components/ui/empty-state';
import { LoadingSkeleton } from '@components/ui/loading-skeleton';
import { ImageWithFallback } from '@components/ui/image-with-fallback';
import { Tooltip, TooltipContent, TooltipTrigger } from '@components/ui/tooltip';
import { formatCurrency, formatDate, formatRelativeTime } from '@/utils/formatters';
import {
  MessageCircle,
  Package,
  AlertTriangle,
  ArrowRight,
  Star,
  ShoppingCart,
} from 'lucide-react';
import { getOrderStatusColor as getOrderStatusColorClass } from '@/lib/data/repositories/orders/order-status-formatter';
import { useCartActions } from '@/hooks/cart/use-cart-actions';
import { createCartItemFromProduct } from '@contexts/CartContext';

interface OverviewPageProps {
  unreadMessages: number;
  onNavigateToMessages: () => void;
  onNavigateToOrders: () => void;
  onNavigateToMarketplace: () => void;
  onNavigateToProduct: (productId: string) => void;
  onNavigateToProfile: () => void;
  onAddToCart?: () => void;
}

export function OverviewPage({
  unreadMessages,
  onNavigateToMessages,
  onNavigateToOrders,
  onNavigateToMarketplace,
  onNavigateToProduct,
  onNavigateToProfile,
  onAddToCart,
}: OverviewPageProps) {
  const { t } = useLanguage();
  const overview = useOverviewPage();
  const orders = useOrders();
  const { addDirectLineItem } = useCartActions();

  const recentOrders = useMemo(() => {
    const data = orders.data ?? [];
    return data.slice(0, 5);
  }, [orders.data]);

  const orderAgain = useMemo(() => {
    const latest = (orders.data ?? [])[0];
    return {
      lastOrderedAt: latest?.createdAt,
      items: latest?.items ?? [],
    };
  }, [orders.data]);

  const hotProducts = overview.data?.hotProducts ?? [];
  const urgentActions = overview.data?.urgentActions ?? [];
  const recentReviews = overview.data?.recentReviews ?? [];
  const unreadMessagePreviews = overview.data?.unreadMessagePreviews ?? [];

  const isLoading = overview.isLoading || orders.isLoading;

  const comingSoonTooltip = t('comingSoonTooltip');

  const renderDisabledCta = (label: string) => (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className='inline-flex'>
          <Button size='sm' variant='outline' disabled>
            {label}
          </Button>
        </span>
      </TooltipTrigger>
      <TooltipContent>{comingSoonTooltip}</TooltipContent>
    </Tooltip>
  );

  return (
    <div className='min-h-screen py-12'>
      <div className='mx-auto max-w-[1440px] px-8'>
        <div className='mb-8 rounded-3xl bg-gradient-to-br from-primary/5 to-accent/5 p-8'>
          <div className='flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between'>
            <div>
              <h1 className='mb-2 text-4xl text-primary'>{t('overview')}</h1>
              <p className='max-w-2xl text-muted-foreground'>
                {t('overviewRestaurantDescription')}
              </p>
            </div>
            <div className='flex flex-col gap-3 sm:flex-row'>
              <Button onClick={onNavigateToMarketplace} className='rounded-xl'>
                {t('browseProducts')}
                <ArrowRight className='ml-2 h-4 w-4' />
              </Button>
              <Button
                variant='outline'
                onClick={onNavigateToOrders}
                className='rounded-xl'
              >
                {t('viewAllOrders')}
              </Button>
            </div>
          </div>
        </div>

        <div className='grid gap-6 lg:grid-cols-3'>
          <div className='space-y-6 lg:col-span-2'>
            <Card className='overflow-hidden rounded-2xl bg-white shadow-[0_1px_4px_rgba(0,0,0,0.08)]'>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 border-b'>
                <div>
                  <CardTitle className='flex items-center gap-2 text-xl'>
                    <Package className='h-5 w-5 text-primary' />
                    {t('recentOrders')}
                  </CardTitle>
                  <p className='mt-1 text-sm text-muted-foreground'>
                    {t('overviewRecentOrdersDescription')}
                  </p>
                </div>
                <Button
                  variant='outline'
                  size='sm'
                  className='rounded-xl'
                  onClick={onNavigateToOrders}
                >
                  {t('viewAllOrders')}
                </Button>
              </CardHeader>
              <CardContent className='p-6'>
                {isLoading ? (
                  <LoadingSkeleton variant='list' count={4} />
                ) : recentOrders.length === 0 ? (
                  <EmptyState
                    variant='minimal'
                    icon={Package}
                    title={t('overviewNoRecentOrdersTitle')}
                    description={t('overviewNoRecentOrdersDescription')}
                    action={{
                      label: t('viewAllOrders'),
                      onClick: onNavigateToOrders,
                    }}
                  />
                ) : (
                  <div className='space-y-3'>
                    {recentOrders.map(o => (
                      <div
                        key={o.id}
                        className='flex flex-col gap-3 rounded-xl border bg-card p-4 sm:flex-row sm:items-center sm:justify-between'
                      >
                        <div className='min-w-0'>
                          <div className='flex flex-wrap items-center gap-2'>
                            <div className='text-sm font-medium text-foreground'>
                              {t('orderIdLabel')}: {o.id}
                            </div>
                            <Badge className={getOrderStatusColorClass(o.status)}>
                              {t(o.status as any)}
                            </Badge>
                          </div>
                          <div className='mt-1 text-sm text-muted-foreground'>
                            {formatDate(o.createdAt)}
                          </div>
                        </div>
                        <div className='flex items-center justify-between gap-4 sm:justify-end'>
                          <div className='text-sm font-medium text-foreground'>
                            {formatCurrency(o.total, 'SEK')}
                          </div>
                          <Button
                            size='sm'
                            variant='outline'
                            className='rounded-xl'
                            onClick={onNavigateToOrders}
                          >
                            {t('view')}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className='overflow-hidden rounded-2xl bg-white shadow-[0_1px_4px_rgba(0,0,0,0.08)]'>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 border-b'>
                <div>
                  <CardTitle className='text-xl'>{t('hotRightNow')}</CardTitle>
                  <p className='mt-1 text-sm text-muted-foreground'>
                    {t('overviewHotRightNowDescription')}
                  </p>
                </div>
                <Button
                  variant='outline'
                  size='sm'
                  className='rounded-xl'
                  onClick={onNavigateToMarketplace}
                >
                  {t('marketplace')}
                </Button>
              </CardHeader>
              <CardContent className='p-6'>
                {overview.isLoading ? (
                  <LoadingSkeleton variant='grid' count={4} />
                ) : hotProducts.length === 0 ? (
                  <EmptyState
                    variant='minimal'
                    title={t('overviewNoHotProductsTitle')}
                    description={t('overviewNoHotProductsDescription')}
                    action={{
                      label: t('browseProducts'),
                      onClick: onNavigateToMarketplace,
                    }}
                  />
                ) : (
                  <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
                    {hotProducts.slice(0, 6).map(p => (
                      <button
                        key={p.id}
                        onClick={() => onNavigateToProduct(p.id)}
                        className='duration-250 group overflow-hidden rounded-2xl border bg-card text-left transition-all hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)]'
                      >
                        <div className='relative aspect-square overflow-hidden'>
                          <ImageWithFallback
                            src={p.image}
                            alt={p.name}
                            width={300}
                            height={200}
                            className='h-full w-full object-cover transition-transform duration-200 group-hover:scale-105'
                          />
                        </div>
                        <div className='p-4'>
                          <div className='line-clamp-1 text-sm font-medium text-foreground'>
                            {p.name}
                          </div>
                          <div className='mt-1 line-clamp-1 text-xs text-muted-foreground'>
                            {p.supplierName}
                          </div>
                          <div className='mt-3 text-sm text-primary'>{p.priceLabel}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className='overflow-hidden rounded-2xl bg-white shadow-[0_1px_4px_rgba(0,0,0,0.08)]'>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 border-b'>
                <div>
                  <CardTitle className='text-xl'>{t('orderAgain')}</CardTitle>
                  <p className='mt-1 text-sm text-muted-foreground'>
                    {t('overviewOrderAgainDescription')}
                  </p>
                </div>
                <Button
                  variant='outline'
                  size='sm'
                  className='rounded-xl'
                  onClick={onNavigateToMarketplace}
                >
                  {t('browseProducts')}
                </Button>
              </CardHeader>
              <CardContent className='p-6'>
                {orders.isLoading ? (
                  <LoadingSkeleton variant='list' count={3} />
                ) : orderAgain.items.length === 0 ? (
                  <EmptyState
                    variant='minimal'
                    title={t('overviewNoOrderAgainTitle')}
                    description={t('overviewNoOrderAgainDescription')}
                    action={{
                      label: t('browseProducts'),
                      onClick: onNavigateToMarketplace,
                    }}
                  />
                ) : (
                  <div className='space-y-3'>
                    {orderAgain.items.slice(0, 4).map(item => {
                      const product = overview.data?.productsById?.[item.productId];
                      const canQuickAdd = Boolean(product?.isAvailable);

                      return (
                        <div
                          key={item.id}
                          className='flex flex-col gap-3 rounded-xl border bg-card p-4 sm:flex-row sm:items-center sm:justify-between'
                        >
                          <div className='min-w-0'>
                            <div className='text-sm font-medium text-foreground'>
                              {item.productName}
                            </div>
                            <div className='mt-1 text-xs text-muted-foreground'>
                              {t('lastOrder')}:{' '}
                              {orderAgain.lastOrderedAt
                                ? formatRelativeTime(orderAgain.lastOrderedAt)
                                : t('unknown')}
                            </div>
                          </div>
                          <div className='flex items-center justify-between gap-3 sm:justify-end'>
                            <Button
                              size='sm'
                              variant='outline'
                              className='rounded-xl'
                              onClick={() => onNavigateToProduct(item.productId)}
                            >
                              {t('viewDetails')}
                            </Button>
                            {canQuickAdd && product ? (
                              <Button
                                size='sm'
                                className='rounded-xl'
                                onClick={() => {
                                  const base = createCartItemFromProduct(product);
                                  addDirectLineItem({
                                    ...base,
                                    quantity: 1,
                                  });
                                  onAddToCart?.();
                                }}
                              >
                                <ShoppingCart className='mr-2 h-4 w-4' />
                                {t('quickAdd')}
                              </Button>
                            ) : (
                              renderDisabledCta(t('quickAdd'))
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className='space-y-6'>
            <Card className='overflow-hidden rounded-2xl bg-white shadow-[0_1px_4px_rgba(0,0,0,0.08)]'>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 border-b'>
                <div>
                  <CardTitle className='flex items-center gap-2 text-xl'>
                    <MessageCircle className='h-5 w-5 text-primary' />
                    {t('unreadMessages')}
                  </CardTitle>
                  <p className='mt-1 text-sm text-muted-foreground'>
                    {t('overviewUnreadMessagesDescription')}
                  </p>
                </div>
                <div className='flex items-center gap-3'>
                  {unreadMessages > 0 && (
                    <Badge className='bg-primary'>{unreadMessages}</Badge>
                  )}
                  <Button
                    variant='outline'
                    size='sm'
                    className='rounded-xl'
                    onClick={onNavigateToMessages}
                  >
                    {t('viewAllMessages')}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className='p-6'>
                {overview.isLoading ? (
                  <LoadingSkeleton variant='list' count={3} />
                ) : unreadMessages === 0 ? (
                  <EmptyState
                    variant='minimal'
                    icon={MessageCircle}
                    title={t('overviewNoUnreadMessagesTitle')}
                    description={t('overviewNoUnreadMessagesDescription')}
                    action={{
                      label: t('viewAllMessages'),
                      onClick: onNavigateToMessages,
                    }}
                  />
                ) : (
                  <div className='space-y-3'>
                    {unreadMessagePreviews.slice(0, 3).map(m => (
                      <button
                        key={m.id}
                        onClick={onNavigateToMessages}
                        className='w-full rounded-2xl border-2 border-primary/10 bg-primary/5 p-4 text-left transition-all hover:border-primary/20'
                      >
                        <div className='mb-2 flex items-start justify-between'>
                          <div className='flex items-start gap-3'>
                            <div className='flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm text-primary-foreground'>
                              {m.initials}
                            </div>
                            <div className='min-w-0'>
                              <h4 className='mb-1 line-clamp-1 font-medium'>
                                {m.name}
                              </h4>
                              <p className='line-clamp-2 text-sm text-muted-foreground'>
                                "{m.previewText}"
                              </p>
                            </div>
                          </div>
                          <Badge variant='secondary' className='text-xs'>
                            {formatRelativeTime(m.timestamp)}
                          </Badge>
                        </div>
                      </button>
                    ))}

                    <Button
                      variant='outline'
                      className='mt-4 w-full rounded-xl'
                      onClick={onNavigateToMessages}
                    >
                      {t('viewAllMessages')}
                      <ArrowRight className='ml-2 h-4 w-4' />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className='overflow-hidden rounded-2xl bg-white shadow-[0_1px_4px_rgba(0,0,0,0.08)]'>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 border-b'>
                <div>
                  <CardTitle className='flex items-center gap-2 text-xl'>
                    <AlertTriangle className='h-5 w-5 text-accent' />
                    {t('urgentActions')}
                  </CardTitle>
                  <p className='mt-1 text-sm text-muted-foreground'>
                    {t('overviewUrgentActionsDescription')}
                  </p>
                </div>
              </CardHeader>
              <CardContent className='p-6'>
                {overview.isLoading ? (
                  <LoadingSkeleton variant='text' count={6} />
                ) : urgentActions.length === 0 ? (
                  <EmptyState
                    variant='minimal'
                    icon={AlertTriangle}
                    title={t('overviewNoUrgentActionsTitle')}
                    description={t('overviewNoUrgentActionsDescription')}
                  />
                ) : (
                  <div className='space-y-3'>
                    {urgentActions.map(a => {
                      const badgeClass =
                        a.severity === 'warning'
                          ? 'bg-accent text-accent-foreground'
                          : 'bg-primary/10 text-primary';

                      const cta =
                        a.ctaType === 'navigate' && a.targetPage ? (
                          <Button
                            size='sm'
                            className='rounded-xl'
                            onClick={() => {
                              if (a.targetPage === 'orders') onNavigateToOrders();
                              else if (a.targetPage === 'profile') onNavigateToProfile();
                            }}
                          >
                            {a.ctaLabel}
                          </Button>
                        ) : (
                          renderDisabledCta(a.ctaLabel)
                        );

                      return (
                        <div
                          key={a.id}
                          className='flex flex-col gap-3 rounded-xl border bg-card p-4'
                        >
                          <div className='flex items-start justify-between gap-3'>
                            <div className='min-w-0'>
                              <div className='flex flex-wrap items-center gap-2'>
                                <div className='text-sm font-medium text-foreground'>
                                  {a.title}
                                </div>
                                <Badge className={badgeClass}>{t('urgent')}</Badge>
                              </div>
                              <div className='mt-1 text-xs text-muted-foreground'>
                                {a.description}
                              </div>
                            </div>
                            {cta}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className='overflow-hidden rounded-2xl bg-white shadow-[0_1px_4px_rgba(0,0,0,0.08)]'>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 border-b'>
                <div>
                  <CardTitle className='text-xl'>{t('recentReviews')}</CardTitle>
                  <p className='mt-1 text-sm text-muted-foreground'>
                    {t('overviewRecentReviewsDescription')}
                  </p>
                </div>
                {renderDisabledCta(t('seeAllReviews'))}
              </CardHeader>
              <CardContent className='p-6'>
                {overview.isLoading ? (
                  <LoadingSkeleton variant='text' count={6} />
                ) : recentReviews.length === 0 ? (
                  <EmptyState
                    variant='minimal'
                    icon={Star}
                    title={t('overviewNoRecentReviewsTitle')}
                    description={t('overviewNoRecentReviewsDescription')}
                  />
                ) : (
                  <div className='space-y-4'>
                    {recentReviews.slice(0, 3).map(r => (
                      <div key={r.id} className='rounded-xl border bg-card p-4'>
                        <div className='flex items-start justify-between gap-3'>
                          <div className='min-w-0'>
                            <div className='text-sm font-medium text-foreground'>
                              {r.supplierName}
                            </div>
                            <div className='mt-1 line-clamp-2 text-xs text-muted-foreground'>
                              {r.excerpt}
                            </div>
                          </div>
                          <div className='text-right'>
                            <div className='flex items-center justify-end gap-1 text-accent'>
                              <Star className='h-4 w-4 fill-accent text-accent' />
                              <span className='text-sm font-medium'>{r.rating}</span>
                            </div>
                            <div className='mt-1 text-xs text-muted-foreground'>
                              {formatRelativeTime(r.date)}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
