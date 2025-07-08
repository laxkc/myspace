import { pool } from "../utils/database.ts";

// Interface for admin
export interface Admin {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}

// Insert admin
export const insertAdmin = async (admin: Admin) => {
  const { name, email, password } = admin;
  const query = `INSERT INTO admin (name, email, password) VALUES ($1, $2, $3) RETURNING *`;
  const values = [name, email, password];
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
  const { id, name, email, password } = admin;
  const query = `UPDATE admin SET name = $2, email = $3, password = $4 WHERE id = $1 RETURNING *`;
  const values = [id, name, email, password];
  const result = await pool.query(query, values);
  return result.rows[0];
};


// Delete admin
export const deleteAdmin = async (id: string) => {
  const query = `DELETE FROM admin WHERE id = $1`;
  const result = await pool.query(query, [id]);
  return result.rowCount;
};