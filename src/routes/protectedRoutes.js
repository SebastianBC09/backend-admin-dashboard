import { Router } from 'express'
import authMiddleware from "../middleware/authMiddleware";

const router = Router();

router.get("/perfil", authMiddleware, (req, res) => {
  res.json({ message: "Ruta protegida", user: req.user });
});

export default router;
