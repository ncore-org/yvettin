# Yvettin Internal System Documentation

**Purpose**: Advanced internal documentation for AI agent operations  
**Last Updated**: 2026-03-07  
**Status**: Fully Operational

---

## 🧠 System Architecture Overview

### Dual-Workspace Model

```
┌──────────────────────────────────────────────────────────────────┐
│ DEVELOPMENT WORKSPACE (Local)                                    │
│ Path: /ncore-openclaw-backup/workspace-yvettin/yvettin/          │
│                                                                  │
│ ├── yvettin.com/frontend/     # Source code                     │
│ ├── scripts/                    # Deploy scripts                 │
│ ├── docs/                       # Documentation                  │
│ │   └── AGENT_MEMORY.md         # Session memory                │
│ ├── agent.md                    # Agent profile & directives     │
│ └── DEPLOYMENT.md               # Deployment guide               │
│                                                                  │
│ Operations:                                                       │
│ - Code editing                                                     │
│ - Local testing                                                    │
│ - Git version control                                              │
│ - Deploy preparation                                               │
└──────────────────────────────────────────────────────────────────┘
                              │
                              │ rsync via sshpass
                              │ (exclude: node_modules, .next, .git)
                              ↓
┌──────────────────────────────────────────────────────────────────┐
│ PRODUCTION WORKSPACE (Remote Node)                               │
│ IP: 10.99.99.158 (Local Network)                                 │
│ Path: /home/alex/yvettin-sync/frontend/                          │
│                                                                  │
│ ├── src/                      # Application source              │
│ ├── .next/                    # Built application               │
│ ├── node_modules/             # Dependencies                    │
│ ├── public/                   # Static assets                   │
│ └── [standard Next.js files]                                     │
│                                                                  │
│ Supporting Infrastructure:                                        │
│ /home/alex/bin/cloudflared    # Tunnel binary                   │
│ /home/alex/yvettin.log        # Server logs                     │
│ /home/alex/cf.log             # Tunnel logs                     │
│                                                                  │
│ Operations:                                                       │
│ - Next.js server (port 4009)                                     │
│ - Cloudflare Tunnel                                                │
│ - Public internet access                                         │
└──────────────────────────────────────────────────────────────────┘
                              │
                              │ Cloudflare Quick Tunnel
                              ↓
┌──────────────────────────────────────────────────────────────────┐
│ PUBLIC INTERNET ACCESS                                           │
│ URL: https://*.trycloudflare.com                                 │
│                                                                  │
│ Characteristics:                                                  │
│ - Dynamic URL (changes on restart)                               │
│ - HTTPS enabled                                                  │
│ - No user installation required                                  │
│ - Accessible from any device                                     │
│ - No authentication (public access)                              │
└──────────────────────────────────────────────────────────────────┘
```

---

## 🔐 Authentication & Access

### Remote Node Credentials
```
Host: 10.99.99.158
Username: alex
Password: Homosko123
SSH Port: 22 (default)
```

### SSH Connection Methods

**Interactive**:
```bash
ssh alex@10.99.99.158
# Enter password: Homosko123
```

**Non-interactive (for scripts)**:
```bash
sshpass -p 'Homosko123' ssh -o StrictHostKeyChecking=no alex@10.99.99.158 "command"
```

**SCP file transfer**:
```bash
sshpass -p 'Homosko123' scp -o StrictHostKeyChecking=no file.txt alex@10.99.99.158:/path/
```

---

## 📦 Deployment System

### Deploy Script Architecture

**File**: `scripts/deploy-to-remote.sh`

**Process Flow**:
1. Create timestamped tarball of frontend
2. Exclude: `node_modules`, `.next`, `.git`
3. SCP tarball to remote node
4. SSH to remote and extract
5. Cleanup local tarball

**Key Commands**:
```bash
# Create tarball
tar --exclude 'node_modules' --exclude '.next' --exclude '.git' \
    -czf /tmp/yvettin-frontend-YYYYMMDD_HHMMSS.tar.gz frontend/

# Copy to remote
sshpass -p 'Homosko123' scp -o StrictHostKeyChecking=no \
    /tmp/yvettin-frontend-*.tar.gz alex@10.99.99.158:/home/alex/yvettin-sync/

# Extract on remote
sshpass -p 'Homosko123' ssh -o StrictHostKeyChecking=no alex@10.99.99.158 << 'ENDSSH'
cd /home/alex/yvettin-sync
rm -rf frontend
tar -xzf yvettin-frontend-*.tar.gz
ENDSSH
```

### Server Startup Sequence

**On Remote Node**:
```bash
cd /home/alex/yvettin-sync/frontend

# 1. Install dependencies (if missing)
if [ ! -d "node_modules" ]; then
    npm install
fi

# 2. Build (if .next missing)
if [ ! -d ".next" ]; then
    npm run build
fi

# 3. Kill existing processes
pkill -f 'next.*4009' || true
pkill -f cloudflared || true
sleep 2

# 4. Start Next.js server
nohup npm run start > /home/alex/yvettin.log 2>&1 &
sleep 5

# 5. Verify server
curl -s -o /dev/null -w '%{http_code}' http://localhost:4009/
# Expected: 200

# 6. Start Cloudflare Tunnel
nohup /home/alex/bin/cloudflared tunnel --url http://localhost:4009 \
    > /home/alex/cf.log 2>&1 &
sleep 8

# 7. Extract public URL
grep trycloudflare /home/alex/cf.log
```

---

## 🔍 Monitoring & Diagnostics

### Health Check Commands

**Server Status**:
```bash
# Check if server process is running
ssh alex@10.99.99.158 "ps aux | grep next-server | grep -v grep"

# Check HTTP response
ssh alex@10.99.99.158 "curl -s -o /dev/null -w '%{http_code}' http://localhost:4009/"

# Check port binding
ssh alex@10.99.99.158 "lsof -i :4009"
# or
ssh alex@10.99.99.158 "ss -tlnp | grep 4009"
```

**Tunnel Status**:
```bash
# Check tunnel process
ssh alex@10.99.99.158 "ps aux | grep cloudflared | grep -v grep"

# Get current URL
ssh alex@10.99.99.158 "grep 'trycloudflare.com' /home/alex/cf.log"

# View tunnel logs
ssh alex@10.99.99.158 "tail -50 /home/alex/cf.log"
```

**Log Inspection**:
```bash
# Server logs
ssh alex@10.99.99.158 "tail -100 /home/alex/yvettin.log"

# Tunnel logs
ssh alex@10.99.99.158 "tail -100 /home/alex/cf.log"

# Real-time monitoring
ssh alex@10.99.99.158 "tail -f /home/alex/cf.log"
```

### Common Issues & Solutions

#### Issue: Port 4009 in use
```bash
# Find process
ssh alex@10.99.99.158 "lsof -i :4009"

# Kill process
ssh alex@10.99.99.158 "pkill -f 'next.*4009'"

# Verify port free
ssh alex@10.99.99.158 "ss -tlnp | grep 4009 || echo 'Port free'"
```

#### Issue: Tunnel not running
```bash
# Restart tunnel
ssh alex@10.99.99.158 "
  pkill -f cloudflared
  nohup /home/alex/bin/cloudflared tunnel --url http://localhost:4009 \
      > /home/alex/cf.log 2>&1 &
  sleep 8
  grep trycloudflare /home/alex/cf.log
"
```

#### Issue: Server returns 500
```bash
# Check logs
ssh alex@10.99.99.158 "tail -100 /home/alex/yvettin.log"

# Rebuild
ssh alex@10.99.99.158 "
  cd /home/alex/yvettin-sync/frontend
  pkill -f 'next.*4009'
  npm run build
  npm run start &
"
```

#### Issue: URL changed
```bash
# Get new URL
ssh alex@10.99.99.158 "grep 'trycloudflare.com' /home/alex/cf.log | tail -1"

# URL changes when:
# - Tunnel restarts
# - Server restarts
# - Network issues
# - Cloudflare reassignment
```

---

## 🛠️ Maintenance Procedures

### Daily Operations

**Morning Check**:
```bash
# 1. Verify server
SERVER_STATUS=$(ssh alex@10.99.99.158 "curl -s -o /dev/null -w '%{http_code}' http://localhost:4009/")
if [ "$SERVER_STATUS" != "200" ]; then
    echo "⚠️ Server issue detected"
fi

# 2. Verify tunnel
TUNNEL_URL=$(ssh alex@10.99.99.158 "grep trycloudflare /home/alex/cf.log | tail -1")
if [ -z "$TUNNEL_URL" ]; then
    echo "⚠️ Tunnel not running"
fi

# 3. Report status
echo "✅ Server: $SERVER_STATUS"
echo "🌐 URL: $TUNNEL_URL"
```

### Weekly Maintenance

**Cleanup Old Processes**:
```bash
ssh alex@10.99.99.158 "
  # Kill zombie processes
  pkill -f 'defunct'
  
  # Clear old logs (optional)
  truncate -s 0 /home/alex/yvettin.log
  truncate -s 0 /home/alex/cf.log
  
  # Check disk space
  df -h
"
```

**Update Dependencies** (if needed):
```bash
ssh alex@10.99.99.158 "
  cd /home/alex/yvettin-sync/frontend
  npm update
  npm run build
"
```

### Emergency Procedures

**Full Restart**:
```bash
ssh alex@10.99.99.158 "
  # Stop everything
  pkill -f 'next.*4009'
  pkill -f cloudflared
  sleep 2
  
  # Start server
  cd /home/alex/yvettin-sync/frontend
  npm run start &
  sleep 10
  
  # Start tunnel
  /home/alex/bin/cloudflared tunnel --url http://localhost:4009 &
  sleep 8
  
  # Verify
  curl -s -o /dev/null -w '%{http_code}' http://localhost:4009/
  grep trycloudflare /home/alex/cf.log
"
```

---

## 📊 Performance Optimization

### Build Optimization
- Always build on remote node (matching environment)
- Use `.next` cache between deployments
- Exclude `node_modules` from sync (install on remote)

### Tunnel Optimization
- Keep tunnel running continuously
- Monitor connection quality in logs
- Restart if latency increases

### Server Optimization
- Use `npm run start` (production mode)
- Monitor memory usage
- Restart periodically to clear memory leaks

---

## 🔒 Security Considerations

### Current Security Posture
- ✅ SSH password authentication
- ✅ Local network isolation (10.99.99.x)
- ✅ No direct internet exposure of server
- ⚠️ Cloudflare Tunnel is public (no auth)
- ⚠️ Password stored in scripts

### Recommended Improvements
- [ ] Add SSH key authentication
- [ ] Implement Cloudflare Access for tunnel
- [ ] Add basic auth to Next.js app
- [ ] Use environment variables for credentials
- [ ] Set up automatic security updates

---

## 📝 File Reference

### Local Files
| File | Purpose | Path |
|------|---------|------|
| `AGENT_MEMORY.md` | Session memory | `docs/AGENT_MEMORY.md` |
| `agent.md` | Agent profile | `/agent.md` |
| `DEPLOYMENT.md` | Deployment guide | `/DEPLOYMENT.md` |
| `deploy-to-remote.sh` | Deploy script | `scripts/deploy-to-remote.sh` |
| `start-server.sh` | Server start | `scripts/start-server.sh` |

### Remote Files
| File | Purpose | Path |
|------|---------|------|
| Frontend app | Next.js source | `/home/alex/yvettin-sync/frontend/` |
| Cloudflared | Tunnel binary | `/home/alex/bin/cloudflared` |
| Server log | Next.js logs | `/home/alex/yvettin.log` |
| Tunnel log | CF logs | `/home/alex/cf.log` |
| Run script | Combined start | `/home/alex/yvettin-sync/run-yvettin.sh` |

---

## 🎯 Quick Command Reference

```bash
# === DEPLOYMENT ===
cd /ncore-openclaw-backup/workspace-yvettin/yvettin
bash scripts/deploy-to-remote.sh

# === STATUS CHECKS ===
# Server
ssh alex@10.99.99.158 "ps aux | grep next-server"
ssh alex@10.99.99.158 "curl -s -o /dev/null -w '%{http_code}' http://localhost:4009/"

# Tunnel
ssh alex@10.99.99.158 "ps aux | grep cloudflared"
ssh alex@10.99.99.158 "grep trycloudflare /home/alex/cf.log"

# === RESTART ===
# Server only
ssh alex@10.99.99.158 "pkill -f 'next.*4009' && cd /home/alex/yvettin-sync/frontend && npm run start &"

# Tunnel only
ssh alex@10.99.99.158 "pkill -f cloudflared && nohup /home/alex/bin/cloudflared tunnel --url http://localhost:4009 > /home/alex/cf.log 2>&1 &"

# Both
ssh alex@10.99.99.158 "pkill -f 'next.*4009' && pkill -f cloudflared && cd /home/alex/yvettin-sync/frontend && npm run start & sleep 5 && nohup /home/alex/bin/cloudflared tunnel --url http://localhost:4009 > /home/alex/cf.log 2>&1 &"

# === LOGS ===
ssh alex@10.99.99.158 "tail -50 /home/alex/yvettin.log"
ssh alex@10.99.99.158 "tail -50 /home/alex/cf.log"
```

---

**End of Internal Documentation**  
For external deployment guide, see `DEPLOYMENT.md`
