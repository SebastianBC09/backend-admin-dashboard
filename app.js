import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import typeRoutes from './routes/typeRoutes.js';
import propertyRoutes from './routes/propertyRoutes.js';
import errorHandler from './middlewares/errorMiddleware.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/types", typeRoutes);
app.use("/api/properties", propertyRoutes);

app.use(errorHandler);

export default app;
