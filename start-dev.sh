#!/bin/bash

echo "🚀 Starting BTCL SMS Development Server"
echo "🔧 Using Next.js 13.5.6 with optimized settings"

# Kill any existing processes
pkill -f "next dev" 2>/dev/null || true

# Set memory limits
export NODE_OPTIONS="--max-old-space-size=1024 --max-semi-space-size=64"
export NEXT_TELEMETRY_DISABLED=1

# Start the server
echo "🌟 Server starting..."
npm run dev

echo "✅ Development server ready at http://localhost:3000"