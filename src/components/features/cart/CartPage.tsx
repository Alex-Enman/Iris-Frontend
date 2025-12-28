import { useMemo, useState } from 'react';
import { Trash2, TrendingUp, ShoppingBag } from 'lucide-react';
import { Button } from '@components/ui/button';
import { Badge } from '@components/ui/badge';
import { ImageWithFallback } from '@components/ui/image-with-fallback';
import { useLanguage } from '@contexts/LanguageContext';
import { useCartActions } from '@/hooks/cart/use-cart-actions';
import { formatCurrency } from '@/utils/formatters';
import { getPricingMode } from '@/utils/product-pricing';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@components/ui/dialog';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';

interface CartPageProps {
  onCheckout: () => void;
}

export function CartPage({ onCheckout }: CartPageProps) {
  const { t } = useLanguage();
  const {
    state,
    removeLineItem,
    updateLineItemQuantity,
    switchLineItemToDirect,
    switchLineItemToOffer,
  } = useCartActions();

  const [switchOfferOpen, setSwitchOfferOpen] = useState(false);
  const [switchOfferItemId, setSwitchOfferItemId] = useState<string | null>(null);
  const [switchOfferUnitPrice, setSwitchOfferUnitPrice] = useState<number>(0);

  const cartItems = state.items;

  const subtotal = useMemo(() => state.total, [state.total]);
  const deliveryFee = 50;
  const total = subtotal + deliveryFee;

  const aiSuggestion = {
    recommendedQuantity: 4,
    savings: 125,
    reasoning: t('aiDemandPredictionReasoning'),
  };

  const switchOfferItem = useMemo(
    () =>
      switchOfferItemId
        ? cartItems.find(i => i.id === switchOfferItemId) ?? null
        : null,
    [cartItems, switchOfferItemId]
  );

  const switchOfferError = useMemo(() => {
    if (!switchOfferOpen) return null;
    if (!Number.isFinite(switchOfferUnitPrice) || switchOfferUnitPrice <= 0)
      return t('invalidOfferPrice');
    return null;
  }, [switchOfferOpen, switchOfferUnitPrice, t]);

  const switchOfferPriceLabelKey = useMemo(() => {
    const mode = switchOfferItem ? getPricingMode(switchOfferItem) : 'perKg';
    return mode === 'batch' ? 'offerPricePerBatchLabel' : 'offerPricePerKgLabel';
  }, [switchOfferItem]);

  const openSwitchToOfferDialog = (itemId: string) => {
    const item = cartItems.find(i => i.id === itemId);
    if (!item) return;
    setSwitchOfferItemId(itemId);
    setSwitchOfferUnitPrice(item.listedUnitPrice);
    setSwitchOfferOpen(true);
  };

  const submitSwitchToOffer = () => {
    if (!switchOfferItemId) return;
    if (switchOfferError) return;
    switchLineItemToOffer(switchOfferItemId, switchOfferUnitPrice);
    setSwitchOfferOpen(false);
    setSwitchOfferItemId(null);
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
                        src={item.productImage || ''}
                        alt={item.productName}
                        width={128}
                        height={128}
                        className='h-full w-full object-cover'
                      />
                    </div>
                    <div className='flex flex-1 flex-col justify-between'>
                      <div>
                        <div className='mb-1 flex flex-wrap items-center gap-2'>
                          <h3>{item.productName}</h3>
                          <Badge
                            variant={
                              item.purchaseMode === 'offer' ? 'secondary' : 'default'
                            }
                            className='text-xs'
                          >
                            {item.purchaseMode === 'offer'
                              ? t('purchaseModeOffer')
                              : t('purchaseModeDirect')}
                          </Badge>
                          <button
                            onClick={() => {
                              if (item.purchaseMode === 'direct') {
                                openSwitchToOfferDialog(item.id);
                                return;
                              }

                              switchLineItemToDirect(item.id);
                            }}
                            className='text-xs text-muted-foreground underline-offset-4 transition-colors hover:text-primary hover:underline'
                          >
                            {item.purchaseMode === 'offer'
                              ? t('switchToDirectPurchase')
                              : t('switchToOfferPurchase')}
                          </button>
                        </div>
                        <p className='text-sm text-muted-foreground'>
                          {item.supplierName}
                        </p>
                        {(() => {
                          const mode = getPricingMode(item);
                          if (mode !== 'batch') return null;
                          const batchWeightKg = item.batchWeightKg;
                          const batchPriceSek = item.batchPriceSek;
                          if (
                            typeof batchWeightKg !== 'number' ||
                            !Number.isFinite(batchWeightKg) ||
                            batchWeightKg <= 0 ||
                            typeof batchPriceSek !== 'number' ||
                            !Number.isFinite(batchPriceSek) ||
                            batchPriceSek <= 0
                          )
                            return null;

                          const pricePerKg = item.unitPrice / batchWeightKg;

                          return (
                            <div className='mt-1 space-y-1 text-xs text-muted-foreground'>
                              <div>
                                {t('soldInBatchesBadge')}: {batchWeightKg} {t('kgShort')} {t('for')} {formatCurrency(batchPriceSek, 'SEK')}
                              </div>
                              <div>
                                {t('pricePerKgLabel')}: {formatCurrency(pricePerKg, 'SEK')}/{t('kgShort')}
                              </div>
                            </div>
                          );
                        })()}
                        {item.purchaseMode === 'offer' &&
                          typeof item.offeredUnitPrice === 'number' && (
                            <p className='mt-1 text-xs text-muted-foreground'>
                              {t('yourOffer')}: {formatCurrency(item.offeredUnitPrice, 'SEK')}
                              {item.pricingMode === 'batch'
                                ? `/${t('batchUnitShort')}`
                                : item.unit
                                  ? `/${item.unit}`
                                  : ''}
                            </p>
                          )}
                      </div>
                      <div className='flex items-end justify-between'>
                        <div className='flex items-center rounded-xl border border-border bg-background'>
                          <button
                            onClick={() =>
                              updateLineItemQuantity(item.id, item.quantity - 1)
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
                              updateLineItemQuantity(item.id, item.quantity + 1)
                            }
                            className='px-3 py-2 transition-colors hover:bg-muted'
                          >
                            +
                          </button>
                        </div>
                        <div className='text-right'>
                          <div className='text-sm text-muted-foreground'>
                            {formatCurrency(item.unitPrice, 'SEK')}
                            {item.pricingMode === 'batch'
                              ? `/${t('batchUnitShort')}`
                              : item.unit
                                ? `/${item.unit}`
                                : ''}
                          </div>
                          <div className='text-xl text-primary'>
                            {formatCurrency(item.totalPrice, 'SEK')}
                          </div>
                          <div className='mt-1 text-xs text-muted-foreground'>
                            {t('quantityLabel')}: {item.quantity}{' '}
                            {item.pricingMode === 'batch'
                              ? t('batchesLabel')
                              : t('kgShort')}
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => removeLineItem(item.id)}
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

      <Dialog open={switchOfferOpen} onOpenChange={setSwitchOfferOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('switchToOfferDialogTitle')}</DialogTitle>
            <DialogDescription>{t('switchToOfferDialogDescription')}</DialogDescription>
          </DialogHeader>

          <div className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='cart-offer-unit-price'>
                {t(switchOfferPriceLabelKey as any)} ({t('currencySekSymbol')})
              </Label>
              <Input
                id='cart-offer-unit-price'
                type='number'
                inputMode='decimal'
                min={0}
                step='0.01'
                value={switchOfferUnitPrice}
                onChange={e => setSwitchOfferUnitPrice(Number(e.target.value))}
              />
              {switchOfferItem && (
                <p className='text-xs text-muted-foreground'>
                  {t('listedPriceLabel')}: {formatCurrency(switchOfferItem.listedUnitPrice, 'SEK')}
                  {getPricingMode(switchOfferItem) === 'batch'
                    ? `/${t('batchUnitShort')}`
                    : switchOfferItem.unit
                      ? `/${switchOfferItem.unit}`
                      : ''}
                </p>
              )}
            </div>

            {switchOfferError && (
              <p className='text-sm text-destructive'>{switchOfferError}</p>
            )}
          </div>

          <DialogFooter>
            <Button
              variant='outline'
              onClick={() => {
                setSwitchOfferOpen(false);
                setSwitchOfferItemId(null);
              }}
            >
              {t('cancel')}
            </Button>
            <Button onClick={submitSwitchToOffer} disabled={!!switchOfferError}>
              {t('applyOffer')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
