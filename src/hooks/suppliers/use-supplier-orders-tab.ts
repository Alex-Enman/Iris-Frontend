import { useState } from 'react';
import { Order } from '@/types/suppliers/supplier-dashboard/types';
import { normalizeOrderStatusId } from '@/lib/data/repositories/orders/normalize-order-status';

interface UseSupplierOrdersTabOptions {
  orders: Order[];
  expandedOrderId: string | null;
  onToggleExpanded: (orderId: string) => void;
}

export function useSupplierOrdersTab({
  orders,
  expandedOrderId,
  onToggleExpanded,
}: UseSupplierOrdersTabOptions) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredOrders = orders.filter(order => {
    const matchesSearch =
      order.restaurant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' ||
      normalizeOrderStatusId(order.status) === normalizeOrderStatusId(statusFilter);
    return matchesSearch && matchesStatus;
  });

  // Group orders by status
  const isActive = (status: string) =>
    ['inTransit', 'processing', 'confirmed', 'shipped'].includes(
      normalizeOrderStatusId(status)
    );
  const isCompleted = (status: string) =>
    ['delivered', 'completed'].includes(status.toLowerCase());
  const isDraft = (status: string) => ['draft'].includes(status.toLowerCase());
  const isReorder = (o: Order) => (o as any).reorder === true; // optional flag on data

  const activeOrders = filteredOrders.filter(o => isActive(o.status));
  const completedOrders = filteredOrders.filter(o => isCompleted(o.status));
  const reorderOrders = filteredOrders.filter(o => isReorder(o));
  const draftOrders = filteredOrders.filter(o => isDraft(o.status));

  return {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    filteredOrders,
    activeOrders,
    completedOrders,
    reorderOrders,
    draftOrders,
    expandedOrderId,
    onToggleExpanded,
  };
}
