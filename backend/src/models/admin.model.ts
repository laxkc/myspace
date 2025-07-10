import { pool } from "../utils/database";

// Interface for admin
export interface Admin {
  id: string;
  email: string;
  password: string;
  created_at: Date;
}

// Insert admin
export const insertAdmin = async (admin: Admin) => {
  const { email, password } = admin;
  const query = `INSERT INTO admin (email, password) VALUES ($1, $2) RETURNING *`;
  const values = [email, password];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// Get admins by id
export const getAdminById = async (id: string) => {
  const query = `SELECT * FROM admin WHERE id = $1`;
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

// Get admin by email
export const getAdminByEmail = async (email: string) => {
  const query = `SELECT * FROM admin WHERE email = $1`;
  const result = await pool.query(query, [email]);
  return result.rows[0];
};

// Update admin
export const updateAdmin = async (admin: Admin) => {
  const { id, email, password } = admin;
  const query = `UPDATE admin SET email = $2, password = $3 WHERE id = $1 RETURNING *`;
  const values = [id, email, password];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// Delete admin
export const deleteAdmin = async (id: string) => {
  const query = `DELETE FROM admin WHERE id = $1`;
  const result = await pool.query(query, [id]);
  return result.rowCount;
};

// Forgot password
export const forgotPassword = async (email: string, newPassword: string) => {
  const query = `UPDATE admin SET password = $2 WHERE email = $1 RETURNING *`;
  const result = await pool.query(query, [email, newPassword]);
  return result.rows[0];
};
