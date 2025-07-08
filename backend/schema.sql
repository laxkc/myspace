-- Enable UUID generation (for PostgreSQL)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ADMIN TABLE
CREATE TABLE admin (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- CONTACT INFO (One-to-One with Admin)
CREATE TABLE contact_info (
  id SERIAL PRIMARY KEY,
  admin_id UUID REFERENCES admin(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  avatar TEXT,
  address TEXT,
  github_url TEXT,
  linkedin_url TEXT,
  twitter_url TEXT,
  phone TEXT,
  email TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- BLOGS
CREATE TABLE blogs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id UUID REFERENCES admin(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  meta_description TEXT,
  body TEXT NOT NULL,
  cover_image TEXT,
  is_published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMPTZ DEFAULT NOW(),
  is_featured BOOLEAN DEFAULT FALSE,
  slug TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- TAGS (shared by blogs and projects)
CREATE TABLE tags (
  id SERIAL PRIMARY KEY,
  title TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL
);

-- BLOG_TAGS (many-to-many)
CREATE TABLE blog_tags (
  blog_id UUID REFERENCES blogs(id) ON DELETE CASCADE,
  tag_id INT REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (blog_id, tag_id)
);

-- PROJECTS (with slug + tags)
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id UUID REFERENCES admin(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  meta_description TEXT,
  description TEXT,
  is_published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMPTZ DEFAULT NOW(),
  is_featured BOOLEAN DEFAULT FALSE,
  media TEXT,
  github_url TEXT,
  live_demo_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- PROJECT_TAGS (many-to-many)
CREATE TABLE project_tags (
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  tag_id INT REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (project_id, tag_id)
);
