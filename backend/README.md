# Todo List API

Um sistema de gerenciamento de tarefas com autenticação JWT, construído com Node.js, TypeScript, Prisma e PostgreSQL.

## 🚀 Getting Started

### Pré-requisitos
- Docker e Docker Compose instalados
- Git

### 1. Clone o repositório
```bash
git clone https://github.com/Yuri-Costa09/todo-list.git
cd backend
```

### 2. Configure as variáveis de ambiente
Crie um arquivo `.env` na pasta `backend` com o seguinte conteúdo:

```env
# Database Configuration
POSTGRES_USER=seu_usuario
POSTGRES_PASSWORD=sua_senha
POSTGRES_DB=todo_db

# JWT Secret
JWT_SECRET_KEY=seu_jwt_secret_muito_seguro

### 3. Execute com Docker
```bash
docker compose up -d
```

### 4. Execute as migrações do banco de dados
Após os contêineres estarem rodando, execute:

```bash
# Encontre o nome do contêiner
docker ps

# Execute as migrações (substitua pelo nome correto do contêiner)
docker exec -it {container_id / container_name} npx prisma migrate dev
```


## 📝 Notas Importantes

- **HTTP**: A API roda na porta `3000`
- **HTTPS**: A API roda na porta `3001` (requer certificados SSL)
- **Database**: PostgreSQL na porta `5433`

### Para desenvolvimento local simples (apenas HTTP):
Se você só quer testar a funcionalidade básica sem HTTPS, pode:
1. Comentar ou remover a seção HTTPS no `src/server.ts`
2. Usar apenas `http://localhost:3000` para requisições (rota HTTP)


## 🔧 Comandos Úteis

```bash
# Ver logs dos contêineres
docker compose logs -f

# Parar os serviços
docker compose down

# Reconstruir as imagens
docker-compose up --build

# Executar comandos no contêiner
docker-compose exec backend [comando]
```

## 📡 Endpoints da API

- `POST /api/users/register` - Registrar usuário
- `POST /api/users/login` - Login
- `GET /api/tasks/user/{userId}` - Listar tarefas (autenticado)
- `POST /api/tasks/create` - Criar tarefa (autenticado)
- `PUT /api/tasks/:id` - Atualizar tarefa (autenticado)
- `DELETE /api/tasks/:id` - Deletar tarefa (autenticado)

## 🛠️ Stack Tecnológica

- **Runtime**: Node.js 20
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL 15
- **ORM**: Prisma
- **Authentication**: JWT
- **Container**: Docker & Docker Compose
