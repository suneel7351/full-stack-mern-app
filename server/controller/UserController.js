const Memory = require("../models/memories/Memory");
const User = require("../models/user/User");
const sendEmail = require("../middleware/SendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");

class UserController {
  static async createUser(req, res) {
    try {
      const { name, email, password, avatar } = req.body;
      const uploadPost = await cloudinary.v2.uploader.upload(avatar, {
        folder: "userAvatars",
        width: 150,
        crop: "scale",
      });
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({
          success: false,
          message: "User is already exist with this email",
        });
      }
      user = await User.create({
        name,
        email,
        password,
        avatar: { public_id: uploadPost.public_id, url: uploadPost.secure_url },
      });
      const token = await user.generateToken();
      const options = {
        expires: new Date(Date.now() + 75 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.status(201).cookie("token", token, options).json({
        success: true,
        user,
        token,
        message: "Register successfully",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      let user = await User.findOne({ email })
        .select("+password")
        .populate("memory followers following");
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "Email or password is invalid",
        });
      }
      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: "Invalid Credentials",
        });
      }
      const token = await user.generateToken();
      const options = {
        expires: new Date(Date.now() + 75 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.status(200).cookie("token", token, options).json({
        success: true,
        user,
        token,
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  static async getUser(req, res) {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }
      res.status(200).json({ success: true, user });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  static async follow(req, res) {
    try {
      const following = await User.findById(req.params.id);
      const follower = await User.findById(req.user._id);
      if (!following) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }

      if (following.followers.includes(req.user._id)) {
        const index1 = follower.following.indexOf(req.params.id);
        const index2 = following.followers.indexOf(req.user._id);

        follower.following.splice(index1, 1);
        following.followers.splice(index2, 1);

        await follower.save();
        await following.save();
        res.status(200).json({ success: true, message: "Unfollowed" });
      } else {
        following.followers.push(req.user._id);
        follower.following.push(req.params.id);
        await follower.save();
        await following.save();
        res.status(200).json({ success: true, message: "Followed" });
      }
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  static async logout(req, res) {
    try {
      res
        .status(200)
        .cookie("token", null, {
          expires: new Date(Date.now()),
          httpOnly: true,
        })
        .json({
          success: true,
          message: "Logged out",
        });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  static async updatePassword(req, res) {
    try {
      const { oldPassword, newPassword, confirmPassword } = req.body;
      if (!oldPassword || !newPassword || !confirmPassword) {
        return res.status(401).json({
          success: false,
          message: "All fields required",
        });
      }
      if (newPassword !== confirmPassword) {
        return res.status(401).json({
          success: false,
          message: "New password and Confrim Password must be same",
        });
      }
      let user = await User.findById(req.user._id).select("+password");
      const isMatch = await user.matchPassword(oldPassword);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: "Incorrect old password",
        });
      }
      user.password = newPassword;
      await user.save();
      res.status(200).json({
        success: true,
        message: "Password change successfully",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
  static async updateProfile(req, res) {
    try {
      const { name, email, avatar } = req.body;
      const user = await User.findById(req.user._id);
      const uploadPost = await cloudinary.v2.uploader.upload(avatar, {
        folder: "userAvatars",
        width: 150,
        crop: "scale",
      });
      if (name) {
        user.name = name;
      }
      if (email) {
        user.email = email;
      }
      if (avatar) {
        user.avatar = {
          public_id: uploadPost.public_id,
          url: uploadPost.secure_url,
        };
      }
      await user.save();
      res.status(200).json({
        success: true,
        message: "Profile updated successfully",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  static async myProfile(req, res) {
    try {
      const user = await User.findById(req.user._id).populate(
        "memory followers following"
      );
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }
      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  static async userProfile(req, res) {
    try {
      const user = await User.findById(req.params.id).populate(
        "memory followers following"
      );
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }
      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  static async allUser(req, res) {
    try {
      const users = await User.find({
        name: {
          $regex: req.query.name,
          $options: "i",
        },
      });

      res.status(200).json({
        success: true,
        users,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  static async forgotPassword(req, res) {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }

      const token = user.getresetPasswordToken();

      await user.save();

      const url = `${req.protocol}://${req.get(
        "host"
      )}/api/v1/password/reset/${token}`;

      const message = `Hii ${user.name},\n\n Forgot your password? \n we recieved a request to reset password for your account.\n
      Click on the below link to reset password. \n\n\n ${url}`;

      try {
        sendEmail({
          email: user.email,
          message,
          subject: "Password Reset",
        });
        res
          .status(200)
          .json({ success: true, message: `Email send to ${user.email}` });
      } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();
        return res.status(500).json({ success: false, message: error.message });
      }
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  static async resetPassword(req, res) {
    try {
      const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");

      const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
      });
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Token is invalid or has been expired",
        });
      }
      user.password = req.body.newPassword;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();
      res
        .status(200)
        .json({ success: true, message: "Password reset successfully" });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  static async getMyPosts(req, res) {
    try {
      const user = await User.findById(req.user._id);
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }
      const posts = [];

      for (let i = 0; i < user.memory.length; i++) {
        const post = await Memory.findById(user.memory[i]).populate(
          "likes comments.user owner"
        );
        posts.push(post);
      }

      res.status(200).json({ success: true, posts });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
  static async getUserPosts(req, res) {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }
      const posts = [];

      for (let i = 0; i < user.memory.length; i++) {
        const post = await Memory.findById(user.memory[i]).populate(
          "likes comments.user owner"
        );
        posts.push(post);
      }

      res.status(200).json({ success: true, posts });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
}

module.exports = UserController;
