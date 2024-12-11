const { contactService } = require("../services");

const createContact = async (req, res) => {
  try {
    const contact = await contactService.createContact(req.body);
    res.status(201).json({ message: "Contact created successfully", contact });
  } catch (error) {
    console.error("Error creating contact:", error);
    res.status(500).json({ error: "Failed to create contact" });
  }
};

const getContact = async (req, res) => {
  try {
    const contactId = req.params.id;
    const contact = await contactService.getContact(contactId);

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json({ contact });
  } catch (error) {
    console.error("Error fetching contact:", error);
    res.status(500).json({ error: "Failed to fetch contact" });
  }
};

const updateContact = async (req, res) => {
  try {
    const contactId = req.params.id;
    const updatedContact = await contactService.updateContact(
      contactId,
      req.body
    );

    if (!updatedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json({
      message: "Contact updated successfully",
      contact: updatedContact,
    });
  } catch (error) {
    console.error("Error updating contact:", error);
    res.status(500).json({ error: "Failed to update contact" });
  }
};

const deleteContact = async (req, res) => {
  try {
    const contactId = req.params.id;
    const deletedContact = await contactService.deleteContact(contactId);

    if (!deletedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    console.error("Error deleting contact:", error);
    res.status(500).json({ error: "Failed to delete contact" });
  }
};

module.exports = {
  createContact,
  getContact,
  updateContact,
  deleteContact,
};