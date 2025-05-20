#!/bin/sh
# Esperar pelo banco de dados (opcional, mas recomendado)
echo "Waiting for database to be ready..."
sleep 5

# Executar as migrações
echo "Running database migrations..."
npx prisma migrate deploy

# Iniciar a aplicação
echo "Starting application..."
npm start 