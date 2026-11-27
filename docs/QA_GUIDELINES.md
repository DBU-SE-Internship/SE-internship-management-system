# SEIMS Quality Assurance (QA) Guidelines & Testing Standards

This document establishes the official testing protocols, quality standards, and verification workflows for the **Software Engineering Internship Management System (SEIMS)**. 

In a team of 10 developing modular vertical slices, the QA team serves as the guardian of system integrity, stability, and security.

---

## 1. QA Role & Responsibilities

- **PR Verification:** Validate every Pull Request against functional requirements and acceptance criteria before it can be merged into `develop`.
- **RBAC Security Gatekeeping:** Rigorously verify that role permissions are strictly enforced (e.g. students cannot access advisor or administrative endpoints).
- **Test Artifact Maintenance:** Maintain shared Postman / Bruno / Thunder Client API test collections and end-to-end test scenarios.
- **Regression Testing:** Perform full system regression testing on `develop` prior to any milestone release to `main`.
- **Defect Tracking:** Log, document, and track bugs through resolution with reproducible steps.

---

## 2. Testing Levels & Scope

### A. API Contract Verification (REST)
Every backend endpoint must be tested against [docs/API_CONVENTIONS.md](./API_CONVENTIONS.md):
- **Envelope Compliance:** Verify all responses follow the `{ success: true, data: ... }` or `{ success: false, error: ... }` envelope.
- **HTTP Status Codes:** Ensure proper status codes are returned (e.g., `201` for creation, `400` for bad data, `401` for missing token, `403` for forbidden role, `404` for missing entity).
- **Zod Validation Errors:** Verify that malformed or incomplete request payloads return a clear `422` or `400` with field-level error messages.

### B. Role-Based Access Control (RBAC) Testing (Critical)
SEIMS has 7 distinct roles. Every vertical slice must undergo **Negative Authorization Testing**:

| Scenario | Role Tested | Endpoint / Feature | Expected Result |
| :--- | :--- | :--- | :--- |
| **Weekly Report Review** | `STUDENT` | `POST /api/reports/:id/feedback` | **403 Forbidden** (Only Advisor/Supervisor allowed) |
| **Capacity Approval** | `INDUSTRY_REP` | `PATCH /api/companies/:id/approve` | **403 Forbidden** (Only Dept Head / Admin allowed) |
| **Grade Consolidation** | `ACADEMIC_ADVISOR` | `POST /api/evaluations/consolidate` | **403 Forbidden** (Only Dept Head allowed) |
| **Weekly Report Submission** | `STUDENT` (Valid) | `POST /api/reports` | **201 Created** |

### C. Cross-Module Workflow Testing (Integration)
Verify complete end-to-end user journeys across modules:
1. **Placement Journey:** Industry registers -> Submits capacity -> Dept Head approves -> Student assigned -> Official assignment letter PDF generated.
2. **Weekly Monitoring Journey:** Student submits report -> Advisor receives notification -> Advisor reviews and requests revision -> Student resubmits -> Advisor marks approved.
3. **Defense & Evaluation Journey:** Industry supervisor submits evaluation -> Advisor submits mid-term and final evaluation -> Defense committee inputs defense rubric scores -> System aggregates final composite score.

### D. File Upload Boundary Testing
For all upload inputs (MoUs, weekly report attachments, defense decks):
- **Size Boundary:** Upload files > 5MB -> Must fail with user-friendly error message (`FILE_TOO_LARGE`).
- **File Format Boundary:** Upload `.exe`, `.sh`, `.png` where only `.pdf` or `.docx` is allowed -> Must fail with `INVALID_FILE_TYPE`.
- **Empty / Corrupt Files:** Upload 0-byte file -> Must fail cleanly without crashing the server (no unhandled 500 errors).

---

## 3. QA Pull Request (PR) Review Workflow

Every PR submitted by a developer follows this verification cycle:

```
[Developer Opens PR]
        │
        ▼
[QA Checks PR Description & Test Steps]
        │
   ┌────┴───────────────────────────┐
   ▼                                ▼
[Steps Missing / Incomplete]    [Steps Clear]
   │                                │
   ▼                                ▼
[Request Info from Dev]         [Checkout Branch & Run Tests]
                                    │
                       ┌────────────┴────────────┐
                       ▼                         ▼
                 [Bugs Found]             [All Tests Pass]
                       │                         │
                       ▼                         ▼
             [Comment Details &         [Approve PR & Check]
              Mark Changes Requested]    [QA Sign-off Box]
```

### Pull Request Testing Checklist:
1. **Check out the branch locally:**
   ```bash
   git fetch origin
   git checkout <branch-name>
   ```
2. **Inspect database impact:** If a Prisma migration is included, run `npx prisma migrate dev` in a test database.
3. **Execute Developer's Verification Steps:** Follow the exact steps provided in the PR description.
4. **Execute Negative & Edge Tests:** Attempt invalid inputs, empty fields, unauthorized roles, and boundary file uploads.
5. **Verify UI Responsiveness & Console:** Ensure no React hydration errors, unhandled promise rejections, or console warnings.

---

## 4. Bug Reporting Standards

When reporting an issue on GitHub or in PR review comments, use this standardized template:

```markdown
### 🐛 Bug Report: [Short, descriptive title]

- **Module:** [e.g., Weekly Reports / Placement]
- **Severity:** [Critical | Major | Minor | Cosmetic]
- **User Role Used:** [e.g., STUDENT, ACADEMIC_ADVISOR]

#### Steps to Reproduce:
1. Log in as user `student1@dbu.edu.et`
2. Navigate to `/reports/submit`
3. Upload a 6MB PDF file and submit

#### Expected Behavior:
Form should display an error alert: "File size exceeds the 5MB limit."

#### Actual Behavior:
The page freezes, and the server logs a 500 unhandled Multer exception.

#### Screenshots / Console Logs:
[Attach screenshot or terminal error stack]
```

### Bug Severity Definitions
- **Critical (P0):** Application crash, data loss, unhandled 500 errors, or security/RBAC bypass. Blocks PR merge immediately.
- **Major (P1):** Core feature does not work as specified; no workaround available. Blocks PR merge.
- **Minor (P2):** Feature works partially or non-critical edge case fails; workaround exists. Can be merged with follow-up task.
- **Cosmetic (P3):** UI alignment, typo, or minor styling inconsistency. Low priority.

---

## 5. QA Definition of Done (DoD) for Release

Before any milestone is merged from `develop` into `main`:
- [ ] 100% of P0 and P1 bugs are resolved and verified.
- [ ] All 7 user roles have undergone RBAC positive and negative permission tests.
- [ ] Shared Postman/Thunder Client regression suite passes with 0 failures.
- [ ] All PDF letter and report generation workflows output valid, readable documents.
- [ ] System runs with zero uncaught server exceptions in staging logs.
