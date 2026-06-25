#!/bin/bash

# YVETTIN - KONTINUÁLNY MONITORING SYSTÉM
# 
# Spustenie: ./continuous-monitor.sh
# Beží na pozadí a kontroluje každých 30s
#

# ============================================================================
# KONFIGURÁCIA
# ============================================================================

REMOTE_USER="alex"
REMOTE_HOST="10.99.99.158"
REMOTE_PASS="Homosko123"
LOG_DIR="/ncore-openclaw-backup/workspace-yvettin/yvettin/logs"
STATUS_FILE="$LOG_DIR/monitoring-status.json"
LOG_FILE="$LOG_DIR/monitoring.log"
CHECK_INTERVAL=30  # seconds

# Ensure log directory exists
mkdir -p "$LOG_DIR"

# ============================================================================
# FUNKCIE
# ============================================================================

log() {
  local level="$1"
  local message="$2"
  local timestamp=$(date -Iseconds)
  echo "[$timestamp] [$level] $message" | tee -a "$LOG_FILE"
}

check_remote_server() {
  local result=$(sshpass -p "$REMOTE_PASS" ssh -o StrictHostKeyChecking=no "$REMOTE_USER@$REMOTE_HOST" \
    "curl -s -o /dev/null -w '%{http_code}' http://localhost:4009/" 2>/dev/null)
  
  if [ "$result" = "200" ]; then
    echo "OK"
  else
    echo "ERROR:$result"
  fi
}

check_tunnel() {
  local result=$(sshpass -p "$REMOTE_PASS" ssh -o StrictHostKeyChecking=no "$REMOTE_USER@$REMOTE_HOST" \
    "grep trycloudflare /home/alex/tunnel.log | tail -1" 2>/dev/null)
  
  if echo "$result" | grep -q "trycloudflare.com"; then
    echo "$result" | grep -oE 'https://[^ ]+trycloudflare\.com'
  else
    echo "ERROR"
  fi
}

check_public_url() {
  local url="$1"
  local path="$2"
  
  local result=$(curl -s -L --max-time 15 "$url$path" 2>/dev/null)
  
  if echo "$result" | grep -q "<!DOCTYPE html>"; then
    echo "OK"
  else
    echo "ERROR"
  fi
}

check_css_structure() {
  local url="$1"
  local css_hash="7cb3544bf353f918"
  
  local result=$(curl -s -L --max-time 10 "$url/_next/static/css/${css_hash}.css" 2>/dev/null | head -c 100)
  
  if echo "$result" | grep -q "@font-face\|font-family"; then
    echo "OK"
  else
    echo "ERROR"
  fi
}

# ============================================================================
# HLAVNÁ SLUČKA
# ============================================================================

log "INFO" "=========================================="
log "INFO" "Štart monitoringu - $(date)"
log "INFO" "Interval: ${CHECK_INTERVAL}s"
log "INFO" "=========================================="

check_count=0
failures=0

while true; do
  check_count=$((check_count + 1))
  log "INFO" "--- Check #${check_count} ---"
  
  # Check remote server
  server_status=$(check_remote_server)
  if [ "$server_status" = "OK" ]; then
    log "INFO" "✓ Remote server: OK"
  else
    log "ERROR" "✗ Remote server: $server_status"
    failures=$((failures + 1))
  fi
  
  # Check tunnel and get URL
  tunnel_url=$(check_tunnel)
  if [ "$tunnel_url" != "ERROR" ]; then
    log "INFO" "✓ Tunnel: $tunnel_url"
    
    # Check homepage structure
    homepage_status=$(check_public_url "$tunnel_url" "/")
    if [ "$homepage_status" = "OK" ]; then
      log "INFO" "✓ Homepage structure: OK"
    else
      log "ERROR" "✗ Homepage structure: ERROR"
      failures=$((failures + 1))
    fi
    
    # Check critical categories
    for category in "/obuv" "/vypredaj" "/novinky"; do
      cat_status=$(check_public_url "$tunnel_url" "$category")
      if [ "$cat_status" = "OK" ]; then
        log "INFO" "✓ Category $category: OK"
      else
        log "ERROR" "✗ Category $category: ERROR"
        failures=$((failures + 1))
      fi
    done
    
    # Check CSS
    css_status=$(check_css_structure "$tunnel_url")
    if [ "$css_status" = "OK" ]; then
      log "INFO" "✓ CSS structure: OK"
    else
      log "ERROR" "✗ CSS structure: ERROR"
      failures=$((failures + 1))
    fi
    
  else
    log "ERROR" "✗ Tunnel: ERROR"
    failures=$((failures + 1))
  fi
  
  # Status summary
  if [ $failures -eq 0 ]; then
    log "INFO" ">>> STATUS: ALL CHECKS PASSED <<<"
  elif [ $failures -lt 3 ]; then
    log "WARN" ">>> STATUS: DEGRADED ($failures failures) <<<"
  else
    log "CRITICAL" ">>> STATUS: CRITICAL ($failures failures) <<<"
  fi
  
  # Save status to JSON
  cat > "$STATUS_FILE" << EOF
{
  "lastCheck": "$(date -Iseconds)",
  "checkCount": $check_count,
  "consecutiveFailures": $failures,
  "serverStatus": "$server_status",
  "tunnelUrl": "$tunnel_url",
  "status": "$([ $failures -eq 0 ] && echo 'OK' || ([ $failures -lt 3 ] && echo 'DEGRADED' || echo 'CRITICAL'))"
}
EOF
  
  # Reset failures if all passed
  if [ "$server_status" = "OK" ] && [ "$tunnel_url" != "ERROR" ]; then
    failures=0
  fi
  
  # Wait for next check
  sleep $CHECK_INTERVAL
done
