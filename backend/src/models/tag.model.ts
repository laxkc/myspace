import { pool } from "../utils/database.ts";

// Interface for tag
export interface Tag {
  id: string;
  title: string;
  slug: string;
}

// Insert tag
export const insertTag = async (tag: Tag) => {
  const { id, title, slug } = tag;
  const query = `INSERT INTO tags (id, title, slug) VALUES ($1, $2, $3) RETURNING *`;
  const values = [id, title, slug];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// Get all tags
export const getAllTags = async () => {
  const query = `SELECT * FROM tags`;
  const result = await pool.query(query);
  return result.rows;
};

// Get tag by id
export const getTagById = async (id: string) => {
  const query = `SELECT * FROM tags WHERE id = $1`;
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

// Get tag by slug
export const getTagBySlug = async (slug: string) => {
  const query = `SELECT * FROM tags WHERE slug = $1`;
  const result = await pool.query(query, [slug]);
  return result.rows[0];
};

// Update tag
export const updateTag = async (tag: Tag) => {
  const { id, title, slug } = tag;
  const query = `UPDATE tags SET title = $1, slug = $2 WHERE id = $3 RETURNING *`;
  const values = [title, slug, id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// Delete tag
export const deleteTag = async (id: string) => {
  const query = `DELETE FROM tags WHERE id = $1 RETURNING *`;
  const result = await pool.query(query, [id]);
  return result.rows[0];
};
