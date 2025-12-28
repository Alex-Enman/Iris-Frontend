'use client';

import { useCallback, useState } from 'react';
import { toast } from 'sonner';
import { getStoredLanguage, t } from '@lib/i18n';

export interface UseRestaurantProfileViewOptions {
  restaurantId: string;
}

export function useRestaurantProfileView({
  restaurantId,
}: UseRestaurantProfileViewOptions) {
  const language = getStoredLanguage();
  const [notes, setNotes] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);

  const handleContact = useCallback(() => {
    toast.success(t('openingMessage', language));
  }, [language]);

  const handleProposal = useCallback(() => {
    toast.success(t('creatingSupplyProposal', language));
  }, [language]);

  const handleFavorite = useCallback(() => {
    setIsFavorite(prev => !prev);
    toast.success(t(!isFavorite ? 'addedToFavorites' : 'removedFromFavorites', language));
  }, [isFavorite, language]);

  const handleSaveNotes = useCallback(() => {
    toast.success(t('notesSavedSuccessfully', language));
  }, [language]);

  return {
    restaurantId,
    notes,
    setNotes,
    isFavorite,
    handleContact,
    handleProposal,
    handleFavorite,
    handleSaveNotes,
  };
}

export type UseRestaurantProfileViewReturn = ReturnType<
  typeof useRestaurantProfileView
>;
