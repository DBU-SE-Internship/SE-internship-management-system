# SEIMS REST API Conventions & Standards

This document establishes the official REST API design standards, URL patterns, response structures, HTTP status codes, and error formats for the **Software Engineering Internship Management System (SEIMS)**.

All backend module developers must design their endpoints in accordance with these conventions. All frontend developers can rely on these contracts.

---

## 1. General Principles

1. **RESTful Resource Naming:**
   - Use nouns, not verbs (e.g., `/api/reports`, NOT `/api/getReports`).
   - Use lowercase, plural nouns for collection endpoints (e.g., `/api/companies`, `/api/placements`).
   - Use kebab-case for multi-word paths (e.g., `/api/weekly-reports`, `/api/defense-schedules`).
2. **Stateless Communication:**
   - Every request must include all necessary information to be processed.
   - Authentication must be passed via the `Authorization` HTTP header as a Bearer JWT token.
3. **Consistent JSON Envelopes:**
   - Every API response must return a standardized JSON structure with a `success` boolean.

---

## 2. Base URL & Routing Structure

All API routes must be prefixed with `/api` (or `/api/v1` for versioning):

```text
http://localhost:5000/api/<resource>
```

### Standard CRUD Route Patterns

| HTTP Method | Endpoint Pattern | Description | Success Status |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/<resources>` | List resources (supports pagination, filtering) | `200 OK` |
| **POST** | `/api/<resources>` | Create a new resource | `201 Created` |
| **GET** | `/api/<resources>/:id` | Retrieve a single resource by its ID | `200 OK` |
| **PUT** | `/api/<resources>/:id` | Full update / replacement of a resource | `200 OK` |
| **PATCH** | `/api/<resources>/:id` | Partial update (e.g. status transition) | `200 OK` |
| **DELETE** | `/api/<resources>/:id` | Delete / archive a resource | `200 OK` or `204 No Content` |

### Sub-Resource / Nested Patterns
When a resource only exists in the context of a parent resource:
- `GET /api/companies/:companyId/capacities` — List capacities for a specific company
- `POST /api/reports/:reportId/feedback` — Submit feedback on a specific weekly report
- `GET /api/students/:studentId/placements` — Retrieve placement details for a student

---

## 3. Standard Response Envelopes

Every response returned by the SEIMS API must follow one of the two standard envelope structures:

### A. Success Response (Single Resource / Operation)
```json
{
  "success": true,
  "message": "Student placement assigned successfully",
  "data": {
    "id": "clx123abc456",
    "studentId": "UGR/1234/14",
    "companyId": "comp-789",
    "status": "APPROVED",
    "createdAt": "2026-11-27T10:00:00.000Z"
  }
}
```

### B. Success Response (Paginated Collection)
When returning lists of data:
```json
{
  "success": true,
  "data": [
    {
      "id": "rep-001",
      "weekNumber": 1,
      "status": "SUBMITTED"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "totalItems": 48,
    "totalPages": 5,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

### C. Standard Error Response
When an error occurs, the API must return `success: false` and a descriptive `error` object:
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Input validation failed. Please check the submitted fields.",
    "details": [
      {
        "field": "weekNumber",
        "message": "Week number must be an integer between 1 and 16"
      },
      {
        "field": "tasksCompleted",
        "message": "Tasks completed description cannot be empty"
      }
    ]
  }
}
```

---

## 4. Standard HTTP Status Codes & Error Codes

### HTTP Status Codes

| Code | Status | Meaning in SEIMS |
| :--- | :--- | :--- |
| **200** | `OK` | Request succeeded; returned data or updated resource. |
| **201** | `Created` | Resource was successfully created (e.g., report submitted, user created). |
| **204** | `No Content` | Request succeeded with no content returned (e.g., successful deletion). |
| **400** | `Bad Request` | Malformed request syntax or business validation failure. |
| **401** | `Unauthorized` | Missing, expired, or invalid JWT authentication token. |
| **403** | `Forbidden` | User is authenticated, but lacks the necessary role permissions (RBAC). |
| **404** | `Not Found` | The requested resource (ID or route) does not exist. |
| **409** | `Conflict` | Resource conflict (e.g., duplicate email, company already registered). |
| **422** | `Unprocessable Entity` | Schema validation error (Zod parsing failure). |
| **500** | `Internal Server Error` | Unhandled server or database exception. |

### Standard Error Codes (`error.code`)
Use standard, uppercase machine-readable error codes:
- `UNAUTHENTICATED`: Bearer token missing or expired.
- `FORBIDDEN`: Role insufficient for this action.
- `NOT_FOUND`: Target entity was not found in database.
- `VALIDATION_ERROR`: Zod payload validation failed.
- `CONFLICT`: Unique constraint violation or conflicting state transition.
- `FILE_TOO_LARGE`: Uploaded attachment exceeds maximum size limit (e.g. 5MB).
- `INVALID_FILE_TYPE`: Uploaded attachment format is disallowed (only PDF, DOCX allowed).
- `INTERNAL_SERVER_ERROR`: Unexpected exception caught by global error middleware.

---

## 5. Authentication & RBAC Headers

Protected endpoints require the standard `Authorization` header:
```http
Authorization: Bearer <jwt_access_token>
```

### Express Middleware Example
```typescript
// Enforce Authentication
router.use(authenticateJWT);

// Enforce Role-Based Access Control
router.post(
  '/capacities',
  requireRole(['INDUSTRY_REP', 'ADMIN']),
  validateBody(capacitySchema),
  createCapacityHandler
);
```

---

## 6. Query Parameter Conventions

For list endpoints that support filtering, sorting, and pagination:

| Parameter | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `page` | `integer` | `1` | Current page number (1-indexed). |
| `limit` | `integer` | `10` | Number of items per page (max 100). |
| `sortBy` | `string` | `createdAt` | Field to sort results by. |
| `order` | `string` | `desc` | Sort direction (`asc` or `desc`). |
| `search` | `string` | `""` | Search query string (searches names, titles, IDs). |
| `status` | `string` | `undefined` | Filter by status enum (e.g. `PENDING`, `APPROVED`). |

### Example Query URL:
```text
GET /api/reports?page=2&limit=15&sortBy=weekNumber&order=asc&status=SUBMITTED
```

---

## 7. File Upload Conventions

For file attachments (MoUs, weekly PDF reports, defense slide decks):
- **Content-Type:** `multipart/form-data`
- **File Field Name:** `file` (or `attachment`)
- **Allowed Formats:** `.pdf`, `.docx`, `.doc`
- **Maximum File Size:** `5MB` (configured in Multer)

### Upload Success Response:
```json
{
  "success": true,
  "message": "File uploaded successfully",
  "data": {
    "fileUrl": "/uploads/reports/rep_1732704000_student123.pdf",
    "originalName": "Week_4_Report.pdf",
    "mimeType": "application/pdf",
    "sizeBytes": 204850
  }
}
```

---

## 8. Date & Time Format
All timestamps sent to or received from the API must be in **ISO-8601 UTC** format:
```text
"2026-11-27T11:19:33.000Z"
```
