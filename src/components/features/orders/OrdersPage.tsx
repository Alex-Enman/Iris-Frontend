import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs';
import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { Input } from '@components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select';
import { EmptyState } from '@components/ui/empty-state';
import { LoadingSkeleton } from '@components/ui/loading-skeleton';
import { useLanguage } from '@contexts/LanguageContext';
import { useParentOrders } from '@/hooks/data/use-parent-orders';
import { formatCurrency, formatDate, formatRelativeTime } from '@/utils/formatters';
import type {
  ParentOrder,
  ParentOrderTab,
  FulfillmentStatus,
} from '@/types/orders/parent-orders';
import {
  Package,
  Calendar,
  DollarSign,
  RefreshCw,
  Clock,
  CheckCircle,
  Store,
  Search,
  ArrowRight,
} from 'lucide-react';

interface OrdersPageProps {
  onViewSupplier?: (supplierId: string) => void;
}

export function OrdersPage({ onViewSupplier }: OrdersPageProps) {
  const { t } = useLanguage();
  const router = useRouter();
  const ordersQuery = useParentOrders();

  const [activeTab, setActiveTab] = useState<ParentOrderTab>('active');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<'newest' | 'oldest' | 'status'>('newest');

  const orders = ordersQuery.data ?? [];

  const ordersByTab = useMemo(() => {
    return {
      active: orders.filter(o => o.tab === 'active'),
      completed: orders.filter(o => o.tab === 'completed'),
      reorder: orders.filter(o => o.tab === 'reorder'),
      drafts: orders.filter(o => o.tab === 'drafts'),
    };
  }, [orders]);

  const currentOrders = ordersByTab[activeTab] ?? [];

  const filteredOrders = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = currentOrders;

    if (q) {
      list = list.filter(o => {
        const matchesOrderId = o.id.toLowerCase().includes(q);
        const matchesSupplier = o.fulfillments.some(f =>
          f.supplierName.toLowerCase().includes(q)
        );
        const matchesProduct = o.fulfillments.some(f =>
          f.items.some(i => i.productName.toLowerCase().includes(q))
        );
        return matchesOrderId || matchesSupplier || matchesProduct;
      });
    }

    const sorted = [...list].sort((a, b) => {
      if (sort === 'newest') return b.placedAt.localeCompare(a.placedAt);
      if (sort === 'oldest') return a.placedAt.localeCompare(b.placedAt);
      return String(a.status).localeCompare(String(b.status));
    });

    return sorted;
  }, [currentOrders, search, sort]);

  const countsByStatus = (o: ParentOrder) => {
    const counts: Record<FulfillmentStatus, number> = {
      processing: 0,
      confirmed: 0,
      preparing: 0,
      inTransit: 0,
      delivered: 0,
      cancelled: 0,
    };
    for (const f of o.fulfillments) counts[f.status] = (counts[f.status] ?? 0) + 1;
    return counts;
  };

  const nextExpectedDelivery = (o: ParentOrder) => {
    const candidates = o.fulfillments
      .filter(f => f.eta && f.status !== 'delivered' && f.status !== 'cancelled')
      .map(f => f.eta as string)
      .sort();
    return candidates[0];
  };

  const getParentStatusLabel = (status: ParentOrder['status']) => {
    switch (status) {
      case 'draft':
        return t('draft');
      case 'inProgress':
        return t('inProgress');
      case 'partiallyDelivered':
        return t('partiallyDelivered');
      case 'completed':
        return t('completed');
      case 'cancelled':
        return t('cancelled');
      default:
        return t('unknown');
    }
  };

  const getParentStatusClass = (status: ParentOrder['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-primary/10 text-primary';
      case 'partiallyDelivered':
        return 'bg-accent text-accent-foreground';
      case 'inProgress':
        return 'bg-primary/10 text-primary';
      case 'draft':
        return 'bg-muted text-foreground';
      case 'cancelled':
        return 'bg-destructive/15 text-destructive';
      default:
        return 'bg-muted text-foreground';
    }
  };

  const renderSupplierChips = (o: ParentOrder) => {
    const names = o.fulfillments.map(f => f.supplierName);
    const unique = Array.from(new Set(names));
    const shown = unique.slice(0, 3);
    const remaining = unique.length - shown.length;

    return (
      <div className='flex flex-wrap items-center gap-2'>
        {shown.map(name => (
          <Badge key={name} variant='secondary' className='max-w-[12rem] truncate'>
            {name}
          </Badge>
        ))}
        {remaining > 0 && (
          <Badge variant='secondary'>+{remaining}</Badge>
        )}
      </div>
    );
  };

  const renderFulfillmentSummary = (o: ParentOrder) => {
    const counts = countsByStatus(o);
    const parts: string[] = [];

    if (counts.delivered) parts.push(`${counts.delivered} ${t('delivered')}`);
    if (counts.inTransit) parts.push(`${counts.inTransit} ${t('inTransit')}`);

    const processingLike = counts.processing + counts.confirmed + counts.preparing;
    if (processingLike) parts.push(`${processingLike} ${t('processing')}`);
    if (counts.cancelled) parts.push(`${counts.cancelled} ${t('cancelled')}`);

    return parts.join(' • ');
  };

  const renderOrderRow = (o: ParentOrder) => {
    const eta = nextExpectedDelivery(o);

    return (
      <button
        key={o.id}
        onClick={() => router.push(`/orders/${o.id}`)}
        className='duration-250 w-full text-left transition-all'
      >
        <Card className='overflow-hidden rounded-2xl bg-white shadow-[0_1px_4px_rgba(0,0,0,0.08)] transition-all hover:shadow-[0_2px_10px_rgba(0,0,0,0.12)]'>
          <CardHeader className='space-y-3 border-b p-6'>
            <div className='flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between'>
              <div className='min-w-0'>
                <div className='flex flex-wrap items-center gap-3'>
                  <CardTitle className='text-lg'>{o.id}</CardTitle>
                  <Badge className={getParentStatusClass(o.status)}>
                    {getParentStatusLabel(o.status)}
                  </Badge>
                </div>
                <div className='mt-2 flex flex-wrap items-center gap-4 text-sm text-muted-foreground'>
                  <div className='flex items-center gap-1'>
                    <Calendar className='h-4 w-4' />
                    {formatDate(o.placedAt)}
                  </div>
                  <div className='flex items-center gap-1'>
                    <DollarSign className='h-4 w-4' />
                    {formatCurrency(o.total, 'SEK')}
                  </div>
                </div>
              </div>
              <div className='flex items-center justify-between gap-3 sm:justify-end'>
                <ArrowRight className='h-4 w-4 text-muted-foreground' />
              </div>
            </div>

            <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
              <div className='min-w-0'>
                <div className='text-xs font-medium text-muted-foreground'>
                  {t('suppliers')}
                </div>
                <div className='mt-2'>{renderSupplierChips(o)}</div>
              </div>
              <div className='text-sm text-muted-foreground'>
                {renderFulfillmentSummary(o)}
                {eta && (
                  <div className='mt-1 text-xs'>
                    {t('nextExpectedDelivery')}: {formatRelativeTime(eta)}
                  </div>
                )}
              </div>
            </div>
          </CardHeader>

          <CardContent className='p-6'>
            <div className='flex flex-wrap items-center justify-between gap-3'>
              <div className='text-sm text-muted-foreground'>
                {o.fulfillments.length === 0
                  ? t('draft')
                  : `${o.fulfillments.length} ${t('supplierFulfillments')}`}
              </div>

              {onViewSupplier && o.fulfillments.length > 0 && (
                <Button
                  variant='ghost'
                  size='sm'
                  className='h-8 rounded-xl px-3'
                  onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    onViewSupplier(o.fulfillments[0].supplierId);
                  }}
                >
                  <Store className='mr-2 h-4 w-4' />
                  {t('viewStore')}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </button>
    );
  };

  return (
    <div className='min-h-screen py-12'>
      <div className='mx-auto max-w-[1440px] px-8'>
        <div className='mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between'>
          <div>
            <h1 className='mb-2 text-4xl text-primary'>{t('orders')}</h1>
            <p className='text-muted-foreground'>{t('ordersDescription')}</p>
          </div>

          <div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
            <div className='relative w-full sm:w-[340px]'>
              <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
              <Input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder={t('searchOrdersShortPlaceholder')}
                className='rounded-xl pl-10'
              />
            </div>

            <Select value={sort} onValueChange={v => setSort(v as any)}>
              <SelectTrigger className='w-full rounded-xl sm:w-[180px]'>
                <SelectValue placeholder={t('sortBy')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='newest'>{t('newest')}</SelectItem>
                <SelectItem value='oldest'>{t('oldest')}</SelectItem>
                <SelectItem value='status'>{t('status')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={v => setActiveTab(v as any)} className='w-full'>
          <TabsList className='mb-8 grid w-full max-w-2xl grid-cols-4 rounded-xl bg-white p-1 shadow-[0_1px_4px_rgba(0,0,0,0.08)]'>
            <TabsTrigger value='active' className='rounded-lg'>
              <Clock className='mr-2 h-4 w-4' /> {t('active')} ({ordersByTab.active.length})
            </TabsTrigger>
            <TabsTrigger value='completed' className='rounded-lg'>
              <CheckCircle className='mr-2 h-4 w-4' /> {t('completed')} ({ordersByTab.completed.length})
            </TabsTrigger>
            <TabsTrigger value='reorder' className='rounded-lg'>
              <RefreshCw className='mr-2 h-4 w-4' /> {t('reorder')} ({ordersByTab.reorder.length})
            </TabsTrigger>
            <TabsTrigger value='drafts' className='rounded-lg'>
              <Package className='mr-2 h-4 w-4' /> {t('drafts')} ({ordersByTab.drafts.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className='space-y-4'>
            {ordersQuery.isLoading ? (
              <LoadingSkeleton variant='card' count={3} />
            ) : filteredOrders.length === 0 ? (
              <EmptyState
                variant='default'
                icon={Package}
                title={t('ordersEmptyTitle')}
                description={t('ordersEmptyDescription')}
                action={{
                  label: t('browseProducts'),
                  onClick: () => router.push('/'),
                }}
              />
            ) : (
              <div className='space-y-4'>
                {filteredOrders.map(renderOrderRow)}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
