const express = require("express");
const demoRequestController = require("../../controllers/demoRequest.controller");

const router = express.Router();

router.route("/").post(demoRequestController.createDemoRequest);
router
  .route("/:id")
  .get(demoRequestController.getDemoRequest)
  .put(demoRequestController.updateDemoRequest)
  .delete(demoRequestController.deleteDemoRequest);

module.exports = router;
