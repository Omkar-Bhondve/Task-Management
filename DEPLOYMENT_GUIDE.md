# 🚀 Production Deployment Guide

Complete guide to deploy your Task Management Application to Railway (Backend + Database) and Vercel (Frontend).

---

## 📋 Prerequisites

Before deploying, ensure you have:

- ✅ GitHub account
- ✅ Railway account (sign up at https://railway.app)
- ✅ Vercel account (sign up at https://vercel.com)
- ✅ Your code pushed to a GitHub repository

---

## 🗂️ Step 1: Push Code to GitHub

### 1.1 Initialize Git Repository

```bash
# Navigate to project root
cd task-management-app

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Task Management App"
```

### 1.2 Create GitHub Repository

1. Go to https://github.com/new
2. Create a new repository named `task-management-app`
3. **Don't** initialize with README (we already have code)

### 1.3 Push to GitHub

```bash
# Add remote
git remote add origin https://github.com/YOUR_USERNAME/task-management-app.git

# Push code
git branch -M main
git push -u origin main
```

---

## 🚂 Step 2: Deploy Backend to Railway

### 2.1 Create Railway Project

1. Go to https://railway.app
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"**
4. Authorize Railway to access your GitHub
5. Select your `task-management-app` repository
6. Railway will detect it's a Node.js project

### 2.2 Add PostgreSQL Database

1. In your Railway project dashboard
2. Click **"+ New"** → **"Database"** → **"Add PostgreSQL"**
3. Railway will automatically create a PostgreSQL database
4. The database will be linked to your project

### 2.3 Configure Environment Variables

1. Click on your **backend service** (not the database)
2. Go to **"Variables"** tab
3. Click **"+ New Variable"** and add these:

```env
NODE_ENV=production
JWT_SECRET=your_super_secret_jwt_key_change_this_to_something_random
JWT_EXPIRE=7d
FRONTEND_URL=https://your-app-name.vercel.app
```

**Important Notes:**

- Railway automatically provides database credentials (DATABASE_URL)
- You don't need to manually add DB_HOST, DB_PORT, etc.
- Railway injects these automatically

### 2.4 Update Database Configuration for Railway

Railway provides a `DATABASE_URL` instead of separate credentials. Let's update the backend to handle this:

**Update `backend/config/db.js`:**

```javascript
const { Pool } = require("pg");
require("dotenv").config();

// Railway provides DATABASE_URL, use it if available
const pool = new Pool(
  process.env.DATABASE_URL
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false,
        },
      }
    : {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      },
);

pool.on("connect", () => {
  console.log("✅ Database connected successfully");
});

pool.on("error", (err) => {
  console.error("❌ Unexpected database error:", err);
  process.exit(-1);
});

module.exports = pool;
```

### 2.5 Set Root Directory (Important!)

1. In Railway project settings
2. Go to **"Settings"** tab
3. Find **"Root Directory"**
4. Set it to: `backend`
5. Click **"Save"**

### 2.6 Deploy

1. Railway will automatically deploy
2. Wait for deployment to complete (2-3 minutes)
3. Once deployed, click on your service
4. Copy the **public URL** (e.g., `https://your-app.up.railway.app`)

### 2.7 Test Backend

Visit your Railway URL in browser:

```
https://your-app.up.railway.app
```

You should see:

```json
{
  "success": true,
  "message": "Task Management API",
  "version": "1.0.0",
  "endpoints": {
    "health": "/api/health",
    "auth": "/api/auth",
    "tasks": "/api/tasks"
  }
}
```

---

## ▲ Step 3: Deploy Frontend to Vercel

### 3.1 Create Vercel Project

1. Go to https://vercel.com
2. Click **"Add New"** → **"Project"**
3. Import your GitHub repository
4. Select `task-management-app`

### 3.2 Configure Build Settings

Vercel should auto-detect Vite, but verify:

- **Framework Preset:** Vite
- **Root Directory:** `frontend`
- **Build Command:** `npm run build`
- **Output Directory:** `dist`

### 3.3 Add Environment Variables

In Vercel project settings:

1. Go to **"Settings"** → **"Environment Variables"**
2. Add this variable:

```
Name: VITE_API_URL
Value: https://your-railway-backend-url.up.railway.app/api
```

**Replace** `your-railway-backend-url` with your actual Railway URL from Step 2.6

### 3.4 Deploy

1. Click **"Deploy"**
2. Wait for deployment (1-2 minutes)
3. Once deployed, you'll get a URL like: `https://your-app.vercel.app`

### 3.5 Update Railway CORS

Now that you have your Vercel URL:

1. Go back to **Railway**
2. Open your backend service
3. Go to **"Variables"**
4. Update `FRONTEND_URL` to your actual Vercel URL:
   ```
   FRONTEND_URL=https://your-app.vercel.app
   ```
5. Railway will automatically redeploy

---

## ✅ Step 4: Verify Deployment

### 4.1 Test Backend

```bash
# Test health endpoint
curl https://your-railway-backend.up.railway.app/api/health

# Test registration
curl -X POST https://your-railway-backend.up.railway.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@test.com","password":"test123"}'
```

### 4.2 Test Frontend

1. Visit your Vercel URL: `https://your-app.vercel.app`
2. Register a new account
3. Login
4. Create a task
5. Verify all CRUD operations work

---

## 🔧 Troubleshooting

### Backend Issues

**Database Connection Error:**

```bash
# Check Railway logs
# In Railway dashboard → Select service → "Deployments" → Click latest deployment → View logs
```

**CORS Error:**

- Verify `FRONTEND_URL` in Railway matches your Vercel URL exactly
- Make sure there's no trailing slash

**Port Issues:**

- Railway automatically assigns PORT, don't hardcode it
- Use `process.env.PORT || 5000`

### Frontend Issues

**API Connection Error:**

- Verify `VITE_API_URL` in Vercel settings
- Make sure it ends with `/api`
- Check Railway backend is running

**404 on Refresh:**

- Ensure `vercel.json` is in the frontend folder
- Redeploy if needed

**Environment Variables Not Working:**

- Vercel requires `VITE_` prefix for Vite apps
- Redeploy after adding/changing env vars

---

## 🔄 Making Updates

### Update Backend

```bash
# Make changes to backend code
git add .
git commit -m "Update backend"
git push origin main

# Railway will automatically redeploy
```

### Update Frontend

```bash
# Make changes to frontend code
git add .
git commit -m "Update frontend"
git push origin main

# Vercel will automatically redeploy
```

---

## 📊 Monitoring

### Railway Monitoring

1. Go to Railway dashboard
2. Select your project
3. View:
   - **Metrics:** CPU, Memory, Network usage
   - **Logs:** Real-time application logs
   - **Deployments:** Deployment history

### Vercel Monitoring

1. Go to Vercel dashboard
2. Select your project
3. View:
   - **Analytics:** Page views, performance
   - **Logs:** Build and runtime logs
   - **Deployments:** Deployment history

---

## 💰 Pricing

### Railway

- **Free Tier:** $5 credit/month
- **Hobby Plan:** $5/month (recommended for production)
- Database included in plan

### Vercel

- **Free Tier:** Unlimited personal projects
- **Pro Plan:** $20/month (for commercial projects)

---

## 🔐 Security Checklist

Before going live, ensure:

- ✅ Strong JWT_SECRET (64+ random characters)
- ✅ FRONTEND_URL set correctly in Railway
- ✅ Database credentials not exposed
- ✅ HTTPS enabled (automatic on Railway & Vercel)
- ✅ CORS configured properly
- ✅ No sensitive data in logs
- ✅ Environment variables set correctly

---

## 📝 Environment Variables Summary

### Railway (Backend)

```env
NODE_ENV=production
JWT_SECRET=<your-secret-key>
JWT_EXPIRE=7d
FRONTEND_URL=https://your-app.vercel.app
# DATABASE_URL is automatically provided by Railway
```

### Vercel (Frontend)

```env
VITE_API_URL=https://your-railway-backend.up.railway.app/api
```

---

## 🎉 Success!

Your application is now live! 🚀

- **Frontend:** https://your-app.vercel.app
- **Backend:** https://your-railway-backend.up.railway.app
- **Database:** Managed by Railway

### Share Your App

You can now share your Vercel URL with anyone!

---

## 📚 Additional Resources

- [Railway Documentation](https://docs.railway.app)
- [Vercel Documentation](https://vercel.com/docs)
- [PostgreSQL on Railway](https://docs.railway.app/databases/postgresql)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)

---

**Need Help?** Check the logs in Railway and Vercel dashboards for detailed error messages.
