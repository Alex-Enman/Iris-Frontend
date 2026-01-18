import { OrderDetailsPage } from '@components/features/orders/OrderDetailsPage';

export default function OrderDetailsRoutePage({
  params,
}: {
  params: { orderId: string };
}) {
  return <OrderDetailsPage orderId={params.orderId} />;
}
