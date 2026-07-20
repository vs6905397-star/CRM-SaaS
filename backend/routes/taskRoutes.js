import express from "express"
import { createTask, deleteTask, getAllTask, getCustomerTask, getTask, updateTask } from "../controllers/taskControllers.js";
import authMiddleware  from "../middlewares/authMiddleware.js"

const router = express.Router();

router.post("/create", authMiddleware, createTask);
router.get("/", authMiddleware, getAllTask);
router.get("/:id", authMiddleware, getTask);
router.delete("/:id", authMiddleware, deleteTask);
router.put("/:id", authMiddleware, updateTask)
router.get("/customer/:id", authMiddleware, getCustomerTask);

export default router