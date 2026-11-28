# Authentication & Access Control Module — Functional Requirements Specification

> **Module Name:** Authentication & Access Control (`auth`)  
> **Target System:** Software Engineering Internship Management System (SEIMS)  
> **Document Status:** Baseline Draft  

---

## 1. Module Overview

The **Authentication & Access Control Module** governs user identity verification, session lifecycle, role-based authorization (RBAC), and delegated user provisioning across SEIMS.

### 1.1 Core Architectural Principle: Zero Public Self-Registration
SEIMS is an institutional, multi-tenant academic platform with closed onboarding:
- **No public self-registration:** Users cannot sign up or create accounts on their own.
- **Delegated Provisioning:**
  - The **Department Head** provisions and registers all university-side users (**Students**, **Mentors**) as well as **Companies / Company Representatives**.
  - The **Company Representative** provisions and registers **Company Supervisors** for their respective organization.
  - The initial **Department Head** / System Administrator account is seeded during system deployment.

### 1.2 Dual Authentication Portals (Insiders vs. Outsiders)
To ensure clean credential separation, tailored branding, and security boundaries, the system provides two distinct authentication entry points:
1. **University Portal (Insiders):** Dedicated login for Debre Birhan University members:
   - Students
   - Mentors *(Academic Advisors)*
   - Department Head
   - Defense Committee Members
2. **Industry Partner Portal (Outsiders):** Dedicated login for external software industry partners:
   - Company Representatives
   - Industry Supervisors

---

## 2. Detailed Functional Requirements

### AUTH-FR-01: Dual-Portal User Authentication (Login)
*Traceable to: Global `FR-AUTH-01`, `FR-AUTH-04`*

- **User Story:** As an authorized SEIMS stakeholder, I want to log in through my designated portal (University or Industry Partner) so that I can access my role-specific dashboard securely.
- **Detailed Description:**
  - The frontend provides two dedicated login interfaces:
    - `/auth/university/login` (for Insiders)
    - `/auth/partner/login` (for Outsiders)
  - The system authenticates users using their unique identifier (University Email or Student ID for Insiders; Corporate Email for Outsiders) and password.
  - Validation & Rules:
    - Verifies that the user belongs to the portal through which they are logging in (e.g. an Industry Supervisor cannot log in through the University portal).
    - Checks that the user account status is `ACTIVE`. If the account is `INACTIVE` or `SUSPENDED`, access is denied with a descriptive alert.
    - Upon successful verification, generates and returns a cryptographically signed JWT access token and refresh token containing identity and role claims.
- **Acceptance Criteria (QA):**
  - [ ] Valid credentials on the correct portal issue a JWT containing `userId`, `role`, and `portalType`.
  - [ ] Logging in with valid credentials on the wrong portal fails with an authorization error.
  - [ ] Deactivated or inactive accounts are rejected with an explicit message to contact the department head or company representative.

---

### AUTH-FR-02: User Logout & Session Termination
*Traceable to: Global `FR-AUTH-01`*

- **User Story:** As an authenticated user, I want to log out of my session so that unauthorized users cannot access my account from my device.
- **Detailed Description:**
  - Users can initiate logout from any authenticated screen.
  - The client invalidates the stored access token and clears local session state.
  - The server invalidates the refresh token session to prevent replay attacks.
  - The user is redirected to the appropriate portal login landing page.

---

### AUTH-FR-03: Delegated User Provisioning by Department Head
*Traceable to: Global `FR-DH-03`, `FR-AUTH-02`*

- **User Story:** As the Department Head, I want to register students, academic mentors, and company representatives so that only officially recognized stakeholders have system access.
- **Detailed Description:**
  - The Department Head can access a secure user registration workspace with three distinct onboarding flows:
    1. **Register Student:**
       - Required Fields: Student University ID (e.g., `UGR/1234/14`), Full Name, University Email, Gender, Academic Year/Cohort, Phone Number.
    2. **Register Mentor (Academic Advisor):**
       - Required Fields: Staff ID, Full Name, University Email, Department, Phone Number.
    3. **Register Company & Representative:**
       - Required Fields: Company Legal Name, Office Address, Representative Full Name, Official Corporate Email, Position/Title, Contact Phone.
  - Provisioning Behavior:
    - System verifies uniqueness of Email and Student/Staff IDs.
    - Generates a secure, temporary default password and marks the account status as `PENDING_PASSWORD_CHANGE`.
    - Automatically sends an activation email / notification containing initial login instructions.
- **Pre-conditions:** Logged-in user has the `DEPARTMENT_HEAD` role.
- **Acceptance Criteria (QA):**
  - [ ] Non-Department Head users receive `403 Forbidden` if attempting to call registration endpoints.
  - [ ] Duplicate emails or IDs are rejected with `409 Conflict`.

---

### AUTH-FR-04: Delegated Supervisor Provisioning by Company Representative
*Traceable to: Global `FR-CR-04`, `FR-CR-05`, `FR-AUTH-02`*

- **User Story:** As a Company Representative, I want to register company supervisors under my organization so that they can manage and evaluate assigned interns.
- **Detailed Description:**
  - The Company Representative can access a supervisor management interface within the Industry Partner portal.
  - Required Fields: Supervisor Full Name, Corporate Email, Job Title / Engineering Role, Phone Number.
  - Provisioning Behavior:
    - The new supervisor account is automatically linked to the Company Representative's registered company ID.
    - System verifies that the supervisor's email is unique.
    - Generates initial temporary credentials with status `PENDING_PASSWORD_CHANGE`.
- **Pre-conditions:** Logged-in user has the `COMPANY_REP` role and their company profile is verified.
- **Acceptance Criteria (QA):**
  - [ ] Supervisors are strictly assigned to the company of the registering representative.
  - [ ] A Company Representative cannot view, edit, or provision supervisors belonging to other companies.

---

### AUTH-FR-05: Account Activation & Deactivation Management
*Traceable to: Global `FR-DH-10`, `FR-CR-05`*

- **User Story:** As an administrator (Department Head or Company Representative), I want to activate or deactivate accounts under my purview so that departed or suspended individuals cannot access the system.
- **Detailed Description:**
  - **Department Head Authority:** Can toggle account status (`ACTIVE` vs. `INACTIVE`) for Students, Mentors, and Company Representative accounts.
  - **Company Representative Authority:** Can toggle account status (`ACTIVE` vs. `INACTIVE`) for Company Supervisors within their own organization.
  - When an account is set to `INACTIVE`:
    - All existing active sessions are terminated.
    - Any subsequent login attempt is immediately rejected.
    - All API requests carrying existing tokens for that account return `401 Unauthorized` / `403 Forbidden`.

---

### AUTH-FR-06: First-Time Login Password Setup
*Traceable to: Global `FR-AUTH-01`, `FR-AUTH-02`*

- **User Story:** As a newly registered user logging in for the first time with a temporary password, I must set my own private password before accessing system features.
- **Detailed Description:**
  - When a user logs in with an account in `PENDING_PASSWORD_CHANGE` state:
    - The system intercepts the dashboard redirection and presents a mandatory **Set New Password** form.
    - The user must enter and confirm a new personal password.
    - Password Strength Requirements: Minimum 8 characters, containing letters and numbers.
    - Upon successful change, account status updates to `ACTIVE` and access to the dashboard is granted.

---

### AUTH-FR-07: Forgot Password & Password Recovery
*Traceable to: Global `FR-AUTH-03`*

- **User Story:** As a registered user who has forgotten my password, I want to request a secure password reset so that I can regain access without sharing credentials.
- **Detailed Description:**
  - Both University and Partner login pages provide a "Forgot Password" link.
  - The user inputs their registered email address.
  - System Security Handling:
    - To prevent user enumeration, the UI returns a generic confirmation message regardless of whether the email exists.
    - If the email is registered and active, a single-use, time-limited password reset token (valid for 15 minutes or less) is generated and dispatched via email.
    - The reset link directs the user to a secure password reset form where they can define a new password.
    - Once utilized or expired, the reset token is invalidated immediately.

---

### AUTH-FR-08: Role-Based Authorization & Protected Route Enforcement (RBAC)
*Traceable to: Global `FR-AUTH-01`*

- **User Story:** As a system stakeholder, I must only have access to resources and actions permitted by my assigned role so that institutional data privacy is preserved.
- **Detailed Description:**
  - Every API endpoint is protected by role-guard middleware matching the 6 authenticated roles:
    1. `DEPARTMENT_HEAD`
    2. `STUDENT`
    3. `MENTOR`
    4. `COMPANY_REP`
    5. `SUPERVISOR`
    6. `DEFENSE_COMMITTEE`
  - Any request lacking an authorized role token is rejected with `403 Forbidden`.

---

## 3. Data Requirements & Model Entities

```text
┌────────────────────────────────────────────────────────┐
│                          User                          │
│────────────────────────────────────────────────────────│
│ id                  : String (UUID / CUID)             │
│ identifier          : String (Student ID / Staff ID)   │
│ email               : String (Unique)                  │
│ passwordHash        : String                           │
│ fullName            : String                           │
│ phoneNumber         : String?                          │
│ portalType          : Enum (INSIDER, OUTSIDER)         │
│ role                : Enum (DH, STUDENT, MENTOR,       │
│                             COMPANY_REP, SUPERVISOR,   │
│                             DEFENSE_COMMITTEE)         │
│ status              : Enum (ACTIVE, INACTIVE,          │
│                             PENDING_PASSWORD_CHANGE)   │
│ companyId           : String? (For CR and Supervisor)  │
│ createdBy           : String? (User ID of provisioner) │
│ createdAt           : DateTime                         │
│ updatedAt           : DateTime                         │
└───────────────────────────┬────────────────────────────┘
                            │ 1
                            │
                            │ *
┌───────────────────────────┴────────────────────────────┐
│                   PasswordResetToken                   │
│────────────────────────────────────────────────────────│
│ id                  : String                           │
│ userId              : String                           │
│ tokenHash           : String (Unique)                  │
│ expiresAt           : DateTime (30 min window)         │
│ usedAt              : DateTime?                        │
└────────────────────────────────────────────────────────┘
```

---

## 4. Business Rules & Security Constraints

1. **Strictly Prohibited Self-Registration:** There are no public `/register` or `/signup` routes. Accounts exist solely through administrative provisioning by the Department Head or Company Representative.
2. **Password Security:** All passwords must be hashed using `bcrypt` (minimum 10 salt rounds) before storing in the database. Plaintext passwords must never be logged or stored.
3. **Portal Segregation:** Insider roles (`STUDENT`, `MENTOR`, `DEPARTMENT_HEAD`, `DEFENSE_COMMITTEE`) cannot authenticate via the Industry Partner portal, and outsider roles (`COMPANY_REP`, `SUPERVISOR`) cannot authenticate via the University portal.
4. **Brute Force Defense:** The authentication endpoints enforce rate-limiting (e.g. maximum 5 consecutive failed attempts per IP/account window before temporary lockout).
5. **Immediate Invalidation on Deactivation:** Changing an account status to `INACTIVE` immediately invalidates existing refresh tokens.

---

## 5. Module Requirements Traceability Matrix

| Module Requirement | Global Requirement ID | Responsible Actor | QA Test Priority |
| :--- | :--- | :--- | :--- |
| **AUTH-FR-01** (Dual-Portal Authentication) | `FR-AUTH-01`, `FR-AUTH-04` | All System Users | P0 (Critical) |
| **AUTH-FR-02** (Logout & Session Termination) | `FR-AUTH-01` | All System Users | P1 (High) |
| **AUTH-FR-03** (Dept Head User Provisioning) | `FR-DH-03`, `FR-AUTH-02` | Department Head | P0 (Critical) |
| **AUTH-FR-04** (Supervisor Provisioning) | `FR-CR-04`, `FR-CR-05` | Company Representative | P0 (Critical) |
| **AUTH-FR-05** (Account Activation / Deactivation) | `FR-DH-10`, `FR-CR-05` | Dept Head / Company Rep | P0 (Critical) |
| **AUTH-FR-06** (First-Time Password Change) | `FR-AUTH-01`, `FR-AUTH-02` | Newly Provisioned Users | P1 (High) |
| **AUTH-FR-07** (Forgot Password & Token Reset) | `FR-AUTH-03` | All System Users | P1 (High) |
| **AUTH-FR-08** (RBAC & Route Protection) | `FR-AUTH-01` | System Enforcement | P0 (Critical) |
