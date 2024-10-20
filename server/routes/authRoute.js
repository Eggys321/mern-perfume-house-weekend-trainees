import express from "express";
import { signIn, signUp } from "../controllers/authController.js";
const router = express.Router();


// post request
router.post("/signup",signUp);
// post req for sign
router.post("/signin",signIn)

export default router
