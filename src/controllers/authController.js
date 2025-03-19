import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt.js";

const prisma = new PrismaClient();

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return res.status(400).json({ message: "El email ya está registrado" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role || "USER",
      },
    });

    const token = generateToken(user.id, user.role);

    res.status(201).json({
      message: "Usuario registrado exitosamente",
      token,
      user: { id: user.id, name: user.name, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ message: "Credenciales inválidas" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ message: "Credenciales inválidas" });

    const token = generateToken(user.id, user.role);

    res.json({ token, user: { id: user.id, name: user.name, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error: error.message });
  }
};
