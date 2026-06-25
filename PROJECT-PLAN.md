# YVETTIN E-COMMERCE - KOMPLETNÝ PLÁN PROJEKTU

**Verzia**: 2.0  
**Dátum**: 2026-03-07  
**Status**: Aktívny vývoj + Production na remote node

---

## 1. ARCHITEKTÚRA SYSTÉMU

### 1.1 Pracovné prostredia

```
┌─────────────────────────────────────────────────────────────────┐
│  LOKÁLNE PROSTREDIE (Development)                               │
│  Path: /ncore-openclaw-backup/workspace-yvettin/yvettin/       │
│  Frontend: yvettin.com/frontend/                                │
│  - Všetky kódové zmeny                                         │
│  - Git version control                                         │
│  - Lokálne testovanie                                          │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ Deploy (tar + scp)
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│  REMOTE NODE (Production)                                       │
│  IP: 10.99.99.158                                               │
│  User: alex / Password: Homosko123                              │
│  Path: /home/alex/yvettin-sync/frontend/                        │
│  - Next.js server (port 4009)                                   │
│  - Cloudflare Tunnel                                            │
│  - Public internet access                                       │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ Cloudflare Tunnel
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│  PUBLIC URL                                                     │
│  Format: https://*.trycloudflare.com                            │
│  - Prístupné odkiaľkoľvek                                      │
│  - Žiadna inštalácia pre používateľov                           │
│  - URL sa mení pri reštarte tunelu                              │
└─────────────────────────────────────────────────────────────────┘
```

### 1.2 Tech Stack

| Kategória | Technológia | Verzia | Účel |
|-----------|-------------|--------|------|
| **Framework** | Next.js | 14.2.35 | App Router, SSR, SSG |
| **UI Library** | React | 18.2.0 | Component framework |
| **Language** | TypeScript | 5.x | Type safety |
| **Styling** | Tailwind CSS | 3.x | Utility-first CSS |
| **Components** | shadcn/ui | latest | UI primitives |
| **State** | Zustand | 4.5.7 | Client state |
| **Server State** | TanStack Query | 5.x | Server state management |
| **Animations** | Framer Motion | 10.x | Animations |
| **Forms** | React Hook Form | 7.x | Form handling |
| **Validation** | Zod | 4.x | Schema validation |
| **Icons** | Lucide React | 0.300.0 | Icon library |
| **Deployment** | Cloudflare Tunnel | 2026.2.0 | Public exposure |
| **Process Mgmt** | tmux | - | Session management |

---

## 2. STRUKTÚRA PROJEKTU

### 2.1 Lokálna štruktúra

```
/ncore-openclaw-backup/workspace-yvettin/yvettin/
├── yvettin.com/frontend/
│   ├── src/
│   │   ├── app/                          # Next.js App Router
│   │   │   ├── (category-page)/[slug]/   # Dynamic category route
│   │   │   ├── dropy/                    # Dropy category
│   │   │   ├── oblecenie/                # Oblečenie category
│   │   │   ├── obuv/                     # Obuv category
│   │   │   ├── sport/                    # Šport category
│   │   │   ├── doplnky/                  # Doplnky category
│   │   │   ├── streetwear/               # Streetwear category
│   │   │   ├── premium/                  # Premium category
│   │   │   ├── vypredaj/                 # VÝPREDAJ category (special)
│   │   │   ├── novinky/                  # Novinky category (special)
│   │   │   ├── kosik/                    # Cart page
│   │   │   ├── checkout/                 # Checkout page
│   │   │   ├── produkt/[slug]/           # Product detail
│   │   │   ├── kategoria/[...slug]/      # Legacy category
│   │   │   ├── account/                  # User account
│   │   │   ├── kontakt/                  # Contact
│   │   │   ├── doprava/                  # Shipping info
│   │   │   ├── vymena-vratenie/          # Returns
│   │   │   ├── faq/                      # FAQ
│   │   │   ├── velkostne-tabulky/        # Size charts
│   │   │   ├── body-za-nakup/            # Loyalty points
│   │   │   ├── outlet/                   # Outlet
│   │   │   ├── notifikacie/              # Notifications
│   │   │   ├── wishlist/                 # Wishlist
│   │   │   ├── compare/                  # Compare products
│   │   │   ├── vyhladavanie/             # Search
│   │   │   ├── objednavka-dakujeme/      # Order confirmation
│   │   │   ├── obchodne-podmienky/       # Terms
│   │   │   ├── gdpr/                     # GDPR
│   │   │   ├── cookies/                  # Cookies policy
│   │   │   ├── pomoc/                    # Help
│   │   │   ├── zeny/                     # Women section
│   │   │   ├── muzi/                     # Men section
│   │   │   ├── layout.tsx                # Root layout
│   │   │   ├── page.tsx                  # Homepage
│   │   │   ├── providers.tsx             # Context providers
│   │   │   └── globals.css               # Global styles
│   │   ├── components/
│   │   │   ├── category/
│   │   │   │   ├── CategoryBannerSlider.tsx    # Banner slider
│   │   │   │   ├── CategoryPage.tsx            # Category template
│   │   │   │   └── CategoryPageTemplate.tsx    # Universal template
│   │   │   ├── sections/
│   │   │   │   ├── BrandsCarousel.tsx          # Brands carousel
│   │   │   │   └── [other sections]
│   │   │   ├── ui/
│   │   │   │   ├── CookieBanner.tsx            # Cookie consent
│   │   │   │   ├── ExitIntentPopup.tsx         # Exit popup
│   │   │   │   ├── ProductCard.tsx             # Product card
│   │   │   │   └── [shadcn components]
│   │   │   ├── cart/
│   │   │   │   └── CartDrawer.tsx              # Cart sidebar
│   │   │   └── layout/
│   │   │       ├── Header.tsx                  # Header
│   │   │       └── Footer.tsx                  # Footer
│   │   ├── lib/
│   │   │   ├── store/
│   │   │   │   ├── cart.ts                     # Cart store
│   │   │   │   ├── cart-ui.ts                  # Cart UI store
│   │   │   │   └── wishlist.ts                 # Wishlist store
│   │   │   ├── utils.ts                        # Utilities
│   │   │   └── [other libs]
│   │   ├── types/
│   │   │   └── index.ts                        # TypeScript types
│   │   └── hooks/
│   │       └── [custom hooks]
│   ├── public/
│   │   └── images/
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.ts
│   ├── next.config.js
│   └── .env.local
├── docs/
│   ├── AGENT_MEMORY.md                     # Agent memory
│   ├── DEPLOYMENT.md                       # Deployment guide
│   └── INTERNAL-SYSTEM-DOCS.md             # Internal docs
├── scripts/
│   ├── deploy-to-remote.sh                 # Deploy script
│   └── start-server.sh                     # Server start
└── [root config files]
```

### 2.2 Remote štruktúra

```
/home/alex/yvettin-sync/frontend/
├── .next/
│   ├── standalone/                         # Standalone build
│   │   ├── node_modules/                   # Production deps
│   │   ├── _next/
│   │   │   └── static/                     # Static assets
│   │   ├── server.js                       # Server entry
│   │   └── package.json
│   └── static/                             # Build assets
├── node_modules/                           # All dependencies
├── src/                                    # Source code
├── package.json
└── [config files]
```

---

## 3. ZÁVISLOSTI A MODULY

### 3.1 Core Dependencies (package.json)

```json
{
  "dependencies": {
    "next": "14.2.35",                    // Framework
    "react": "18.2.0",                     // UI library
    "react-dom": "18.2.0",                 // DOM rendering
    "typescript": "5.x",                   // Language
    "tailwindcss": "3.x",                  // Styling
    "@radix-ui/*": "latest",               // UI primitives
    "lucide-react": "0.300.0",             // Icons
    "framer-motion": "10.x",               // Animations
    "zustand": "4.5.7",                    // State
    "@tanstack/react-query": "5.x",        // Server state
    "react-hook-form": "7.x",              // Forms
    "zod": "4.x",                          // Validation
    "class-variance-authority": "latest",  // Variants
    "clsx": "latest",                      // Classnames
    "tailwind-merge": "latest"             // Class merging
  },
  "devDependencies": {
    "@types/node": "20.x",
    "@types/react": "18.x",
    "eslint": "8.x",
    "prettier": "3.x"
  }
}
```

### 3.2 Modulové závislosti

```
Homepage (/)
├── Header.tsx
│   ├── Gender context
│   ├── Cart store
│   └── Wishlist store
├── Hero slider
│   └── Framer Motion
├── Trust badges section
├── Brands carousel
│   └── Framer Motion
├── New arrivals section
│   └── ProductCard.tsx
├── Bestseller sections (Women/Men)
│   └── ProductCard.tsx
├── Category grid
├── Benefits section
└── Footer.tsx

Category Pages (/obuv, /vypredaj, etc.)
├── CategoryBannerSlider.tsx
│   └── Framer Motion
├── CategoryPageTemplate.tsx
│   ├── ProductCard.tsx
│   ├── BrandsCarousel.tsx
│   └── Filter tabs
└── Header.tsx + Footer.tsx

Cart (/kosik)
├── Cart page
│   └── Cart store
└── Header.tsx + Footer.tsx

Checkout (/checkout)
├── Checkout form
│   ├── Payment methods
│   │   ├── Card (local form)
│   │   ├── Apple Pay
│   │   ├── Google Pay
│   │   ├── Bank transfer
│   │   └── PayPal
│   └── Shipping options
└── Cart store

Exit Intent Popup
├── ExitIntentPopup.tsx
│   ├── Mouse leave detection
│   ├── Email capture
│   └── LocalStorage (seen tracking)
└── Framer Motion

Cookie Banner
├── CookieBanner.tsx
│   ├── LocalStorage (consent)
│   └── Framer Motion
└── Preferences panel
```

---

## 4. DEPLOYMENT WORKFLOW

### 4.1 Lokálny vývoj

```bash
# 1. Navigate to project
cd /ncore-openclaw-backup/workspace-yvettin/yvettin/yvettin.com/frontend

# 2. Install dependencies
npm install

# 3. Run development server
npm run dev  # Port 4009

# 4. Make changes
# Edit files in src/

# 5. Test locally
# Open http://localhost:4009
```

### 4.2 Deploy na remote

```bash
# 1. Build locally
cd /ncore-openclaw-backup/workspace-yvettin/yvettin/yvettin.com/frontend
npm run build

# 2. Create tarball (including .next, node_modules, and public)
cd /ncore-openclaw-backup/workspace-yvettin/yvettin/yvettin.com
tar -czf /tmp/yvettin-complete.tar.gz frontend/

# 3. Copy to remote
sshpass -p 'Homosko123' scp /tmp/yvettin-complete.tar.gz alex@10.99.99.158:/home/alex/yvettin-sync/

# 4. Extract on remote
sshpass -p 'Homosko123' ssh alex@10.99.99.158 << 'ENDSSH'
cd /home/alex/yvettin-sync
rm -rf frontend
tar -xzf yvettin-complete.tar.gz
cd frontend

# CRITICAL: Copy static files to standalone
mkdir -p .next/standalone/_next/static
cp -r .next/static/* .next/standalone/_next/static/

# CRITICAL: Copy public folder to standalone (for images to work)
cp -r public .next/standalone/
ENDSSH

# 5. Restart server on remote
sshpass -p 'Homosko123' ssh alex@10.99.99.158 << 'ENDSSH'
pkill -9 node
sleep 3
cd /home/alex/yvettin-sync/frontend/.next/standalone
PORT=4009 node server.js > /home/alex/server.log 2>&1 &
ENDSSH

# 6. Restart tunnel
sshpass -p 'Homosko123' ssh alex@10.99.99.158 << 'ENDSSH'
pkill -9 cloudflared
sleep 2
/home/alex/bin/cloudflared tunnel --url http://localhost:4009 > /home/alex/tunnel.log 2>&1 &
sleep 10
grep trycloudflare /home/alex/tunnel.log | tail -1
ENDSSH
```

### 4.3 Overenie deployu

```bash
# Test homepage
curl -s -L 'https://[URL].trycloudflare.com/' | grep -c '<!DOCTYPE html>'

# Test category pages
curl -s -L 'https://[URL].trycloudflare.com/obuv' | grep -c '<!DOCTYPE html>'
curl -s -L 'https://[URL].trycloudflare.com/vypredaj' | grep -c '<!DOCTYPE html>'
curl -s -L 'https://[URL].trycloudflare.com/novinky' | grep -c '<!DOCTYPE html>'

# Test CSS loads
curl -s -L 'https://[URL].trycloudflare.com/_next/static/css/[HASH].css' | head -c 100

# Test JS loads
curl -s -L 'https://[URL].trycloudflare.com/_next/static/chunks/[HASH].js' | head -c 100
```

---

## 5. MONITORING SYSTÉM

### 5.1 Health Check Endpoints

| Endpoint | Expected | Priority |
|----------|----------|----------|
| `/` | 200 + HTML structure | CRITICAL |
| `/_next/static/css/*.css` | 200 + CSS content | CRITICAL |
| `/_next/static/chunks/*.js` | 200 + JS content | CRITICAL |
| `/obuv` | 200 + Category structure | HIGH |
| `/vypredaj` | 200 + Sale structure | HIGH |
| `/novinky` | 200 + New structure | HIGH |
| `/kosik` | 200 + Cart structure | MEDIUM |
| `/checkout` | 200 + Checkout form | MEDIUM |

### 5.2 Štruktúra validácia

```javascript
// Homepage must have:
- <!DOCTYPE html>
- <html lang="sk">
- <header> with navigation
- <main> with sections
- <footer>
- ExitIntentPopup component
- CookieBanner component

// Category pages must have:
- CategoryBannerSlider
- Product cards grid
- Filter tabs
- Brands carousel

// CSS must have:
- @font-face declarations
- Tailwind utilities
- Custom styles
```

---

## 6. KONFIGURÁCIA

### 6.1 Remote Node

```
IP: 10.99.99.158
User: alex
Password: Homosko123
SSH Port: 22
```

### 6.2 Server Configuration

```
Port: 4009
Mode: Standalone (Next.js)
Process: node server.js
Log: /home/alex/server.log
```

### 6.3 Tunnel Configuration

```
Service: Cloudflare Tunnel
Binary: /home/alex/bin/cloudflared
Log: /home/alex/tunnel.log
URL Format: https://*.trycloudflare.com
```

### 6.4 tmux Sessions

```
Session: server  - Next.js server
Session: tunnel  - Cloudflare Tunnel
```

---

## 7. troubleshooting

### 7.1 Common Issues

| Issue | Cause | Solution |
|-------|-------|----------|
| CSS 400/404 | Missing static files | Copy `.next/static` to `standalone/_next/static` |
| EADDRINUSE | Port 4009 occupied | `pkill -9 node` then restart |
| Tunnel 1003 | Tunnel disconnected | Restart cloudflared |
| Module not found | Missing node_modules | Include node_modules in deploy |
| 404 on pages | Build cache corrupt | `rm -rf .next && npm run build` |

### 7.2 Emergency Reset

```bash
# Kill everything
ssh alex@10.99.99.158 "pkill -9 node; pkill -9 cloudflared; tmux kill-server"

# Clean build
cd /ncore-openclaw-backup/workspace-yvettin/yvettin/yvettin.com/frontend
rm -rf .next
npm run build

# Full redeploy
[Follow deployment workflow]
```

---

## 8. BEZPEČNOSŤ

### 8.1 Credentials

| Service | Credential | Storage |
|---------|------------|---------|
| Remote SSH | alex/Homosko123 | Memory only |
| Cloudflare | Auto-generated | Tunnel log |

### 8.2 Best Practices

- Never commit credentials to git
- Use environment variables for sensitive data
- Rotate passwords periodically
- Monitor access logs

---

## 9. BUDÚCE VYLEPŠENIA

### 9.1 Planned Features

- [ ] Exit-intent popup s email capture (DONE)
- [ ] Cart slide na pravú stranu (DONE)
- [ ] /kosik page (DONE)
- [ ] Checkout s lokálnou platbou (DONE)
- [ ] Všetky platobné metódy (DONE)
- [ ] User authentication
- [ ] Order management
- [ ] Admin panel
- [ ] Email notifications
- [ ] Analytics integration

### 9.2 Performance Goals

- Lighthouse Performance: 90+
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Bundle Size: < 500KB

---

**Dokument vytvoril**: AI Agent  
**Posledná aktualizácia**: 2026-03-07  
**Ďalšia revízia**: Pri väčších zmenách architektúry
