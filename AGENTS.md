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

## 6. Git Hygiene for Agents

- **Do NOT** touch `.env` or commit API keys/passwords.
- **Do NOT** create arbitrary files or directories in the project root.
- Write clean, self-documenting code with clear variable and function names.
- Keep commits aligned with Conventional Commits: `feat(<module>): ...` or `fix(<module>): ...`.
