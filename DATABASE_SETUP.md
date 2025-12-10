# Database Setup Guide

## Quick Start

The backend requires PostgreSQL and Redis to be running. The easiest way is using Docker Compose.

### Start Database & Redis

```bash
# From project root
docker-compose up -d db redis
```

This will start:
- **PostgreSQL** on port `5432`
- **Redis** on port `6379`

### Verify Database is Running

```bash
# Check if containers are running
docker ps

# Check database connection
docker exec -it lifeset-db-1 psql -U lifeset -d lifeset -c "SELECT version();"
```

### Stop Database

```bash
docker-compose down
```

### Reset Database (⚠️ Deletes all data)

```bash
docker-compose down -v
docker-compose up -d db redis
```

---

## Manual PostgreSQL Setup (Alternative)

If you prefer not to use Docker:

1. **Install PostgreSQL:**
   ```bash
   # macOS
   brew install postgresql@15
   brew services start postgresql@15
   
   # Or download from: https://www.postgresql.org/download/
   ```

2. **Create database:**
   ```bash
   createdb lifeset
   psql lifeset
   ```

3. **Update `.env` in `packages/backend`:**
   ```env
   DATABASE_URL="postgresql://your-username:your-password@localhost:5432/lifeset?schema=public"
   ```

---

## Run Migrations

After starting the database:

```bash
cd packages/backend
npx prisma migrate dev
```

Or if you want to reset and seed:

```bash
cd packages/backend
npx prisma migrate reset
```

---

## Troubleshooting

### Port 5432 already in use

If you have PostgreSQL running locally:

1. **Option 1:** Stop local PostgreSQL:
   ```bash
   # macOS
   brew services stop postgresql@15
   ```

2. **Option 2:** Change Docker port in `docker-compose.yml`:
   ```yaml
   db:
     ports:
       - "5433:5432"  # Use 5433 instead
   ```
   Then update `.env`:
   ```env
   DATABASE_URL="postgresql://lifeset:lifeset@localhost:5433/lifeset?schema=public"
   ```

### Database connection errors

1. **Check if database is running:**
   ```bash
   docker ps | grep postgres
   ```

2. **Check database logs:**
   ```bash
   docker-compose logs db
   ```

3. **Verify connection string in `.env`:**
   ```bash
   cat packages/backend/.env | grep DATABASE_URL
   ```

### Reset everything

```bash
# Stop and remove containers and volumes
docker-compose down -v

# Start fresh
docker-compose up -d db redis

# Run migrations
cd packages/backend
npx prisma migrate dev
```

---

## Next Steps

Once database is running:

1. **Start backend:**
   ```bash
   cd packages/backend
   npm run dev
   ```

2. **Start admin panel:**
   ```bash
   cd packages/admin-web
   npm run dev
   ```

3. **Access admin panel:**
   - Open: http://localhost:5173
   - Login with your admin credentials















