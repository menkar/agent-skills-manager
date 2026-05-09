# Agent Skills Manager

<div align="center">

**Create, manage, and share AI agent skills** — markdown-style skill definitions, relational storage, session-based authentication, and a discoverable public gallery.

<p align="center">
  <a href="https://nextjs.org/" title="Next.js"><img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" /></a>
  <a href="https://react.dev/" title="React"><img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" /></a>
  <a href="https://www.typescriptlang.org/" title="TypeScript"><img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" /></a>
  <a href="https://tailwindcss.com/" title="Tailwind CSS"><img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" /></a>
  <a href="https://daisyui.com/" title="DaisyUI"><img src="https://img.shields.io/badge/DaisyUI-5A0EF8?style=for-the-badge&logo=daisyui&logoColor=white" alt="DaisyUI" /></a>
  <a href="https://www.prisma.io/" title="Prisma"><img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma" /></a>
  <a href="https://www.postgresql.org/" title="PostgreSQL"><img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" /></a>
  <a href="https://nodejs.org/" title="Node.js"><img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" /></a>
  <a href="https://www.docker.com/" title="Docker"><img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" /></a>
  <a href="https://eslint.org/" title="ESLint"><img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white" alt="ESLint" /></a>
</p>

<sub>Stack highlights: Next.js 16, React 19, TypeScript 5, Tailwind 4 — exact ranges in <code>package.json</code>. Optional local DB: <code>docker-compose.yml</code> (PostgreSQL 16).</sub>

</div>

---

## Table of contents

1. [Summary](#summary)
2. [Capabilities](#capabilities)
3. [Architecture](#architecture)
4. [Tech stack & versions](#tech-stack--versions)
5. [Prerequisites](#prerequisites)
6. [Environment variables](#environment-variables)
7. [Getting started](#getting-started)
8. [Database & Docker](#database--docker)
9. [Project structure](#project-structure)
10. [Application routes](#application-routes)
11. [HTTP API (JSON)](#http-api-json)
12. [Data model](#data-model)
13. [Authentication & security notes](#authentication--security-notes)
14. [Scripts & tooling](#scripts--tooling)
15. [Production build](#production-build)
16. [Operational checklist](#operational-checklist)
17. [GitHub profile README (optional)](#github-profile-readme-optional)

---

## Summary

**Agent Skills Manager** is a full-stack web application for **skills**: reusable definitions (title, summary, rich body content, visibility) that authors manage from a dashboard and optionally expose in a **public gallery**. The stack centers on **Next.js (App Router)** with **React**, **TypeScript**, **Prisma**, and **PostgreSQL**, styled with **Tailwind CSS** and **DaisyUI**.

| Concern | Approach |
|--------|----------|
| **UI** | Responsive layouts, DaisyUI components, document-level dark theme support. |
| **Auth** | Email and password registration and login; passwords hashed with **bcryptjs**; session handled for authenticated flows. |
| **Data** | Prisma ORM with PostgreSQL; migrations under `prisma/migrations/`. |
| **APIs** | Route handlers under `app/api/` for JSON auth and authenticated skill reads; server actions for skill mutations where implemented. |

---

## Capabilities

### Public & marketing

| Capability | Route | Description |
|------------|-------|-------------|
| Landing | `/` | Introductory content and entry points into the app. |
| About | `/about` | Product and technical overview. |
| Not found | — | App-wide **404** with navigation options. |
| Error boundary | — | Root error UI with retry where configured. |

### Public skills

| Capability | Route | Description |
|------------|-------|-------------|
| Gallery | `/skills` | Lists **public** skills with author attribution; uses incremental static regeneration on an interval for refreshed listings. |
| Skill detail | `/skills/[id]` | Public skill by numeric id; metadata oriented toward SEO; same regeneration strategy as the gallery. |

### Account

| Capability | Route | Description |
|------------|-------|-------------|
| Login | `/login` | Session establishment; authenticated users are routed to the dashboard. |
| Register | `/register` | Account creation with validation appropriate to the forms. |

### Dashboard (authenticated)

| Capability | Route | Description |
|------------|-------|-------------|
| Overview | `/dashboard` | Aggregated view of **your** skills with edit/delete entry points. |
| Create skill | `/dashboard/skills/new` | Create name, description, body, and visibility. |
| Edit skill | `/dashboard/skills/[id]/edit` | Update a skill you own. |

### Shared behavior

- Global **header / footer** for navigation and branding.
- Client-side **auth context** for sign-in awareness across the UI.
- **Server-side** enforcement of ownership and visibility for mutations and sensitive reads.

---

## Architecture

Rendering mixes **static/marketing** pages, **incrementally regenerated** public skill pages, **interactive** client flows (auth, dashboard, editors), and **`/api/*` route handlers** for JSON consumers.

```mermaid
flowchart LR
  subgraph Client
    Browser[Browser]
  end
  subgraph Next["Next.js App Router"]
    RSC[Server components & layouts]
    RH[Route handlers /api]
    SA[Server actions]
  end
  subgraph Data
    Prisma[Prisma Client]
    PG[(PostgreSQL)]
  end
  Browser --> RSC
  Browser --> RH
  RSC --> SA
  SA --> Prisma
  RH --> Prisma
  Prisma --> PG
```

Exact `revalidate` intervals and file locations live in source; treat this diagram as conceptual.

---

## Tech stack & versions

Pinned versions below mirror **`package.json`** at the time of documentation; upgrade deliberately and re-run tests.

### Runtime & framework

| Technology | Version (semver range) | Role |
|------------|-------------------------|------|
| **Node.js** | LTS recommended | JavaScript runtime. |
| **Next.js** | `^16.2.4` | App Router, server components, metadata, route handlers. |
| **React** / **React DOM** | `^19.2.4` | UI layer. |
| **TypeScript** | `^5` | Static typing. |

### Data & infrastructure

| Package | Role |
|---------|------|
| **prisma** / **@prisma/client** | Schema, migrations, type-safe queries. |
| **pg** / **@prisma/adapter-pg** | PostgreSQL driver and Prisma adapter usage. |
| **bcryptjs** | Password hashing. |

### UI & styling

| Package | Role |
|---------|------|
| **tailwindcss** / **@tailwindcss/postcss** | Utility-first CSS (v4 pipeline). |
| **daisyui** | Component primitives and themes. |

### Quality

| Package | Role |
|---------|------|
| **eslint** / **eslint-config-next** | Linting aligned with Next.js. |
| **dotenv** | Loading `.env` for supported tooling (never commit secrets). |
| **@types/\*** | Type definitions for Node, React, `pg`. |

### Optional local infrastructure

| Tool | Role |
|------|------|
| **Docker Compose** | One-service definition for **PostgreSQL 16** (`docker-compose.yml`). |

---

## Prerequisites

- **Node.js** (use an active **LTS** release compatible with Next.js 16).
- **npm** (or another package manager; examples use **npm**).
- **PostgreSQL** reachable via a connection string, **or** Docker / Docker Compose to run the bundled Postgres service.

---

## Environment variables

Configure secrets outside version control (`.env` is gitignored; do not commit real credentials).

| Variable | Required | Description |
|----------|----------|-------------|
| **`DATABASE_URL`** | Yes | PostgreSQL connection URL consumed by Prisma (`schema.prisma` `datasource db`). |

Additional variables may appear as the app evolves; inspect Prisma config and application code for any extensions.

**Example shape** (replace host, credentials, and database name with yours):

```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE"
```

For the **default Docker Compose** stack in this repo (development defaults):

```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/skills_db"
```

---

## Getting started

1. **Clone** the repository and open the project root:

   ```bash
   cd agent-skills-manager
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure environment** — create `.env` (or use your host’s secret store) and set **`DATABASE_URL`**.

4. **Prepare the database** — generate the client and apply migrations:

   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

5. **Run the development server:**

   ```bash
   npm run dev
   ```

6. Open the app at the URL printed in the terminal (commonly `http://localhost:3000`).

---

## Database & Docker

The Compose file defines a single service **`skills-db`**:

| Setting | Value |
|---------|--------|
| Image | `postgres:16` |
| Default database | `skills_db` |
| Port mapping | `5432:5432` |
| Default user / password (compose env) | `postgres` / `postgres` |
| Volume | Named volume `skills_pgdata` for data persistence |
| Healthcheck | `pg_isready` |

**Start only the database:**

```bash
docker compose up -d
```

Stop and remove containers when finished if desired (`docker compose down`). Use production-grade credentials and networking outside local experimentation.

---

## Project structure

```
agent-skills-manager/
├── app/                    # Next.js App Router: pages, layouts, components, server actions, api/
├── prisma/
│   ├── schema.prisma       # Data models & datasource
│   └── migrations/         # SQL migrations
├── public/                 # Static assets
├── next.config.ts
├── tsconfig.json           # Path alias @/* → ./app/*
├── eslint.config.mjs
├── postcss.config.mjs
├── prisma.config.ts
├── docker-compose.yml      # Optional local PostgreSQL
├── package.json
├── PROFILE_README.md       # Optional template for GitHub profile README
└── README.md               # This file
```

**Import alias:** `@/` maps to `./app/` (see `tsconfig.json`).

---

## Application routes

| Area | Routes |
|------|--------|
| Marketing | `/`, `/about` |
| Auth | `/login`, `/register` |
| Public skills | `/skills`, `/skills/[id]` |
| Dashboard | `/dashboard`, `/dashboard/skills/new`, `/dashboard/skills/[id]/edit` |

---

## HTTP API (JSON)

REST-style handlers live under **`app/api/`**. Current surface:

| Method | Path | Purpose |
|--------|------|---------|
| `POST` | `/api/auth/register` | Register a new user. |
| `POST` | `/api/auth/login` | Sign in. |
| `POST` | `/api/auth/logout` | Sign out. |
| `GET` | `/api/auth/me` | Current session / user context. |
| `GET` | `/api/skills` | Authenticated listing of skills (per handler logic). |
| `GET` | `/api/skills/[id]` | Fetch a skill by id when permitted. |

Request bodies, status codes, and error shapes are defined in the corresponding **`route.ts`** files. Treat this table as a map to source, not a substitute for reading handlers when integrating clients.

---

## Data model

Defined in **`prisma/schema.prisma`** (PostgreSQL).

### `User` (`users`)

| Field | Notes |
|-------|--------|
| `id` | Primary key, autoincrement. |
| `email` | Unique. |
| `password` | Stored hashed (never plaintext in application logic). |
| `name` | Display name. |
| `createdAt` / `updatedAt` | Timestamps. |
| `skills` | One-to-many relation to `Skill`. |

### `Skill` (`skills`)

| Field | Notes |
|-------|--------|
| `id` | Primary key, autoincrement. |
| `name` | Short title (max length per schema). |
| `description` | Summary (bounded length). |
| `content` | Body text (large text). |
| `isPublic` | Whether the skill appears in the public gallery. |
| `authorId` | Foreign key to `User`; cascade delete from author. |
| `createdAt` / `updatedAt` | Timestamps. |

---

## Authentication & security notes

- **Passwords** are hashed before persistence; never log or return raw passwords from APIs.
- **Sessions** are suitable for development-style flows; **production** deployments should adopt your organization’s standards (cookie flags, HTTPS, session storage, rotation, monitoring).
- **Authorization** for dashboard and API routes must be enforced **on the server** (server actions and route handlers), not only by hiding UI controls.

---

## Scripts & tooling

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the Next.js development server. |
| `npm run build` | Create an optimized production build. |
| `npm run start` | Serve the production build. |
| `npm run lint` | Run ESLint. |
| `npx prisma generate` | Regenerate Prisma Client after schema changes. |
| `npx prisma migrate dev` | Apply migrations in development. |
| `npx prisma studio` | Open Prisma Studio (development inspection only). |

---

## Production build

1. Set **`DATABASE_URL`** (and any other required variables) in the deployment environment.
2. Run **`npm run build`**.
3. Start with **`npm run start`** (or your platform’s equivalent for Node apps).

Use managed PostgreSQL, secret managers, and HTTPS termination appropriate to your host.

---

## Operational checklist

- Store **database URLs** and **secrets** only in secure configuration (never in the repo).
- Prefer **HTTPS** and conservative **cookie** policies in production.
- Run **migrations** as part of deployment when the schema changes.
- Review **authorization** paths whenever new routes or actions are added.

---

## GitHub profile README (optional)

GitHub shows one **primary language** per repository; to present a **full stack** on your profile, maintain a profile repository (often **`username/username`**) with a root **`README.md`**.

This repository includes **`PROFILE_README.md`** as a starting point—copy and adapt it for your profile, then adjust badges and pinned repositories to match your projects.

---

<div align="center">

**Agent Skills Manager** — documentation for contributors and operators.  
For organization-specific deployment and secrets, use private runbooks and secret stores.

</div>
