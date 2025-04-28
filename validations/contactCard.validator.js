const { check, validationResult } = require("express-validator");
const ContactCard = require("../models/contactCard.model");

const createContactCardValidation = [
    check("photo")
        .notEmpty()
        .withMessage("Photo is required")
        .custom((value) => {
            const base64Pattern = /^data:image\/(jpeg|jpg|png);base64,[A-Za-z0-9+/=]+$/i;
            if (!base64Pattern.test(value)) {
                throw new Error("Photo must be a valid Base64-encoded JPEG or PNG image");
            }
            return true;
        }),

    check("name")
        .notEmpty()
        .withMessage("Name is required")
        .isString()
        .withMessage("Name must be a string"),

    check("position")
        .notEmpty()
        .withMessage("Position is required")
        .isString()
        .withMessage("Position must be a string"),

    check("contactNumber")
        .notEmpty()
        .withMessage("Contact number is required")
        .isMobilePhone()
        .withMessage("Contact number is not valid"),

    check("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Email is not valid"),

    check("location")
        .notEmpty()
        .withMessage("Location is required")
        .isString()
        .withMessage("Location must be a string"),

    check("facebookLink")
        .notEmpty()
        .withMessage("Facebook link is required")
        .isURL()
        .withMessage("Facebook link must be a valid URL"),

    check("instagramLink")
        .notEmpty()
        .withMessage("Instagram link is required")
        .isURL()
        .withMessage("Instagram link must be a valid URL"),

    check("twitterLink")
        .notEmpty()
        .withMessage("Twitter link is required")
        .isURL()
        .withMessage("Twitter link must be a valid URL"),

    check("linkedinLink")
        .notEmpty()
        .withMessage("LinkedIn link is required")
        .isURL()
        .withMessage("LinkedIn link must be a valid URL"),

    check("websiteLink")
        .notEmpty()
        .withMessage("Website link is required")
        .isURL()
        .withMessage("Website link must be a valid URL"),

    check("whatsappNumber")
        .notEmpty()
        .withMessage("WhatsApp number is required")
        .isMobilePhone()
        .withMessage("WhatsApp number is not valid"),
];

const updateContactCardValidation = [...createContactCardValidation];

// Validation for deleting a contact card
const contactCardIdValidation = [
    check("id")
        .notEmpty()
        .withMessage("Contact card ID is required")
        .isMongoId()
        .withMessage("Invalid Contact card ID"),
];

// Validation for getting a contact card by name
const contactCardNameValidation = [
    check("name")
        .notEmpty()
        .withMessage("Name is required")
        .isString()
        .withMessage("Name must be a valid string"),
];

module.exports = {
    createContactCardValidation,
    updateContactCardValidation,
    contactCardIdValidation,
    contactCardNameValidation,
    validationResult,
};
