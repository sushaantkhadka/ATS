import express from "express"
import { createListing, getApplicant, testPdfParse, uploadResume } from "../controllers/listing.controller.js";
import { protectRoute } from "../utils/protectRoute.js";

const router = express.Router();

router.post("/create",protectRoute, createListing)
router.post("/upload/:id", uploadResume)
router.get("/applicant/:id", protectRoute, getApplicant)
router.get("/pdf", testPdfParse)



export default router;