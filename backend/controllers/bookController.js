const Book = require("../models/Book");

const addBook = async (req, res) => {
  const { isbn, country, state, city } = req.body;
  try {
    const book = await Book.create({ isbn, country, state, city, user: req.user.userId });
    res.status(201).json({ message: "Book added successfully", book });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getBooks = async (req, res) => {
  try {
    const books = await Book.find({ user: req.user.userId });
    res.status(200).json({ books });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const deleteBook = async (req, res) => {
  try { 
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    await book.remove();
    res.status(200).json({ message: "Book deleted successfully" });
  }
  catch (error) {
    res.status(500).json({ error: error.message });
  }
}


module.exports = { addBook, getBooks, deleteBook };
