import express from "express";
import dotenv from "dotenv";

import userRoutes from './routes/user.route.js'


import connectToDB from "./db/connectToDB.js";

dotenv.config();
const app = express();

app.listen(3000, () => {
  connectToDB();
  console.log("Server Listening on port 3000");
});


app.use("/server/user", userRoutes)