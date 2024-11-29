const { verify } = require("jsonwebtoken");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  country: { type: String, required: true },
  state: { type: String, required: true },
  bio : {type : String,
     default : ""
  },
  verified: { type: Boolean, default: false },
});

module.exports = mongoose.model("User", userSchema);
