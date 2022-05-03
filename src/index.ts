import { config } from "dotenv";
import express, { Application } from "express";
import cors from "cors";
import { db } from "./config/databaseconnection";
import { DataRouter } from "./routes/data.routes";

config();

const app: Application = express();
const port: string = `${process.env.PORT}`;

app.use(express.json());
app.use(cors());

db();

app.use("/api/endpoint", DataRouter);

app.listen(port, (): void => {
  console.log(`Listening on port ${port}...`);
});
