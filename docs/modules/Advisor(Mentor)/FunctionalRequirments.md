# Functional Requirements Specification (Draft)

## Academic Advisor (Mentor) Module

> **Proposed requirements** — pending team approval

| Field | Details |
| :--- | :--- |
| **Module** | Academic Advisor Module |
| **Actor** | Academic Advisor (Mentor) |
| **Status** | Draft — Pending Team Approval |
| **Scope** | Dashboard, Student Management, Progress & Attendance Monitoring, Reports, Supervision Visits, Messaging & Notifications |

> **Note:** Like all other system actors, the Academic Advisor (Mentor) must also be able to log in and log out of the system.

---

## Table of Contents

- [FR-1: Dashboard](#fr-1-dashboard)
- [FR-2: Assigned Student Management](#fr-2-assigned-student-management)
- [FR-3: Internship Progress Monitoring](#fr-3-internship-progress-monitoring)
- [FR-4: Report Management](#fr-4-report-management)
- [FR-5: Attendance Monitoring](#fr-5-attendance-monitoring)
- [FR-6: Company Supervisor Communication](#fr-6-company-supervisor-communication)
- [FR-7: Internship Supervision Visit Management](#fr-7-internship-supervision-visit-management)
- [FR-8: Direct Messaging](#fr-8-direct-messaging)
- [FR-9: In-App Notifications](#fr-9-in-app-notifications)

---

## FR-1: Dashboard

| ID | Requirement |
| :--- | :--- |
| **FR-1.1** | The system shall display the total number of students assigned to the Academic Advisor. |
| **FR-1.2** | The system shall allow the Academic Advisor to navigate from the assigned-student count to the list of assigned students and access their individual profiles. |
| **FR-1.3** | The system shall display the number of weekly reports awaiting the Academic Advisor's review. |
| **FR-1.4** | The system shall display the next scheduled supervision visit and a countdown showing the remaining time until the visit. |

---

## FR-2: Assigned Student Management

| ID | Requirement |
| :--- | :--- |
| **FR-2.1** | The system shall display a list of students assigned to the Academic Advisor. |
| **FR-2.2** | The system shall allow the Academic Advisor to view each assigned student's individual profile and academic information. |
| **FR-2.3** | The system shall display each student's assigned company and Company Supervisor information in the student's profile. |
| **FR-2.4** | The system shall display each student's internship start date and end date. |
| **FR-2.5** | The system shall display the current internship status of each assigned student. |
| **FR-2.6** | The system shall allow the Academic Advisor to access a student's attendance records, submitted reports and supervision visit history through the student's profile. |

---

## FR-3: Internship Progress Monitoring

| ID | Requirement |
| :--- | :--- |
| **FR-3.1** | The system shall allow the Academic Advisor to monitor each assigned student's internship progress using submitted internship activities and progress reports. |
| **FR-3.2** | The system shall allow the Academic Advisor to view the internship activities completed by each student. |
| **FR-3.3** | The system shall identify students whose internship progress is delayed or insufficient. |
| **FR-3.4** | The system shall allow the Academic Advisor to provide feedback on a student's internship progress. |
| **FR-3.5** | The system shall allow the Academic Advisor to request additional progress information when the available information is insufficient. |

---

## FR-4: Report Management

| ID | Requirement |
| :--- | :--- |
| **FR-4.1** | The system shall allow the Academic Advisor to view weekly reports submitted by assigned students. |
| **FR-4.2** | The system shall allow the Academic Advisor to review the contents of each submitted weekly report. |
| **FR-4.3** | The system shall allow the Academic Advisor to add comments and corrections to a submitted report. |
| **FR-4.4** | The system shall allow the Academic Advisor to approve(Accept) a weekly report when it meets the required criteria(If needed it can reopen and make update i.e. approved means not final closing for that review ). |
| **FR-4.5** | The system shall allow the Academic Advisor to request revisions when a submitted weekly report requires corrections. |
| **FR-4.6** | The system shall allow the Academic Advisor to view submitted midterm and final internship reports, (based on departmental reporting requirements). |
| **FR-4.7** | The system shall allow the Academic Advisor to approve and digitally sign the final internship report after completing the final review.(It also based on department policies) |
| **FR-4.8** | The system shall allow the Academic Advisor to submit the approved and digitally signed final internship report to the department. |

---

## FR-5: Attendance Monitoring

| ID | Requirement |
| :--- | :--- |
| **FR-5.1** | The system shall automatically make attendance records entered by the Company Supervisor visible to the Academic Advisor assigned to the student. |
| **FR-5.2** | The system shall allow the Academic Advisor to view daily attendance records for assigned students. |
| **FR-5.3** | The system shall display weekly and monthly attendance summaries for each assigned student. |
| **FR-5.4** | The system shall allow the Academic Advisor to filter attendance records by student and date range. |
| **FR-5.5** | The system shall notify the Academic Advisor when an assigned student meets configured attendance warning conditions, such as repeated absences or lateness. |

---

## FR-6: Company Supervisor Communication

| ID | Requirement |
| :--- | :--- |
| **FR-6.1** | The system shall allow the Academic Advisor to view the contact information of each assigned student's Company Supervisor through the student's profile. |
| **FR-6.2** | The system shall allow the Academic Advisor to send requests to Company Supervisors for student internship progress updates. |
| **FR-6.3** | The system shall allow the Academic Advisor to receive and review progress updates submitted by Company Supervisors. |
| **FR-6.4** | The system shall allow the Academic Advisor to communicate with Company Supervisors about assigned students' internship progress and related challenges. |

---

## FR-7: Internship Supervision Visit Management

| ID | Requirement |
| :--- | :--- |
| **FR-7.1** | The system shall allow the Academic Advisor to create a company supervision visit schedule for assigned students. |
| **FR-7.2** | The system shall allow the Academic Advisor to select an assigned student and the corresponding Company Supervisor when scheduling a visit. |
| **FR-7.3** | The system shall allow the Academic Advisor to specify the proposed visit date and time. |
| **FR-7.4** | The system shall allow the Academic Advisor to specify the purpose of the supervision visit. |
| **FR-7.5** | The system shall automatically notify the corresponding Company Supervisor when a visit is scheduled. |
| **FR-7.6** | The system shall allow the Academic Advisor to view the Company Supervisor's response to a scheduled visit, including confirmation or a rescheduling request. |
| **FR-7.7** | The system shall allow the Academic Advisor to reschedule or cancel a previously scheduled visit. |
| **FR-7.8** | The system shall allow the Academic Advisor to record observations and findings after completing a supervision visit. |
| **FR-7.9** | The system shall allow the Academic Advisor to record problems identified and recommendations made during a supervision visit. |
| **FR-7.10** | The system shall allow the Academic Advisor to view previously completed supervision visit records. |

---

## FR-8: Direct Messaging

| ID | Requirement |
| :--- | :--- |
| **FR-8.1** | The system shall allow the Academic Advisor to initiate direct conversations with assigned students. |
| **FR-8.2** | The system shall allow the Academic Advisor to initiate direct conversations with Company Supervisors responsible for assigned students. |
| **FR-8.3** | The system shall allow the Academic Advisor to send and receive messages in an existing conversation. |
| **FR-8.4** | The system shall maintain conversation history between the Academic Advisor and each participant. |

---

## FR-9: In-App Notifications

| ID | Requirement |
| :--- | :--- |
| **FR-9.1** | The system shall notify the Academic Advisor when an assigned student submits a weekly or final internship report. |
| **FR-9.2** | The system shall notify the Academic Advisor when a Company Supervisor responds to a scheduled supervision visit. |
| **FR-9.3** | The system shall notify the Academic Advisor when an assigned student's attendance meets configured warning conditions. |
| **FR-9.4** | The system shall notify the Academic Advisor when a new message is received from an assigned student or Company Supervisor. |
| **FR-9.5** | The system shall allow the Academic Advisor to view received notifications and identify their related activities. |
