export type PricingMode = 'perKg' | 'batch';

type ProductLike = {
  pricingMode?: PricingMode;
  price: number;
  unit?: string;
  batchWeightKg?: number;
  batchPriceSek?: number;
};

export function getPricingMode(input: {
  pricingMode?: PricingMode;
  batchWeightKg?: number;
  batchPriceSek?: number;
}): PricingMode {
  if (input.pricingMode) return input.pricingMode;
  if (
    typeof input.batchWeightKg === 'number' &&
    typeof input.batchPriceSek === 'number'
  ) {
    return 'batch';
  }
  return 'perKg';
}

export function getProductPricePerKgSek(product: ProductLike): number {
  const mode = getPricingMode(product);
  if (mode === 'batch') {
    const w = product.batchWeightKg ?? 0;
    const p = product.batchPriceSek ?? 0;
    if (!Number.isFinite(w) || w <= 0) return product.price;
    if (!Number.isFinite(p) || p <= 0) return product.price;
    return p / w;
  }
  return product.price;
}

export function getProductBatchSummary(product: ProductLike): {
  batchWeightKg: number;
  batchPriceSek: number;
} | null {
  const mode = getPricingMode(product);
  if (mode !== 'batch') return null;
  const batchWeightKg = product.batchWeightKg ?? 0;
  const batchPriceSek = product.batchPriceSek ?? 0;
  if (!Number.isFinite(batchWeightKg) || batchWeightKg <= 0) return null;
  if (!Number.isFinite(batchPriceSek) || batchPriceSek <= 0) return null;
  return { batchWeightKg, batchPriceSek };
}

export function getProductListedUnitPrice(product: ProductLike): number {
  const mode = getPricingMode(product);
  if (mode === 'batch') return product.batchPriceSek ?? product.price;
  return product.price;
}

export function getProductQuantityUnit(product: ProductLike): 'kg' | 'batches' {
  const mode = getPricingMode(product);
  return mode === 'batch' ? 'batches' : 'kg';
}
