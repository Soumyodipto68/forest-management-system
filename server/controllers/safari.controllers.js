import Safari from "../models/safari.models.js";

// Create Safari
export const createSafari = async (req, res) => {
  try {
    const safari = await Safari.create(req.body);
    res.json(safari);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all Safaris
export const getSafaris = async (req, res) => {
  try {
    const safaris = await Safari.findAll();
    res.json(safaris);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single Safari
export const getSafari = async (req, res) => {
  try {
    const safari = await Safari.findByPk(req.params.id);
    if (!safari) return res.status(404).json({ error: "Safari not found" });
    res.json(safari);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Safari
export const updateSafari = async (req, res) => {
  try {
    const safari = await Safari.findByPk(req.params.id);
    if (!safari) return res.status(404).json({ error: "Safari not found" });
    await safari.update(req.body);
    res.json(safari);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete Safari
export const deleteSafari = async (req, res) => {
  try {
    const safari = await Safari.findByPk(req.params.id);
    if (!safari) return res.status(404).json({ error: "Safari not found" });
    await safari.destroy();
    res.json({ message: "Safari deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
