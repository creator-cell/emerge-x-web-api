const { News } = require("../models");

const createNews = async (newsBody) => {
  return await News.create(newsBody);
};

const getNews = async (id) => {
  return await News.findById(id);
};

const updateNews = async (id, updateBody) => {
  return await News.findByIdAndUpdate(id, updateBody, { new: true });
};

const deleteNews = async (id) => {
  return await News.findByIdAndDelete(id);
};

module.exports = {
  createNews,
  getNews,
  updateNews,
  deleteNews,
};
