const { check, body, validationResult } = require("express-validator");
const User = require("../models/user.model.js");
const { default: mongoose } = require("mongoose");

const createUser = [
  check("name")
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("UserName must be a string"),

  check("email")
    .notEmpty()
    .withMessage("E-Mail address is require")
    .isEmail()
    .withMessage("Please enter valid E-Mail address")
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user) {
        throw new Error("E-Mail is exist ply choose different");
      }
      return true;
    }),

  check("password")
    .notEmpty()
    .withMessage("Password is require")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
    .withMessage("Password must be at least 8 characters long, contain at least one digit, one lowercase letter, and one uppercase letter"),

  check("role")
    .notEmpty()
    .withMessage("Role is required")
    .isIn(["superadmin", "admin"])
    .withMessage("Role must be one of the following: admin, superadmin"),
];

const updateUser = [
  check("name")
    .optional()
    .isString()
    .withMessage("UserName must be a string"),
  check("role")
    .optional()
    .isIn(["superadmin", "admin"])
    .withMessage("Role must be one of the following: admin, superadmin"),
];

const login = [
  check("email")
    .notEmpty()
    .withMessage("E-Mail address is required")
    .isEmail()
    .withMessage("Please enter valid E-Mail address")
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (!user) {
        throw new Error("User not found");
      }
      return true;
    }),

  check("password")
    .notEmpty()
    .withMessage("Password is require")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
    .withMessage("Password must be at least8 characters long, contain at least one digit, one lowercase letter, and one uppercase letter")
]


const forgotPassword = [
  check("email")
    .notEmpty()
    .withMessage("E-Mail address is required")
    .isEmail()
    .withMessage("Please enter valid E-Mail address"),
];

const resetPassword = [
  check("Password")
    .notEmpty()
    .withMessage("Password is required")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
    .withMessage("Password must be at least 8 characters long, contain at least one digit, one lowercase letter, one uppercase letter, and one special character (!@#$%^&*)"),
  check("ResetToken")
    .notEmpty()
    .withMessage("Token is required")
    .isString()
    .withMessage("Token must be a string"),
];

const validateUserId = [
  check("id")
    .notEmpty()
    .withMessage("User id is require")
    .custom( async (value) => {
      if (!mongoose.isValidObjectId(value)) {
        throw new Error("User id is not valid");
      }
      const user = await User.findById(value);
      if (!user) {
        throw new Error("User is not found");
      }
      return true;
    })
];

module.exports = {
  validationResult,
  createUser,
  updateUser,
  resetPassword,
  forgotPassword,
  login,
  validateUserId
};
