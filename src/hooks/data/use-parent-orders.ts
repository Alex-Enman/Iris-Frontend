'use client';

import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants';
import { useLanguage } from '@contexts/LanguageContext';
import type {
  ParentOrder,
  ParentOrderItem,
  OrderFulfillment,
  ParentOrderOverallStatus,
  FulfillmentStatus,
} from '@/types/orders/parent-orders';

function getFulfillmentCounts(fulfillments: OrderFulfillment[]) {
  const counts: Record<FulfillmentStatus, number> = {
    processing: 0,
    confirmed: 0,
    preparing: 0,
    inTransit: 0,
    delivered: 0,
    cancelled: 0,
  };

  for (const f of fulfillments) counts[f.status] = (counts[f.status] ?? 0) + 1;
  return counts;
}

function deriveParentStatus(fulfillments: OrderFulfillment[]): ParentOrderOverallStatus {
  if (fulfillments.length === 0) return 'draft';

  const counts = getFulfillmentCounts(fulfillments);
  const total = fulfillments.length;

  if (counts.cancelled === total) return 'cancelled';
  if (counts.delivered === total) return 'completed';
  if (counts.delivered > 0) return 'partiallyDelivered';
  return 'inProgress';
}

function sumBy<T extends Record<string, any>>(items: T[], key: keyof T): number {
  return items.reduce((acc, i) => acc + (Number(i[key]) || 0), 0);
}

function calcPricing(items: ParentOrderItem[]) {
  const subtotal = items.reduce((acc, i) => acc + i.lineTotal, 0);
  const tax = Number((subtotal * 0.12).toFixed(2));
  const deliveryFee = subtotal > 800 ? 0 : 49;
  const total = Number((subtotal + tax + deliveryFee).toFixed(2));
  return { subtotal, tax, deliveryFee, total };
}

function createItem(input: {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  pricingMode: 'perKg' | 'batch';
  quantityUnit: 'kg' | 'batches';
  batchWeightKg?: number;
  purchaseMode: 'direct' | 'offer';
  offerStatus?: 'accepted' | 'pending' | 'rejected';
  listedUnitPrice: number;
  offeredUnitPrice?: number;
}): ParentOrderItem {
  const unitPrice =
    input.purchaseMode === 'offer'
      ? (input.offeredUnitPrice ?? input.listedUnitPrice)
      : input.listedUnitPrice;

  const lineTotal = Number((unitPrice * input.quantity).toFixed(2));

  return {
    id: input.id,
    productId: input.productId,
    productName: input.productName,
    quantity: input.quantity,
    pricing: {
      pricingMode: input.pricingMode,
      quantityUnit: input.quantityUnit,
      batchWeightKg: input.batchWeightKg,
      purchaseMode: input.purchaseMode,
      offerStatus: input.offerStatus,
      listedUnitPrice: input.listedUnitPrice,
      offeredUnitPrice: input.offeredUnitPrice,
      unitPrice,
    },
    lineTotal,
  };
}

function createFulfillment(input: Omit<OrderFulfillment, 'subtotal' | 'tax' | 'deliveryFee' | 'total'>) {
  const pricing = calcPricing(input.items);
  return {
    ...input,
    ...pricing,
  } as OrderFulfillment;
}

const MOCK_PARENT_ORDERS_BASE = [
  {
    id: 'PO-1024',
    placedAt: '2025-10-24T09:12:00Z',
    tab: 'active' as const,
    payment: {
      status: 'paid' as const,
      method: 'Visa',
      invoiceNumber: 'INV-2025-1024',
    },
    deliveryAddress: {
      street: 'Gastronomy Street 123',
      city: 'Stockholm',
      country: 'Sweden',
    },
    fulfillments: [
      createFulfillment({
        id: 'PO-1024::F-1',
        supplierId: '1',
        supplierName: 'Green Valley Farm',
        status: 'delivered',
        eta: '2025-10-24T11:30:00Z',
        deliveryWindow: '10:00–12:00',
        items: [
          createItem({
            id: 'i-1',
            productId: 'p-1',
            productName: 'Heirloom Tomatoes',
            quantity: 6,
            pricingMode: 'perKg',
            quantityUnit: 'kg',
            purchaseMode: 'direct',
            listedUnitPrice: 42,
          }),
          createItem({
            id: 'i-2',
            productId: 'p-2',
            productName: 'Mixed Greens',
            quantity: 4,
            pricingMode: 'perKg',
            quantityUnit: 'kg',
            purchaseMode: 'offer',
            offerStatus: 'accepted',
            listedUnitPrice: 38,
            offeredUnitPrice: 34,
          }),
        ],
        timeline: [
          {
            id: 'e-1',
            status: 'confirmed',
            at: '2025-10-24T09:20:00Z',
          },
          {
            id: 'e-2',
            status: 'inTransit',
            at: '2025-10-24T10:05:00Z',
          },
          {
            id: 'e-3',
            status: 'delivered',
            at: '2025-10-24T11:32:00Z',
          },
        ],
      }),
      createFulfillment({
        id: 'PO-1024::F-2',
        supplierId: '2',
        supplierName: 'Mountain Dairy Co.',
        status: 'inTransit',
        eta: '2025-10-25T08:00:00Z',
        deliveryWindow: '07:00–09:00',
        items: [
          createItem({
            id: 'i-3',
            productId: 'p-3',
            productName: 'Fresh Mozzarella',
            quantity: 3,
            pricingMode: 'perKg',
            quantityUnit: 'kg',
            purchaseMode: 'direct',
            listedUnitPrice: 120,
          }),
          createItem({
            id: 'i-4',
            productId: 'p-4',
            productName: 'Heavy Cream',
            quantity: 2,
            pricingMode: 'batch',
            quantityUnit: 'batches',
            batchWeightKg: 5,
            purchaseMode: 'direct',
            listedUnitPrice: 260,
          }),
        ],
        timeline: [
          {
            id: 'e-4',
            status: 'processing',
            at: '2025-10-24T09:25:00Z',
          },
          {
            id: 'e-5',
            status: 'confirmed',
            at: '2025-10-24T12:00:00Z',
          },
          {
            id: 'e-6',
            status: 'inTransit',
            at: '2025-10-24T18:30:00Z',
          },
        ],
      }),
      createFulfillment({
        id: 'PO-1024::F-3',
        supplierId: '3',
        supplierName: 'Heritage Bakery',
        status: 'processing',
        eta: '2025-10-25T06:30:00Z',
        deliveryWindow: '06:00–08:00',
        items: [
          createItem({
            id: 'i-5',
            productId: 'p-5',
            productName: 'Sourdough Bread',
            quantity: 8,
            pricingMode: 'batch',
            quantityUnit: 'batches',
            batchWeightKg: 2,
            purchaseMode: 'direct',
            listedUnitPrice: 55,
          }),
        ],
        timeline: [
          {
            id: 'e-7',
            status: 'processing',
            at: '2025-10-24T09:25:00Z',
          },
        ],
      }),
    ],
  },
  {
    id: 'PO-1019',
    placedAt: '2025-10-18T08:40:00Z',
    tab: 'completed' as const,
    payment: {
      status: 'paid' as const,
      method: 'Invoice',
      invoiceNumber: 'INV-2025-1019',
    },
    fulfillments: [
      createFulfillment({
        id: 'PO-1019::F-1',
        supplierId: '1',
        supplierName: 'Green Valley Farm',
        status: 'delivered',
        eta: '2025-10-18T12:30:00Z',
        deliveryWindow: '10:00–13:00',
        items: [
          createItem({
            id: 'i-6',
            productId: 'p-6',
            productName: 'Organic Carrots',
            quantity: 10,
            pricingMode: 'perKg',
            quantityUnit: 'kg',
            purchaseMode: 'direct',
            listedUnitPrice: 26,
          }),
        ],
      }),
      createFulfillment({
        id: 'PO-1019::F-2',
        supplierId: '4',
        supplierName: 'Olive Grove Estate',
        status: 'delivered',
        eta: '2025-10-18T09:30:00Z',
        deliveryWindow: '09:00–11:00',
        items: [
          createItem({
            id: 'i-7',
            productId: 'p-7',
            productName: 'Extra Virgin Olive Oil',
            quantity: 4,
            pricingMode: 'batch',
            quantityUnit: 'batches',
            batchWeightKg: 1,
            purchaseMode: 'offer',
            offerStatus: 'accepted',
            listedUnitPrice: 220,
            offeredUnitPrice: 199,
          }),
        ],
      }),
    ],
  },
  {
    id: 'PO-DRAFT-12',
    placedAt: '2025-10-26T07:05:00Z',
    tab: 'drafts' as const,
    payment: {
      status: 'pending' as const,
    },
    fulfillments: [],
  },
  {
    id: 'PO-REORDER-4',
    placedAt: '2025-10-10T06:10:00Z',
    tab: 'reorder' as const,
    payment: {
      status: 'paid' as const,
      method: 'Invoice',
      invoiceNumber: 'INV-2025-1004',
    },
    fulfillments: [
      createFulfillment({
        id: 'PO-REORDER-4::F-1',
        supplierId: '2',
        supplierName: 'Mountain Dairy Co.',
        status: 'delivered',
        eta: '2025-10-10T10:10:00Z',
        deliveryWindow: '09:00–11:00',
        items: [
          createItem({
            id: 'i-8',
            productId: 'p-3',
            productName: 'Fresh Mozzarella',
            quantity: 2,
            pricingMode: 'perKg',
            quantityUnit: 'kg',
            purchaseMode: 'direct',
            listedUnitPrice: 120,
          }),
        ],
      }),
    ],
  },
] as const;

function hydrateParentOrders(input: typeof MOCK_PARENT_ORDERS_BASE, t: (key: any) => string): ParentOrder[] {
  return input.map(base => {
    const fulfillments = base.fulfillments.map(f => ({
      ...f,
      supplierName:
        f.supplierName === 'Green Valley Farm'
          ? t('supplierNameGreenValleyFarm')
          : f.supplierName === 'Mountain Dairy Co.'
            ? t('supplierNameMountainDairyCo')
            : f.supplierName === 'Heritage Bakery'
              ? t('supplierNameHeritageBakery')
              : f.supplierName === 'Olive Grove Estate'
                ? t('supplierNameOliveGroveEstate')
                : f.supplierName,
      items: f.items.map(item => ({
        ...item,
        productName:
          item.productName === 'Heirloom Tomatoes'
            ? t('productHeirloomTomatoes')
            : item.productName,
      })),
    }));

    const subtotal = Number(sumBy(fulfillments, 'subtotal').toFixed(2));
    const tax = Number(sumBy(fulfillments, 'tax').toFixed(2));
    const deliveryFee = Number(sumBy(fulfillments, 'deliveryFee').toFixed(2));
    const total = Number(sumBy(fulfillments, 'total').toFixed(2));

    const status = deriveParentStatus(fulfillments);

    return {
      id: base.id,
      placedAt: base.placedAt,
      tab: base.tab,
      status,
      fulfillments,
      subtotal,
      tax,
      deliveryFee,
      total,
      currency: 'SEK',
      payment: base.payment,
      deliveryAddress: (base as any).deliveryAddress,
      restaurantName: (base as any).restaurantName,
    };
  });
}

export function useParentOrders() {
  const { t, language } = useLanguage();

  return useQuery({
    queryKey: [...QUERY_KEYS.PARENT_ORDERS, language],
    queryFn: async (): Promise<ParentOrder[]> => {
      await new Promise(resolve => setTimeout(resolve, 250));
      return hydrateParentOrders(MOCK_PARENT_ORDERS_BASE, t);
    },
    staleTime: 2 * 60 * 1000,
  });
}

export function useParentOrder(orderId: string) {
  const { t, language } = useLanguage();

  return useQuery({
    queryKey: [...QUERY_KEYS.PARENT_ORDER_DETAIL(orderId), language],
    queryFn: async (): Promise<ParentOrder> => {
      await new Promise(resolve => setTimeout(resolve, 200));
      const orders = hydrateParentOrders(MOCK_PARENT_ORDERS_BASE, t);
      const match = orders.find(o => o.id === orderId);
      if (!match) {
        throw new Error(`${t('orderNotFoundMessagePrefix')} ${orderId} ${t('orderNotFoundMessageSuffix')}`);
      }
      return match;
    },
    enabled: Boolean(orderId),
    staleTime: 2 * 60 * 1000,
  });
}
