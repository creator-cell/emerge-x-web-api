const express = require("express");
const userController = require("../../controllers/user.controller");
const userValidator = require("../../validations/user.validator");

const router = express.Router();

router.route("/").post(userValidator.createUser,userController.createUser);
router
  .route("/:id")
  .get(userController.getUser)
  .put(userValidator.updateUser,userController.updateUser)
  .delete(userController.deleteUser);

router.route("/login").post(userValidator.login,userController.loginUser);
router.route("/forgot-password").post(userValidator.forgotPassword,userController.forgotPassword);
router.route("/reset-password").post(userValidator.resetPassword,userController.resetPassword);
module.exports = router;
