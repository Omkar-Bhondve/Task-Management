# 📝 Task Management Application

A full-stack task management application built with React, Node.js, Express, and PostgreSQL. Features user authentication, CRUD operations for tasks, and a beautiful modern UI.

![Task Management App](https://img.shields.io/badge/Status-Production%20Ready-success)
![Node.js](https://img.shields.io/badge/Node.js-v14+-green)
![React](https://img.shields.io/badge/React-18.2-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-12+-blue)

## 🌟 Features

### Backend

- ✅ User registration and authentication with JWT
- ✅ Secure password hashing with bcrypt
- ✅ RESTful API design
- ✅ PostgreSQL database with connection pooling
- ✅ Request validation and error handling
- ✅ CORS enabled for frontend integration

### Frontend

- ✅ Modern, responsive UI with gradient designs
- ✅ User authentication (register/login)
- ✅ Task CRUD operations (Create, Read, Update, Delete)
- ✅ Toggle task completion status
- ✅ Real-time toast notifications
- ✅ Task statistics dashboard
- ✅ Smooth animations and transitions
- ✅ Mobile-first responsive design

## 🏗️ Project Structure

```
task-management-app/
├── backend/                 # Node.js + Express backend
│   ├── config/             # Database and configuration
│   ├── controllers/        # Business logic
│   ├── middleware/         # Authentication middleware
│   ├── routes/             # API routes
│   ├── .env.example        # Environment variables template
│   ├── package.json
│   └── server.js           # Entry point
│
├── frontend/               # React frontend
│   ├── public/
│   ├── src/
│   │   ├── api/           # API integration
│   │   ├── components/    # React components
│   │   ├── context/       # Context providers
│   │   ├── hooks/         # Custom hooks
│   │   ├── pages/         # Page components
│   │   ├── App.jsx        # Main app
│   │   └── main.jsx       # Entry point
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── README.md              # This file
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### 1. Clone the Repository

```bash
git clone <repository-url>
cd task-management-app
```

### 2. Setup Backend

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file from example
cp .env.example .env

# Update .env with your database credentials
# Edit the .env file with your PostgreSQL details
```

**Create PostgreSQL Database:**

```sql
CREATE DATABASE task_management;
```

**Start the backend server:**

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

Backend will run on `http://localhost:5000`

### 3. Setup Frontend

```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

Frontend will run on `http://localhost:3000`

## 📡 API Documentation

### Authentication Endpoints

| Method | Endpoint             | Description       | Auth Required |
| ------ | -------------------- | ----------------- | ------------- |
| POST   | `/api/auth/register` | Register new user | No            |
| POST   | `/api/auth/login`    | Login user        | No            |
| GET    | `/api/auth/profile`  | Get user profile  | Yes           |

### Task Endpoints

| Method | Endpoint                | Description        | Auth Required |
| ------ | ----------------------- | ------------------ | ------------- |
| GET    | `/api/tasks`            | Get all user tasks | Yes           |
| GET    | `/api/tasks/:id`        | Get single task    | Yes           |
| POST   | `/api/tasks`            | Create new task    | Yes           |
| PUT    | `/api/tasks/:id`        | Update task        | Yes           |
| DELETE | `/api/tasks/:id`        | Delete task        | Yes           |
| PATCH  | `/api/tasks/:id/toggle` | Toggle completion  | Yes           |

## 🗄️ Database Schema

### Users Table

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Tasks Table

```sql
CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🔐 Environment Variables

### Backend (.env)

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

## 🎨 Tech Stack

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **Validation**: express-validator
- **CORS**: cors

### Frontend

- **Framework**: React 18
- **Build Tool**: Vite
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Notifications**: React Hot Toast
- **Styling**: CSS3 (Custom)

## 📱 Screenshots

### Login Page

Modern authentication with gradient backgrounds and glassmorphism effects.

### Dashboard

- Task statistics cards (Total, Pending, Completed)
- Task grid with beautiful card design
- Create/Edit modal with smooth animations

### Features

- ✅ Responsive design for all devices
- ✅ Smooth animations and transitions
- ✅ Toast notifications for user feedback
- ✅ Loading states and empty states
- ✅ Custom checkboxes and form elements

## 🔒 Security Features

- Password hashing with bcrypt (10 salt rounds)
- JWT token-based authentication
- Protected API routes with middleware
- SQL injection prevention (parameterized queries)
- Request validation on all endpoints
- Automatic token expiration handling
- CORS configuration for secure cross-origin requests

## 🧪 Testing the Application

1. **Start the backend server** (port 5000)
2. **Start the frontend server** (port 3000)
3. **Register a new user**
4. **Login with credentials**
5. **Create tasks** from the dashboard
6. **Edit, complete, or delete tasks**
7. **View statistics** update in real-time

## 📝 Development Workflow

### Backend Development

```bash
cd backend
npm run dev  # Auto-reload with nodemon
```

### Frontend Development

```bash
cd frontend
npm run dev  # Hot module replacement with Vite
```

## 🚀 Production Deployment

### Backend

```bash
cd backend
npm start
```

### Frontend

```bash
cd frontend
npm run build
npm run preview
```

## 🐛 Troubleshooting

### Database Connection Error

- Verify PostgreSQL is running
- Check database credentials in `.env`
- Ensure database exists

### Port Already in Use

- Change PORT in backend `.env`
- Kill process using the port

### Frontend Can't Connect to Backend

- Ensure backend is running on port 5000
- Check proxy configuration in `vite.config.js`

### Authentication Issues

- Clear browser localStorage
- Check JWT_SECRET in backend `.env`
- Verify token expiration settings

## 📚 Additional Resources

- [Backend README](./backend/README.md) - Detailed backend documentation
- [Frontend README](./frontend/README.md) - Detailed frontend documentation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📄 License

ISC

## 👨‍💻 Author

Created with ❤️ for efficient task management

---

**Happy Task Managing! 🎉**
