## Description
<!-- Provide a clear, concise summary of what this PR does and why it was created. -->

**Related Issue / User Story:** Closes #

---

## Module & Scope
- **Module(s) Affected:**
  - [ ] Auth & User Management
  - [ ] Industry & Partnerships
  - [ ] Student Placement & Allocation
  - [ ] Weekly Reports & Monitoring
  - [ ] Supervision & Defense Management
  - [ ] Evaluations & Grading
  - [ ] Core / Infrastructure (Shared UI, Database, Middleware)

- **Type of Change:**
  - [ ] `feat`: New feature (non-breaking change which adds functionality)
  - [ ] `fix`: Bug fix (non-breaking change which fixes an issue)
  - [ ] `refactor`: Code change that neither fixes a bug nor adds a feature
  - [ ] `docs`: Documentation update
  - [ ] `chore`: Tooling, configuration, or dependencies update

---

## Database & Environment Impact
- [ ] **Database Migration Required:** Does this PR include changes to `prisma/schema.prisma`?
- [ ] **Environment Variables:** Are new environment variables required in `.env`? (If yes, `.env.example` must be updated).

---

## Verification Steps for QA
<!-- Provide clear, reproducible instructions so QA can test your changes. -->
1. **User Role to test with:** (e.g., `STUDENT`, `ACADEMIC_ADVISOR`, `DEPARTMENT_HEAD`, `ADMIN`)
2. **Pre-conditions:** (e.g., Have a student registered and assigned to an industry)
3. **Step-by-step instructions:**
   - Step 1:
   - Step 2:
   - Step 3:
4. **Expected Result:** (What should happen if the feature works as intended?)
5. **Negative / Edge Case Test:** (What should happen on invalid input or unauthorized access?)

---

## Developer Self-Checklist
Before requesting review, please confirm:
- [ ] My branch is up to date with `develop`.
- [ ] Code follows the modular vertical-slice structure (no unauthorized inter-module coupling).
- [ ] TypeScript compiles cleanly with no type errors (`npm run build` or `npm run type-check`).
- [ ] No sensitive credentials, keys, or `.env` files are committed.
- [ ] My commits follow the Conventional Commits format (`feat(...)`, `fix(...)`, etc.).

---

## Sign-Offs & Approvals
- [ ] **Peer Reviewer:** Code reviewed and approved (clean code, architecture adhered).
- [ ] **QA Engineer:** Acceptance criteria and test steps verified.
- [ ] **Project Manager (PM):** Final review and approval to merge into `develop`.
