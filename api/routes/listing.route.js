import express from "express"
<<<<<<< HEAD
import { createListing, getApplicant, uploadResume } from "../controllers/listing.controller.js";
import { protectRoute } from "../utils/protectRoute.js";

const router = express.Router();

router.post("/create",protectRoute, createListing)
router.post("/upload/:id", uploadResume)
router.get("/applicant/:id", protectRoute, getApplicant)

=======
import { createListing, uploadResume } from "../controllers/listing.controller.js";

const router = express.Router();

router.post("/create", createListing)
router.post("/upload/:id", uploadResume)
>>>>>>> 81c6a2dc02689b7a84955117650cbffbbb0c6bd4


export default router;