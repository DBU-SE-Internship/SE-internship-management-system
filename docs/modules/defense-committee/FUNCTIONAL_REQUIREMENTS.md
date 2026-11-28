# Defense Committee Module — Functional Requirements Specification

> **Module Name:** Defense Committee (`defense-committee`) 
> **Target System:** Software Engineering Internship Management System (SEIMS)  
> **Document Status:** Baseline Draft  

---

## 1. Module Overview

The **Defense Committee Module** provides defense evaluators and panel members with a dedicated, role-tailored workspace to manage defense schedules, access student final deliverables, verify defense venue/room assignments, and conduct standardized, rubric-based evaluations.

### 1.1 Objectives
- Provide defense committee members with clear visibility into their assigned defense rooms, schedules, and candidate rosters.
- Enable efficient online review of student final internship documents, project deliverables, and presentation decks prior to defense sessions.
- Standardize the oral defense evaluation process through a structured departmental scoring rubric.
- Ensure verifiable, tamper-evident scoring records that feed directly into the department's final grade consolidation.

### 1.2 Module Stakeholders & Interactions
- **Defense Committee Member (Primary User):** Views schedules/rooms, reviews student artifacts, and submits score sheets.
- **Department Head:** Creates defense rooms, schedules defense sessions, assigns committee panels, and reviews consolidated defense scores.
- **Student:** Uploads final internship reports and project artifacts, and views scheduled defense time slots and venues.

---

## 2. Detailed Functional Requirements

### DC-FR-01: Defense Room & Session Allocation Viewing
*Traceable to: Global `FR-DC-01`*

- **User Story:** As a Defense Committee member, I want to view my assigned defense room and session details so that I know where and when I am expected to conduct evaluations.
- **Detailed Description:**
  - The system must display a list of all defense rooms and sessions to which the logged-in committee member has been assigned.
  - Room details must include:
    - Room Name / Number (e.g., "Lab 3", "Conference Hall B", or Virtual Meeting Link).
    - Campus / Building location details.
    - Assigned session dates and time windows (e.g., "Morning Session: 08:30 – 12:30").
    - Panel composition (names and roles of fellow committee members assigned to the same room).
- **Pre-conditions:** The Department Head has created defense rooms and assigned the committee member to the room.
- **Post-conditions:** The committee member can see active and upcoming room assignments.

---

### DC-FR-02: Candidate Defense Schedule & Timetable
*Traceable to: Global `FR-DC-03`*

- **User Story:** As a Defense Committee member, I want to view the timetable of students presenting in my room so that I can prepare for each candidate in advance.
- **Detailed Description:**
  - The system must present an organized schedule of assigned candidates ordered by time slot.
  - For each scheduled defense, the timetable must display:
    - Scheduled date, start time, and end time (e.g., 09:00 – 09:45).
    - Student Full Name and University Student ID (e.g., `UGR/1234/14`).
    - Hosting Company / Organization name where the internship was undertaken.
    - Project / Internship Title.
    - Assigned Academic Mentor name.
    - Defense Status badge: `Scheduled`, `In Progress`, `Evaluated`, `Absent`, or `Rescheduled`.
  - Filters must be available for date, status, and search by student ID or name.
- **Pre-conditions:** Students have been scheduled into the room by the Department Head.
- **Acceptance Criteria (QA):**
  - [ ] Only students scheduled for the logged-in committee member's room are visible.
  - [ ] Time slots do not overlap within the same room.

---

### DC-FR-03: Student Project Deliverables & Document Review
*Traceable to: Global `FR-DC-02`*

- **User Story:** As a Defense Committee member, I want to inspect a student's final report, slides, and project repository before and during the defense so that I can rigorously assess their work.
- **Detailed Description:**
  - The system must provide direct, secure access to the candidate's submitted final materials:
    - **Final Internship Report:** In-browser PDF preview and download capability.
    - **Defense Presentation Slides:** Downloadable `.pdf` or `.pptx` deck.
    - **Project Artifacts / Source Code Link:** External repository URL (e.g. GitHub/GitLab) or hosted live demo link.
    - **Supervisor & Mentor Summary:** Contextual view showing that the academic mentor and company supervisor approved the report for defense.
- **Pre-conditions:** Candidate student has submitted final documents before the defense deadline.
- **Error Handling:** If documents are missing or late, the system flags the student profile with `Deliverables Incomplete`.
- **Acceptance Criteria (QA):**
  - [ ] Document viewer opens PDF reports without downloading locally if preferred.
  - [ ] External links validate standard URL protocols (`http://` or `https://`).

---

### DC-FR-04: Candidate Attendance & Defense Status Verification
*Traceable to: Global `FR-DC-03`, `FR-DH-09`*

- **User Story:** As a Defense Committee member, I want to record the candidate's attendance at the start of the session so that the department knows whether the defense took place.
- **Detailed Description:**
  - The committee panel must be able to mark candidate session status:
    - `Present`: Candidate attended and defense commenced.
    - `Absent`: Candidate failed to appear for the defense.
    - `Rescheduled`: Defense postponed due to extenuating circumstances.
- **Post-conditions:** Status change updates the Department Head dashboard in real time.

---

### DC-FR-05: Standardized Rubric Evaluation & Scoring
*Traceable to: Global `FR-DC-04`*

- **User Story:** As a Defense Committee member, I want to grade the student against predefined departmental criteria so that evaluations remain objective, transparent, and fair.
- **Detailed Description:**
  - The system must provide a standardized scoring sheet based on departmental evaluation criteria:
    1. **Presentation Quality & Communication (15%):** Clarity of slides, time management, verbal presentation.
    2. **Technical Understanding & Depth (25%):** Grasp of software engineering concepts, system architecture, methodology.
    3. **Practical Implementation / Project Demo (40%):** Functional completeness of the project, quality of artifacts, problem solved.
    4. **Q&A Defense & Critical Thinking (20%):** Ability to defend technical design choices and answer committee questions.
  - Form Features:
    - Real-time score tallying (calculates total percentage out of 100 as numbers are typed).
    - Validation prevents entering values outside the min/max bounds for each criterion.
    - Mandatory qualitative comments field: Evaluator remarks, identified strengths, and recommended improvements.
- **Pre-conditions:** Candidate status is marked `Present`.
- **Post-conditions:** Generates a defense evaluation record associated with the student, committee member, and session.

---

### DC-FR-06: Verdict Selection & Score Finalization
*Traceable to: Global `FR-DC-04`*

- **User Story:** As a Defense Committee member, I want to submit a final verdict along with the score so that the student's internship outcome is formally documented.
- **Detailed Description:**
  - Evaluators select a formal defense verdict:
    - `Pass`: Meets or exceeds all requirements.
    - `Pass with Minor Revisions`: Defense acceptable; minor documentation updates required within 7 days.
    - `Major Revisions / Re-defense`: Project or report inadequate; requires re-defense in a future session.
    - `Fail`: Unsatisfactory performance.
  - Submission Modes:
    - **Save as Draft:** Allows editing score inputs during the defense session.
    - **Final Submit:** Locks the score sheet. Once submitted, scores become immutable and can only be amended with formal Department Head authorization.
- **Acceptance Criteria (QA):**
  - [ ] Cannot submit final score sheet without filling all rubric criteria.
  - [ ] Once finalized, form inputs become read-only.
  - [ ] Consolidated score is calculated and transmitted to the Department Head grading portal.

---

## 3. Data Requirements & Model Entities

The Defense Committee module operates on the following core conceptual models:

```text
┌──────────────────────┐          ┌──────────────────────┐
│     DefenseRoom      │1        *│    DefenseSchedule   │
│──────────────────────│──────────│──────────────────────│
│ id                   │          │ id                   │
│ roomNumber / name    │          │ roomId               │
│ buildingLocation     │          │ studentId            │
│ date                 │          │ scheduledStartTime   │
│ sessionWindow        │          │ scheduledEndTime     │
└──────────────────────┘          │ status (SCHEDULED..) │
                                  └──────────┬───────────┘
                                             │ 1
                                             │
                                             │ *
                                  ┌──────────┴───────────┐
                                  │   DefenseEvaluation  │
                                  │──────────────────────│
                                  │ id                   │
                                  │ scheduleId           │
                                  │ evaluatorId (Faculty)│
                                  │ presentationScore    │
                                  │ technicalScore       │
                                  │ demoScore            │
                                  │ qnaScore             │
                                  │ totalScore           │
                                  │ verdict (PASS/FAIL)  │
                                  │ remarks              │
                                  │ isFinalized          │
                                  └──────────────────────┘
```

---

## 4. Business Rules & Constraints

1. **Role Access Restriction:** Only authenticated faculty members designated as `DEFENSE_COMMITTEE` or `DEPARTMENT_HEAD` can access evaluation scoring forms.
2. **Panel Independence:** If multiple committee members evaluate the same student, each member submits an independent evaluation score sheet. The system calculates the average score for department consolidation.
3. **Score Immutability:** Once a committee member clicks "Final Submit", the score cannot be edited via the UI. Any change requires an audit trail authorized by the Department Head.
4. **Prerequisite Check:** A student cannot be evaluated unless their final report has been approved by their academic mentor.

---

## 5. Module Requirements Traceability Matrix

| Module Requirement | Global Requirement ID | System Actor | QA Test Priority |
| :--- | :--- | :--- | :--- |
| **DC-FR-01** (Room & Session Allocation) | `FR-DC-01`, `FR-DH-07` | Defense Committee | P1 (High) |
| **DC-FR-02** (Candidate Schedule) | `FR-DC-03`, `FR-ST-11` | Defense Committee | P0 (Critical) |
| **DC-FR-03** (Deliverables & Document Review) | `FR-DC-02`, `FR-ST-04` | Defense Committee | P0 (Critical) |
| **DC-FR-04** (Candidate Attendance Verification) | `FR-DC-03`, `FR-DH-09` | Defense Committee | P1 (High) |
| **DC-FR-05** (Standardized Rubric Scoring) | `FR-DC-04` | Defense Committee | P0 (Critical) |
| **DC-FR-06** (Verdict & Score Finalization) | `FR-DC-04`, `FR-DH-06` | Defense Committee | P0 (Critical) |
