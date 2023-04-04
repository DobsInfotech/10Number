const express = require("express");
const app = express();
require("./db/conn");
const router = require("../src/router/router");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const sessions = require("express-session");
app.use(
  sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    resave: false,
  })
);

var path = require("path");

app.use(express.static(path.join(__dirname, "../public")));
var ejs = require("ejs");
var ejs_folder_path = path.join(__dirname, "../templates");
app.set("view engine", "ejs");
app.set("views", ejs_folder_path);

require("dotenv").config();
var port = process.env.PORT || 3000;

app.use("/", router);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
