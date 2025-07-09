import express from "express";
import * as ContactService from "../services/contact.service";

type Request = express.Request;
type Response = express.Response;

// Create contact
export const createContact = async (req: Request, res: Response) => {
  try {
    const contact = req.body;
    const newContact = await ContactService.createContact(contact);
    res.status(201).json(newContact);
  } catch (error) {
    res.status(500).json({ error: "Failed to create contact" });
  }
};

// Get all contacts
export const getAllContacts = async (req: Request, res: Response) => {
  try {
    const contacts = await ContactService.getAllContacts();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error: "Failed to get all contacts" });
  }
};

// Get contact by id
export const getContactById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const contact = await ContactService.getContactById(id);
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ error: "Failed to get contact by id" });
  }
};

// Update contact
export const updateContact = async (req: Request, res: Response) => {
  try {
    const contact = req.body;
    const updatedContact = await ContactService.updateContact(contact);
    res.status(200).json(updatedContact);
  } catch (error) {
    res.status(500).json({ error: "Failed to update contact" });
  }
};

// Delete contact
export const deleteContact = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedContact = await ContactService.deleteContact(id);
    res.status(200).json(deletedContact);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete contact" });
  }
};
