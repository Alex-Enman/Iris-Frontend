'use client';

import { useEffect, useMemo, useState } from 'react';
import { Navigation } from '@components/layout';
import { HomePage } from '@components/features/home';
import { OverviewPage } from '@components/features/overview';
import { SuppliersPage } from '@components/features/suppliers/SuppliersPage';
import { SupplierProfileView } from '@components/features/suppliers/SupplierProfileView';
import { SupplierDashboard } from '@components/features/suppliers/supplier-dashboard/SupplierDashboard';
import { ProductPage } from '@components/features/products';
import { CartPage } from '@components/features/cart';
import { OrdersPage } from '@components/features/orders';
import { MarketplacePage } from '@components/features/marketplace/MarketplacePage';
import { DiscoverPage } from '@components/features/discover/DiscoverPage';
import {
  LoginPage,
  FavoritesPage,
  MessagesPage,
  ProfilePage,
  SettingsPage,
  RestaurantProfileView,
} from '@components/features/user';
import { Toaster } from '@components/ui/sonner';
import { toast } from 'sonner';
import { useLanguage } from '@contexts/LanguageContext';
import { useCart } from '@contexts/CartContext';

export default function App() {
  const { t } = useLanguage();
  const { state, clearCart } = useCart();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState<'supplier' | 'restaurant' | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState<string>('overview');
  const [currentProfileId, setCurrentProfileId] = useState<string | null>(null);
  const [unreadMessages, setUnreadMessages] = useState(3);

  const pageFromPath = useMemo(() => {
    const parse = (pathname: string) => {
      const parts = pathname.split('/').filter(Boolean);
      const first = parts[0] ?? '';
      const second = parts[1] ?? null;

      if (first === 'marketplace') return { page: 'marketplace', id: null };
      if (first === 'discover') return { page: 'discover', id: null };
      if (first === 'orders') return { page: 'orders', id: second };
      if (first === 'favorites') return { page: 'favorites', id: null };
      if (first === 'messages') return { page: 'messages', id: null };
      if (first === 'cart') return { page: 'cart', id: null };
      if (first === 'profile') return { page: 'profile', id: null };
      if (first === 'settings') return { page: 'settings', id: null };
      if (first === 'suppliers') {
        if (second) return { page: 'supplier-profile', id: second };
        return { page: 'discover', id: null };
      }
      if (first === 'products') {
        if (second) return { page: 'product', id: second };
        return { page: 'marketplace', id: null };
      }
      if (first === 'home') return { page: 'marketplace', id: null };
      return { page: 'overview', id: null };
    };

    return parse;
  }, []);

  const pathFromPage = (page: string, profileId?: string | null) => {
    if (page === 'marketplace') return '/marketplace';
    if (page === 'discover') return '/discover';
    if (page === 'orders') return '/orders';
    if (page === 'favorites') return '/favorites';
    if (page === 'messages') return '/messages';
    if (page === 'cart') return '/cart';
    if (page === 'profile') return '/profile';
    if (page === 'settings') return '/settings';
    if (page === 'supplier-profile') return `/suppliers/${encodeURIComponent(profileId ?? '1')}`;
    if (page === 'product') return `/products/${encodeURIComponent(profileId ?? '1')}`;
    if (page === 'overview') return '/';
    return '/';
  };

  useEffect(() => {
    const syncFromUrl = () => {
      const { page, id } = pageFromPath(window.location.pathname);
      setCurrentPage(page);
      setCurrentProfileId(id);
    };

    syncFromUrl();
    window.addEventListener('popstate', syncFromUrl);
    return () => window.removeEventListener('popstate', syncFromUrl);
  }, [pageFromPath]);

  const handleLogin = (type: 'supplier' | 'restaurant') => {
    setUserType(type);
    setIsAuthenticated(true);
    toast.success(t('welcome'), {
      description: `${t('loggedInAs')} ${type}`,
      duration: 3000,
    });
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserType(null);
    setCurrentPage('overview');
    clearCart();
    toast.success(t('loggedOutSuccessfully'), {
      duration: 3000,
    });
  };

  const handleNavigate = (page: string, profileId?: string) => {
    const normalizedPage =
      page === 'home' ? 'marketplace' : page === 'suppliers' ? 'discover' : page;
    setCurrentPage(normalizedPage);
    setCurrentProfileId(profileId || null);

    try {
      const nextPath = pathFromPage(normalizedPage, profileId);
      if (window.location.pathname !== nextPath) {
        window.history.pushState({}, '', nextPath);
      }
    } catch {
      // no-op
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = () => {
    toast.success(t('addedToCart'), {
      description: t('itemAddedToCart'),
      duration: 3000,
    });
  };

  const handleCheckout = () => {
    toast.success(t('orderPlaced'), {
      description: t('orderConfirmed'),
      duration: 3000,
    });
    clearCart();
    handleNavigate('orders');
  };

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return (
      <>
        <LoginPage onLogin={handleLogin} />
        <Toaster position='bottom-right' />
      </>
    );
  }

  // Show supplier dashboard if logged in as supplier
  if (userType === 'supplier') {
    return (
      <>
        <SupplierDashboard onLogout={handleLogout} />
        <Toaster position='bottom-right' />
      </>
    );
  }

  // Show restaurant marketplace if logged in as restaurant
  const renderPage = () => {
    switch (currentPage) {
      case 'overview':
        return (
          <OverviewPage
            unreadMessages={unreadMessages}
            onNavigateToMessages={() => handleNavigate('messages')}
            onNavigateToOrders={() => handleNavigate('orders')}
            onNavigateToMarketplace={() => handleNavigate('marketplace')}
            onNavigateToProduct={productId => handleNavigate('product', productId)}
            onNavigateToProfile={() => handleNavigate('profile')}
            onAddToCart={handleAddToCart}
          />
        );
      case 'marketplace':
        return (
          <MarketplacePage
            onNavigateToProduct={(productId: string) =>
              handleNavigate('product', productId)
            }
            onViewSupplier={(id: string) => handleNavigate('supplier-profile', id)}
          />
        );
      case 'discover':
        return (
          <DiscoverPage
            onNavigateToMarketplace={(params?: string) => {
              const next = `/marketplace${params ? `?${params}` : ''}`;
              window.history.pushState({}, '', next);
              setCurrentPage('marketplace');
            }}
            onViewSupplier={(id: string) => handleNavigate('supplier-profile', id)}
          />
        );
      case 'home':
        return (
          <HomePage
            onNavigateToProduct={productId => handleNavigate('product', productId)}
            onViewSupplier={id => handleNavigate('supplier-profile', id)}
          />
        );
      case 'suppliers':
        return (
          <SuppliersPage
            onViewSupplier={id => handleNavigate('supplier-profile', id)}
          />
        );
      case 'product':
        return (
          <ProductPage
            onAddToCart={handleAddToCart}
            productId={currentProfileId ?? undefined}
          />
        );
      case 'cart':
        return <CartPage onCheckout={handleCheckout} />;
      case 'favorites':
        return (
          <FavoritesPage
            onNavigateToProduct={productId => handleNavigate('product', productId)}
            onViewSupplier={id => handleNavigate('supplier-profile', id)}
          />
        );
      case 'orders':
        return (
          <OrdersPage
            onViewSupplier={id => handleNavigate('supplier-profile', id)}
          />
        );
      case 'messages':
        return (
          <MessagesPage
            onViewSupplier={id => handleNavigate('supplier-profile', id)}
          />
        );
      case 'profile':
        return (
          <ProfilePage
            onViewSupplier={id => handleNavigate('supplier-profile', id)}
          />
        );
      case 'settings':
        return <SettingsPage />;
      case 'supplier-profile':
        return (
          <SupplierProfileView
            supplierId={currentProfileId || '1'}
            onBack={() => handleNavigate('suppliers')}
          />
        );
      default:
        return (
          <OverviewPage
            unreadMessages={unreadMessages}
            onNavigateToMessages={() => handleNavigate('messages')}
            onNavigateToOrders={() => handleNavigate('orders')}
            onNavigateToMarketplace={() => handleNavigate('marketplace')}
            onNavigateToProduct={productId => handleNavigate('product', productId)}
            onNavigateToProfile={() => handleNavigate('profile')}
            onAddToCart={handleAddToCart}
          />
        );
    }
  };

  return (
    <div className='min-h-screen bg-background'>
      <Navigation
        currentPage={currentPage}
        onNavigate={handleNavigate}
        cartCount={state.itemCount}
        onLogout={handleLogout}
        unreadMessages={unreadMessages}
      />
      <main>{renderPage()}</main>
      <Toaster position='bottom-right' />
    </div>
  );
}
