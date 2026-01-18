export type ParentOrderTab = 'active' | 'completed' | 'reorder' | 'drafts';

export type ParentOrderOverallStatus =
  | 'draft'
  | 'inProgress'
  | 'partiallyDelivered'
  | 'completed'
  | 'cancelled';

export type FulfillmentStatus =
  | 'processing'
  | 'confirmed'
  | 'preparing'
  | 'inTransit'
  | 'delivered'
  | 'cancelled';

export type OrderPurchaseMode = 'direct' | 'offer';
export type OrderPricingMode = 'perKg' | 'batch';
export type OrderQuantityUnit = 'kg' | 'batches';
export type OfferStatus = 'accepted' | 'pending' | 'rejected';

export interface OrderTimelineEvent {
  id: string;
  status: FulfillmentStatus;
  at: string;
  note?: string;
}

export interface ParentOrderAddress {
  street: string;
  city: string;
  state?: string;
  zipCode?: string;
  country: string;
}

export interface OrderItemPricing {
  pricingMode: OrderPricingMode;
  quantityUnit: OrderQuantityUnit;
  batchWeightKg?: number;
  purchaseMode: OrderPurchaseMode;
  offerStatus?: OfferStatus;
  listedUnitPrice: number;
  offeredUnitPrice?: number;
  unitPrice: number;
}

export interface ParentOrderItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  pricing: OrderItemPricing;
  lineTotal: number;
}

export interface OrderFulfillment {
  id: string;
  supplierId: string;
  supplierName: string;
  status: FulfillmentStatus;
  eta?: string;
  deliveryWindow?: string;
  items: ParentOrderItem[];
  subtotal: number;
  tax: number;
  deliveryFee: number;
  total: number;
  timeline?: OrderTimelineEvent[];
}

export interface ParentOrderPayment {
  status: 'paid' | 'pending' | 'failed' | 'refunded';
  method?: string;
  invoiceNumber?: string;
}

export interface ParentOrder {
  id: string;
  placedAt: string;
  status: ParentOrderOverallStatus;
  tab: ParentOrderTab;
  restaurantName?: string;
  deliveryAddress?: ParentOrderAddress;
  fulfillments: OrderFulfillment[];
  subtotal: number;
  tax: number;
  deliveryFee: number;
  total: number;
  currency: 'SEK';
  payment: ParentOrderPayment;
}
