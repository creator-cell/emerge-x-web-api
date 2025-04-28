const express = require("express");
const contactCardController = require("../../controllers/contactCard.controller");
const contactCardValidator = require("../../validations/contactCard.validator.js");
const router = express.Router();
const pagination = require("express-paginate");

// Get all contact cards (with pagination) and add a new one
router
  .route("/")
  .get(pagination.middleware(1, 1000), contactCardController.getAllContactCards)
  .post(
    contactCardValidator.createContactCardValidation,
    contactCardController.createContactCard
  );

// Get, update, or delete a specific contact card by ID
router
  .route("/:id")
  .get(contactCardValidator.contactCardIdValidation, contactCardController.getContactCard)
  .put(
    contactCardValidator.contactCardIdValidation,
    contactCardValidator.updateContactCardValidation,
    contactCardController.updateContactCard
  )
  .delete(
    contactCardValidator.contactCardIdValidation,
    contactCardController.deleteContactCard
  );

// Get contact card by name
router
  .route("/contact/:name")
  .get(contactCardValidator.contactCardNameValidation, contactCardController.getContactCard);

module.exports = router;
