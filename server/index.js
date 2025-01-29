import express from "express";
import dotenv from "dotenv";

import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";


import connectToDB from "./db/connectToDB.js";

dotenv.config();
const app = express();

app.use(express.json());

app.listen(3000, () => {
  connectToDB();
  console.log("Server Listening on port 3000");
});

app.use("/server/user", userRoutes);
app.use("/server/auth", authRoutes);

app.use((err, req, res, next) => {
  const statusCode= err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode
  })
})