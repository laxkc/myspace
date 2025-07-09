import { pool } from "../utils/database";

// Interface for project
export interface Project {
  id?: string;
  adminId: string;
  title: string;
  slug: string;
  metaDescription: string;
  description: string;
  isPublished: boolean;
  publishedAt: Date;
  isFeatured: boolean;
  media: string;
  githubUrl: string;
  liveDemoUrl: string;
  createdAt: Date;
  updatedAt: Date;
  tags?: string[];
}

// Insert project
export const insertProject = async (project: Project) => {
  const {
    adminId,
    title,
    slug,
    metaDescription,
    description,
    isPublished,
    publishedAt,
    isFeatured,
    media,
    githubUrl,
    liveDemoUrl,
  } = project;
  const query = `INSERT INTO projects (admin_id, title, slug, meta_description, description, is_published, published_at, is_featured, media, github_url, live_demo_url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`;
  const values = [
    adminId,
    title,
    slug,
    metaDescription,
    description,
    isPublished,
    publishedAt,
    isFeatured,
    media,
    githubUrl,
    liveDemoUrl,
  ];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// Get all projects if is_published is true order by created_at descending
export const getAllProjects = async () => {
  const query = `SELECT * FROM projects WHERE is_published = true ORDER BY created_at DESC`;
  const result = await pool.query(query);
  return result.rows;
};

// Get project by id if is_published is true
export const getProjectById = async (id: string) => {
  const query = `SELECT * FROM projects WHERE id = $1 AND is_published = true`;
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

// Get project by slug if is_published is true
export const getProjectBySlug = async (slug: string) => {
  const query = `SELECT * FROM projects WHERE slug = $1 AND is_published = true`;
  const result = await pool.query(query, [slug]);
  return result.rows[0];
};

// Update project
export const updateProject = async (project: Project) => {
  const {
    id,
    adminId,
    title,
    slug,
    metaDescription,
    description,
    isPublished,
    publishedAt,
    isFeatured,
    media,
    githubUrl,
    liveDemoUrl,
  } = project;
  const query = `UPDATE projects SET admin_id = $2, title = $3, slug = $4, meta_description = $5, description = $6, is_published = $7, published_at = $8, is_featured = $9, media = $10, github_url = $11, live_demo_url = $12 WHERE id = $1 RETURNING *`;
  const values = [
    id,
    adminId,
    title,
    slug,
    metaDescription,
    description,
    isPublished,
    publishedAt,
    isFeatured,
    media,
    githubUrl,
    liveDemoUrl,
  ];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// Delete project
export const deleteProject = async (id: string) => {
  const query = `DELETE FROM projects WHERE id = $1`;
  const result = await pool.query(query, [id]);
  return result.rowCount;
};

// Get featured projects latest 3 if is_published is true
export const getFeaturedProjects = async () => {
  const query = `SELECT * FROM projects WHERE is_featured = true AND is_published = true ORDER BY created_at DESC LIMIT 3`;
  const result = await pool.query(query);
  return result.rows;
};
