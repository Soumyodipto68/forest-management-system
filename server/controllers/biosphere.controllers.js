import Biosphere from "../models/biosphere.models.js";

// Create
export const createBiosphere = async (req, res) => {
  try {
    const biosphere = await Biosphere.create(req.body);
    res.json(biosphere);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Read all
export const getBiospheres = async (req, res) => {
  try {
    const biospheres = await Biosphere.findAll();
    res.json(biospheres);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Read one
export const getBiosphere = async (req, res) => {
  try {
    const biosphere = await Biosphere.findByPk(req.params.id);
    if (!biosphere) return res.status(404).json({ error: "Not found" });
    res.json(biosphere);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update
export const updateBiosphere = async (req, res) => {
  try {
    const biosphere = await Biosphere.findByPk(req.params.id);
    if (!biosphere) return res.status(404).json({ error: "Not found" });
    await biosphere.update(req.body);
    res.json(biosphere);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete
export const deleteBiosphere = async (req, res) => {
  try {
    const biosphere = await Biosphere.findByPk(req.params.id);
    if (!biosphere) return res.status(404).json({ error: "Not found" });
    await biosphere.destroy();
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
