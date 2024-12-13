const { check, body, validationResult } = require("express-validator");
const { default: mongoose } = require("mongoose");
const { getNews } = require("../services/news.service.js");

const createNewsValidation = [
  check("heading")
    .notEmpty()
    .withMessage("heading is require")
    .isString()
    .withMessage("heading must be string"),
  check("mainDescription")
    .notEmpty()
    .withMessage("mainDescription is require")
    .isString()
    .withMessage("mainDescription must be string"),
  check("description1")
    .notEmpty()
    .withMessage("description1 is require")
    .isString()
    .withMessage("description1 must be string"),
  check("description2")
    .notEmpty()
    .withMessage("description2 is require")
    .isString()
    .withMessage("description2 must be string"),
  check("finalDescription")
    .notEmpty()
    .withMessage("finalDescription is require")
    .isString()
    .withMessage("finalDescription must be string"),
  check("heroBanner")
    .notEmpty()
    .withMessage("heroBanner is require")
    .custom((value) => {
      const base64Regex =
        /^data:image\/(png|jpeg|jpg|gif|bmp|webp|svg\+xml);base64,[A-Za-z0-9+/=]+$/;
      if (!base64Regex.test(value)) {
        throw new Error("Invalid base64 heroBanner format");
      }
      return true;
    }),
  check("featureImage")
    .notEmpty()
    .withMessage("featureImage is require")
    .custom((value) => {
      const base64Regex =
        /^data:image\/(png|jpeg|jpg|gif|bmp|webp|svg\+xml);base64,[A-Za-z0-9+/=]+$/;
      if (!base64Regex.test(value)) {
        throw new Error("Invalid base64 featureImage format");
      }
      return true;
    }),
  check("subFeatureImage1")
    .notEmpty()
    .withMessage("subFeatureImage1 is require")
    .custom((value) => {
      const base64Regex =
        /^data:image\/(png|jpeg|jpg|gif|bmp|webp|svg\+xml);base64,[A-Za-z0-9+/=]+$/;
      if (!base64Regex.test(value)) {
        throw new Error("Invalid base64 subFeatureImage1 format");
      }
      return true;
    }),
  check("subFeatureImage2")
    .notEmpty()
    .withMessage("subFeatureImage2 is require")
    .custom((value) => {
      const base64Regex =
        /^data:image\/(png|jpeg|jpg|gif|bmp|webp|svg\+xml);base64,[A-Za-z0-9+/=]+$/;
      if (!base64Regex.test(value)) {
        throw new Error("Invalid base64 subFeatureImage2 format");
      }
      return true;
    }),
];

const updateNewsValidation = [];

const newsIdValidation = [
  check("id")
    .notEmpty()
    .withMessage("News id not found")
    .custom(async (value) => {
      if (!mongoose.isValidObjectId(value)) {
        throw new Error("News id is not valid");
      }
      const news = await getNews(value);
      if (!news) {
        throw new Error("News is not found");
      }
      return true;
    }),
];

module.exports = {
  createNewsValidation,
  updateNewsValidation,
  newsIdValidation,
  validationResult,
};
