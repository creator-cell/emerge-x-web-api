const { Blog } = require("../models");

const createBlog = async (newsBody) => {
  return await Blog.create(newsBody);
};

const getBlogs = async (id) => {
  return await Blog.findById(id);
};

const updateBlog = async (id, updateBody) => {
  return await Blog.findByIdAndUpdate(id, updateBody, { new: true });
};

const deleteBlog = async (id) => {
  return await Blog.findByIdAndDelete(id);
};

module.exports = {
  createBlog,
  getBlogs,
  updateBlog,
  deleteBlog,
};
