// import mongoose from "mongoose";

// const postSchema = new mongoose.Schema({
//   caption: {
//     type: String,
//     default: "",
//   },
//   image: {
//     type: String,
//     required: true,
//   },
//   author: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },
//   likes: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//     },
//   ],
//   comments: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Comment",
//     },
//   ],
// });

// export const Post = mongoose.model("Post", postSchema);

import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    caption: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Optional: Add indexes to improve query performance
postSchema.index({ author: 1 });
postSchema.index({ likes: 1 });

export const Post = mongoose.model("Post", postSchema);
