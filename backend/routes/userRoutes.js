const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const {
  registerUser,
  loginUser,
  getUserDetails,
} = require("../controllers/userController");
const router = express.Router();

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getUserDetails);
module.exports = router;
