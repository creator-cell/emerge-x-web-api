const express = require("express");
const userController = require("../../controllers/user.controller");
const userValidator = require("../../validations/user.validator.js");
const pagination = require("express-paginate");
const router = express.Router();

router.route("/")
.get(
  pagination.middleware(1,1000),
  userController.getAllUser
)
.post(
    userValidator.createUser,
    userController.createUser
  );
router
  .route("/:id")
  .get(
    userValidator.validateUserId,
    userController.getUser
  )
  .put(
    userValidator.validateUserId,
    userValidator.updateUser,
    userController.updateUser
  )
  .delete(
    userValidator.validateUserId,
    userController.deleteUser
  );

router.route("/login").post(
  userValidator.login,
  userController.loginUser
);
router.route("/forgot-password").post(
  userValidator.forgotPassword,
  userController.forgotPassword
);
router.route("/reset-password").post(
  userValidator.resetPassword,
  userController.resetPassword
);
module.exports = router;
