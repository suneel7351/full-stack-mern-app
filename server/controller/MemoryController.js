const Memory = require("../models/memories/Memory");
const User = require("../models/user/User");
const cloudinary = require("cloudinary");
class MemoryController {
  static async createMemory(req, res) {
    try {
      const uploadPost = await cloudinary.v2.uploader.upload(req.body.image, {
        folder: "userAvatars",
        width: 150,
        crop: "scale",
      });
      const newMemoryData = {
        title: req.body.title,

        owner: req.user._id,

        image: {
          publicId: uploadPost.public_id,
          url: uploadPost.secure_url,
        },
      };
      const newMemory = await Memory.create(newMemoryData);

      const user = await User.findById(req.user._id);
      user.memory.unshift(newMemory._id);

      await user.save();

      res.status(201).json({
        sucess: true,
        memory: newMemory,
        message: "New Memory created successfully",
      });
    } catch (error) {
      return res.status(500).json({ sucess: false, message: error.message });
    }
  }
  static async getMemory(req, res) {
    try {
      const memory = await Memory.findById(req.params.id);
      if (!memory) {
        return res.status(404).json({
          sucess: false,
          message: "Memory not found",
        });
      }
      res.status(200).json({
        sucess: true,
        memory,
      });
    } catch (error) {
      return res.status(500).json({
        sucess: false,
        message: error.message,
      });
    }
  }

  static async likeAndUnlike(req, res) {
    try {
      const memory = await Memory.findById(req.params.id);
      if (!memory) {
        return res
          .status(404)
          .json({ success: false, message: "Memory not found" });
      }
      if (memory.likes.includes(req.user._id)) {
        const index = await memory.likes.indexOf(req.user._id);

        memory.likes.splice(index, 1);

        await memory.save();
        res.status(200).json({ success: true, message: "Disliked" });
      } else {
        memory.likes.push(req.user._id);
        await memory.save();
        res.status(200).json({ success: true, message: "Liked" });
      }
    } catch (error) {
      return res.status(500).json({ sucess: false, message: error.message });
    }
  }
  static async loveAndUnlove(req, res) {
    try {
      const memory = await Memory.findById(req.params.id);
      if (!memory) {
        return res
          .status(404)
          .json({ success: false, message: "Memory not found" });
      }
      if (memory.loves.includes(req.user._id)) {
        const index = await memory.loves.indexOf(req.user._id);
        memory.loves.splice(index, 1);
        await memory.save();
        res.status(200).json({ success: true, message: "Love" });
      } else {
        memory.loves.push(req.user._id);
        await memory.save();
        res.status(200).json({ success: true, message: "Dislove" });
      }
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  static async deleteMemory(req, res) {
    try {
      const memory = await Memory.findById(req.params.id);

      if (!memory) {
        return res
          .status(404)
          .json({ success: false, message: "Memory not found" });
      }

      if (memory.owner.toString() !== req.user._id.toString()) {
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized" });
      }

      // await cloudinary.v2.uploader.destroy(memory.image.public_id);
      await memory.remove();

      const user = await User.findById(req.user._id);
      const index = user.memory.indexOf(req.params.id);
      user.memory.splice(index, 1);
      await user.save();
      res.status(200).json({ success: true, message: "Memory Deleted" });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  static async getPostOfFollowing(req, res) {
    try {
      const user = await User.findById(req.user._id);

      const memory = await Memory.find({
        owner: {
          $in: user.following,
        },
      }).populate("owner likes comments.user");
      res.status(200).json({ success: true, memory: memory.reverse() });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  static async updateMemory(req, res) {
    try {
      const memory = await Memory.findById(req.params.id);
      if (!memory) {
        return res
          .status(404)
          .json({ success: false, message: "Post not found" });
      }
      if (req.user._id.toString() !== memory.owner.toString()) {
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized" });
      }
      if (req.body.title) {
        memory.title = req.body.title;
      }

      await memory.save();
      res.status(200).json({
        success: true,
        message: "Post update successfully",
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  static async comment(req, res) {
    try {
      const memory = await Memory.findById(req.params.id);
      if (!memory) {
        return res
          .status(404)
          .json({ success: false, message: "Memory not found" });
      }

      let commentIndex = -1;
      memory.comments.forEach((element, index) => {
        if (req.user._id.toString() === element.user.toString()) {
          commentIndex = index;
        }
      });

      if (commentIndex !== -1) {
        memory.comments[commentIndex].comment = req.body.comment;
        await memory.save();
        res
          .status(200)
          .json({ success: true, message: "comment updated successfully" });
      } else {
        memory.comments.push({
          user: req.user._id,
          comment: req.body.comment,
        });

        await memory.save();
        res
          .status(200)
          .json({ success: true, message: "comment added successfully" });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  static async deleteComment(req, res) {
    try {
      const memory = await Memory.findById(req.params.id);

      if (!memory) {
        return res
          .status(404)
          .json({ success: false, message: "Memory not found" });
      }

      if (req.user._id.toString() === memory.owner.toString()) {
        if (req.body.commentId === undefined) {
          return res
            .status(400)
            .json({ success: false, message: "Comment Id is required" });
        }
        memory.comments.forEach((element, index) => {
          if (element._id.toString() === req.body.commentId.toString()) {
            return memory.comments.splice(index, 1);
          }
        });

        await memory.save();
        res.status(200).json({
          success: true,
          message: "Selected comment has been deleted",
        });
      } else {
        memory.comments.forEach((element, index) => {
          if (element.user.toString() === req.user._id.toString()) {
            return memory.comments.splice(index, 1);
          }
        });
        await memory.save();
        res.status(200).json({
          success: true,
          message: "Your comment has been deleted",
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  static async allMemory(req, res) {
    try {
      const memories = await Memory.find({});
      res.status(200).json({ success: true, memories });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
}

module.exports = MemoryController;
