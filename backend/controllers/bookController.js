const Book = require("../models/Book");
const User = require("../models/User");

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


const searchbook = async (req, res) => {
  const { country, state, city, isbn } = req.body;

  if (!isbn) {
    return res.status(400).json({ error: "ISBN is required." });
  }

  try {
    
    const books = await Book.find({ isbn });

    if (!books.length) {
      return res.status(404).json({ message: "No books found for the given ISBN." });
    }
    console.log(books);

    const userIds = books.map((book) => book.user);

    const users = await User.find({ _id: { $in: userIds } });

    if (!users.length) {
      return res.status(404).json({ message: "No users found for the related books." });
    }

    res.status(200).json({ books, users });
  } catch (error) {
    console.error("Error fetching books and users:", error);
    res.status(500).json({ error: error.message });
  }
};


module.exports = { addBook, getBooks, deleteBook,getuserbooks ,searchbook};
