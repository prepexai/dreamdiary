#!/bin/bash

# Deployment script for Dream Diary
# Usage: ./deploy.sh

set -e

echo "🚀 Starting deployment to dreamdiary.co..."

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Push to GitHub
echo -e "${BLUE}📦 Pushing to GitHub...${NC}"
git add .
git commit -m "Update: $(date '+%Y-%m-%d %H:%M:%S')" || echo "No changes to commit"
git push origin main

# Deploy to Hetzner
echo -e "${BLUE}🌐 Deploying to Hetzner server...${NC}"
ssh -i hetzner_key root@178.156.161.136 'bash -s' << 'EOF'
cd /var/www/dreamdiary

# Pull latest changes
echo "Pulling latest changes from GitHub..."
git pull origin main

# Install dependencies (if package.json changed)
echo "Installing dependencies..."
npm install

# Build the application
echo "Building application..."
npm run build

# Restart PM2
echo "Restarting application..."
pm2 restart dream-diary

echo "✅ Deployment complete!"
EOF

echo -e "${GREEN}✅ Deployment successful!${NC}"
echo -e "${GREEN}🌍 Your site is live at: https://dreamdiary.co${NC}"

