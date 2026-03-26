# UniMart - Social Commerce Platform

## Overview
UniMart is a full-stack social commerce platform for Bangladesh, combining e-commerce with social networking features. Built with Next.js App Router, TailwindCSS, ShadcnUI components, and an Express.js backend with fake data.

## Architecture

### Frontend (Next.js 14 App Router)
- **Port**: 5000 (0.0.0.0)
- **Directory**: `frontend/`
- **Framework**: Next.js 14 with App Router, TypeScript
- **Styling**: TailwindCSS + custom ShadcnUI components
- **Key Pages**:
  - `/` - Home with hero, flash deals, categories, featured products
  - `/products` - Product listing with filtering/sorting/search
  - `/products/[id]` - Product detail page
  - `/sellers` - Seller directory
  - `/sellers/[id]` - Seller profile
  - `/social` - Social feed with posts, likes, comments
  - `/cart` - Shopping cart with quantity management
  - `/dashboard` - User account dashboard
  - `/admin` - Admin dashboard with analytics

### Backend (Express.js)
- **Port**: 8000 (localhost)
- **Directory**: `backend/`
- **Type**: ES Modules
- **Endpoints**:
  - `GET /api/products` - Products with filtering/sorting/pagination
  - `GET /api/products/:id` - Single product
  - `GET /api/categories` - Product categories
  - `GET /api/sellers` - Seller list
  - `GET /api/sellers/:id` - Seller detail with products
  - `GET /api/orders` - Order list
  - `GET /api/posts` - Social feed posts
  - `GET /api/flash-deals` - Flash sale items
  - `GET /api/stats` - Platform statistics
  - `GET /api/search` - Search products and sellers

## Workflows
- **Start application**: `cd frontend && npm run dev` → port 5000 (webview)
- **Start Backend**: `cd backend && node server.js` → port 8000 (console)

## Tech Stack
- Next.js 14, React 18, TypeScript
- TailwindCSS 3, ShadcnUI (custom components with Radix UI primitives)
- Express.js 4 with ES modules
- Lucide React icons
- Class Variance Authority (cva) for component variants
- Unsplash images for fake product photos

## Currency
Uses Bangladeshi Taka (৳) as the currency
