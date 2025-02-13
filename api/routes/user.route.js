import express from "express";
import { test, userDelete, userUpdate } from "../controllers/user.controller.js";
import { protectRoute } from "../utils/protectRoute.js";

const router = express.Router();

router.get("/", test);
router.post("/update/:id", protectRoute, userUpdate);
router.delete("/delete/:id", protectRoute, userDelete);



export default router;
