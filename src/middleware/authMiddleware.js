import { verifyToken } from "../utils/jwt.js";

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Acceso no autorizado" });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(403).json({ message: "Token inválido" });
  }

  req.user = decoded;
  next();
};

export default authMiddleware;
