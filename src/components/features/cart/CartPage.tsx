import { useEffect, useState } from 'react';
import { Trash2, TrendingUp, ShoppingBag } from 'lucide-react';
import { Button } from '@components/ui/button';
import { ImageWithFallback } from '@components/ui/image-with-fallback';
import { useLanguage } from '@contexts/LanguageContext';
import { formatCurrency } from '@/utils/formatters';

interface CartPageProps {
  onCheckout: () => void;
}

export function CartPage({ onCheckout }: CartPageProps) {
  const { t } = useLanguage();
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: t('productHeirloomTomatoes'),
      producer: t('supplierNameGreenValleyFarm'),
      price: 45,
      quantity: 3,
      unit: 'kg',
      image:
        'https://images.unsplash.com/photo-1591171551239-80a5eddd627a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b21hdG9lcyUyMGZyZXNoJTIwbWFya2V0fGVufDF8fHx8MTc2MTMwNzMzOXww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 2,
      name: t('freeRangeEggs'),
      producer: t('supplierNameSunriseFarm'),
      price: 52,
      quantity: 2,
      unit: t('dozenUnit'),
      image:
        'https://images.unsplash.com/photo-1669669420238-7a4be2e3eac6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwZWdncyUyMGZhcm18ZW58MXx8fHwxNzYxMjcyMTk0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 3,
      name: t('productExtraVirginOliveOil'),
      producer: t('supplierNameOliveGroveEstate'),
      price: 120,
      quantity: 1,
      unit: 'L',
      image:
        'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbGl2ZSUyMG9pbCUyMGJvdHRsZXxlbnwxfHx8fDE3NjEyMDU0MTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ]);

  useEffect(() => {
    setCartItems(prev =>
      prev.map(item => {
        if (item.id === 1)
          return {
            ...item,
            name: t('productHeirloomTomatoes'),
            producer: t('supplierNameGreenValleyFarm'),
          };
        if (item.id === 2)
          return {
            ...item,
            name: t('freeRangeEggs'),
            producer: t('supplierNameSunriseFarm'),
            unit: t('dozenUnit'),
          };
        if (item.id === 3)
          return {
            ...item,
            name: t('productExtraVirginOliveOil'),
            producer: t('supplierNameOliveGroveEstate'),
          };
        return item;
      })
    );
  }, [t]);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(
      cartItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const deliveryFee = 50;
  const total = subtotal + deliveryFee;

  const aiSuggestion = {
    recommendedQuantity: 4,
    savings: 125,
    reasoning: t('aiDemandPredictionReasoning'),
  };

  return (
    <div className='min-h-screen py-12'>
      <div className='mx-auto max-w-[1440px] px-8'>
        <div className='mb-8'>
          <h1 className='mb-2 text-4xl text-primary'>{t('shoppingCart')}</h1>
          <p className='text-muted-foreground'>
            {cartItems.length}{' '}
            {cartItems.length === 1 ? t('item') : t('items')} {t('inYourCart')}
          </p>
        </div>

        <div className='grid gap-8 lg:grid-cols-3'>
          {/* Cart Items */}
          <div className='lg:col-span-2'>
            <div className='space-y-4'>
              {cartItems.map(item => (
                <div
                  key={item.id}
                  className='duration-250 group overflow-hidden rounded-2xl bg-white p-6 shadow-[0_1px_4px_rgba(0,0,0,0.08)] transition-all hover:shadow-[0_2px_8px_rgba(0,0,0,0.12)]'
                >
                  <div className='flex gap-6'>
                    <div className='h-32 w-32 flex-shrink-0 overflow-hidden rounded-xl'>
                      <ImageWithFallback
                        src={item.image}
                        alt={item.name}
                        width={128}
                        height={128}
                        className='h-full w-full object-cover'
                      />
                    </div>
                    <div className='flex flex-1 flex-col justify-between'>
                      <div>
                        <h3 className='mb-1'>{item.name}</h3>
                        <p className='text-sm text-muted-foreground'>
                          {item.producer}
                        </p>
                      </div>
                      <div className='flex items-end justify-between'>
                        <div className='flex items-center rounded-xl border border-border bg-background'>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className='px-3 py-2 transition-colors hover:bg-muted'
                          >
                            −
                          </button>
                          <span className='min-w-[3rem] text-center'>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className='px-3 py-2 transition-colors hover:bg-muted'
                          >
                            +
                          </button>
                        </div>
                        <div className='text-right'>
                          <div className='text-sm text-muted-foreground'>
                            {formatCurrency(item.price, 'SEK')}/{item.unit}
                          </div>
                          <div className='text-xl text-primary'>
                            {formatCurrency(item.price * item.quantity, 'SEK')}
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className='duration-250 h-fit rounded-lg p-2 text-muted-foreground opacity-0 transition-all hover:bg-destructive/10 hover:text-destructive group-hover:opacity-100'
                    >
                      <Trash2 className='h-5 w-5' />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {cartItems.length === 0 && (
              <div className='flex flex-col items-center justify-center rounded-2xl bg-white p-16 shadow-[0_1px_4px_rgba(0,0,0,0.08)]'>
                <ShoppingBag className='mb-4 h-16 w-16 text-muted-foreground' />
                <h3 className='mb-2'>{t('yourCartIsEmpty')}</h3>
                <p className='text-muted-foreground'>
                  {t('startAddingItemsToCart')}
                </p>
              </div>
            )}
          </div>

          {/* Summary Card */}
          <div className='lg:col-span-1'>
            <div className='sticky top-24 space-y-6'>
              {/* AI Suggestion Card */}
              <div className='overflow-hidden rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 p-6 shadow-[0_2px_8px_rgba(0,0,0,0.08)] backdrop-blur-sm'>
                <div className='mb-4 flex items-center gap-2'>
                  <TrendingUp className='h-5 w-5 text-primary' />
                  <h3 className='text-lg'>{t('aiDemandPrediction')}</h3>
                </div>
                <div className='mb-4 rounded-xl bg-white/80 p-4 backdrop-blur-sm'>
                  <p className='mb-2 text-sm text-muted-foreground'>
                    {aiSuggestion.reasoning}
                  </p>
                  <div className='mb-1'>
                    {t('recommendedWeeklyOrder')}: {' '}
                    <span className='text-primary'>
                      {aiSuggestion.recommendedQuantity} {t('items')}
                    </span>
                  </div>
                  <div className='text-sm text-accent'>
                    {t('potentialSavings')}: {formatCurrency(aiSuggestion.savings, 'SEK')}
                  </div>
                </div>
                <Button
                  variant='outline'
                  className='w-full border-primary/20 hover:bg-primary/10'
                >
                  {t('applySuggestion')}
                </Button>
              </div>

              {/* Order Summary */}
              <div className='overflow-hidden rounded-2xl bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.08)] backdrop-blur-sm'>
                <h3 className='mb-4 text-lg'>{t('orderSummary')}</h3>
                <div className='mb-4 space-y-3'>
                  <div className='flex justify-between'>
                    <span className='text-muted-foreground'>{t('subtotal')}</span>
                    <span>{formatCurrency(subtotal, 'SEK')}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-muted-foreground'>{t('delivery')}</span>
                    <span>{formatCurrency(deliveryFee, 'SEK')}</span>
                  </div>
                  <div className='border-t border-border pt-3'>
                    <div className='flex justify-between text-lg'>
                      <span>{t('total')}</span>
                      <span className='text-primary'>
                        {formatCurrency(total, 'SEK')}
                      </span>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={onCheckout}
                  disabled={cartItems.length === 0}
                  className='duration-250 h-12 w-full rounded-xl bg-primary text-primary-foreground transition-all hover:bg-accent hover:shadow-[0_4px_12px_rgba(197,108,74,0.3)]'
                >
                  {t('proceedToCheckout')}
                </Button>
                <p className='mt-4 text-center text-sm text-muted-foreground'>
                  {t('estimatedDelivery')}: {t('thursday8am')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
