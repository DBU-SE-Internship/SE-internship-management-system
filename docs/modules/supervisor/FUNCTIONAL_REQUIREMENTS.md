# Functional Requirements Specification

## Workplace Supervisor Module

> **Aligned with:** Academic Advisor (Mentor) Draft Requirements & Supervisor Module Architecture

| Field | Details |
| :--- | :--- |
| **Module** | Workplace Supervisor Module |
| **Actor** | Workplace Supervisor (`SUPERVISOR`) |
| **Status** | Active Specification |
| **Scope** | Dashboard, Assigned Students, Task Management & Review, Grading , Daily Attendance & Absence Alerts, Final Report & Feedback, Advisor Progress Updates, Supervision Visit Responses, Direct Messaging & Notifications |

> **Note:** Like all other system actors, the Workplace Supervisor must also be able to log in and log out of the system securely via shared authentication.

---

## Table of Contents

- [FR-1: Dashboard](#fr-1-dashboard)
- [FR-2: Assigned Student Management](#fr-2-assigned-student-management)
- [FR-3: Task Assignment, Submission Review & Scoring](#fr-3-task-assignment-submission-review--scoring)
- [FR-4: Supervisor Evaluation & Percentage Calculation](#fr-4-supervisor-evaluation--percentage-calculation)
- [FR-5: Daily Attendance Management & Absence Alerts](#fr-5-daily-attendance-management--absence-alerts)
- [FR-6: Report Feedback & Final Internship Report](#fr-6-report-feedback--final-internship-report)
- [FR-7: Academic Advisor Progress Updates & Visibility](#fr-7-academic-advisor-progress-updates--visibility)
- [FR-8: Supervision Visit Responses](#fr-8-supervision-visit-responses)
- [FR-9: Direct Messaging with Academic Advisor](#fr-9-direct-messaging-with-academic-advisor)
- [FR-10: In-App Notifications](#fr-10-in-app-notifications)

---

## FR-1: Dashboard

| ID | Requirement |
| :--- | :--- |
| **FR-1.1** | The system shall display the total number of students currently assigned to the authenticated Workplace Supervisor. |
| **FR-1.2** | The system shall allow the supervisor to navigate from the dashboard summary cards directly to the assigned students list, pending task reviews, attendance records, and evaluations. |
| **FR-1.3** | The system shall display the count of student task submissions awaiting the supervisor's review. |
| **FR-1.4** | The system shall highlight assigned students who have reached the **5 total `ABSENT` days** threshold. |
| **FR-1.5** | The system shall display upcoming or pending company supervision visits scheduled by Academic Advisors, along with pending progress update requests and unread messages. |

---

## FR-2: Assigned Student Management

| ID | Requirement |
| :--- | :--- |
| **FR-2.1** | The system shall display the list of students assigned to the authenticated Workplace Supervisor by the Company Representative. |
| **FR-2.2** | The system shall prevent a supervisor from viewing or acting on any student not assigned to them through a valid placement. |
| **FR-2.3** | The system shall allow the supervisor to view each assigned student's permitted profile, academic details, assigned company, placement start/end dates, and current placement status. |
| **FR-2.4** | The system shall display the assigned Academic Advisor's contact information on the student's details view when available. |
| **FR-2.5** | The system shall allow the supervisor to access a student's assigned tasks, attendance history, evaluation progress, and final report status from the student's profile. |

---

## FR-3: Task Assignment, Submission Review & Scoring

| ID | Requirement |
| :--- | :--- |
| **FR-3.1** | The system shall allow the supervisor to create and assign internship tasks to an assigned student with a title, instructions, maximum score (`maxScore > 0`), and optional due date. |
| **FR-3.2** | The system shall allow the supervisor to edit task details before the student's final Supervisor evaluation is submitted. |
| **FR-3.3** | The system shall allow the supervisor to hard-delete a task created by mistake only when no student submissions or evaluations exist for that task. |
| **FR-3.4** | The system shall allow the supervisor to cancel a mistaken task (`CANCELLED`) before final evaluation submission, excluding it from score and percentage calculations while preserving history. |
| **FR-3.5** | The system shall expose supervisor-assigned tasks to the assigned student (separate from Academic Advisor tasks) and allow the supervisor to view student submissions and resubmission history. |
| **FR-3.6** | The system shall allow the supervisor to review a submitted task, communicate via feedback comments, and either approve/score it (`REVIEWED`) or return it for revision (`RETURNED`). |
| **FR-3.7** | The system shall allow the supervisor to award a task score bounded by `0 <= awardedScore <= maxScore` and edit the awarded score while the student's final evaluation remains in `DRAFT`. |
| **FR-3.8** | The system shall maintain at most one active evaluation per task so that student resubmissions update the task's evaluation without double-counting scores. |

---

## FR-4: Supervisor Evaluation & Percentage Calculation

| ID | Requirement |
| :--- | :--- |
| **FR-4.1** | The system shall calculate `totalMaxScore` on the backend by summing `maxScore` across all active (non-`CANCELLED`) tasks assigned to the student for the placement. |
| **FR-4.2** | The system shall treat any active task that is unsubmitted, unreviewed, or unrevised as `0` in `totalAwardedScore`. |
| **FR-4.3** | The system shall calculate the Supervisor's percentage (`0.00–100.00%`) using `(totalAwardedScore / totalMaxScore) * 100` on the backend and block final submission if `totalMaxScore` is `0`. |
| **FR-4.4** | The system shall display an itemized evaluation preview showing each active task's score (including `0` for unsubmitted tasks), excluded `CANCELLED` tasks, and the calculated percentage. |
| **FR-4.5** | The system shall allow the supervisor to submit and lock the final Supervisor evaluation (`SUBMITTED`), preventing further edits to task scores or the evaluation unless reopened through an approved workflow. |
| **FR-4.6** | The system shall make the submitted Supervisor evaluation percentage visible to the student and available for final grade consolidation. |

---

## FR-5: Daily Attendance Management & Absence Alerts

| ID | Requirement |
| :--- | :--- |
| **FR-5.1** | The system shall allow the supervisor to record daily attendance for assigned students using the statuses `PRESENT`, `ABSENT`, `LATE`, and `EXCUSED`, with an optional remark. |
| **FR-5.2** | The system shall enforce at most one attendance record per student, placement, and date, and allow the supervisor to update previously recorded entries. |
| **FR-5.3** | The system shall display attendance history and support filtering by student, status, and date range, as well as weekly and monthly summaries. |
| **FR-5.4** | The system shall strictly count cumulative total `ABSENT` records per placement (excluding `LATE` and `EXCUSED`) and flag the student when `totalAbsentDays >= 5` so the Department Head can review and deactivate the student. |
| **FR-5.5** | The system shall automatically make attendance records entered by the supervisor visible to the assigned Student and assigned Academic Advisor, and emit attendance warning notifications when configured thresholds (such as `5` `ABSENT` days or repeated lateness/absences) are met. |

---

## FR-6: Report Feedback & Final Internship Report

| ID | Requirement |
| :--- | :--- |
| **FR-6.1** | The system shall allow the supervisor to view student reports (where shared with supervisors) and add comments and feedback for assigned students. |
| **FR-6.2** | The system shall allow the supervisor to draft a **Final Internship Report** for an assigned student placement containing completion summary, tasks overview, attendance overview, strengths, areas for improvement, and recommendation. |
| **FR-6.3** | The system shall allow the supervisor to edit a `DRAFT` Final Internship Report and submit it (`SUBMITTED`) to the Department Head after the student finishes the internship. |
| **FR-6.4** | The system shall make submitted Final Internship Reports visible to the Department Head and lock them against silent edits after submission. |

---

## FR-7: Academic Advisor Progress Updates & Visibility

| ID | Requirement |
| :--- | :--- |
| **FR-7.1** | The system shall make each assigned student's weekly progress on supervisor-assigned tasks (task statuses, submission progress, scores, and attendance summaries) visible to the student's Academic Advisor. |
| **FR-7.2** | The system shall allow the supervisor to receive and view internship progress update requests sent by an assigned student's Academic Advisor. |
| **FR-7.3** | The system shall allow the supervisor to submit a progress update response to the requesting Academic Advisor so the advisor can review the student's current workplace progress. |

---

## FR-8: Supervision Visit Responses

| ID | Requirement |
| :--- | :--- |
| **FR-8.1** | The system shall allow the supervisor to view company supervision visits scheduled by Academic Advisors for assigned students, including the proposed date, time, purpose, and advisor details. |
| **FR-8.2** | The system shall allow the supervisor to respond to a scheduled supervision visit by either **confirming** the schedule or submitting a **rescheduling request** with a proposed alternative or reason. |
| **FR-8.3** | The system shall make the supervisor's visit response immediately visible to the scheduling Academic Advisor and support viewing updated/cancelled visit schedules. |

---

## FR-9: Direct Messaging with Academic Advisor

| ID | Requirement |
| :--- | :--- |
| **FR-9.1** | The system shall allow the supervisor to receive and view direct conversations initiated by Academic Advisors responsible for the supervisor's assigned students. |
| **FR-9.2** | The system shall allow the supervisor to initiate and reply to direct messages with the assigned student's Academic Advisor regarding internship progress and workplace challenges. |
| **FR-9.3** | The system shall maintain conversation history between the Workplace Supervisor and each Academic Advisor. |

---

## FR-10: In-App Notifications

| ID | Requirement |
| :--- | :--- |
| **FR-10.1** | The system shall notify the supervisor when an assigned student submits or resubmits a task. |
| **FR-10.2** | The system shall notify the supervisor when an Academic Advisor schedules, reschedules, or cancels a company supervision visit. |
| **FR-10.3** | The system shall notify the supervisor when an Academic Advisor sends a progress update request or a new direct message. |
| **FR-10.4** | The system shall trigger notifications to the relevant stakeholders when the supervisor assigns a task, reviews/returns a task with feedback, records a student reaching **5 total `ABSENT` days** (or attendance warnings), responds to a supervision visit, submits the final evaluation, or submits the Final Internship Report. |
| **FR-10.5** | The system shall allow the supervisor to view received notifications and navigate directly to the related student, task, visit, request, or message. |
