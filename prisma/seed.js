import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.typeProperty.deleteMany();
  await prisma.property.deleteMany();
  await prisma.type.deleteMany();
  await prisma.user.deleteMany();

  const propertyData = [
    { name: 'Nombre', type: 'text' },
    { name: 'Fecha de Nacimiento', type: 'date' },
    { name: 'Estado Civil', type: 'text' },
    { name: 'Dirección', type: 'text' },
    { name: 'Color Favorito', type: 'text' },
  ];

  const properties = await Promise.all(
    propertyData.map((prop) => prisma.property.create({ data: prop }))
  );

  const typeData = [
    {
      name: 'Persona',
      description: 'Información personal de individuos',
      propertyIds: [properties[0].id, properties[1].id, properties[2].id],
    },
    {
      name: 'Organización',
      description: 'Datos de empresas y organizaciones',
      propertyIds: [properties[0].id, properties[3].id],
    },
    {
      name: 'Evento',
      description: 'Detalles sobre eventos especiales',
      propertyIds: [properties[0].id, properties[4].id],
    },
    {
      name: 'Lugar',
      description: 'Información geográfica y de ubicación',
      propertyIds: [properties[3].id],
    },
  ];

  for (const type of typeData) {
    const createdType = await prisma.type.create({
      data: {
        name: type.name,
        description: type.description,
      },
    });

    for (const propertyId of type.propertyIds) {
      await prisma.typeProperty.create({
        data: {
          typeId: createdType.id,
          propertyId: propertyId,
        },
      });
    }
  }

  console.log('Seed completado.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
