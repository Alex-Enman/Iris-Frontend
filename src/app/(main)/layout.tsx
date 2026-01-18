'use client';

import { ReactNode, useMemo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Navigation } from '@components/layout/components/Navigation';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();

  const currentPage = useMemo(() => {
    const path = pathname ?? '/';
    if (path.startsWith('/marketplace')) return 'marketplace';
    if (path.startsWith('/discover')) return 'discover';
    if (path.startsWith('/orders')) return 'orders';
    if (path.startsWith('/favorites')) return 'favorites';
    if (path.startsWith('/messages')) return 'messages';
    if (path.startsWith('/cart')) return 'cart';
    if (path.startsWith('/profile')) return 'profile';
    if (path.startsWith('/settings')) return 'settings';
    return 'overview';
  }, [pathname]);

  const handleNavigate = (page: string) => {
    if (page === 'overview') return router.push('/');
    if (page === 'marketplace') return router.push('/marketplace');
    if (page === 'discover') return router.push('/discover');
    if (page === 'orders') return router.push('/orders');
    if (page === 'favorites') return router.push('/favorites');
    if (page === 'messages') return router.push('/messages');
    if (page === 'cart') return router.push('/cart');
    if (page === 'profile') return router.push('/profile');
    if (page === 'settings') return router.push('/settings');
    return router.push('/');
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      <Navigation
        currentPage={currentPage}
        onNavigate={handleNavigate}
        cartCount={0}
        unreadMessages={0}
      />
      <main className='container mx-auto px-4 py-8'>{children}</main>
    </div>
  );
}
