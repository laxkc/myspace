import express from "express";
import * as AdminService from "../services/admin.service";
import { hashPassword } from "../utils/encrypt";

type Request = express.Request;
type Response = express.Response;

// Create admin
export const createAdmin = async (req: Request, res: Response) => {
    try {
        const admin = req.body;
        const newAdmin = await AdminService.createAdmin(admin);
        res.status(201).json(newAdmin);
    } catch (error) {
        res.status(500).json({ error: "Failed to create admin" });
    }
};

// Get admin by id
export const getAdminById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const admin = await AdminService.getAdminById(id);
        res.status(200).json(admin);
    } catch (error) {
        res.status(500).json({ error: "Failed to get admin by id" });
    }
};

// Get admin by email
export const getAdminByEmail = async (req: Request, res: Response) => {
    try {
        const { email } = req.params;
        const admin = await AdminService.getAdminByEmail(email);
        res.status(200).json(admin);
    } catch (error) {
        res.status(500).json({ error: "Failed to get admin by email" });
    }
};


// Update admin
export const updateAdmin = async (req: Request, res: Response) => {
    try {
        const admin = req.body;
        const updatedAdmin = await AdminService.updateAdmin(admin);
        res.status(200).json(updatedAdmin);
    } catch (error) {
        res.status(500).json({ error: "Failed to update admin" });
    }
};

// Delete admin
export const deleteAdmin = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedAdmin = await AdminService.deleteAdmin(id);
        res.status(200).json(deletedAdmin);
    } catch (error) {
        res.status(500).json({ error: "Failed to delete admin" });
    }
};

// Forgot password
export const forgotPassword = async (req: Request, res: Response) => {
    try {
        const { email, newPassword } = req.body;

        console.log(email, newPassword);
        
        // Validate required fields
        if (!email || !newPassword) {
            res.status(400).json({ 
                error: "Email and newPassword are required" 
            });
            return;
        }
        
        const hashedPassword = await hashPassword(newPassword);
        const updatedAdmin = await AdminService.forgotPassword(email, hashedPassword);
        res.status(200).json(updatedAdmin);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to forgot password" });
    }   
};