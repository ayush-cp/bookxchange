const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  isbn: { type: String, required: true },
  country: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User model
});

module.exports = mongoose.model("Book", bookSchema);
