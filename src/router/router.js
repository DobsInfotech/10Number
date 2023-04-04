const express = require("express");
const router = express.Router();
const { class1 } = require("../controller/controller");

var path = require("path");

var { upload } = require("../middleware/schema");

router.get("/", class1.a);

router.post("/Sign", upload.array("Image"), class1.b);

module.exports = router;
