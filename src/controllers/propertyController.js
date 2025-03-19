import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createProperty = async (req, res) => {
  try {
    const { name, type } = req.body;
    const existingProperty = await prisma.property.findUnique({ where: { name } });
    if (existingProperty) {
      return res.status(400).json({ message: "La propiedad ya existe" });
    }
    const newProperty = await prisma.property.create({
      data: {
        name,
        type,
      },
    });
    res.status(201).json({ message: "Propiedad creada exitosamente", property: newProperty });
  } catch (error) {
    res.status(500).json({ message: "Error al crear la propiedad", error: error.message });
  }
};

export const getAllProperties = async (req, res) => {
  try {
    const properties = await prisma.property.findMany();
    res.status(200).json({ properties });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las propiedades", error: error.message });
  }
};

export const getPropertyById = async (req, res) => {
  try {
    const { id } = req.params;
    const property = await prisma.property.findUnique({ where: { id } });
    if (!property) {
      return res.status(404).json({ message: "Propiedad no encontrada" });
    }
    res.status(200).json({ property });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la propiedad", error: error.message });
  }
};
