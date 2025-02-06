import express from 'express';
import { google, login, signUp } from '../controllers/auth.controller.js';

const router = express.Router();

router.post("/signup", signUp)
router.post("/login", login)
router.post("/oauth", google)


export default router;