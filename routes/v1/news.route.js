const express = require("express");
const newsController = require("../../controllers/news.controller.js");
const newsValidation = require("../../validations/news.validator.js");
const router = express.Router();

router.route("/").post(
  newsValidation.createNewsValidation,
  newsController.createNews
);
router
  .route("/:id")
  .get(
    newsValidation.newsIdValidation,
    newsController.getNews
  )
  .put(
    newsValidation.newsIdValidation,
    newsValidation.updateNewsValidation,
    newsController.updateNews
  )
  .delete(
    newsValidation.newsIdValidation,
    newsController.deleteNews
  );

module.exports = router;
