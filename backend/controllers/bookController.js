const Book = require("../models/Book");

const addBook = async (req, res) => {
  const { title, author, genre, isbn, country, state, readStatus } = req.body;
  // console.log(req.user);
  try {
    const book = await Book.create({
      title,
      author,
      genre,
      isbn,
      country,
      state,
      readStatus,
      user: req.user.userId,
    });

    res.status(201).json({ message: "Book added successfully", book });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getBooks = async (req, res) => {
  try {
    const books = await Book.find(
      {
        isbn: req.body.isbn,
      }
    );
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getuserbooks = async (req, res) => {
  try {
    const books = await Book.find({ user: req.user.userId });
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const deleteBook = async (req, res) => {
  const { id } = req.params;

  try {
    const book = await Book.findByIdAndDelete(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { addBook, getBooks, deleteBook,getuserbooks };
