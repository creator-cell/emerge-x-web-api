const mongoose = require("mongoose");

const contactCardSchema = mongoose.Schema(
  {
    photo: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    facebookLink: {
      type: String,
      required: true,
    },
    instagramLink: {
      type: String,
      required: true,
    },
    twitterLink: {
      type: String,
      required: true,
    },
    linkedinLink: {
      type: String,
      required: true,
    },
    websiteLink: {
      type: String,
      required: true,
    },
    whatsappNumber: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ContactCard = mongoose.model("ContactCard", contactCardSchema);
module.exports = ContactCard;
