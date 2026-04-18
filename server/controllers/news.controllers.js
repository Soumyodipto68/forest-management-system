import News from "../models/news.models.js";

// Create News
export const createNews = async (req, res) => {
  try {
    const news = await News.create(req.body);
    res.json(news);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all News
export const getNews = async (req, res) => {
  try {
    const newsList = await News.findAll();
    res.json(newsList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single News
export const getSingleNews = async (req, res) => {
  try {
    const news = await News.findByPk(req.params.id);
    if (!news) return res.status(404).json({ error: "News not found" });
    res.json(news);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update News
export const updateNews = async (req, res) => {
  try {
    const news = await News.findByPk(req.params.id);
    if (!news) return res.status(404).json({ error: "News not found" });
    await news.update(req.body);
    res.json(news);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete News
export const deleteNews = async (req, res) => {
  try {
    const news = await News.findByPk(req.params.id);
    if (!news) return res.status(404).json({ error: "News not found" });
    await news.destroy();
    res.json({ message: "News deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
