const { createContactCardService, getContactCardService, updateContactCardService, deleteContactCardService, getAllContactCardService, countContactCardService, getContactCardByNameService } = require("../services/contactCard.service.js");
const { validationResult } = require("../validations/contactCard.validator.js");
const pagination = require("express-paginate");

// Create Contact Card
const createContactCard = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ message: "Error to create contact card", errors: errors.array() });
    }

    console.log('Helloo')
    const contactCard = await createContactCardService(req.body);
    console.log('Hello')
    res.status(201).json({ message: "Contact card created successfully", contactCard });
  } catch (error) {
    console.error("Error creating contact card:", error);
    res.status(500).json({ error: "Failed to create contact card" });
  }
};

// Get Contact Card by ID or name
const getContactCard = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ message: "Error to get contact card", errors: errors.array() });
    }

    // Check if the parameter is an ID or name
    const contactCardParam = req.params.id || req.params.slug;

    // Determine the search type (ID or name)
    let contactCard;
    if (contactCardParam.match(/^[0-9a-fA-F]{24}$/)) {
      // It's a valid ObjectId, so we search by ID
      contactCard = await getContactCardService(contactCardParam);
    } else {
      // It's not a valid ObjectId, so we search by name
      contactCard = await getContactCardByNameService(contactCardParam);
    }

    if (!contactCard) {
      return res.status(404).json({ message: "Contact card not found" });
    }

    res.status(200).json({ contactCard });
  } catch (error) {
    console.error("Error fetching contact card:", error);
    res.status(500).json({ error: "Failed to fetch contact card" });
  }
};


// Update Contact Card
const updateContactCard = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ message: "Error to update contact card", errors: errors.array() });
    }

    const contactCardId = req.params.id;
    const updatedContactCard = await updateContactCardService(
      contactCardId,
      req.body
    );

    if (!updatedContactCard) {
      return res.status(404).json({ message: "Contact card not found" });
    }

    res.status(200).json({
      message: "Contact card updated successfully",
      contactCard: updatedContactCard,
    });
  } catch (error) {
    console.error("Error updating contact card:", error);
    res.status(500).json({ error: "Failed to update contact card" });
  }
};

// Delete Contact Card
const deleteContactCard = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ message: "Error to delete contact card", errors: errors.array() });
    }

    const contactCardId = req.params.id;
    const deletedContactCard = await deleteContactCardService(contactCardId);

    if (!deletedContactCard) {
      return res.status(404).json({ message: "Contact card not found" });
    }

    res.status(200).json({ message: "Contact card deleted successfully" });
  } catch (error) {
    console.error("Error deleting contact card:", error);
    res.status(500).json({ error: "Failed to delete contact card" });
  }
};

// Get All Contact Cards with Pagination
const getAllContactCards = async (req, res) => {
  try {
    const limit = req.query.limit || 10;
    const skip = req.skip || 0;
    const index = req.query.page || 1;

    const contactCards = await getAllContactCardService(limit, skip);
    const contactCardCount = await countContactCardService();
    const totalPages = Math.ceil(contactCardCount / limit);

    return res.status(200).json({
      contactCards: contactCards,
      pages: pagination.getArrayPages(req)(limit, totalPages, index),
      nextPage: pagination.hasNextPages(req)(totalPages),
      currentPage: index,
      previousPage: index > 1,
    });
  } catch (error) {
    console.error("Error fetching contact cards:", error);
    res.status(500).json({ error: error.message || "Failed to fetch contact cards" });
  }
};

module.exports = {
  createContactCard,
  getContactCard,
  updateContactCard,
  deleteContactCard,
  getAllContactCards,
};
