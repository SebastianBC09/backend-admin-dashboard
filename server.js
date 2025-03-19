import 'dotenv/config'
import express from 'express'
import cors from 'cors';
import authRoutes from "./src/routes/authRoutes.js";
import typeRoutes from "./src/routes/typeRoutes.js";
import propertyRoutes from "./src/routes/propertyRoutes.js";

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/types", typeRoutes);
app.use("/api/properties", propertyRoutes);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
