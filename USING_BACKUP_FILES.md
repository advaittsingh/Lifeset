# Using SQL Backup Files

I've set up everything you need to use your two SQL backup files. Here's what's been created and how to use them.

## What's Been Set Up

✅ **Import Script** (`packages/backend/scripts/import-sql-backups.sh`)
   - Automated script to import both SQL files
   - Handles database creation, connection testing, and import
   - Provides clear feedback and error messages

✅ **Documentation**
   - `packages/backend/scripts/IMPORT_BACKUPS.md` - Quick reference guide
   - `packages/backend/scripts/MIGRATION_GUIDE.md` - Updated with backup import instructions
   - `packages/backend/scripts/README.md` - Overview of all scripts

✅ **NPM Script** - Added `npm run import:backups` for easy access

## Your Backup Files

You have two SQL backup files in the project root:
1. **`lifesxtr_lifeset_iktac_db.sql`** - Main database (users, posts, jobs, etc.)
2. **`lifesxtr_blogpost.sql`** - Blog/MCQ database (MCQ questions and reports)

## Quick Start

### Step 1: Make sure MySQL is running

```bash
# macOS
brew services start mysql
# or
mysql.server start

# Linux
sudo systemctl start mysql
# or
sudo service mysql start
```

### Step 2: Run the import script

```bash
cd packages/backend
npm run import:backups
```

Or directly:
```bash
cd packages/backend/scripts
./import-sql-backups.sh
```

The script will:
- ✅ Test MySQL connection
- ✅ Create databases if needed
- ✅ Import both SQL files
- ✅ Show you a summary

### Step 3: Update your .env file

After import, update `packages/backend/.env`:

```env
DATABASE_URL="mysql://lifesxtr_lifesiku:N.Kc,JAX)f7C@localhost:3306/lifesxtr_lifeset_iktac_db?schema=public"
```

### Step 4: Verify the import

```bash
# Check tables
mysql -h localhost -u lifesxtr_lifesiku -p'N.Kc,JAX)f7C' lifesxtr_lifeset_iktac_db -e "SHOW TABLES;"

# Check data
mysql -h localhost -u lifesxtr_lifesiku -p'N.Kc,JAX)f7C' lifesxtr_lifeset_iktac_db -e "SELECT COUNT(*) FROM users;"
```

### Step 5: Run Prisma (if needed)

```bash
cd packages/backend
npx prisma generate
npx prisma migrate dev
```

## Custom Configuration

If you need to use different credentials or database names, you can set environment variables:

```bash
export MYSQL_HOST=localhost
export MYSQL_PORT=3306
export MYSQL_USER=lifesxtr_lifesiku
export MYSQL_PASSWORD="N.Kc,JAX)f7C"
export MAIN_DB_NAME=lifesxtr_lifeset_iktac_db
export BLOG_DB_NAME=lifesxtr_blogpost

cd packages/backend
npm run import:backups
```

## What Gets Imported

### Main Database (`lifesxtr_lifeset_iktac_db`)
- Users and authentication
- User profiles (students, companies, colleges)
- Posts and feeds
- Job postings and applications
- Notifications
- All other application data

### Blog Database (`lifesxtr_blogpost`)
- MCQ questions
- MCQ reports and attempts
- Blog-related content

## Troubleshooting

### MySQL Not Running
```bash
# Check status
brew services list  # macOS
systemctl status mysql  # Linux

# Start MySQL
brew services start mysql  # macOS
sudo systemctl start mysql  # Linux
```

### Connection Refused
- Verify MySQL is running
- Check host and port (default: localhost:3306)
- Verify credentials

### Access Denied
- Check username and password
- Grant privileges:
  ```sql
  GRANT ALL PRIVILEGES ON lifesxtr_lifeset_iktac_db.* TO 'lifesxtr_lifesiku'@'localhost';
  GRANT ALL PRIVILEGES ON lifesxtr_blogpost.* TO 'lifesxtr_lifesiku'@'localhost';
  FLUSH PRIVILEGES;
  ```

### File Not Found
Make sure the SQL files are in the project root:
```bash
ls -la lifesxtr_lifeset_iktac_db.sql
ls -la lifesxtr_blogpost.sql
```

## Alternative: Manual Import

If you prefer to import manually:

```bash
# Create databases
mysql -h localhost -u lifesxtr_lifesiku -p'N.Kc,JAX)f7C' -e "CREATE DATABASE IF NOT EXISTS lifesxtr_lifeset_iktac_db;"
mysql -h localhost -u lifesxtr_lifesiku -p'N.Kc,JAX)f7C' -e "CREATE DATABASE IF NOT EXISTS lifesxtr_blogpost;"

# Import main database
mysql -h localhost -u lifesxtr_lifesiku -p'N.Kc,JAX)f7C' lifesxtr_lifeset_iktac_db < lifesxtr_lifeset_iktac_db.sql

# Import blog database
mysql -h localhost -u lifesxtr_lifesiku -p'N.Kc,JAX)f7C' lifesxtr_blogpost < lifesxtr_blogpost.sql
```

## Next Steps

After successful import:
1. ✅ Verify data integrity
2. ✅ Update `.env` file with correct DATABASE_URL
3. ✅ Run Prisma migrations if needed
4. ✅ Test your application
5. ✅ Start the backend server

## Documentation

For more details, see:
- **Quick Guide**: `packages/backend/scripts/IMPORT_BACKUPS.md`
- **Full Migration Guide**: `packages/backend/scripts/MIGRATION_GUIDE.md`
- **Scripts Overview**: `packages/backend/scripts/README.md`

## Need Help?

If you encounter issues:
1. Check the error messages carefully
2. Review MySQL logs
3. Verify all prerequisites are met
4. Check the troubleshooting sections in the documentation








