const { blogService } = require("../services");
const pagination = require("express-paginate");
const { validationResult } = require("../validations/blog.validator.js");

const createBlog = async (req, res) => {
  try {
    const errors = validationResult(req);
    console.log(errors.isEmpty());
    if (!errors.isEmpty()) {
      return res.status(400).json({ message:"Error creating blog", errors:errors.array() });
    }
    const blog = await blogService.createBlog(req.body);
    res.status(201).json({ message: "Blog created successfully" });
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).json({ error: "Failed to create blog" });
  }
};

const getAllBlog = async (req, res) => {
  try {
    const limit = req.query.limit || 10;
    const skip = req.skip || 0;
    const index = req.query.page || 1;
    const blog = await blogService.getAllBlogs(limit, skip);
    const blogCount = await blogService.countBlog();
    const totalPages = Math.ceil(blogCount / limit);
    return res.status(200).json({
      blog: blog,
      pages: pagination.getArrayPages(req)(limit, totalPages, index),
      nextPage: pagination.hasNextPages(req)(totalPages),
      currentPage: index,
      previousPage: index > 1,
    });
  } catch (error) {
    console.error("Error fetching blog:", error);
    res.status(500).json({ error: "Failed to fetch blog" });
  }
}

const getBlog = async (req, res) => {
  try {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json({ message:"Error get blog data", errors: errors.array() });
    }
    const blogId = req.params.id;
    const blog = await blogService.getBlog(blogId);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({ blog });
  } catch (error) {
    console.error("Error fetching blog:", error);
    res.status(500).json({ error: "Failed to fetch blog" });
  }
};

const updateBlog = async (req, res) => {
  try {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json({ message:"Error Update blog data", errors: errors.array() });
    }
    const blogId = req.params.id;
    const updatedBlog = await blogService.updateBlog(blogId, req.body);

    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res
      .status(200)
      .json({ message: "Blog updated successfully", blog: updatedBlog });
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).json({ error: "Failed to update blog" });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json({ message:"Error delete blog", errors: errors.array() });
    }
    const blogId = req.params.id;
    const deletedBlog = await blogService.deleteBlog(blogId);

    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ error: "Failed to delete blog" });
  }
};

module.exports = {
  createBlog,
  getBlog,
  updateBlog,
  deleteBlog,
  getAllBlog
};
