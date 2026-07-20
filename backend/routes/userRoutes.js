import express from "express";
import { getUser, updateUser } from "../controllers/userControllers.js";
import authMiddleware  from "../middlewares/authMiddleware.js"

const router = express.Router();

router.get("/me", authMiddleware, getUser);
router.put("/update", authMiddleware, updateUser);

export default router