// Data formatting utilities

import { getCurrentLocale, getStoredLanguage, t } from '@lib/i18n';

export const formatCurrency = (amount: number, currency = 'USD'): string => {
  return new Intl.NumberFormat(getCurrentLocale(), {
    style: 'currency',
    currency,
  }).format(amount);
};

export const formatNumber = (num: number, decimals = 0): string => {
  return new Intl.NumberFormat(getCurrentLocale(), {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num);
};

export const formatPercentage = (value: number, decimals = 1): string => {
  return new Intl.NumberFormat(getCurrentLocale(), {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value / 100);
};

export const formatDate = (
  date: string | Date,
  options?: Intl.DateTimeFormatOptions
): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };

  return new Intl.DateTimeFormat(getCurrentLocale(), {
    ...defaultOptions,
    ...options,
  }).format(dateObj);
};

export const formatDateTime = (date: string | Date): string => {
  return formatDate(date, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const formatTime = (date: string | Date): string => {
  return formatDate(date, {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const formatRelativeTime = (date: string | Date): string => {
  const language = getStoredLanguage();
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return t('justNow', language);
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    if (language === 'sv') {
      return `${diffInMinutes} ${t(diffInMinutes === 1 ? 'minuteAgo' : 'minutesAgo', language)}`;
    }
    return `${diffInMinutes} ${t(diffInMinutes === 1 ? 'minuteAgo' : 'minutesAgo', language)}`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    if (language === 'sv') {
      return `${diffInHours} ${t(diffInHours === 1 ? 'hourAgo' : 'hoursAgo', language)}`;
    }
    return `${diffInHours} ${t(diffInHours === 1 ? 'hourAgo' : 'hoursAgo', language)}`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    if (language === 'sv') {
      return `${diffInDays} ${t(diffInDays === 1 ? 'dayAgo' : 'daysAgo', language)}`;
    }
    return `${diffInDays} ${t(diffInDays === 1 ? 'dayAgo' : 'daysAgo', language)}`;
  }

  return formatDate(dateObj);
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const formatPhoneNumber = (phone: string): string => {
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');

  // Format as (XXX) XXX-XXXX for US numbers
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }

  // Return original if not 10 digits
  return phone;
};

export const formatAddress = (address: {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}): string => {
  return `${address.street}, ${address.city}, ${address.state} ${address.zipCode}, ${address.country}`;
};

export const formatOrderStatus = (status: string): string => {
  const language = getStoredLanguage();
  const statusKeyMap: Record<string, any> = {
    pending: 'pending',
    confirmed: 'confirmed',
    preparing: 'preparing',
    shipped: 'shipped',
    delivered: 'delivered',
    cancelled: 'cancelled',
    returned: 'returned',
  };

  const key = statusKeyMap[status];
  return key ? t(key, language) : status;
};

export const formatProductCategory = (category: string): string => {
  const language = getStoredLanguage();
  const categoryKeyMap: Record<string, any> = {
    produce: 'produce',
    meat: 'meat',
    seafood: 'seafood',
    dairy: 'dairy',
    beverages: 'beverages',
    pantry: 'pantry',
    frozen: 'frozen',
    bakery: 'bakery',
    spices: 'spices',
    other: 'other',
  };

  const key = categoryKeyMap[category];
  return key ? t(key, language) : category;
};

export const formatUserRole = (role: string): string => {
  const language = getStoredLanguage();
  const roleKeyMap: Record<string, any> = {
    restaurant: 'restaurantRole',
    supplier: 'supplierRole',
    admin: 'adminRole',
  };

  const key = roleKeyMap[role];
  return key ? t(key, language) : role;
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

export const capitalizeFirst = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

export const formatInitials = (firstName: string, lastName: string): string => {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
};

export const formatRating = (rating: number, maxRating = 5): string => {
  return `${rating.toFixed(1)}/${maxRating}`;
};

export const formatQuantity = (quantity: number, unit: string): string => {
  return `${quantity} ${unit}${quantity !== 1 ? 's' : ''}`;
};
