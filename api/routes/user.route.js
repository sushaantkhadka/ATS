import express from "express";
import { test, userUpdate } from "../controllers/user.controller.js";
import { protectRoute } from "../utils/protectRoute.js";

const router = express.Router();

router.get("/", test);
router.post("/update/:id", protectRoute, userUpdate);


export default router;
