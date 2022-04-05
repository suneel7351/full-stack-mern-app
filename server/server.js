const app = require("./app");
const { connection } = require("./config/Database");
const cloudinary = require("cloudinary");
const PORT = process.env.PORT || 6666;

connection();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECERET,
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
