// Custom hook for supplier dashboard state management

import { useEffect, useState } from 'react';
import {
  Product,
  NewProductForm,
  SupplierInfo,
  SupplierInfoForm,
  Order,
  Customer,
  DashboardTab,
} from '@/types/suppliers/supplier-dashboard/types';
import { getMockProducts } from '@/tests/mocks/mock-products';
import { getMockSupplierOrders } from '@/tests/mocks/mock-orders';
import { getMockSupplierCustomers } from '@/tests/mocks/mock-customers';
import { useLanguage } from '@contexts/LanguageContext';
import { useSupplierProductActions } from '@/hooks/suppliers/use-supplier-product-actions';

export function useSupplierDashboard() {
  const { t } = useLanguage();
  const { createProduct } = useSupplierProductActions();
  const [activeTab, setActiveTab] = useState<DashboardTab>('dashboard');
  const [editingProduct, setEditingProduct] = useState<number | null>(null);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isEditStoreOpen, setIsEditStoreOpen] = useState(false);
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [viewingRestaurantId, setViewingRestaurantId] = useState<string | null>(
    null
  );

  const [newProduct, setNewProduct] = useState<NewProductForm>({
    name: '',
    category: 'vegetables',
    price: '',
    unit: 'kg',
    pricingMode: 'perKg',
    batchWeightKg: '',
    batchPriceSek: '',
    stock: '',
    imageUrl: '',
  });

  // Mock supplier data
  const [supplierInfo, setSupplierInfo] = useState<SupplierInfo>({
    name: t('supplierNameGreenValleyFarm'),
    category: t('supplierCategoryOrganicVegetables'),
    location: t('supplierLocationValleyRidge12km'),
    verified: true,
    rating: 4.8,
    totalReviews: 127,
    memberSince: t('supplierMemberSinceMarch2022'),
    description: t('supplierDashboardDescriptionGreenValley'),
    certifications: [t('organicCertified'), t('localProducer'), t('traceable')],
    email: 'contact@greenvalleyfarm.com',
    phone: '+1 (555) 123-4567',
    website: 'www.greenvalleyfarm.com',
  });

  const [editStoreForm, setEditStoreForm] = useState<SupplierInfoForm>({
    name: supplierInfo.name,
    category: supplierInfo.category,
    location: supplierInfo.location,
    description: supplierInfo.description,
    email: supplierInfo.email,
    phone: supplierInfo.phone,
    website: supplierInfo.website,
  });

  // Mock products data
  const [products, setProducts] = useState<Product[]>(
    getMockProducts()
      .slice(0, 6)
      .map((p, idx) => ({
        id: idx + 1,
        name: p.name,
        category: 'vegetables',
        price: p.price,
        unit: p.unit,
        stock: (p as any).stockQuantity ?? 100,
        status: ((p as any).stockQuantity ?? 100) > 0 ? 'inStock' : 'outOfStock',
        image: p.image || '',
        sales: 0,
        revenue: 'kr0.00',
      }))
  );

  useEffect(() => {
    setSupplierInfo(prev => ({
      ...prev,
      name: t('supplierNameGreenValleyFarm'),
      category: t('supplierCategoryOrganicVegetables'),
      location: t('supplierLocationValleyRidge12km'),
      memberSince: t('supplierMemberSinceMarch2022'),
      description: t('supplierDashboardDescriptionGreenValley'),
      certifications: [t('organicCertified'), t('localProducer'), t('traceable')],
    }));

    setEditStoreForm(prev => ({
      ...prev,
      name: t('supplierNameGreenValleyFarm'),
      category: t('supplierCategoryOrganicVegetables'),
      location: t('supplierLocationValleyRidge12km'),
      description: t('supplierDashboardDescriptionGreenValley'),
    }));

    setProducts(prev =>
      prev.map(p => ({
        ...p,
        category: 'vegetables',
        status: p.stock > 0 ? 'inStock' : 'outOfStock',
      }))
    );
  }, [t]);

  // Mock orders data
  const [orders] = useState<Order[]>(getMockSupplierOrders());

  // Mock customers data
  const [customers] = useState<Customer[]>(getMockSupplierCustomers());

  const handleAddProduct = (form: NewProductForm) => {
    const mode = form.pricingMode ?? 'perKg';
    const stockValue = parseInt(form.stock);
    const hasValidStock = Number.isFinite(stockValue) && stockValue >= 0;

    const priceValue = parseFloat(form.price);
    const hasValidPerKgPrice = Number.isFinite(priceValue) && priceValue > 0;

    const batchWeightValue = parseFloat(form.batchWeightKg ?? '');
    const batchPriceValue = parseFloat(form.batchPriceSek ?? '');
    const hasValidBatch =
      Number.isFinite(batchWeightValue) &&
      batchWeightValue > 0 &&
      Number.isFinite(batchPriceValue) &&
      batchPriceValue > 0;

    if (
      form.name &&
      form.stock &&
      hasValidStock &&
      ((mode === 'perKg' && form.price && hasValidPerKgPrice) ||
        (mode === 'batch' && hasValidBatch))
    ) {
      const derivedPerKgPrice =
        mode === 'batch' ? batchPriceValue / batchWeightValue : priceValue;

      const nextId =
        products.length === 0 ? 1 : Math.max(...products.map(p => p.id)) + 1;
      const product: Product = {
        id: nextId,
        name: form.name,
        category: form.category,
        price: derivedPerKgPrice,
        unit: mode === 'batch' ? 'kg' : form.unit,
        pricingMode: mode,
        batchWeightKg: mode === 'batch' ? batchWeightValue : undefined,
        batchPriceSek: mode === 'batch' ? batchPriceValue : undefined,
        stock: stockValue,
        status: stockValue > 0 ? 'inStock' : 'outOfStock',
        image: form.imageUrl || 'https://via.placeholder.com/150',
        sales: 0,
        revenue: 'kr0.00',
      };

      setProducts(prev => [...prev, product]);
      void createProduct({ product });
    }
  };

  const handleEditProduct = (productId: number) => {
    setEditingProduct(productId);
  };

  const handleDeleteProduct = (productId: number) => {
    setProducts(products.filter(p => p.id !== productId));
  };

  const handleUpdateProduct = (
    productId: number,
    updatedProduct: Partial<Product>
  ) => {
    setProducts(
      products.map(p => (p.id === productId ? { ...p, ...updatedProduct } : p))
    );
    setEditingProduct(null);
  };

  const handleUpdateSupplierInfo = (updatedInfo: Partial<SupplierInfo>) => {
    setSupplierInfo({ ...supplierInfo, ...updatedInfo });
    setEditStoreForm({ ...editStoreForm, ...updatedInfo });
  };

  return {
    ui: {
      activeTab,
      setActiveTab,
      editingProduct,
      setEditingProduct,
      isAddProductOpen,
      setIsAddProductOpen,
      isEditStoreOpen,
      setIsEditStoreOpen,
      expandedOrderId,
      setExpandedOrderId,
      viewingRestaurantId,
      setViewingRestaurantId,
    },
    products: {
      items: products,
      setItems: setProducts,
      newProduct,
      setNewProduct,
      handleAdd: handleAddProduct,
      handleEdit: handleEditProduct,
      handleDelete: handleDeleteProduct,
      handleUpdate: handleUpdateProduct,
    },
    supplier: {
      info: supplierInfo,
      setInfo: setSupplierInfo,
      editForm: editStoreForm,
      setEditForm: setEditStoreForm,
      handleUpdate: handleUpdateSupplierInfo,
    },
    data: {
      orders,
      customers,
    },
  };
}
