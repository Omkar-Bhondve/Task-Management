# ✅ Pre-Deployment Checklist

Use this checklist before deploying to production.

## 📋 Code Preparation

### Backend

- [x] Updated `server.js` with CORS configuration
- [x] Updated `config/db.js` to support DATABASE_URL
- [x] Added root route for health check
- [x] Added `engines` field in `package.json`
- [x] Created `Procfile` for Railway
- [x] Verified all environment variables are configurable

### Frontend

- [x] Updated `axios.js` to use VITE_API_URL
- [x] Created `vercel.json` for routing
- [x] Created `.env.example` with production template
- [x] Added `withCredentials` to axios config

## 🔐 Security

- [ ] Generate strong JWT_SECRET (64+ characters)
- [ ] Verify no sensitive data in code
- [ ] Check `.gitignore` includes `.env`
- [ ] Ensure passwords are hashed
- [ ] CORS configured for production domain

## 📦 Git & GitHub

- [ ] Initialize git repository
- [ ] Create `.gitignore` files
- [ ] Commit all changes
- [ ] Create GitHub repository
- [ ] Push code to GitHub

## 🚂 Railway Deployment

### Database

- [ ] Create Railway account
- [ ] Create new project
- [ ] Add PostgreSQL database
- [ ] Note database credentials (auto-provided)

### Backend Service

- [ ] Deploy from GitHub repo
- [ ] Set root directory to `backend`
- [ ] Add environment variables:
  - [ ] NODE_ENV=production
  - [ ] JWT_SECRET=<your-secret>
  - [ ] JWT_EXPIRE=7d
  - [ ] FRONTEND_URL=<vercel-url>
- [ ] Wait for deployment
- [ ] Copy Railway URL
- [ ] Test health endpoint

## ▲ Vercel Deployment

### Frontend

- [ ] Create Vercel account
- [ ] Import GitHub repository
- [ ] Set root directory to `frontend`
- [ ] Verify build settings:
  - [ ] Framework: Vite
  - [ ] Build Command: npm run build
  - [ ] Output Directory: dist
- [ ] Add environment variable:
  - [ ] VITE_API_URL=<railway-url>/api
- [ ] Deploy
- [ ] Copy Vercel URL

## 🔄 Final Configuration

- [ ] Update Railway FRONTEND_URL with Vercel URL
- [ ] Wait for Railway to redeploy
- [ ] Test CORS is working

## 🧪 Testing

### Backend Tests

- [ ] Visit Railway URL (should show API info)
- [ ] Test `/api/health` endpoint
- [ ] Test user registration
- [ ] Test user login
- [ ] Test task creation (with token)

### Frontend Tests

- [ ] Visit Vercel URL
- [ ] Register new account
- [ ] Login with credentials
- [ ] Create a task
- [ ] Edit a task
- [ ] Toggle task completion
- [ ] Delete a task
- [ ] Logout and login again
- [ ] Test on mobile device
- [ ] Test page refresh (routing should work)

## 📊 Monitoring Setup

- [ ] Check Railway logs
- [ ] Check Vercel logs
- [ ] Set up error monitoring (optional)
- [ ] Configure analytics (optional)

## 🎉 Go Live

- [ ] All tests passing
- [ ] No console errors
- [ ] Performance is acceptable
- [ ] Mobile responsive
- [ ] Share URL with users!

## 📝 Post-Deployment

- [ ] Document production URLs
- [ ] Save environment variables securely
- [ ] Set up monitoring alerts
- [ ] Plan for updates and maintenance

---

## 🆘 If Something Goes Wrong

### Backend Issues

1. Check Railway logs
2. Verify environment variables
3. Test database connection
4. Check CORS settings

### Frontend Issues

1. Check Vercel logs
2. Verify VITE_API_URL
3. Test API connection
4. Check browser console

### Database Issues

1. Check Railway database status
2. Verify tables were created
3. Check connection string
4. Review schema.js logs

---

## 📞 Support Resources

- Railway Docs: https://docs.railway.app
- Vercel Docs: https://vercel.com/docs
- PostgreSQL Docs: https://www.postgresql.org/docs/

---

**Good luck with your deployment! 🚀**
