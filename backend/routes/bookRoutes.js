const express = require("express");
const { searchBooks } = require("../controllers/bookController");

const router = express.Router();

router.post("/search", searchBooks);

module.exports = router;
