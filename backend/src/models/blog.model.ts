import { pool } from "../utils/database";

// Interface for blog
export interface Blog {
  id?: string;
  adminId: string;
  title: string;
  metaDescription: string;
  body: string;
  coverImage: string;
  isPublished: boolean;
  publishedAt: Date;
  isFeatured: boolean;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  tags?: string[];
}

// Insert blog
export const insertBlog = async (blog: Blog) => {
  const {
    adminId,
    title,
    metaDescription,
    body,
    coverImage,
    isPublished,
    publishedAt,
    isFeatured,
    slug,
  } = blog;
  const query = `INSERT INTO blogs (admin_id, title, meta_description, body, cover_image, is_published, published_at, is_featured, slug) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`;
  const values = [
    adminId,
    title,
    metaDescription,
    body,
    coverImage,
    isPublished,
    publishedAt,
    isFeatured,
    slug,
  ];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// Get all blogs if is_published is true order by published_at descending
export const getAllBlogs = async () => {
  const query = `SELECT * FROM blogs WHERE is_published = true ORDER BY published_at DESC`;
  const result = await pool.query(query);
  return result.rows;
};

// Get blog by id
export const getBlogById = async (id: string) => {
  const query = `SELECT * FROM blogs WHERE id = $1`;
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

// Get blog by slug if is_published is true
export const getBlogBySlug = async (slug: string) => {
  const query = `SELECT * FROM blogs WHERE slug = $1 AND is_published = true`;
  const result = await pool.query(query, [slug]);
  return result.rows[0];
};

// Update blog
export const updateBlog = async (blog: Blog) => {
  const {
    id,
    adminId,
    title,
    metaDescription,
    body,
    coverImage,
    isPublished,
    publishedAt,
    isFeatured,
    slug,
  } = blog;
  const query = `UPDATE blogs SET title = $2, meta_description = $3, body = $4, cover_image = $5, is_published = $6, published_at = $7, is_featured = $8, slug = $9 WHERE id = $1 RETURNING *`;
  const values = [
    id,
    adminId,
    title,
    metaDescription,
    body,
    coverImage,
    isPublished,
    publishedAt,
    isFeatured,
    slug,
  ];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// Delete blog
export const deleteBlog = async (id: string) => {
  const query = `DELETE FROM blogs WHERE id = $1`;
  const result = await pool.query(query, [id]);
  return result.rowCount;
};

// Get featured blogs latest 3 if is_published is true
export const getFeaturedBlogs = async () => {
  const query = `SELECT * FROM blogs WHERE is_featured = true AND is_published = true ORDER BY published_at DESC LIMIT 3`;
  const result = await pool.query(query);
  return result.rows;
};

// Pagination for published blogs
export const getPaginatedPublishedBlogs = async (
  page: number,
  limit: number
) => {
  const offset = (page - 1) * limit;
  const query = `SELECT * FROM blogs WHERE is_published = true ORDER BY published_at DESC LIMIT $1 OFFSET $2`;
  const result = await pool.query(query, [limit, offset]);
  return result.rows;
};
