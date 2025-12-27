'use client';

import { useState } from 'react';
import { Input } from '@components/ui/input';
import { Button } from '@components/ui/button';
import { Label } from '@components/ui/label';
import { Alert, AlertDescription } from '@components/ui/alert';
import { Store, UtensilsCrossed } from 'lucide-react';
import { UserRole } from '@/types';
import { getMockAuthCredentials } from '@/tests/mocks/mock-data';
import { useLanguage } from '@contexts/LanguageContext';
import type { TranslationKey } from '@lib/i18n';

interface LoginPageProps {
  onLogin: (userType: UserRole) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const { t } = useLanguage();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<TranslationKey | ''>('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate loading
    setTimeout(() => {
      // Bypass mode: accept any non-empty username and password
      if (username && password) {
        // Determine role based on username patterns
        if (
          username.toLowerCase().includes('supplier') ||
          username.toLowerCase().includes('vendor') ||
          username.toLowerCase().includes('seller')
        ) {
          onLogin(UserRole.SUPPLIER);
        } else {
          // Default to restaurant role
          onLogin(UserRole.RESTAURANT);
        }
      } else {
        setError('pleaseEnterBothUsernameAndPassword');
        setLoading(false);
      }
    }, 500);
  };

  const quickLogin = (type: UserRole) => {
    const credentials = getMockAuthCredentials();

    if (type === UserRole.SUPPLIER) {
      setUsername(credentials.supplier.username);
      setPassword(credentials.supplier.password);
    } else if (type === UserRole.RESTAURANT) {
      setUsername(credentials.restaurant.username);
      setPassword(credentials.restaurant.password);
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/5'>
      <div className='flex min-h-screen items-center justify-center px-4 py-12'>
        <div className='w-full max-w-md'>
          {/* Logo */}
          <div className='mb-8 text-center'>
            <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary shadow-[0_4px_16px_rgba(45,77,49,0.3)]'>
              <span className='text-3xl text-primary-foreground'>🌿</span>
            </div>
            <h1 className='mb-2 text-4xl tracking-tight text-primary'>Iris</h1>
            <p className='text-muted-foreground'>
              {t('loginTagline')}
            </p>
          </div>

          {/* Login Form */}
          <div className='overflow-hidden rounded-3xl bg-white shadow-[0_8px_32px_rgba(0,0,0,0.12)]'>
            <div className='bg-gradient-to-br from-primary/5 to-accent/5 p-6'>
              <h2 className='text-center text-2xl text-primary'>
                {t('welcomeBack')}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className='p-8'>
              <div className='space-y-5'>
                <div>
                  <Label htmlFor='username'>{t('username')}</Label>
                  <Input
                    id='username'
                    type='text'
                    placeholder={t('enterYourUsername')}
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    className='mt-2 h-12 rounded-xl'
                    required
                  />
                </div>

                <div>
                  <Label htmlFor='password'>{t('password')}</Label>
                  <Input
                    id='password'
                    type='password'
                    placeholder={t('enterYourPassword')}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className='mt-2 h-12 rounded-xl'
                    required
                  />
                </div>

                {error && (
                  <Alert variant='destructive' className='rounded-xl'>
                    <AlertDescription>{t(error)}</AlertDescription>
                  </Alert>
                )}

                <Button
                  type='submit'
                  disabled={loading}
                  className='duration-250 h-12 w-full rounded-xl bg-primary text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-[0_4px_12px_rgba(45,77,49,0.3)]'
                >
                  {loading ? t('signingInEllipsis') : t('signIn')}
                </Button>
              </div>
            </form>
          </div>

          {/* Quick Login Options */}
          <div className='mt-8'>
            <p className='mb-4 text-center text-sm text-muted-foreground'>
              {t('quickLoginForDemo')}
            </p>
            <div className='grid gap-3 sm:grid-cols-2'>
              <button
                onClick={() => quickLogin(UserRole.RESTAURANT)}
                className='duration-250 group rounded-2xl bg-white p-4 shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-all hover:-translate-y-1 hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)]'
              >
                <div className='mb-2 flex items-center justify-center'>
                  <div className='rounded-full bg-primary/10 p-3 transition-colors group-hover:bg-primary/20'>
                    <UtensilsCrossed className='h-6 w-6 text-primary' />
                  </div>
                </div>
                <h3 className='mb-1 text-center'>{t('restaurantRole')}</h3>
                <p className='text-center text-xs text-muted-foreground'>
                  {t('browseAndOrderProducts')}
                </p>
              </button>

              <button
                onClick={() => quickLogin(UserRole.SUPPLIER)}
                className='duration-250 group rounded-2xl bg-white p-4 shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-all hover:-translate-y-1 hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)]'
              >
                <div className='mb-2 flex items-center justify-center'>
                  <div className='rounded-full bg-accent/10 p-3 transition-colors group-hover:bg-accent/20'>
                    <Store className='h-6 w-6 text-accent' />
                  </div>
                </div>
                <h3 className='mb-1 text-center'>{t('supplierRole')}</h3>
                <p className='text-center text-xs text-muted-foreground'>
                  {t('manageYourStore')}
                </p>
              </button>
            </div>
          </div>

          {/* Footer */}
          <p className='mt-8 text-center text-xs text-muted-foreground'>
            {t('enterUsernameAndPasswordHint')}
          </p>
        </div>
      </div>
    </div>
  );
}
