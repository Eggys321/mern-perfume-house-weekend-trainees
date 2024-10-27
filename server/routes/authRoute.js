import express from "express";
import { signIn, signUp, verify } from "../controllers/authController.js";
import { auth } from "../middleware/auth.js";
const router = express.Router();



// post request
router.post("/signup",signUp);
// post req for sign
router.post("/signin",signIn);
// verify
router.get("/verify",auth,verify )

export default router
