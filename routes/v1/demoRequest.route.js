const express = require("express");
const demoRequestController = require("../../controllers/demoRequest.controller");
const demoRequiresValidator = require("../../validations/demo.validator.js");
const router = express.Router();

router
  .route("/")
  .post(
    demoRequiresValidator.createDemoRequiresValidation,
    demoRequestController.createDemoRequest
  );
router
  .route("/:id")
  .get(
    demoRequiresValidator.demoRequiresIdValidation,
    demoRequestController.getDemoRequest
  )
  .put(
    demoRequiresValidator.demoRequiresIdValidation,
    demoRequiresValidator.updateDemoRequiresValidation,
    demoRequestController.updateDemoRequest
  )
  .delete(
    demoRequiresValidator.demoRequiresIdValidation,
    demoRequestController.deleteDemoRequest
  );

module.exports = router;
