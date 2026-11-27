# Contributing to SEIMS (Software Engineering Internship Management System)

Welcome to the **SEIMS** project! This project is being developed for the **Component Design** course by a multi-disciplinary team of software engineers, including dedicated Project Management (PM) and Quality Assurance (QA) leads.

To ensure our team of 10 collaborates smoothly without code collisions, merge conflicts, or communication breakdowns, all team members are required to follow the guidelines outlined in this document.

---

## Table of Contents
1. [Team Roles & Responsibilities](#1-team-roles--responsibilities)
2. [Git Workflow & Branching Strategy](#2-git-workflow--branching-strategy)
3. [Commit Message Conventions](#3-commit-message-conventions)
4. [Pull Request (PR) Lifecycle](#4-pull-request-pr-lifecycle)
5. [Definition of Done (DoD)](#5-definition-of-done-dod)
6. [Code & Architecture Guidelines](#6-code--architecture-guidelines)
7. [Handling Database & Schema Changes](#7-handling-database--schema-changes)

---

## 1. Team Roles & Responsibilities

- **Project Manager (PM):** Manages project milestones, sprint backlog, task assignments, and reviews PRs for alignment with requirements before merging to integration branches.
- **Quality Assurance (QA):** Verifies all PRs against acceptance criteria, validates Role-Based Access Control (RBAC), tests edge cases, and provides QA sign-offs.
- **Vertical Feature Developers:** Own their assigned feature slice end-to-end (backend API endpoints in `server/` and matching UI components in `client/`).
- **Core / Platform Developers:** Maintain foundational infrastructure: shared database schemas, authentication middleware, base UI layouts, and shared utility libraries.

---

## 2. Git Workflow & Branching Strategy

We use a modified **Trunk-Based / GitFlow Hybrid** branching strategy:

### Branch Structure
- **`main`**: Production & presentation-ready branch. Only the PM can merge into `main` after milestone completion and QA regression testing.
- **`dev`**: The active integration branch. All reviewed and QA-tested feature branches are merged here.
- **Feature Branches**: Created off `dev` for specific tasks, user stories, or bug fixes.

### Branch Naming Conventions
Always branch off the latest `dev`:
```bash
git checkout dev
git pull origin dev
git checkout -b <branch-name>
```

Branch naming patterns:
- **`module/<feature-name>`**: For all feature implementations and module developments.
  - *Examples:* `module/placement`, `module/reports`, `module/company-partnerships`, `module/auth`
- **`fix/<name>`**: For functionality fixes and bug repairs.
  - *Examples:* `fix/jwt-expiration`, `fix/report-upload`, `fix/evaluations-score`

---

## 3. Commit Message Conventions

We adhere to the [Conventional Commits](https://www.conventionalcommits.org/) specification. This keeps our git log readable and simplifies change tracking.

### Format
```text
<type>(<scope>): <imperative summary>

[optional body explaining WHY, not WHAT]

[optional footer(s) referencing issue number, e.g., Closes #12]
```

### Commit Types
- `feat`: A new feature for the user or system
- `fix`: A bug fix
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `style`: Changes that do not affect the meaning of the code (formatting, semicolon cleanup)
- `docs`: Documentation-only changes
- `test`: Adding missing tests or correcting existing tests
- `chore`: Maintenance tasks, dependencies updates, tooling configurations

### Allowed Scopes
Scopes must reflect the functional module or layer:
- `auth`
- `company`
- `placement`
- `reports`
- `supervision`
- `evaluations`
- `grievances`
- `db` (Prisma / schema changes)
- `client` (Client-wide / layout)
- `server` (Server-wide / middleware)

### Examples
- `feat(reports): add weekly report submission form with pdf upload`
- `fix(auth): correct token extraction in role-guard middleware`
- `chore(deps): update prisma client to latest patch`
- `docs(readme): add local environment setup instructions`

---

## 4. Pull Request (PR) Lifecycle

To maintain quality and stability, **no code is merged directly into `dev` or `main` without a Pull Request**.

### Steps to Submit a PR:
1. **Rebase or Merge `dev`:** Before opening a PR, ensure your branch is up-to-date with `dev`:
   ```bash
   git checkout dev
   git pull origin dev
   git checkout <your-branch>
   git merge dev
   ```
2. **Local Verification:** Verify that:
   - TypeScript compiles with zero errors (`npm run build` or `npm run type-check`).
   - The app runs cleanly without crashing.
   - Code is formatted.
3. **Open PR against `dev`:**
   - Use the pre-configured **Pull Request Template**.
   - Provide clear, step-by-step **QA Verification Steps** with test credentials/roles.
4. **Review & Sign-Off Requirement:**
   - **1 Peer Review:** Code review by another developer.
   - **QA Sign-off:** A QA team member verifies the acceptance criteria and test steps.
   - **PM Sign-off:** The PM gives the final approval and merges the PR.

---

## 5. Definition of Done (DoD)

A task or PR is considered **Done** only when:
- [ ] Code is isolated within the designated vertical module folder.
- [ ] TypeScript types are explicitly defined (avoid `any`).
- [ ] All API endpoints have input validation (e.g., Zod schemas).
- [ ] No secrets or personal credentials exist in the codebase.
- [ ] QA verification steps have been executed and passed by the QA team.
- [ ] PR template is fully completed with all required checkboxes checked.
- [ ] Approved by at least one peer reviewer, QA, and PM.

---

## 6. Code & Architecture Guidelines

### Vertical Slice Principle
- **Server:** Keep all routes, controllers, services, and validations inside your module folder (`server/src/modules/<feature-name>/`).
  - Do not import private helpers from another module. If shared functionality is needed, move it to `server/src/common/` or consult the team.
- **Client:** Keep feature-specific UI components, hooks, and API client calls inside `client/features/<feature-name>/`.
  - Shared design system elements (buttons, modals, inputs) belong in `client/components/ui/`.

### TypeScript Standard
- Strict type-checking is enabled.
- Avoid using `any`. Define DTO interfaces/types for request bodies and response payloads.

### Secret Management
- Never commit `.env` or any file containing passwords, database strings, or JWT secrets.
- Always update `.env.example` when adding a new required environment variable.

---

## 7. Handling Database & Schema Changes

Because `prisma/schema.prisma` is a shared resource across all modules:
1. **Never alter existing models without notifying the team and PM.**
2. When adding new models or relations for your module, announce the planned schema changes in the team communication channel.
3. Test your migration locally (`npx prisma migrate dev --name <migration_name>`).
4. Ensure the migration file is committed alongside your backend code.
5. Notify all team members to run `npx prisma migrate dev` after your PR is merged.
