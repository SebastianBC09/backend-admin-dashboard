import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createType = async (req, res) => {
  try {
    const { name, description, properties } = req.body;
    const existingType = await prisma.type.findUnique({ where: { name } });
    if (existingType) {
      return res.status(400).json({ message: "El tipo ya existe" });
    }
    const newType = await prisma.type.create({
      data: {
        name,
        description,
        properties: properties && properties.length > 0 ? {
          connect: properties.map((id) => ({ id }))
        } : undefined,
      },
      include: { properties: true },
    });
    res.status(201).json({ message: "Tipo creado exitosamente", type: newType });
  } catch (error) {
    res.status(500).json({ message: "Error al crear el tipo", error: error.message });
  }
};

export const getAllTypes = async (req, res) => {
  try {
    const types = await prisma.type.findMany({
      include: { properties: true },
    });
    res.status(200).json({ types });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los tipos", error: error.message });
  }
};

export const getTypeById = async (req, res) => {
  try {
    const { id } = req.params;
    const type = await prisma.type.findUnique({
      where: { id },
      include: { properties: true },
    });
    if (!type) {
      return res.status(404).json({ message: "Tipo no encontrado" });
    }
    res.status(200).json({ type });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el tipo", error: error.message });
  }
};
