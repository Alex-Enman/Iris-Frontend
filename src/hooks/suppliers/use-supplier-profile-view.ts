'use client';

import { useCallback, useState } from 'react';
import { toast } from 'sonner';
import { getStoredLanguage, t } from '@lib/i18n';

export interface UseSupplierProfileViewOptions {
  supplierId: string;
}

export function useSupplierProfileView({
  supplierId,
}: UseSupplierProfileViewOptions) {
  const language = getStoredLanguage();
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddToCart = useCallback(
    (productId: number, productName: string) => {
      toast.success(t('addedToCart', language), {
        description: productName,
      });
    },
    [language]
  );

  const handleToggleFavorite = useCallback(() => {
    setIsFavorite(prev => !prev);
    toast.success(t(!isFavorite ? 'addedToFavorites' : 'removedFromFavorites', language));
  }, [isFavorite, language]);

  const handleContact = useCallback(() => {
    toast.success(t('openingMessage', language));
  }, [language]);

  return {
    supplierId,
    isFavorite,
    handleAddToCart,
    handleToggleFavorite,
    handleContact,
  };
}

export type UseSupplierProfileViewReturn = ReturnType<
  typeof useSupplierProfileView
>;
