# Todo List API

A RESTful API for a Todo List application built with TypeScript, Express, and Prisma ORM. The API supports user registration, authentication (JWT), and CRUD operations for tasks.

## Table of Contents
- [Features](#features)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
  - [User Endpoints](#user-endpoints)
  - [Task Endpoints](#task-endpoints)
- [Authentication](#authentication)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)

---

## Features
- User registration and login with hashed passwords
- JWT-based authentication
- CRUD operations for tasks (create, update, delete, list by user)
- Prisma ORM with PostgreSQL

## Getting Started
1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Set up environment variables:**
   - Create a `.env` file in the `backend/` directory with:
     ```env
     DATABASE_URL=postgresql://<user>:<password>@<host>:<port>/<database>
     POSTGRES_USER={your-user}
     POSTGRES_PASSWORD={your-password}
     POSTGRES_DB={db}
     JWT_SECRET_KEY=your_jwt_secret
     ```
3. **Run database migrations:**
   ```bash
   npx prisma migrate deploy
   ```
4. **Start the server:**
   ```bash
   npm run start-dev 
   or
   npm run start
   ```

## API Endpoints

### User Endpoints
- `POST /api/users/register` — Register a new user
  - Body: `{ "name": string, "email": string, "password_hash": string }`
- `POST /api/users/login` — Login and receive JWT
  - Body: `{ "email": string, "password_hash": string }`
- `GET /api/users/:id` — Get user by ID (requires authentication)

### Task Endpoints
- `POST /api/tasks/create` — Create a new task (requires authentication)
  - Body: `{ "description": string, "authorId": string }`
- `PUT /api/tasks/update/:id` — Update a task by ID (requires authentication)
  - Body: `{ "description"?: string, "complete"?: boolean }`
- `DELETE /api/tasks/delete/:id` — Delete a task by ID (requires authentication)
- `GET /api/tasks/user/:userId` — List all tasks for a user (requires authentication)

## Authentication
- Use the `Authorization: Bearer <token>` header for all protected endpoints.
- Obtain the token via the `/api/users/login` endpoint.

## Environment Variables
The following environment variables are required in your `.env` file (located in the `backend/` directory):

| Variable           | Description                        | Example Value                                      |
|--------------------|------------------------------------|----------------------------------------------------|
| DATABASE_URL       | PostgreSQL connection string       | postgresql://postgres:postgres@localhost:5432/todo |
| JWT_SECRET_KEY     | Secret key for JWT signing         | your_jwt_secret                                    |
| POSTGRES_USER      | PostgreSQL user                    | postgres                                           |
| POSTGRES_PASSWORD  | PostgreSQL password                | postgres                                           |
| POSTGRES_DB        | PostgreSQL database name           | todo                                               |

## Project Structure
```
backend/
  src/
    server.ts
    app.ts
    features/
      user/
        controllers/
        services/
        repositories/
        routers/
      task/
        controllers/
        services/
        repositories/
        routers/
      middlewares/
    prismaClient.ts
  prisma/
    schema.prisma
```

---

## License
MIT
