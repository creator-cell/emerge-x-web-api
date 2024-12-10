const express = require("express");
const newsController = require("../../controllers/news.controller");

const router = express.Router();

router.route("/").post(newsController.createNews);
router
  .route("/:id")
  .get(newsController.getNews)
  .put(newsController.updateNews)
  .delete(newsController.deleteNews);

module.exports = router;
