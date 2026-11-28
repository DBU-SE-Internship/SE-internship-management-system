# SEIMS System Architecture & Unified Folder Structure

> **Target System:** Software Engineering Internship Management System (SEIMS)  
> **Core Architecture Pattern:** Decoupled Modular Monolith with Vertical Feature Slices  
> **Backend Stack:** Node.js, Express.js, TypeScript, Prisma ORM, PostgreSQL, Better Auth  
> **Frontend Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Better Auth  

---

## 1. Architectural Strategy & Design Principles

SEIMS is engineered for a 10-person team developing distinct functional capabilities concurrently. To eliminate git merge conflicts, enforce high code cohesion, and maintain strict security boundaries, the system follows a **Unified Feature-First (Vertical Slice) Architecture** across both the backend and frontend.

### Core Principles:
1. **Vertical Slice Alignment:** Features in the backend (`server/src/modules/<feature-name>/`) mirror features in the frontend (`client/features/<feature-name>/`) in a clean 1:1 relationship.
2. **Strict Module Isolation:** A feature slice encapsulates its own logic, UI, routes, database queries, and types. Cross-module imports of private internal files are strictly forbidden.
3. **Controlled Public Interfaces:** If Feature A needs functionality from Feature B, it must consume Feature B’s explicit public exports via its `index.ts`.
4. **Shared Kernel & Design Primitives:** Universal cross-cutting concerns (authentication guards, response envelopes, database singleton, design system primitives) live in centralized shared layers.
5. **Closed Onboarding & Dual-Portal Segregation:** Zero public self-registration. Role access is physically and logically partitioned between University Insiders and Industry Outsiders.

---

## 2. Full Project Monorepo Structure

```text
FinalProject/
├── .github/                       # GitHub workflow, PR & issue templates
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── ISSUE_TEMPLATE/
│
├── client/                        # Frontend Next.js Application
│   ├── app/                       # Next.js App Router (Routes & Layouts only)
│   ├── components/                # Shared UI design system & app shell
│   ├── features/                  # Vertical frontend feature slices
│   ├── hooks/                     # Shared custom React hooks
│   ├── lib/                       # Centralized utilities, API & Auth clients
│   └── types/                     # Shared TypeScript contracts & DTOs
│
├── server/                        # Backend Express Application
│   ├── prisma/                    # Single source of truth for DB schema & migrations
│   │   ├── schema.prisma
│   │   └── migrations/
│   └── src/
│       ├── config/                # Environment & singleton instances (Prisma)
│       ├── shared/                # Shared backend kernel (middleware, utils, types)
│       ├── modules/               # Vertical backend feature slices
│       ├── app.ts                 # Express setup, CORS, Better Auth mount
│       ├── routes.ts              # Central router aggregating module routers
│       └── server.ts              # HTTP & WebSocket server bootstrap
│
├── docs/                          # Comprehensive project documentation
│   ├── ARCHITECTURE.md            # This document (Unified architecture specification)
│   ├── TECH_STACK.md              # Approved technologies & libraries
│   ├── API_CONVENTIONS.md         # REST envelopes, status codes & query params
│   ├── FUNCTIONAL_REQUIREMENTS.md # System-wide functional requirements
│   ├── QA_GUIDELINES.md           # Testing standards, DoD & bug reporting
│   └── modules/                   # Module-specific plans and reports
│
├── AGENTS.md                      # AI agent guardrails & coding standards
├── CONTRIBUTING.md                # Git workflow, branching & PR guidelines
└── README.md                      # Project landing page
```

---

## 3. Backend Architecture (`server/`)

The backend is organized into a **Shared Kernel** (`server/src/shared/`) and **Vertical Feature Modules** (`server/src/modules/`).

### Directory Layout

```text
server/src/
├── config/                        # Global singletons
│   ├── env.ts                     # Zod-validated environment variables
│   ├── prisma.ts                  # Singleton PrismaClient instance
│   └── socket.ts                  # Real-time WebSocket manager
│
├── shared/                        # THE SHARED KERNEL (Cross-cutting infrastructure)
│   ├── constants/                 # Enums: roles, portal types, HTTP status
│   ├── middleware/                # authenticateJWT, requireRole, validate, errorHandler
│   ├── utils/                     # apiResponse helper, password & token utilities
│   └── types/                     # Ambient Express types (req.user) & pagination
│
├── lib/
│   └── auth.ts                    # Better Auth server configuration & Prisma adapter
│
├── modules/                       # VERTICAL FEATURE SLICES
│   ├── auth/                      # Session management, password reset, portal auth
│   ├── users/                     # Delegated provisioning (DH & Company Rep), activation
│   ├── companies/                 # Company registration, MoUs, capacity publishing
│   ├── placements/                # Student requests, eligibility, company assignment
│   ├── reports/                   # Weekly logbooks, interim/final uploads, comments
│   ├── tasks/                     # Workplace & academic task assignment
│   ├── attendance/                # Student attendance records & monitoring
│   ├── defense/                   # Defense rooms, candidate timetables, rubric grading
│   ├── appeals/                   # Student appeals & status resolution
│   └── notifications/             # Notification dispatch (in-app & real-time)
│
├── app.ts                         # Express app configuration & middleware pipeline
├── routes.ts                      # Central API router mounting all module routers
└── server.ts                      # Server entry point
```

### Anatomy of a Backend Feature Module (`modules/<name>/`)

```text
server/src/modules/<module-name>/
├── <module-name>.routes.ts       # Express router with RBAC & Zod middleware attached
├── <module-name>.controller.ts   # HTTP Request/Response handling & ApiResponse wrapping
├── <module-name>.service.ts      # Core business logic, rules & Prisma database queries
├── <module-name>.validation.ts   # Zod request validation schemas (body, query, params)
├── <module-name>.types.ts        # Module-specific DTO interfaces & types
└── index.ts                      # Public boundary (exports router and public service)
```

---

## 4. Frontend Architecture (`client/`)

The frontend separates thin route pages (`app/`) from reusable design system primitives (`components/`) and vertical feature slices (`features/`).

### Directory Layout

```text
client/
├── app/                           # Next.js App Router (Routing & Layouts only)
│   ├── (auth)/                    # Route Group: Unauthenticated entry points
│   │   ├── layout.tsx             # Centered auth container
│   │   ├── login/page.tsx         # Portal chooser (University vs Partner)
│   │   ├── insider/login/page.tsx # University Portal Login
│   │   ├── partner/login/page.tsx # Industry Partner Portal Login
│   │   ├── forgot-password/page.tsx
│   │   └── reset-password/page.tsx
│   │
│   ├── (dashboard)/               # Route Group: Authenticated role portals
│   │   ├── layout.tsx             # App shell (Role-aware Sidebar + Topbar)
│   │   ├── department-head/       # Department Head views
│   │   ├── student/               # Student views
│   │   ├── mentor/                # Academic Advisor views
│   │   ├── company-rep/           # Industry Representative views
│   │   ├── supervisor/            # Industry Workplace Supervisor views
│   │   └── defense-committee/     # Defense Committee views
│   │
│   ├── api/auth/[...all]/route.ts # Better Auth Next.js API catch-all
│   ├── globals.css                # Tailwind CSS v4 design tokens
│   ├── layout.tsx                 # Root layout (Fonts, providers)
│   └── page.tsx                   # Landing page
│
├── components/                    # THREE-TIER REUSABLE COMPONENTS
│   ├── ui/                        # Tier 1: Design System Primitives (shadcn/ui)
│   │   ├── button.tsx, dialog.tsx, input.tsx, table.tsx, badge.tsx, card.tsx
│   ├── layout/                    # Tier 2: Application Shell
│   │   ├── app-sidebar.tsx, app-navbar.tsx, notification-bell.tsx
│   ├── feedback/                  # Status & Feedback Primitives
│   │   ├── loading-spinner.tsx, empty-state.tsx, error-boundary.tsx
│   └── auth/                      # Reusable Auth Widgets
│       └── role-guard.tsx         # Component-level RBAC wrapper
│
├── features/                      # VERTICAL FEATURE SLICES
│   ├── auth/                      # LoginForm, ResetPasswordForm
│   ├── users/                     # UserProvisioningForm, UserTable
│   ├── companies/                 # CompanyProfileCard, CapacityForm, MoUViewer
│   ├── placements/                # PlacementTable, AssignMentorModal
│   ├── reports/                   # WeeklyReportForm, ReviewFeedbackPanel
│   ├── tasks/                     # TaskAssignmentForm, TaskCard
│   ├── attendance/                # AttendanceSheet, AttendanceReportTable
│   ├── defense/                   # DefenseTimetable, RubricScoringSheet
│   └── appeals/                   # AppealForm, AppealStatusBadge
│
├── hooks/                         # Shared Custom React Hooks
│   ├── use-auth.ts, use-debounce.ts, use-disclosure.ts
│
├── lib/                           # Shared Utilities & Client Configuration
│   ├── api-client.ts              # Configured fetch wrapper with cookie credentials
│   ├── auth-client.ts             # Better Auth React client (useSession, signIn)
│   └── utils.ts                   # Tailwind cn() class merger & formatters
│
└── types/                         # Shared TypeScript Contracts
    ├── api.types.ts               # ApiResponse<T>, PaginatedResponse<T>, ApiError
    ├── auth.types.ts              # UserProfile, Role, PortalType, UserStatus
    └── common.types.ts            # PaginationParams, FilterEnums
```

### Anatomy of a Frontend Feature Slice (`features/<name>/`)

```text
client/features/<feature-name>/
├── components/                    # Feature-specific UI components
│   ├── <FeatureForm>.tsx          # React Hook Form + Zod input form
│   ├── <FeatureTable>.tsx         # Data display table
│   └── <FeatureDetailModal>.tsx   # Inspect / edit modal
├── api/                           # Network communication
│   └── <feature-name>.api.ts      # Functions calling /api/<feature> endpoints
├── hooks/                         # TanStack Query custom hooks
│   └── use<FeatureName>.ts        # Queries (fetching) and mutations (updating)
└── types/                         # Feature-specific DTOs & payloads
    └── <feature-name>.types.ts
```

---

## 5. 1:1 Feature Slice Alignment Matrix

Team members are assigned to vertical slices spanning both the backend and frontend:

| Feature Slice | Backend Module (`server/src/modules/`) | Frontend Feature (`client/features/`) | Primary System Actors |
| :--- | :--- | :--- | :--- |
| **Authentication** | `modules/auth/` | `features/auth/` | All 6 Roles |
| **User Management** | `modules/users/` | `features/users/` | Department Head, Company Rep |
| **Company & Capacity** | `modules/companies/` | `features/companies/` | Company Rep, Department Head |
| **Student Placement** | `modules/placements/` | `features/placements/` | Student, Department Head |
| **Weekly Reports** | `modules/reports/` | `features/reports/` | Student, Mentor, Supervisor |
| **Tasks & Assignments** | `modules/tasks/` | `features/tasks/` | Supervisor, Mentor, Student |
| **Attendance** | `modules/attendance/` | `features/attendance/` | Supervisor, Department Head |
| **Defense & Grading** | `modules/defense/` | `features/defense/` | Defense Committee, DH, Student |
| **Appeals & Inquiries** | `modules/appeals/` | `features/appeals/` | Student, Department Head |
| **Notifications** | `modules/notifications/` | `features/notifications/` | All 6 Roles |

---

## 6. Cross-Feature Communication Rules

### Backend:
1. **Public Interface (`index.ts`):** Module A must never import private controllers, queries, or services from `modules/B/service.ts`. Module B exports public helper functions in its `index.ts`.
2. **Database Relationships:** Modules link data via Prisma foreign keys (`studentId`, `companyId`, `mentorId`).
3. **Event Side-Effects:** Modules invoke the public `notifications` module service for async alerts.

### Frontend:
1. **The Rule of Two:** If a component, modal, or utility is needed by 2 or more features, it must not be copy-pasted. It must be elevated immediately to `components/ui/`, `components/feedback/`, `lib/utils.ts`, or `client/types/`.
2. **Centralized Client:** All API network calls must use `apiClient` from `@/lib/api-client` to guarantee consistent error handling and session cookie passing.
3. **Declarative RBAC:** Use `<RoleGuard allowedRoles={[...]}>` for showing/hiding action buttons based on user permissions.

---

## 7. Security & Pipeline Enforcement

```
[Client Next.js App]
       │
       ▼ (Edge Middleware verifies session cookies & portal access)
[HTTP Request via apiClient]
       │
       ▼
[Express Server: Helmet & CORS]
       │
       ▼
[Better Auth Wildcard: /api/auth/*] (Handles auth endpoints)
       │
       ▼
[authenticateJWT / Session Guard] (Verifies identity for protected /api/* routes)
       │
       ▼
[requireRole([...])] (Enforces RBAC against the 6 authorized roles)
       │
       ▼
[validate(zodSchema)] (Validates body, query, and params)
       │
       ▼
[Feature Controller] ──▶ [Feature Service] ──▶ [Prisma PostgreSQL]
       │
       ▼
[ApiResponse.success(res, data)] OR [Global errorHandler]
```
