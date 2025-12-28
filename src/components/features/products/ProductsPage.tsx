import { useMemo, useState } from 'react';
import { useProductPage } from '@hooks/products/use-product-page';
import { Button } from '@components/ui/button';
import { Badge } from '@components/ui/badge';
import { ImageWithFallback } from '@components/ui/image-with-fallback';
import { BadgeCheck, MapPin, Star, Truck, ArrowLeftRight } from 'lucide-react';
import { ProductTabs } from './components/ProductTabs';
import { ComparisonDialog } from './components/ComparisonDialog';
import { useLanguage } from '@contexts/LanguageContext';
import { useCartActions } from '@/hooks/cart/use-cart-actions';
import { formatCurrency } from '@/utils/formatters';
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@components/ui/tooltip';

interface ProductPageProps {
  onAddToCart: () => void;
}

export function ProductPage({ onAddToCart }: ProductPageProps) {
  const { t } = useLanguage();
  const { addDirectLineItem, addOfferLineItem } = useCartActions();
  const {
    quantity,
    setQuantity,
    imageScale,
    setImageScale,
    showCompare,
    setShowCompare,
    highlightBest,
    setHighlightBest,
    product,
    similarProducts,
    reviews,
  } = useProductPage();

  const [makeOfferOpen, setMakeOfferOpen] = useState(false);
  const [offerQuantity, setOfferQuantity] = useState(1);
  const [offerUnitPrice, setOfferUnitPrice] = useState(product.price);

  const demoProductId = useMemo(() => 'pdp-product-1', []);
  const demoSupplierId = useMemo(() => 'supplier-1', []);

  const offerFormError = useMemo(() => {
    if (!Number.isFinite(offerQuantity) || offerQuantity <= 0)
      return t('invalidOfferQuantity');
    if (!Number.isFinite(offerUnitPrice) || offerUnitPrice <= 0)
      return t('invalidOfferPrice');
    return null;
  }, [offerQuantity, offerUnitPrice, t]);

  const handleAddDirectlyToCart = () => {
    addDirectLineItem({
      productId: demoProductId,
      productName: product.name,
      productImage: product.image,
      unit: product.unit,
      quantity,
      listedUnitPrice: product.price,
      supplierId: demoSupplierId,
      supplierName: product.producer,
    });
    onAddToCart();
  };

  const handleSubmitOffer = () => {
    if (offerFormError) return;

    addOfferLineItem({
      productId: demoProductId,
      productName: product.name,
      productImage: product.image,
      unit: product.unit,
      quantity: offerQuantity,
      listedUnitPrice: product.price,
      offeredUnitPrice: offerUnitPrice,
      supplierId: demoSupplierId,
      supplierName: product.producer,
    });
    setMakeOfferOpen(false);
    onAddToCart();
  };

  return (
    <div className='min-h-screen'>
      <div className='mx-auto max-w-[1440px] px-8 py-12'>
        <div className='grid gap-12 lg:grid-cols-2'>
          <div className='sticky top-24 h-fit'>
            <div
              className='overflow-hidden rounded-3xl bg-white shadow-[0_4px_12px_rgba(0,0,0,0.12)]'
              onMouseMove={e => {
                setImageScale(1.2);
              }}
              onMouseLeave={() => setImageScale(1)}
            >
              <div className='aspect-square overflow-hidden'>
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  width={300}
                  height={200}
                  className='h-full w-full object-cover transition-transform duration-500 ease-out'
                  style={{ transform: `scale(${imageScale})` }}
                />
              </div>
            </div>
          </div>

          <div>
            <div className='mb-8'>
              <div className='mb-4 flex items-start justify-between'>
                <div>
                  <h1 className='mb-2 text-4xl text-primary'>{product.name}</h1>
                  <div className='flex items-center gap-2 text-muted-foreground'>
                    <span>{product.producer}</span>
                    {product.verified && (
                      <BadgeCheck className='h-5 w-5 text-primary' />
                    )}
                  </div>
                </div>
              </div>

              <div className='mb-6 flex items-center gap-4'>
                <div className='flex items-center gap-1'>
                  <Star className='h-5 w-5 fill-accent text-accent' />
                  <span className='text-lg'>{product.rating}</span>
                  <span className='text-muted-foreground'>
                    ({product.reviews} {t('reviews')})
                  </span>
                </div>
                <div className='flex items-center gap-1 text-muted-foreground'>
                  <MapPin className='h-4 w-4' />
                  <span>{product.location}</span>
                </div>
              </div>

              <div className='mb-6 text-4xl text-primary'>
                {formatCurrency(product.price, 'SEK')}
                <span className='text-xl text-muted-foreground'>
                  /{product.unit}
                </span>
              </div>

              <div className='mb-6 flex flex-wrap gap-3'>
                {product.badges.map((badge, index) => (
                  <div
                    key={index}
                    className='flex items-center gap-2 rounded-full bg-primary/5 px-4 py-2'
                  >
                    <badge.icon className={`h-4 w-4 ${badge.color}`} />
                    <span className='text-sm'>{badge.label}</span>
                  </div>
                ))}
              </div>

              <div className='mb-8 rounded-2xl bg-accent/10 p-4'>
                <div className='flex items-center gap-2'>
                  <Truck className='h-5 w-5 text-accent' />
                  <span className='text-sm'>
                    {t('estimatedDelivery')}: <strong>{product.delivery}</strong>
                  </span>
                </div>
              </div>

              <div className='mb-4 flex items-center gap-4'>
                <div className='flex items-center rounded-xl border border-border bg-white'>
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className='px-4 py-3 transition-colors hover:bg-muted'
                  >
                    −
                  </button>
                  <span className='min-w-[3rem] text-center'>{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className='px-4 py-3 transition-colors hover:bg-muted'
                  >
                    +
                  </button>
                </div>
                <TooltipProvider>
                  <div className='flex flex-1 flex-col gap-3 sm:flex-row'>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          onClick={handleAddDirectlyToCart}
                          className='duration-250 h-12 flex-1 rounded-xl bg-primary text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-[0_4px_12px_rgba(45,77,49,0.3)]'
                        >
                          {t('addDirectlyToCart')} —{' '}
                          {formatCurrency(product.price * quantity, 'SEK')}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{t('addDirectlyToCartTooltip')}</p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant='outline'
                          onClick={() => {
                            setOfferQuantity(quantity);
                            setOfferUnitPrice(product.price);
                            setMakeOfferOpen(true);
                          }}
                          className='duration-250 h-12 flex-1 rounded-xl transition-all hover:border-accent hover:bg-accent/10 hover:text-accent'
                        >
                          {t('makeOffer')}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{t('makeOfferTooltip')}</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </TooltipProvider>
              </div>

              <Button
                variant='outline'
                onClick={() => setShowCompare(true)}
                className='duration-250 mb-8 w-full rounded-xl transition-all hover:border-accent hover:bg-accent/10 hover:text-accent'
              >
                <ArrowLeftRight className='mr-2 h-4 w-4' />
                {t('compareWithSimilarProducts')}
              </Button>
            </div>

            <ProductTabs
              product={product}
              reviews={reviews}
              similarProducts={similarProducts}
            />
          </div>
        </div>
      </div>

      <div className='fixed bottom-0 left-0 right-0 border-t border-border bg-white/95 p-4 backdrop-blur-sm lg:hidden'>
        <TooltipProvider>
          <div className='flex gap-3'>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={handleAddDirectlyToCart}
                  className='h-12 flex-1 rounded-xl bg-primary text-primary-foreground'
                >
                  {t('addDirectlyToCart')} —{' '}
                  {formatCurrency(product.price * quantity, 'SEK')}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{t('addDirectlyToCartTooltip')}</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant='outline'
                  onClick={() => {
                    setOfferQuantity(quantity);
                    setOfferUnitPrice(product.price);
                    setMakeOfferOpen(true);
                  }}
                  className='h-12 flex-1 rounded-xl'
                >
                  {t('makeOffer')}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{t('makeOfferTooltip')}</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </div>

      <ComparisonDialog
        open={showCompare}
        onOpenChange={setShowCompare}
        highlightBest={highlightBest}
        onToggleHighlight={setHighlightBest}
        items={similarProducts}
        onAddToCart={() => {
          onAddToCart();
          setShowCompare(false);
        }}
      />

      <Dialog open={makeOfferOpen} onOpenChange={setMakeOfferOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('makeOfferDialogTitle')}</DialogTitle>
            <DialogDescription>{t('makeOfferDialogDescription')}</DialogDescription>
          </DialogHeader>

          <div className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='offer-quantity'>{t('offerQuantityLabel')}</Label>
              <div className='flex items-center rounded-xl border border-border bg-white'>
                <button
                  onClick={() => setOfferQuantity(Math.max(1, offerQuantity - 1))}
                  className='px-4 py-3 transition-colors hover:bg-muted'
                >
                  −
                </button>
                <span className='min-w-[3rem] text-center'>{offerQuantity}</span>
                <button
                  onClick={() => setOfferQuantity(offerQuantity + 1)}
                  className='px-4 py-3 transition-colors hover:bg-muted'
                >
                  +
                </button>
              </div>
            </div>

            <div className='space-y-2'>
              <Label htmlFor='offer-unit-price'>
                {t('offerPriceLabel')} ({t('currencySekSymbol')})
              </Label>
              <Input
                id='offer-unit-price'
                type='number'
                inputMode='decimal'
                min={0}
                step='0.01'
                value={offerUnitPrice}
                onChange={e => setOfferUnitPrice(Number(e.target.value))}
              />
              <p className='text-xs text-muted-foreground'>
                {t('listedPriceLabel')}: {formatCurrency(product.price, 'SEK')}/{product.unit}
              </p>
            </div>

            {offerFormError && (
              <p className='text-sm text-destructive'>{offerFormError}</p>
            )}
          </div>

          <DialogFooter>
            <Button variant='outline' onClick={() => setMakeOfferOpen(false)}>
              {t('cancel')}
            </Button>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button onClick={handleSubmitOffer} disabled={!!offerFormError}>
                    {t('submitOffer')}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{t('submitOfferTooltip')}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
