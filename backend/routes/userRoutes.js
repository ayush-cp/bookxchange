const express = require("express");
const { signup,login,updatedetails } = require("../controllers/userController");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.put("/updatedetails",auth, updatedetails);

module.exports = router;
