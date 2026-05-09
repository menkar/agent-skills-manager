# Agent Skills Manager

<div align="center">

**Create, manage, and share AI agent skills** — markdown-based skill definitions, relational storage, session-based authentication, and a public gallery.

Built with **Next.js (App Router)**, **React**, **Prisma**, **PostgreSQL**, **Tailwind CSS**, and **DaisyUI**.

</div>

---

## Table of contents

1. [Overview](#overview)
2. [Features](#features)
3. [Architecture & rendering](#architecture--rendering)
4. [Tech stack & packages](#tech-stack--packages)
5. [Getting started (high level)](#getting-started-high-level)
6. [High-level layout](#high-level-layout)
7. [API surface](#api-surface)
8. [Authentication (conceptual)](#authentication-conceptual)
9. [Operational notes](#operational-notes)
10. [Scripts](#scripts)

---

## Overview

**Agent Skills Manager** is a web application where registered users can create **skills** (title, summary, markdown-style body, public or private visibility). **Public** skills appear in a shared gallery; **private** skills are visible to the author through the dashboard.

| Area | Role |
|------|------|
| **UI** | Responsive layouts using Tailwind and DaisyUI; dark theme support on the document root. |
| **Auth** | Email/password sign-up and sign-in with password hashing and browser session handling. |
| **Data** | Prisma ORM with PostgreSQL; server actions update data and refresh affected pages. |
| **API** | JSON route handlers for authentication and authenticated skill reads. |

---

## Features

### Public & marketing

| Capability | Typical route | Purpose |
|------------|---------------|---------|
| Landing | `/` | Introduction, rendering-pattern highlights, links into the app. |
| About | `/about` | Product and stack overview. |
| Not found | App-wide | Friendly 404 with navigation options. |
| Global error | App-wide | Root error boundary with retry. |

### Public skills

| Capability | Typical route | Purpose |
|------------|---------------|---------|
| Gallery | `/skills` | Lists **public** skills with author attribution; uses incremental regeneration on a fixed interval. |
| Detail | `/skills/[id]` | Reads a **public** skill by id; SEO-oriented metadata; same regeneration strategy as the gallery. |

### Account

| Capability | Typical route | Purpose |
|------------|---------------|---------|
| Login | `/login` | Authenticated users redirect to the dashboard. |
| Register | `/register` | New account creation with basic client-side validation. |

### Dashboard (signed-in)

| Capability | Typical route | Purpose |
|------------|---------------|---------|
| Overview | `/dashboard` | Summary stats and list of **your** skills; edit/delete entry points. |
| Create skill | `/dashboard/skills/new` | Form for name, description, body, visibility. |
| Edit skill | `/dashboard/skills/[id]/edit` | Update existing skill when you own it. |

### Shared UI & logic

| Capability | Purpose |
|------------|---------|
| Header / footer | Global navigation and branding. |
| Auth provider | Shared client state for sign-in status. |
| Server actions | Create, update, and delete skills with ownership checks where applicable. |

---

## Architecture & rendering

The codebase mixes strategies for clarity and performance:

| Approach | Typical use | Goal |
|----------|-------------|------|
| Static / marketing pages | Home | Fast first paint for introductory content. |
| Incremental regeneration | Public gallery & detail | Periodic refresh without redeploying everything. |
| Client-heavy flows | Login, register, dashboard, editors | Interactive forms and redirects. |
| Route handlers | `/api/*` | JSON APIs alongside the React app. |

Exact timings and file paths may change; refer to the source for current exports (e.g. `revalidate`).

---

## Tech stack & packages

Versions follow **`package.json`** in this repository.

### Application dependencies (summary)

| Package | Purpose |
|---------|---------|
| **next** | Framework: App Router, server components, route handlers, metadata. |
| **react** / **react-dom** | UI rendering. |
| **prisma** / **@prisma/client** | Schema, migrations, type-safe database access. |
| **@prisma/adapter-pg** / **pg** | PostgreSQL connectivity via the driver adapter pattern. |
| **bcryptjs** | Password hashing and verification. |
| **daisyui** | Pre-built UI patterns (buttons, cards, forms, navigation). |
| **tailwindcss** (with PostCSS) | Utility-first styling. |

### Development dependencies (summary)

| Package | Purpose |
|---------|---------|
| **typescript** | Static typing. |
| **eslint** + **eslint-config-next** | Lint rules aligned with Next.js. |
| **@tailwindcss/postcss** | Tailwind v4 build integration. |
| **dotenv** | Environment loading for tooling that expects a `.env` file (do not commit real secrets). |
| **@types/\*** | Type definitions for Node, React, and PostgreSQL types. |

---

## Getting started (high level)

No secrets or full configuration belong in this README. Configure your environment according to your own policies.

1. **Install packages** — `npm install` (or your package manager of choice).
2. **Database** — Provision PostgreSQL (local, Docker, or hosted). Point your application at it using **environment variables** defined outside public docs (commonly a single database URL for Prisma).
3. **Prisma** — Run generate and migrations as appropriate for your workflow (`prisma generate`, `prisma migrate`, etc.).
4. **Run** — `npm run dev` for development; `npm run build` then `npm start` for production builds.

Never commit `.env` files, API keys, or production connection strings to source control.

---

## High-level layout

Typical organization (names may vary):

- **`app/`** — Routes, layouts, UI, server actions, and API handlers.
- **`prisma/`** — Database schema and migrations.
- **Root config files** — Next.js, TypeScript, ESLint, PostCSS, optional Docker/orchestration files.

A path alias may map shortcuts (for example `@/` → `app/`); see your TypeScript config if present.

---

## API surface

REST-style JSON endpoints exist for **authentication** (login, register, logout, current session) and **authenticated skill reads** (list owned skills, fetch one skill for editing when permitted). Exact paths and status codes are defined in the route handler files under `app/api/`.

---

## Authentication (conceptual)

- Passwords are hashed before storage.
- Successful sign-in establishes a **browser session** suitable for development demos; production deployments should follow your organization’s standards (signed tokens, session stores, rotation, etc.).
- Dashboard routes expect an authenticated session; unauthenticated visitors are redirected to sign-in where applicable.

---

## Operational notes

- Treat **database URLs**, **secrets**, and **compose/host credentials** as confidential; configure them only in private environment storage or secret managers.
- Prefer **HTTPS** and **secure cookie policies** in production.
- Review server actions and APIs so authorization is enforced **on the server**, not only in the UI.

---

## Scripts

| Command | Typical use |
|---------|-------------|
| `npm run dev` | Local development server. |
| `npm run build` | Production build. |
| `npm run start` | Serve production build. |
| `npm run lint` | Static analysis. |
| `npx prisma generate` | Regenerate Prisma Client after schema changes. |
| `npx prisma migrate dev` | Apply migrations (development workflow). |
| `npx prisma studio` | Optional database browser (development only). |

Docker Compose commands (`docker compose up`, etc.) depend on whether you use containerized PostgreSQL; follow your team’s runbooks.

---

<div align="center">

**Agent Skills Manager** — features and stack overview for contributors and readers.  
For deployment-specific configuration, use private documentation and secret management.

</div>
