FROM node:20-alpine

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npx prisma generate

RUN mkdir -p certs

EXPOSE 3000
EXPOSE 3001

CMD ["npm", "start"]