const express = require("express");
const { addBook, getBooks,deleteBook,getuserbooks,searchbook } = require("../controllers/bookController");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/add",auth, addBook);
router.get("/",auth, getBooks);
router.delete("/:id",auth, deleteBook);
router.get("/userbooks",auth, getuserbooks);
router.post("/search",auth, searchbook);


module.exports = router;
