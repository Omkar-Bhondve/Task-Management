# 🚀 Quick Setup Guide

Follow these steps to get your Task Management Application running:

## ⚡ Prerequisites Check

Before starting, ensure you have:

- ✅ Node.js installed (v14 or higher) - Run `node --version`
- ✅ PostgreSQL installed (v12 or higher) - Run `psql --version`
- ✅ npm installed - Run `npm --version`

## 📝 Step-by-Step Setup

### Step 1: Create PostgreSQL Database

Open your PostgreSQL terminal (psql) and run:

```sql
CREATE DATABASE task_management;
```

To verify:

```sql
\l
```

You should see `task_management` in the list.

### Step 2: Setup Backend

```bash
# Navigate to backend folder
cd backend

# Install all dependencies
npm install

# Create environment file
copy .env.example .env
# (On Mac/Linux use: cp .env.example .env)

# Open .env file and update these values:
# DB_USER=your_postgres_username
# DB_PASSWORD=your_postgres_password
# DB_NAME=task_management
# JWT_SECRET=your_secret_key_here (change this!)
```

**Important**: Update the `.env` file with your actual PostgreSQL credentials!

### Step 3: Start Backend Server

```bash
# Still in backend folder
npm run dev
```

You should see:

```
✅ Database connected successfully
✅ Database tables created successfully
🚀 Server is running on port 5000
```

**Keep this terminal running!**

### Step 4: Setup Frontend (New Terminal)

Open a **new terminal** window:

```bash
# Navigate to frontend folder (from project root)
cd frontend

# Install all dependencies
npm install
```

### Step 5: Start Frontend Server

```bash
# Still in frontend folder
npm run dev
```

You should see:

```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:3000/
```

### Step 6: Open Application

Open your browser and go to:

```
http://localhost:3000
```

## 🎉 You're Ready!

Now you can:

1. **Register** a new account
2. **Login** with your credentials
3. **Create tasks** and start managing them!

## 🔧 Troubleshooting

### Backend won't start?

**Error: "Database connection failed"**

- Check PostgreSQL is running: `pg_ctl status`
- Verify credentials in `.env` file
- Ensure database exists: `psql -l`

**Error: "Port 5000 already in use"**

- Change PORT in `.env` to 5001 or another available port
- Update frontend proxy in `vite.config.js` to match

### Frontend won't start?

**Error: "Cannot connect to backend"**

- Ensure backend is running on port 5000
- Check browser console for errors
- Verify proxy settings in `vite.config.js`

**Error: "Port 3000 already in use"**

- Vite will automatically suggest another port
- Press 'y' to use the suggested port

### Can't login or register?

- Clear browser localStorage: F12 → Application → Local Storage → Clear
- Check backend terminal for errors
- Verify database tables exist:
  ```sql
  \c task_management
  \dt
  ```
  You should see `users` and `tasks` tables

## 📋 Quick Commands Reference

### Backend Commands

```bash
npm install          # Install dependencies
npm run dev          # Start with auto-reload (development)
npm start            # Start server (production)
```

### Frontend Commands

```bash
npm install          # Install dependencies
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

### PostgreSQL Commands

```sql
CREATE DATABASE task_management;  # Create database
\c task_management                # Connect to database
\dt                               # List tables
\d users                          # Describe users table
\d tasks                          # Describe tasks table
SELECT * FROM users;              # View all users
SELECT * FROM tasks;              # View all tasks
```

## 🎯 Default Ports

- **Backend**: http://localhost:5000
- **Frontend**: http://localhost:3000
- **PostgreSQL**: localhost:5432

## 📱 Testing the Application

1. **Register**: Create account with username, email, password
2. **Login**: Use your email and password
3. **Dashboard**: View your task statistics
4. **Create Task**: Click "Add New Task" button
5. **Edit Task**: Click the ✏️ icon on any task
6. **Complete Task**: Click the checkbox
7. **Delete Task**: Click the 🗑️ icon

## 🔐 Sample .env Configuration

```env
PORT=5000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password_here
DB_NAME=task_management

# JWT Secret (CHANGE THIS!)
JWT_SECRET=my_super_secret_jwt_key_12345
JWT_EXPIRE=7d
```

## ✅ Verification Checklist

Before using the app, verify:

- [ ] PostgreSQL is running
- [ ] Database `task_management` exists
- [ ] Backend `.env` file is configured
- [ ] Backend server is running (port 5000)
- [ ] Frontend server is running (port 3000)
- [ ] Browser opened to http://localhost:3000
- [ ] No errors in backend terminal
- [ ] No errors in frontend terminal

## 🆘 Need Help?

If you encounter issues:

1. Check both terminal windows for error messages
2. Verify all prerequisites are installed
3. Ensure PostgreSQL is running
4. Check `.env` file configuration
5. Clear browser cache and localStorage
6. Restart both servers

## 🎊 Success!

If you can see the login page with a beautiful gradient background, you're all set!

**Happy Task Managing! 🚀**
