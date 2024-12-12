const mongoose = require("mongoose");

const newsSchema = mongoose.Schema(
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

const News = mongoose.model("News", newsSchema);
module.exports = News;
