#!/bin/bash
# Start server and cloudflare tunnel on remote node

set -e

FRONTEND_DIR="/home/alex/yvettin-sync/frontend"
CLOUDFLARED="/home/alex/bin/cloudflared"
PORT=4009

echo "🚀 Starting Yvettin Frontend + Cloudflare Tunnel"
echo "================================================"
echo "📁 Directory: $FRONTEND_DIR"
echo "🔌 Port: $PORT"
echo ""

cd "$FRONTEND_DIR"

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Build if .next doesn't exist
if [ ! -d ".next" ]; then
    echo "🔨 Building..."
    npm run build
fi

# Kill any existing processes on port 4009
echo "🧹 Cleaning up existing processes..."
pkill -f "next.*$PORT" 2>/dev/null || true
pkill -f "cloudflared" 2>/dev/null || true
sleep 2

# Start Next.js server in background
echo "🌐 Starting Next.js server on port $PORT..."
npm run start &
SERVER_PID=$!
sleep 5

# Check if server is running
if curl -s http://localhost:$PORT > /dev/null; then
    echo "✅ Server is running on http://localhost:$PORT"
else
    echo "❌ Server failed to start"
    exit 1
fi

# Start Cloudflare tunnel
echo ""
echo "🌍 Starting Cloudflare tunnel..."
echo "⏳ Generating public URL..."
echo ""

# Start tunnel and capture output
$CLOUDFLARED tunnel --url http://localhost:$PORT 2>&1 | while read line; do
    echo "$line"
    # Extract and display the public URL
    if echo "$line" | grep -q "trycloudflare.com"; then
        URL=$(echo "$line" | grep -oE 'https://[^ ]+trycloudflare\.com')
        echo ""
        echo "========================================="
        echo "🎉 PUBLIC URL: $URL"
        echo "========================================="
        echo ""
        echo "Share this URL with anyone - it works from outside localhost!"
        echo ""
        echo "Press Ctrl+C to stop server and tunnel"
    fi
done &
TUNNEL_PID=$!

# Wait for both processes
wait
