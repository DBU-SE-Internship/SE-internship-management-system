# Backend Folder Structure Proposals

This document outlines two proposed backend directory architectures for SEIMS (Express + TypeScript + Prisma) to support modularity, code reusability, maintainability, and clean team collaboration.

---

## Approach 1: Feature-First (Vertical Slices)

Everything related to a single business capability (routes, controllers, services, validation, types) lives together inside its own feature module folder.

```text
server/src/
├── config/                        # Global configs (env, prisma, socket)
│   ├── env.ts
│   ├── prisma.ts
│   └── socket.ts
│
├── shared/                        # Reusable cross-cutting kernel
│   ├── constants/                 # Roles, statuses, HTTP codes
│   ├── middleware/                # authMiddleware, rbacMiddleware, errorHandler
│   ├── utils/                     # apiResponse, password, token
│   └── types/                     # Global ambient types (express.d.ts)
│
├── modules/                       # Self-contained feature slices
│   ├── auth/
│   │   ├── auth.routes.ts
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── auth.validation.ts
│   │   ├── auth.types.ts
│   │   └── index.ts               # Public interface of module
│   ├── student/
│   │   ├── controllers/           # Supports multiple controllers if needed
│   │   │   ├── profile.controller.ts
│   │   │   └── report.controller.ts
│   │   ├── services/
│   │   │   ├── profile.service.ts
│   │   │   └── report.service.ts
│   │   ├── student.routes.ts
│   │   ├── student.validation.ts
│   │   └── index.ts
│   ├── defense/
│   │   ├── defense.routes.ts
│   │   ├── defense.controller.ts
│   │   ├── defense.service.ts
│   │   ├── defense.validation.ts
│   │   └── index.ts
│   ├── companies/
│   ├── placements/
│   └── notifications/
│
├── routes.ts                      # Mounts each module router
├── app.ts                         # Express app setup & global middleware
└── server.ts                      # HTTP & WebSocket server bootstrap
```

### Characteristics:
- **Pros:** High cohesion; all files for a feature are in one place; PR git diffs are strictly confined to one directory; easy to add or delete an entire feature.
- **Cons:** Less familiar to developers used to traditional MVC layouts.

---

## Approach 2: Layer-First with Module Subdirectories (Modular MVC)

The project is divided by technical layers (`routes/`, `controllers/`, `services/`, `validations/`), with dedicated feature subdirectories inside each layer.

```text
server/src/
├── config/                        # Global configs (env, prisma, socket)
│   ├── env.ts
│   ├── prisma.ts
│   └── socket.ts
│
├── routes/                        # Routing layer
│   ├── auth/
│   │   └── authRoutes.ts
│   ├── student/
│   │   ├── studentRoutes.ts
│   │   └── reportRoutes.ts        # Supports multiple sub-routes
│   ├── defense/
│   │   ├── defenseRoutes.ts
│   │   └── evaluationRoutes.ts
│   ├── company/
│   └── index.ts                   # Central route aggregator
│
├── controllers/                   # HTTP Request/Response layer
│   ├── auth/
│   │   └── authController.ts
│   ├── student/
│   │   ├── studentProfileController.ts
│   │   └── studentReportController.ts   # Supports multiple controllers
│   ├── defense/
│   │   ├── defenseRoomController.ts
│   │   └── defenseScoreController.ts
│   └── company/
│
├── services/                      # Business logic & Prisma DB operations
│   ├── auth/
│   │   └── authService.ts
│   ├── student/
│   │   ├── studentProfileService.ts
│   │   └── studentReportService.ts
│   ├── defense/
│   │   └── defenseService.ts
│   └── company/
│
├── validations/                   # Zod request validation schemas
│   ├── auth/
│   │   └── authValidation.ts
│   ├── student/
│   │   └── studentValidation.ts
│   └── defense/
│       └── defenseValidation.ts
│
├── middlewares/                   # Cross-cutting Express middlewares
│   ├── authMiddleware.ts
│   ├── rbacMiddleware.ts
│   ├── validateMiddleware.ts
│   └── errorHandler.ts
│
├── types/                         # Shared interfaces & Express ambient types
│   ├── express.d.ts
│   └── common.types.ts
│
└── utils/                         # Reusable utility functions
    ├── apiResponse.ts             # Standardized { success, data, error } envelopes
    ├── password.ts
    └── token.ts
```

### Characteristics:
- **Pros:** Highly intuitive and familiar to developers accustomed to Express MVC; clear technical layer separation; cleanly accommodates multiple controllers/services per module.
- **Cons:** More context switching across 4 top-level folders for a single feature; deleting/refactoring a feature touches 4 different directories.

---

## Verdict & Comparison

| Criteria | Approach 1: Feature-First (Vertical Slices) | Approach 2: Layer-First (Modular MVC) |
| :--- | :--- | :--- |
| **Familiarity** | Moderate (Domain-driven) | **High (Standard Express pattern)** |
| **Developer Navigation** | **Fast (Everything in 1 folder)** | Moderate (Jump between 3–4 folders) |
| **Multiple Controllers Support** | Supported via subfolders in module | **Naturally supported out of the box** |
| **Merge Conflict Risk** | **Very Low** (Features completely isolated) | **Low** (Isolated by subdirectories) |
| **Code Refactoring / Removal** | **Single folder deletion** | Delete subfolder in 4 separate layers |

### Summary Recommendation:
- Choose **Approach 1 (Feature-First)** if your team prioritizes self-contained feature ownership where each developer stays 100% inside their assigned module directory.
- Choose **Approach 2 (Layer-First)** if your team values standard Express MVC familiarity, as developers will instantly know where controllers, routes, and services live.
