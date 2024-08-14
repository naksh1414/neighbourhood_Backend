import Locality from "../models/Locality.js"; // Import the Locality model
import upload from "../config/MulterConfig.js";
import { v4 as uuidv4 } from "uuid";
// import { cloudinary } from "../config/ClodinaryConfig.js";
// Get all localities
export const getAllLocalities = async (req, res) => {
  try {
    const { page = 1, limit = 9 } = req.query; // Default to page 1, limit 5
    const skip = (page - 1) * limit;
    const totalLocalities = await Locality.countDocuments({});
    const localities = await Locality.find({}).skip(skip).limit(Number(limit));
    const totalPages = Math.ceil(totalLocalities / limit);

    res.status(200).json({ localities, total: totalLocalities, totalPages });
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
  upload.array("images", 5)(req, res, async function (err) {
    if (err) {
      return res.status(500).json({ error: "Failed to upload images" });
    }

    try {
      const localityData = req.body;

      // Generate a unique ID using UUID
      localityData.id = uuidv4();

      // Parse services_offered if it is a string
      if (typeof localityData.services_offered === "string") {
        localityData.services_offered = JSON.parse(
          localityData.services_offered
        );
      }

      // Check if there are images to upload
      if (req.files && req.files.length > 0) {
        localityData.images = req.files.map((file) => ({
          imageLink: file.path, // Adjust this if you use Cloudinary
        }));
      }

      const newLocality = new Locality(localityData);
      await newLocality.save();
      res.status(201).json({
        message: "Locality saved successfully!",
        newLocality,
      });
    } catch (error) {
      console.error("Save Locality error:", error);
      res.status(500).json({ error: "Failed to save locality" });
    }
  });
};
