import express from "express";
import {
  getAllLocalities,
  getLocalityById,
  saveLocality,
  updateLocalityByShopName,
  searchLocalityByShopName,
} from "../controllers/localityController.js";

const router = express.Router();

router.get("/localities", getAllLocalities);
router.get("/localities/:id", getLocalityById);
router.patch("/updatelocalities/:id", updateLocalityByShopName);
router.get("/findlocalities/:shopName", searchLocalityByShopName);
router.post("/localities", saveLocality);

export default router;
