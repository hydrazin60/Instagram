import sharp from "sharp";
import Post from "../models/post.model.js";
import cloudinary from "../utils/cloudinary.js";
import User from "../models/user.model.js";
import streamifier from "streamifier";

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
        // Create new post
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
