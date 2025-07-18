import  { Router }  from "express";
import * as AdminController from "../controllers/admin.controller";


const router = Router();

// Create admin
router.post("/", AdminController.createAdmin);

// Forgot password
router.put("/forgot-password", AdminController.forgotPassword);

// Get admin by id
router.get("/:id", AdminController.getAdminById);

// Get admin by email
router.get("/:email", AdminController.getAdminByEmail);

// Update admin
router.put("/:id", AdminController.updateAdmin);

// Delete admin
router.delete("/:id", AdminController.deleteAdmin);


export default router;