const express = require("express");
const contactController = require("../../controllers/contact.controller");

const router = express.Router();

router.route("/").post(contactController.createContact);
router
  .route("/:id")
  .get(contactController.getContact)
  .put(contactController.updateContact)
  .delete(contactController.deleteContact);

module.exports = router;
