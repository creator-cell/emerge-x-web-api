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
        .custom(async(value) => {
            const demoRequires = await DemoRequires.findOne({ email:value });
            if(demoRequires) {
                throw new Error("Email is exist ply choose different email");
            }
            return true;
        }),
    check("mobile")
        .notEmpty()
        .withMessage("Mobile number is require")
        .isMobilePhone()
        .withMessage("Mobile number is not valid"),
    check("country")
        .if(body("country").notEmpty())
        .isString()
        .withMessage("Country must be string"),
    check("Company")
        .if(body("Company").notEmpty())
        .isString()
        .withMessage("Company must be string"),
    check("note")
        .if(body("note").notEmpty())
        .isString()
        .withMessage("note must be string"),
    check("status")
        .if(body("status").notEmpty())
        .isBoolean()
        .withMessage("Status must be boolean")
];

const updateDemoRequiresValidation = [
    check("name")
        .if(body("name").notEmpty())
        .isString()
        .withMessage("Name must be string"),
    check("mobile")
        .if(body("mobile").notEmpty())
        .isMobilePhone()
        .withMessage("Mobile number is not valid"),
    check("country")
        .if(body("country").notEmpty())
        .isString()
        .withMessage("Country must be string"),
    check("Company")
        .if(body("Company").notEmpty())
        .isString()
        .withMessage("Company must be string"),
    check("note")
        .if(body("note").notEmpty())
        .isString()
        .withMessage("note must be string"),
    check("status")
        .if(body("status").notEmpty())
        .isBoolean()
        .withMessage("Status must be boolean")
];

const demoRequiresIdValidation = [
    check("id")
        .notEmpty()
        .withMessage("Demo requires id is require")
        .custom(async(value) => {
            if (!mongoose.isValidObjectId(value)) {
                throw new Error("Demo requires id is not valid");
            }
            const demoRequest = await getDemoRequests(value);
            if (!demoRequest) {
                throw new Error("Demo requires is not found");
            }
            return true;
        })
];

module.exports = {
    createDemoRequiresValidation,
    updateDemoRequiresValidation,
    demoRequiresIdValidation,
    validationResult
}