const mongoose = require("mongoose");
var validator = require("validator");

const blogSchema = new mongoose.Schema({
  UserName: {
    type: String,
  },
  PhoneNumber: {
    type: Number,
  },
  Profile: {
    type: String,
    default: "",
  },
  Follow: {
    type: [],
  },
  Following: {
    type: [],
  },
  Transaction: {
    type: [],
  },
  Coin: {
    type: Number,
  },
});

const blog = new mongoose.model("collections", blogSchema);

module.exports = blog;
