import { pool } from "../utils/database";

// Interface for contact
export interface Contact {
  id: string;
  adminId: string;
  firstName: string;
  lastName: string;
  avatar: string;
  address: string;
  githubUrl: string;
  linkedinUrl: string;
  twitterUrl: string;
  phone: string;
  email: string;
  updatedAt: Date;
}

// Insert contact
export const insertContact = async (contact: Contact) => {
  const {
    adminId,
    firstName,
    lastName,
    avatar,
    address,
    githubUrl,
    linkedinUrl,
    twitterUrl,
    phone,
    email,
  } = contact;
  const query = `INSERT INTO contact_info (admin_id, first_name, last_name, avatar, address, github_url, linkedin_url, twitter_url, phone, email) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`;
  const values = [
    adminId,
    firstName,
    lastName,
    avatar,
    address,
    githubUrl,
    linkedinUrl,
    twitterUrl,
    phone,
    email,
  ];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// Get all contacts
export const getAllContacts = async () => {
  const query = `SELECT * FROM contact_info`;
  const result = await pool.query(query);
  return result.rows;
};

// Get contact by id
export const getContactById = async (id: string) => {
  const query = `SELECT * FROM contact_info WHERE id = $1`;
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

// Update contact
export const updateContact = async (contact: Contact) => {
  const {
    id,
    adminId,
    firstName,
    lastName,
    avatar,
    address,
    githubUrl,
    linkedinUrl,
    twitterUrl,
    phone,
    email,
  } = contact;
  const query = `UPDATE contact_info SET admin_id = $2, first_name = $3, last_name = $4, avatar = $5, address = $6, github_url = $7, linkedin_url = $8, twitter_url = $9, phone = $10, email = $11 WHERE id = $1 RETURNING *`;
  const values = [
    id,
    adminId,
    firstName,
    lastName,
    avatar,
    address,
    githubUrl,
    linkedinUrl,
    twitterUrl,
    phone,
    email,
  ];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// Delete contact
export const deleteContact = async (id: string) => {
  const query = `DELETE FROM contact_info WHERE id = $1`;
  const result = await pool.query(query, [id]);
  return result.rowCount;
};
