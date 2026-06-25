# Yvettin Frontend Agent Profile

**Updated**: 2026-03-07  
**Session**: Category Pages + Remote Deployment Operational

## Mission

Autonomous enterprise frontend delivery for Yvettin fashion e-commerce, with strict focus on quality, responsiveness, and maintainability. Operating in dual-workspace mode: local development + remote production server with public internet access via Cloudflare Tunnel.

## Active Capabilities

### Development Stack
- OpenCode SDK runtime and plugin stack from `.opencode/package.json`
- LSP suite for TS/React/Tailwind/HTML/CSS/JSON/YAML/Bash
- Enterprise React stack in `yvettin.com/frontend/package.json`
- Central monitoring bootstrap in `yvettin.com/frontend/src/lib/monitoring.ts`
- Development query diagnostics in `yvettin.com/frontend/src/app/providers.tsx`

### Category Pages System (NEW)
- CategoryBannerSlider component with 15s auto-rotate + progress indicators
- CategoryPage template with featured products, filters, brands carousel
- Special category styling for VÝPREDAJ and NOVINKY
- Dynamic product filtering (all/bestsellers/sale)

### DevOps Stack (NEW)
- Cloudflare Tunnel (cloudflared 2026.2.0) at `/home/alex/bin/cloudflared`
- Remote node: `10.99.99.158` (alex/Homosko123)
- Deploy scripts: `scripts/deploy-to-remote.sh`, `scripts/start-server.sh`
- tmux session management for persistent processes
- Public URL generation via `cloudflared tunnel --url`

## Frontend Operating Mode

- Keep minimalist style direction already present in Yvettin UI
- Default to reusable primitives and typed component contracts
- Use TanStack Query for server-state and Zustand/local state for UI/client concerns
- Keep mobile and desktop parity for every new interactive feature
- **NEW**: All development in local workspace `/ncore-openclaw-backup/workspace-yvettin/yvettin/`
- **NEW**: Deploy to remote node for testing and public access
- **NEW**: Verify changes work via public URL, not just localhost
- **NEW**: Category pages accessible from header navigation

## Stored Conversation Directives

- Work only on frontend unless explicitly asked otherwise
- Keep current structure and palette; do not break minimalist identity
- Keep product card box layout style and improve UX quality around it
- Remove/avoid dead links and route 404
- Keep runtime port at `4009` and align docs/runtime behavior
- Validate changes carefully (pixel-to-pixel quality standard requested)
- **NEW**: Maintain remote deployment system
- **NEW**: Ensure public URL accessibility for external users
- **NEW**: Category pages must match header navigation structure

## Active Priority Backlog (Stored)

1. Stabilize search behavior and placeholder/submit flow
2. Add right-side cart slide panel on add-to-cart actions
3. Implement full checkout flow and connect cart CTA to checkout
4. Restrict payment options to card and PayPal
5. Add two new minimalist homepage sections plus one tasteful bridge block
6. Upgrade PDP with stronger variant logic, delivery ETA messaging, and loyalty points
7. Keep docs/skills in sync with every major architecture change
8. **NEW**: Maintain deployment documentation and remote node health
9. **NEW**: Ensure category pages have proper SEO and social sharing

## Internal References

### Documentation
- SDK and LSP setup: `.opencode/docs/lsp-and-sdk-setup.md`
- Tooling manifest: `.opencode/plugins/tooling.manifest.json`
- Delivery rules: `.opencode/rules/frontend-enterprise-rules.md`
- Workflow: `.opencode/workflows/frontend-delivery-workflow.md`
- Skills: `.opencode/skills/react-enterprise-implementation.md`
- Skills: `.opencode/skills/lsp-runtime-operations.md`
- Skills: `.opencode/skills/frontend-conversion-upgrade-roadmap.md`
- Frontend library catalog: `yvettin.com/frontend/docs/ENTERPRISE-FRONTEND-LIBRARIES.md`
- Memory log: `docs/AGENT_MEMORY.md`
- **NEW**: Deployment guide: `DEPLOYMENT.md`
- **NEW**: Internal system docs: `docs/INTERNAL-SYSTEM-DOCS.md`

### Remote Node Paths
- Frontend: `/home/alex/yvettin-sync/frontend/`
- Cloudflared: `/home/alex/bin/cloudflared`
- Server log: `/home/alex/yvettin.log`
- Tunnel log: `/home/alex/tunnel.log`
- tmux sessions: `server`, `tunnel`

### Local Paths
- Workspace: `/ncore-openclaw-backup/workspace-yvettin/yvettin/`
- Scripts: `/ncore-openclaw-backup/workspace-yvettin/yvettin/scripts/`
- Frontend source: `/ncore-openclaw-backup/workspace-yvettin/yvettin/yvettin.com/frontend/`
- Category components: `src/components/category/`
- Category routes: `src/app/obuv/, src/app/vypredaj/, src/app/novinky/`

## Quality Gate

- Must pass `npm run lint` in frontend
- Must pass `npm run build` in frontend for high-impact or dependency changes
- Record unresolved blockers explicitly with file path and reason
- Verify key touched routes return `200`
- **NEW**: Sync to remote node and verify deployment works
- **NEW**: Check public URL accessibility via Cloudflare tunnel
- **NEW**: Confirm tunnel is running after deployments
- **NEW**: Test category page navigation from header

## Deployment Workflow (NEW)

```bash
# 1. Develop locally
cd /ncore-openclaw-backup/workspace-yvettin/yvettin/yvettin.com/frontend
# ... make changes ...

# 2. Deploy to remote
cd /ncore-openclaw-backup/workspace-yvettin/yvettin/yvettin.com
tar --exclude 'node_modules' --exclude '.next' --exclude '.git' -czf /tmp/yvettin-deploy.tar.gz frontend/
sshpass -p 'Homosko123' scp /tmp/yvettin-deploy.tar.gz alex@10.99.99.158:/home/alex/yvettin-sync/

# 3. Rebuild on remote
ssh alex@10.99.99.158 "cd /home/alex/yvettin-sync/frontend && rm -rf .next && npm run build"

# 4. Restart server
ssh alex@10.99.99.158 "pkill -9 -f next && cd /home/alex/yvettin-sync/frontend && npm run start &"

# 5. Restart tunnel (if needed)
ssh alex@10.99.99.158 "tmux new -d -s tunnel '/home/alex/bin/cloudflared tunnel --url http://localhost:4009'"

# 6. Verify
ssh alex@10.99.99.158 "curl -s -o /dev/null -w '%{http_code}' http://localhost:4009/obuv"
ssh alex@10.99.99.158 "grep trycloudflare /home/alex/tunnel.log | tail -1"

# 7. Test public URL
curl -I https://[current-url].trycloudflare.com/obuv
```

## SSH Quick Reference (NEW)

```bash
# Connect to remote node
ssh alex@10.99.99.158
# Password: Homosko123

# Check server health
ssh alex@10.99.99.158 "ps aux | grep next-server"

# Check tunnel health
ssh alex@10.99.99.158 "ps aux | grep cloudflared"

# Get current public URL
ssh alex@10.99.99.158 "grep trycloudflare /home/alex/tunnel.log | tail -1"

# View tmux sessions
ssh alex@10.99.99.158 "tmux ls"

# Attach to server session
ssh alex@10.99.99.158 "tmux attach -t server"

# Attach to tunnel session
ssh alex@10.99.99.158 "tmux attach -t tunnel"

# Kill all processes (emergency reset)
ssh alex@10.99.99.158 "pkill -9 -f next && pkill -9 -f cloudflared && tmux kill-server"
```

## Current Status (2026-03-07)

### Infrastructure
- ✅ Remote node operational at `10.99.99.158`
- ✅ Next.js server running on port `4009`
- ✅ Cloudflare Tunnel active
- ✅ Public URL accessible (changes on restart)
- ✅ Deploy scripts functional
- ✅ tmux session management configured

### Category Pages
- ✅ `/obuv` - Footwear category with banner slider, products, brands
- ✅ `/vypredaj` - Sale category with special badges and styling
- ✅ `/novinky` - New arrivals with special badges and styling
- ✅ Header navigation links working
- ✅ All pages responsive (mobile + desktop)

### Components Created
- ✅ CategoryBannerSlider.tsx (15s auto-rotate, progress bars)
- ✅ CategoryPage.tsx (main template)
- ✅ BrandsCarousel.tsx (brand logos carousel)
- ✅ CookieBanner.tsx (simplified, mobile-friendly)

### Documentation
- ✅ AGENT_MEMORY.md updated with deployment info
- ✅ agent.md updated with remote ops
- ✅ DEPLOYMENT.md created (user-facing guide)
- ✅ INTERNAL-SYSTEM-DOCS.md created (internal reference)

---

**Author**: Nix ⚡  
**Last Update**: 2026-03-07  
**Status**: Active Development + Remote Deployment Operational + Category Pages Complete
