const { check, body, validationResult } = require("express-validator");
const { getContacts } = require("../services/contact.service.js");
const Contact = require("../models/contact.model.js");
const mongoose = require("mongoose");

const createContactValidation = [
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
            const contact = await Contact.findOne({ email:value });
            if(contact) {
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
        .withMessage("note must be string")
];

const updateContactValidation = [
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
        .withMessage("note must be string")
];

const contactIdValidation = [
    check("id")
        .notEmpty()
        .withMessage("Contact id is require")
        .custom(async(value) => {
            if (!mongoose.isValidObjectId(value)) {
                throw new Error("Contact id is not valid");
            }
            const contact = await getContacts(value);
            if (!contact) {
                throw new Error("contact is not found");
            }
            return true;
        })
];

module.exports = {
    createContactValidation,
    updateContactValidation,
    contactIdValidation,
    validationResult
}