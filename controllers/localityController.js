import Locality from "../models/Locality.js"; // Import the Locality model

// Get all localities
export const getAllLocalities = async (req, res) => {
  try {
    const localities = await Locality.find({});
    res.status(200).json(localities);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch localities" });
  }
};

// Get a specific locality by ID
export const getLocalityById = async (req, res) => {
  const { id } = req.params;
  try {
    const locality = await Locality.findById(id);
    if (!locality) {
      return res.status(404).json({ error: "Locality not found" });
    }
    res.status(200).json(locality);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch locality" });
  }
};

export const saveLocality = async (req, res) => {
  const localityData = req.body;

  try {
    const newLocality = new Locality(localityData);
    await newLocality.save();
    res
      .status(201)
      .json({ message: "Locality saved successfully!", newLocality });
  } catch (error) {
    res.status(500).json({ error: "Failed to save locality" });
  }
};
