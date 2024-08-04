// import mongoose from "mongoose";
// const commentSchema = new mongoose.Schema({
//   text: {
//     type: String,
//     required: true,
//   },
//   author: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },
//   post: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Post",
//     required: true,
//   },
// });
// const Comment = mongoose.model("Comment", commentSchema);
// export default Comment;

import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Optional: Add indexes if needed for performance
commentSchema.index({ post: 1 });
commentSchema.index({ author: 1 });

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
