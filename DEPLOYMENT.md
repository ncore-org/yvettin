# Yvettin - Deployment & Remote Server Guide

## 🚀 Architektúra

```
┌─────────────────────────────────────────────────────────────────┐
│                    Lokálny Workspace                            │
│  /ncore-openclaw-backup/workspace-yvettin/yvettin/             │
│  - Tu sa robia všetky zmeny a editácie                          │
│  - Tu sa vyvíja a testuje                                       │
└─────────────────────────────────────────────────────────────────┘
                              ↓
                    (synchronizácia)
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    Remote Node (10.99.99.158)                   │
│  /home/alex/yvettin-sync/frontend/                              │
│  - Tu beží Next.js server (port 4009)                           │
│  - Tu beží Cloudflare Tunnel                                    │
└─────────────────────────────────────────────────────────────────┘
                              ↓
                    (Cloudflare Tunnel)
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    Public URL                                   │
│  https://wanna-weighted-these-phil.trycloudflare.com            │
│  - Prístupné odkiaľkoľvek z internetu                           │
│  - Funguje bez inštalácie, priamo v prehliadači                 │
└─────────────────────────────────────────────────────────────────┘
```

## 📡 Aktuálna Public URL

**https://wanna-weighted-these-phil.trycloudflare.com**

Túto URL môžeš poslať komukoľvek - funguje z akéhokoľvek zariadenia s internetom.

> ⚠️ **Poznámka**: URL sa mení pri každom reštarte tunelu. Pre trvalú URL by bolo potrebné zaregistrovať Cloudflare account a vytvoriť persistent tunnel.

## 🔧 Príkazy

### Lokálny deployment (sync na remote node)

```bash
# Spustiť deploy skript z lokálneho workspace
cd /ncore-openclaw-backup/workspace-yvettin/yvettin
bash scripts/deploy-to-remote.sh
```

### Remote node - manuálne príkazy

```bash
# SSH pripojenie
ssh alex@10.99.99.158
# Heslo: Homosko123

# Na remote node:
cd /home/alex/yvettin-sync/frontend

# Install dependencies (ak chýbajú)
npm install

# Build (ak chýba .next)
npm run build

# Spustiť server
npm run start

# Spustiť Cloudflare tunnel (v novom termináli)
/home/alex/bin/cloudflared tunnel --url http://localhost:4009
```

### Zistenie aktuálnej public URL

```bash
ssh alex@10.99.99.158 "cat /home/alex/cf.log | grep trycloudflare"
```

### Kontrola statusu

```bash
# Beží server?
ssh alex@10.99.99.158 "curl -s -o /dev/null -w '%{http_code}' http://localhost:4009/"
# Očakávaná odpoveď: 200

# Beží cloudflared?
ssh alex@10.99.99.158 "ps aux | grep cloudflared | grep -v grep"

# Ktorý proces používa port 4009?
ssh alex@10.99.99.158 "lsof -i :4009"
```

## 📁 Štruktúra na Remote Node

```
/home/alex/
├── bin/
│   └── cloudflared          # Cloudflare tunnel binary
├── yvettin-sync/
│   ├── frontend/            # Next.js aplikácia
│   │   ├── src/
│   │   ├── public/
│   │   ├── .next/           # Build output
│   │   ├── node_modules/    # Dependencies
│   │   ├── package.json
│   │   └── next.config.js
│   ├── deploy-to-remote.sh  # Deploy skript
│   ├── start-server.sh      # Server start skript
│   └── run-yvettin.sh       # Combined start skript
├── cf.log                   # Cloudflare tunnel log
└── yvettin.log              # Next.js server log
```

## 🔄 Workflow

### 1. Vývoj lokálne
```bash
cd /ncore-openclaw-backup/workspace-yvettin/yvettin/yvettin.com/frontend
# Edituj súbory, rob zmeny...
```

### 2. Deploy na remote
```bash
cd /ncore-openclaw-backup/workspace-yvettin/yvettin
bash scripts/deploy-to-remote.sh
```

### 3. Overenie
```bash
# Skontroluj public URL
ssh alex@10.99.99.158 "cat /home/alex/cf.log | grep trycloudflare"

# Otestuj URL
curl -I https://[tvoja-url].trycloudflare.com
```

## 🛠️ Riešenie problémov

### Server nereaguje
```bash
# Restart servera
ssh alex@10.99.99.158 "
  pkill -f 'next.*4009'
  cd /home/alex/yvettin-sync/frontend
  npm run start &
"
```

### Tunnel nereaguje
```bash
# Restart tunelu
ssh alex@10.99.99.158 "
  pkill -f cloudflared
  nohup /home/alex/bin/cloudflared tunnel --url http://localhost:4009 > /home/alex/cf.log 2>&1 &
"
```

### Zistenie novej URL po reštarte
```bash
ssh alex@10.99.99.158 "sleep 5 && cat /home/alex/cf.log | grep trycloudflare"
```

## 📝 Poznámky

- **Port**: Server beží na porte `4009` (fixný)
- **Cloudflare Tunnel**: Vytvára dočasnú public URL
- **URL lifetime**: URL vydrží kým beží cloudflared proces
- **Production**: Pre trvalú URL by bolo potrebné:
  - Cloudflare account
  - Vlastná doména
  - Pre-created named tunnel

## 🔐 Bezpečnosť

- Remote node je v lokálnej sieti (10.99.99.158)
- SSH heslo: `Homosko123`
- Cloudflare tunnel je verejne prístupný (žiadna autentifikácia)
- Pre produkčné nasadenie odporúčané:
  - Pridať basic auth alebo Cloudflare Access
  - Použiť vlastnú doménu
  - Nastaviť SSL/TLS properly

---

**Posledná aktualizácia**: 2026-03-07
**Public URL**: https://wanna-weighted-these-phil.trycloudflare.com
