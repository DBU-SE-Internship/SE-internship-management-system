# SEIMS – Functional Requirements for the Company Representative Module

## 1. Introduction

The Company Representative module enables authorized representatives of partner software companies to manage their company profiles, declare internship capacity, define student eligibility criteria, receive officially assigned students, manage industry supervisors, and monitor internship activities.

Only companies with a verified, pre-existing partnership agreement with Debre Berhan University are permitted to access and use this module.

## 2. Functional Requirements

The following functional requirements describe the operations that the SEIMS system shall provide to the Company Representative.

### FR-01: Company Representative Account Provisioning and Profile Management

- **FR-01-01:** The system shall allow the Department Head to register a Company Representative by providing their full name, official email address, contact information, and associated company.
- **FR-01-02:** The system shall allow the Department Head to associate the registered Company Representative with an existing, verified university–company partnership record.
- **FR-01-03:** The system shall generate and send an account activation invitation to the registered Company Representative through their official email address.
- **FR-01-04:** The system shall allow the Company Representative to activate their account and securely set up their login credentials.
- **FR-01-05:** The system shall require the Company Representative to complete their company profile, including company name, Commercial Registration/TIN, industry sector, office address, official website, and representative contact information.
- **FR-01-06:** The system shall allow the Company Representative to view and update their company profile information.
- **FR-01-07:** The system shall restrict access to internship management functionalities until the required company and partnership information has been verified.

### FR-02: Internship Capacity Management

- **FR-02-01:** The system shall allow the Company Representative to create an internship capacity announcement for each academic year or semester.
- **FR-02-02:** The system shall allow the Company Representative to specify the total number of students the company can accommodate during an internship cycle.
- **FR-02-03:** The system shall allow the Company Representative to save capacity announcements as drafts before submission.
- **FR-02-04:** The system shall allow the Company Representative to submit capacity announcements to the Department Head for review and approval.
- **FR-02-05:** The system shall allow the Company Representative to view the status of submitted announcements, including `DRAFT`, `SUBMITTED`, `APPROVED`, and `REVISION_REQUESTED`.

### FR-03: Student Selection Criteria Management

- **FR-03-01:** The system shall allow the Company Representative to define the minimum CGPA requirement for internship applicants.
- **FR-03-02:** The system shall allow the Company Representative to specify the required technical skills, programming languages, frameworks, and development tools.
- **FR-03-03:** The system shall allow the Company Representative to define gender-related allocation preferences or reserved slots in accordance with university policies.
- **FR-03-04:** The system shall allow the Company Representative to specify required certifications and prerequisite courses.
- **FR-03-05:** The system shall allow the Company Representative to define the internship work modality as On-site, Hybrid, or Remote.
- **FR-03-06:** The system shall allow the Company Representative to update selection criteria while the announcement is still in draft or has been returned for revision.

### FR-04: Student Placement and Assignment Information Management

- **FR-04-01:** The system shall allow the Company Representative to view the finalized list of students officially assigned to their company by the Department Head.
- **FR-04-02:** The system shall display relevant student information, including student name, student ID, assigned technical area, and placement status.
- **FR-04-03:** The system shall allow the Company Representative to access official university placement letters for assigned students.
- **FR-04-04:** The system shall notify the Company Representative when new students are assigned to their company.
- **FR-04-05:** The system shall prevent the Company Representative from independently adding, removing, or changing official student placements.

### FR-05: Industry Supervisor Management

- **FR-05-01:** The system shall allow the Company Representative to register industry supervisors by providing their full name, corporate email, technical position, and department or team.
- **FR-05-02:** The system shall allow the Company Representative to view the list of registered industry supervisors within their company.
- **FR-05-03:** The system shall allow the Company Representative to update industry supervisor information.
- **FR-05-04:** The system shall allow the Company Representative to deactivate or remove a supervisor from active service when necessary, while preserving historical assignment records.
- **FR-05-05:** The system shall provide authorized account access to registered Industry Supervisors.

### FR-06: Student–Supervisor Assignment Management

- **FR-06-01:** The system shall allow the Company Representative to assign officially placed students to registered Industry Supervisors.
- **FR-06-02:** The system shall allow the Company Representative to assign students individually or in groups to appropriate supervisors based on their technical areas.
- **FR-06-03:** The system shall allow the Company Representative to view current student–supervisor assignments.
- **FR-06-04:** The system shall allow the Company Representative to reassign students to another Industry Supervisor when necessary.
- **FR-06-05:** The system shall maintain the history of previous student–supervisor assignments.
- **FR-06-06:** The system shall notify the newly assigned Industry Supervisor and update the student's dashboard with the assigned supervisor's information.

### FR-07: Internship Monitoring and Coordination

- **FR-07-01:** The system shall allow the Company Representative to view an overview of students assigned to their company and their respective supervisors.
- **FR-07-02:** The system shall allow the Company Representative to monitor the status of weekly logbook reviews and industry evaluations conducted by supervisors.
- **FR-07-03:** The system shall display pending and overdue supervisor activities requiring attention.
- **FR-07-04:** The system shall allow the Company Representative to communicate with the Department Head regarding internship-related matters.
- **FR-07-05:** The system shall notify the Company Representative about important internship updates, requests, and coordination activities.

## 3. Access Control and Functional Restrictions

The system shall enforce role-based access control to ensure that the Company Representative performs only authorized operations.

| Operation | Company Representative Permission |
|---|---|
| Activate registered account | Allowed |
| Manage own company profile | Allowed |
| Create internship capacity announcements | Allowed |
| Define student selection criteria | Allowed |
| Submit announcements for approval | Allowed |
| Approve own capacity announcements | Not Allowed |
| View officially assigned students | Allowed |
| Access official placement letters | Allowed |
| Modify official student placements | Not Allowed |
| Register and manage industry supervisors | Allowed |
| Assign and reassign students to supervisors | Allowed |
| Monitor supervisor activities | Allowed |
| Enter or modify academic grades | Not Allowed |
| Participate in university defense scoring | Not Allowed |
| Access another company's records | Not Allowed |

## 4. Business Rules and Constraints

1. **Controlled Account Registration:** Only the Department Head or another authorized university administrator can register a Company Representative. Self-registration is not permitted.
2. **Partnership Verification:** A Company Representative must be associated with an existing, verified university–company partnership.
3. **Approval Separation:** The Company Representative can create and submit capacity announcements but cannot approve them. Only the Department Head has approval authority.
4. **Company Data Isolation:** The Company Representative can access and manage only records belonging to their associated company.
5. **Official Student Placement:** Only the Department Head or authorized university personnel can finalize and modify official student placements.
6. **Supervisor Assignment:** The Company Representative can assign officially placed students only to registered and active Industry Supervisors within their own company.
7. **Assignment History:** Previous student–supervisor assignments must be retained for historical reference and accountability.
8. **Academic Responsibility:** The Company Representative cannot enter academic grades, modify university evaluation results, or participate in defense committee scoring.
9. **Profile Verification:** Internship management functionalities shall remain restricted until the required company profile and partnership information have been verified.

## 5. Summary

The Company Representative module consists of seven main functional areas:

1. Company Representative Account Provisioning and Profile Management.
2. Internship Capacity Management.
3. Student Selection Criteria Management.
4. Student Placement and Assignment Information Management.
5. Industry Supervisor Management.
6. Student–Supervisor Assignment Management.
7. Internship Monitoring and Coordination.

These functional requirements define the responsibilities and permitted operations of the Company Representative within SEIMS, ensuring proper coordination between partner software companies and Debre Berhan University throughout the internship lifecycle.