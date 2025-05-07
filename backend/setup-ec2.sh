#!/bin/bash
set -e

# Colors for terminal output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Setting up EC2 instance for deployment...${NC}"

# Update system packages
echo -e "${YELLOW}Updating system packages...${NC}"
sudo yum update -y

# Install Docker
echo -e "${YELLOW}Installing Docker...${NC}"
sudo amazon-linux-extras install docker -y
sudo service docker start
sudo systemctl enable docker
sudo usermod -a -G docker $USER

# Install Docker Compose
echo -e "${YELLOW}Installing Docker Compose...${NC}"
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
  echo -e "${YELLOW}Creating .env file...${NC}"
  cat > .env << EOL
# Database Configuration
POSTGRES_USER=postgres
POSTGRES_PASSWORD=$(openssl rand -base64 12)
POSTGRES_DB=tasks_db
DATABASE_URL=postgresql://\${POSTGRES_USER}:\${POSTGRES_PASSWORD}@postgres:5432/\${POSTGRES_DB}

# Node Environment
NODE_ENV=production

# JWT Secret for Authentication
JWT_SECRET=$(openssl rand -base64 32)

# Server Configuration
PORT=3001
EOL
  echo -e "${GREEN}.env file created with secure random passwords!${NC}"
else
  echo -e "${YELLOW}.env file already exists. Skipping creation.${NC}"
fi

# Make deploy script executable
chmod +x deploy.sh

echo -e "${GREEN}Setup completed successfully!${NC}"
echo -e "${YELLOW}Note: You may need to log out and log back in for Docker group changes to take effect.${NC}"
echo -e "${YELLOW}After logging back in, run ./deploy.sh to deploy the application.${NC}" 