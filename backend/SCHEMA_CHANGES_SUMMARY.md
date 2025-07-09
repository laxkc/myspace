# 🗄️ Database Schema Changes - Complete Guide

## 🚀 Quick Start

### Show Current Schema
```bash
./scripts/manage-schema.sh show
```

### Create New Migration
```bash
./scripts/manage-schema.sh create add_new_table
```

### Apply Migration
```bash
./scripts/manage-schema.sh apply migrations/20231201_143022_add_new_table.sql
```

### Rollback Migration
```bash
./scripts/manage-schema.sh rollback migrations/20231201_143022_add_new_table.sql
```

### Backup Database
```bash
./scripts/manage-schema.sh backup
```

## 📋 Common Operations

### 1. Add New Table
```bash
# Create migration
./scripts/manage-schema.sh create add_comments_table

# Edit the generated file in migrations/ directory
# Then apply it
./scripts/manage-schema.sh apply migrations/YYYYMMDD_HHMMSS_add_comments_table.sql
```

**Example Migration Content:**
```sql
-- UP Migration
CREATE TABLE comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    blog_id UUID REFERENCES blogs(id) ON DELETE CASCADE,
    author_name TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- DOWN Migration
DROP TABLE IF EXISTS comments;
```

### 2. Add Column to Existing Table
```bash
./scripts/manage-schema.sh create add_status_to_blogs
```

**Example Migration Content:**
```sql
-- UP Migration
ALTER TABLE blogs ADD COLUMN status TEXT DEFAULT 'draft';
CREATE INDEX idx_blogs_status ON blogs(status);

-- DOWN Migration
ALTER TABLE blogs DROP COLUMN IF EXISTS status;
```

### 3. Modify Column Type
```bash
./scripts/manage-schema.sh create modify_title_length
```

**Example Migration Content:**
```sql
-- UP Migration
ALTER TABLE blogs ALTER COLUMN title TYPE VARCHAR(500);

-- DOWN Migration
ALTER TABLE blogs ALTER COLUMN title TYPE VARCHAR(255);
```

### 4. Delete Table
```bash
./scripts/manage-schema.sh create remove_old_table
```

**Example Migration Content:**
```sql
-- UP Migration
DROP TABLE IF EXISTS old_table_name;

-- DOWN Migration
CREATE TABLE old_table_name (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);
```

## 🔧 Manual SQL Commands

### Direct Database Connection
```bash
psql "connectionURL//myspace?sslmode=require""
```

### Quick SQL Operations

#### Add Column
```sql
ALTER TABLE blogs ADD COLUMN featured_image TEXT;
```

#### Modify Column
```sql
ALTER TABLE blogs ALTER COLUMN title TYPE VARCHAR(300);
```

#### Add Index
```sql
CREATE INDEX idx_blogs_slug ON blogs(slug);
```

#### Drop Column
```sql
ALTER TABLE blogs DROP COLUMN IF EXISTS old_column;
```

#### Rename Column
```sql
ALTER TABLE blogs RENAME COLUMN old_name TO new_name;
```

## 📊 Current Database Schema

Your database currently has these tables:

| Table | Description |
|-------|-------------|
| `admin` | Admin users |
| `blogs` | Blog posts |
| `blog_tags` | Many-to-many blog-tag relationship |
| `contact_info` | Contact information |
| `projects` | Portfolio projects |
| `project_tags` | Many-to-many project-tag relationship |
| `tags` | Tags for blogs and projects |

## 🛡️ Best Practices

### 1. Always Backup First
```bash
./scripts/manage-schema.sh backup
```

### 2. Test on Development
```bash
# Create test database
psql "postgresql://..." -c "CREATE DATABASE test_db;"

# Test migration
psql "postgresql://.../test_db" -f migrations/your_migration.sql
```

### 3. Use Safe Commands
```sql
-- Safe to run multiple times
ALTER TABLE blogs ADD COLUMN IF NOT EXISTS new_column TEXT;
DROP TABLE IF EXISTS old_table;
```

### 4. Add Indexes for Performance
```sql
-- Always add indexes for foreign keys
CREATE INDEX idx_table_foreign_key ON table_name(foreign_key_column);
```

## 🐛 Troubleshooting

### Migration Failed
```bash
# Check the error
psql "$DB_CONNECTION" -f migrations/failed_migration.sql

# Rollback if needed
./scripts/manage-schema.sh rollback migrations/failed_migration.sql
```

### Column Already Exists
```sql
-- Use IF NOT EXISTS
ALTER TABLE blogs ADD COLUMN IF NOT EXISTS new_column TEXT;
```

### Foreign Key Error
```sql
-- Check orphaned records
SELECT * FROM blogs WHERE category_id NOT IN (SELECT id FROM categories);

-- Fix orphaned records
UPDATE blogs SET category_id = NULL WHERE category_id NOT IN (SELECT id FROM categories);
```

## 📝 Migration Workflow

### Step 1: Plan Your Changes
- What tables/columns need to be added/modified/deleted?
- What data needs to be migrated?
- What indexes are needed for performance?

### Step 2: Create Migration
```bash
./scripts/manage-schema.sh create descriptive_name
```

### Step 3: Edit Migration File
- Add your SQL commands in the UP section
- Add rollback commands in the DOWN section
- Test the migration locally

### Step 4: Apply Migration
```bash
./scripts/manage-schema.sh apply migrations/your_migration.sql
```

### Step 5: Verify Changes
```bash
./scripts/manage-schema.sh show
```

## 🚀 Quick Reference

| Command | Description |
|---------|-------------|
| `./scripts/manage-schema.sh show` | Show current schema |
| `./scripts/manage-schema.sh create name` | Create new migration |
| `./scripts/manage-schema.sh apply file` | Apply migration |
| `./scripts/manage-schema.sh rollback file` | Rollback migration |
| `./scripts/manage-schema.sh backup` | Backup database |
| `./scripts/manage-schema.sh list` | List all migrations |

## 📚 Documentation Files

- **Full Guide:** `DATABASE_MODIFICATIONS.md`
- **Migration Templates:** `migrations/README.md`
- **Quick Start:** `QUICK_START.md`
- **Database Setup:** `DATABASE_SETUP.md`

---

**💡 Tip:** Always test your migrations on a copy of your production data before applying to production! 