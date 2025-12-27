'use client';

import { Input } from '@components/ui/input';
import { Button } from '@components/ui/button';
import { Label } from '@components/ui/label';
import { Alert, AlertDescription } from '@components/ui/alert';
import { useLogin } from 'hooks/auth/use-login';
import { UserRole } from '@/types';
import { useLanguage } from '@contexts/LanguageContext';

interface LoginFormProps {
  onLogin: (userType: UserRole) => void;
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const { t } = useLanguage();
  const {
    formData: { username, password },
    error,
    loading,
    updateField,
    login,
  } = useLogin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userRole = await login();
    if (userRole) {
      onLogin(userRole);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='p-8'>
      <div className='space-y-5'>
        <div>
          <Label htmlFor='username'>{t('username')}</Label>
          <Input
            id='username'
            type='text'
            placeholder={t('enterYourUsername')}
            value={username}
            onChange={e => updateField('username', e.target.value)}
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
            onChange={e => updateField('password', e.target.value)}
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
  );
}
