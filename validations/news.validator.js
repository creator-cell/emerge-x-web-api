const { check, body, validationResult } = require("express-validator");
const { default: mongoose } = require("mongoose");
const { getNews } = require("../services/news.service.js");

const createNewsValidation = [
  check("heading")
    // .notEmpty()
    // .withMessage("heading is require")
    .if(body("heading").notEmpty())
    .isString()
    .withMessage("heading must be string"),
  check("mainDescription")
    // .notEmpty()
    // .withMessage("mainDescription is require")
    .if(body("mainDescription").notEmpty())
    .isString()
    .withMessage("mainDescription must be string"),
  check("description1")
    // .notEmpty()
    // .withMessage("description1 is require")
    .if(body("description1").notEmpty())
    .isString()
    .withMessage("description1 must be string"),
  check("description2")
    // .notEmpty()
    // .withMessage("description2 is require")
    .if(body("description2").notEmpty())
    .isString()
    .withMessage("description2 must be string"),
  check("finalDescription")
    // .notEmpty()
    // .withMessage("finalDescription is require")
    .if(body("finalDescription").notEmpty())
    .isString()
    .withMessage("finalDescription must be string"),
  check("heroBanner")
    // .notEmpty()
    // .withMessage("heroBanner is require")
    .if(body("heroBanner").notEmpty())
    .custom((value) => {
      const base64Regex =
        /^data:image\/(png|jpeg|jpg|gif|bmp|webp|svg\+xml);base64,[A-Za-z0-9+/=]+$/;
      if (!base64Regex.test(value)) {
        throw new Error("Invalid base64 heroBanner format");
      }
      return true;
    }),
  check("featureImage")
    // .notEmpty()
    // .withMessage("featureImage is require")
    .if(body("featureImage").notEmpty())
    .custom((value) => {
      const base64Regex =
        /^data:image\/(png|jpeg|jpg|gif|bmp|webp|svg\+xml);base64,[A-Za-z0-9+/=]+$/;
      if (!base64Regex.test(value)) {
        throw new Error("Invalid base64 featureImage format");
      }
      return true;
    }),
  check("subFeatureImage1")
    // .notEmpty()
    // .withMessage("subFeatureImage1 is require")
    .if(body("subFeatureImage1").notEmpty())
    .custom((value) => {
      const base64Regex =
        /^data:image\/(png|jpeg|jpg|gif|bmp|webp|svg\+xml);base64,[A-Za-z0-9+/=]+$/;
      if (!base64Regex.test(value)) {
        throw new Error("Invalid base64 subFeatureImage1 format");
      }
      return true;
    }),
  check("subFeatureImage2")
    // .notEmpty()
    // .withMessage("subFeatureImage2 is require")
    .if(body("subFeatureImage2").notEmpty())
    .custom((value) => {
      const base64Regex =
        /^data:image\/(png|jpeg|jpg|gif|bmp|webp|svg\+xml);base64,[A-Za-z0-9+/=]+$/;
      if (!base64Regex.test(value)) {
        throw new Error("Invalid base64 subFeatureImage2 format");
      }
      return true;
    }),
];

const updateNewsValidation = [
  check("heading")
    .if(body("heading").notEmpty())
    .isString()
    .withMessage("heading must be string"),
  check("mainDescription")
    .if(body("mainDescription").notEmpty())
    .isString()
    .withMessage("mainDescription must be string"),
  check("description1")
    .if(body("description1").notEmpty())
    .isString()
    .withMessage("description1 must be string"),
  check("description2")
    .if(body("description2").notEmpty())
    .isString()
    .withMessage("description2 must be string"),
  check("finalDescription")
    .if(body("finalDescription").notEmpty())
    .isString()
    .withMessage("finalDescription must be string"),
  check("heroBanner")
    .if(body("heroBanner").notEmpty())
    .custom((value) => {
      const base64Regex =
        /^data:image\/(png|jpeg|jpg|gif|bmp|webp|svg\+xml);base64,[A-Za-z0-9+/=]+$/;
      if (!base64Regex.test(value)) {
        throw new Error("Invalid base64 heroBanner format");
      }
      return true;
    }),
  check("featureImage")
    .if(body("featureImage").notEmpty())
    .custom((value) => {
      const base64Regex =
        /^data:image\/(png|jpeg|jpg|gif|bmp|webp|svg\+xml);base64,[A-Za-z0-9+/=]+$/;
      if (!base64Regex.test(value)) {
        throw new Error("Invalid base64 featureImage format");
      }
      return true;
    }),
  check("subFeatureImage1")
    .if(body("subFeatureImage1").notEmpty())
    .custom((value) => {
      const base64Regex =
        /^data:image\/(png|jpeg|jpg|gif|bmp|webp|svg\+xml);base64,[A-Za-z0-9+/=]+$/;
      if (!base64Regex.test(value)) {
        throw new Error("Invalid base64 subFeatureImage1 format");
      }
      return true;
    }),
  check("subFeatureImage2")
    .if(body("subFeatureImage2").notEmpty())
    .custom((value) => {
      const base64Regex =
        /^data:image\/(png|jpeg|jpg|gif|bmp|webp|svg\+xml);base64,[A-Za-z0-9+/=]+$/;
      if (!base64Regex.test(value)) {
        throw new Error("Invalid base64 subFeatureImage2 format");
      }
      return true;
    }),
];

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
