# Fortex Design - Backend 🚀

[![Node.js](https://img.shields.io/badge/Node.js-v18-blue)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-4.21.2-brightgreen)](https://expressjs.com)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-8.14.1-blueviolet)](https://www.postgresql.org)
[![Prisma](https://img.shields.io/badge/Prisma-6.5.0-orange)](https://www.prisma.io)
[![JWT](https://img.shields.io/badge/JWT-9.0.2-yellow)](https://jwt.io)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

Backend para la administración de tipos y propiedades, evaluando la implementación de autenticación, roles y operaciones CRUD sobre una base de datos relacional.

## 📋 Tabla de Contenidos
1. [Descripción del Proyecto](#-descripción-del-proyecto)
2. [Diagramas de Arquitectura](#-diagramas-de-arquitectura)
3. [Estructura del Proyecto](#-estructura-del-proyecto)
4. [Tecnologías Utilizadas](#-tecnologías-y-dependencias)
5. [Endpoints](#-api-endpoints)
6. [Configuración y Migraciones](#-configuración-y-migraciones)
7. [Despliegue](#-despliegue)
8. [Autor](#-autor)
9. [Licencia](#-licencia)

## 📝 Descripción del Proyecto

Este proyecto constituye el backend para la prueba técnica de Fortex Design. Su objetivo es gestionar diferentes "tipos" (Persona, Organización, Evento, Lugar, etc.) y sus "propiedades" asociadas. Entre sus funcionalidades se incluyen:

- **Autenticación y Roles:** Registro e inicio de sesión mediante JWT y bcryptjs, con roles diferenciados (ADMIN y USER).
- **Gestión de Tipos:** Creación, lectura de tipos, con asignación de propiedades mediante un multi-select.
- **Gestión de Propiedades:** Operaciones CRUD para propiedades, mostrando nombre, tipo (texto, número, fecha, check) y fecha de creación.
- **Manejo de Errores:** Uso de middleware personalizado para capturar y responder adecuadamente ante errores (HTTP 400, 401, 404, 500).

El backend se conecta a una base de datos PostgreSQL y las migraciones se gestionan con Prisma. El despliegue se realiza en Render (u otro servicio similar) y el código fuente se encuentra en GitHub.

## 📊 Diagramas de Arquitectura

### Arquitectura General
```mermaid
graph TD
    A[Frontend]
    B[Express API Server]
    C[Prisma ORM]
    D[PostgreSQL Database]
    E[Auth Middleware]
    F[JWT Generation]

    A -->|HTTP Requests| B
    B --> E
    E --> F
    B --> C
    C --> D
```

### Flujo de Autenticación y Roles

```mermaid
sequenceDiagram
    participant C as Cliente
    participant A as API Server
    participant DB as Base de Datos
    participant JWT as Servicio JWT

    C->>A: POST /api/auth/login\n{ email, password }
    A->>DB: Buscar usuario por email
    DB-->>A: Usuario (o null)
    alt Credenciales válidas\n(Usuario encontrado y contraseña correcta)
        A->>JWT: Generar token JWT (userId, role)\n(expiresIn: 1h)
        JWT-->>A: Token JWT
        A-->>C: 200 OK { token, user }
    else\n(Credenciales inválidas)
        A-->>C: 401 Unauthorized { message: 'Credenciales inválidas' }
    end
```

### Flujo de Operaciones CRUD

```mermaid
sequenceDiagram
    participant C as Cliente
    participant A as API Server
    participant DB as Base de Datos

    C->>A: GET /api/types\n(GET /api/properties)
    A->>DB: Consultar registros y relaciones
    DB-->>A: Datos de Tipos/Propiedades
    A-->>C: Respuesta JSON con la información
```

## 📁 Estructura del Proyecto

```
backend/
├── src/
│   ├── controllers/         # Controladores para autenticación, tipos y propiedades
│   ├── middlewares/         # Middleware de autenticación, manejo de errores, etc.
│   ├── routes/              # Rutas de la API
│   └── services/            # Lógica de negocio y utilidades
│   └── utils/               # Funciones para construir y verificar el JWT
├── prisma/                  # Archivo schema.prisma y migraciones
├── .env                     # Variables de entorno
├── package.json             # Scripts y dependencias
└── README.md                # Documentación del proyecto
```

## 🛠️ Tecnologías y Dependencias

| Tecnología | Versión | Descripción |
|------------|---------|-------------|
| **Node.js** | v18+ | Entorno de ejecución para JavaScript |
| **Express** | 4.21.2 | Framework web para Node.js |
| **PostgreSQL** | 8.14.1 (pg) | Sistema de gestión de bases de datos relacional |
| **Prisma** | 6.5.0 | ORM para Node.js y TypeScript |
| **JWT** | 9.0.2 | Autenticación basada en tokens |
| **bcryptjs** | 3.0.2 | Librería para hash de contraseñas |
| **cors** | 2.8.5 | Middleware para habilitar CORS |
| **dotenv** | 16.4.7 | Carga de variables de entorno |

### DevDependencies
| Dependencia | Versión | Descripción |
|------------|---------|-------------|
| **nodemon** | 3.1.9 | Reinicio automático durante desarrollo |
| **eslint** | 8.54.0 | Herramienta de linting para JavaScript |
| **prettier** | 3.2.4 | Formateador de código |

## 🌐 API Endpoints

### Autenticación

| Método | Endpoint | Descripción | Parámetros | Respuesta |
|--------|----------|-------------|------------|-----------|
| POST | `/api/auth/register` | Registra un nuevo usuario | `{ name, email, password, role? }` | `{ user, token }` |
| POST | `/api/auth/login` | Inicia sesión | `{ email, password }` | `{ user, token }` |

### Tipos

| Método | Endpoint | Descripción | Parámetros | Respuesta |
|--------|----------|-------------|------------|-----------|
| POST | `/api/types` | Crea un nuevo tipo | `{ name, properties: [] }` | `{ id, name, ... }` |
| GET | `/api/types` | Lista todos los tipos | - | `[{ id, name, ... }]` |
| GET | `/api/types/:id` | Obtiene un tipo por ID | `id` (path) | `{ id, name, ... }` |


### Propiedades

| Método | Endpoint | Descripción | Parámetros | Respuesta |
|--------|----------|-------------|------------|-----------|
| POST | `/api/properties` | Crea una nueva propiedad | `{ name, type }` | `{ id, name, ... }` |
| GET | `/api/properties` | Lista todas las propiedades | - | `[{ id, name, ... }]` |
| GET | `/api/properties/:id` | Obtiene una propiedad por ID | `id` (path) | `{ id, name, ... }` |

## ⚙️ Configuración y Migraciones

1. **Configura las Variables de Entorno:**
   Crea un archivo `.env` con el siguiente contenido:
   ```env
   DATABASE_URL=postgresql://user:password@localhost:5432/fortex_db
   JWT_SECRET=tu_secreto_super_seguro
   PORT=4000
   ```

2. **Ejecuta las Migraciones con Prisma:**
   ```bash
   npm run migrate
   npm run generate
   ```

3. **Opcional: Ejecuta el Seed para datos iniciales:**
   ```bash
   npm run seed
   ```

## 🚀 Despliegue

### 1. **Instala las Dependencias:**
```bash
npm install
```

### 2. **Ejecuta las Migraciones:**
```bash
npm run migrate
npm run generate
```

### 3. **Inicia el Servidor:**
Para desarrollo:
```bash
npm run dev
```

Para producción:
```bash
npm run start
```

### 4. **Configura y Despliega en Render:**
- Conecta el repositorio en Render.
- Define las variables de entorno necesarias.
- Configura el comando de construcción: `npm install && npm run generate`
- Configura el comando de inicio: `npm run start`
- El proyecto se desplegará automáticamente en el plan Hobby.

## 👨‍💻 Autor

**Sebastian Ballen C** - *Frontend Developer*

* LinkedIn: [Sebastian B.](https://www.linkedin.com/in/sebastianballencastaneda-softwaredeveloper)
* Email: sebastian.ballenc@gmail.com

---

## 📄 Licencia

Este proyecto está licenciado bajo la Licencia MIT - vea el archivo [LICENSE](LICENSE) para más detalles.

---

⭐️ **Si te resulta útil este proyecto, ¡no olvides darle una estrella en GitHub!** ⭐️
