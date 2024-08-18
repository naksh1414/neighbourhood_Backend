import Locality from "../models/Locality.js"; // Import the Locality model
import upload from "../config/MulterConfig.js";
import { v4 as uuidv4 } from "uuid";
export const getAllLocalities = async (req, res) => {
  try {
    const { page = 1, limit = 9 } = req.query;
    const skip = (page - 1) * limit;
    const totalLocalities = await Locality.countDocuments({});
    const localities = await Locality.find({}).skip(skip).limit(Number(limit));
    const totalPages = Math.ceil(totalLocalities / limit);

    res.status(200).json({ localities, total: totalLocalities, totalPages });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch localities" });
  }
};
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
      localityData.id = uuidv4();
      if (typeof localityData.services_offered === "string") {
        localityData.services_offered = JSON.parse(
          localityData.services_offered
        );
      }
      if (req.files && req.files.length > 0) {
        localityData.images = req.files.map((file) => ({
          imageLink: file.path,
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
export const updateLocalityByShopName = async (req, res) => {
  const { shopName } = req.params;

  upload.array("images", 5)(req, res, async function (err) {
    if (err) {
      return res.status(500).json({ error: "Failed to upload images" });
    }
    try {
      if (!shopName) {
        return res.status(400).json({ error: "Shop name is required" });
      }

      const localityData = req.body;

      // Parse `services_offered` if it's a string
      if (typeof localityData.services_offered === "string") {
        localityData.services_offered = JSON.parse(
          localityData.services_offered
        );
      }

      // Handle image uploads
      if (req.files && req.files.length > 0) {
        localityData.images = req.files.map((file) => ({
          imageLink: file.path, // Adjust this if you use a different path (like Cloudinary)
        }));
      }

      // Update the locality where the ShopName matches (case-insensitive)
      const updatedLocality = await Locality.findOneAndUpdate(
        { ShopName: { $regex: shopName, $options: "i" } },
        localityData,
        { new: true, runValidators: true }
      );

      if (!updatedLocality) {
        return res
          .status(404)
          .json({ error: "Locality not found with this shop name" });
      }

      res.status(200).json({
        message: "Locality updated successfully!",
        updatedLocality,
      });
    } catch (error) {
      console.error("Update Locality by ShopName error:", error);
      res.status(500).json({ error: "Failed to update locality by shop name" });
    }
  });
};

export const searchLocalityByShopName = async (req, res) => {
  const { shopName } = req.params;
  console.log(req.params)
  try {
    if (!shopName) {
      return res.status(400).json({ error: "Shop name is required" });
    }

    const locality = await Locality.findOne({
      ShopName: { $regex: new RegExp(`^${shopName}$`, "i") }
    });

    if (!locality) {
      return res.status(404).json({ error: "No locality found with this shop name" });
    }

    res.status(200).json(locality);
    console.log("Found locality:", locality);
  } catch (error) {
    console.error("Search Locality by ShopName error:", error);
    res.status(500).json({ error: "Failed to search locality by shop name" });
  }
};

