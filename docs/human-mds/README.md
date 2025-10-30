# Iris Marketplace Frontend

A modern B2B marketplace platform connecting restaurants with suppliers, built with Next.js 14, TypeScript, and TailwindCSS.

## 🚀 Features

- **Product Discovery**: Browse and search supplier catalogs
- **Price Comparison**: Compare prices across suppliers
- **Order Management**: Place, track, and manage orders
- **Supplier Profiles**: View supplier information and performance metrics
- **Shopping Cart**: Add products and manage cart
- **Responsive Design**: Mobile-first approach with TailwindCSS
- **Type Safety**: Full TypeScript implementation
- **Modern UI**: Built with shadcn/ui components

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS + shadcn/ui
- **State Management**: React Query + React Context
- **Authentication**: Clerk
- **Deployment**: Vercel
- **Error Tracking**: Sentry
- **Analytics**: PostHog

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router routes
│   ├── (auth)/            # Authentication routes
│   ├── (dashboard)/       # Protected dashboard routes
│   ├── api/               # API route handlers
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable UI components
│   ├── ui/                # shadcn/ui base components
│   ├── features/          # Feature-specific components
│   │   ├── products/      # Product browsing and management
│   │   ├── orders/        # Order management and tracking
│   │   ├── suppliers/     # Supplier discovery and profiles
│   │   └── integrations/  # Third-party integrations
│   ├── layout/            # Layout components
│   └── forms/             # Form components
├── hooks/                 # Custom React hooks
├── services/              # API and business logic layer
│   ├── repositories/      # Data access layer
│   └── api/               # API client configuration
├── contexts/              # Global React contexts
├── utils/                 # Helper functions and utilities
├── types/                 # TypeScript type definitions
└── lib/                   # Third-party library configurations
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd iris-marketplace-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
# Edit .env.local with your configuration
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking
- `npm test` - Run tests
- `npm run test:coverage` - Run tests with coverage
- `npm run e2e` - Run end-to-end tests
- `npm run lighthouse` - Run Lighthouse performance audit

## 🏗️ Architecture

The application follows a clean architecture pattern:

- **Pages**: Next.js page components handling routing and layout
- **Hooks**: Custom React hooks managing component state and side effects
- **Services**: Business logic layer handling data transformation and validation
- **Repositories**: Data access layer managing API calls and caching
- **Components**: Presentational components for UI rendering

## 🔧 Configuration

### Environment Variables

See `.env.local.example` for required environment variables.

### API Integration

The frontend integrates with a FastAPI backend. Configure the API URL in your environment variables.

### Authentication

Authentication is handled by Clerk. Set up your Clerk application and configure the keys in your environment variables.

## 🧪 Testing

The project includes comprehensive testing setup:

- **Unit Tests**: Jest + React Testing Library
- **E2E Tests**: Playwright
- **Type Checking**: TypeScript compiler

## 📦 Deployment

The application is configured for deployment on Vercel:

1. Connect your repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, please open an issue in the repository or contact the development team.
