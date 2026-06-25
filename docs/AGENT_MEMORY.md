# Agent Memory Notes - Yvettin Project

**Last updated**: 2026-03-07  
**Session**: Category Pages Implementation + Remote Deployment System

---

## Repository Context

- **Repository root**: `/ncore-openclaw-backup/workspace-yvettin/yvettin/`
- **Active delivery scope**: frontend only
- **Frontend source**: `yvettin.com/frontend/`
- **Frontend runtime**: Next.js 14 App Router, port `4009`
- **Backend status**: scaffolded NestJS (not running)

---

## 🚀 DEPLOYMENT ARCHITECTURE

### Dual-Workspace System

```
┌─────────────────────────────────────────────────────────────┐
│  LOCAL WORKSPACE (Development)                              │
│  Path: /ncore-openclaw-backup/workspace-yvettin/yvettin/    │
│  - All code edits happen here                               │
│  - Git version control here                                 │
│  - Local testing here                                       │
└─────────────────────────────────────────────────────────────┘
                          │
                          │ rsync/tar sync via sshpass
                          ↓
┌─────────────────────────────────────────────────────────────┐
│  REMOTE NODE (Production Server)                            │
│  IP: 10.99.99.158 (local network)                           │
│  User: alex / Password: Homosko123                          │
│  Path: /home/alex/yvettin-sync/frontend/                    │
│  - Next.js server runs here (port 4009)                     │
│  - Cloudflare Tunnel runs here                              │
│  - Public internet access via tunnel                        │
└─────────────────────────────────────────────────────────────┘
                          │
                          │ Cloudflare Tunnel
                          ↓
┌─────────────────────────────────────────────────────────────┐
│  PUBLIC URL (Internet Access)                               │
│  Format: https://*.trycloudflare.com                        │
│  - Accessible from anywhere                                 │
│  - No installation needed for users                         │
│  - URL changes on tunnel restart                            │
│  - No authentication (public access)                        │
└─────────────────────────────────────────────────────────────┘
```

### Remote Node Configuration

**SSH Access**:
```bash
ssh alex@10.99.99.158
# Password: Homosko123
```

**Key Paths**:
- Frontend: `/home/alex/yvettin-sync/frontend/`
- Cloudflared binary: `/home/alex/bin/cloudflared`
- Server log: `/home/alex/yvettin.log`
- Tunnel log: `/home/alex/tunnel.log`

**Current Public URL**: Changes on each tunnel restart (get from tunnel log)

### Deployment Commands

**Sync local → remote**:
```bash
# Create tarball
cd /ncore-openclaw-backup/workspace-yvettin/yvettin/yvettin.com
tar --exclude 'node_modules' --exclude '.next' --exclude '.git' -czf /tmp/yvettin-deploy.tar.gz frontend/

# Copy to remote
sshpass -p 'Homosko123' scp -o StrictHostKeyChecking=no /tmp/yvettin-deploy.tar.gz alex@10.99.99.158:/home/alex/yvettin-sync/

# Extract and rebuild on remote
sshpass -p 'Homosko123' ssh -o StrictHostKeyChecking=no alex@10.99.99.158 << 'ENDSSH'
cd /home/alex/yvettin-sync
rm -rf frontend
tar -xzf yvettin-deploy.tar.gz
cd frontend
npm install
npm run build
ENDSSH
```

**Start server and tunnel on remote**:
```bash
# Kill existing processes
sshpass -p 'Homosko123' ssh -o StrictHostKeyChecking=no alex@10.99.99.158 "pkill -9 -f next-server && pkill -9 -f cloudflared"

# Start server in tmux
sshpass -p 'Homosko123' ssh -o StrictHostKeyChecking=no alex@10.99.99.158 "tmux new -d -s server 'cd /home/alex/yvettin-sync/frontend && npm run start 2>&1 | tee /home/alex/server.log'"

# Start tunnel in tmux (after server is ready)
sshpass -p 'Homosko123' ssh -o StrictHostKeyChecking=no alex@10.99.99.158 "tmux new -d -s tunnel 'cd /home/alex && /home/alex/bin/cloudflared tunnel --url http://localhost:4009 2>&1 | tee /home/alex/tunnel.log'"

# Get public URL
sshpass -p 'Homosko123' ssh -o StrictHostKeyChecking=no alex@10.99.99.158 "grep trycloudflare /home/alex/tunnel.log | tail -1"
```

**Health checks**:
```bash
# Check server
sshpass -p 'Homosko123' ssh -o StrictHostKeyChecking=no alex@10.99.99.158 "curl -s -o /dev/null -w '%{http_code}' http://localhost:4009/"

# Check processes
sshpass -p 'Homosko123' ssh -o StrictHostKeyChecking=no alex@10.99.99.158 "ps aux | grep -E 'next|cloudflared' | grep -v grep"

# Get tunnel URL
sshpass -p 'Homosko123' ssh -o StrictHostKeyChecking=no alex@10.99.99.158 "grep trycloudflare /home/alex/tunnel.log | tail -1"
```

---

## Hard Constraints From Conversation

1. Keep existing minimalist premium fashion style.
2. Preserve current layout structure and color palette direction.
3. Keep product card box layout style (improve UX, do not redesign brand identity).
4. Avoid dead links and 404 routes.
5. Work pixel-to-pixel, verify carefully before handoff.
6. Use professional React + shadcn/ui style component composition.
7. Prioritize frontend subdirectories and route completeness.
8. Keep frontend server and docs aligned to port `4009`.
9. **NEW**: All development in local workspace, deploy to remote for testing
10. **NEW**: Public URL must work for users outside localhost network
11. **NEW**: Category pages must be accessible from header menu links

---

## Current Frontend Architecture Snapshot

### App Routes Structure
```
src/app/
├── (category-page)/[slug]/page.tsx    # Dynamic category route (backup)
├── obuv/page.tsx                       # Footwear category
├── vypredaj/page.tsx                   # Sale category (special)
├── novinky/page.tsx                    # New arrivals (special)
├── page.tsx                            # Homepage
├── kategoria/                          # Legacy category routes
└── produkt/[slug]/                     # Product detail pages
```

### Category Page Components
```
src/components/category/
├── CategoryBannerSlider.tsx    # Banner slider with 15s auto-rotate + progress
└── CategoryPage.tsx            # Main category page template

src/components/sections/
└── BrandsCarousel.tsx          # Brand logos carousel
```

### UI Components
- `src/components/ui/CookieBanner.tsx` - Simplified cookie consent
- `src/components/ui/ProductCard.tsx` - Product display card
- `src/components/layout/Header.tsx` - Main navigation

### State Management
- cart store: `src/lib/store/cart.ts`
- wishlist store: `src/lib/store/wishlist.ts`
- Product/domain types: `src/types/index.ts`

---

## Tech Stack Details

### Frontend
- Next.js 14.2.35 (App Router)
- React 18.2.0
- TypeScript 5.x
- Tailwind CSS 3.x
- shadcn/ui components
- Zustand (state management)
- TanStack Query (server state)
- Framer Motion (animations)

### DevOps
- Cloudflare Tunnel (cloudflared 2026.2.0)
- Node.js (version in package.json)
- tmux (process management on remote)
- sshpass (automated SSH)

---

## Category Pages Implementation (2026-03-07)

### Implemented Categories

| Category | Route | Special Features |
|----------|-------|-----------------|
| Obuv | `/obuv` | Standard category layout |
| VÝPREDAJ | `/vypredaj` | Special badges, sale styling |
| Novinky | `/novinky` | Special badges, new arrivals styling |

### Category Page Features

**All categories include**:
1. **Banner Slider** (`CategoryBannerSlider.tsx`)
   - 3 slides with category-specific images
   - 15-second auto-rotate
   - Progress bar indicators (visual feedback)
   - Manual navigation arrows
   - Pause on hover

2. **Category Header**
   - Breadcrumb-style "Kategória" label
   - Large title (H1)
   - Description text

3. **Filter Tabs**
   - "Všetky produkty" (All products)
   - "Najpredávanejšie" (Bestsellers)
   - "Výpredaj" (Sale items)

4. **"To najlepšie z kategórie" Section**
   - Featured products carousel
   - 6 products max
   - Links to full category

5. **Main Products Grid**
   - All category products
   - ProductCard components
   - Responsive grid (2/3/4/6 columns)

6. **"Posledné kusy" Section** (if applicable)
   - Low stock products (< 10 items)
   - Orange/red gradient background
   - Urgency messaging

7. **Brands Carousel** (`BrandsCarousel.tsx`)
   - 6 brands per slide
   - Navigation arrows
   - Pagination dots
   - Hover effects

8. **Features Section**
   - "Prémiová kvalita"
   - "Aktuálne trendy"
   - "Rýchle dodanie"
   - Dark background, white text

### Special Category Styling

**VÝPREDAJ**:
- Red badges: "Až -70%", "Obmedzená ponuka"
- Sale-focused banner images
- Discount percentages on products

**Novinky**:
- Dark badges: "Nová kolekcia", "Práve dorazené"
- Fresh product banner images
- "NOVÉ" badges on products

### Header Navigation Integration

Bottom navigation bar links:
```tsx
{ name: 'Obuv', href: '/obuv' }
{ name: 'VÝPREDAJ', href: '/vypredaj', highlight: true }
{ name: 'Novinky', href: '/novinky' }
```

---

## Known Runtime and Validation Notes

### Server Issues
- Stale `next-server` processes can serve old chunks and cause false 404 or HTML-only rendering
- Safe recovery sequence:
  1. `pkill -9 -f next-server`
  2. `rm -rf .next`
  3. `npm run build`
  4. `npm run start`
  5. Hard refresh browser cache

### Tunnel Issues
- URL changes on every tunnel restart
- Tunnel may need manual restart if connection drops
- Check logs at `/home/alex/tunnel.log` on remote node
- Use tmux for persistent tunnel sessions

### Deployment Issues
- Always exclude `node_modules`, `.next`, `.git` from sync
- Run `npm install` on remote after sync if dependencies changed
- Always rebuild on remote (`npm run build`) before starting server
- Wait 8-10 seconds after starting server before accessing

### Common Errors

**Error 1003 (Cloudflare)**:
- Usually means tunnel disconnected
- Solution: Restart tunnel in tmux

**EADDRINUSE :::4009**:
- Port already in use
- Solution: `pkill -9 -f next` then restart

**404 on category pages**:
- Check if page.tsx exists in correct location
- Verify build completed successfully
- Clear .next cache and rebuild

---

## Requested Next Work (Stored Priority)

### P0: System fixes
- [ ] Fix header search behavior so placeholder and submit flow are reliable
- [ ] Replace fragile navigation behavior with router-based search transition

### P0: Cart interaction
- [ ] On add-to-cart, open right-side slide panel with newly added item details
- [ ] Include interactive actions: continue shopping, go to cart, go to checkout

### P0: Checkout
- [ ] Fix cart-to-checkout navigation
- [ ] Build complete checkout flow and content
- [ ] Payment methods restricted to: Card, PayPal

### P1: Homepage content extension
- [ ] Add two new sections to home while preserving minimalist design system
- [ ] Insert tasteful intermediate content block (minimal banner/editorial)

### P1: Product detail experience upgrade
- [ ] Raise PDP quality to enterprise UX level
- [ ] Expand variant realism and variant selection logic
- [ ] Add delivery ETA logic and transparent messaging
- [ ] Add loyalty points logic and clear point display blocks

### P2: Documentation and skill sync
- [ ] Keep `.opencode/skills/*` synced with implemented workflows
- [ ] Keep `agent.md` synced with priorities and constraints
- [ ] Keep DEPLOYMENT.md updated with any infrastructure changes

---

## Route Health Checklist (For Every Major Change)

- `/` - Homepage ✅
- `/obuv` - Footwear category ✅
- `/vypredaj` - Sale category ✅
- `/novinky` - New arrivals ✅
- `/kosik` - Shopping cart
- `/checkout` - Checkout flow
- `/zeny` - Women's section
- `/muzi` - Men's section
- `/gdpr` - GDPR info
- `/obchodne-podmienky` - Terms & conditions

---

## Delivery Quality Gate

1. `npm run lint` - Pass ESLint
2. `npm run build` - Pass Next.js build
3. Route-level `200` checks for touched paths
4. Visual pass on mobile + desktop
5. Confirm no dead links introduced
6. **NEW**: Verify public URL accessibility via Cloudflare tunnel
7. **NEW**: Test on remote node, not just localhost
8. **NEW**: Verify header navigation links work correctly

---

## SSH & Remote Access Reference

### Connection Details
```
Host: 10.99.99.158
User: alex
Password: Homosko123
Remote Path: /home/alex/yvettin-sync/frontend/
Cloudflared: /home/alex/bin/cloudflared
```

### Common SSH Commands
```bash
# Check server
ssh alex@10.99.99.158 "ps aux | grep next-server"

# Check tunnel
ssh alex@10.99.99.158 "ps aux | grep cloudflared"

# View logs
ssh alex@10.99.99.158 "tail -50 /home/alex/tunnel.log"

# Get public URL
ssh alex@10.99.99.158 "grep trycloudflare /home/alex/tunnel.log | tail -1"

# Restart everything
ssh alex@10.99.99.158 "pkill -9 -f next && pkill -9 -f cloudflared"
```

### tmux Session Management
```bash
# List sessions
ssh alex@10.99.99.158 "tmux ls"

# Attach to server
ssh alex@10.99.99.158 "tmux attach -t server"

# Attach to tunnel
ssh alex@10.99.99.158 "tmux attach -t tunnel"

# Kill session
ssh alex@10.99.99.158 "tmux kill-session -t server"
```

---

## File Locations Quick Reference

| Purpose | Local Path | Remote Path |
|---------|-----------|-------------|
| Source code | `/ncore-openclaw-backup/workspace-yvettin/yvettin/yvettin.com/frontend/` | `/home/alex/yvettin-sync/frontend/` |
| Category pages | `src/app/obuv/, src/app/vypredaj/, src/app/novinky/` | Same structure on remote |
| Category components | `src/components/category/` | Same structure on remote |
| Deploy scripts | `/ncore-openclaw-backup/workspace-yvettin/yvettin/scripts/` | `/home/alex/yvettin-sync/` |
| Server log | N/A | `/home/alex/yvettin.log` |
| Tunnel log | N/A | `/home/alex/tunnel.log` |
| Documentation | `/ncore-openclaw-backup/workspace-yvettin/yvettin/DEPLOYMENT.md` | N/A |
| Memory | `/ncore-openclaw-backup/workspace-yvettin/yvettin/docs/AGENT_MEMORY.md` | N/A |

---

## Component Patterns Learned

### CategoryBannerSlider Pattern
```tsx
// Key features:
- autoPlayInterval={15000} // 15 seconds
- Progress bars with animation
- Pause on hover
- Keyboard navigation (ArrowLeft/ArrowRight)
- Responsive aspect ratios (21/9, 21/7, 21/6)
```

### CategoryPage Template Pattern
```tsx
// Structure:
1. Banner slider
2. Category header (title + description)
3. Filter tabs (All/Bestsellers/Sale)
4. Featured section ("To najlepšie")
5. Main products grid
6. Last chance section (low stock)
7. Brands carousel
8. Features section (dark background)
```

### Special Category Pattern
```tsx
// For VÝPREDAJ and NOVINKY:
- isSpecialPage={true}
- specialPageType="sale" | "new"
- Custom badges in header
- Different color schemes
```

---

## Session Notes

**2026-03-07**: Remote deployment system fully operational. Category pages implemented and deployed.

**Key Learnings**:
1. Always use tmux for long-running processes on remote
2. Cloudflare Tunnel URL changes on restart - must capture and share
3. Next.js build cache can cause 404s - clear .next when deploying changes
4. sshpass enables automated deployments but requires password in script
5. Category pages need both static routes (for SEO) and dynamic data

**Current Status**:
- ✅ Server running on remote node (port 4009)
- ✅ Cloudflare Tunnel active
- ✅ Public URL accessible
- ✅ Category pages functional
- ✅ Header navigation working

---

**End of Memory Entry**
