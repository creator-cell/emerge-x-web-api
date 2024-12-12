const express = require("express");
const blogController = require("../../controllers/blog.controller");
const blogValidation = require("../../validations/blog.validator.js");

const router = express.Router();

router.route("/")
  .get(blogController.getAllBlog)
  .post(
    blogValidation.createBlogValidation,
    blogController.createBlog
  );
router
  .route("/:id")
  .get(
    blogValidation.blogIdValidation,
    blogController.getBlog
  )
  .put(
    blogValidation.blogIdValidation,
    blogValidation.updateBlogValidation,
    blogController.updateBlog
  )
  .delete(
    blogValidation.blogIdValidation,
    blogController.deleteBlog
  );

module.exports = router;
