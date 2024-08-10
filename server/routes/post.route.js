import express from "express";
import upload from "../middlewares/multer.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { addNewPost } from "../controllers/Post.controller.js";

const postroute = express.Router();

postroute
  .route("/create-post")
  .post(isAuthenticated, upload.single("image"), addNewPost);

export default postroute;
