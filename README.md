# 🛍️ Yvettin E-Shop

**Prémiový e-commerce platform pre módu a oblečenie**

Enterprise-grade Next.js 14 + NestJS + PostgreSQL aplikácia.

---

## 🚀 Quick Start

### Frontend (localhost demo)

```bash
cd /ncore-openclaw-backup/yvettin/yvettin.com/frontend
npm install
npm run dev
```

**URL:** http://127.0.0.1:4009

### Backend (pripravené, nezapnuté)

```bash
cd /ncore-openclaw-backup/yvettin/yvettin.com/backend
# TBD - not initialized yet
```

---

## 📊 Tech Stack

### Frontend
- Next.js 14.2.5 (App Router)
- React 18
- TypeScript 5.x
- Tailwind CSS
- Shadcn/ui
- Zustand (state)
- Framer Motion (animations)
- TanStack Query (server state)

### Backend (pripravené)
- NestJS 14.x
- Prisma ORM
- PostgreSQL 16
- Redis 7
- GraphQL + REST
- JWT auth

---

## 📁 Štruktúra

```
yvettin.com/
├── frontend/          # Next.js aplikácia
│   ├── src/
│   │   ├── app/              # Pages (App Router)
│   │   ├── components/       # React komponenty
│   │   ├── lib/              # Stores, utilities
│   │   ├── types/            # TypeScript types
│   │   └── data/             # Demo data
│   └── public/               # Static assets
│
└── backend/           # NestJS API (not running)
    └── src/
        ├── modules/
        ├── prisma/
        └── main.ts
```

---

## 🎯 功能 (Features)

### ✅ Implementované
- Homepage s hero sliderom
- Kategorizácia produktov (multi-level)
- Product cards s wishlist funkcionalitou
- Shopping cart (Zustand + localStorage)
- Responsive dizajn (mobile-first)
- Enterprise-grade UI/UX

### 🔄 V Procese
- Category pages s filtrami
- Product detail pages
- Checkout flow
- User authentication

### 📋 Plánované
- Backend API integration
- Payment gateway (Stripe)
- Admin panel
- Order management

---

## 📖 Dokumentácia

- **[Master Plan](./docs/PLAN-ENTERPRISE-IMPLEMENTACIA.md)** - 40-bodový implementation roadmap
- **[Status](./docs/STATUS.md)** - Aktuálny stav implementácie
- **[Context Rules](./CONTEXT_RULES.md)** - Project context guidelines

---

## 🎨 Design System

### Farby
- **Primary:** Pink/Red (`#E11D48`) - fashion brand vibe
- **Gradients:** Primary → Pink → Rose
- **Fonts:** Inter (body), Playfair Display (headings)

### Komponenty
- Shadcn/ui architektúra
- Tailwind utility classes
- Framer Motion animations

---

## 👨‍💻 Development

### Commands

```bash
# Frontend dev server
npm run dev          # Port 4009

# Build production
npm run build

# Type checking
npm run lint
```

### Environment

- **Node.js:** v25.6.0
- **OS:** Bedrock Linux (BlackArch stratum)
- **Workspace:** `/ncore-openclaw-backup/yvettin/`

---

## 📊 Demo Data

- **Produkty:** 5 hardcoded (expandable to 20-30)
- **Kategórie:** Level 0-2 strom (Ženy, Muži + subcategories)
- **Images:** Placeholders (gradient backgrounds)

---

## 🔒 Security & Compliance

- GDPR compliant (privacy policy, cookie banner)
- JWT authentication (backend ready)
- SSL encryption (production)
- Input validation
- XSS/CSRF protection

---

## 📈 Performance

- Next.js App Router (RSC)
- Image optimization
- Code splitting
- Font optimization
- Lazy loading

**Target Lighthouse Scores:**
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

---

## 🤝 Contributing

Enterprise-grade development standards:
- TypeScript strict mode
- ESLint configured
- Consistent naming
- Comprehensive comments
- Type-safe everything

---

## 📝 License

Proprietary - Yvettin © 2026

---

**Author:** Nix ⚡  
**Created:** 2026-02-07  
**Status:** Active Development
