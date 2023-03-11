const express = require("express");
const path = require("path");
const bp = require("body-parser");
const app = express();
const PORT = 3000;

const indexRouter = require("./routes/index");
const todoRouter = require("./routes/todos");

// 掛載ejs
app.set("view engine", "ejs");

// Middleware
app.use(bp.urlencoded());
app.use(bp.json());
app.use(express.static(path.join(__dirname, "public")));
// bootstrap
app.use(express.static(path.join(__dirname, "node_modules/bootstrap/dist")));

// router
app.use("/home", indexRouter);
app.use("/api", todoRouter); //在業界命名通常會將要當作api用的，路徑命名為/api

app.listen(PORT, () => {
  console.log("server is on port", PORT);
});
