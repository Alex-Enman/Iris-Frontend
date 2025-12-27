import { useState } from 'react';
import { toast } from 'sonner';
import { getStoredLanguage, t } from '@lib/i18n';

export interface AccountData {
  fullName: string;
  email: string;
  phone: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface RestaurantData {
  name: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  taxId: string;
}

export interface NotificationPrefs {
  orderUpdates: boolean;
  newProducts: boolean;
  promotions: boolean;
  weeklyDigest: boolean;
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
}

export interface OrderingPrefs {
  autoReorder: boolean;
  savedPaymentMethod: boolean;
  requireApproval: boolean;
  defaultDeliveryTime: 'morning' | 'afternoon' | 'evening';
}

export function useSettingsPage() {
  const language = getStoredLanguage();
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [accountData, setAccountData] = useState<AccountData>({
    fullName: 'John Smith',
    email: 'john@labelacucina.com',
    phone: '+1 (555) 123-4567',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [restaurantData, setRestaurantData] = useState<RestaurantData>({
    name: 'La Bella Cucina',
    address: '123 Main Street',
    city: 'Downtown',
    postalCode: '10001',
    country: 'United States',
    taxId: 'US123456789',
  });

  const [notifications, setNotifications] = useState<NotificationPrefs>({
    orderUpdates: true,
    newProducts: true,
    promotions: false,
    weeklyDigest: true,
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
  });

  const [orderingPrefs, setOrderingPrefs] = useState<OrderingPrefs>({
    autoReorder: false,
    savedPaymentMethod: true,
    requireApproval: true,
    defaultDeliveryTime: 'morning',
  });

  const handleSaveAccount = () => {
    if (
      accountData.newPassword &&
      accountData.newPassword !== accountData.confirmPassword
    ) {
      toast.error(t('passwordsDoNotMatch', language));
      return;
    }
    toast.success(t('accountSettingsSaved', language), {
      description: t('accountInfoUpdated', language),
    });
  };

  const handleSaveRestaurant = () => {
    toast.success(t('restaurantSettingsSaved', language), {
      description: t('restaurantInfoUpdated', language),
    });
  };

  const handleSaveNotifications = () => {
    toast.success(t('notificationPreferencesSaved', language), {
      description: t('notificationSettingsUpdated', language),
    });
  };

  const handleSaveOrdering = () => {
    toast.success(t('orderingPreferencesSaved', language), {
      description: t('orderingPreferencesUpdated', language),
    });
  };

  return {
    // visibility
    showPassword,
    setShowPassword,
    showNewPassword,
    setShowNewPassword,
    // account
    accountData,
    setAccountData,
    handleSaveAccount,
    // restaurant
    restaurantData,
    setRestaurantData,
    handleSaveRestaurant,
    // notifications
    notifications,
    setNotifications,
    handleSaveNotifications,
    // ordering
    orderingPrefs,
    setOrderingPrefs,
    handleSaveOrdering,
  };
}
