# 🚨 Quick Fix: Database Connection Error

## The Problem

Your backend is failing with:
```
PrismaClientInitializationError: Can't reach database server at `localhost:5432`
```

This means **PostgreSQL database is not running**.

---

## Solution 1: Start Docker & Database (Recommended)

### Step 1: Start Docker Desktop
1. Open **Docker Desktop** application
2. Wait until it shows "Docker is running" in the menu bar

### Step 2: Start Database
```bash
cd /Users/advaitsingh/Desktop/Lifeset
docker-compose up -d db redis
```

### Step 3: Wait a few seconds, then start backend
```bash
cd packages/backend
npm run dev
```

---

## Solution 2: Use Local PostgreSQL (If you have it installed)

### Step 1: Start PostgreSQL
```bash
# macOS
brew services start postgresql@15

# Or if installed differently
pg_ctl -D /usr/local/var/postgres start
```

### Step 2: Create database (if needed)
```bash
createdb lifeset
```

### Step 3: Start backend
```bash
cd packages/backend
npm run dev
```

---

## Solution 3: Install & Start PostgreSQL

If you don't have PostgreSQL:

### macOS (using Homebrew):
```bash
brew install postgresql@15
brew services start postgresql@15
createdb lifeset
```

### Then start backend:
```bash
cd packages/backend
npm run dev
```

---

## Verify It's Working

After starting the database:

1. **Check if database is accessible:**
   ```bash
   # For Docker
   docker ps | grep postgres
   
   # For local PostgreSQL
   psql -l | grep lifeset
   ```

2. **Start backend:**
   ```bash
   cd packages/backend
   npm run dev
   ```

3. **You should see:**
   ```
   [Nest] Application successfully started on http://localhost:3000
   ```

4. **Refresh admin panel:**
   - Go to http://localhost:5173
   - Network error should be gone!

---

## Still Having Issues?

1. **Check if port 5432 is in use:**
   ```bash
   lsof -ti:5432
   ```

2. **Check database logs (Docker):**
   ```bash
   docker-compose logs db
   ```

3. **Verify `.env` file:**
   ```bash
   cat packages/backend/.env | grep DATABASE_URL
   ```
   Should show: `DATABASE_URL="postgresql://lifeset:lifeset@localhost:5432/lifeset?schema=public"`

---

## Quick Commands Reference

```bash
# Start database (Docker)
docker-compose up -d db redis

# Stop database
docker-compose down

# Check database status
docker ps

# View database logs
docker-compose logs db

# Start backend
cd packages/backend && npm run dev
```















