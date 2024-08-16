import express from "express";
import upload from "../middlewares/multer.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  addComment,
  addNewPost,
  dislikePost,
  getAllPosts,
  getCommentsofPost,
  getSingleUserALlPost,
  LikePost,
} from "../controllers/Post.controller.js";
import router from "./user.route.js";

const postroute = express.Router();

postroute
  .route("/create-post")
  .post(isAuthenticated, upload.single("image"), addNewPost);

postroute.route("/get_allposts").get(isAuthenticated, getAllPosts);
postroute.route("/get-singlrPost").get(isAuthenticated, getSingleUserALlPost);
postroute.route("/like/:id").get(isAuthenticated, LikePost);
postroute.route("/dislike/:id").get(isAuthenticated, dislikePost);
postroute.route("/comment/:id").post(isAuthenticated, addComment);
postroute.route("/get_all/comment/:id").get(isAuthenticated , getCommentsofPost)

export default postroute;
