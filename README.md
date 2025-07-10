# MySpace

A modern full-stack project with a **TypeScript Node.js backend** (Express, PostgreSQL) and a **Next.js frontend** (React, TypeScript, TanStack Query).

---

## Table of Contents

- [Project Structure](#project-structure)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Tech Stack](#tech-stack)
- [Contributing](#contributing)

---

## Project Structure

```
MySpace/
  backend/    # Node.js, Express, PostgreSQL, TypeScript
  web/        # Next.js, React, TypeScript, TanStack Query
```

---

## Backend Setup (`backend/`)

### 1. Install dependencies

```bash
cd backend
npm install
```

### 2. Configure environment

Copy `.env.example` to `.env` and fill in your database and secret values.

### 3. Database

- Ensure PostgreSQL is running.
- Initialize the database:

```bash
npm run db:init
npm run db:seed
```

### 4. Start the server

```bash
npm run dev
```

- API runs on [http://localhost:5000](http://localhost:5000) by default.

---

## Frontend Setup (`web/`)

### 1. Install dependencies

```bash
cd web
npm install
```

### 2. Configure environment

Copy `.env.example` to `.env` and set the backend API URL.

### 3. Start the Next.js app

```bash
npm run dev
```

- App runs on [http://localhost:3000](http://localhost:3000) by default.

---

## Environment Variables

**Backend (`backend/.env`):**

```
DATABASE_URL=postgres://user:password@localhost:5432/myspace
JWT_SECRET=your_jwt_secret
API_KEY=your_api_key
PORT=5000
```

**Frontend (`web/.env`):**

```
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_API_KEY=your_api_key
```

---

## Scripts

**Backend:**

- `npm run dev` — Start backend in dev mode (nodemon)
- `npm run build` — Build TypeScript
- `npm run start` — Start production server

**Frontend:**

- `npm run dev` — Start Next.js in dev mode
- `npm run build` — Build for production
- `npm run start` — Start production server

---

## Tech Stack

- **Backend:** Node.js, Express, TypeScript, PostgreSQL, JWT, REST API
- **Frontend:** Next.js, React, TypeScript, TanStack Query, Tailwind CSS

---

## Contributing

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---


