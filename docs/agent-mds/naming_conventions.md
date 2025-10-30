# Naming Conventions

**Version**: 1.0  

**Last Updated**: 2024  

**Status**: Active

Defines naming conventions for the Iris marketplace frontend. All code must follow these patterns exactly.

## File Naming

### React Components

- **Files**: PascalCase (`ProductCard.tsx`, `SupplierList.tsx`, `HomePage.tsx`)

- **Names**: PascalCase (`ProductCard`, `SupplierList`, `HomePage`)

- **Interfaces**: PascalCase (`Product`, `Supplier`, `Order`, `CartItem`)

### Utilities & Hooks

- **Hook files**: kebab-case (`use-products.ts`, `use-suppliers.ts`, `use-orders.ts`)

- **Hook names**: camelCase with 'use' prefix (`useProducts`, `useSuppliers`, `useOrders`)

- **Utility files**: kebab-case (`api-client.ts`, `product-repository.ts`, `formatters.ts`)

- **Service files**: kebab-case (`auth-service.ts`, `data-service.ts`)

### Directories

- **Feature directories**: kebab-case (`product-management/`, `supplier-dashboard/`, `order-tracking/`)

- **Component directories**: kebab-case (`ui/`, `layout/`, `features/`)

- **Route groups**: parentheses (`(main)/`, `(auth)/`, `(dashboard)/`)

## Code Naming

### Variables & Functions

- **Variables**: camelCase (`supplierData`, `isLoading`, `productList`, `cartItems`)

- **Functions**: camelCase (`loadSupplierData`, `handleProductClick`, `updateCartQuantity`)

- **Constants**: UPPER_SNAKE_CASE (`MOCK_PRODUCTS`, `API_ENDPOINTS`, `QUERY_KEYS`)

### Types & Interfaces

- **Interfaces**: PascalCase (`ProductCardProps`, `SupplierListProps`, `OrderFormData`)

- **Types**: PascalCase (`UserRole`, `OrderStatus`, `ProductCategory`)

- **Enums**: PascalCase (`UserRole`, `OrderStatus`, `ProductCategory`)

### React Hooks

- **Hook names**: camelCase with 'use' prefix (`useProducts`, `useSuppliers`, `useCart`)

- **Hook files**: kebab-case (`use-products.ts`, `use-suppliers.ts`, `use-cart.ts`)

## Import/Export Conventions

### Component Exports

- **Default exports**: PascalCase (`export default function ProductCard()`)

- **Named exports**: PascalCase (`export { SupplierCard, ProductList }`)

### Hook Exports

- **Hook exports**: camelCase (`export const useProducts = () => {}`)

- **Utility exports**: camelCase (`export const formatCurrency = (amount: number) => {}`)

## CSS & Styling

### Tailwind Classes

- **Utility classes**: kebab-case (`flex items-center justify-center`)

- **Custom classes**: kebab-case (`.product-card`, `.supplier-dashboard-header`)

- **CSS variables**: kebab-case (`--primary-color`, `--border-radius`)

## API & Database

### API Endpoints

- **Endpoints**: kebab-case (`/api/products`, `/api/suppliers`, `/api/orders`)

- **Parameters**: kebab-case (`/products/:id`, `/suppliers/:id`)

### Database

- **Tables**: snake_case (`products`, `suppliers`, `orders`, `cart_items`)

- **Columns**: snake_case (`product_id`, `supplier_id`, `created_at`, `updated_at`)

## Next.js App Router

### Route Structure

- **Route groups**: parentheses (`/(main)/dashboard/page.tsx`)

- **Dynamic routes**: brackets (`/products/[id]/page.tsx`, `/suppliers/[id]/page.tsx`)

- **Route paths**: kebab-case (`/product-management`, `/supplier-dashboard`)

## Monorepo Packages

### Package Names

- **Workspace packages**: `@iris/package-name`

- **Examples**: `@iris/shared-types`, `@iris/shared-components`

### Package Structure

```
packages/shared-types/

├── package.json

├── index.ts

├── entities/

├── api/

└── README.md

```

## PWA Naming

### Service Worker

- **Files**: kebab-case (`sw.js`, `service-worker.js`)

- **Config**: kebab-case (`workbox-config.js`)

### Storage

- **IndexedDB stores**: snake_case (`cart_items`, `offline_orders`)

- **LocalStorage keys**: snake_case (`auth_user`, `cart_data`)

- **Cache names**: kebab-case (`iris-cache-v1`)

### Components

- **PWA components**: PascalCase (`OfflineIndicator.tsx`, `SyncStatus.tsx`)

## Mock Data

### Files

- **Mock files**: kebab-case (`mock-data.ts`, `mock-products.ts`)

### Functions

- **Mock functions**: camelCase (`getMockProducts`, `getMockSuppliers`)

- **Mock constants**: UPPER_SNAKE_CASE (`MOCK_PRODUCTS`, `MOCK_SUPPLIERS`)

## Iris-Specific Patterns

### Feature Organization

- **Feature structure**: `src/components/features/{feature}/`
  - `components/` - Feature-specific components
  - `hooks/` - Feature-specific hooks
  - `services/` - Feature-specific services
  - `types/` - Feature-specific types

### Context Providers

- **Context files**: `{Feature}Context.tsx` (`CartContext.tsx`, `ThemeContext.tsx`)

- **Context hooks**: `use{Feature}` (`useCart`, `useTheme`)

### Repository Pattern

- **Repository files**: `{entity}-repository.ts` (`product-repository.ts`, `supplier-repository.ts`)

- **Repository classes**: `{Entity}Repository` (`ProductRepository`, `SupplierRepository`)

### API Client

- **Client files**: `api-client.ts`, `endpoints.ts`

- **Endpoint functions**: camelCase (`getProducts`, `createOrder`, `updateSupplier`)

### Query Keys

- **Query key constants**: UPPER_SNAKE_CASE (`QUERY_KEYS`)

- **Query key functions**: camelCase (`PRODUCT_DETAIL`, `SUPPLIER_PRODUCTS`)

### Component Props

- **Props interfaces**: `{Component}Props` (`ProductCardProps`, `SupplierListProps`)

- **Props files**: Centralized in `src/types/components.ts`

### Data Types

- **Entity types**: `src/types/entities.ts` (`Product`, `Supplier`, `Order`)

- **API types**: `src/types/api.ts` (`ProductFilters`, `OrderRequest`)

- **Component types**: `src/types/components.ts` (`ProductCardProps`, `CartItemProps`)

## Enforcement Rules

1. **Consistency**: Maintain consistency within same file/component

2. **React Components**: PascalCase for files and names

3. **Hooks**: camelCase with 'use' prefix

4. **Utilities**: camelCase for functions, kebab-case for files

5. **Imports**: Use package names for shared code

6. **Exports**: Match naming convention of exported item

7. **Next.js Routes**: Use route groups for organization

8. **Tailwind**: Prefer utility classes over custom CSS

9. **Monorepo**: Use workspace package names for dependencies

10. **PWA**: Use descriptive names for offline storage

11. **Iris Features**: Follow feature-based organization structure

12. **Types**: Centralize types in appropriate files by domain

13. **Mock Data**: Use centralized mock data files with helper functions

14. **Context**: Use descriptive context names with proper hook naming

15. **Repository**: Follow repository pattern for data access
