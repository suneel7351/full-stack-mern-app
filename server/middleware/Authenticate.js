const jwt = require("jsonwebtoken");
const User = require("../models/user/User");
require("dotenv").config({ path: "/server/config/.env" });
async function isAuthenticated(req, res, next) {
  try {
    // const { token } = req.cookies;

    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Please login with correct credentials",
      });
    }

    const decodedData = await jwt.verify(token, process.env.JWT_SECERET);

    req.user = await User.findById(decodedData.id);

    next();
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

module.exports = isAuthenticated;
