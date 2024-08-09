import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
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
      .json({ message: "Account created successfully", success: true });
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
    let user = await User.findById(userId).select("-password");
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

// export const updateProfile = async (req, res) => {
//   try {
//     const userId = req.id;
//     const { bio, gender } = req.body;
//     const profilePic = req.file;
//     const user = await User.findById(userId);
//     console.log( "userId is ",userId);

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
//       const fileUri = getDataUri(profilePic);
//       const cloudResponse = await cloudinary.uploader.upload(fileUri);
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

export const updateProfile = async (req, res) => {
  try {
    const userId = req.userId; // Use req.userId to match the middleware
    const { bio, gender } = req.body;
    const profilePic = req.file;

    // Log userId to ensure it's being correctly set
    console.log("userId is", userId);

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
    const FollowKarneWallaId = req.id;
    const JiskoFollowKarungaId = req.params.id;

    if (FollowKarneWallaId === JiskoFollowKarungaId) {
      return res.status(400).json({
        message: "You can't follow yourself",
        success: false,
      });
    }

    const user = await User.findById(FollowKarneWallaId);
    const targetUser = await User.findById(JiskoFollowKarungaId);

    if (!user) {
      return res.status(404).json({
        message: "Your profile not found! Please log in again",
        success: false,
      });
    }
    if (!targetUser) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    const ifFollowing = user.followers.includes(JiskoFollowKarungaId);

    if (ifFollowing) {
      await Promise.all([
        User.findByIdAndUpdate(
          FollowKarneWallaId,
          { $pull: { followers: JiskoFollowKarungaId } },
          { new: true }
        ),
        User.findByIdAndUpdate(
          JiskoFollowKarungaId,
          { $pull: { following: FollowKarneWallaId } },
          { new: true }
        ),
      ]);
      res.status(200).json({
        message: `${targetUser.username} unfollowed successfully`,
        success: true,
      });
    } else {
      await Promise.all([
        User.findByIdAndUpdate(
          FollowKarneWallaId,
          { $push: { followers: JiskoFollowKarungaId } },
          { new: true }
        ),
        User.findByIdAndUpdate(
          JiskoFollowKarungaId,
          { $push: { following: FollowKarneWallaId } },
          { new: true }
        ),
      ]);
      res.status(200).json({
        message: `${targetUser.username} followed successfully`,
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
