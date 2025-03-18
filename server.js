require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());


app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/types", require("./routes/typeRoutes"));

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
