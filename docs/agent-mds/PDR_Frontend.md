# PDR - Iris Marketplace Frontend

## 1. Overview

Frontend interface connecting restaurants and suppliers in B2B marketplace. Enables product discovery, price comparison, order management, supplier performance metrics, and automated repeat purchases. Translates backend business logic into intuitive interfaces.

## 2. Objectives

- User experience excellence with minimal learning curve
- Transparency across catalogs, pricing, delivery timelines, and supplier metrics
- Backend integration via REST/GraphQL APIs with real-time synchronization
- Scalable architecture for AI-powered forecasting and dynamic pricing
- Performance standards: WCAG 2.1 AA compliance, Core Web Vitals optimization

## 3. Technology Stack

- Framework: Next.js 14 with App Router
- Language: TypeScript
- Styling: TailwindCSS with shadcn/ui component library
- Authentication: Clerk with JWT validation
- State Management: React Query (TanStack Query) for server state
- Deployment: Vercel
- Monitoring: Sentry for error tracking
- Analytics: PostHog for user behavior analytics
- AI Integration: Google Gemini API for future features

## 4. Application Structure

```
src/
  app/                        # Next.js App Router
    (auth)/                   # Authentication routes
    (main)/                   # Protected application routes
      orders/page.tsx
      products/page.tsx
      suppliers/page.tsx
      profile/page.tsx
      settings/page.tsx
    api/                      # API route handlers
    layout.tsx                # Root layout
    page.tsx                  # Home page
    globals.css               # Global styles
  components/                 # UI components
    ui/                       # shadcn/ui base components
    features/                 # Feature-specific components
      products/               # Product browsing and management
      orders/                 # Order management and tracking
      suppliers/              # Supplier discovery and profiles
      cart/                   # Shopping cart
      home/                   # Home page components
      user/                   # User profile and settings
    layout/                   # Layout components
      Navigation.tsx
      Providers.tsx
    types/                    # Component prop types
      cover-header.ts
      restaurant-profile.ts
      supplier-profile.ts
  hooks/                     # Custom React hooks
    auth/                    # Authentication hooks
    data/                    # Data fetching hooks
      products/
      orders/
      suppliers/
    home/                    # Home page hooks
    products/                # Product page hooks
    suppliers/               # Supplier hooks
    user/                    # User profile hooks
    view-models/             # View model patterns
  lib/                       # Infrastructure layer
    auth/                    # Authentication infrastructure
      api/                   # Auth API calls
      providers/             # React providers
      services/              # Auth services
      utils/                 # Auth utilities
      validators/            # Auth validation
    config/                  # Configuration
      api-config.ts
      app-config.ts
      auth-config.ts
    data/                    # Data access layer
      repositories/          # API repositories
        products/
        orders/
        suppliers/
        cart/
        client.ts
        endpoints.ts
      services/              # Business logic services
        products/
        orders/
        suppliers/
        cart/
      types/                 # API contract types
        auth.ts
        common.ts
        product.ts
        order.ts
        supplier.ts
    query.ts                 # React Query configuration
    utils/                   # Utility functions
  types/                     # Domain types
    core/                    # Core entities
    products/                # Product domain types
    orders/                  # Order domain types
    suppliers/               # Supplier domain types
    user/                    # User domain types
    cart/                    # Cart domain types
  contexts/                  # React contexts
    CartContext.tsx
    ThemeContext.tsx
    data-providers.tsx
  utils/                     # Helper utilities
    formatters.ts
    validators.ts
    data-utils.ts
    utils.ts
  constants/                 # Application constants
    index.ts
```

## 5. Architecture Patterns

### Layer Separation

- Presentation: Components receive props, no direct data access
- Application: Hooks orchestrate state and data fetching
- Infrastructure: Services translate domain ↔ API types
- Data Access: Repositories handle API calls

### Data Flow Pattern

```
Component → Hook → Service → Repository → API Client → Backend
```

Components use hooks exclusively. Hooks use repositories through services. Services translate between domain types and API contract types. Repositories use typed API client.

### Feature Structure

Each feature follows: Page → Hook → Service → Repository → Component pattern.

## 6. Data Fetching

### React Query Integration

All server state managed through React Query hooks. Hooks call repository methods. Repositories use typed API client. Configure in `lib/query.ts`.

### Repository Pattern

Repositories defined in `lib/data/repositories/`. Each domain has dedicated repository. Repositories use `ApiClient` from `client.ts`. Endpoints defined in `endpoints.ts` using constants.

### Service Layer

Services in `lib/data/services/` translate domain types to API types. Handle business logic and validation. Call repositories with API contract types.

## 7. Type Safety

### Domain Types

Domain entities defined in `types/`. Core types in `types/core/`. Feature types in `types/{feature}/`.

### API Types

API contract types in `lib/data/types/`. Separate from domain types. Used by repositories and services.

### Component Types

Component prop types in `components/types/`. Presentation layer specific.

## 8. API Integration

### Configuration

Base URL: `APP_CONFIG.apiUrl` from `lib/config/app-config.ts`. Uses `NEXT_PUBLIC_API_URL` environment variable.

### Endpoints

Centralized in `lib/data/repositories/endpoints.ts`. Uses constants from `constants/index.ts`.

### Authentication

Clerk JWT tokens handled in `lib/data/repositories/client.ts`. Token retrieval via `apiClient.getAuthToken()`. Automatic header injection.

### Error Handling

Consistent error shapes. Retry logic with exponential backoff. Error boundaries for component errors.

## 9. State Management

### Server State

React Query for all API interactions. Caching configured per query. Background refetching enabled. Optimistic updates supported.

### Global State

React Context for authentication, cart, and user preferences. Defined in `contexts/`.

### Local State

React useState/useReducer for UI interactions only. Form state via React Hook Form.

## 10. Component Architecture

### Design System

TailwindCSS utility-first approach. shadcn/ui components as foundation. Design tokens for colors, spacing, typography. Mobile-first responsive design.

### Component Guidelines

Components are functional and pure. Props-based data flow. No business logic in components. Use hooks for data and state.

### Accessibility

WCAG 2.1 AA compliance. Keyboard navigation. ARIA attributes. Proper contrast ratios.

## 11. Routing

### App Router Structure

Routes in `app/` directory. Grouped routes: `(auth)/` for public, `(main)/` for protected. Layout nesting for consistent UI.

### Protected Routes

Role-based protection via Clerk middleware. Authentication state managed through hooks.

## 12. Performance

### Targets

Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1. Lighthouse score: 90+ across categories.

### Optimization

Next.js automatic static optimization. Lazy loading for non-critical components. React Query caching strategies. Image optimization via Next.js Image component.

## 13. Testing

### Tools

Jest and React Testing Library for unit tests. Playwright for E2E tests. Configuration in `jest.config.js` and `playwright.config.ts`.

### Coverage

Core flows require 90%+ coverage. Component tests with various prop combinations. API integration tests with mock responses.

## 14. Environment Variables

Required variables:
- `NEXT_PUBLIC_API_URL`: Backend API base URL
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: Clerk publishable key
- `CLERK_SECRET_KEY`: Clerk secret key (server-side)
- `NEXT_PUBLIC_POSTHOG_KEY`: PostHog analytics key
- `SENTRY_DSN`: Sentry error tracking DSN
- `NEXT_PUBLIC_GEMINI_API_KEY`: Gemini API key (optional)
- `NEXT_PUBLIC_ENABLE_AI_FEATURES`: Feature flag for AI features
- `NEXT_PUBLIC_ENABLE_ANALYTICS`: Feature flag for analytics

Configuration loaded via `lib/config/` modules.

## 15. Security

### Authentication

Clerk integration with JWT validation. Role-based access control. Secure session management. Token refresh handling.

### Data Protection

No sensitive data in client-side logs. HTTPS enforcement. Content Security Policy headers. Regular storage audits.

## 16. Monitoring

### Error Tracking

Sentry integration for error tracking. Error boundaries with Sentry reporting. Performance monitoring for Core Web Vitals.

### Analytics

PostHog integration for user behavior. Custom event tracking. Performance metrics monitoring.

## 17. Deployment

### Vercel Configuration

Automatic deployments from main branch. Preview builds for feature branches. Environment variables via Vercel dashboard. Edge Functions for serverless API routes.

## 18. Compliance

WCAG 2.1 AA accessibility compliance. GDPR compliance for data handling. Security headers implementation.
