import Park from "../models/park.models.js";

// Create Park
export const createPark = async (req, res) => {
  try {
    const park = await Park.create(req.body);
    res.json(park);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all Parks
export const getParks = async (req, res) => {
  try {
    const parks = await Park.findAll();
    res.json(parks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single Park
export const getPark = async (req, res) => {
  try {
    const park = await Park.findByPk(req.params.id);
    if (!park) return res.status(404).json({ error: "Park not found" });
    res.json(park);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Park
export const updatePark = async (req, res) => {
  try {
    const park = await Park.findByPk(req.params.id);
    if (!park) return res.status(404).json({ error: "Park not found" });
    await park.update(req.body);
    res.json(park);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete Park
export const deletePark = async (req, res) => {
  try {
    const park = await Park.findByPk(req.params.id);
    if (!park) return res.status(404).json({ error: "Park not found" });
    await park.destroy();
    res.json({ message: "Park deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
