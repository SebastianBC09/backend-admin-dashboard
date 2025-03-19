import { Router } from "express";
import { createProperty, getAllProperties, getPropertyById } from "../controllers/propertyController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", authMiddleware, getAllProperties);
router.get("/:id", authMiddleware, getPropertyById);
router.post("/", authMiddleware, createProperty);

export default router;
