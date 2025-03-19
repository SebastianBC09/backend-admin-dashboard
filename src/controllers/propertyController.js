import { createPropertyService, getAllPropertiesService, getPropertyByIdService } from "../services/propertyService.js";

export const createProperty = async (req, res) => {
  try {
    const { name, type } = req.body;
    const newProperty = await createPropertyService({ name, type });
    res.status(201).json({ message: "Propiedad creada exitosamente", property: newProperty });
  } catch (error) {
    res.status(500).json({ message: "Error al crear la propiedad", error: error.message });
  }
};

export const getAllProperties = async (req, res) => {
  try {
    const properties = await getAllPropertiesService();
    res.status(200).json({ properties });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las propiedades", error: error.message });
  }
};

export const getPropertyById = async (req, res) => {
  try {
    const { id } = req.params;
    const property = await getPropertyByIdService(id);
    res.status(200).json({ property });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la propiedad", error: error.message });
  }
};
