# Task Management Application - Backend

A robust Node.js backend API for task management with JWT authentication and PostgreSQL database.

## 🚀 Features

- **User Authentication**: Register and login with JWT tokens
- **Task Management**: Full CRUD operations for tasks
- **Security**: Password hashing with bcrypt, JWT authentication
- **Validation**: Request validation using express-validator
- **Database**: PostgreSQL with connection pooling
- **Error Handling**: Comprehensive error handling and validation

## 📋 Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## 🛠️ Installation

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the backend directory:

```bash
cp .env.example .env
```

4. Update the `.env` file with your database credentials:

```env
PORT=5000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=task_management

# JWT Secret
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
```

## 🗄️ Database Setup

1. Create a PostgreSQL database:

```sql
CREATE DATABASE task_management;
```

2. The application will automatically create the required tables on first run:
   - `users` table
   - `tasks` table

## 🏃 Running the Application

### Development Mode (with auto-reload):

```bash
npm run dev
```

### Production Mode:

```bash
npm start
```

The server will start on `http://localhost:5000`

## 📡 API Endpoints

### Authentication Routes

#### Register User

- **POST** `/api/auth/register`
- **Body**:

```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login User

- **POST** `/api/auth/login`
- **Body**:

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get User Profile

- **GET** `/api/auth/profile`
- **Headers**: `Authorization: Bearer <token>`

### Task Routes (All require authentication)

#### Get All Tasks

- **GET** `/api/tasks`
- **Headers**: `Authorization: Bearer <token>`

#### Get Single Task

- **GET** `/api/tasks/:id`
- **Headers**: `Authorization: Bearer <token>`

#### Create Task

- **POST** `/api/tasks`
- **Headers**: `Authorization: Bearer <token>`
- **Body**:

```json
{
  "title": "Complete project",
  "description": "Finish the task management app"
}
```

#### Update Task

- **PUT** `/api/tasks/:id`
- **Headers**: `Authorization: Bearer <token>`
- **Body**:

```json
{
  "title": "Updated title",
  "description": "Updated description",
  "completed": true
}
```

#### Delete Task

- **DELETE** `/api/tasks/:id`
- **Headers**: `Authorization: Bearer <token>`

#### Toggle Task Completion

- **PATCH** `/api/tasks/:id/toggle`
- **Headers**: `Authorization: Bearer <token>`

## 📁 Project Structure

```
backend/
├── config/
│   ├── db.js              # Database connection
│   └── schema.js          # Database schema
├── controllers/
│   ├── authController.js  # Authentication logic
│   └── taskController.js  # Task CRUD logic
├── middleware/
│   └── auth.js            # JWT authentication middleware
├── routes/
│   ├── authRoutes.js      # Authentication routes
│   └── taskRoutes.js      # Task routes
├── .env.example           # Environment variables template
├── .gitignore
├── package.json
└── server.js              # Application entry point
```

## 🔒 Security Features

- Password hashing using bcrypt
- JWT token-based authentication
- Request validation
- SQL injection prevention with parameterized queries
- CORS enabled for frontend integration

## 🧪 Testing the API

You can test the API using:

- Postman
- Thunder Client (VS Code extension)
- cURL

Example cURL request:

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"john_doe","email":"john@example.com","password":"password123"}'
```

## 📝 Environment Variables

| Variable    | Description       | Default         |
| ----------- | ----------------- | --------------- |
| PORT        | Server port       | 5000            |
| NODE_ENV    | Environment       | development     |
| DB_HOST     | Database host     | localhost       |
| DB_PORT     | Database port     | 5432            |
| DB_USER     | Database user     | -               |
| DB_PASSWORD | Database password | -               |
| DB_NAME     | Database name     | task_management |
| JWT_SECRET  | JWT secret key    | -               |
| JWT_EXPIRE  | Token expiration  | 7d              |

## 🐛 Troubleshooting

### Database Connection Issues

- Ensure PostgreSQL is running
- Verify database credentials in `.env`
- Check if the database exists

### Port Already in Use

- Change the PORT in `.env` file
- Kill the process using the port

## 📄 License

ISC
