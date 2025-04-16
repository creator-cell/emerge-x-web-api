const { check, body, validationResult } = require("express-validator");
const { getDemoRequests } = require("../services/demoRequest.service.js");
const DemoRequires = require("../models/demoRequest.model.js");
const mongoose = require("mongoose");

const createDemoRequiresValidation = [
  check("name")
    .notEmpty()
    .withMessage("Name is require")
    .isString()
    .withMessage("Name must be string"),
  check("email")
    .notEmpty()
    .withMessage("Email is require")
    .isEmail()
    .withMessage("Email is not valid")
    .custom(async (value) => {
      const demoRequires = await DemoRequires.findOne({ email: value });
      if (demoRequires) {
        throw new Error("Email is exist please choose different email");
      }
      return true;
    }),
  check("mobile")
    .notEmpty()
    .withMessage("Mobile number is require")
    .isMobilePhone()
    .withMessage("Mobile number is not valid"),
];

const updateDemoRequiresValidation = [
  check("name")
    .notEmpty()
    .withMessage("Name is require")
    .isString()
    .withMessage("Name must be string"),
  check("email")
    .notEmpty()
    .withMessage("Email is require")
    .isEmail()
    .withMessage("Email is not valid")
    .custom(async (value) => {
      const demoRequires = await DemoRequires.findOne({ email: value });
      if (demoRequires) {
        throw new Error("Email is exist please choose different email");
      }
      return true;
    }),
  check("mobile")
    .notEmpty()
    .withMessage("Mobile number is require")
    .isMobilePhone()
    .withMessage("Mobile number is not valid"),
];

const demoRequiresIdValidation = [
  check("id")
    .notEmpty()
    .withMessage("Demo requires id is require")
    .custom(async (value) => {
      if (!mongoose.isValidObjectId(value)) {
        throw new Error("Demo requires id is not valid");
      }
      const demoRequest = await getDemoRequests(value);
      if (!demoRequest) {
        throw new Error("Demo requires is not found");
      }
      return true;
    }),
];

module.exports = {
  createDemoRequiresValidation,
  updateDemoRequiresValidation,
  demoRequiresIdValidation,
  validationResult,
};
