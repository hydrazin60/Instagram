import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Userrouter from "./routes/user.route.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));

//user routes
app.use("/api/v1/users", Userrouter);

app.listen(PORT, () => console.log(`Server Running on PORT ${PORT}`));

mongoose
  .connect(process.env.MONGODBURI)
  .then(() => {
    console.log("MongoDB DataBase is  connected hd");
  })
  .catch((err) => {
    console.log(err);
  });
