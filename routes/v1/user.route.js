const express = require("express");
const userController = require("../../controllers/user.controller");
// const userValidator = require("../../validations/user.validator");

const router = express.Router();
console.log("user route");

router.route("/").post(userController.createUser);
router
  .route("/:id")
  .get(userController.getUser)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

router.route("/login").post(userController.loginUser);
router.route("/forgot-password").post(userController.forgotPassword);
router.route("/reset-password").post(userController.resetPassword);
module.exports = router;
