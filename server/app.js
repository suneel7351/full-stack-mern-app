const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const path = require("path");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "server/config/.env" });
}

// ---------------------> MiddleWare <-------------------------
app.use(fileUpload());
app.use(
  bodyParser.json({
    limit: "50mb",
  })
);
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    parameterLimit: 100000,
    extended: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// ---------------------> Memory Routes <-------------------------

app.use("/api/v1", require("./routes/MemoryRoutes"));

// ---------------------> User Routes <-------------------------

app.use("/api/v1", require("./routes/UserRoutes"));

app.use(express.static(path.join(__dirname, "../client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
});

module.exports = app;
