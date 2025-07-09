# 🗄️ Database Modifications Guide

This guide shows you how to add, modify, or delete tables in your PostgreSQL database.

## 🚀 Quick Commands

```bash
# Show current schema
./scripts/manage-schema.sh show

# Create a new migration
./scripts/manage-schema.sh create add_new_table

# Apply a migration
./scripts/manage-schema.sh apply migrations/20231201_143022_add_new_table.sql

# Rollback a migration
./scripts/manage-schema.sh rollback migrations/20231201_143022_add_new_table.sql

# Backup database
./scripts/manage-schema.sh backup
```

## 📋 Common Database Operations

### 1. Adding a New Table

#### Create Migration
```bash
./scripts/manage-schema.sh create add_comments_table
```

#### Edit the Migration File
```sql
-- Migration: add_comments_table
-- Created: 2023-12-01 14:30:22
-- Description: Add comments table for blog posts

-- UP Migration (apply changes)
CREATE TABLE comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    blog_id UUID REFERENCES blogs(id) ON DELETE CASCADE,
    author_name TEXT NOT NULL,
    email TEXT NOT NULL,
    content TEXT NOT NULL,
    is_approved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add index for better performance
CREATE INDEX idx_comments_blog_id ON comments(blog_id);
CREATE INDEX idx_comments_created_at ON comments(created_at);

-- DOWN Migration (rollback changes)
DROP TABLE IF EXISTS comments;
```

#### Apply Migration
```bash
./scripts/manage-schema.sh apply migrations/20231201_143022_add_comments_table.sql
```

### 2. Adding a Column to Existing Table

#### Create Migration
```bash
./scripts/manage-schema.sh create add_status_to_blogs
```

#### Edit Migration File
```sql
-- Migration: add_status_to_blogs
-- Description: Add status column to blogs table

-- UP Migration
ALTER TABLE blogs ADD COLUMN status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived'));

-- Add index for status queries
CREATE INDEX idx_blogs_status ON blogs(status);

-- DOWN Migration
ALTER TABLE blogs DROP COLUMN IF EXISTS status;
```

### 3. Modifying Column Type

#### Create Migration
```bash
./scripts/manage-schema.sh create modify_blog_title_length
```

#### Edit Migration File
```sql
-- Migration: modify_blog_title_length
-- Description: Increase title column length

-- UP Migration
ALTER TABLE blogs ALTER COLUMN title TYPE VARCHAR(500);

-- DOWN Migration
ALTER TABLE blogs ALTER COLUMN title TYPE VARCHAR(255);
```

### 4. Adding Foreign Key

#### Create Migration
```bash
./scripts/manage-schema.sh create add_category_to_blogs
```

#### Edit Migration File
```sql
-- Migration: add_category_to_blogs
-- Description: Add category_id foreign key to blogs

-- UP Migration
-- First create categories table if it doesn't exist
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add foreign key column
ALTER TABLE blogs ADD COLUMN category_id INTEGER REFERENCES categories(id);

-- Add index
CREATE INDEX idx_blogs_category_id ON blogs(category_id);

-- DOWN Migration
ALTER TABLE blogs DROP COLUMN IF EXISTS category_id;
DROP TABLE IF EXISTS categories;
```

### 5. Deleting a Table

#### Create Migration
```bash
./scripts/manage-schema.sh create remove_old_table
```

#### Edit Migration File
```sql
-- Migration: remove_old_table
-- Description: Remove deprecated table

-- UP Migration
DROP TABLE IF EXISTS old_table_name;

-- DOWN Migration
-- Recreate the table if needed
CREATE TABLE old_table_name (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## 🔧 Manual SQL Commands

### Direct Database Connection
```bash
psql "connectionURL"
```

### Common SQL Operations

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

#### Add Foreign Key
```sql
ALTER TABLE blogs ADD CONSTRAINT fk_blogs_category 
FOREIGN KEY (category_id) REFERENCES categories(id);
```

#### Drop Column
```sql
ALTER TABLE blogs DROP COLUMN IF EXISTS old_column;
```

#### Rename Column
```sql
ALTER TABLE blogs RENAME COLUMN old_name TO new_name;
```

#### Rename Table
```sql
ALTER TABLE old_table_name RENAME TO new_table_name;
```

## 📊 Schema Management Examples

### Example 1: Add User Profiles Table
```bash
./scripts/manage-schema.sh create add_user_profiles
```

```sql
-- Migration: add_user_profiles
-- Description: Add user profiles table

-- UP Migration
CREATE TABLE user_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    admin_id UUID REFERENCES admin(id) ON DELETE CASCADE,
    bio TEXT,
    avatar_url TEXT,
    website TEXT,
    location TEXT,
    social_links JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_user_profiles_admin_id ON user_profiles(admin_id);

-- DOWN Migration
DROP TABLE IF EXISTS user_profiles;
```

### Example 2: Add Tags to Projects
```bash
./scripts/manage-schema.sh create add_tags_to_projects
```

```sql
-- Migration: add_tags_to_projects
-- Description: Add tags functionality to projects

-- UP Migration
-- Create project_tags junction table
CREATE TABLE IF NOT EXISTS project_tags (
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    tag_id INTEGER REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (project_id, tag_id)
);

CREATE INDEX idx_project_tags_project_id ON project_tags(project_id);
CREATE INDEX idx_project_tags_tag_id ON project_tags(tag_id);

-- DOWN Migration
DROP TABLE IF EXISTS project_tags;
```

### Example 3: Add Soft Delete to Blogs
```bash
./scripts/manage-schema.sh create add_soft_delete_to_blogs
```

```sql
-- Migration: add_soft_delete_to_blogs
-- Description: Add soft delete functionality to blogs

-- UP Migration
ALTER TABLE blogs ADD COLUMN deleted_at TIMESTAMPTZ DEFAULT NULL;
CREATE INDEX idx_blogs_deleted_at ON blogs(deleted_at);

-- DOWN Migration
ALTER TABLE blogs DROP COLUMN IF EXISTS deleted_at;
```

## 🔄 Data Migration Examples

### Example 1: Migrate Data Between Tables
```sql
-- Migration: migrate_blog_categories
-- Description: Migrate blog categories to new structure

-- UP Migration
-- Create new categories table
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    slug TEXT UNIQUE NOT NULL
);

-- Insert default categories
INSERT INTO categories (name, slug) VALUES 
    ('Technology', 'technology'),
    ('Design', 'design'),
    ('Business', 'business');

-- Add category_id to blogs
ALTER TABLE blogs ADD COLUMN category_id INTEGER REFERENCES categories(id);

-- Migrate existing data (example)
UPDATE blogs SET category_id = 1 WHERE title ILIKE '%tech%';
UPDATE blogs SET category_id = 2 WHERE title ILIKE '%design%';
UPDATE blogs SET category_id = 3 WHERE title ILIKE '%business%';

-- DOWN Migration
ALTER TABLE blogs DROP COLUMN IF EXISTS category_id;
DROP TABLE IF EXISTS categories;
```

### Example 2: Update Existing Data
```sql
-- Migration: update_blog_slugs
-- Description: Update blog slugs to be URL-friendly

-- UP Migration
-- Update existing slugs to be URL-friendly
UPDATE blogs 
SET slug = LOWER(REGEXP_REPLACE(title, '[^a-zA-Z0-9\s]', '', 'g'))
WHERE slug IS NULL OR slug = '';

-- Replace spaces with hyphens
UPDATE blogs 
SET slug = REPLACE(slug, ' ', '-')
WHERE slug LIKE '% %';

-- DOWN Migration
-- No rollback needed for data updates
```

## 🛡️ Best Practices

### 1. Always Backup Before Changes
```bash
./scripts/manage-schema.sh backup
```

### 2. Test Migrations on Development First
```bash
# Create a test database
psql "postgresql://..." -c "CREATE DATABASE test_db;"

# Apply migration to test database
psql "postgresql://.../test_db" -f migrations/your_migration.sql
```

### 3. Use Transactions for Complex Changes
```sql
BEGIN;

-- Your migration commands here
ALTER TABLE blogs ADD COLUMN new_column TEXT;

-- Verify the change
SELECT column_name FROM information_schema.columns 
WHERE table_name = 'blogs' AND column_name = 'new_column';

COMMIT;
```

### 4. Add Indexes for Performance
```sql
-- Always add indexes for foreign keys
CREATE INDEX idx_table_foreign_key ON table_name(foreign_key_column);

-- Add indexes for frequently queried columns
CREATE INDEX idx_blogs_published_at ON blogs(published_at);
```

### 5. Use CHECK Constraints
```sql
-- Add constraints to ensure data integrity
ALTER TABLE blogs ADD CONSTRAINT check_status 
CHECK (status IN ('draft', 'published', 'archived'));
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
-- Use IF NOT EXISTS or IF EXISTS
ALTER TABLE blogs ADD COLUMN IF NOT EXISTS new_column TEXT;
ALTER TABLE blogs DROP COLUMN IF EXISTS old_column;
```

### Foreign Key Constraint Error
```sql
-- Check existing data
SELECT * FROM blogs WHERE category_id NOT IN (SELECT id FROM categories);

-- Fix orphaned records
UPDATE blogs SET category_id = NULL WHERE category_id NOT IN (SELECT id FROM categories);
```

## 📝 Migration Checklist

Before applying a migration:

- [ ] Backup the database
- [ ] Test on development environment
- [ ] Review SQL syntax
- [ ] Check for data dependencies
- [ ] Plan rollback strategy
- [ ] Consider performance impact
- [ ] Update application code if needed

## 🚀 Quick Reference

```bash
# Show current schema
./scripts/manage-schema.sh show

# Create new migration
./scripts/manage-schema.sh create migration_name

# Apply migration
./scripts/manage-schema.sh apply migrations/file.sql

# Rollback migration
./scripts/manage-schema.sh rollback migrations/file.sql

# Backup database
./scripts/manage-schema.sh backup

# List all migrations
./scripts/manage-schema.sh list
```

---

**💡 Tip:** Always test your migrations on a copy of your production data before applying to production! 