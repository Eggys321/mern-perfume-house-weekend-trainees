import express from "express";
import { signUp } from "../controllers/authController.js";
const router = express.Router();


// post request
router.post("/signup",signUp)

export default router
