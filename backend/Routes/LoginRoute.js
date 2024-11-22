const express = require("express");
const router = express.Router();

const loginController = require("../Controllers/LoginController");

// Route for logging in (POST request)
router.post("/", loginController.loginUser);

module.exports = router;
