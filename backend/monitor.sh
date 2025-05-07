#!/bin/bash

# Colors for terminal output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Monitoring Docker containers...${NC}"
docker-compose ps

echo -e "\n${YELLOW}Container resource usage:${NC}"
docker stats --no-stream

echo -e "\n${YELLOW}Backend logs (last 20 lines):${NC}"
docker-compose logs --tail=20 backend

echo -e "\n${YELLOW}Database logs (last 20 lines):${NC}"
docker-compose logs --tail=20 postgres

echo -e "\n${YELLOW}Nginx logs (last 20 lines):${NC}"
docker-compose logs --tail=20 nginx

echo -e "\n${YELLOW}Health check:${NC}"
if curl -s http://localhost:80 > /dev/null; then
  echo -e "${GREEN}Application is responding on port 80${NC}"
else
  echo -e "${RED}Application is NOT responding on port 80${NC}"
fi

echo -e "\n${YELLOW}Database connection check:${NC}"
docker-compose exec backend npx ts-node -e "
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function testConnection() {
  try {
    await prisma.\$connect();
    console.log('Database connection successful');
    await prisma.\$disconnect();
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
}
testConnection();" || echo -e "${RED}Database connection check failed${NC}" 