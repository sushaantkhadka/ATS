import express from "express"
import { createListing, uploadResume } from "../controllers/listing.controller.js";

const router = express.Router();

router.post("/create", createListing)
router.post("/upload/:id", uploadResume)


export default router;