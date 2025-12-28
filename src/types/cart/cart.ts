export interface CartItem {
  id: string;
  productId: string;
  productName: string;
  productImage?: string;
  unit?: string;
  quantity: number;
  purchaseMode: 'direct' | 'offer';
  listedUnitPrice: number;
  offeredUnitPrice?: number;
  unitPrice: number;
  totalPrice: number;
  supplierId: string;
  supplierName: string;
  addedAt: string;
}

export interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
  totalItems: number;
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
}
