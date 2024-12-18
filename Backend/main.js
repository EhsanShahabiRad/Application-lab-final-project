import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import shopRoutes from "./Routes/ShopRoutes.js";
import authRoutes from "./Routes/AuthRoutes.js";
import userRoutes from "./Routes/UserRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", shopRoutes);
app.use("/auth", authRoutes);
app.use("/api", userRoutes);

mongoose
  .connect("mongodb://localhost:27017/ehsan-eshop")
  .then(() => console.log("MongoDB Connected: localhost"))
  .catch((err) => console.error("MongoDB connection error:", err));

const portNumber = 3000;
app.listen(portNumber, () => {
  console.log(
    "Application is running on port: " +
      portNumber +
      "\n" +
      "http://localhost:" +
      portNumber
  );
});
