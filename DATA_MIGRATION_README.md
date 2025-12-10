# Data Migration from Live Database

This guide will help you migrate data from your existing live database (CakePHP/MySQL) to the new PostgreSQL database.

## Quick Start

1. **Get your old database credentials**
   - Host, Port, Username, Password, Database name

2. **Create migration config**
   ```bash
   cd packages/backend
   cp .env.migration.example .env.migration
   # Edit .env.migration with your old database credentials
   ```

3. **Run migration**
   ```bash
   npm run migrate:data
   ```

4. **Verify data**
   ```bash
   npx prisma studio
   ```

## Detailed Guide

See `packages/backend/scripts/migrate-data.md` for complete documentation.

## What Gets Migrated?

✅ Users and profiles
✅ Posts and content
✅ Jobs and applications
✅ Notifications
✅ All relationships

## Custom Tables?

If you have additional tables, you can extend the migration script:
- Edit `packages/backend/scripts/migrate-from-mysql.ts`
- Add a new migration function following the existing pattern
- Run `npm run migrate:data` again

## Troubleshooting

**Connection refused?**
- Check old database is running
- Verify credentials in `.env.migration`

**Table doesn't exist?**
- Script will skip missing tables
- Add custom migration functions for your tables

**Duplicate entries?**
- Script handles duplicates automatically
- Skips existing records

## Need Help?

Check the detailed guide: `packages/backend/scripts/migrate-data.md`





