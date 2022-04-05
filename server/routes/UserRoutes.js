const express = require("express");
const router = express.Router();
const UserController = require("../controller/UserController");
const isAuthenticated = require("../middleware/Authenticate");
router.route("/register").post(UserController.createUser);
router.route("/login").post(UserController.login);
// router.route("/user/:id").get(UserController.getUser);
router.route("/follow/:id").get(isAuthenticated, UserController.follow);
router.route("/logout").get(UserController.logout);
router
  .route("/update/profile")
  .put(isAuthenticated, UserController.updateProfile);
router
  .route("/update/password")
  .put(isAuthenticated, UserController.updatePassword);
router.route("/my/posts").get(isAuthenticated, UserController.getMyPosts);
router.route("/userpost/:id").get(isAuthenticated, UserController.getUserPosts);
router.route("/me").get(isAuthenticated, UserController.myProfile);
router.route("/user/:id").get(isAuthenticated, UserController.userProfile);
router.route("/users").get(isAuthenticated, UserController.allUser);
router.route("/password/forgot").post(UserController.forgotPassword);
router.route("/password/reset/:token").put(UserController.resetPassword);
module.exports = router;
