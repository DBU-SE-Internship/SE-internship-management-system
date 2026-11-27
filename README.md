# SEIMS - Software Engineering Internship Management System

> **Debre Birhan University**  
> **College of Computing | Department of Software Engineering**  
> **Course:** Component Design  
> **Group:** Group 3  

---

## 📌 Project Overview

The **Software Engineering Internship Management System (SEIMS)** is a centralized, web-based platform designed to automate, streamline, and coordinate the entire internship lifecycle for Debre Birhan University's Software Engineering Department.

Currently, internship coordination processes—such as industry partnership tracking, capacity verification, student placement, weekly logbook reviews, mid-term supervisions, and defense evaluations—are handled manually via paper forms, spreadsheets, and emails. SEIMS introduces a modular, role-based architecture to bring accountability, transparency, and efficiency to all stakeholders.

---

## 👥 System Actors (Roles)

SEIMS supports 7 primary stakeholders:

1. **System Administrator:** User provisioning, account activation, system configuration, and audit log monitoring.
2. **Department Head:** Departmental oversight, company capacity verification, final placement approval, and grade sign-off.
3. **Industry Representative:** Company profile registration, MoU management, and internship capacity announcements.
4. **Industry Supervisor:** Workplace guidance, task assignment, progress monitoring, and industry evaluation submission.
5. **Student:** Profile setup, placement acceptance, weekly log submissions, final report upload, and defense presentation.
6. **Academic Advisor:** Student guidance, weekly report feedback/approval, and mid-internship supervision.
7. **Defense Committee:** Final document examination, defense presentation assessment, and scoring.

---

## 🧩 Core Functional Modules (Vertical Slices)

The system is designed using a **Modular Component Architecture**, where features are organized into vertical slices:

- **🔐 Auth & User Management:** Secure JWT authentication, password management, and role-based access control (RBAC).
- **🏢 Industry & Partnership Management:** Industry registration, MoU verification, and internship capacity announcements.
- **📍 Student Placement & Allocation:** Eligibility checks, administrator-assisted student placement, assignment letters, and notifications.
- **📝 Weekly Monitoring & Reporting:** Weekly logbook submissions by students, feedback/approval workflow by advisors and supervisors.
- **📅 Supervision & Defense Management:** Mid-term supervision scheduling and documentation, final report submissions, and defense scheduling.
- **📊 Evaluation & Grade Consolidation:** Standardized evaluation rubrics (industry, advisor, defense) and automated departmental grade consolidation.
- **📬 Grievance & Complaints:** Student and supervisor complaint filing, assignment, and status tracking.

---

## 🛠 Tech Stack

- **Client:** [Next.js](https://nextjs.org/) (App Router), [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS](https://tailwindcss.com/)
- **Server:** [Node.js](https://nodejs.org/), [Express.js](https://expressjs.com/), [TypeScript](https://www.typescriptlang.org/)
- **Database & ORM:** [Prisma ORM](https://www.prisma.io/) with PostgreSQL (or SQLite for local dev)
- **API Architecture:** RESTful APIs with role-based middleware guards
- **Code Quality:** ESLint, Prettier, EditorConfig

---

## 📁 Repository Structure

```text
FinalProject/
├── .github/                     # GitHub PR & Issue templates
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── ISSUE_TEMPLATE/
├── client/                      # Next.js frontend application
│   ├── app/                     # App Router pages and layouts
│   ├── components/              # Shared UI design system
│   └── features/                # Vertical feature slices (components, hooks, api)
├── server/                      # Express backend application
│   ├── prisma/                  # Database schema & migrations
│   └── src/
│       ├── config/              # Database & env config
│       ├── middleware/          # Auth, RBAC & error handlers
│       └── modules/             # Vertical backend modules (routes, controllers, services)
├── docs/                        # Project documentation & team deliverables
│   ├── formal-documents/        # Original course proposals and formal specs
│   ├── standards/               # Shared project standards and guidelines
│   └── modules/                 # Module plans (Architectural Plan, Implementation Plan, Reports)
├── CONTRIBUTING.md              # Team workflow, branching strategy, commit rules
└── README.md                    # Project landing page
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v20.x or later recommended)
- **npm** or **yarn** / **pnpm**
- **Git**

### 1. Clone the Repository
```bash
git clone <repository-url>
cd FinalProject
```

### 2. Client Setup
```bash
cd client
npm install
npm run dev
```
The frontend will be available at `http://localhost:3000`.

### 3. Server Setup
```bash
cd server
npm install
# Set up your environment variables
cp .env.example .env
# Run Prisma migrations & start dev server
npx prisma migrate dev
npm run dev
```
The backend API will be available at `http://localhost:5000`.

---

## 🤝 Collaboration & Contribution

This project is developed by a 10-person engineering team adhering to strict professional standards:

- **Branching Strategy:**
  - `main`: Production / presentation branch.
  - `dev`: Active integration branch.
  - `feature/<feature-name>`: For new feature implementation.
  - `fix/<name>`: For bug fixes.
- **Commit Rules:** We strictly follow [Conventional Commits](https://www.conventionalcommits.org/) (e.g. `feat(auth): ...`, `fix(placement): ...`).
- **Review Process:** Every PR requires local verification, QA testing sign-off, and PM approval.

For detailed instructions, read [CONTRIBUTING.md](./CONTRIBUTING.md).

---

## 📄 License & Academic Integrity

This project is developed for educational purposes as part of the **Component Design** curriculum at Debre Birhan University. All rights reserved by Group 3.
