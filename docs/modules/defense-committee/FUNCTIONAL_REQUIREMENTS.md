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
    - Student Full Name and University Student ID (e.g., `DBU1601...`).
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

### DC-FR-05: Department Rubric Evaluation & Numerical Scoring
*Traceable to: Global `FR-DC-04`*

- **User Story:** As a Defense Committee member, I want to evaluate a candidate by inputting numerical marks against the department's evaluation rubric so that the student receives an accurate, objective score.
- **Detailed Description:**
  - The system dynamically displays the standardized evaluation rubric and criteria configured by the department.
  - For each rubric criterion defined by the department, the committee member enters an awarded numerical score.
  - Form Features & Validation:
    - Displays each criterion name, description, and maximum permissible score.
    - Validates that each entered score is a valid number within `[0, criterionMaxScore]`.
    - Real-time tallying: Automatically sums and calculates the total numerical grade as marks are entered.
    - Evaluator Remarks: Provides a feedback text area for written comments and evaluation notes regarding the defense.
- **Pre-conditions:** Candidate status is marked `Present` and the department rubric is loaded for the defense session.
- **Post-conditions:** Generates a defense evaluation record with itemized criterion scores and the calculated total numerical grade.

---

### DC-FR-06: Evaluation Finalization & Numerical Score Submission
*Traceable to: Global `FR-DC-04`*

- **User Story:** As a Defense Committee member, I want to finalize and submit my numerical evaluation so that the student's official defense marks are securely transmitted to the department.
- **Detailed Description:**
  - Evaluators review their itemized numerical scores and total calculated mark prior to final submission.
  - Submission Modes:
    - **Save as Draft:** Saves partial or working numerical scores during the defense presentation, allowing further edits.
    - **Final Submission:** Locks the evaluation sheet. Once submitted, the numerical marks become immutable, preventing further modification without explicit Department Head authorization.
- **Acceptance Criteria (QA):**
  - [ ] Cannot submit final evaluation without filling valid numerical scores for all active department rubric criteria.
  - [ ] Numerical scores strictly reject values less than 0 or greater than the maximum specified by the rubric.
  - [ ] Upon final submission, the score sheet transitions to a read-only state.
  - [ ] The submitted numerical grade is recorded and transmitted to the Department Head for final grade consolidation.

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
                                  │ totalScore (Numeric) │
                                  │ remarks              │
                                  │ isFinalized (Boolean)│
                                  │ submittedAt          │
                                  └──────────┬───────────┘
                                             │ 1
                                             │
                                             │ *
                                  ┌──────────┴───────────┐
                                  │    CriterionScore    │
                                  │──────────────────────│
                                  │ id                   │
                                  │ evaluationId         │
                                  │ criterionName        │
                                  │ scoreAwarded(Numeric)│
                                  │ maxScore (Numeric)   │
                                  └──────────────────────┘
```

---

## 4. Business Rules & Constraints

1. **Role Access Restriction:** Only authenticated faculty members designated as `DEFENSE_COMMITTEE` or `DEPARTMENT_HEAD` can access evaluation scoring forms.
2. **Numerical Scoring Standard:** Committee members award numerical scores based on the department rubric. The system calculates and aggregates the numerical scores submitted by committee members for departmental grade compilation.
3. **Score Immutability:** Once a committee member clicks "Final Submission", the score cannot be edited via the UI. Any modification requires an audit trail authorized by the Department Head.
4. **Prerequisite Check:** A student cannot be evaluated unless their final report has been approved by their academic mentor.

---

## 5. Module Requirements Traceability Matrix

| Module Requirement | Global Requirement ID | System Actor | QA Test Priority |
| :--- | :--- | :--- | :--- |
| **DC-FR-01** (Room & Session Allocation) | `FR-DC-01`, `FR-DH-07` | Defense Committee | P1 (High) |
| **DC-FR-02** (Candidate Schedule) | `FR-DC-03`, `FR-ST-11` | Defense Committee | P0 (Critical) |
| **DC-FR-03** (Deliverables & Document Review) | `FR-DC-02`, `FR-ST-04` | Defense Committee | P0 (Critical) |
| **DC-FR-04** (Candidate Attendance Verification) | `FR-DC-03`, `FR-DH-09` | Defense Committee | P1 (High) |
| **DC-FR-05** (Department Rubric Evaluation & Numerical Scoring) | `FR-DC-04` | Defense Committee | P0 (Critical) |
| **DC-FR-06** (Evaluation Finalization & Numerical Score Submission) | `FR-DC-04`, `FR-DH-06` | Defense Committee | P0 (Critical) |
