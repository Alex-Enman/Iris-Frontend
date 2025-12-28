'use client';

import { createContext, useContext, useReducer, ReactNode } from 'react';
import { Product } from '@/types';
import type { CartItem as DomainCartItem } from '@/types/cart';
import {
  getPricingMode,
  getProductListedUnitPrice,
  getProductQuantityUnit,
} from '@/utils/product-pricing';

/**
 * CartItem represents a simplified version of Product for cart functionality.
 * It includes only the essential fields needed for cart operations:
 * - Basic product info (id, name, price, unit)
 * - Cart-specific data (quantity)
 * - Supplier info for grouping and display
 * - Optional image for UI display
 *
 * This separation allows the cart to be lightweight while still maintaining
 * the relationship to the full Product entity.
 */
export type CartItem = DomainCartItem;

export type AddItemInput = {
  productId: string;
  productName: string;
  productImage?: string;
  unit?: string;
  quantity: number;
  quantityUnit?: 'kg' | 'batches';
  pricingMode?: 'perKg' | 'batch';
  batchWeightKg?: number;
  batchPriceSek?: number;
  purchaseMode: 'direct' | 'offer';
  listedUnitPrice: number;
  offeredUnitPrice?: number;
  supplierId: string;
  supplierName: string;
};

/**
 * Helper function to create a CartItem from a Product
 */
export const createCartItemFromProduct = (
  product: Product
): Omit<AddItemInput, 'quantity' | 'purchaseMode' | 'offeredUnitPrice'> => ({
  productId: product.id,
  productName: product.name,
  productImage: product.image,
  unit: product.unit,
  quantityUnit: getProductQuantityUnit(product),
  pricingMode: getPricingMode(product),
  batchWeightKg: product.batchWeightKg,
  batchPriceSek: product.batchPriceSek,
  listedUnitPrice: getProductListedUnitPrice(product),
  supplierId: product.supplierId,
  supplierName: product.supplierName,
});

interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: AddItemInput }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { itemId: string; quantity: number } }
  | {
      type: 'SET_PURCHASE_MODE';
      payload: {
        itemId: string;
        purchaseMode: 'direct' | 'offer';
        offeredUnitPrice?: number;
      };
    }
  | {
      type: 'SET_OFFER_UNIT_PRICE';
      payload: {
        itemId: string;
        offeredUnitPrice: number;
      };
    }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_ITEMS'; payload: CartItem[] };

const initialState: CartState = {
  items: [],
  total: 0,
  itemCount: 0,
};

function getEffectiveUnitPrice(input: {
  purchaseMode: 'direct' | 'offer';
  listedUnitPrice: number;
  offeredUnitPrice?: number;
}) {
  return input.purchaseMode === 'offer'
    ? (input.offeredUnitPrice ?? input.listedUnitPrice)
    : input.listedUnitPrice;
}

function normalizeOfferUnitPrice(offeredUnitPrice?: number) {
  if (typeof offeredUnitPrice !== 'number' || !Number.isFinite(offeredUnitPrice))
    return undefined;
  return Number(offeredUnitPrice.toFixed(2));
}

function getCartItemId(input: {
  productId: string;
  pricingMode?: 'perKg' | 'batch';
  purchaseMode: 'direct' | 'offer';
  offeredUnitPrice?: number;
}) {
  const pricingMode = input.pricingMode ?? 'perKg';
  if (input.purchaseMode === 'direct')
    return `${input.productId}::${pricingMode}::direct`;
  const normalized = normalizeOfferUnitPrice(input.offeredUnitPrice);
  return `${input.productId}::${pricingMode}::offer::${normalized ?? 'none'}`;
}

function getTotals(items: CartItem[]) {
  return {
    total: items.reduce((sum, item) => sum + item.totalPrice, 0),
    itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
  };
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const itemId = getCartItemId(action.payload);
      const existingItem = state.items.find(item => item.id === itemId);

      const effectiveUnitPrice = getEffectiveUnitPrice(action.payload);

      if (existingItem) {
        const nextQuantity = existingItem.quantity + action.payload.quantity;
        const updatedItems = state.items.map(item =>
          item.id === itemId
            ? {
                ...item,
                quantityUnit: action.payload.quantityUnit,
                pricingMode: action.payload.pricingMode,
                batchWeightKg: action.payload.batchWeightKg,
                batchPriceSek: action.payload.batchPriceSek,
                purchaseMode: action.payload.purchaseMode,
                listedUnitPrice: action.payload.listedUnitPrice,
                offeredUnitPrice: normalizeOfferUnitPrice(action.payload.offeredUnitPrice),
                unitPrice: effectiveUnitPrice,
                quantity: nextQuantity,
                totalPrice: effectiveUnitPrice * nextQuantity,
              }
            : item
        );

        const totals = getTotals(updatedItems);
        return { ...state, items: updatedItems, ...totals };
      }

      const newItem: CartItem = {
        id: itemId,
        productId: action.payload.productId,
        productName: action.payload.productName,
        productImage: action.payload.productImage,
        unit: action.payload.unit,
        quantity: action.payload.quantity,
        quantityUnit: action.payload.quantityUnit,
        pricingMode: action.payload.pricingMode,
        batchWeightKg: action.payload.batchWeightKg,
        batchPriceSek: action.payload.batchPriceSek,
        purchaseMode: action.payload.purchaseMode,
        listedUnitPrice: action.payload.listedUnitPrice,
        offeredUnitPrice: normalizeOfferUnitPrice(action.payload.offeredUnitPrice),
        unitPrice: effectiveUnitPrice,
        totalPrice: effectiveUnitPrice * action.payload.quantity,
        supplierId: action.payload.supplierId,
        supplierName: action.payload.supplierName,
        addedAt: new Date().toISOString(),
      };

      const newItems = [...state.items, newItem];
      const totals = getTotals(newItems);
      return { ...state, items: newItems, ...totals };
    }

    case 'REMOVE_ITEM': {
      const updatedItems = state.items.filter(item => item.id !== action.payload);
      const totals = getTotals(updatedItems);
      return {
        ...state,
        items: updatedItems,
        ...totals,
      };
    }

    case 'UPDATE_QUANTITY': {
      if (action.payload.quantity <= 0) {
        return cartReducer(state, {
          type: 'REMOVE_ITEM',
          payload: action.payload.itemId,
        });
      }

      const updatedItems = state.items.map(item =>
        item.id === action.payload.itemId
          ? {
              ...item,
              quantity: action.payload.quantity,
              totalPrice: item.unitPrice * action.payload.quantity,
            }
          : item
      );
      const totals = getTotals(updatedItems);
      return {
        ...state,
        items: updatedItems,
        ...totals,
      };
    }

    case 'SET_PURCHASE_MODE': {
      const sourceItem = state.items.find(item => item.id === action.payload.itemId);
      if (!sourceItem) return state;

      const nextOfferedUnitPrice =
        action.payload.purchaseMode === 'offer'
          ? normalizeOfferUnitPrice(action.payload.offeredUnitPrice)
          : undefined;

      const targetItemId = getCartItemId({
        productId: sourceItem.productId,
        pricingMode: sourceItem.pricingMode,
        purchaseMode: action.payload.purchaseMode,
        offeredUnitPrice: nextOfferedUnitPrice,
      });

      const unitPrice = getEffectiveUnitPrice({
        purchaseMode: action.payload.purchaseMode,
        listedUnitPrice: sourceItem.listedUnitPrice,
        offeredUnitPrice: nextOfferedUnitPrice,
      });

      const updatedSource: CartItem = {
        ...sourceItem,
        id: targetItemId,
        purchaseMode: action.payload.purchaseMode,
        offeredUnitPrice: nextOfferedUnitPrice,
        unitPrice,
        totalPrice: unitPrice * sourceItem.quantity,
      };

      const withoutSource = state.items.filter(item => item.id !== sourceItem.id);
      const existingTarget = withoutSource.find(item => item.id === targetItemId);

      const mergedItems = existingTarget
        ? withoutSource.map(item => {
            if (item.id !== targetItemId) return item;

            const nextQuantity = item.quantity + updatedSource.quantity;
            return {
              ...item,
              purchaseMode: updatedSource.purchaseMode,
              listedUnitPrice: updatedSource.listedUnitPrice,
              offeredUnitPrice: updatedSource.offeredUnitPrice,
              unitPrice: updatedSource.unitPrice,
              quantity: nextQuantity,
              totalPrice: updatedSource.unitPrice * nextQuantity,
            };
          })
        : [...withoutSource, updatedSource];

      const totals = getTotals(mergedItems);
      return { ...state, items: mergedItems, ...totals };
    }

    case 'SET_OFFER_UNIT_PRICE': {
      const sourceItem = state.items.find(item => item.id === action.payload.itemId);
      if (!sourceItem || sourceItem.purchaseMode !== 'offer') return state;

      const nextOfferedUnitPrice = normalizeOfferUnitPrice(
        action.payload.offeredUnitPrice
      );

      const targetItemId = getCartItemId({
        productId: sourceItem.productId,
        pricingMode: sourceItem.pricingMode,
        purchaseMode: 'offer',
        offeredUnitPrice: nextOfferedUnitPrice,
      });

      const unitPrice = getEffectiveUnitPrice({
        purchaseMode: 'offer',
        listedUnitPrice: sourceItem.listedUnitPrice,
        offeredUnitPrice: nextOfferedUnitPrice,
      });

      const updatedSource: CartItem = {
        ...sourceItem,
        id: targetItemId,
        offeredUnitPrice: nextOfferedUnitPrice,
        unitPrice,
        totalPrice: unitPrice * sourceItem.quantity,
      };

      const withoutSource = state.items.filter(item => item.id !== sourceItem.id);
      const existingTarget = withoutSource.find(item => item.id === targetItemId);

      const mergedItems = existingTarget
        ? withoutSource.map(item => {
            if (item.id !== targetItemId) return item;

            const nextQuantity = item.quantity + updatedSource.quantity;
            return {
              ...item,
              listedUnitPrice: updatedSource.listedUnitPrice,
              offeredUnitPrice: updatedSource.offeredUnitPrice,
              unitPrice: updatedSource.unitPrice,
              quantity: nextQuantity,
              totalPrice: updatedSource.unitPrice * nextQuantity,
            };
          })
        : [...withoutSource, updatedSource];

      const totals = getTotals(mergedItems);
      return { ...state, items: mergedItems, ...totals };
    }

    case 'CLEAR_CART':
      return initialState;

    case 'SET_ITEMS': {
      const totals = getTotals(action.payload);
      return {
        ...state,
        items: action.payload,
        ...totals,
      };
    }

    default:
      return state;
  }
}

interface CartContextType {
  state: CartState;
  addItem: (item: AddItemInput) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  setPurchaseMode: (
    itemId: string,
    purchaseMode: 'direct' | 'offer',
    offeredUnitPrice?: number
  ) => void;
  setOfferUnitPrice: (itemId: string, offeredUnitPrice: number) => void;
  clearCart: () => void;
  setItems: (items: CartItem[]) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItem = (item: AddItemInput) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const removeItem = (itemId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: itemId });
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { itemId, quantity },
    });
  };

  const setPurchaseMode = (
    itemId: string,
    purchaseMode: 'direct' | 'offer',
    offeredUnitPrice?: number
  ) => {
    dispatch({
      type: 'SET_PURCHASE_MODE',
      payload: { itemId, purchaseMode, offeredUnitPrice },
    });
  };

  const setOfferUnitPrice = (itemId: string, offeredUnitPrice: number) => {
    dispatch({
      type: 'SET_OFFER_UNIT_PRICE',
      payload: { itemId, offeredUnitPrice },
    });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const setItems = (items: CartItem[]) => {
    dispatch({ type: 'SET_ITEMS', payload: items });
  };

  return (
    <CartContext.Provider
      value={{
        state,
        addItem,
        removeItem,
        updateQuantity,
        setPurchaseMode,
        setOfferUnitPrice,
        clearCart,
        setItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
