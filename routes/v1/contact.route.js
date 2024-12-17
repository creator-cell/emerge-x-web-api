const express = require("express");
const contactController = require("../../controllers/contact.controller");
const contactValidator = require("../../validations/contact.validator.js");
const router = express.Router();
const pagination = require("express-paginate");

router
  .route("/")
  .get(pagination.middleware(1, 1000), contactController.getAllContact)
  .post(
    contactValidator.createContactValidation,
    contactController.createContact
  );
router
  .route("/:id")
  .get(contactValidator.contactIdValidation, contactController.getContact)
  .put(
    contactValidator.contactIdValidation,
    contactValidator.updateContactValidation,
    contactController.updateContact
  )
  .delete(
    contactValidator.contactIdValidation,
    contactController.deleteContact
  );

module.exports = router;
