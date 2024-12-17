const express = require("express");
const newsController = require("../../controllers/news.controller.js");
const newsValidation = require("../../validations/news.validator.js");
const router = express.Router();
const pagination = require("express-paginate");
router
  .route("/")
  .get(pagination.middleware(1, 1000), newsController.getAllNews)
  .post(newsValidation.createNewsValidation, newsController.createNews);
router
  .route("/:id")
  .get(newsValidation.newsIdValidation, newsController.getNews)
  .put(
    newsValidation.newsIdValidation,
    newsValidation.updateNewsValidation,
    newsController.updateNews
  )
  .delete(newsValidation.newsIdValidation, newsController.deleteNews);

module.exports = router;
