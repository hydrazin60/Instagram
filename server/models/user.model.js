// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema(
//   {
//     username: {
//       type: String,
//       required: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     password: {
//       type: String,
//       required: true,
//     },
//     profilePic: {
//       type: String,
//       default: "",
//     },
//     bio: {
//       type: String,
//       default: "",
//     },
//     gender: {
//       type: String,
//       enum: ["male", "female", "other"],
//     },
//     followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
//     following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
//     posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
//     bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
//   },
//   {
//     timestamps: true,
//   }
// );

// export const User = mongoose.model("User", userSchema);

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true, // Ensure usernames are unique
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensure email addresses are unique
      match: [/.+@.+\..+/, "Please enter a valid email address"], // Email format validation
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "",
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      default: "male", // Provide a default value
    },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  },
  {
    timestamps: true,
  }
);

// Optional: Add indexes to improve query performance
userSchema.index({ email: 1 });
userSchema.index({ username: 1 });
userSchema.index({ followers: 1 });
userSchema.index({ following: 1 });

export const User = mongoose.model("User", userSchema);
