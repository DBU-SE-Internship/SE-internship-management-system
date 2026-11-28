# SEIMS — AI Agent Instructions & Architectural Guardrails

> **Target Repository:** SEIMS (Software Engineering Internship Management System)  
> **Applies to:** All AI agents, assistants, and code generators (Cursor, Antigravity, Copilot, Claude, etc.) operating on this codebase.

---

## 1. Prime Directives for AI Agents

All AI agents assisting team members must strictly obey these non-negotiable rules:

1. **Strict Module Isolation (Vertical Slices):**
   - You must confine your work strictly to the feature module assigned by the developer:
     - Backend: `server/src/modules/<feature-name>/`
     - Frontend: `client/features/<feature-name>/`
   - **NEVER** import internal files, services, or controllers from another feature module. Cross-module communication must only occur through designated public interfaces, database foreign keys, or shared utilities in `common/`.
2. **Zero Unapproved Dependencies:**
   - **Do NOT** install or suggest new `npm` packages, libraries, or tools.
   - You must strictly use the approved stack documented in [`docs/TECH_STACK.md`](./docs/TECH_STACK.md).
3. **Mandatory REST Response Envelopes:**
   - Every Express backend controller must return the standardized envelopes defined in [`docs/API_CONVENTIONS.md`](./docs/API_CONVENTIONS.md).
   - Never return raw, un-enveloped JSON.
4. **No Destructive Database Migrations:**
   - Do **NOT** modify or delete existing fields/models in `prisma/schema.prisma` without explicit developer instructions.
   - When adding new models for your module, ensure relations are cleanly structured.
5. **No Public Self-Registration:**
   - Do **NOT** generate public sign-up/register pages or endpoints. SEIMS utilizes closed, delegated onboarding (Department Head provisions Students, Mentors, Companies; Company Rep provisions Supervisors).
6. **Strict TypeScript (No `any`):**
   - Always declare explicit types/interfaces for DTOs, request payloads, response data, and React component props.
   - Never use `any`.

---

## 2. Standardized Module Directory Structures

Every agent generating code must follow these exact file and folder conventions:

### Backend Structure (`server/src/modules/<module-name>/`)
```text
server/src/modules/<module-name>/
├── <module-name>.routes.ts       # Express Router with RBAC & validation middleware
├── <module-name>.controller.ts   # Request/response handlers (calls service, returns envelope)
├── <module-name>.service.ts      # Core business logic & Prisma database interactions
├── <module-name>.validation.ts   # Zod validation schemas for body, query, and params
└── <module-name>.types.ts        # TypeScript interfaces & inferred DTO types
```

### Frontend Structure (`client/features/<module-name>/`)
```text
client/features/<module-name>/
├── components/                   # Feature-specific UI components (forms, tables, cards)
│   ├── <ComponentName>.tsx
├── api/                          # Axios / fetch calls for this module
│   └── <module-name>.api.ts
├── hooks/                        # Custom React hooks & TanStack Query hooks
│   └── use<FeatureName>.ts
└── types/                        # Feature-specific TypeScript definitions
    └── <module-name>.types.ts
```

> **Shared UI Components:** Base design system primitives (Buttons, Dialogs, Inputs, Tables) live in `client/components/ui/` (shadcn/ui). Do not recreate basic UI elements inside feature folders.

---

## 3. REST API Contract & Envelope Enforcement

All Express route handlers must conform to the project conventions:

### Success Response Format:
```typescript
res.status(200).json({
  success: true,
  message: "Optional success message",
  data: result
});
```

### Paginated List Response Format:
```typescript
res.status(200).json({
  success: true,
  data: items,
  pagination: {
    page,
    limit,
    totalItems,
    totalPages,
    hasNextPage,
    hasPrevPage
  }
});
```

### Error Response Format (via Centralized Error Handler):
```typescript
res.status(statusCode).json({
  success: false,
  error: {
    code: "VALIDATION_ERROR" | "UNAUTHENTICATED" | "FORBIDDEN" | "NOT_FOUND" | "CONFLICT" | "INTERNAL_SERVER_ERROR",
    message: "Human-readable error description",
    details: validationErrors || []
  }
});
```

---

## 4. Input Validation Standard (Zod)

- All incoming request bodies, route params, and query strings must be validated using **Zod** middleware before reaching the controller.
- Example:
```typescript
export const createReportSchema = z.object({
  weekNumber: z.number().int().min(1).max(16),
  tasksCompleted: z.string().min(10),
  challengesFaced: z.string().optional(),
});

export type CreateReportDTO = z.infer<typeof createReportSchema>;
```

---

## 5. Security & Role-Based Access Control (RBAC)

The system supports 6 primary authenticated roles:
- `DEPARTMENT_HEAD`
- `STUDENT`
- `MENTOR`
- `COMPANY_REP`
- `SUPERVISOR`
- `DEFENSE_COMMITTEE`

When building endpoints or UI views:
1. Always protect Express endpoints with `authenticateJWT` and `requireRole([...])` middleware.
2. In the Next.js frontend, gate navigation and action buttons according to the active user's role.
3. Respect portal segregation:
   - **University Portal (Insiders):** Students, Mentors, Department Head, Defense Committee.
   - **Industry Partner Portal (Outsiders):** Company Representatives, Industry Supervisors.

---

## 6. Reusability, Shared Types & Code Quality Directives

To maintain a clean codebase across 10 developers, all agents must prioritize code reusability and adhere to these quality standards:

### A. Search Before Implementing (Zero Duplicate Components)
- **Always search before creating:** Before implementing any UI component, hook, or utility, check if it already exists:
  - Base UI Primitives: Check `client/components/ui/` (Buttons, Modals, Inputs, Tables, Badges, Tabs, Cards).
  - Feedback & Status: Check `client/components/feedback/` (Spinners, Empty States, Error Boundaries).
  - Shared Helpers: Check `client/lib/utils.ts` (`cn`, date formatters, enum formatters).
  - Reusable Types: Check `client/types/` (`api.types.ts`, `auth.types.ts`, `common.types.ts`).
- **Reuse first:** If a suitable component exists, import and extend it. **Never** create duplicate buttons, inputs, or modal containers inside feature folders.

### B. Promote Cross-Feature Elements (The Rule of Two)
- If a component, helper, or hook is needed by **two or more features**:
  - **Do NOT** copy-paste it between `client/features/A/` and `client/features/B/`.
  - Elevate it immediately to the shared level:
    - Shared UI $\rightarrow$ `client/components/ui/` or `client/components/feedback/`
    - Shared Utility $\rightarrow$ `client/lib/utils.ts`
    - Shared Hook $\rightarrow$ `client/hooks/`
    - Shared Type $\rightarrow$ `client/types/`

### C. Standardized Type Management
- **Shared Domain & API Types:** Enums (`Role`, `PortalType`, `UserStatus`), user profiles, pagination parameters, and API envelope wrappers (`ApiResponse<T>`, `PaginatedResponse<T>`) MUST be imported from `@/types/`. Never redeclare them locally.
- **Feature-Specific DTOs:** Types strictly unique to a single feature (e.g. `WeeklyReportSubmissionDTO`, `DefenseRubricScorePayload`) belong in `client/features/<module-name>/types/`.

### D. Centralized Infrastructure Usage
- **API Fetching:** Always use `apiClient` from `@/lib/api-client`. Do **NOT** use raw `fetch()` or separate axios instances.
- **Tailwind Class Merging:** Always use `cn(...)` from `@/lib/utils` for conditional class names. Never use string concatenation.
- **Role Gatekeeping:** Always use `<RoleGuard allowedRoles={[...]}>` from `@/components/auth/role-guard` to show/hide action buttons or widgets based on user permissions.
- **Authentication:** Use `useSession()`, `signIn`, and `signOut` from `@/lib/auth-client`.

### E. Frontend Quality & UX Best Practices
1. **Loading & Empty States:** Every data table or list must render a loading skeleton/spinner during fetching and a clean `<EmptyState />` when no records exist.
2. **Form Validation with Zod:** Every form must use `react-hook-form` paired with `@hookform/resolvers/zod`. Field-level error messages must be visible.
3. **Toast Notifications:** Provide user-friendly feedback on mutations (success notifications on create/update, clear error alerts on failure).

---

## 7. Git Hygiene for Agents

- **Do NOT** touch `.env` or commit API keys/passwords.
- **Do NOT** create arbitrary files or directories in the project root.
- Write clean, self-documenting code with clear variable and function names.
- Keep commits aligned with Conventional Commits: `feat(<module>): ...` or `fix(<module>): ...`.
