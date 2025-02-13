import express from 'express';
import { google, login, logout, signUp } from '../controllers/auth.controller.js';

const router = express.Router();

router.post("/signup", signUp)
router.post("/login", login)
router.post("/oauth", google)
router.post("/logout", logout)



export default router;