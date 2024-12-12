const express = require("express");
const contactController = require("../../controllers/contact.controller");
const contactValidator = require("../../validations/contact.validator.js");
const router = express.Router();

router.route("/").post(
  contactValidator.createContactValidation,
  contactController.createContact
);
router
  .route("/:id")
  .get(
    contactValidator.contactIdValidation,
    contactController.getContact
  )
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
