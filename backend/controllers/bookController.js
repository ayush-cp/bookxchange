const Book = require("../models/Book");

const searchBooks = async (req, res) => {
  const { isbn, country, state, city } = req.body;

  try {
    const book = await Book.findOne({ isbn });
    if (book) {
      return res.status(200).json({ message: "Book found", book });
    }

    const newBook = await Book.create({ isbn, country, state, city });
    res.status(201).json({ message: "Book saved successfully", newBook });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { searchBooks };
