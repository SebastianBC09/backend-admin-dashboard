import { Router } from "express";
import { createType, getAllTypes, getTypeById } from "../controllers/typeController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", authMiddleware, getAllTypes);
router.get("/:id", authMiddleware, getTypeById);
router.post("/", authMiddleware, createType);

export default router;
