import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import colors from "colors";
import userRoutes from "./routes/userRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import path from "path";
const app = express();
dotenv.config();
connectDB();

app.use(express.json());

app.get("/api/env", (req, res) => {
  const safeEnv = {
    CLOUD_NAME: process.env.REACT_APP_CLOUD_NAME,
    UPLOAD_PRESET: process.env.REACT_APP_UPLOAD_PRESET,
  };
  res.json(safeEnv);
});
app.use("/api/user", userRoutes);

// ----------------Deployment-----------------
const __dirname1 = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API initiated!");
  });
}
// ----------------Deployment-----------------

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server is running on PORT ${PORT}`.green.bold));
