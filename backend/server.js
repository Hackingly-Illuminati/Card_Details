import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { connectDB } from "./config/db.js";
import addPartnerRouter from "./routes/addPartnerRoute.js";
import userRouter from "./routes/userRoute.js";

// Load environment variables from .env
dotenv.config();

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());

//Databsase connection
connectDB();

app.use("/api/partner", addPartnerRouter);
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.send("API WOrkinfdfndkljnnljkggg!!");
});

app.listen(port, (error) => {
  if (!error) {
    console.log(`Server Started on http://localhost:${port}`);
  } else {
    console.log("Server not started, Error Found!");
  }
});
