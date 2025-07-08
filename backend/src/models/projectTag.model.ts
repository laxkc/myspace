import { pool } from "../utils/database.ts";

// Interface for project tag
export interface ProjectTag {
  projectId: string;
  tagId: string;
}

// Insert project tag
export const insertProjectTag = async (projectTag: ProjectTag) => {
  const { projectId, tagId } = projectTag;
  const query = `INSERT INTO project_tags (project_id, tag_id) VALUES ($1, $2) RETURNING *`;
  const values = [projectId, tagId];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// Get project tags by project id
export const getProjectTagsByProjectId = async (projectId: string) => {
  const query = `SELECT * FROM project_tags WHERE project_id = $1`;
  const result = await pool.query(query, [projectId]);
  return result.rows;
};

// Get project tags by tag id
export const getProjectTagsByTagId = async (tagId: string) => {
  const query = `SELECT * FROM project_tags WHERE tag_id = $1`;
  const result = await pool.query(query, [tagId]);
  return result.rows;
};

// Delete project tag
export const deleteProjectTag = async (projectId: string, tagId: string) => {
  const query = `DELETE FROM project_tags WHERE project_id = $1 AND tag_id = $2`;
  const result = await pool.query(query, [projectId, tagId]);
  return result.rowCount;
};
