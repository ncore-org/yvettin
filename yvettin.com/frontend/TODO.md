# 🛍️ YVETTIN E-Shop - Enterprise Implementation Plan

## 📋 Projektové Zadanie
- **URL**: http://192.168.33.3:4009/ (fixný port)
- **Inšpirácia**: https://www.aboutyou.sk/
- **Technológie**: Next.js 14 + React + TypeScript + Tailwind + shadcn/ui
- **Dizajn**: Minimalistický, profesionálny, enterprise úroveň
- **Zameranie**: Móda a oblečenie

## 🎯 Štruktúra Stránok

### Level 0 - Hlavná stránka (Mixed)
- Kombinácia ponúk pre ženy aj mužov
- Hero banner (neutral)
- Novinky (mixed)
- Bestseller ženy
- Bestseller muži
- Sale sekcie (split)
- Kategórie

### Level 1 - Ženy (/zeny)
- Samostatná homepage pre ženy
- Hero banner (pink gradient)
- Novinky ženy
- Bestseller ženy
- Sale ženy
- Kategórie ženy

### Level 1 - Muži (/muzi)
- Samostatná homepage pre mužov
- Hero banner (blue gradient)
- Novinky muži
- Bestseller muži
- Sale muži
- Kategórie muži

## ✅ TODO List

### Fáza 1: Konfigurácia (DONE)
- [x] Nainštalovať ESLint + TypeScript ESLint
- [x] Nainštalovať Prettier
- [x] Nainštalovať Vitest + Testing Library
- [x] Nainštalovať Playwright
- [ ] Nainštalovať Storybook
- [x] Spustiť dev server na porte 4009

### Fáza 2: Dizajn Systém
- [ ] Definovať farebnú paletu (minimalistická)
- [ ] Nastaviť Tailwind config
- [ ] Vytvoriť design tokens
- [ ] Nastaviť typografiu

### Fáza 3: Komponenty (Podľa náčrtu)
- [ ] Header s navigáciou (Ženy, Muži, Search, Wishlist, Košík)
- [ ] Hero Banner (s obrovským obrázkom)
- [ ] Trust Banner (s ikonami)
- [ ] Novinky Section (3 veľké karty)
- [ ] Bestseller Carousel (pre ženy)
- [ ] Bestseller Carousel (pre mužov)
- [ ] Sale Section (2 stĺpce - ženy/muži)
- [ ] Category Grid (Kabelky, Doplnky, Topánky)
- [ ] Newsletter Section
- [ ] Footer

### Fáza 4: Stránky
- [ ] Upraviť hlavnú stránku (page.tsx)
- [ ] Upraviť /zeny stránku
- [ ] Upraviť /muzi stránku

### Fáza 5: Testy
- [ ] Unit testy pre komponenty
- [ ] E2E testy s Playwright
- [ ] Storybook stories

## 🎨 Dizajn Špecifikácia

### Farby (AboutYou inšpirácia)
```
Primary: #1A1A1A (čierna)
Secondary: #FFFFFF (biela)
Accent: #E11D48 (ružová - pre ženy)
Accent Blue: #1E40AF (modrá - pre muži)
Background: #FAFAFA (svetlá sivá)
Text: #1A1A1A (takmer čierna)
Text Muted: #6B7280 (sivá)
Border: #E5E7EB (svetlá sivá)
```

### Typography
```
Heading: Inter (sans-serif)
Body: Inter (sans-serif)
Accent: Playfair Display (serif - pre nadpisy)
```

### Layout
```
Max width: 1440px
Container padding: 16px (mobile), 24px (tablet), 32px (desktop)
Grid gap: 16px (mobile), 24px (desktop)
Section spacing: 64px (mobile), 96px (desktop)
```

## 📁 Štruktúra

```
src/
├── app/
│   ├── page.tsx (hlavná - mixed)
│   ├── zeny/
│   │   └── page.tsx
│   ├── muzi/
│   │   └── page.tsx
│   └── layout.tsx
├── components/
│   ├── ui/ (shadcn komponenty)
│   ├── sections/ (page sections)
│   │   ├── Header.tsx
│   │   ├── HeroBanner.tsx
│   │   ├── TrustBanner.tsx
│   │   ├── NovinkySection.tsx
│   │   ├── BestsellerCarousel.tsx
│   │   ├── SaleSection.tsx
│   │   ├── CategoryGrid.tsx
│   │   ├── NewsletterSection.tsx
│   │   └── Footer.tsx
│   └── home/
│       ├── WomenHomeContent.tsx
│       └── MenHomeContent.tsx
├── lib/
│   └── utils.ts
├── data/
│   └── products.ts
└── styles/
    └── globals.css
```

## 🚀 Inštrukcie pre vývoj

1. **Vždy použiť CVA** pre varianty komponentov
2. **Vždy použiť TypeScript** strict mode
3. **Vždy písať testy** pre nové komponenty
4. **Dodržiavať DRY** princíp
5. **Mobile-first** prístup
6. **Accessibility** (ARIA, keyboard navigation)

## 📝 Poznámky

- Žiadne experimenty - len profesionálny kód
- Minimalistický dizajn - menej je viac
- Rýchle načítanie - optimalizácia obrázkov
- SEO friendly - Next.js App Router
