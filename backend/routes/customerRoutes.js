import express from "express";
import { createCustomer, deleteCustomer, getAllCustomer, getCustomer, updateCustomer } from "../controllers/customerControllers.js";
import authMiddleware  from "../middlewares/authMiddleware.js"

const router = express.Router();

router.post("/create", authMiddleware, createCustomer);
router.get("/", authMiddleware, getAllCustomer);
router.get("/:id", authMiddleware, getCustomer);
router.delete("/delete/:id", authMiddleware, deleteCustomer);
router.put("/update/:id", authMiddleware, updateCustomer);

export default router