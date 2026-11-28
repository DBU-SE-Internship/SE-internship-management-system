# SEIMS Frontend Architecture & Folder Structure Specification

> **Target System:** Software Engineering Internship Management System (SEIMS)  
> **Frontend Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Better Auth  
> **Design Pattern:** Feature-Sliced Architecture (Vertical Slices + Centralized Design System)  

---

## 1. Architectural Goals & Core Pillars

To enable a 10-person engineering team to build UI features in parallel without merge conflicts, code duplication, or inconsistent design, the frontend is built upon five architectural pillars:

1. **Modularity (Vertical Feature Slices):** Each functional domain (`auth`, `placement`, `reports`, `defense`, etc.) encapsulates its own UI components, TanStack Query hooks, API requests, and types in `features/<feature-name>/`.
2. **Reusability (Three-Tier Component Hierarchy):**
   - **Tier 1 (Design System Primitives):** Unstyled, accessible primitives in `components/ui/` (Button, Dialog, Input, Table, Badge).
   - **Tier 2 (App Shell & Layouts):** Shared structural components in `components/layout/` (Role-Aware Sidebar, Topbar, Breadcrumbs, Notifications).
   - **Tier 3 (Feature-Specific Widgets):** Domain components in `features/<name>/components/` (e.g. `WeeklyReportForm`, `DefenseRubricCard`).
3. **Type Safety & Backend Alignment (`types/`):** Centralized type contracts matching backend Prisma models, Better Auth sessions, and REST API response envelopes.
4. **Security & Role-Based Gatekeeping:** Route-level protection via Next.js middleware, dual-portal segregation (Insiders vs. Outsiders), and declarative component-level RBAC guards (`<RoleGuard />`).
5. **Clean Data Fetching & Caching:** Standardized Axios HTTP client with automatic authentication token injection and TanStack Query (React Query) for automated caching and invalidation.

---

## 2. Comprehensive Directory Layout

```text
client/
├── app/                           # Next.js App Router (Routes & Layouts only)
│   ├── (auth)/                    # Route Group: Unauthenticated entry points
│   │   ├── layout.tsx             # Clean centered auth layout
│   │   ├── login/page.tsx         # Portal chooser (University vs Partner)
│   │   ├── insider/login/page.tsx # University Portal Login (Students, Mentors, DH, Defense)
│   │   ├── partner/login/page.tsx # Industry Partner Portal Login (Company Rep, Supervisors)
│   │   ├── forgot-password/page.tsx
│   │   └── reset-password/page.tsx
│   │
│   ├── (dashboard)/               # Route Group: Authenticated role dashboards
│   │   ├── layout.tsx             # Authenticated shell (Sidebar + Navbar + Auth Guard)
│   │   ├── department-head/       # Department Head views
│   │   ├── student/               # Student views
│   │   ├── mentor/                # Academic Advisor views
│   │   ├── company-rep/           # Industry Representative views
│   │   ├── supervisor/            # Industry Workplace Supervisor views
│   │   └── defense-committee/     # Defense Committee views
│   │
│   ├── api/auth/[...all]/route.ts # Better Auth Next.js API catch-all handler
│   ├── globals.css                # Tailwind CSS v4 styling & theme tokens
│   ├── layout.tsx                 # Root layout (Fonts, QueryProvider, ToastProvider)
│   └── page.tsx                   # Public landing page (Redirects to portal)
│
├── components/                    # SHARED UI & REUSABLE LAYOUTS
│   ├── ui/                        # Design System Primitives (shadcn/ui)
│   │   ├── button.tsx
│   │   ├── dialog.tsx             # Modals / Popups
│   │   ├── input.tsx
│   │   ├── table.tsx              # Base data tables
│   │   ├── badge.tsx              # Status chips (e.g. PENDING, APPROVED)
│   │   ├── card.tsx
│   │   ├── dropdown-menu.tsx
│   │   └── tabs.tsx
│   ├── layout/                    # Application Shell Components
│   │   ├── app-sidebar.tsx        # Role-filtered navigation links
│   │   ├── app-navbar.tsx         # User profile menu, portal indicator
│   │   ├── role-switcher.tsx      # Multi-role navigation (if applicable)
│   │   └── notification-bell.tsx  # In-app real-time notification drawer
│   ├── feedback/                  # Global status widgets
│   │   ├── loading-spinner.tsx
│   │   ├── empty-state.tsx
│   │   └── error-boundary.tsx
│   └── auth/                      # Reusable auth components
│       └── role-guard.tsx         # Declarative component RBAC wrapper
│
├── features/                      # VERTICAL FEATURE SLICES (Assigned to teams)
│   ├── auth/                      # Login forms, password reset forms
│   │   ├── components/            # LoginForm, ForgotPasswordForm
│   │   ├── api/                   # Auth API endpoints (calls Better Auth)
│   │   └── hooks/                 # useLoginMutation
│   ├── student/                   # Student profile, applications, tasks
│   ├── company/                   # Company profiles, MoUs, capacity forms
│   ├── placement/                 # Student allocation, assignment letters
│   ├── reports/                   # Weekly logbook submission, review comments
│   ├── tasks/                     # Task assignment & submission tracking
│   ├── attendance/                # Student attendance tracking sheets
│   └── defense/                   # Defense rooms, candidate timetable, rubric scoring
│
├── hooks/                         # SHARED REACT HOOKS
│   ├── use-auth.ts                # Session state & role check helpers
│   ├── use-debounce.ts            # Search input debouncing
│   └── use-disclosure.ts          # Modal open/close state management
│
├── lib/                           # SHARED UTILITIES & CLIENT CONFIG
│   ├── api-client.ts              # Configured Axios instance (JWT interceptors)
│   ├── auth-client.ts             # Better Auth React Client (`useSession`, `signIn`)
│   ├── utils.ts                   # Tailwind `cn()` helper, formatters
│   └── query-client.ts            # TanStack Query client & cache policies
│
└── types/                         # SHARED CONTRACTS & GLOBAL TYPES
    ├── api.types.ts               # Envelope types (ApiResponse, PaginatedResponse)
    ├── auth.types.ts              # User, Role, PortalType, UserStatus
    └── common.types.ts            # PaginationParams, SortOrder, FilterEnums
```

---

## 3. Anatomy of a Vertical Feature Slice (`features/<name>/`)

Each developer works primarily inside their assigned feature slice:

```text
client/features/<feature-name>/
├── components/                    # Feature-specific React components
│   ├── <FeatureForm>.tsx          # Data input forms (React Hook Form + Zod)
│   ├── <FeatureTable>.tsx         # Data display tables (TanStack Table)
│   └── <FeatureDetailModal>.tsx   # Inspect / edit popups
├── api/                           # HTTP network calls
│   └── <feature-name>.api.ts      # Axios functions interacting with /api/*
├── hooks/                         # Feature TanStack Query hooks
│   └── use<FeatureName>.ts        # Queries (fetching) and Mutations (creating/updating)
└── types/                         # Feature-specific DTOs and interfaces
    └── <feature-name>.types.ts
```

### Example: How a Page Uses Its Feature Slice
Pages in `client/app/(dashboard)/student/page.tsx` remain thin orchestrators:
```tsx
import { WeeklyReportsTable } from '@/features/reports/components/WeeklyReportsTable';
import { SubmitReportModal } from '@/features/reports/components/SubmitReportModal';

export default function StudentReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Weekly Internship Reports</h1>
        <SubmitReportModal />
      </div>
      <WeeklyReportsTable />
    </div>
  );
}
```

---

## 4. Shared Contracts & Repetitive Types (`client/types/`)

To prevent divergence between frontend and backend contracts, repetitive domain and API models live in `client/types/`:

### A. API Envelope Types (`client/types/api.types.ts`)
Matches backend envelopes defined in [`docs/API_CONVENTIONS.md`](./API_CONVENTIONS.md):
```typescript
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export interface ApiError {
  code: string;
  message: string;
  details?: Array<{ field: string; message: string }>;
}
```

### B. Core Auth & Actor Enums (`client/types/auth.types.ts`)
Matches backend Prisma enums and Better Auth sessions:
```typescript
export type Role =
  | 'DEPARTMENT_HEAD'
  | 'STUDENT'
  | 'MENTOR'
  | 'COMPANY_REP'
  | 'SUPERVISOR'
  | 'DEFENSE_COMMITTEE';

export type PortalType = 'INSIDER' | 'OUTSIDER';

export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'PENDING_PASSWORD_CHANGE';

export interface UserProfile {
  id: string;
  identifier: string;
  name: string;
  email: string;
  role: Role;
  portalType: PortalType;
  status: UserStatus;
  companyId?: string | null;
  phoneNumber?: string | null;
}
```

---

## 5. Security & Gatekeeping Architecture

### A. Route Protection via Middleware (`client/middleware.ts`)
Next.js Edge Middleware checks incoming requests against Better Auth session cookies:
1. **Unauthenticated Check:** If accessing `/department-head/*`, `/student/*`, etc. without a valid session, redirect to `/login`.
2. **Portal Segregation Check:**
   - Outsiders (`COMPANY_REP`, `SUPERVISOR`) cannot access University routes (`/student`, `/department-head`, `/mentor`, `/defense-committee`).
   - Insiders cannot access Industry Partner routes (`/company-rep`, `/supervisor`).
3. **Role Check:** Users attempting to access a dashboard route not matching their role are redirected to their assigned dashboard.

### B. Declarative Component Gatekeeping (`<RoleGuard />`)
For hiding action buttons or sensitive widgets inside a page:
```tsx
<RoleGuard allowedRoles={['DEPARTMENT_HEAD']}>
  <Button onClick={handleApproveCapacity}>Approve Capacity</Button>
</RoleGuard>
```

---

## 6. HTTP Client & Interceptors (`client/lib/api-client.ts`)

Axios is preconfigured with:
- `baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'`
- `withCredentials: true` (ensuring Better Auth cookies pass automatically)
- Response interceptor: Catches `401 Unauthorized` (triggers redirect to login) and formats error envelopes consistently.

---

## 7. Developer Rules for Frontend Collaboration

- [ ] **Primitive Reusability:** Always use or extend components in `components/ui/` before building custom buttons, inputs, or modal shells.
- [ ] **No Cross-Feature Leaks:** Do not import internal components from `features/feature-A/` into `features/feature-B/`. Share via `components/ui/` or `types/`.
- [ ] **TypeScript Strictness:** Never use `any`. Always type component props, API parameters, and response payloads.
- [ ] **Forms & Schemas:** Use React Hook Form with Zod schemas matching the backend validations.
