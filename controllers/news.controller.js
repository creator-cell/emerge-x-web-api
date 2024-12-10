const { newsService } = require("../services");

const createNews = async (req, res) => {
  try {
    const news = await newsService.createNews(req.body);
    res.status(201).json({ message: "News created successfully", news });
  } catch (error) {
    console.error("Error creating news:", error);
    res.status(500).json({ error: "Failed to create news" });
  }
};

const getNews = async (req, res) => {
  try {
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

const updateNews = async (req, res) => {
  try {
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
};
