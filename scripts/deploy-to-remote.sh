#!/bin/bash
# Deploy script - synchronizes workspace to remote node and starts server with tunnel

set -e

REMOTE_USER="alex"
REMOTE_HOST="10.99.99.158"
REMOTE_PASS="Homosko123"
REMOTE_DIR="/home/alex/yvettin-sync"
LOCAL_WORKSPACE="/ncore-openclaw-backup/workspace-yvettin/yvettin/yvettin.com/frontend"
TEMP_TAR="/tmp/yvettin-frontend-$(date +%Y%m%d_%H%M%S).tar.gz"

echo "🚀 Yvettin Deploy Script"
echo "========================"
echo "📁 Local:  $LOCAL_WORKSPACE"
echo "📡 Remote: $REMOTE_USER@$REMOTE_HOST:$REMOTE_DIR"
echo ""

# Create tarball
echo "📦 Creating tarball..."
cd "$(dirname "$LOCAL_WORKSPACE")"
tar --exclude 'node_modules' --exclude '.next' --exclude '.git' -czf "$TEMP_TAR" "$(basename "$LOCAL_WORKSPACE")"

# Copy to remote
echo "📤 Copying to remote node..."
sshpass -p "$REMOTE_PASS" scp -o StrictHostKeyChecking=no "$TEMP_TAR" "$REMOTE_USER@$REMOTE_HOST:$REMOTE_DIR/"

# Extract on remote
echo "📥 Extracting on remote node..."
sshpass -p "$REMOTE_PASS" ssh -o StrictHostKeyChecking=no "$REMOTE_USER@$REMOTE_HOST" << 'ENDSSH'
cd /home/alex/yvettin-sync
rm -rf frontend
tar -xzf yvettin-frontend-*.tar.gz
echo "✅ Extracted successfully"
ENDSSH

# Cleanup
rm -f "$TEMP_TAR"

echo ""
echo "✅ Deploy complete!"
echo "📝 Next step: Run 'start-server.sh' on remote node"
