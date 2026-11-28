# SEIMS Technology Stack & Architecture Decisions

This document outlines the standardized technology stack, libraries, and architectural decisions adopted for the **Software Engineering Internship Management System (SEIMS)** at Debre Birhan University.

All team members must adhere to these choices to maintain consistency, avoid conflicting dependencies, and ensure seamless vertical slice integration.

---

## 1. High-Level Architecture Overview

SEIMS follows a **Decoupled Modular Monolith** architecture:
- **Client (`client/`):** Modern Single-Page Application (SPA) with Server-Side Rendering (SSR) capabilities built on Next.js 16 App Router.
- **Server (`server/`):** RESTful API server built on Express.js and TypeScript, organized into self-contained vertical feature modules.
- **Database & Data Access:** PostgreSQL managed through Prisma ORM for type-safe database access and migrations.
- **Real-Time Communication:** Socket.io for immediate notifications and activity alerts across stakeholders.

---

## 2. Frontend Stack (`client/`)

| Domain | Technology / Library | Version / Tooling | Rationale & Purpose |
| :--- | :--- | :--- | :--- |
| **Framework** | **Next.js (App Router)** | `v16.x` | Modern routing, server components, optimized performance, and layout nesting for multi-role dashboards. |
| **Language** | **TypeScript** | `v5.x` | Strict type-safety across all UI components, hooks, and API clients. |
| **Styling** | **Tailwind CSS** | `v4.x` | Utility-first styling for fast UI development without CSS collisions. |
| **UI Components** | **shadcn/ui** *(Radix UI)* | Latest | Accessible, unstyled primitives copied directly into `components/ui/`. Allows total customization without dependency lock-in. |
| **Iconography** | **Lucide React** | Latest | Lightweight, tree-shakeable icons for dashboards, navigation, and badges. |
| **Server State & Caching** | **TanStack Query (React Query)** | `v5.x` | Handles all API data fetching, background synchronization, automated cache invalidation, and pagination. |
| **Client / Global UI State** | **Zustand** | Latest | Extremely lightweight state management for auth session tokens, sidebar toggle state, and multi-step modal wizards. |
| **Form Management** | **React Hook Form** | `v7.x` | High-performance, uncontrolled form management minimizing re-renders on complex forms (evaluations, weekly reports). |
| **Schema Validation** | **Zod** | `v3.x` | Type-safe schema validation for form inputs; seamlessly integrates with React Hook Form via `@hookform/resolvers/zod`. |
| **Data Tables** | **TanStack Table** | `v8.x` | Powers complex sorting, searching, and pagination in student placement and evaluation tables. |
| **Data Visualization** | **Recharts** | Latest | Clean, composable React charting library for Department Head and Admin metric dashboards. |
| **HTTP Client** | **Axios** | Latest | Centralized HTTP client configured with request/response interceptors for automatic JWT token injection and error handling. |

---

## 3. Backend Stack (`server/`)

| Domain | Technology / Library | Version / Tooling | Rationale & Purpose |
| :--- | :--- | :--- | :--- |
| **Runtime** | **Node.js LTS** | `v20.x+` | Standard JavaScript/TypeScript server runtime. |
| **Web Framework** | **Express.js** | `v4.x` (with TypeScript) | Battle-tested, lightweight HTTP server framework with rich middleware support. |
| **Language** | **TypeScript** | `v5.x` | Enforces strong typing across controllers, services, repositories, and DTOs. |
| **ORM & Migrations** | **Prisma ORM** | Latest | Auto-generated type-safe client, robust schema modeling in `prisma/schema.prisma`, and automated migrations. |
| **Primary Database** | **PostgreSQL** | `v15+` / `v16` | Robust relational database supporting ACID transactions, complex relations, and relational integrity. *(SQLite is permitted for quick offline local testing)*. |
| **Authentication** | **JWT (`jsonwebtoken`) & `bcryptjs`** | Latest | Stateless bearer token authentication and salted password hashing. |
| **Input Validation** | **Zod** | `v3.x` | Express middleware validation for request bodies, query parameters, and route parameters. |
| **Real-Time Events** | **Socket.io** | Latest | WebSocket engine for instant role-based alerts (e.g. new report submitted, feedback given, status changes). |
| **File Uploads** | **Multer** | Latest | Multipart form-data parser for PDF weekly reports, MoU documents, and defense presentation slides. |
| **Document / PDF Gen** | **PDFKit** or **@react-pdf/renderer** | Latest | Automated programmatic generation of official student placement letters and consolidated defense transcripts. |
| **CORS & Security** | **cors** & **helmet** | Latest | HTTP security headers and Cross-Origin Resource Sharing configuration. |

---

## 4. Development, Linting & Quality Assurance

- **Code Formatting:** **Prettier** (`.prettierrc`) to enforce single quotes, trailing commas, and 2-space indentation.
- **Static Analysis:** **ESLint** (`eslint.config.mjs`) to catch common anti-patterns and unused variables.
- **Editor Standards:** `.editorconfig` to enforce UTF-8 charset, 2-space indentation, and LF line endings across all operating systems.
- **API Testing:** Shared **Postman / Bruno / Thunder Client** collection maintained by the QA team for automated and manual regression testing.

---

## 5. Summary Matrix for Developers

```text
Frontend:  Next.js 16 + React 19 + TypeScript + Tailwind CSS v4 + shadcn/ui
State:     TanStack Query v5 (Server Cache) + Zustand (UI State)
Forms:     React Hook Form + Zod
Backend:   Express.js + TypeScript + Prisma ORM + PostgreSQL
Auth:      JWT (Access Token) + Role-Based Access Control (RBAC)
Real-time: Socket.io
Files:     Multer (Local disk in dev -> S3 in prod)
Reports:   PDF generation via PDFKit / @react-pdf/renderer
```
