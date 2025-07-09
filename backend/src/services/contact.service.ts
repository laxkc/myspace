import * as ContactModel from "../models/contact.model";

// Create contact
export const createContact = async (contact: ContactModel.Contact) => {
  try {
    const newContact = await ContactModel.insertContact(contact);
    return newContact;
  } catch (error) {
    throw new Error("Failed to create contact");
  }
};

// Get all contacts
export const getAllContacts = async () => {
  try {
    return await ContactModel.getAllContacts();
  } catch (error) {
    throw new Error("Failed to get all contacts");
  }
};

// Get contact by id
export const getContactById = async (id: string) => {
  try {
    return await ContactModel.getContactById(id);
  } catch (error) {
    throw new Error("Failed to get contact by id");
  }
};

// Update contact
export const updateContact = async (contact: ContactModel.Contact) => {
  try {
    return await ContactModel.updateContact(contact);
  } catch (error) {
    throw new Error("Failed to update contact");
  }
};

// Delete contact
export const deleteContact = async (id: string) => {
  try {
    return await ContactModel.deleteContact(id);
  } catch (error) {
    throw new Error("Failed to delete contact");
  }
};
