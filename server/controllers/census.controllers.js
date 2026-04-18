import Census from "../models/census.models.js";

// Create Census Record
export const createCensus = async (req, res) => {
  try {
    const census = await Census.create(req.body);
    res.json(census);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all Census Records
export const getCensus = async (req, res) => {
  try {
    const censusList = await Census.findAll();
    res.json(censusList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single Census Record
export const getCensusRecord = async (req, res) => {
  try {
    const census = await Census.findByPk(req.params.id);
    if (!census) return res.status(404).json({ error: "Census record not found" });
    res.json(census);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Census Record
export const updateCensus = async (req, res) => {
  try {
    const census = await Census.findByPk(req.params.id);
    if (!census) return res.status(404).json({ error: "Census record not found" });
    await census.update(req.body);
    res.json(census);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete Census Record
export const deleteCensus = async (req, res) => {
  try {
    const census = await Census.findByPk(req.params.id);
    if (!census) return res.status(404).json({ error: "Census record not found" });
    await census.destroy();
    res.json({ message: "Census record deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
