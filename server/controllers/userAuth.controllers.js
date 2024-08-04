import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import getdataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const Register = async (req, res) => {
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
    const hashedPassword = await bcrypt.hash(password, 10);
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
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found", success: false });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ message: "Invalid password", success: false });
    }
    const userData = {
      _id: user._id,
      username: user.username,
      email: user.email,
      profilePic: user.profilePic,
      bio: user.bio,
      gender: user.gender,
      followers: user.followers,
      following: user.following,
      posts: user.posts,
    };
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRETKEY, {
      expiresIn: "360d",
    });
    res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 360 * 24 * 60 * 60 * 1000,
      })
      .json({
        message: `Welcome ${user.username}, you are logged in successfully`,
        success: true,
        data: userData,
      });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

export const LogOut = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "strict",
    });
    res.status(200).json({
      message: "Logged out successfully",
      success: true,
    });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const getProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }
    res.status(200).json({
      message: "Profile fetched successfully",
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("Profile fetch error:", error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.id;
    const { bio, gender } = req.body;
    const profilePic = req.file;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }
    if (bio) {
      user.bio = bio;
    }
    if (gender) {
      user.gender = gender;
    }
    if (profilePic) {
      const fileUri = getDataUri(profilePic);
      const cloudResponse = await cloudinary.uploader.upload(fileUri);
      user.profilePic = cloudResponse.secure_url;
    }
    await user.save();
    res.status(200).json({
      message: "Profile updated successfully",
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("Profile update error:", error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
// export const updateProfile = async (req, res) => {
//   try {
//     const userId = req.id;
//     const { bio, gender } = req.body;
//     const profilePic = req.file;
//     let cloudResponse;
//     if (profilePic) {
//       const fileUri = getdataUri(profilePic);
//       await cloudinary.uploader.upload(fileUri);
//     }
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({
//         message: "User not found",
//         success: false,
//       });
//     }
//     if (bio) {
//       user.bio = bio;
//     }
//     if (gender) {
//       user.gender = gender;
//     }
//     if (profilePic) {
//       cloudResponse = await cloudinary.uploader.upload(profilePic.path);
//       user.profilePic = cloudResponse.secure_url;
//     }
//     await user.save();
//     res.status(200).json({
//       message: "Profile updated successfully",
//       success: true,
//       data: user,
//     });
//   } catch (error) {
//     console.error("Profile update error:", error);
//     res.status(500).json({
//       message: "Internal server error",
//       success: false,
//     });
//   }
// };

export const getSuggesteduser = async (req, res) => {
  try {
    const suggestedUser = await User.find({ _id: { $ne: req.id } })
      .limit(5)
      .select("-password");
    if (suggestedUser.length === 0) {
      return res.status(404).json({
        message: "Suggested user not found",
        success: false,
      });
    } else {
      res.status(200).json({
        success: true,
        data: suggestedUser,
      });
    }
  } catch (error) {
    console.error("Suggested user error:", error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const followOrUnfollow = async (req, res) => {
  try {
    const followerId = req.body.follower; // ID of the user who is following/unfollowing
    const followingId = req.params.id; // ID of the user to be followed/unfollowed

    if (followerId === followingId) {
      return res.status(400).json({
        message: "You can't follow yourself",
        success: false,
      });
    }

    const user = await User.findById(followerId);
    const targetUser = await User.findById(followingId);

    if (!user || !targetUser) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    const isFollowing = user.following.includes(followingId);

    if (isFollowing) {
      await Promise.all([
        user.updateOne({ $pull: { following: followingId } }),
        targetUser.updateOne({ $pull: { followers: followerId } }),
      ]);
      return res.status(200).json({
        message: "Unfollowed successfully",
        success: true,
      });
    } else {
      await Promise.all([
        user.updateOne({ $push: { following: followingId } }),
        targetUser.updateOne({ $push: { followers: followerId } }),
      ]);
      return res.status(200).json({
        message: "Followed successfully",
        success: true,
      });
    }
  } catch (error) {
    console.error("Follow or unfollow error:", error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
