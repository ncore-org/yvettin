# YVETTIN - MONITORING DASHBOARD

**Posledná aktualizácia**: 2026-03-07  
**Status**: ✅ VŠETKY CHECKY PRECHÁDZAJÚ

---

## 1. SYSTÉMOVÉ KOMPONENTY

### 1.1 Monitoring Files

| File | Path | Purpose |
|------|------|---------|
| **Monitoring Script** | `continuous-monitor.sh` | Hlavný monitoring script (bash) |
| **Node Monitor** | `monitoring-system.js` | Pokročilý monitoring (Node.js) |
| **Log File** | `logs/monitoring.log` | Všetky monitoring logs |
| **Status File** | `logs/monitoring-status.json` | Aktuálny status v JSON |
| **Project Plan** | `PROJECT-PLAN.md` | Kompletný plán projektu |

### 1.2 Check Intervals

| Check Type | Interval | Description |
|------------|----------|-------------|
| **Quick** | 30s | Remote server + Tunnel + Homepage + Critical categories + CSS |
| **Deep** | 5min | Full structure validation + All categories + Assets |

---

## 2. MONITORING CHECKS

### 2.1 Remote Server Check

```bash
# Command
curl -s -o /dev/null -w '%{http_code}' http://localhost:4009/

# Expected: 200
# Critical: YES
```

### 2.2 Tunnel Check

```bash
# Command
grep trycloudflare /home/alex/tunnel.log | tail -1

# Expected: https://*.trycloudflare.com
# Critical: YES
```

### 2.3 Homepage Structure Check

```bash
# Checks:
- <!DOCTYPE html>
- <html lang="sk">
- <header>
- <main>
- <footer>
- ExitIntentPopup component
- CookieBanner component
- Navigation (Dropy, VÝPREDAJ, etc.)

# Critical: YES
```

### 2.4 Category Pages Check

```bash
# Categories monitored:
- /obuv
- /vypredaj
- /novinky
- /dropy
- /oblecenie
- /sport
- /doplnky
- /streetwear
- /premium

# Checks per category:
- <!DOCTYPE html>
- CategoryBannerSlider
- ProductCard
- BrandsCarousel

# Critical: YES (first 3), NO (others)
```

### 2.5 CSS Structure Check

```bash
# URL: /_next/static/css/7cb3544bf353f918.css
# Checks:
- @font-face declarations
- font-family definitions
- Tailwind utilities

# Critical: YES
```

---

## 3. STATUS LEVELS

| Level | Condition | Action |
|-------|-----------|--------|
| **OK** | All checks passed | Continue monitoring |
| **DEGRADED** | 1-2 failures | Log warning, continue monitoring |
| **CRITICAL** | 3+ consecutive failures | Alert, consider restart |

---

## 4. LOGS

### 4.1 Log Format

```
[TIMESTAMP] [LEVEL] Message | Additional Data
```

### 4.2 Log Levels

| Level | Color | Description |
|-------|-------|-------------|
| INFO | Green | Normal operation |
| WARN | Yellow | Degraded state |
| ERROR | Red | Check failed |
| CRITICAL | Magenta | Multiple failures |

### 4.3 View Logs

```bash
# Real-time
tail -f /ncore-openclaw-backup/workspace-yvettin/yvettin/logs/monitoring.log

# Last 50 lines
tail -50 /ncore-openclaw-backup/workspace-yvettin/yvettin/logs/monitoring.log

# Search for errors
grep ERROR /ncore-openclaw-backup/workspace-yvettin/yvettin/logs/monitoring.log
```

---

## 5. MANUAL CHECKS

### 5.1 Quick Status

```bash
cat /ncore-openclaw-backup/workspace-yvettin/yvettin/logs/monitoring-status.json
```

### 5.2 Test Public URL

```bash
# Get current URL
curl -s https://*.trycloudflare.com/ | grep -c '<!DOCTYPE html>'

# Test category
curl -s https://*.trycloudflare.com/obuv | grep -c '<!DOCTYPE html>'

# Test CSS
curl -s https://*.trycloudflare.com/_next/static/css/7cb3544bf353f918.css | head -c 100
```

### 5.3 Test Remote Server

```bash
sshpass -p 'Homosko123' ssh alex@10.99.99.158 \
  "curl -s -o /dev/null -w '%{http_code}' http://localhost:4009/"
```

---

## 6. ALERTING

### 6.1 Automatic Alerts

Monitoring system automatically logs:
- Consecutive failures (3+)
- Critical component failures
- Tunnel disconnections

### 6.2 Manual Intervention

Intervene when:
- 3+ consecutive failures
- Tunnel URL changes (update bookmarks)
- CSS/JS returns 404 (redeploy needed)
- Remote server unresponsive (restart needed)

---

## 7. TROUBLESHOOTING

### 7.1 Common Issues

| Issue | Symptom | Solution |
|-------|---------|----------|
| **CSS 404** | CSS check fails | Redeploy with static files |
| **Tunnel 1003** | Tunnel check fails | Restart cloudflared |
| **Server EADDRINUSE** | Server check fails | Kill node processes, restart |
| **Homepage ERROR** | Structure check fails | Check build, redeploy |

### 7.2 Emergency Restart

```bash
# Kill everything on remote
sshpass -p 'Homosko123' ssh alex@10.99.99.158 \
  "pkill -9 node; pkill -9 cloudflared; tmux kill-server"

# Redeploy
cd /ncore-openclaw-backup/workspace-yvettin/yvettin/yvettin.com
tar -czf /tmp/yvettin-complete.tar.gz frontend/
sshpass -p 'Homosko123' scp /tmp/yvettin-complete.tar.gz alex@10.99.99.158:/home/alex/yvettin-sync/

# Extract and restart (follow deployment workflow)
```

---

## 8. CURRENT STATUS

### 8.1 Last Check

```json
{
  "lastCheck": "2026-03-07T16:27:44+01:00",
  "checkCount": 2,
  "consecutiveFailures": 0,
  "serverStatus": "OK",
  "tunnelUrl": "https://preparation-crm-set-sealed.trycloudflare.com",
  "status": "OK"
}
```

### 8.2 Component Status

| Component | Status | Last Check |
|-----------|--------|------------|
| Remote Server | ✅ OK | 16:27:43 |
| Tunnel | ✅ OK | 16:27:43 |
| Homepage | ✅ OK | 16:27:43 |
| Category /obuv | ✅ OK | 16:27:43 |
| Category /vypredaj | ✅ OK | 16:27:44 |
| Category /novinky | ✅ OK | 16:27:44 |
| CSS | ✅ OK | 16:27:44 |

---

## 9. MONITORING COMMANDS

### 9.1 Start Monitoring

```bash
# Background
/ncore-openclaw-backup/workspace-yvettin/yvettin/continuous-monitor.sh &

# Foreground (for debugging)
/ncore-openclaw-backup/workspace-yvettin/yvettin/continuous-monitor.sh
```

### 9.2 Stop Monitoring

```bash
# Find PID
ps aux | grep continuous-monitor

# Kill
kill <PID>
```

### 9.3 View Status

```bash
# JSON status
cat /ncore-openclaw-backup/workspace-yvettin/yvettin/logs/monitoring-status.json

# Live logs
tail -f /ncore-openclaw-backup/workspace-yvettin/yvettin/logs/monitoring.log
```

---

**Monitoring System Version**: 1.0  
**Created**: 2026-03-07  
**Maintained By**: AI Agent
