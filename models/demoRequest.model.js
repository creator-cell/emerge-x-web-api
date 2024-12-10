const mongoose = require("mongoose");

const demoRequestSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    country: {
      type: String,
    },
    note: {
      type: String,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const DemoRequest = mongoose.model("DemoRequest", demoRequestSchema);
module.exports = DemoRequest;
