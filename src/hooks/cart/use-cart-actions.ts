'use client';

import { useMutation } from '@tanstack/react-query';
import { useCart, AddItemInput, CartItem } from '@contexts/CartContext';

type AddDirectLineItemInput = Omit<
  AddItemInput,
  'purchaseMode' | 'offeredUnitPrice'
>;

type AddOfferLineItemInput = Omit<AddItemInput, 'purchaseMode'> & {
  offeredUnitPrice: number;
};

export function useCartActions() {
  const {
    state,
    addItem,
    removeItem,
    updateQuantity,
    setPurchaseMode,
    setOfferUnitPrice,
    clearCart,
    setItems,
  } = useCart();

  const addDirectLineItem = (input: AddDirectLineItemInput) => {
    addItem({
      ...input,
      purchaseMode: 'direct',
    });
  };

  const addOfferLineItem = (input: AddOfferLineItemInput) => {
    addItem({
      ...input,
      purchaseMode: 'offer',
    });
  };

  const switchLineItemToDirect = (itemId: string) => {
    setPurchaseMode(itemId, 'direct');
  };

  const switchLineItemToOffer = (itemId: string, offeredUnitPrice: number) => {
    setPurchaseMode(itemId, 'offer', offeredUnitPrice);
  };

  const updateOfferPrice = (itemId: string, offeredUnitPrice: number) => {
    setOfferUnitPrice(itemId, offeredUnitPrice);
  };

  const submitOffersAtCheckout = useMutation({
    mutationFn: async (items: CartItem[]) => {
      return items;
    },
  });

  return {
    state,
    addDirectLineItem,
    addOfferLineItem,
    removeLineItem: removeItem,
    updateLineItemQuantity: updateQuantity,
    switchLineItemToDirect,
    switchLineItemToOffer,
    updateOfferPrice,
    clearCart,
    setItems,
    submitOffersAtCheckout,
  };
}
