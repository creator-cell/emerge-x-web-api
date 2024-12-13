const { newsService } = require("../services");
const { validationResult } = require("../validations/news.validator.js");
const pagination = require("express-paginate");

const createNews = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: "Error to create news", errors: errors.array() });
    }
    const news = await newsService.createNews(req.body);
    res.status(201).json({ message: "News created successfully", news });
  } catch (error) {
    console.error("Error creating news:", error);
    res.status(500).json({ error: "Failed to create news" });
  }
};

const getNews = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: "Error to get news", errors: errors.array() });
    }
    const newsId = req.params.id;
    const news = await newsService.getNews(newsId);

    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }

    res.status(200).json({ news });
  } catch (error) {
    console.error("Error fetching news:", error);
    res.status(500).json({ error: "Failed to fetch news" });
  }
};

const getAllNews = async (req, res) => {
  try {
    const limit = req.query.limit || 10;
    const skip = req.skip || 0;
    const index = req.query.page || 1;
    const news = await newsService.getAllNews(limit, skip);
    const newsCount = await newsService.countNews();
    const totalPages = Math.ceil(newsCount / limit);
    return res.status(200).json({
      news: news,
      pages: pagination.getArrayPages(req)(limit, totalPages, index),
      nextPage: pagination.hasNextPages(req)(totalPages),
      currentPage: index,
      previousPage: index > 1,
    });
  } catch (error) {
    console.error("Error fetching news:", error);
    res.status(500).json({ error: error.message || "Failed to fetch news" });
  }
}

const updateNews = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: "Error to update news", errors: errors.array() });
    }
    const newsId = req.params.id;
    const updatedNews = await newsService.updateNews(newsId, req.body);

    if (!updatedNews) {
      return res.status(404).json({ message: "News not found" });
    }

    res
      .status(200)
      .json({ message: "News updated successfully", news: updatedNews });
  } catch (error) {
    console.error("Error updating news:", error);
    res.status(500).json({ error: "Failed to update news" });
  }
};

const deleteNews = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: "Error to delete news", errors: errors.array() });
    }
    const newsId = req.params.id;
    const deletedNews = await newsService.deleteNews(newsId);

    if (!deletedNews) {
      return res.status(404).json({ message: "News not found" });
    }

    res.status(200).json({ message: "News deleted successfully" });
  } catch (error) {
    console.error("Error deleting news:", error);
    res.status(500).json({ error: "Failed to delete news" });
  }
};

module.exports = {
  createNews,
  getNews,
  updateNews,
  deleteNews,
  getAllNews
};
