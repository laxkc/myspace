import { pool } from "../utils/database";

// Interface for blog tag
export interface BlogTag {
  blogId: string;
  tagId: number;
}

// Insert blog tag
export const insertBlogTag = async (blogTag: BlogTag) => {
  const { blogId, tagId } = blogTag;
  const query = `INSERT INTO blog_tags (blog_id, tag_id) VALUES ($1, $2) RETURNING *`;
  const values = [blogId, tagId];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// Get blog tags by blog id
export const getBlogTagsByBlogId = async (blogId: string) => {
  const query = `SELECT * FROM blog_tags WHERE blog_id = $1`;
  const result = await pool.query(query, [blogId]);
  return result.rows;
};

// Get blog tags by tag id
export const getBlogTagsByTagId = async (tagId: number) => {
  const query = `SELECT * FROM blog_tags WHERE tag_id = $1`;
  const result = await pool.query(query, [tagId]);
  return result.rows;
};

// Delete blog tag
export const deleteBlogTag = async (blogId: string, tagId: number) => {
  const query = `DELETE FROM blog_tags WHERE blog_id = $1 AND tag_id = $2`;
  const result = await pool.query(query, [blogId, tagId]);
  return result.rowCount;
};

// Get all blog tags slug for published blogs no duplicates
export const getAllBlogTags = async () => {
  const query = `
     SELECT DISTINCT t.id AS tag_id, t.slug
    FROM blog_tags bt
    JOIN tags t ON bt.tag_id = t.id
    JOIN blogs b ON bt.blog_id = b.id
    WHERE b.is_published = true
  `;
  const result = await pool.query(query);
  return result.rows;
};

