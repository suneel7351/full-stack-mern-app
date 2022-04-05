const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
require("dotenv").config({ path: "/server/config/.env" });
const userShcema = new Schema({
  name: {
    type: String,
    requied: [true, "Please enter name"],
  },
  email: {
    type: String,
    requied: [true, "Please enter name"],
  },
  avatar: {
    public_id: String,
    url: String,
  },
  password: {
    type: String,
    requied: [true, "Please enter name"],
    minlength: [6, "Password must be at least 6 characters"],
    select: false,
  },
  memory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Memory",
    },
  ],
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  resetPasswordToken: String,
  resetPasswordExpire: Date,

  joinedAt: {
    type: Date,
    default: Date.now(),
  },
});

userShcema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userShcema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userShcema.methods.generateToken = async function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECERET);
};
userShcema.methods.getresetPasswordToken = function () {
  let resetPasswordToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetPasswordToken)
    .digest("hex");
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetPasswordToken;
};

module.exports = mongoose.model("User", userShcema);
