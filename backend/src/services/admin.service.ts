import * as AdminModel from "../models/admin.model";
import { validateEmail } from "../utils/validateEmail";

// Create admin
export const createAdmin = async (admin: AdminModel.Admin) => {
  try {
    if (!validateEmail(admin.email)) {
      throw new Error("Invalid email");
    }
    const existingAdmin = await AdminModel.getAdminByEmail(admin.email);
    if (existingAdmin) {
      throw new Error("Admin with this email already exists");
    }
    const newAdmin = await AdminModel.insertAdmin(admin);
    return newAdmin;
  } catch (error) {
    throw new Error("Failed to create admin");
  }
};

// Get admin by id
export const getAdminById = async (id: string) => {
  try {
    return await AdminModel.getAdminById(id);
  } catch (error) {
    throw new Error("Failed to get admin by id");
  }
};

// Get admin by email
export const getAdminByEmail = async (email: string) => {
  try {
    return await AdminModel.getAdminByEmail(email);
  } catch (error) {
    throw new Error("Failed to get admin by email");
  }
};

// Update admin
export const updateAdmin = async (admin: AdminModel.Admin) => {
  try {
    return await AdminModel.updateAdmin(admin);
  } catch (error) {
    throw new Error("Failed to update admin");
  }
};

// Delete admin
export const deleteAdmin = async (id: string) => {
  try {
    return await AdminModel.deleteAdmin(id);
  } catch (error) {
    throw new Error("Failed to delete admin");
  }
};


// Forgot password
export const forgotPassword = async (email: string, newPassword: string) => {
  try {
    // Validate inputs
    if (!email || !newPassword) {
      throw new Error("Email and newPassword are required");
    }
    
    // Check if admin exists
    const existingAdmin = await AdminModel.getAdminByEmail(email);
    if (!existingAdmin) {
      throw new Error("Admin with this email does not exist");
    }
    
    return await AdminModel.forgotPassword(email, newPassword);
  } catch (error) {
    console.error("Forgot password error:", error);
    throw new Error(`Failed to forgot password: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};