# 🧪 API Testing Guide

Complete guide for testing all API endpoints using various tools.

## 📋 Table of Contents

- [Using cURL](#using-curl)
- [Using Postman](#using-postman)
- [Using Thunder Client (VS Code)](#using-thunder-client)
- [Test Scenarios](#test-scenarios)

---

## 🔧 Using cURL

### 1. Register a New User

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Expected Response:**

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": 1,
      "username": "john_doe",
      "email": "john@example.com",
      "created_at": "2024-02-12T07:30:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### 2. Login User

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Expected Response:**

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": 1,
      "username": "john_doe",
      "email": "john@example.com",
      "created_at": "2024-02-12T07:30:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Save the token for subsequent requests!**

### 3. Get User Profile

```bash
curl -X GET http://localhost:5000/api/auth/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 4. Create a Task

```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title": "Complete project documentation",
    "description": "Write comprehensive README and API docs"
  }'
```

**Expected Response:**

```json
{
  "success": true,
  "message": "Task created successfully",
  "data": {
    "id": 1,
    "user_id": 1,
    "title": "Complete project documentation",
    "description": "Write comprehensive README and API docs",
    "completed": false,
    "created_at": "2024-02-12T08:00:00.000Z",
    "updated_at": "2024-02-12T08:00:00.000Z"
  }
}
```

### 5. Get All Tasks

```bash
curl -X GET http://localhost:5000/api/tasks \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 6. Get Single Task

```bash
curl -X GET http://localhost:5000/api/tasks/1 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 7. Update a Task

```bash
curl -X PUT http://localhost:5000/api/tasks/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title": "Updated task title",
    "description": "Updated description",
    "completed": true
  }'
```

### 8. Toggle Task Completion

```bash
curl -X PATCH http://localhost:5000/api/tasks/1/toggle \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 9. Delete a Task

```bash
curl -X DELETE http://localhost:5000/api/tasks/1 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 📮 Using Postman

### Setup

1. **Create a new Collection** named "Task Management API"
2. **Add Environment Variables:**
   - `base_url`: `http://localhost:5000`
   - `token`: (will be set after login)

### Authentication Endpoints

#### 1. Register User

- **Method:** POST
- **URL:** `{{base_url}}/api/auth/register`
- **Headers:**
  - `Content-Type`: `application/json`
- **Body (raw JSON):**

```json
{
  "username": "jane_doe",
  "email": "jane@example.com",
  "password": "securepass123"
}
```

- **Tests (to save token):**

```javascript
if (pm.response.code === 201) {
  const response = pm.response.json();
  pm.environment.set("token", response.data.token);
}
```

#### 2. Login User

- **Method:** POST
- **URL:** `{{base_url}}/api/auth/login`
- **Headers:**
  - `Content-Type`: `application/json`
- **Body (raw JSON):**

```json
{
  "email": "jane@example.com",
  "password": "securepass123"
}
```

- **Tests (to save token):**

```javascript
if (pm.response.code === 200) {
  const response = pm.response.json();
  pm.environment.set("token", response.data.token);
}
```

#### 3. Get Profile

- **Method:** GET
- **URL:** `{{base_url}}/api/auth/profile`
- **Headers:**
  - `Authorization`: `Bearer {{token}}`

### Task Endpoints

#### 1. Create Task

- **Method:** POST
- **URL:** `{{base_url}}/api/tasks`
- **Headers:**
  - `Content-Type`: `application/json`
  - `Authorization`: `Bearer {{token}}`
- **Body (raw JSON):**

```json
{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread, and vegetables"
}
```

#### 2. Get All Tasks

- **Method:** GET
- **URL:** `{{base_url}}/api/tasks`
- **Headers:**
  - `Authorization`: `Bearer {{token}}`

#### 3. Get Single Task

- **Method:** GET
- **URL:** `{{base_url}}/api/tasks/1`
- **Headers:**
  - `Authorization`: `Bearer {{token}}`

#### 4. Update Task

- **Method:** PUT
- **URL:** `{{base_url}}/api/tasks/1`
- **Headers:**
  - `Content-Type`: `application/json`
  - `Authorization`: `Bearer {{token}}`
- **Body (raw JSON):**

```json
{
  "title": "Buy groceries - Updated",
  "description": "Milk, eggs, bread, vegetables, and fruits",
  "completed": true
}
```

#### 5. Toggle Task Completion

- **Method:** PATCH
- **URL:** `{{base_url}}/api/tasks/1/toggle`
- **Headers:**
  - `Authorization`: `Bearer {{token}}`

#### 6. Delete Task

- **Method:** DELETE
- **URL:** `{{base_url}}/api/tasks/1`
- **Headers:**
  - `Authorization`: `Bearer {{token}}`

---

## ⚡ Using Thunder Client (VS Code)

### Setup

1. Install Thunder Client extension in VS Code
2. Create a new Collection: "Task Management"
3. Set Environment:
   - `base_url`: `http://localhost:5000`
   - `token`: (set after login)

### Quick Test Sequence

1. **Register** → Copy token from response
2. **Login** → Copy token from response
3. **Create Task** → Use token in header
4. **Get All Tasks** → Verify task created
5. **Toggle Task** → Check completion status
6. **Delete Task** → Verify deletion

---

## 🧪 Test Scenarios

### Scenario 1: Complete User Journey

```bash
# 1. Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@test.com","password":"test123"}'

# 2. Login (save the token)
TOKEN=$(curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}' \
  | jq -r '.data.token')

# 3. Create multiple tasks
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"title":"Task 1","description":"First task"}'

curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"title":"Task 2","description":"Second task"}'

# 4. Get all tasks
curl -X GET http://localhost:5000/api/tasks \
  -H "Authorization: Bearer $TOKEN"

# 5. Toggle first task
curl -X PATCH http://localhost:5000/api/tasks/1/toggle \
  -H "Authorization: Bearer $TOKEN"

# 6. Update second task
curl -X PUT http://localhost:5000/api/tasks/2 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"title":"Updated Task 2","description":"Updated","completed":true}'

# 7. Delete first task
curl -X DELETE http://localhost:5000/api/tasks/1 \
  -H "Authorization: Bearer $TOKEN"
```

### Scenario 2: Error Testing

#### Test Invalid Registration

```bash
# Missing fields
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test"}'
# Expected: 400 Bad Request with validation errors

# Invalid email
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"invalid","password":"test123"}'
# Expected: 400 Bad Request

# Short password
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@test.com","password":"123"}'
# Expected: 400 Bad Request
```

#### Test Invalid Login

```bash
# Wrong password
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"wrongpass"}'
# Expected: 401 Unauthorized

# Non-existent user
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"nonexistent@test.com","password":"test123"}'
# Expected: 401 Unauthorized
```

#### Test Unauthorized Access

```bash
# No token
curl -X GET http://localhost:5000/api/tasks
# Expected: 401 Unauthorized

# Invalid token
curl -X GET http://localhost:5000/api/tasks \
  -H "Authorization: Bearer invalid_token"
# Expected: 401 Unauthorized
```

### Scenario 3: Validation Testing

```bash
# Create task without title
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"description":"No title"}'
# Expected: 400 Bad Request

# Update task with invalid data
curl -X PUT http://localhost:5000/api/tasks/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"title":"","completed":"not_boolean"}'
# Expected: 400 Bad Request
```

---

## 📊 Expected HTTP Status Codes

| Status Code | Meaning      | When to Expect                           |
| ----------- | ------------ | ---------------------------------------- |
| 200         | OK           | Successful GET, PUT, PATCH, DELETE       |
| 201         | Created      | Successful POST (register, create task)  |
| 400         | Bad Request  | Validation errors, missing fields        |
| 401         | Unauthorized | Invalid/missing token, wrong credentials |
| 404         | Not Found    | Task not found, route not found          |
| 500         | Server Error | Database errors, server crashes          |

---

## 🎯 Testing Checklist

### Authentication

- [ ] Register with valid data
- [ ] Register with duplicate email
- [ ] Register with invalid email
- [ ] Register with short password
- [ ] Login with correct credentials
- [ ] Login with wrong password
- [ ] Login with non-existent user
- [ ] Get profile with valid token
- [ ] Get profile with invalid token

### Tasks

- [ ] Create task with valid data
- [ ] Create task without title
- [ ] Get all tasks
- [ ] Get single task
- [ ] Get non-existent task
- [ ] Update task with valid data
- [ ] Update task with invalid data
- [ ] Toggle task completion
- [ ] Delete task
- [ ] Delete non-existent task
- [ ] Access another user's task (should fail)

---

## 🔍 Debugging Tips

1. **Check Backend Logs:** Always monitor the backend terminal for errors
2. **Verify Token:** Ensure token is correctly copied (no extra spaces)
3. **Check Headers:** Content-Type must be `application/json`
4. **Validate JSON:** Use a JSON validator for request bodies
5. **Database State:** Check database directly if needed:
   ```sql
   SELECT * FROM users;
   SELECT * FROM tasks;
   ```

---

## 📝 Sample Test Data

### Users

```json
{
  "username": "alice",
  "email": "alice@example.com",
  "password": "alice123"
}

{
  "username": "bob",
  "email": "bob@example.com",
  "password": "bob123"
}
```

### Tasks

```json
{
  "title": "Morning workout",
  "description": "30 minutes cardio and stretching"
}

{
  "title": "Team meeting",
  "description": "Discuss project milestones at 2 PM"
}

{
  "title": "Code review",
  "description": "Review pull requests from team members"
}
```

---

**Happy Testing! 🚀**
