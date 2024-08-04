import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res
        .status(401)
        .json({ message: "All fields are required", success: false });
    }
    const LoginUser = await User.findOne({ email });
    if (LoginUser) {
      return res.status(401).json({
        message: "User already exists! Try different email ",
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 5);
    await User.create({
      username,
      email,
      password: hashedPassword,
    });
    res
      .status(200)
      .json({ message: "User created successfully", success: true });
  } catch (error) {
    console.log(error);
  }
};

export const Login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(401)
      .json({ message: "All fields are required", success: false });
  }
  let LoginUser = await User.findOne({ email });
  if (!LoginUser) {
    return res.status(401).json({ message: "User not found", success: false });
  }

  const isPasswordMatch = await bcrypt.compare(password, LoginUser.password);
  if (!isPasswordMatch) {
    return res
      .status(401)
      .json({ message: "Invalid password", success: false });
  }

  LoginUser = {
    _id: LoginUser._id,
    username: LoginUser.username,
    email: LoginUser.email,
    profilePic: LoginUser.profilePic,
    bio: LoginUser.bio,
    gender: LoginUser.gender,
    followers: LoginUser.followers,
    following: LoginUser.following,
    posts: LoginUser.posts,
  };

  const Token = await jwt.sign({ id: User._id }, process.env.JWT_SECRETKEY, {
    expiresIn: "360d",
  });
  return res
    .cookie("token", Token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 360 * 24 * 60 * 60 * 1000,
    })
    .json({
      message: `Welcome ${LoginUser.username} you are logged in successfully`,
      success: true,
      data: LoginUser,
    });
};

