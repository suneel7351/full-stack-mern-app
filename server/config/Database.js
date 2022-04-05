require("dotenv").config({ path: "server/config/.env" });
const mongoose = require("mongoose");

exports.connection = () => {
  mongoose
    .connect(process.env.DATABASE_URI)
    .then((con) => console.log(`Database Connected: ${con.connection.host}`))
    .catch((err) => console.log(err));
};
