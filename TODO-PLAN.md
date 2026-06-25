# YVETTIN - Komplexný implementačný plán
## Profesionálna enterprise úroveň (Inšpirácia: AboutYou.sk)

---

## 📋 HLAVNÉ TODOS (Celkovo 25+ úloh)

### ✅ SEKCIA 1: ŠTRUKTÚRA A ZÁKLADY (1-5)

#### TODO 1.1: Kompletná analýza AboutYou štruktúry
- [x] Preštudovať AboutYou.sk layout a komponenty
- [x] Identifikovať UX patterny (carousel, hover efekty, navigácia)
- [x] Zdokumentovať farebnú paletu a typografiu

#### TODO 1.2: Vytvoriť detailný komponentový systém
- [x] Definovať Design Tokens (farby, typography, spacing, shadows)
- [x] Vytvoriť komponentovú knižnicu v Storybook
- [x] Zdokumentovať každý komponent

#### TODO 1.3: Enhanced Folder Structure
- [ ] Rozšíriť src/components/ o logickú štruktúru:
  - `ui/` - základné komponenty (Button, Card, Badge)
  - `sections/` - sekcie stránky (Hero, Products, Categories)
  - `layout/` - Header, Footer, Navigation
  - `product/` - ProductCard, ProductCarousel, ProductQuickView
  - `shared/` - zdieľané utility komponenty

#### TODO 1.4: Global State Management Enhancement
- [ ] Vylepšiť Zustand stores (cart, wishlist, gender)
- [ ] Pridať loading states
- [ ] Implementovať error handling

#### TODO 1.5: Responsive Design System
- [ ] Definovať breakpoints (mobile, tablet, desktop, wide)
- [ ] Vytvoriť responsive container system
- [ ] Otestovať na všetkých zariadeniach

---

### ✅ SEKCIA 2: HLAVNÁ STRÁNKA - HERO SEKCIA (6-10)

#### TODO 2.1: Advanced Hero Banner
- [x] Vytvoriť HeroCarousel s viacerými slidmi
- [x] Pridať autoplay (6s interval) s pause on hover
- [x] Progress indicator
- [x] Smooth fade/slide transitions (Framer Motion)
- [x] 3 rôzne varianty: Ženy, Muži, Mixed
- [x] Navigation arrows
- [x] Dot indicators

#### TODO 2.2: Hero Content Enhancement
- [ ] Lepšia typografia (nadhlav, hlavný nadpis, podnadpis)
- [ ] Gradient overlays pre lepšiu čitateľnosť
- [ ] 2 CTA tlačidlá (Primárne + Sekundárne)
- [ ] Seasonal badges (Nová kolekcia, Zľavy)

#### TODO 2.3: Trust Banner Enhancement
- [ ] 4 ikony s popismi (Doprava, Vrátenie, Platba, Doručenie)
- [ ] Horizontal scroll na mobile
- [ ] Hover efekty na ikonách
- [ ] Counter animácie (100+ značiek, 50k+ spokojných zákazníkov)

#### TODO 2.4: Brand Logos Section
- [ ] Horizontal scroll s logami značiek
- [ ] Infinite loop animation
- [ ] Grayscale → Color on hover

#### TODO 2.5: Promo Banner Section
- [ ] Countdown timer pre akcie
- [ ] Full-width banner s parallax efektom

---

### ✅ SEKCIA 3: PRODUKTY A KATEGÓRIE (11-15)

#### TODO 3.1: Enhanced Product Cards
- [ ] Lepšie product card dizajn:
  - Image gallery (hover = second image)
  - Badges: NOVÉ, BESTSELLER, -XX%
  - Wishlist heart icon (absolute position)
  - Quick add to cart (hover overlay)
  - Size selector (quick pick)
- [ ] Skeleton loading states
- [ ] Lazy loading obrázkov

#### TODO 3.2: Product Carousel Enhancement
- [ ] Touch/swipe support
- [ ] Arrow navigation (left/right)
- [ ] Pagination dots
- [ ] Auto-scroll option
- [ ] Responsive item count (mobile: 2, tablet: 3, desktop: 4-6)

#### TODO 3.3: Novinky Section
- [ ] 3 produkty v grid layoute (podľa náčrtu)
- [ ] Veľké produktové karty s detailným popisom
- [ ] "Zobraziť všetky novinky" CTA

#### TODO 3.4: Bestseller Sections (Ženy + Muži)
- [ ] Horizontal carousel s 6-8 produktami
- [ ] Sekcia ženy - ružový/červený akcent
- [ ] Sekcia muži - modrý akcent
- [ ] Gender-specific hero images

#### TODO 3.5: Category Grid Enhancement
- [ ] Layout podľa náčrtu:
  - Kabelky (veľká, na výšku)
  - Doplnky + Topánky (vedľa, na šírku)
- [ ] Hover efekty (zoom + overlay)
- [ ] Category badges s počtom produktov

---

### ✅ SEKCIA 4: SALE A PROMO SEKCIE (16-18)

#### TODO 4.1: Sale Sections (Ženy + Muži)
- [ ] Dve polovice: SALE ŽENY | SALE MUŽI
- [ ] Gradient backgrounds (pink pre ženy, blue pre mužov)
- [ ] Veľké percento zľavy (-30%, -50%)
- [ ] CTA tlačidlá s hover efektami

#### TODO 4.2: Featured Collections
- [ ] Editorial-style sekcie
- [ ] Veľké obrázky + text overlay
- [ ] "Shop the look" funkcionalita

#### TODO 4.3: Countdown Timer
- [ ] Odpočítavanie do konca akcie
- [ ] Flipping numbers animation
- [ ] Urgent messaging ("Už len XX hodín!")

---

### ✅ SEKCIA 5: NAVIGÁCIA A HEADER (19-21)

#### TODO 5.1: Enhanced Header
- [ ] Sticky header s backdrop blur
- [ ] Gender toggle: ŽENY | MUŽI (aktívny stav)
- [ ] Lepšie logo placement
- [ ] Search bar expansion on focus
- [ ] Cart/Wishlist counters s animáciou

#### TODO 5.2: Mega Menu
- [ ] Dropdown menu s kategóriami
- [ ] Featured products in menu
- [ ] Brand logos in menu
- [ ] Full-width mega menu na hover

#### TODO 5.3: Mobile Navigation
- [ ] Hamburger menu s animáciou
- [ ] Slide-in drawer zľava
- [ ] Accordion menu pre kategórie
- [ ] Bottom bar (Home, Search, Cart, Account)

---

### ✅ SEKCIA 6: FOOTER A NEWSLETTER (22-23)

#### TODO 6.1: Enhanced Footer
- [ ] 4 stĺpce: O nás, Nakupovanie, Servis, Newsletter
- [ ] Payment icons (Visa, Mastercard, PayPal)
- [ ] Social media links s ikonami
- [ ] App store badges (iOS, Android)

#### TODO 6.2: Newsletter Section
- [ ] Full-width dark section
- [ ] Benefit list (exkluzívne zľavy, novinky)
- [ ] Success/error states pre formulár
- [ ] GDPR checkbox

---

### ✅ SEKCIA 7: FUNKCIONALITA A UX (24-25)

#### TODO 7.1: Animácie a Mikro-interakcie
- [ ] Page transitions (Framer Motion)
- [ ] Scroll animations (fade in, slide up)
- [ ] Hover states na všetkých interactive prvkoch
- [ ] Loading skeletons
- [ ] Toast notifications

#### TODO 7.2: Performance Optimization
- [ ] Image optimization (Next.js Image)
- [ ] Code splitting
- [ ] Lazy loading sekcii
- [ ] Caching strategies

---

## 🎨 DIZAJN ŠPECIFIKÁCIE

### Farebná paleta (zachovaná z náčrtu):
```
Primary: #000000 (čierna)
Secondary: #FFFFFF (biela)
Accent Women: #F472B6 (ružová)
Accent Men: #3B82F6 (modrá)
Background: #F5F5F5 (sivá)
Text: #171717 (tmavá)
Text Muted: #737373 (sivá)
Success: #22C55E
Error: #EF4444
Warning: #F59E0B
```

### Typography:
```
Nadpisy: Inter (light, medium)
Body: Inter (regular)
Accent: System fonts
```

---

## 📅 IMPLEMENTAČNÝ HARMONOGRAM

### Fáza 1: Základy (TODO 1.1 - 1.5)
- Trvanie: 1-2 hodiny
- Výstup: Funkčný design system

### Fáza 2: Hero + Trust (TODO 2.1 - 2.5)
- Trvanie: 2-3 hodiny
- Výstup: Impresívna hero sekcia

### Fáza 3: Produkty (TODO 3.1 - 3.5)
- Trvanie: 3-4 hodiny
- Výstup: Profesionálne produktové sekcie

### Fáza 4: Sale + Promo (TODO 4.1 - 4.3)
- Trvanie: 1-2 hodiny
- Výstup: Konverzné sekcie

### Fáza 5: Navigácia (TODO 5.1 - 5.3)
- Trvanie: 2-3 hodiny
- Výstup: UX optimalizovaná navigácia

### Fáza 6: Footer + Newsletter (TODO 6.1 - 6.2)
- Trvanie: 1-2 hodiny
- Výstup: Kompletný footer

### Fáza 7: Animácie + Performance (TODO 7.1 - 7.2)
- Trvanie: 2-3 hodiny
- Výstup: Polished UX

---

## 📝 POZNÁMKY

- Každý TODO má mať vlastný commit
- Testovať na mobile (192.168.33.3:4009)
- Dodržiavať enterprise code quality
- Používať Shadcn/ui komponenty ako základ
- Všetky zmeny musia byť responzívne

---

**Vytvorené:** 2026-02-11
**Autor:** NCore
**Status:** 🚧 In Progress
