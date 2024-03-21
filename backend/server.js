import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import colors from "colors";
import userRoutes from "./routes/userRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

const app = express();
dotenv.config();
connectDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API initiated!");
});
app.get("/api/env", (req, res) => {
  const safeEnv = {
    CLOUD_NAME: process.env.REACT_APP_CLOUD_NAME,
    UPLOAD_PRESET: process.env.REACT_APP_UPLOAD_PRESET,
  };
  res.json(safeEnv);
});
app.use("/api/user", userRoutes);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server is running on PORT ${PORT}`.green.bold));
