import express from "express";
import multer from "multer";

import {
  addPartner,
  listPartners,
  getPartnerById,
  removePartner,
  updatePartner,
} from "../controllers/Partners.js";

// Multer configuration
const storage = multer.memoryStorage();
const upload = multer({ storage }).single("photoUrl");

const addPartnerRouter = express.Router();

addPartnerRouter.post("/add", upload, addPartner);
addPartnerRouter.get("/list", listPartners);
addPartnerRouter.get("/getPartner", getPartnerById);

addPartnerRouter.delete("/removePartner", removePartner);
addPartnerRouter.put("/updatePartner", updatePartner);

export default addPartnerRouter;
