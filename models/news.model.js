const mongoose = require("mongoose");

const newsSchema = mongoose.Schema(
  {
    heading: {
      type: String,
      required: true,
    },
    mainDescription: {
      type: String,
      required: true,
    },
    description1: {
      type: String,
      required: true,
    },
    description2: {
      type: String,
      required: true,
    },
    finalDescription: {
      type: String,
      required: true,
    },
    heroBanner: {
      type: String,
      required: true,
    },
    featureImage: {
      type: String,
      required: true,
    },
    subFeatureImage1: {
      type: String,
      required: true,
    },
    subFeatureImage2: {
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
