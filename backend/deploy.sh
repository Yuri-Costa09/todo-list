#!/bin/bash
set -e

# Colors for terminal output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Starting deployment process...${NC}"

# Check if .env file exists, if not create it from .env.production
if [ ! -f .env ]; then
  echo -e "${YELLOW}No .env file found. Creating from .env.production...${NC}"
  if [ -f .env.production ]; then
    cp .env.production .env
    echo -e "${GREEN}.env file created successfully!${NC}"
  else
    echo -e "${RED}Error: .env.production file not found. Please create a .env file manually.${NC}"
    exit 1
  fi
fi

# Pull latest changes if in a git repository
if [ -d .git ]; then
  echo -e "${YELLOW}Pulling latest changes from git...${NC}"
  git pull
  echo -e "${GREEN}Git pull completed!${NC}"
fi

# Build and start the containers
echo -e "${YELLOW}Building and starting Docker containers...${NC}"
docker-compose down
docker-compose build --no-cache
docker-compose up -d

# Run database migrations
echo -e "${YELLOW}Running database migrations...${NC}"
sleep 5 # Wait for database to be ready
docker-compose exec backend npx prisma migrate deploy

echo -e "${GREEN}Deployment completed successfully!${NC}"
echo -e "${YELLOW}Application is now running at http://localhost:3001${NC}"
echo -e "${YELLOW}To check logs: docker-compose logs -f${NC}" 