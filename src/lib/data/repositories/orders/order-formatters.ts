// Order formatting utilities

import { Order } from '@/types';
import { getCurrentLocale } from '@lib/i18n';

export function calculateTotalAmount(items: Order['items']): number {
  return items.reduce((total, item) => {
    return total + item.quantity * item.unitPrice;
  }, 0);
}

export function formatOrderDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString(getCurrentLocale(), {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
