# Database Schema (MongoDB + Mongoose)

Database name: `coursehub` (set by `MONGO_URI`). MongoDB adds a unique `_id` (ObjectId) to every document.

## Relationship diagram

```mermaid
erDiagram
    USER ||--o{ ENROLLMENT : "enrolls"
    COURSE ||--o{ ENROLLMENT : "has"
    USER ||--o{ LEARNING_PROGRESS : "tracks"
    COURSE ||--o{ LEARNING_PROGRESS : "measured in"
    USER ||--o{ NOTIFICATION : "receives"
    USER ||--o{ MESSAGE : "sends"
    USER ||--o{ MESSAGE : "receives"

    USER {
        ObjectId _id PK
        string name
        string email UK
        string password "bcrypt hash, select:false"
        string department
        string role "student | admin"
    }
    COURSE {
        ObjectId _id PK
        string slug UK
        string courseName
        string courseCode
        string instructor
        string duration
        string level
        string category
    }
    ENROLLMENT {
        ObjectId _id PK
        ObjectId student FK
        ObjectId course FK
        string status "active | completed | withdrawn"
    }
    LEARNING_PROGRESS {
        ObjectId _id PK
        ObjectId student FK
        ObjectId course FK
        number completedLessons
        number totalLessons
        number progressPercentage
    }
    NOTIFICATION {
        ObjectId _id PK
        ObjectId recipient FK
        string message
        boolean isRead
    }
    MESSAGE {
        ObjectId _id PK
        ObjectId sender FK
        ObjectId recipient FK
        string text
    }
```

## Collections

| Collection | Required fields | Constraints / indexes |
|---|---|---|
| `users` | name, email, password | `email` unique; `role` student/admin; password `select: false` |
| `courses` | slug, courseName | `slug` unique |
| `enrollments` | student, course | unique compound index `{ student, course }`; status active/completed/withdrawn |
| `learningprogresses` | student, course, totalLessons | unique compound index `{ student, course }` |
| `notifications` | recipient, message | message max 500; index `{ recipient, createdAt: -1 }` |
| `messages` | sender, recipient, text | text max 2000; index `{ sender, recipient, createdAt: -1 }` |