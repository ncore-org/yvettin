# 📋 YVETTIN E-SHOP - ENTERPRISE IMPLEMENTATION PLAN

**Projekt:** Yvettin - Fashion E-commerce Platform  
**Scope:** Full-stack e-shop pre módu a oblečenie  
**Tech Stack:** Next.js 14 + NestJS + PostgreSQL + Redis  
**Cieľ:** Enterprise-grade e-commerce s ~20,000 produktmi  
**Dátum:** 2026-02-07  
**Port:** 4009 (frontend localhost demo)  

---

## 🎯 FÁZA 0: PRÍPRAVA A ANALÝZA

### 0.1 Tech Stack - Potvrdenie Requirements

**Frontend:**
- Next.js 14.2.5 (App Router)
- React 18
- TypeScript 5.x
- Zustand (State Management)
- TanStack Query (Server State)
- Framer Motion (Animations)
- Shadcn/ui (UI Components)
- Tailwind CSS
- Axios (HTTP Client)

**Backend:**
- NestJS 14.x
- Prisma ORM
- PostgreSQL 16
- Redis 7 (caching)
- JWT auth + refresh tokens
- GraphQL (Apollo) + REST
- Docker composition

### 0.2 Inšpiračné Zdroje - Analýza Konkurencie

Analyzované platformy:
1. **Trendyol.sk** - UI/UX patterns, mega menu
2. **Answear.sk** - Filter systém, product grid
3. **Kulturistika.com** - Category structure
4. **AboutYou.sk** - Homepage layout, banners
5. **Modivo.sk** - Product detail, wishlist
6. **Glami.sk** - Search, comparison tools

### 0.3 Rozsah Projektu - Základné Metriky

- **Produkty:** ~20,000 (demo: 20-30 hardcoded)
- **Kategórie:** Multi-level (demo: Level 0 strom)
- **Stránky:** Homepage, Category, Product, Cart, Checkout, Wishlist, Compare, Account, GDPR, Cookies
- **Mobile-first:** Plná responzivita
- **UI/UX:** Enterprise-grade, premium dizajn

---

## 📁 FÁZA 1: ŠTRUKTÚRA PROJEKTU

### 1.1 Vytvorenie Base Directory Structure

```bash
/ncore-openclaw-backup/yvettin/
├── yvettin.com/
│   ├── frontend/          # Next.js 14 App
│   │   ├── src/
│   │   │   ├── app/                    # Next.js App Router
│   │   │   │   ├── (routes)/
│   │   │   │   │   ├── page.tsx               # Homepage /
│   │   │   │   │   ├── kategoria/             # /kategoria
│   │   │   │   │   │   └── [slug]/
│   │   │   │   │   │       └── page.tsx
│   │   │   │   │   ├── produkt/               # /produkt
│   │   │   │   │   │   └── [slug]/
│   │   │   │   │   │       └── page.tsx
│   │   │   │   │   ├── kosik/                 # /kosik
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   ├── pokladna/              # /pokladna
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   ├── wishlist/              # /wishlist
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   ├── compare/               # /compare
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   ├── account/               # /account
│   │   │   │   │   │   ├── page.tsx
│   │   │   │   │   │   ├── objednavky/
│   │   │   │   │   │   ├── profil/
│   │   │   │   │   │   └── nastavenia/
│   │   │   │   │   ├── prihlasenie/           # /prihlasenie
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   ├── registracia/           # /registracia
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   ├── gdpr/                  # /gdpr
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   └── cookies/               # /cookies
│   │   │   │   │       └── page.tsx
│   │   │   │   ├── layout.tsx                 # Root layout
│   │   │   │   ├── globals.css
│   │   │   │   └── providers.tsx              # React Query, Zustand providers
│   │   │   ├── components/
│   │   │   │   ├── layout/
│   │   │   │   │   ├── Header.tsx
│   │   │   │   │   ├── Footer.tsx
│   │   │   │   │   ├── MegaMenu.tsx
│   │   │   │   │   ├── MobileNav.tsx
│   │   │   │   │   └── SearchBar.tsx
│   │   │   │   ├── ui/                        # Shadcn/ui components
│   │   │   │   │   ├── button.tsx
│   │   │   │   │   ├── card.tsx
│   │   │   │   │   ├── input.tsx
│   │   │   │   │   ├── dialog.tsx
│   │   │   │   │   └── ... (ďalšie shadcn)
│   │   │   │   ├── product/
│   │   │   │   │   ├── ProductCard.tsx
│   │   │   │   │   ├── ProductGrid.tsx
│   │   │   │   │   ├── ProductDetail.tsx
│   │   │   │   │   ├── ProductGallery.tsx
│   │   │   │   │   ├── ProductVariants.tsx
│   │   │   │   │   └── QuickView.tsx
│   │   │   │   ├── cart/
│   │   │   │   │   ├── CartDrawer.tsx
│   │   │   │   │   ├── CartItem.tsx
│   │   │   │   │   └── CartSummary.tsx
│   │   │   │   ├── filters/
│   │   │   │   │   ├── FilterSidebar.tsx
│   │   │   │   │   ├── PriceRangeFilter.tsx
│   │   │   │   │   ├── CategoryFilter.tsx
│   │   │   │   │   ├── BrandFilter.tsx
│   │   │   │   │   └── AttributeFilter.tsx
│   │   │   │   └── common/
│   │   │   │       ├── Breadcrumbs.tsx
│   │   │   │       ├── Pagination.tsx
│   │   │   │       ├── Loading.tsx
│   │   │   │       └── ErrorBoundary.tsx
│   │   │   ├── lib/
│   │   │   │   ├── api/                       # API client
│   │   │   │   │   ├── axios.ts
│   │   │   │   │   ├── products.ts
│   │   │   │   │   ├── categories.ts
│   │   │   │   │   └── auth.ts
│   │   │   │   ├── store/                     # Zustand stores
│   │   │   │   │   ├── cart.ts
│   │   │   │   │   ├── wishlist.ts
│   │   │   │   │   ├── compare.ts
│   │   │   │   │   └── auth.ts
│   │   │   │   ├── hooks/
│   │   │   │   │   ├── useCart.ts
│   │   │   │   │   ├── useWishlist.ts
│   │   │   │   │   └── useProducts.ts
│   │   │   │   └── utils/
│   │   │   │       ├── format.ts
│   │   │   │       ├── validation.ts
│   │   │   │       └── seo.ts
│   │   │   ├── types/
│   │   │   │   ├── product.ts
│   │   │   │   ├── category.ts
│   │   │   │   ├── cart.ts
│   │   │   │   └── user.ts
│   │   │   └── data/
│   │   │       ├── demo-products.ts          # 20-30 hardcoded produktov
│   │   │       └── demo-categories.ts        # Demo strom kategórií
│   │   ├── public/
│   │   │   ├── images/
│   │   │   │   ├── products/
│   │   │   │   ├── categories/
│   │   │   │   └── banners/
│   │   │   └── fonts/
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── next.config.js
│   │   ├── tailwind.config.ts
│   │   └── .env.local
│   │
│   └── backend/           # NestJS API (pripravíme, nezapneme)
│       ├── src/
│       │   ├── modules/
│       │   │   ├── products/
│       │   │   ├── categories/
│       │   │   ├── cart/
│       │   │   ├── auth/
│       │   │   └── users/
│       │   ├── prisma/
│       │   │   └── schema.prisma
│       │   └── main.ts
│       ├── package.json
│       └── .env
```

### 1.2 Inicializácia Frontend Projektu

**Akcie:**
1. Vytvoriť `/yvettin.com/frontend/`
2. Inicializovať Next.js 14 projekt
3. Nainštalovať dependencies (Shadcn/ui, Tailwind, Zustand, TanStack Query, Framer Motion, Axios)
4. Konfigurovať TypeScript, ESLint, Prettier
5. Setup Tailwind CSS + custom theme (fashion-focused colors)

### 1.3 Inicializácia Backend Projektu (Príprava)

**Akcie:**
1. Vytvoriť `/yvettin.com/backend/`
2. Inicializovať NestJS projekt
3. Setup Prisma schema (Product, Category, User, Cart, Order modely)
4. Konfigurovať PostgreSQL connection (nezapíname databázu zatiaľ)
5. Pripraviť JWT auth modul
6. **NEZAPÍNAME server** - len štruktúra

---

## 🎨 FÁZA 2: FRONTEND - CORE UI/UX SYSTÉM

### 2.1 Design System Setup

**Tailwind Custom Theme:**
```typescript
// tailwind.config.ts
{
  colors: {
    primary: {
      50: '#fef2f2',   // Soft pink/red tones pre fashion
      100: '#fee2e2',
      500: '#ef4444',  // Main brand color
      900: '#7f1d1d',
    },
    neutral: {
      // Grayscale pre clean look
    },
    accent: {
      // Secondary color pre CTAs
    }
  },
  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    display: ['Playfair Display', 'serif'], // Pre headings
  }
}
```

**Shadcn/ui Components:**
- Inštalovať: `button`, `card`, `input`, `dialog`, `dropdown-menu`, `select`, `checkbox`, `radio-group`, `badge`, `skeleton`
- Customizovať pre fashion aesthetic

### 2.2 Layout Components

**Header Component:**
```tsx
// components/layout/Header.tsx
- Logo
- MegaMenu (desktop)
- SearchBar (s autocomplete)
- Icons: Wishlist, Compare, Cart (s badge), User
- Mobile hamburger menu
- Sticky header na scroll
```

**MegaMenu:**
```tsx
// components/layout/MegaMenu.tsx
- Multi-level category navigation
- Visual category cards s obrázkami
- Hover animations (Framer Motion)
- "Trending" section
```

**Footer:**
```tsx
// components/layout/Footer.tsx
- Newsletter signup
- Social links
- Kategórie links
- Customer service links
- GDPR/Cookies links
- Payment icons
```

### 2.3 Product Components

**ProductCard:**
```tsx
// components/product/ProductCard.tsx
Features:
- Responsive image s lazy loading
- Wishlist icon (heart)
- Quick view button
- Product name, price
- Discount badge (ak je)
- Hover: Show "Add to Cart" button
- Image carousel pre viac obrázkov (on hover)
```

**ProductGrid:**
```tsx
// components/product/ProductGrid.tsx
- Responsive grid (1/2/3/4 columns)
- Infinite scroll / Pagination
- Loading skeletons
- Empty state
```

**ProductDetail:**
```tsx
// components/product/ProductDetail.tsx
- Image gallery (s zoom)
- Variant selector (veľkosť, farba)
- Size guide modal
- Add to cart / Wishlist / Compare
- Product description tabs
- Related products slider
- Breadcrumbs
```

### 2.4 Filter System

**FilterSidebar:**
```tsx
// components/filters/FilterSidebar.tsx
Filters:
- Category tree
- Price range slider
- Brand checkboxes
- Sizes (S/M/L/XL)
- Colors (s color preview)
- Attributes (material, style, etc.)
- "Clear all" button
- Mobile: Filter drawer
```

---

## 📄 FÁZA 3: PAGES IMPLEMENTÁCIA

### 3.1 Homepage (/)

**Sekcie:**
1. **Hero Banner**
   - Full-width slider (Framer Motion carousel)
   - 3-5 rotating banners
   - CTAs

2. **Category Grid**
   - Visual category cards (Ženy, Muži, Deti, Accessories)
   - Hover animations

3. **Featured Products**
   - "Nové Produkty" slider
   - "Bestsellery" grid
   - "Výpredaj" section

4. **USP Blocks**
   - Doprava zdarma
   - 30-dňová záruka vrátenia peňazí
   - Zákaznícka podpora

5. **Instagram Feed / Social Proof**

6. **Newsletter Signup**

**Tech:**
- Server Components pre SEO
- Client Components pre interaktivitu
- Image optimization (Next.js Image)

### 3.2 Category Page (/kategoria/[slug])

**Layout:**
```
[ Breadcrumbs ]
[ Category Header ]
[ Filters (sidebar) ] [ Products Grid + Sort ]
[ Pagination ]
```

**Features:**
- Filter system (sidebar)
- Sort dropdown (cena, novinka, popularita)
- Product grid s kartami
- Pagination / Infinite scroll
- Active filters chips (s X na odstránenie)
- Results count

### 3.3 Product Page (/produkt/[slug])

**Layout:**
```
[ Gallery ] [ Product Info ]
            [ Size/Color Variants ]
            [ Add to Cart / Wishlist / Compare ]
[ Description Tabs ]
[ Related Products ]
[ Reviews (mockup) ]
```

**Features:**
- Image zoom on hover
- Lightbox gallery
- Variant selection (s live stock info)
- Quantity selector
- "Notify me" pre out of stock
- Breadcrumbs
- Social share buttons

### 3.4 Cart Page (/kosik)

**Layout:**
```
[ Cart Items List ] [ Order Summary ]
[ Continue Shopping / Proceed to Checkout ]
[ Recommended Products ]
```

**Features:**
- Quantity update (+ / -)
- Remove item
- Promo code input
- Shipping calculator
- Real-time total updates (Zustand)
- Empty cart state

### 3.5 Checkout Page (/pokladna)

**Multi-step Form:**
1. **Shipping Info**
   - Email, meno, adresa
   - Validation

2. **Delivery Method**
   - Kuriér / Zásielkovňa / Packeta
   - Price display

3. **Payment Method**
   - Platba kartou / Dobierka / Online banking
   - Icons

4. **Order Review**
   - Kompletný prehľad
   - Terms & Conditions checkbox
   - Place order button

**Features:**
- Stepper indikátor
- Form validation (react-hook-form)
- Guest checkout
- Login during checkout

### 3.6 Wishlist Page (/wishlist)

**Features:**
- Wishlist grid (ProductCard format)
- Remove item
- Add to cart
- Share wishlist
- Empty state

### 3.7 Compare Page (/compare)

**Features:**
- Comparison table (max 4 produkty)
- Attributes comparison
- Remove item
- Add to cart
- Empty state

### 3.8 Account Pages (/account/*)

**Subpages:**
- `/account` - Dashboard (overview)
- `/account/objednavky` - Order history
- `/account/profil` - Personal info edit
- `/account/nastavenia` - Heslo, notifikácie

**Features:**
- Protected routes (auth check)
- Order detail modal
- Track order link
- Profile edit form

### 3.9 Auth Pages

**Prihlásenie (/prihlasenie):**
- Email + heslo form
- "Zabudnuté heslo" link
- Social login buttons (Google, Facebook mockup)
- Redirect to intended page

**Registrácia (/registracia):**
- Meno, email, heslo form
- Password strength meter
- Terms acceptance checkbox
- Email verification notice

### 3.10 Legal Pages

**GDPR (/gdpr):**
- Privacy policy text
- Práva užívateľa
- Kontakt na DPO

**Cookies (/cookies):**
- Cookie policy
- Cookie banner (s accept/reject)

---

## 🗃️ FÁZA 4: DATA LAYER - DEMO DATA

### 4.1 Demo Products (20-30 hardcoded)

**Štruktúra:**
```typescript
// data/demo-products.ts
export const DEMO_PRODUCTS: Product[] = [
  {
    id: 'prod-001',
    slug: 'damske-tricko-basic-white',
    name: 'Dámske tričko Basic White',
    brand: 'YvettinBasics',
    category: 'zeny/tricka',
    price: 29.99,
    discountPrice: null,
    images: ['/images/products/tricko-white-1.jpg', ...],
    description: 'Klasické bavlnené tričko...',
    variants: [
      { size: 'S', color: 'white', stock: 10 },
      { size: 'M', color: 'white', stock: 5 },
      // ...
    ],
    attributes: {
      material: 'Bavlna 100%',
      fit: 'Regular',
      style: 'Casual',
    },
  },
  // ... 19-29 ďalších produktov
];
```

**Kategórie produktov (mix):**
- Tričká (5 ks)
- Mikiny (3 ks)
- Rifle (4 ks)
- Šaty (5 ks)
- Bundy (3 ks)
- Obuv (5 ks)
- Doplnky (5 ks)

### 4.2 Demo Category Tree (Level 0)

**Štruktúra:**
```typescript
// data/demo-categories.ts
export const DEMO_CATEGORIES: Category[] = [
  {
    id: 'cat-001',
    slug: 'zeny',
    name: 'Ženy',
    level: 0,
    children: [
      {
        id: 'cat-001-01',
        slug: 'zeny/oblecenie',
        name: 'Oblečenie',
        level: 1,
        children: [
          { id: 'cat-001-01-01', slug: 'zeny/oblecenie/tricka', name: 'Tričká', level: 2 },
          { id: 'cat-001-01-02', slug: 'zeny/oblecenie/mikiny', name: 'Mikiny', level: 2 },
          // ...
        ],
      },
      // ...
    ],
  },
  {
    id: 'cat-002',
    slug: 'muzi',
    name: 'Muži',
    level: 0,
    children: [ /* ... */ ],
  },
  // ...
];
```

### 4.3 Zustand Stores Setup

**Cart Store:**
```typescript
// lib/store/cart.ts
interface CartItem {
  productId: string;
  variantId: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
}
```

**Wishlist Store:**
```typescript
// lib/store/wishlist.ts
interface WishlistStore {
  items: string[]; // product IDs
  addItem: (productId: string) => void;
  removeItem: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
}
```

**Compare Store:**
```typescript
// lib/store/compare.ts
interface CompareStore {
  items: string[]; // max 4
  addItem: (productId: string) => void;
  removeItem: (productId: string) => void;
  isInCompare: (productId: string) => boolean;
}
```

---

## 🔧 FÁZA 5: BACKEND PRÍPRAVA (nezapíname)

### 5.1 NestJS Štruktúra

**Moduly:**
- `ProductsModule` - CRUD produktov
- `CategoriesModule` - CRUD kategórií
- `AuthModule` - JWT auth (login, register, refresh)
- `UsersModule` - User management
- `CartModule` - Cart operations
- `OrdersModule` - Order processing
- `FilesModule` - Image upload

### 5.2 Prisma Schema

```prisma
// prisma/schema.prisma
model Product {
  id          String   @id @default(cuid())
  slug        String   @unique
  name        String
  description String?
  price       Decimal
  discountPrice Decimal?
  brand       String?
  categoryId  String
  category    Category @relation(fields: [categoryId], references: [id])
  images      String[]
  variants    Variant[]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Category {
  id       String     @id @default(cuid())
  slug     String     @unique
  name     String
  parentId String?
  parent   Category?  @relation("CategoryTree", fields: [parentId], references: [id])
  children Category[] @relation("CategoryTree")
  products Product[]
}

model User {
  id       String   @id @default(cuid())
  email    String   @unique
  password String
  name     String?
  role     Role     @default(CUSTOMER)
  orders   Order[]
  cart     CartItem[]
  createdAt DateTime @default(now())
}

model CartItem {
  id        String  @id @default(cuid())
  userId    String
  user      User    @relation(fields: [userId], references: [id])
  productId String
  variantId String?
  quantity  Int
}

// ... ďalšie modely (Order, Variant, etc.)
```

### 5.3 Auth Flow (JWT)

**Endpoints:**
- `POST /auth/register` - Registrácia
- `POST /auth/login` - Login (vracia access + refresh token)
- `POST /auth/refresh` - Refresh access token
- `POST /auth/logout` - Invalidácia refresh tokenu

**Strategy:**
- JWT access token (15 min expiry)
- Refresh token (7 dní, uložený v httpOnly cookie)

### 5.4 GraphQL Schema (Apollo Server)

```graphql
type Product {
  id: ID!
  slug: String!
  name: String!
  price: Float!
  discountPrice: Float
  images: [String!]!
  category: Category!
  variants: [Variant!]!
}

type Query {
  products(filter: ProductFilter, limit: Int, offset: Int): [Product!]!
  product(slug: String!): Product
  categories: [Category!]!
}

type Mutation {
  addToCart(productId: ID!, variantId: ID, quantity: Int!): Cart!
}
```

**Dôvod pre GraphQL:**
- Efektívne data fetching (no over-fetching)
- Frontend môže request presne to čo potrebuje
- Type-safety

---

## 🚀 FÁZA 6: DEPLOYMENT & DEV SERVER

### 6.1 Frontend Dev Server (localhost:4009)

**Spustenie:**
```bash
cd /ncore-openclaw-backup/yvettin/yvettin.com/frontend
npm install
npm run dev -- -p 4009
```

**Features:**
- Hot reload
- TypeScript type checking
- ESLint
- Demo data z `/data/demo-*.ts`

### 6.2 Backend (NEAKTÍVNY)

**Pripravené:**
- NestJS štruktúra
- Prisma schema
- Auth moduly
- GraphQL resolvers

**NEZAPÍNAŤ:**
- PostgreSQL server
- Redis server
- NestJS dev server

**Dôvod:**
- Frontend demo funguje s hardcoded data
- Backend pripravíme postupne

---

## 🎯 FÁZA 7: UI/UX POLISH

### 7.1 Animations (Framer Motion)

**Target Components:**
- Page transitions
- Product card hover effects
- Cart drawer slide-in
- MegaMenu fade-in
- Filter accordion
- Add to cart "flying" animation

### 7.2 Mobile Optimization

**Breakpoints:**
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

**Mobile-specific:**
- Bottom navigation (sticky)
- Hamburger menu
- Swipeable product gallery
- Filter drawer (s close button)
- Simplified checkout steps

### 7.3 Performance Optimization

**Next.js Features:**
- Static Generation (SSG) pre category/product pages
- Image optimization (WebP)
- Code splitting
- Lazy loading components
- Prefetching critical routes

**Lighthouse Targets:**
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

---

## 📊 FÁZA 8: TESTING & VALIDATION

### 8.1 Manual Testing Checklist

**Homepage:**
- [ ] Hero slider works
- [ ] Category links navigate correctly
- [ ] Featured products load

**Category Page:**
- [ ] Filters apply correctly
- [ ] Sort works
- [ ] Pagination works
- [ ] Product cards clickable

**Product Page:**
- [ ] Gallery zoom works
- [ ] Variant selection updates price/stock
- [ ] Add to cart works
- [ ] Wishlist toggle works

**Cart:**
- [ ] Quantity update
- [ ] Remove item
- [ ] Total calculates correctly

**Checkout:**
- [ ] Form validation
- [ ] Step navigation
- [ ] Order submission (mockup)

**Auth:**
- [ ] Login form validation
- [ ] Register form validation
- [ ] Protected routes redirect

### 8.2 Responsive Testing

**Devices:**
- iPhone SE (375px)
- iPhone 12 Pro (390px)
- iPad (768px)
- Desktop (1920px)

### 8.3 Browser Testing

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

## 🔒 FÁZA 9: SECURITY & COMPLIANCE

### 9.1 GDPR Compliance

**Implementované:**
- Cookie banner (s accept/reject)
- Privacy policy page
- User data export request (mockup)
- Data deletion request (mockup)

### 9.2 Security Best Practices

**Frontend:**
- XSS protection (React auto-escaping)
- CSRF protection (SameSite cookies)
- Secure headers (Next.js config)

**Backend (pripravené):**
- JWT token rotation
- Password hashing (bcrypt)
- Rate limiting
- Input validation (class-validator)

---

## 📈 FÁZA 10: MONITORING & ANALYTICS (príprava)

### 10.1 Analytics Setup (placeholder)

**Tools:**
- Google Analytics 4
- Hotjar (heatmaps)
- Sentry (error tracking)

### 10.2 Performance Monitoring

**Metrics:**
- Core Web Vitals
- Time to First Byte (TTFB)
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)

---

## ✅ IMPLEMENTATION ROADMAP

### Priorita 1: CORE SETUP (Den 1)
1. ✅ Vytvoriť projektovú štruktúru
2. ✅ Inicializovať Next.js frontend
3. ✅ Nainštalovať dependencies
4. ✅ Setup Tailwind + Shadcn/ui
5. ✅ Vytvoriť base layout (Header, Footer)

### Priorita 2: DEMO DATA (Den 1)
6. ✅ Vytvoriť demo-products.ts (20-30 produktov)
7. ✅ Vytvoriť demo-categories.ts (Level 0 strom)
8. ✅ Setup Zustand stores (cart, wishlist, compare)

### Priorita 3: HOMEPAGE (Den 1-2)
9. ✅ Hero slider
10. ✅ Category grid
11. ✅ Featured products section
12. ✅ USP blocks
13. ✅ Newsletter signup

### Priorita 4: PRODUCT CATALOG (Den 2-3)
14. ✅ Category page s filtrami
15. ✅ Product card component
16. ✅ Product grid
17. ✅ Product detail page

### Priorita 5: CART & CHECKOUT (Den 3-4)
18. ✅ Cart functionality (Zustand)
19. ✅ Cart page
20. ✅ Checkout multi-step form
21. ✅ Order confirmation page

### Priorita 6: USER FEATURES (Den 4-5)
22. ✅ Wishlist page
23. ✅ Compare page
24. ✅ Account pages
25. ✅ Auth pages (login/register mockup)

### Priorita 7: LEGAL & MISC (Den 5)
26. ✅ GDPR page
27. ✅ Cookies page + banner
28. ✅ 404 page
29. ✅ Search functionality (mockup)

### Priorita 8: POLISH (Den 5-6)
30. ✅ Animations (Framer Motion)
31. ✅ Mobile optimization
32. ✅ Performance optimization
33. ✅ SEO metadata

### Priorita 9: TESTING (Den 6)
34. ✅ Manual testing všetkých pages
35. ✅ Responsive testing
36. ✅ Browser testing

### Priorita 10: BACKEND PRÍPRAVA (Den 6-7)
37. ✅ NestJS štruktúra
38. ✅ Prisma schema
39. ✅ Auth moduly
40. ✅ GraphQL schema

---

## 🎓 ZÁVERY A POZNÁMKY

### Čo máme po dokončení Fázy 1-10:

1. **Funkčný frontend demo** na `localhost:4009`
2. **20-30 demo produktov** (hardcoded, realistic data)
3. **Kompletný UI/UX systém** (Shadcn/ui + Tailwind)
4. **Všetky kľúčové stránky** (homepage, category, product, cart, checkout, account, legal)
5. **Mobile-first dizajn** (plne responzívny)
6. **Pripravený backend** (NestJS + Prisma, nezapnutý)
7. **Enterprise-grade štruktúra** (scalable, maintainable)

### Ďalšie kroky (po demo):

1. Zapnúť PostgreSQL + Redis
2. Naplniť databázu reálnymi produktmi (import z CSV/API)
3. Integrovať frontend s backend API
4. Implementovať payment gateway (Stripe, PayPal)
5. Nasadiť na produkciu (Vercel frontend + VPS backend)

---

**Autor:** Nix ⚡  
**Status:** DRAFT - pripravený na implementáciu  
**Posledná aktualizácia:** 2026-02-07
