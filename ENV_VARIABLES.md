# 🔐 Environment Variables Reference

Quick reference for all environment variables needed for deployment.

---

## 🏠 Local Development

### Backend (.env)

```env
PORT=5002
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=task_management

# JWT Configuration
JWT_SECRET=your_local_secret_key_min_32_characters
JWT_EXPIRE=7d

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env.local) - Optional

```env
# Not needed for local development
# Proxy in vite.config.js handles API calls
```

---

## 🚂 Railway (Production Backend)

### Required Environment Variables

| Variable       | Value                         | Description                         |
| -------------- | ----------------------------- | ----------------------------------- |
| `NODE_ENV`     | `production`                  | Sets environment to production      |
| `JWT_SECRET`   | `<64-char-random-string>`     | Secret key for JWT tokens           |
| `JWT_EXPIRE`   | `7d`                          | Token expiration time               |
| `FRONTEND_URL` | `https://your-app.vercel.app` | Your Vercel frontend URL (for CORS) |

### Auto-Provided by Railway

| Variable       | Description                                   |
| -------------- | --------------------------------------------- |
| `DATABASE_URL` | PostgreSQL connection string (auto-generated) |
| `PORT`         | Server port (auto-assigned by Railway)        |

### How to Generate JWT_SECRET

**Option 1: Using Node.js**

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

**Option 2: Using OpenSSL**

```bash
openssl rand -hex 64
```

**Option 3: Online Generator**

- Visit: https://randomkeygen.com/
- Use "CodeIgniter Encryption Keys" section

---

## ▲ Vercel (Production Frontend)

### Required Environment Variables

| Variable       | Value                                 | Description                     |
| -------------- | ------------------------------------- | ------------------------------- |
| `VITE_API_URL` | `https://your-app.up.railway.app/api` | Your Railway backend URL + /api |

### Important Notes

1. **VITE\_ Prefix Required**: Vite only exposes variables starting with `VITE_`
2. **Include /api**: The URL must end with `/api`
3. **No Trailing Slash**: Don't add a trailing slash after `/api`

### Example

```env
VITE_API_URL=https://task-backend-production.up.railway.app/api
```

---

## 🔄 Update Process

### When Backend URL Changes

1. **Update in Vercel:**
   - Go to Vercel Dashboard
   - Select your project
   - Settings → Environment Variables
   - Update `VITE_API_URL`
   - Redeploy

### When Frontend URL Changes

1. **Update in Railway:**
   - Go to Railway Dashboard
   - Select your backend service
   - Variables tab
   - Update `FRONTEND_URL`
   - Railway auto-redeploys

---

## ✅ Verification

### Test Backend Environment

```bash
# SSH into Railway or check logs
echo $DATABASE_URL
echo $JWT_SECRET
echo $FRONTEND_URL
echo $NODE_ENV
```

### Test Frontend Environment

```javascript
// In browser console on Vercel deployment
console.log(import.meta.env.VITE_API_URL);
```

---

## 🚨 Common Mistakes

### Backend

❌ **Wrong:**

```env
FRONTEND_URL=https://your-app.vercel.app/
```

✅ **Correct:**

```env
FRONTEND_URL=https://your-app.vercel.app
```

(No trailing slash)

❌ **Wrong:**

```env
JWT_SECRET=secret123
```

✅ **Correct:**

```env
JWT_SECRET=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2
```

(Long, random string)

### Frontend

❌ **Wrong:**

```env
API_URL=https://your-backend.railway.app/api
```

✅ **Correct:**

```env
VITE_API_URL=https://your-backend.railway.app/api
```

(Must have VITE\_ prefix)

❌ **Wrong:**

```env
VITE_API_URL=https://your-backend.railway.app
```

✅ **Correct:**

```env
VITE_API_URL=https://your-backend.railway.app/api
```

(Must include /api)

---

## 📋 Deployment Checklist

### Before Deploying Backend

- [ ] Generate strong JWT_SECRET
- [ ] Have frontend URL ready (or use \* temporarily)
- [ ] Verify DATABASE_URL will be provided by Railway

### Before Deploying Frontend

- [ ] Have Railway backend URL
- [ ] Add /api to the end of backend URL
- [ ] Use VITE\_ prefix

### After Both Deployed

- [ ] Update Railway FRONTEND_URL with actual Vercel URL
- [ ] Test CORS is working
- [ ] Verify API calls succeed

---

## 🔍 Debugging

### Backend Not Connecting to Database

**Check:**

```bash
# In Railway logs, look for:
✅ Database connected successfully
```

**If not appearing:**

- Verify DATABASE_URL is set (Railway auto-provides this)
- Check database service is running
- Review db.js configuration

### Frontend Can't Reach Backend

**Check:**

1. Browser console for errors
2. Network tab for failed requests
3. Verify VITE_API_URL is correct
4. Test backend URL directly in browser

### CORS Errors

**Check:**

1. FRONTEND_URL in Railway matches Vercel URL exactly
2. No trailing slashes
3. HTTPS (not HTTP) in production
4. Backend has redeployed after FRONTEND_URL change

---

## 📝 Template for Quick Copy-Paste

### Railway Environment Variables

```
NODE_ENV=production
JWT_SECRET=PASTE_YOUR_GENERATED_SECRET_HERE
JWT_EXPIRE=7d
FRONTEND_URL=https://your-app-name.vercel.app
```

### Vercel Environment Variables

```
VITE_API_URL=https://your-backend-name.up.railway.app/api
```

---

## 🎯 Quick Reference URLs

After deployment, save these:

```
Frontend (Vercel): https://_____________________.vercel.app
Backend (Railway):  https://_____________________.up.railway.app
Database (Railway): Managed by Railway (no direct URL needed)
```

---

**Keep this reference handy during deployment! 📌**
