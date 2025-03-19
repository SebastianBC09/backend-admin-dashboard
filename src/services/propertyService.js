import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createPropertyService = async ({ name, type }) => {
  const existingProperty = await prisma.property.findUnique({ where: { name } });
  if (existingProperty) {
    throw new Error("La propiedad ya existe");
  }
  const newProperty = await prisma.property.create({
    data: { name, type }
  });
  return newProperty;
};

export const getAllPropertiesService = async () => {
  return await prisma.property.findMany();
};

export const getPropertyByIdService = async (id) => {
  const property = await prisma.property.findUnique({ where: { id } });
  if (!property) {
    throw new Error("Propiedad no encontrada");
  }
  return property;
};
