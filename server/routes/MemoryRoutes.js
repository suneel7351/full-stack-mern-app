const express = require("express");
const router = express.Router();
const MemoryController = require("../controller/MemoryController");
const UserController = require("../controller/UserController");
const isAuthenticated = require("../middleware/Authenticate");

router
  .route("/memory/new")
  .post(isAuthenticated, MemoryController.createMemory);
router
  .route("/memory/:id")
  // .get(MemoryController.getMemory)
  .get(isAuthenticated, MemoryController.likeAndUnlike)
  .delete(isAuthenticated, MemoryController.deleteMemory);
// .get(isAuthenticated, MemoryController.loveAndUnlove);
router
  .route("/memory")
  .get(isAuthenticated, MemoryController.getPostOfFollowing);
router
  .route("/update/memory/:id")
  .put(isAuthenticated, MemoryController.updateMemory);
router
  .route("/memory/details/:id")
  .get(isAuthenticated, MemoryController.getMemory);

router
  .route("/memory/comment/:id")
  .put(isAuthenticated, MemoryController.comment)
  .delete(isAuthenticated, MemoryController.deleteComment);

router.route("/memories").get(MemoryController.allMemory);
module.exports = router;
