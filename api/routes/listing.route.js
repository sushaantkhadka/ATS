import express from "express";
import { createListing, getApplicant, getApplicants, getJob, getJobs, updateJobStatus, uploadResume } from "../controllers/listing.controller.js";
import { protectRoute } from "../utils/protectRoute.js";

const router = express.Router();

router.post("/create",protectRoute, createListing)

router.post("/upload/:id", uploadResume)

router.get("/applicants/:id", protectRoute, getApplicants)
router.get("/applicant/:id", protectRoute, getApplicant)

router.get("/jobs", getJobs)
router.get("/job/:id", getJob)
router.post("/job/update/:id", updateJobStatus)





export default router;