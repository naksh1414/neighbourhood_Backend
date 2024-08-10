import express from "express";
import {
  getAllLocalities,
  getLocalityById,
  saveLocality,
} from "../controllers/localityController.js"; // Import controller functions

const router = express.Router();

// Route to get all localities
router.get("/localities", getAllLocalities);
// Route to get a specific locality by ID
router.get("/localities/:id", getLocalityById);
router.post("/localities", saveLocality);
export default router;
