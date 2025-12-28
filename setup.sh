#!/bin/bash

# ============================================
# RentIt Project Setup Script
# ============================================

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${CYAN}"
echo "╔═══════════════════════════════════════════╗"
echo "║         🏠 RentIt Project Setup           ║"
echo "╚═══════════════════════════════════════════╝"
echo -e "${NC}"

# ============================================
# Prerequisites Check
# ============================================
echo -e "${BLUE}Checking prerequisites...${NC}\n"

# Check for Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}✗ Node.js is not installed. Please install Node.js (v18+) first.${NC}"
    exit 1
fi
NODE_VERSION=$(node -v)
echo -e "${GREEN}✓ Node.js found: ${NODE_VERSION}${NC}"

# Check for npm
if ! command -v npm &> /dev/null; then
    echo -e "${RED}✗ npm is not installed. Please install npm first.${NC}"
    exit 1
fi
NPM_VERSION=$(npm -v)
echo -e "${GREEN}✓ npm found: v${NPM_VERSION}${NC}"

# Check if PostgreSQL is running (optional warning)
if command -v pg_isready &> /dev/null; then
    if pg_isready &> /dev/null; then
        echo -e "${GREEN}✓ PostgreSQL is running${NC}"
    else
        echo -e "${YELLOW}⚠ PostgreSQL may not be running. Backend requires a database.${NC}"
    fi
else
    echo -e "${YELLOW}⚠ pg_isready not found. Make sure PostgreSQL is running before starting the backend.${NC}"
fi

# ============================================
# Kill existing processes on ports
# ============================================
echo -e "\n${BLUE}Checking for existing processes on ports 3000 and 3001...${NC}"

if lsof -i:3000 &> /dev/null; then
    echo -e "${YELLOW}Port 3000 is in use. Killing process...${NC}"
    fuser -k 3000/tcp 2>/dev/null || kill $(lsof -t -i:3000) 2>/dev/null
    echo -e "${GREEN}✓ Port 3000 freed${NC}"
else
    echo -e "${GREEN}✓ Port 3000 is available${NC}"
fi

if lsof -i:3001 &> /dev/null; then
    echo -e "${YELLOW}Port 3001 is in use. Killing process...${NC}"
    fuser -k 3001/tcp 2>/dev/null || kill $(lsof -t -i:3001) 2>/dev/null
    echo -e "${GREEN}✓ Port 3001 freed${NC}"
else
    echo -e "${GREEN}✓ Port 3001 is available${NC}"
fi

if lsof -i:4000 &> /dev/null; then
    echo -e "${YELLOW}Port 4000 is in use. Killing process...${NC}"
    fuser -k 4000/tcp 2>/dev/null || kill $(lsof -t -i:4000) 2>/dev/null
    echo -e "${GREEN}✓ Port 4000 freed${NC}"
else
    echo -e "${GREEN}✓ Port 4000 is available${NC}"
fi

# ============================================
# Backend Setup
# ============================================
echo -e "\n${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}Setting up Backend (NestJS)...${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
cd backend

# Create .env file
if [ ! -f .env ]; then
    if [ -f .env.example ]; then
        cp .env.example .env
        echo -e "${GREEN}✓ Created backend/.env from .env.example${NC}"
        echo -e "${YELLOW}  ⚠ Please update the .env file with your database credentials${NC}"
    else
        echo -e "${YELLOW}⚠ backend/.env.example not found, creating default .env...${NC}"
        cat > .env << 'EOF'
# Application
PORT=3000
NODE_ENV=development

# Database (PostgreSQL)
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=renit

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Frontend URL (for CORS)
CORS_ORIGIN=http://localhost:3001
EOF
        echo -e "${GREEN}✓ Created default backend/.env${NC}"
    fi
else
    echo -e "${GREEN}✓ Backend .env already exists${NC}"
fi

# Install backend dependencies
echo -e "${BLUE}Installing Backend Dependencies...${NC}"
npm install
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Backend dependencies installed${NC}"
else
    echo -e "${RED}✗ Failed to install backend dependencies${NC}"
    exit 1
fi
cd ..

# ============================================
# Frontend Setup
# ============================================
echo -e "\n${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}Setting up Frontend (Next.js)...${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
cd frontend

# Create .env.local file if it doesn't exist
if [ ! -f .env.local ]; then
    cat > .env.local << 'EOF'
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000/api
EOF
    echo -e "${GREEN}✓ Created frontend/.env.local${NC}"
else
    echo -e "${GREEN}✓ Frontend .env.local already exists${NC}"
fi

# Install frontend dependencies
echo -e "${BLUE}Installing Frontend Dependencies...${NC}"
npm install
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Frontend dependencies installed${NC}"
else
    echo -e "${RED}✗ Failed to install frontend dependencies${NC}"
    exit 1
fi
cd ..

# ============================================
# Final Summary
# ============================================
echo -e "\n${CYAN}"
echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║              🎉 Setup Completed Successfully!                 ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo -e "${NC}"

echo -e "${GREEN}Project Structure:${NC}"
echo -e "  📁 /backend     → NestJS API (Port 3000)"
echo -e "  📁 /frontend    → Next.js App (Port 3001)"
echo ""

echo -e "${YELLOW}Before starting:${NC}"
echo -e "  1. Ensure PostgreSQL is running"
echo -e "  2. Create database: ${CYAN}createdb renit${NC}"
echo -e "  3. Update ${CYAN}backend/.env${NC} with your database credentials"
echo ""

echo -e "${GREEN}To start the project:${NC}"
echo -e "  ${CYAN}npm run dev${NC}          → Start both backend & frontend"
echo -e "  ${CYAN}npm run dev:backend${NC}  → Start only backend"
echo -e "  ${CYAN}npm run dev:frontend${NC} → Start only frontend"
echo ""

echo -e "${GREEN}To populate sample data:${NC}"
echo -e "  ${CYAN}node populate_data.js${NC}"
echo ""

echo -e "${GREEN}Access the application:${NC}"
echo -e "  🌐 Frontend: ${CYAN}http://localhost:3001${NC}"
echo -e "  🔌 Backend API: ${CYAN}http://localhost:3000/api${NC}"
echo ""
