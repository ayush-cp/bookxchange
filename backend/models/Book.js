const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  isbn: { type: String, required: true },
  country: { type: String, required: true },
  state: { type: String, required: true },
  readStatus: {
    type: String,
    enum: ['Not Read', 'Reading', 'Read'],
    default: 'Not Read',
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("Book", bookSchema);
