const mongoose = require("mongoose");

const blogSchema = mongoose.Schema(
  {
    htmlBody: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    bannerImage: {
      type: String,
      required: true,
    },
    futureImages: {
      type: String,
      required: true,
    },
    Images: {
      type: Array,
    },
    title: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
