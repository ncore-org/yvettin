# Yvetin E-shop Analysis & Design Document

## 1. Reference Analysis - ABOUT YOU (aboutyou.sk)

### Brand Positioning
- **Category**: Fashion e-commerce (clothing, shoes, accessories)
- **Style**: Modern, clean, minimalistic
- **Target Audience**: Fashion-conscious men and women (18-45 years)
- **Key Features**: Large brand selection, fast delivery, easy returns

### Visual Design System

#### Color Palette
- **Primary**: Black (#000000) - text, headers
- **Secondary**: White (#FFFFFF) - backgrounds
- **Accent**: Soft gray (#F5F5F5) - sections, cards
- **CTA**: Black buttons with white text (inverted on hover)
- **Sale/Highlight**: Red tones for discounts

#### Typography
- **Font**: Clean sans-serif (similar to Inter, Helvetica, or system fonts)
- **Hierarchy**:
  - H1: Bold, large (brand statements)
  - H2: Section headers
  - Body: Regular weight, comfortable line height
  - Small: Metadata, prices

#### Layout Principles
- **Grid**: 12-column responsive grid
- **Spacing**: Generous whitespace, breathing room
- **Cards**: Minimal borders, subtle shadows on hover
- **Images**: Large product photos, lifestyle imagery

### Key Sections (from sketch + About You inspiration)

#### Header
- Logo centered or left-aligned
- Gender switcher: ŽENY | MUŽI
- Navigation: Categories (Oblečenie, Topánky, Doplnky, Šport)
- Right side: Search, Wishlist, Cart, Account
- Sticky on scroll

#### Hero Banner
- Full-width or large centered banner
- Seasonal campaign or new collection
- Minimal text, strong imagery
- CTA button (optional)

#### Trust Banner
- Icons with text: "Doručenie zadarmo", "Vrátenie do 30 dní", "Rýchle doručenie"
- Small brand logos or trust indicators

#### New Arrivals (Novinky)
- 3-4 featured product cards
- Large images, minimal info
- Hover: Quick view or secondary image

#### Bestsellers
- Horizontal scroll or carousel
- Section title: "BESTSELLER ŽENY" / "BESTSELLER MUŽI"
- Product cards with:
  - Image
  - Brand name
  - Product name
  - Price (with strikethrough for sale)
  - Wishlist heart icon

#### Sale Sections
- Split layout: ŽENY | MUŽI
- Large typography: "SALE"
- Percentage discount visible
- Click-through to sale categories

#### Category Grid
- KABELKY (Bags) - large card
- DOPLNKY (Accessories) - medium card
- TOPÁNKY (Shoes) - medium card
- Visual hierarchy through card sizes

#### Newsletter
- "PRIHLÁSENIE NA ODBER"
- Email input + submit button
- Promise: Exkluzívne zľavy, novinky

#### Footer
- Simple, organized links
- Payment methods
- Social media icons
- Copyright

---

## 2. Yvetin Homepage Structure

### 3 Homepage Variants

#### A. Main Homepage (Mixed)
- Shows both women's and men's content
- Gender toggle prominent in header
- Sections:
  1. Hero Banner (unisex/neutral)
  2. Trust Banner
  3. Novinky (mixed or alternating)
  4. Bestseller Ženy
  5. Bestseller Muži
  6. Sale Ženy | Sale Muži (split)
  7. Categories (Kabelky, Doplnky, Topánky)
  8. Newsletter
  9. Footer

#### B. Women Homepage (/zeny)
- Focus on women's fashion
- Header shows "ŽENY" as active
- Sections:
  1. Hero Banner (women-focused)
  2. Trust Banner
  3. Novinky - Ženy
  4. Bestseller Ženy (extended)
  5. Kategórie Ženy (Šaty, Topy, Nohavice...)
  6. Sale Ženy
  7. Inšpirácia/Lookbook
  8. Newsletter
  9. Footer

#### C. Men Homepage (/muzi)
- Focus on men's fashion
- Header shows "MUŽI" as active
- Sections:
  1. Hero Banner (men-focused)
  2. Trust Banner
  3. Novinky - Muži
  4. Bestseller Muži (extended)
  5. Kategórie Muži (Tričká, Nohavice, Bundy...)
  6. Sale Muži
  7. Inšpirácia/Lookbook
  8. Newsletter
  9. Footer

---

## 3. Component Specifications

### Header Component
```typescript
interface HeaderProps {
  activeGender: 'women' | 'men' | null;
  onGenderChange: (gender: 'women' | 'men') => void;
  cartCount: number;
  wishlistCount: number;
}
```

### Product Card Component
```typescript
interface ProductCardProps {
  id: string;
  image: string;
  brand: string;
  name: string;
  price: number;
  originalPrice?: number;
  isNew?: boolean;
  isBestseller?: boolean;
}
```

### Section Components
- HeroBanner
- TrustBanner
- ProductCarousel (for bestsellers)
- CategoryGrid
- SaleBanner
- NewsletterForm
- Footer

---

## 4. Color Scheme for Yvetin

### Primary Palette
- **Black**: `#0A0A0A` - Primary text, buttons
- **White**: `#FFFFFF` - Backgrounds
- **Off-white**: `#FAFAFA` - Section backgrounds
- **Light Gray**: `#F0F0F0` - Cards, borders

### Accent Colors
- **Orange accent** (from current design): `#FF6B35` or `#E85D04`
- **Sale Red**: `#DC2626`
- **Success Green**: `#16A34A`

### Typography
- **Headings**: Inter or similar clean sans-serif
- **Body**: System font stack
- **Sizes**:
  - H1: 48px / mobile: 32px
  - H2: 32px / mobile: 24px
  - Body: 16px
  - Small: 14px

---

## 5. Implementation Priority

### Phase 1: Foundation
1. Update Header with gender switcher
2. Create base layout components
3. Setup routing for 3 homepage variants

### Phase 2: Homepage
1. Hero Banner
2. Trust Banner
3. Novinky section
4. Bestsellers carousel

### Phase 3: Features
1. Sale sections
2. Category grid
3. Newsletter
4. Footer

### Phase 4: Polish
1. Animations/transitions
2. Mobile responsiveness
3. Performance optimization
4. Testing

---

## 6. File Structure

```
yvettin.com/frontend/src/
├── app/
│   ├── page.tsx              # Main mixed homepage
│   ├── zeny/
│   │   └── page.tsx          # Women homepage
│   ├── muzi/
│   │   └── page.tsx          # Men homepage
│   ├── layout.tsx            # Root layout with Header
│   └── globals.css
├── components/
│   ├── layout/
│   │   ├── Header.tsx        # With gender switcher
│   │   ├── Footer.tsx
│   │   └── Navigation.tsx
│   ├── sections/
│   │   ├── HeroBanner.tsx
│   │   ├── TrustBanner.tsx
│   │   ├── NovinkySection.tsx
│   │   ├── BestsellerCarousel.tsx
│   │   ├── SaleSection.tsx
│   │   ├── CategoryGrid.tsx
│   │   └── NewsletterSection.tsx
│   └── ui/
│       ├── ProductCard.tsx
│       ├── GenderToggle.tsx
│       └── Button.tsx
├── hooks/
│   └── useGender.ts
├── lib/
│   └── utils.ts
└── types/
    └── index.ts
```

---

## 7. Navigation Structure

### Main Nav Items
- ŽENY → /zeny
- MUŽI → /muzi
- NOVINKY → /novinky
- SALE → /sale

### Women Categories (/zeny)
- Šaty
- Topy & Tričká
- Nohavice & Džínsy
- Sukne
- Bundy & Kabáty
- Šport
- Doplnky
- Topánky

### Men Categories (/muzi)
- Tričká & Polokošele
- Nohavice & Džínsy
- Bundy & Kabáty
- Mikiny & Svetry
- Košele
- Šport
- Doplnky
- Topánky

---

Document created: 2026-02-10
Next step: Start implementation with Header component and gender routing
