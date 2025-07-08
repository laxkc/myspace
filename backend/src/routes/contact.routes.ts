import { Router } from "express";
import * as ContactController from "../controllers/contact.controller.ts";

const router = Router();

// Create contact
router.post("/", ContactController.createContact);

// Get all contacts
router.get("/", ContactController.getAllContacts);

// Get contact by id
router.get("/:id", ContactController.getContactById);

// Update contact
router.put("/:id", ContactController.updateContact);

// Delete contact
router.delete("/:id", ContactController.deleteContact);

export default router;