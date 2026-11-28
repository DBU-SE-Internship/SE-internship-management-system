# SEIMS Functional Requirements Specification

This document details the functional requirements for the **Software Engineering Internship Management System (SEIMS)** based directly on the approved baseline specifications. 

Requirements are grouped by actor and functional area with unique identifiers (`FR-<SCOPE>-<ID>`) to support traceability across development, testing, and QA verification.

---

## 1. System Actors

The functional requirements cover the following primary system actors:
1. **Department Head (DH)**
2. **Student (ST)**
3. **Mentor (MN)** *(Academic Advisor)*
4. **Company Representative (CR)**
5. **Supervisor (SP)** *(Industry Workplace Supervisor)*
6. **Defense Committee (DC)**

---

## 2. Functional Requirements by Actor

### 2.1 Department Head (`FR-DH`)

| ID | Requirement | Description |
| :--- | :--- | :--- |
| **FR-DH-01** | **Login** | The Department Head can securely log in to the system using authorized credentials. |
| **FR-DH-02** | **Logout** | The Department Head can securely log out and terminate their active session. |
| **FR-DH-03** | **Register Stakeholders** | The Department Head can register new students, mentors, and companies in the system. |
| **FR-DH-04** | **Assign Students to Company** | The Department Head can assign students to an approved company for their internship. |
| **FR-DH-05** | **Assign Mentor for Students** | The Department Head can assign an academic mentor to each student. |
| **FR-DH-06** | **Assign Defense Committee** | The Department Head can assign faculty members to serve on the defense committee for students. |
| **FR-DH-07** | **Create Defense Rooms** | The Department Head can create and configure defense rooms (physical or virtual slots) for scheduled defenses. |
| **FR-DH-08** | **Mentor Management** | The Department Head can manage mentor profiles, allocations, and mentor-related settings. |
| **FR-DH-09** | **Students Attendance Management** | The Department Head can view, monitor, and manage student attendance records. |
| **FR-DH-10** | **Activate / Deactivate Users** | The Department Head can activate or deactivate mentor and student accounts. |
| **FR-DH-11** | **Manage Partnerships** | The Department Head can manage institutional partnership records with software industry companies. |

---

### 2.2 Student (`FR-ST`)

The Student is a primary actor in SEIMS responsible for participating in the
internship process, requesting available internship opportunities, completing
assigned tasks, submitting internship reports, and fulfilling academic
internship requirements.

#### 2.2.1 Student Functional Requirements

| ID | Requirement | Description |
| :--- | :--- | :--- |
| **FR-ST-01** | **Student Registration** | The system shall allow only the Department Head to register students by providing their required academic and personal information. |
| **FR-ST-02** | **Login** | The Student shall be able to securely log in using registered account credentials. |
| **FR-ST-03** | **Manage Profile and Account Settings** | The Student shall be able to view and update permitted personal information and change their account password. |
| **FR-ST-04** | **Logout** | The Student shall be able to securely terminate their active session. |
| **FR-ST-05** | **View Available Internship Opportunities** | The Student shall be able to view internship opportunities announced by Company Representatives and approved and published by the Department Head. Information shall include company details, available positions, eligibility criteria, requirements, and application deadlines. |
| **FR-ST-06** | **Request Internship Placement** | The Student shall be able to submit an internship placement request to the Department Head based on their interests, qualifications, and the published internship requirements. |
| **FR-ST-07** | **View Placement Request Status** | The Student shall be able to track the status and decisions of submitted internship placement requests. |
| **FR-ST-08** | **View Assigned Internship Placement** | The Student shall be able to view the officially assigned internship company and placement details determined by the Department Head. |
| **FR-ST-09** | **View Assigned Academic Advisor** | The Student shall be able to view information about their assigned academic advisor (Mentor). |
| **FR-ST-10** | **View Assigned Industry Supervisor** | The Student shall be able to view information about their assigned industry workplace Supervisor. |
| **FR-ST-11** | **View Assigned Tasks** | The Student shall be able to view tasks assigned by the industry Supervisor, including descriptions, instructions, deadlines, and task status. |
| **FR-ST-12** | **Submit Weekly Internship Reports** | The Student shall be able to prepare and electronically submit weekly internship reports describing completed activities, assigned tasks, challenges, and progress for independent review by the academic advisor and industry Supervisor. |
| **FR-ST-13** | **Submit Final Internship Documents** | The Student shall be able to upload and submit required final internship documents to the assigned academic advisor for review and approval before the defense. |
| **FR-ST-14** | **View Industry Supervisor Feedback** | The Student shall be able to view feedback, comments, corrections, and recommendations independently provided by the industry Supervisor regarding assigned tasks, reports, and workplace performance. |
| **FR-ST-15** | **View Academic Advisor Feedback** | The Student shall be able to view feedback, comments, corrections, and recommendations independently provided by the academic advisor regarding academic progress, weekly reports, and final documents. |
| **FR-ST-16** | **View Official Grades and Evaluation Results** | The Student shall be able to view evaluation results, marks, and final grades submitted by the industry Supervisor, academic advisor, and defense committee only after official publication by authorized department personnel. |
| **FR-ST-17** | **Submit Appeals** | The Student shall be able to submit appeals against decisions concerning internship placement, evaluation, grades, or other internship-related determinations and track their resolution status. |
| **FR-ST-18** | **View Internship Schedules** | The Student shall be able to view internship-related schedules, including supervision visits, report submission deadlines, final document submission deadlines, and defense dates. |
| **FR-ST-19** | **Receive Notifications** | The Student shall receive system notifications regarding placement decisions, assignments, task updates, report feedback, document reviews, published grades, appeals, and important internship schedules. |

#### 2.2.2 Student Dashboard

The system shall provide Students with a centralized dashboard containing:

1. Internship application and placement status.
2. Assigned company and industry Supervisor information.
3. Assigned academic advisor information.
4. Assigned tasks and deadlines.
5. Weekly report submission status.
6. Academic advisor and industry Supervisor feedback.
7. Final document submission and review status.
8. Officially published evaluation results and grades.
9. Internship supervision and defense schedules.
10. Notifications and appeal status.

#### 2.2.3 Student Access Restrictions

- Students shall only access their own internship records and academic information.
- Students shall not register their own accounts.
- Students shall not approve their own placement requests.
- Students shall not modify submitted evaluations or grades.
- Students shall only access grades after official publication.
- Students shall only access information and operations authorized by their assigned system role.

---

### 2.3 Mentor (`FR-MN`)

| ID | Requirement | Description |
| :--- | :--- | :--- |
| **FR-MN-01** | **Login** | The Mentor can securely log in using authorized credentials. |
| **FR-MN-02** | **Logout** | The Mentor can securely log out and end their active session. |
| **FR-MN-03** | **View Assigned Students & Companies** | The Mentor can view a list of all assigned students along with their respective hosting companies. |
| **FR-MN-04** | **See Weekly & Final Reports** | The Mentor can access and view submitted weekly reports and final internship reports for assigned students. |
| **FR-MN-05** | **View Student Analytics** | The Mentor can view analytics on student work and engagement at the company. |
| **FR-MN-06** | **Add Comments to Reports** | The Mentor can review student reports and add feedback/comments. |
| **FR-MN-07** | **Get Notifications** | The Mentor receives system notifications for student submissions, assignments, and updates. |
| **FR-MN-08** | **Assign Task for Review** | The Mentor can assign review tasks or follow-up items for students to complete. |

---

### 2.4 Company Representative (`FR-CR`)

| ID | Requirement | Description |
| :--- | :--- | :--- |
| **FR-CR-01** | **Login** | The Company Representative can securely log in using their credentials. |
| **FR-CR-02** | **Logout** | The Company Representative can securely log out and terminate their session. |
| **FR-CR-03** | **Publish Company Capacity** | The Company Representative can publish the company's internship capacity, including the number of needed students and qualification criteria. |
| **FR-CR-04** | **Assign Supervisor for Students** | The Company Representative can assign an industry workplace supervisor to assigned students. |
| **FR-CR-05** | **Manage Supervisors** | The Company Representative can add, update, and manage company supervisors within their organization. |
| **FR-CR-06** | **View Assigned Students & Company** | The Company Representative can view students assigned to their company. |
| **FR-CR-07** | **Get Notifications** | The Company Representative receives notifications on student assignments, status updates, and communications. |

---

### 2.5 Supervisor (`FR-SP`)

| ID | Requirement | Description |
| :--- | :--- | :--- |
| **FR-SP-01** | **Login** | The Industry Supervisor can securely log in to the system. |
| **FR-SP-02** | **Logout** | The Industry Supervisor can securely log out of the system. |
| **FR-SP-03** | **Give Tasks for Students** | The Industry Supervisor can create and assign daily or weekly workplace tasks to students. |
| **FR-SP-04** | **View Assigned Students** | The Industry Supervisor can view all students under their workplace supervision. |
| **FR-SP-05** | **Add Comments to Reports** | The Industry Supervisor can review student reports and provide comments and feedback. |
| **FR-SP-06** | **Get Notifications** | The Industry Supervisor receives system notifications for student submissions and assignments. |
| **FR-SP-07** | **Take Attendance of Students** | The Industry Supervisor can record and manage regular attendance for assigned students. |
| **FR-SP-08** | **Send Reports to Department Head** | The Industry Supervisor can submit supervisor progress and assessment reports directly to the Department Head. |

---

### 2.6 Defense Committee (`FR-DC`)

| ID | Requirement | Description |
| :--- | :--- | :--- |
| **FR-DC-01** | **View Assigned Room** | The Defense Committee member can view their assigned defense room and venue details. |
| **FR-DC-02** | **View Assigned Student's Documents & Project** | The Defense Committee member can access and inspect assigned students' submitted documents, final reports, and project materials. |
| **FR-DC-03** | **View Defense Schedule** | The Defense Committee member can view the scheduled timetable and defense dates for students. |
| **FR-DC-04** | **Evaluate & Grade Students** | The Defense Committee member can evaluate student defenses and assign grades/marks based on standardized departmental evaluation criteria. |

---

## 3. Authentication & Access Control Requirements (`FR-AUTH`)

| ID | Requirement | Description |
| :--- | :--- | :--- |
| **FR-AUTH-01** | **Login** | Secure authentication and session initiation for all authorized system users. |
| **FR-AUTH-02** | **Register** | Account creation flow for designated stakeholders. |
| **FR-AUTH-03** | **Forgot Password** | Secure password reset and recovery mechanism for registered accounts. |
| **FR-AUTH-04** | **Dual Authentication Portals** | Dedicated, separate authentication entry points for **Insiders** (DBU members: Students, Mentors, Department Head, Defense Committee) and **Outsiders** (Company Partners: Company Representatives, Supervisors). |

---

## 4. Requirements Summary Matrix

| Requirement Area | DH | ST | MN | CR | SP | DC |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **Authentication (Login / Logout / Forgot Password)** | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **Separate Auth Portal (Insiders vs. Outsiders)** | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **Registration (Students, Mentors, Companies)** | ✓ | | | | | |
| **Company Capacity & Criteria Publishing** | | | | ✓ | | |
| **Student Company Request / Application** | | ✓ | | | | |
| **Student Assignment to Company** | ✓ | | | | | |
| **Supervisor Management & Assignment** | | | | ✓ | | |
| **Mentor Assignment & Management** | ✓ | | | | | |
| **Task Assignment & Tracking** | | ✓ | ✓ | | ✓ | |
| **Report Submission (Interim / Final / Weekly)** | | ✓ | | | | |
| **Report Review & Comments** | | | ✓ | | ✓ | |
| **Student Attendance Management** | ✓ | | | | ✓ | |
| **Student Analytics & Work Progress** | | | ✓ | | | |
| **Supervisor Reports to Dept Head** | | | | | ✓ | |
| **Defense Committee & Room Assignment/Creation** | ✓ | | | | | |
| **Defense Room & Documents Viewing** | | | | | | ✓ |
| **Defense Evaluation & Grading** | | | | | | ✓ |
| **Academic & Defense Schedules** | | ✓ | | | | ✓ |
| **Grades / Marks Viewing** | | ✓ | | | | |
| **Appeals Against Decisions** | | ✓ | | | | |
| **Partnership Management** | ✓ | | | | | |
| **User Activation / Deactivation** | ✓ | | | | | |
| **Notifications** | | ✓ | ✓ | ✓ | ✓ | |
