const express = require("express");
const blogController = require("../../controllers/blog.controller");

const router = express.Router();

router.route("/").post(blogController.createBlog);
router
  .route("/:id")
  .get(blogController.getBlog)
  .put(blogController.updateBlog)
  .delete(blogController.deleteBlog);

module.exports = router;
