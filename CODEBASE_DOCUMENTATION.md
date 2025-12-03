# Vrunda Vihas Opus Edition - Codebase Documentation

## 1. Project Overview
Vrunda Vihas is a premium e-commerce application specialized in Indian ethnic wear (Sarees, Kurtas, etc.). The project is built using Next.js 16 and features a modern, responsive design with a comprehensive admin dashboard.

## 2. Technology Stack
- **Framework**: Next.js 16.0.3 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4, Tailwind Animate
- **UI Components**: Radix UI Primitives, Lucide React Icons
- **State Management**: React Context (CartProvider)
- **Forms**: React Hook Form + Zod Validation
- **Charts**: Recharts
- **Date Handling**: date-fns

## 3. Project Structure

### Root Directory
- `app/`: Contains the application routes and pages (Next.js App Router).
- `components/`: Reusable UI components.
- `lib/`: Utility functions, data constants, and context providers.
- `public/`: Static assets.
- `styles/`: Global styles (if any additional to app/globals.css).

### Key Directories

#### `app/` (Routes)
- `page.tsx`: The homepage, composed of multiple feature sections.
- `layout.tsx`: The root layout, including `CartProvider` and `CartSidebar`.
- `admin/`: A fully featured admin dashboard with sub-routes for managing products, orders, users, etc.
- `auth/`: Authentication pages.
- `cart/`, `checkout/`: Shopping cart and checkout flows.
- `product/[id]`: Dynamic product detail pages.
- `collections/`, `kurtas/`, `sarees/`: Product listing pages.

#### `components/`
- `ui/`: Low-level UI primitives (Buttons, Inputs, Dialogs) built on Radix UI.
- `header.tsx`, `footer.tsx`: Global navigation components.
- `cart-sidebar.tsx`: The sliding cart drawer.
- `product-*.tsx`: Components related to product display (Card, Grid, Filters, Gallery).
- `*-section.tsx`: Homepage sections (Hero, Bestsellers, Testimonials).

#### `lib/`
- `data.ts`: Static mock data for products, reviews, and collections.
- `admin-data.tsx`: Mock data for the admin dashboard.
- `cart-context.tsx`: Context provider for managing cart state.
- `utils.ts`: Utility functions (e.g., class name merging).

## 4. Key Features

### Storefront
- **Homepage**: Dynamic sections showcasing collections, bestsellers, and testimonials.
- **Product Browsing**: Filterable product grids by category, fabric, and region.
- **Product Details**: Rich product pages with galleries, size charts, and reviews.
- **Shopping Cart**: Slide-out cart drawer accessible from anywhere.

### Admin Dashboard (`/admin`)
- **Overview**: Dashboard with key metrics.
- **Management**: Dedicated sections for:
  - Products & Inventory
  - Orders & Customers
  - Content (Banners, Blog, Pages)
  - Settings & Users

## 5. Data Management
Currently, the application uses static mock data located in `lib/data.ts` and `lib/admin-data.tsx`. This allows for UI development and testing without a live backend connection.
- `products`: Array of product summaries.
- `productDetails`: Detailed object keyed by product ID.
- `collections`, `testimonials`, `reviews`: Static content arrays.

## 6. Development
- **Run Development Server**: `npm run dev`
- **Build for Production**: `npm run build`
- **Linting**: `npm run lint`

## 7. Project Rules & Guidelines

### Design Aesthetics
- **Premium Experience**: The design must be visually stunning, using vibrant colors, smooth gradients, and glassmorphism effects.
- **Typography**: Use modern, clean fonts (Inter) to maintain a high-end feel.
- **Interactivity**: Implement hover effects, transitions, and micro-animations to make the interface feel alive.
- **Visuals**: Avoid placeholders; use high-quality or generated assets to demonstrate the final look.

### Implementation Workflow
1. **Plan**: Understand the requirements and outline the feature set.
2. **Foundation**: Ensure `globals.css` and design tokens are set up correctly.
3. **Components**: Build small, reusable components first (in `components/ui` or `components/`).
4. **Assembly**: Compose pages using these components.
5. **Polish**: Review for responsiveness, smooth interactions, and visual consistency.

### SEO & Best Practices
- **Semantic HTML**: Use proper tags (`<header>`, `<main>`, `<article>`, `<footer>`) for better accessibility and SEO.
- **Meta Tags**: Ensure every page has a descriptive title and meta description.
- **Performance**: Optimize images and code splitting (handled by Next.js, but keep components efficient).
- **Code Quality**: Follow TypeScript best practices and keep components focused.
