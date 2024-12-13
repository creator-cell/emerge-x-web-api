const { check, body, validationResult } = require("express-validator");
const { default: mongoose } = require("mongoose");
const { getNews } = require("../services/news.service.js");

const createNewsValidation = [
  check("htmlBody")
    .notEmpty()
    .withMessage("html body is require")
    .isString()
    .withMessage("html body must be string"),
  check("bannerImage")
    .notEmpty()
    .withMessage("Banner image is require")
    .custom((value) => {
      const base64Regex =
        /^data:image\/(png|jpeg|jpg|gif|bmp|webp|svg\+xml);base64,[A-Za-z0-9+/=]+$/;
      if (!base64Regex.test(value)) {
        throw new Error("Invalid base64 banner image format");
      }
      return true;
    }),
  check("futureImages")
    .notEmpty()
    .withMessage("Future images is require")
    .custom((value) => {
      const base64Regex =
        /^data:image\/(png|jpeg|jpg|gif|bmp|webp|svg\+xml);base64,[A-Za-z0-9+/=]+$/;
      if (!base64Regex.test(value)) {
        throw new Error("Invalid base64 future image format");
      }
      return true;
    }),
  check("Images")
    .if(body("Images").notEmpty())
    .isArray()
    .withMessage("Images must be array"),
  check("Images.*")
    .optional()
    .custom((value) => {
      const base64Regex =
        /^data:image\/(png|jpeg|jpg|gif|bmp|webp|svg\+xml);base64,[A-Za-z0-9+/=]+$/;
      if (!base64Regex.test(value)) {
        throw new Error("Invalid base64 image format");
      }
      return true;
    }),
  check("title")
    .notEmpty()
    .withMessage("Title is require")
    .isString()
    .withMessage("Title must be string"),
  check("description")
    .notEmpty()
    .withMessage("Description is require")
    .isString()
    .withMessage("Description must be string"),
];

const updateNewsValidation = [
  check("htmlBody")
    .if(body("htmlBody").notEmpty())
    .isString()
    .withMessage("html body must be string"),
  // check("bannerImage")
  //     .if(body("bannerImage").notEmpty())
  //     .custom((value) => {
  //         const base64Regex = /^data:image\/(png|jpeg|jpg|gif|bmp|webp|svg\+xml);base64,[A-Za-z0-9+/=]+$/;
  //         if (!base64Regex.test(value)) {
  //             throw new Error("Invalid base64 banner image format");
  //         }
  //         return true;
  //     }),
  // check("futureImages")
  //     .if(body("futureImages").notEmpty())
  //     .custom((value) => {
  //         const base64Regex = /^data:image\/(png|jpeg|jpg|gif|bmp|webp|svg\+xml);base64,[A-Za-z0-9+/=]+$/;
  //         if (!base64Regex.test(value)) {
  //             throw new Error("Invalid base64 future image format");
  //         }
  //         return true;
  //     }),
  // check("Images")
  //     .if(body("Images").notEmpty())
  //     .isArray()
  //     .withMessage("Images must be array"),
  // check("Images.*")
  //     .optional()
  //     .custom((value) => {
  //         const base64Regex = /^data:image\/(png|jpeg|jpg|gif|bmp|webp|svg\+xml);base64,[A-Za-z0-9+/=]+$/;
  //         if (!base64Regex.test(value)) {
  //             throw new Error("Invalid base64 image format");
  //         }
  //         return true;
  //     }),
  check("title")
    .if(body("title").notEmpty())
    .isString()
    .withMessage("Title must be string"),
];

const newsIdValidation = [
  check("id")
    .notEmpty()
    .withMessage("Blog id not found")
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
