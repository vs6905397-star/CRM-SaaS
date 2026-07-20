import express from "express"
import authMiddleware from "../middlewares/authMiddleware.js"
import { deshboardCount, deshboardData } from "../controllers/deshboardControllers.js"

const routes = express.Router();

routes.get("/count", authMiddleware, deshboardCount);
routes.get("/data", authMiddleware, deshboardData);

export default routes