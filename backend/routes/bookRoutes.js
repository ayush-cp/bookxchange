const express = require("express");
const { addBook, getBooks,deleteBook,getuserbooks } = require("../controllers/bookController");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/add",auth, addBook);
router.get("/",auth, getBooks);
router.delete("/:id",auth, deleteBook);
router.get("/userbooks",auth, getuserbooks);


module.exports = router;
