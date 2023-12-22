const express = require("express");
const {
  registerUser,
  loginUser,
  getUserDetails,
} = require("../controllers/userController");
const router = express.Router();

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", getUserDetails);
module.exports = router;
