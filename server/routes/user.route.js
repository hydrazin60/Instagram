import express from "express";
import {
  Register,
  followOrUnfollow,
  getProfile,
  getSuggesteduser,
  Login,
  LogOut,
  updateProfile,
} from "../controllers/userAuth.controllers.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../middlewares/multer.js";
const router = express.Router();

router.route("/register").post(Register);
router.route("/login").post(Login);
router.route("/logout").get(LogOut);
router.route("/:id/profile").get(isAuthenticated, getProfile);
router
  .route("/profile/edit")
  .post(isAuthenticated, upload.single("profilePic"), updateProfile);
router.route("/suggested_user").get(isAuthenticated, getSuggesteduser);
router.route("/follow_unfollow/:id").post(isAuthenticated, followOrUnfollow);
export default router;
