# Todo List Backend

Backend API for private Todo management using Express + TypeScript + Prisma + Supabase Postgres.

## Tech Stack

- Node.js
- Express 5
- TypeScript
- Prisma ORM
- Supabase Postgres
- JWT Authentication
- bcrypt password hashing

## Installed Packages

Runtime dependencies:
- @prisma/client
- bcrypt
- dotenv
- express
- jsonwebtoken

Dev dependencies:
- prisma
- tsx
- typescript
- @types/node
- @types/express
- @types/bcrypt
- @types/jsonwebtoken
- nodemon
- ts-node

## Project Structure

- src/index.ts : app entry point
- src/lib/prisma.ts : Prisma client singleton
- src/middleware/auth.ts : JWT middleware
- src/controllers/admin.ts : login + admin endpoints
- src/controllers/todo.ts : todo endpoints
- src/route/auth.ts : auth route
- src/route/admin.ts : protected admin routes
- src/route/todo.ts : protected todo routes
- prisma/schema.prisma : database schema

## Environment Setup

Create file .env in project root.

Required variables:
- DATABASE_URL
- DIRECT_URL
- JWT_SECRET

Example values:
- DATABASE_URL="postgresql://postgres.PROJECT_REF:PASSWORD@aws-1-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
- DIRECT_URL="postgresql://postgres.PROJECT_REF:PASSWORD@db.PROJECT_REF.supabase.co:5432/postgres"
- JWT_SECRET="replace-with-strong-random-secret"

Notes:
- DATABASE_URL is used for app queries and db push flow.
- DIRECT_URL is used by Prisma for direct migration/sync tasks.
- If your password has special characters, URL-encode it.

## Setup and Run

1. Install dependencies

  npm install

2. Generate Prisma client

  npx prisma generate

3. Sync schema to database

  npx prisma db push

4. Start development server

  npm run dev

Server runs on:
- http://localhost:3000

## Available Scripts

- npm run dev : prisma generate + prisma db push + tsx watch
- npm run build : TypeScript compile
- npm run start : prisma generate + prisma db push + run compiled app
- npm run prisma:generate : generate Prisma client
- npm run db:push : push schema to database

## Database Models

Defined in prisma/schema.prisma:
- Admin
- Todo

When model fields are changed:
1. update prisma/schema.prisma
2. run npx prisma generate
3. run npx prisma db push

## Authentication Flow

This project is private and uses login only.
No public register endpoint is exposed.

- Login with username + password
- Receive JWT token
- Send token in Authorization header for protected routes

Header format:
- Authorization: Bearer YOUR_JWT_TOKEN

## API Endpoints

Public:
- GET /              health text
- POST /api/auth/login

Protected (require Bearer token):
- GET /api/admins
- GET /api/admins/:id
- GET /api/todos
- POST /api/todos

## Login Request Example

POST /api/auth/login

Body (JSON):
- username
- password

Success response:
- token
- admin object

## Create Todo Request Example

POST /api/todos

Headers:
- Authorization: Bearer YOUR_JWT_TOKEN
- Content-Type: application/json

Body (JSON):
- title
- description

## First Admin Account

Because register is not exposed publicly, create your first admin by one of these methods:

1. Insert manually in Supabase SQL Editor
2. Use Prisma Studio and add Admin row

Important:
- Store password as bcrypt hash, not plain text

To open Prisma Studio:

  npx prisma studio

## Troubleshooting

1. Prisma client issues
- Run npx prisma generate again

2. Database sync issues
- Check DATABASE_URL and DIRECT_URL
- Run npx prisma db push manually

3. JWT errors
- Ensure JWT_SECRET is set in .env
- Verify Authorization header format

4. Build check

  npm run build
