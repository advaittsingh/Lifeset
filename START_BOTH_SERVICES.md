# 🚀 Start Both Services (Backend + Admin Panel)

## The Problem

You're seeing a **"Network Error"** on the admin login page because the backend API is not running.

## Solution: Start Both Services

You need **TWO terminal windows** - one for backend, one for admin panel.

---

## Terminal 1: Start Backend

```bash
cd packages/backend
npm install  # If you haven't already
npm run dev
```

**Expected output:**
```
[Nest] Starting Nest application...
[Nest] Application successfully started on http://localhost:3000
```

**Keep this terminal open!**

---

## Terminal 2: Start Admin Panel

```bash
cd packages/admin-web
npm install  # If you haven't already
npm run dev
```

**Expected output:**
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

**Keep this terminal open!**

---

## Verify Everything Works

1. **Check Backend:**
   ```bash
   curl http://localhost:3000/api/v1/health
   ```
   Should return a response (even if it's an error, it means backend is running)

2. **Check Admin Panel:**
   - Open: http://localhost:5173
   - The network error should be gone
   - You should be able to login

---

## Quick Start Script

Create a file `start-all.sh` in the root directory:

```bash
#!/bin/bash

# Start backend in background
cd packages/backend
npm run dev &
BACKEND_PID=$!

# Wait for backend to start
sleep 5

# Start admin panel
cd ../admin-web
npm run dev &
ADMIN_PID=$!

echo "Backend PID: $BACKEND_PID"
echo "Admin Panel PID: $ADMIN_PID"
echo ""
echo "Backend: http://localhost:3000"
echo "Admin Panel: http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop both services"

# Wait for user interrupt
wait
```

Then run:
```bash
chmod +x start-all.sh
./start-all.sh
```

---

## Troubleshooting

### Backend Won't Start

1. **Check if port 3000 is in use:**
   ```bash
   lsof -ti:3000
   ```
   If it returns a PID, kill it: `kill -9 $(lsof -ti:3000)`

2. **Check database connection:**
   - Make sure your database is running
   - Check `.env` file in `packages/backend` has correct `DATABASE_URL`

3. **Check for errors:**
   - Look at the backend terminal output
   - Common issues: missing env vars, database not connected, port conflicts

### Admin Panel Still Shows Network Error

1. **Verify backend is actually running:**
   ```bash
   curl http://localhost:3000/api/v1/health
   ```

2. **Check API URL:**
   - Create `.env` in `packages/admin-web`:
     ```env
     VITE_API_URL=http://localhost:3000/api/v1
     ```
   - Restart admin panel after creating `.env`

3. **Check browser console:**
   - Open DevTools (F12)
   - Look at Network tab
   - See what URL it's trying to connect to

---

## Using Docker Compose (Alternative)

If you prefer, you can use Docker:

```bash
# From root directory
docker-compose up
```

This will start both backend and admin panel (if configured).

---

## Need Help?

- Check `packages/admin-web/TROUBLESHOOTING.md` for more details
- Check backend logs for specific errors
- Verify both services are on the correct ports















