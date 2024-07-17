import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { config } from "dotenv";
import productsRoutes from "./routes/productsRoutes.js";

config();
const port = process.env.PORT || 5000;

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use("/products", productsRoutes);

app.listen(port, async () => {
  console.log(`Example app listening on port ${port}`);
});
