export function normalizeOrderStatusId(value: string): string {
  const raw = String(value ?? '').trim();
  const lower = raw.toLowerCase();

  if (lower === 'in transit' || lower === 'in_transit' || lower === 'intransit') {
    return 'inTransit';
  }

  return lower;
}
