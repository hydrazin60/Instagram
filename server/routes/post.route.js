import express from "express";
import upload from "../middlewares/multer.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { addNewPost, getAllPosts } from "../controllers/Post.controller.js";
import router from "./user.route.js";

const postroute = express.Router();

postroute
  .route("/create-post")
  .post(isAuthenticated, upload.single("image"), addNewPost);

postroute.route("/get_allposts").get(isAuthenticated, getAllPosts);
export default postroute;
