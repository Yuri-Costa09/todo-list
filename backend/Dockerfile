FROM node:22-alpine AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy the rest of the application
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Production image
FROM node:22-alpine AS production

WORKDIR /app

ENV NODE_ENV=production

# Copy package files and install only production dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# Copy Prisma schema for migrations
COPY prisma ./prisma/

# Copy built application from builder stage
COPY --from=builder /app/generated ./generated
COPY --from=builder /app/src ./src

# Copy additional necessary files
COPY tsconfig.json ./

# Expose the port
EXPOSE 3001

# Add health check
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:3001/ || exit 1

# Run the application
CMD ["npm", "start"]
