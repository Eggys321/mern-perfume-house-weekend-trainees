import express from "express";
import { order } from "../controllers/orderContoller.js";
const router = express.Router();
import { auth } from "../middleware/auth.js";


// post request for order

router.post("/create",auth,order);


export default router