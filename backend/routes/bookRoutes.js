const express = require("express");
const { addBook, getBooks } = require("../controllers/bookController");

const router = express.Router();

router.post("/add", addBook);
router.get("/", getBooks);
router.delete("/:id", deleteBook);



module.exports = router;
