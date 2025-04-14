const { check, body, validationResult } = require("express-validator");
const { default: mongoose } = require("mongoose");
const { getBlogs } = require("../services/blog.service.js");

const createBlogValidation = [
  check("htmlBody")
    // .notEmpty()
    // .withMessage("html body is require")
    .if(body("htmlBody").notEmpty())
    .isString()
    .withMessage("html body must be string"),
  check("bannerImage")
    // .notEmpty()
    // .withMessage("Banner image is require")
    .if(body("bannerImage").notEmpty())
    .custom((value) => {
      const base64Regex =
        /^data:image\/(png|jpeg|jpg|gif|bmp|webp|svg\+xml);base64,[A-Za-z0-9+/=]+$/;
      if (!base64Regex.test(value)) {
        throw new Error("Invalid base64 banner image format");
      }
      return true;
    }),
  check("futureImages")
    // .notEmpty()
    // .withMessage("Future images is require")
    .if(body("futureImages").notEmpty())
    .custom((value) => {
      const base64Regex =
        /^data:image\/(png|jpeg|jpg|gif|bmp|webp|svg\+xml);base64,[A-Za-z0-9+/=]+$/;
      if (!base64Regex.test(value)) {
        throw new Error("Invalid base64 future image format");
      }
      return true;
    }),
  check("title")
    // .notEmpty()
    // .withMessage("Title is require")
    .if(body("title").notEmpty())
    .isString()
    .withMessage("Title must be string"),
  check("authorName")
    // .notEmpty()
    // .withMessage("authorName is require")
    .if(body("authorName").notEmpty())
    .isString()
    .withMessage("authorName must be string"),
  check("description")
    // .notEmpty()
    // .withMessage("Description is require")
    .if(body("description").notEmpty())
    .isString()
    .withMessage("Description must be string"),
];

const updateBlogValidation = [
  check("htmlBody")
    .if(body("htmlBody").notEmpty())
    .isString()
    .withMessage("html body must be string"),
  check("bannerImage")
    .if(body("bannerImage").notEmpty())
    .custom((value) => {
      const base64Regex =
        /^data:image\/(png|jpeg|jpg|gif|bmp|webp|svg\+xml);base64,[A-Za-z0-9+/=]+$/;
      if (!base64Regex.test(value)) {
        throw new Error("Invalid base64 banner image format");
      }
      return true;
    }),
  check("futureImages")
    .if(body("futureImages").notEmpty())
    .custom((value) => {
      const base64Regex =
        /^data:image\/(png|jpeg|jpg|gif|bmp|webp|svg\+xml);base64,[A-Za-z0-9+/=]+$/;
      if (!base64Regex.test(value)) {
        throw new Error("Invalid base64 future image format");
      }
      return true;
    }),
  check("authorName")
    // .notEmpty()
    // .withMessage("authorName is require")
    .if(body("authorName").notEmpty())
    .isString()
    .withMessage("authorName must be string"),
  check("title")
    .if(body("title").notEmpty())
    .isString()
    .withMessage("Title must be string"),
  check("description")
    .if(body("description").notEmpty())
    .isString()
    .withMessage("Description must be string"),
];

const blogIdValidation = [
  check("id")
    .notEmpty()
    .withMessage("Blog id not found")
    .custom(async (value) => {
      if (!mongoose.isValidObjectId(value)) {
        throw new Error("Blog id is not valid");
      }
      const blog = await getBlogs(value);
      if (!blog) {
        throw new Error("Blog is not found");
      }
      return true;
    }),
];

module.exports = {
  createBlogValidation,
  updateBlogValidation,
  blogIdValidation,
  validationResult,
};
