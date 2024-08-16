import sharp from "sharp";
import Post from "../models/post.model.js";
import cloudinary from "../utils/cloudinary.js";
import User from "../models/user.model.js";
import streamifier from "streamifier";
import Comment from "../models/comment.model.js";
import { populate } from "dotenv";

export const addNewPost = async (req, res) => {
  try {
    const { caption } = req.body;
    const image = req.file;
    const authorId = req.id;

    if (!image || !caption) {
      return res.status(400).json({
        message: "All fields are required",
        error: true,
      });
    }
    const optimizedImageBuffer = await sharp(image.buffer)
      .resize({ width: 600, height: 600, fit: "inside" })
      .toFormat("jpeg", { quality: 100 })
      .toBuffer();
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: "image" },
      async (error, result) => {
        if (error) {
          return res.status(500).json({
            message: "Error uploading image",
            error: true,
          });
        }
        const post = await Post.create({
          caption,
          image: result.secure_url, // Cloudinary URL
          author: authorId,
        });
        // Update user posts
        const user = await User.findById(authorId);
        if (user) {
          user.posts.push(post._id);
          await user.save();
        }
        res.status(200).json({
          message: "Post created successfully",
          success: true,
          data: post,
        });
      }
    );
    streamifier.createReadStream(optimizedImageBuffer).pipe(uploadStream);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      error: true,
    });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate({ path: "author", select: "username profilePic" })
      .populate({
        path: "comments",
        sort: { createdAt: -1 },
        populate: { path: "author", select: "username profilePic" },
      });
    res.status(200).json({
      message: "Posts fetched successfully",
      success: true,
      data: posts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      error: true,
    });
  }
};

export const getSingleUserALlPost = async (req, res) => {
  try {
    const autherId = req.id;
    const posts = await Post.find({ author: autherId })
      .sort({ createdAt: -1 })
      .populate({ path: "author", select: "username , profilePic" })
      .populate({
        path: "comments",
        sort: { createdAt: -1 },
        populate: { path: "author", select: "username , profilePic" },
      });
    return res.status(200).json({
      message: "Posts fetched successfully",
      success: true,
      data: posts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      error: true,
    });
  }
};

export const LikePost = async (req, res) => {
  try {
    const likeKarneWalaUser = req.id;
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        message: "Post not found",
        error: true,
      });
    }
    await post.updateOne({ $addToSet: { likes: likeKarneWalaUser } });
    await post.save();

    // implement.socket io
    return res.status(200).json({
      message: "Post liked successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      error: true,
    });
  }
};

export const dislikePost = async (req, res) => {
  try {
    const dislikeKarneWalaUser = req.id;
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        message: "Post not found",
        error: true,
      });
    }
    await post.updateOne({ $pull: { likes: dislikeKarneWalaUser } });
    await post.save();
    return res.status(200).json({
      message: "Post disliked successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      error: true,
    });
  }
};

export const addComment = async (req, res) => {
  try {
    const postId = req.params.id;
    const commentKarneWalaUser = req.id;
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({
        message: "Text is required",
        error: true,
      });
    }
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        message: "Post not found",
        error: true,
      });
    }
    let comment = await Comment.create({
      text,
      author: commentKarneWalaUser,
      post: postId,
    });

    comment = await comment.populate({
      path: "author",
      select: "username profilePic",
    });
    post.comments.push(comment._id);
    await post.save();
    return res.status(200).json({
      message: "Comment added successfully",
      success: true,
      data: comment,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      error: true,
    });
  }
};

 
export const getCommentsofPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const comments = await Comment.find({ post: postId }).populate({
      path: "author",
      select: "username profilePic",
    });

    if (comments.length === 0) {
      return res.status(404).json({
        message: "No comments found for this post",
        error: true,
      });
    }

    return res.status(200).json({
      message: "Comments fetched successfully",
      success: true,
      data: comments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      error: true,
    });
  }
};

export const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        message: "Post not found",
        error: true,
      });
    }
    if (post.author.toString.toString() !== req.id) {
      return res.status(401).json({
        message: "You are not authorized to delete this post",
        error: true,
      });
    }
    await Post.findByIdAndDelete(postId);
    let user = await User.findById(authorId);
    user.posts = user.posts.filter((id) => id.toString() !== postId);
    await user.save();
    await Comment.deleteMany({ post: postId });

    return res.status(200).json({
      message: "Post deleted successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      error: true,
    });
  }
};

// export const Bookmarkpost = async (req, res) => {
//   try {
//     const postId = req.params.id;
//     const autherId = req.id;
//     const post = await Post.findById(postId);
//     if (!post) {
//       return res.status(404).json({
//         message: "Post not found",
//         error: true,
//       });
//     }

//     const user = await User.findById(autherId);
//     if (!user) {
//       return res.status(404).json({
//         message: "User not found",
//         error: true,
//       });
//     }
//     if (user.bookmarks.includes(post._id)) {
//       await user.updateOne({ $pull: { bookmarks: post._id } });
//       await user.save();
//       return res.status(200).json({
//         message: "Post unbookmarked successfully",
//         success: true,
//       });
//     } else {
//       await user.updateOne({ $addToSet: { bookmarks: post._id } });
//       await user.save();
//       return res.status(200).json({
//         message: "Post bookmarked successfully",
//         success: true,
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       message: "Internal server error",
//       error: true,
//     });
//   }
// };

export const Bookmarkpost = async (req, res) => {
  try {
    const postId = req.params.id;
    const authorId = req.id;

    // Find the post
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        message: "Post not found",
        error: true,
      });
    }

    // Find the user
    const user = await User.findById(authorId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        error: true,
      });
    }

    // Toggle bookmark status
    if (user.bookmarks.includes(post._id)) {
      // Unbookmark the post
      await user.updateOne({ $pull: { bookmarks: post._id } });
      return res.status(200).json({
        message: "Post unbookmarked successfully",
        success: true,
      });
    } else {
      // Bookmark the post
      await user.updateOne({ $addToSet: { bookmarks: post._id } });
      return res.status(200).json({
        message: "Post bookmarked successfully",
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      error: true,
    });
  }
};
